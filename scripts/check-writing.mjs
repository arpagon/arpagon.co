// Offline integrity checks for the imported archive; run on every production build.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export function checkWriting(dist) {
  const manifest = JSON.parse(readFileSync('src/data/writing-import.json', 'utf8'));
  const digest = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
  const text = (path) => readFileSync(join(dist, path), 'utf8');
  assert.equal(manifest.posts.length, 39, '39 imported language pages');
  assert.equal(new Set(manifest.posts.map((p) => p.id)).size, 39, 'Unique slugs');
  const allPages = readdirSync(join(dist, 'writing')).filter((id) => existsSync(join(dist, 'writing', id, 'index.html')));
  assert.ok(allPages.length >= 40 && allPages.includes('k8s-edge'), 'Imported archive plus Kubernetes');
  for (const id of allPages) assert.ok(existsSync(join(dist, 'writing', `${id}.md`)), `Markdown sibling: ${id}`);
  const index = text('writing/index.html');
  const llms = text('llms.txt');
  const profile = text('index.md');
  const rss = text('rss.xml');
  const sitemap = text('sitemap-0.xml');
  assert.equal((rss.match(/<item>/g) ?? []).length, allPages.length, 'RSS has every page');

  for (const [id, count] of [['artisanlabs', 5], ['data-analysis', 17], ['medellin-asterisk', 17]]) {
    assert.equal(manifest.posts.filter((p) => p.series === id).length, count);
    assert.ok(index.includes(`id="${id}"`), `Series anchor: ${id}`);
  }
  for (const post of manifest.posts) {
    assert.equal(digest(`src/content/writing/${post.id}.md`), post.sha256, `Generated source differs: ${post.id}`);
    const html = text(`writing/${post.id}/index.html`);
    const md = text(`writing/${post.id}.md`);
    const url = `https://arpagon.co/writing/${post.id}/`;
    assert.ok(html.includes(`rel="canonical" href="${url}"`), `Local canonical: ${post.id}`);
    assert.ok(html.includes(`href="${post.originalUrl.replaceAll('&', '&amp;')}"`), `Source link: ${post.id}`);
    assert.ok(md.includes(`Originally published: ${post.originalUrl}`), `Markdown provenance: ${post.id}`);
    assert.ok(html.includes(`datetime="${post.date}T00:00:00.000Z"`), `Original date: ${post.id}`);
    assert.ok(llms.includes(`/writing/${post.id}.md`), `Agent index: ${post.id}`);
    assert.ok(profile.includes(`/writing/${post.id}/`), `Markdown profile: ${post.id}`);
    assert.ok(index.includes(`/writing/${post.id}/`), `Writing index: ${post.id}`);
    assert.ok(rss.includes(`/writing/${post.id}/`), `RSS: ${post.id}`);
    assert.ok(sitemap.includes(url), `Sitemap: ${post.id}`);
    assert.ok(!/<(?:iframe|embed|object)\b/i.test(html), `Active old embed: ${post.id}`);
    assert.ok(!/file:\/\/\//.test(html + md), `Local filesystem link: ${post.id}`);
    assert.ok(!/<script\b(?![^>]*type="application\/ld\+json")/i.test(html), `Unexpected script: ${post.id}`);
    for (const match of html.matchAll(/(?:href|src|poster)="(\/(?!\/)[^"]+)"/g)) {
      const path = decodeURI(match[1].split(/[?#]/)[0]);
      if (!path) continue;
      const file = join(dist, path, path.endsWith('/') ? 'index.html' : '');
      assert.ok(existsSync(file), `Broken local URL in ${post.id}: ${path}`);
    }
    for (const match of html.matchAll(/<(?:img|source)\b[^>]*src="([^"]+)"/g)) {
      assert.ok(match[1].startsWith('/media/writing/'), `Remote media dependency: ${post.id}`);
    }
  }
  for (const media of manifest.media.filter((m) => m.status === 'local')) {
    const path = join(dist, media.local);
    assert.ok(existsSync(path), `Missing media: ${media.local}`);
    assert.equal(statSync(path).size, media.bytes);
    assert.equal(digest(path), media.localSha256, `Media checksum: ${media.local}`);
  }
  for (const id of ['artisanlabs-arouse', 'artisanlabs-arouse-en']) {
    const html = text(`writing/${id}/index.html`);
    for (const lang of ['en', 'es']) assert.ok(html.includes(`hreflang="${lang}"`), `${id} translation alternate ${lang}`);
    for (const other of ['artisanlabs-arouse', 'artisanlabs-arouse-en']) assert.ok(html.includes(`href="/writing/${other}/"`), `${id} translation navigation`);
  }
  console.log(`check-writing: ${allPages.length} pages, provenance, translations, feeds and ${manifest.media.filter((m) => m.status === 'local').length} local media verified`);
}
