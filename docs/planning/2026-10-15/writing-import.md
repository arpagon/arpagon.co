# Import the writing archive

Status: implementation and local verification complete; awaiting PR review. Tracked in issue #3.

The Astro rebuild is live (PR #1). Pi extensions are reviewed separately in PR #2; this import does not depend on it.

## Scope
- Import the 17 Medellín Asterisk posts (2008–2009), 17 Arpagon Data Analysis posts (2015–2016), and five ArtisanLabs language pages (2023).
- Keep original titles, dates, languages, code, quotations and attribution. Count language pages, not unique works: 39 imported pages plus the existing Kubernetes post = 40 pages. The two Arouse versions are linked translations.
- Use the public Blogger/Tumblr feeds and the original ArtisanLabs Markdown, with a repeatable importer and provenance manifest. Raw source caches stay ignored under `runs/experiments/`.
- Download available images, diagrams and video to local assets. Strip scripts, tracking badges and obsolete embeds; retain media source links and explicit notes for missing media. Do not invent missing content.
- Keep historical writing distinct from the current profile. Review personal contact details, credentials, client details and private material before publishing.
- Give every imported page a local canonical, original-publication link, series navigation and Markdown endpoint. Link the two Arouse language versions.
- Replace external-only archive links with local series browsing; retain original sites as provenance. RSS, sitemap and agent indexes include imports automatically.

## Verification
- Unit tests for conversion, code whitespace, safe embeds, media failures and deterministic slugs.
- Repeat import from the source cache: byte-identical generated content and assets.
- Build and output checks: 40 HTML posts + Markdown siblings, source links, series counts, translations, feed entries and local assets.
- Check responsive layout and HTML without loading image attachments. No production merge without review.

## Verified locally
- 39 imported pages + Kubernetes = 40 HTML posts and 40 Markdown endpoints.
- 50 local media files, 2,894,861 bytes total (including ArtisanLabs cover images and the Arouse video). Original Audacity/Digium image URLs are unavailable and annotated; two unrecoverable `file://` references are noted. Legacy video embeds are links/notes, not active third-party widgets.
- Eleven offline importer tests, two privacy-pattern tests, full build/output checks, source/media checksums and a byte-identical repeat import across all 91 generated files.
- Browser checks at 390px and 1440px: writing index, all three home languages, Arouse, Lasso regression and DTMF; no document overflow or failed image decodes. Translation and series links tested by clicking. No screenshot/image attachments loaded.
- Original code license notices and attribution retained; obsolete personal author-email addresses replaced with the public handle. Phone guard now distinguishes statistical decimals from standalone phone-like numbers.
