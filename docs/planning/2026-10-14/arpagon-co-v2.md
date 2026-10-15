# arpagon.co v2 — implementation plan

Status: in progress (PR `feat/astro-v2`). Replaces the 2022 Gatsby "Cara" template.

## Decisions
- Stack: Astro 7, static output, Markdown content collections, tiny client scripts only (sky canvas, terminal mode, nav highlight).
- Hosting: Cloudflare Pages (`arpagon-co`), production branch `main` (renamed from `master`), build `npm run build` → `dist`.
- Languages: EN default, `/es/`, `/pt/` (machine-translated, labeled). Posts are not translated.
- Visual direction: split black/gold layout; color photo with gold ring; faint starry-night canvas behind the identity column (moon, halo stars, subtle cypress), painted once; terminal mode with `t`/`Esc`. Fonts: Inter + JetBrains Mono, self-hosted.
- Agent layer: `llms.txt`, `index.md`, per-post `.md`, `resume.json` (JSON Resume), JSON-LD `Person`, RSS, sitemap, OG image. No chat, no MCP for now.
- Contact: info@arpagon.co.

## Phases
1. **This PR** — Astro skeleton, home in 3 languages, projects, community, press, now, writing index, migrate `/blog/k8s-edge` (301 to `/writing/k8s-edge/`), agent files, keep `/.well-known/matrix/*` and its headers, post-build checks.
2. **Writing import** — bring in the archive (Medellín Asterisk 2008–09, Arpagon Data Analysis 2015–16, ArtisanLabs 2023) as dated posts with links to the originals; download images.
3. **Media** — project videos/posters (bzz, pi-annotate, pi-animations; record a pi-rewind demo).
4. **Polish** — per-route OG images, project detail pages, Lighthouse/CI checks (links, JSON, hreflang).

## Verification
- `npm run build` green (includes `scripts/check-dist.mjs`).
- Preview deployment reviewed on desktop and mobile; `t`/`Esc` terminal mode; reduced-motion paints the sky without animation.
- After merge: `https://arpagon.co/.well-known/matrix/server` and `/client` still return JSON with CORS headers; `/blog/k8s-edge` redirects.
