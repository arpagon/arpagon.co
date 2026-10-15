# arpagon.co

Personal site of Sebastián Rojo ([@arpagon](https://github.com/arpagon)). Astro, static, deployed on Cloudflare Pages.

- Design: split black/gold layout, a faint starry-night sky (after Van Gogh's *The Starry Night*) painted once on a canvas, and a terminal mode (`t` / `Esc`).
- Languages: English (default), Spanish (`/es/`), Portuguese (`/pt/`, machine-translated and labeled as such). Posts stay in their original language.
- Agent-readable: [`/llms.txt`](https://arpagon.co/llms.txt), [`/index.md`](https://arpagon.co/index.md), [`/resume.json`](https://arpagon.co/resume.json) (JSON Resume), `/writing/<slug>.md`, RSS, sitemap, JSON-LD.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # astro build + scripts/check-dist.mjs
```

## Content

- `src/data/profile.ts`: single source for profile facts and UI copy (en/es/pt). Pages, terminal mode, `llms.txt`, `index.md` and `resume.json` are generated from it.
- `src/content/writing/*.md`: 40 dated language pages (`title`, `date`, `lang`, `description`, optional `series`, `originalUrl`, `translationKey`, `cover`). The 39 imported pages retain their original language and publication date; no new translations are generated.
- `src/data/writing-import.json`: public source URLs, source hashes, imported-page checksums, media provenance and unavailable-media inventory. Imported pages use local canonicals and link back to the original publication.
- `public/`: static files, including `/.well-known/matrix/*` (Matrix delegation), `_headers` and `_redirects`.
- `scripts/og.py`: regenerates `public/og.png`.

`scripts/check-dist.mjs` fails the build if required files are missing or private patterns appear in the output (extra patterns can be listed in a local, untracked `.banned-terms.local`). It also checks all 40 writing pages, their Markdown endpoints, source links, dates, series, translations, RSS/sitemap entries and local media checksums.

## Reproduce the archive import

The importer is maintenance tooling, not part of the Cloudflare build. Requires Python 3, Pandoc (tested with 3.7.0.2), and `scripts/requirements-import.txt` (Pillow / PyYAML).

Use a directory containing the two public feed backups:
- `medellinasterisk-blogspot-feed.json`: [Blogger JSON feed](https://medellinasterisk.blogspot.com/feeds/posts/default?alt=json&max-results=200).
- `arpagondata-tumblr.json`: [Tumblr read API](https://arpagondata.tumblr.com/api/read/json?num=50&start=0), with the `var tumblr_api_read =` wrapper and trailing semicolon removed.

And a checkout of [ArtisanLabs/blog](https://github.com/ArtisanLabs/blog) at the reviewed commit `7d4f3eab6e6609b68a4f79f0f66121ef1eb06edd`. Keep raw feeds and media caches in an ignored experiment, not in tracked content. Create its local Git checkpoint before use, per the experiment-mode skill.

```bash
python3 scripts/import-archive.py \
  --sources /path/to/feed-backups \
  --artisan-repo /path/to/ArtisanLabs/blog \
  --cache runs/experiments/archive/cache
python3 scripts/test-import-archive.py
npm test
npm run build
```

The import is deterministic from the same sources/tool versions/cache. Check the manifest and diff before committing. It preserves code, quotations and existing license notices; strips legacy scripts, tracking badges and active third-party embeds; locally hosts images and the Arouse video; and annotates unrecoverable media. Old personal author-email addresses become `@arpagon`. It does not copy comments, contact databases, or entire Drive folders. Historical external links may be dead; the publication is preserved as an archive, not an updated tutorial.

## Deploy

Cloudflare Pages project `arpagon-co`: production branch `main`, build `npm run build`, output `dist`, `NODE_VERSION=22`. Every branch/PR gets a preview deployment.
