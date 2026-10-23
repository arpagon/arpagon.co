# Personal links for restricted demo editions

## Goal

Keep the current public catalog and owner-approved original-video library. Add expiring personal links that unlock a separate edited edition directly inside `/demos/`, without requiring the recipient to submit a form. An edited-edition viewer can request access to the originals using the existing flow.

## Access boundaries

1. Public: existing public demos and approved descriptions only.
2. Edited: a signed, purpose-bound personal token grants only the edited edition. Default 14 days; 7/14/30 available. No original-video or customer-context access.
3. Originals: the existing approval flow and existing personal links remain valid and continue to grant the original private library.

Edited editions remain restricted. They are not represented as guaranteed anonymous. Storage keys, private metadata and tokens never enter the public data export or repository.

## Implementation

- The Worker handles token-bearing catalog requests before HTML is returned. Validate, exchange for a separate HttpOnly/Secure session cookie, remove the token via redirect, then serve the unchanged static catalog shell.
- Ordinary catalog requests pass through to Pages; all three locales retain canonical clean URLs. Token redemption responses use no-store/no-referrer/noindex, and never echo the bearer token into markup.
- Add an edited-library API and ranged media route with independent token purpose/cookie checks. The edited API exposes only approved card IDs, media dimensions/duration and session information, never original/customer metadata.
- Private R2 prefixes remain separate from public media. Preserve original objects and existing token semantics. Both restricted editions use no-store and server-side authorization on GET/HEAD/range requests, including expiry/revocation.
- Owner-only issuance uses a separate secret and a local CLI, not a secret embedded in the website or an anonymous public grant endpoint. Links are manually shared. No new visitor email delivery claim.
- Client-side progressive enhancement unlocks edited players on existing private cards after the authenticated API succeeds. Keep the original-request CTA visible. Include a personal watermark/session notice, sign-out and localized failure/expiry messages. Do not autoplay.
- Upload only reviewed, explicitly selected edited artifacts to the private bucket, preserving their source bytes and a local integrity manifest. Do not add private posters/media to Pages or the public catalog JSON.

## Verification

- Regression: original request → approval → existing link → original library/video still works.
- Scope matrix: edited token/cookie cannot access originals or customer-context JSON; original token cannot be substituted as an edited-purpose token. No token, tampered, expired and revoked credentials fail closed.
- Original and edited cookies coexist; opening an edited link does not downgrade or overwrite an original session. Sign-out clears both.
- Range/HEAD/full responses are authorized and no-store. Public media stays unchanged. Source/R2 size and integrity checks pass; unexpected objects fail verification.
- Catalog token redemption removes query credentials before static HTML/assets are fetched; localized redirects, noindex/no-referrer, invalid tokens and passthrough behavior tested.
- Site tests, build/privacy guards, browser desktop/mobile playback and locale checks. No private media, names or grant values in static output.

## Rollout

Upload edited artifacts privately and prepare/test the backend without breaking existing routes. Open a site PR. Do not merge the PR or activate a visitor-facing production change without approval. Verify production public, edited and original access boundaries after the coordinated release.

## Pre-release status

- Twenty edited recordings uploaded unchanged to private storage; existing originals and public objects retained. No edited assets or private metadata added to Pages/Git.
- Worker: 19 tests and real local workerd smoke pass, including original-flow regression, independent scopes/cookies, owner issuance, expiry/revocation and range/HEAD responses. Deployment dry run passes; production backend/routes not yet activated.
- Browser: harmless fixtures verify 20 unlocked cards, URL cleanup, playback, viewer watermark, negative original access, cookie coexistence and sign-out/back behavior. EN/ES/PT and mobile layout verified.
- Site: typecheck, privacy tests and build guards pass. Added typecheck dependencies and explicit boolean conversion for two existing terminal toggles to support the current DOM typings. One pre-existing Zod deprecation hint remains.
- Coordinated release remains gated on PR approval. The static preview deliberately has no restricted-edition API or media access.
