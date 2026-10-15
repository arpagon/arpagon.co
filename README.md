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
- `src/content/writing/*.md`: posts (`title`, `date`, `lang`, `description`, optional `series`, `originalUrl`).
- `public/`: static files, including `/.well-known/matrix/*` (Matrix delegation), `_headers` and `_redirects`.
- `scripts/og.py`: regenerates `public/og.png`.

`scripts/check-dist.mjs` fails the build if required files are missing or private patterns appear in the output (extra patterns can be listed in a local, untracked `.banned-terms.local`).

## Deploy

Cloudflare Pages project `arpagon-co`: production branch `main`, build `npm run build`, output `dist`, `NODE_VERSION=22`. Every branch/PR gets a preview deployment.
