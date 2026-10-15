#!/usr/bin/env python3
"""Import the public archive. Requires pandoc, PyYAML and Pillow; never runs in CI.

python3 scripts/import-archive.py --sources /path/to/feed-backups \
  --artisan-repo /path/to/ArtisanLabs/blog --cache runs/experiments/archive/cache

The two JSON backups are public Blogger/Tumblr feeds, not a Drive export tree.
Only generated posts, optimized media and provenance are written to tracked paths.
"""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
import html
from html.parser import HTMLParser
import io
import json
from pathlib import Path
import re
import subprocess
import time
import unicodedata
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen

from PIL import Image
import yaml

ROOT = Path(__file__).resolve().parents[1]
ARTISAN_COMMIT = '7d4f3eab6e6609b68a4f79f0f66121ef1eb06edd'
FEEDS = {
    'medellinasterisk-blogspot-feed.json': 'https://medellinasterisk.blogspot.com/feeds/posts/default?alt=json&max-results=200',
    'arpagondata-tumblr.json': 'https://arpagondata.tumblr.com/api/read/json?num=50&start=0',
}


def sha(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def slug(text: str) -> str:
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')


def short(text: str, limit: int = 220) -> str:
    text = re.sub(r'\s+', ' ', text).strip()
    return text if len(text) <= limit else text[:limit - 1].rsplit(' ', 1)[0] + '…'


def safe_url(url: str, base: str) -> str | None:
    url = urljoin(base, url.strip())
    return url if urlsplit(url).scheme in ('http', 'https') else None


class Text(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts: list[str] = []
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.skip += 1
        if tag in ('p', 'br', 'div', 'li'):
            self.parts.append(' ')

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, text):
        if not self.skip:
            self.parts.append(text)


def plain(source: str) -> str:
    parser = Text()
    parser.feed(source)
    return short(''.join(parser.parts))


class Media:
    """Download once, reject non-media responses, optimize images, retain provenance."""
    def __init__(self, cache: Path, output: Path, artisan: Path):
        self.cache, self.output, self.artisan = cache, output, artisan
        self.records: dict[str, dict] = {}
        self.cache.mkdir(parents=True, exist_ok=True)
        self.output.mkdir(parents=True, exist_ok=True)

    def local(self, url: str) -> str | None:
        if url in self.records:
            return self.records[url].get('local')
        record = self.records[url] = {'source': url}
        if not safe_url(url, url):
            record['status'] = 'unavailable'
            return None
        key = sha(url.encode())[:16]
        cached = self.cache / key
        try:
            if not cached.exists():
                parts = urlsplit(url)
                if parts.hostname == 'blog.artisanlabs.io' and parts.path.startswith('/assets/'):
                    data = (self.artisan / 'public' / parts.path.lstrip('/')).read_bytes()
                else:
                    # Prefer HTTPS even for the original archive's HTTP image URLs.
                    secure = re.sub(r'^http:', 'https:', url)
                    for attempt in range(2):
                        try:
                            request = Request(secure, headers={'User-Agent': 'arpagon.co archive importer'})
                            with urlopen(request, timeout=20) as response:
                                data = response.read(24 * 1024 * 1024 + 1)
                            break
                        except OSError:
                            if attempt == 1:
                                raise
                            time.sleep(0.2)
                if len(data) > 24 * 1024 * 1024:
                    raise ValueError('Media exceeds the 24 MiB import limit')
                cached.write_bytes(data)
            data = cached.read_bytes()
            record['sha256'] = sha(data)
            # Only the known, checked-in ArtisanLabs video may bypass image decoding.
            if urlsplit(url).hostname == 'blog.artisanlabs.io' and url.endswith('.webm'):
                extension, optimized = '.webm', data
            else:
                with Image.open(io.BytesIO(data)) as image:
                    if getattr(image, 'is_animated', False):
                        if image.format != 'GIF':
                            raise ValueError('Unhandled animated media format')
                        optimized, extension = data, '.gif'
                    else:
                        image.thumbnail((1600, 1600))
                        if image.mode not in ('RGB', 'RGBA'):
                            image = image.convert('RGBA' if 'transparency' in image.info else 'RGB')
                        out = io.BytesIO()
                        image.save(out, format='WEBP', quality=88, method=6)
                        optimized, extension = out.getvalue(), '.webp'
            name = key + extension
            (self.output / name).write_bytes(optimized)
            record.update(status='local', local=f'/media/writing/{name}', bytes=len(optimized), localSha256=sha(optimized))
            return record['local']
        except (OSError, ValueError, Image.DecompressionBombError) as exc:
            record['status'] = 'unavailable'
            print(f'Unavailable media: {urlsplit(url).hostname}{urlsplit(url).path[-45:]} ({type(exc).__name__})')
            return None


class CleanHTML(HTMLParser):
    """Remove active embeds/formatting, preserve pre whitespace and safe source links."""
    TAGS = {'p', 'div', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'em', 'strong', 'b', 'i',
            'u', 's', 'del', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'hr', 'table',
            'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'sup', 'sub', 'figure', 'figcaption',
            'video', 'source', 'small'}
    VOID = {'br', 'hr', 'source'}

    def __init__(self, base: str, media: Media, lang: str):
        super().__init__(convert_charrefs=True)
        self.base, self.media, self.lang = base, media, lang
        self.out: list[str] = []
        self.skip: list[str] = []
        self.pre: list[str] | None = None
        self.notes: set[str] = set()
        self.anchors: list[bool] = []

    def note(self, key: str, message: str):
        if key not in self.notes:
            self.out.append(f'<p><em>{html.escape(message)}</em></p>')
            self.notes.add(key)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if self.skip:
            if tag == self.skip[-1]:
                self.skip.append(tag)
            return
        if tag in ('script', 'style', 'iframe', 'object'):
            if tag == 'iframe':
                url = safe_url(attrs.get('src', ''), self.base)
                if url:
                    self.out.append(f'<p><a href="{html.escape(url, quote=True)}">Video ({html.escape(urlsplit(url).hostname or "source")})</a></p>')
            self.skip.append(tag)
            return
        if tag == 'embed':
            self.note('flash', 'Reproductor Flash original retirado; consulta la publicación original.' if self.lang == 'es' else 'Original Flash player removed; see the original publication.')
            return
        if self.pre is not None:
            if tag == 'br':
                self.pre.append('\n')
            return
        if tag == 'pre':
            self.pre = []
        elif tag == 'a':
            url = safe_url(attrs.get('href', ''), self.base) if attrs.get('href') else None
            self.anchors.append(bool(url))
            if url:
                self.out.append(f'<a href="{html.escape(url, quote=True)}">')
        elif tag == 'img':
            raw = attrs.get('src', '')
            url = safe_url(raw, self.base)
            local = self.media.local(url) if url else None
            alt = attrs.get('alt', '') or ('Imagen del artículo original' if self.lang == 'es' else 'Figure from the original article')
            if local:
                self.out.append(f'<img src="{local}" alt="{html.escape(alt, quote=True)}" loading="lazy">')
            elif url:
                label = 'Imagen original no disponible' if self.lang == 'es' else 'Original image unavailable'
                self.out.append(f'<p><em>{label}: <a href="{html.escape(url, quote=True)}">{html.escape(alt)}</a>.</em></p>')
            elif raw.startswith('file:'):
                self.note('local-file', 'La publicación original incluía referencias a imágenes locales no recuperables.' if self.lang == 'es' else 'The original publication referenced unavailable local images.')
        elif tag in self.TAGS:
            extra = ''
            if tag == 'video':
                extra = ' controls playsinline preload="none"'
            elif tag == 'source':
                url = safe_url(attrs.get('src', ''), self.base)
                local = self.media.local(url) if url else None
                if not local:
                    return
                extra = f' src="{local}" type="video/webm"'
            elif tag in ('th', 'td'):
                extra = ''.join(f' {a}="{int(attrs[a])}"' for a in ('colspan', 'rowspan') if attrs.get(a, '').isdigit())
            self.out.append(f'<{tag}{extra}>')

    def handle_endtag(self, tag):
        if self.skip:
            if tag == self.skip[-1]:
                self.skip.pop()
            return
        if self.pre is not None:
            if tag == 'pre':
                # Escape once so literal <, >, Python indentation and blank lines survive Pandoc.
                self.out.append('<pre><code class="language-text">' + html.escape(''.join(self.pre)) + '</code></pre>')
                self.pre = None
            return
        if tag == 'a':
            if self.anchors and self.anchors.pop():
                self.out.append('</a>')
        elif tag in self.TAGS and tag not in self.VOID:
            self.out.append(f'</{tag}>')

    def handle_data(self, text):
        if self.skip:
            return
        if self.pre is not None:
            self.pre.append(text)
        else:
            self.out.append(html.escape(text))

    def result(self) -> str:
        if self.pre is not None:
            self.handle_endtag('pre')
        return ''.join(self.out)


def convert(source: str, base: str, media: Media, lang: str) -> str:
    parser = CleanHTML(base, media, lang)
    parser.feed(source)
    result = subprocess.run(['pandoc', '--from=html', '--to=gfm', '--wrap=none'],
                            input=parser.result(), text=True, capture_output=True, check=True).stdout
    return result.strip() + '\n'


def redact_contacts(body: str) -> str:
    # Preserve author attribution, but don't re-publish obsolete personal email addresses.
    return re.sub(r'arpagon@(?:gamil|gmail)\.com', '@arpagon', body, flags=re.I)


def artisan_markdown(body: str, media: Media) -> str:
    # Keep the original Markdown/code; remove tracking badge images and executable embeds.
    body = re.sub(r'^\[!\[Twitter URL\].*\n?', '', body, flags=re.M)
    body = re.sub(r'<script\b[^>]*>.*?</script>', '', body, flags=re.S | re.I)
    body = body.replace('](artisanlabs.io)', '](https://artisanlabs.io)')
    for path in sorted(set(re.findall(r'/assets/blog/[^\s"\)<>]+', body))):
        local = media.local('https://blog.artisanlabs.io' + path)
        if not local:
            raise ValueError(f'Missing ArtisanLabs asset: {path}')
        body = body.replace(path, local)
    body = re.sub(r'<video\b[^>]*>', '<video controls playsinline preload="none">', body)
    return body.strip() + '\n'


def run(args):
    output = args.output / 'src/content/writing'
    output.mkdir(parents=True, exist_ok=True)
    media = Media(args.cache, args.output / 'public/media/writing', args.artisan_repo)
    manifest_path = args.output / 'src/data/writing-import.json'
    previous = json.loads(manifest_path.read_text())['posts'] if manifest_path.exists() else []
    records = []
    sources = []
    posts = []
    for filename, source_url in FEEDS.items():
        data = (args.sources / filename).read_bytes()
        sources.append({'url': source_url, 'sha256': sha(data)})
        feed = json.loads(data)
        if 'feed' in feed:
            entries = feed['feed']['entry']
            if len(entries) != int(feed['feed']['openSearch$totalResults']['$t']):
                raise ValueError('Blogger export is incomplete')
            for p in entries:
                url = next(link['href'] for link in p['link'] if link['rel'] == 'alternate')
                title = re.sub(r'\s+', ' ', p['title']['$t']).strip()
                source = p['content']['$t']
                posts.append(({'id': 'asterisk-' + slug(title),
                    'title': title, 'date': p['published']['$t'][:10], 'lang': 'es',
                    'description': plain(source) or title, 'series': 'medellin-asterisk',
                    'originalUrl': url}, source, p['id']['$t']))
        else:
            if len(feed['posts']) != int(feed['posts-total']):
                raise ValueError('Tumblr export is incomplete')
            for p in feed['posts']:
                if p['type'] != 'regular':
                    raise ValueError(f'Unhandled Tumblr post type: {p["type"]}')
                title = re.sub(r'\s+', ' ', p['regular-title']).strip()
                lang = 'es' if p['id'] == '132347512252' else 'en'
                # Tumblr truncates its public slugs: several posts share one slug.
                posts.append(({'id': 'data-' + slug(title),
                    'title': title,
                    'date': datetime.fromtimestamp(p['unix-timestamp'], timezone.utc).date().isoformat(),
                    'lang': lang, 'description': plain(p['regular-body']) or title,
                    'series': 'data-analysis', 'originalUrl': p.get('url-with-slug', p['url'])},
                    p['regular-body'], p['id']))

    for meta, source, original_id in posts:
        body = convert(source, meta['originalUrl'], media, meta['lang'])
        records.append(save(output, meta, redact_contacts(body), original_id))

    actual_commit = subprocess.check_output(['git', '-C', str(args.artisan_repo), 'rev-parse', 'HEAD'], text=True).strip()
    if actual_commit != ARTISAN_COMMIT:
        raise ValueError('ArtisanLabs checkout differs from reviewed commit; review before updating ARTISAN_COMMIT')
    for name in ('vocal-resonance', 'supabase-pgvector', 'arouse', 'arouse_en', 'GPTs'):
        path = args.artisan_repo / '_posts' / (name + '.md')
        source = path.read_text()
        _, front, body = source.split('---', 2)
        original = yaml.safe_load(front)
        meta = {'id': 'artisanlabs-' + slug(name), 'title': original['title'],
                'date': original['date'][:10], 'lang': 'es' if name in ('arouse', 'GPTs') else 'en',
                'description': short(original.get('description') or original['excerpt']),
                'series': 'artisanlabs', 'originalUrl': f'https://blog.artisanlabs.io/posts/{name}'}
        cover = media.local('https://blog.artisanlabs.io' + original['coverImage'])
        if not cover:
            raise ValueError(f'Missing cover: {name}')
        meta['cover'] = cover
        if name in ('arouse', 'arouse_en'):
            meta['translationKey'] = 'artisanlabs-arouse'
        body = artisan_markdown(body, media)
        records.append(save(output, meta, redact_contacts(body), f'_posts/{name}.md'))
        sources.append({'url': f'https://github.com/ArtisanLabs/blog/blob/{ARTISAN_COMMIT}/_posts/{name}.md', 'sha256': sha(source.encode())})

    ids = [r['id'] for r in records]
    if len(ids) != len(set(ids)) or len(ids) != 39:
        raise ValueError('Unexpected post count or duplicate slug')
    # Second pass: imported cross-links and image lightbox links no longer depend on old hosts.
    post_urls = {}
    for r in records:
        url = r['originalUrl'].rstrip('/')
        local = f'/writing/{r["id"]}/'
        post_urls[url] = local
        post_urls[re.sub(r'^https:', 'http:', url)] = local
        if 'tumblr.com/post/' in url:
            post_urls[re.match(r'.*/post/\d+', url).group()] = local
    def media_key(url):
        return re.sub(r'/s\d+(?:-h)?/', '/SIZE/', url) if 'blogger.googleusercontent.com/' in url else url
    asset_urls = {media_key(url): r['local'] for url, r in media.records.items() if r.get('local')}
    def rewrite_link(match):
        prefix, url = match.groups()
        return prefix + (post_urls.get(url.rstrip('/')) or asset_urls.get(media_key(url)) or url)
    for record in records:
        path = output / (record['id'] + '.md')
        text = path.read_text()
        _, front, body = text.split('---\n', 2)
        # Never rewrite originalUrl in frontmatter.
        body = re.sub(r'(\]\(|href=")(https?://[^\s\")]+)', rewrite_link, body)
        path.write_text('---\n' + front + '---\n' + body)
        record['sha256'] = sha(path.read_bytes())
    manifest = {'version': 1, 'sources': sources, 'posts': sorted(records, key=lambda x: x['id']),
                'media': sorted(media.records.values(), key=lambda x: x['source'])}
    for old in previous:
        path = output / (old['id'] + '.md')
        if old['id'] not in ids and path.exists():
            if sha(path.read_bytes()) != old['sha256']:
                raise ValueError(f'Refusing to remove modified generated post: {old["id"]}')
            path.unlink()
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    print(f'Imported {len(records)} pages; {sum(r["status"] == "local" for r in media.records.values())} local media; {sum(r["status"] != "local" for r in media.records.values())} unavailable media.')


def save(output: Path, meta: dict, body: str, original_id: str) -> dict:
    meta = dict(meta)
    ident = slug(meta.pop('id'))
    (output / (ident + '.md')).write_text('---\n' + yaml.safe_dump(meta, allow_unicode=True, sort_keys=False, width=1000) + '---\n\n' + body)
    return {'id': ident, 'originalId': original_id, **meta}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sources', type=Path, required=True)
    parser.add_argument('--artisan-repo', type=Path, required=True)
    parser.add_argument('--cache', type=Path, required=True)
    parser.add_argument('--output', type=Path, default=ROOT)
    run(parser.parse_args())
