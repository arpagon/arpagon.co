# Demo library (/demos)

## Goal

Show every demo video on arpagon.co:
- Public demos play on the page.
- Demos of Emilia products running at real customers are **listed publicly** with a description, but their videos are **private**. They are shared personally, on request, through expiring links.

## Design

- **Public catalog**: `/demos/`, `/es/demos/` and `/pt/demos/` are static Astro pages, with the same visual language as `/pi/`.
  - Cards are grouped as *Emilia AI* and *Open source and experiments*, and by category.
  - Each card shows its role, stack, duration, credits and links to the original posts.
- **Data**: `src/data/demos.json` holds only the approved public layer: no customers, places or metrics.
  - It is generated outside this repository from a private review workspace.
  - The export refuses to write if a customer name, place, internal host, percentage, amount, URL or email appears in public text.
- **Public videos** are served from R2 by the `arpagon-demos-vault` Worker at `https://arpagon.co/demos/media/<id>.mp4`.
  - They are cached for one day and support byte ranges.
  - They stay out of git; posters (`public/media/demos/*.webp`) are small and committed.
- **Private videos**:
  - `/demos/acceso/` is the request form, with Turnstile. It posts to the Worker at `/demos/api/solicitar`.
  - The owner receives an email with a signed approval link and approves for 7, 14 or 30 days. Approval requires a click on a POST button, not just opening the link.
  - The owner then sends the visitor a personal, expiring link: `/demos/acceso/t/<token>`.
  - That link sets an HttpOnly cookie scoped to `/demos/` and opens `/demos/privado/`. The page is a static shell that loads the private layer from `/demos/api/biblioteca` and streams videos from `/demos/privado/v/<id>.mp4`.
  - Access tokens are stateless and HMAC-signed. They can be revoked by email, by token id or by a global cutoff.
  - The Worker logs requests, approvals, opened links and video views.
- Access and library pages are `noindex` and excluded from the sitemap.
- **404**: add `src/pages/404.astro`. Without it, Pages served the home page with status 200 for any unknown URL.

## Privacy checks

- `check-dist` verifies:
  - all pages are present;
  - no non-public card ships a video or poster;
  - video URLs only use `https://arpagon.co/demos/media/`;
  - the access and library pages are `noindex`.
- A local `.banned-terms.local` (gitignored) generated from the private catalog adds customer names, places and internal hosts to the build scan.

## Rollout

1. Deploy the Worker with routes narrowed to the paths it owns (done before this PR, so the preview can play public videos).
2. Merge this PR: Pages starts serving `/demos/`, `/demos/acceso/` and `/demos/privado/`.
3. Verify in production:
   - pages in three languages;
   - public videos;
   - 404 status;
   - a full private request → approve → link → library → video cycle.
