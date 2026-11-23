# Owner login for demos

Add a separate Google login to the vault Worker without changing guest links. Use the authorization-code flow with PKCE and a short-lived, signed browser-bound state cookie. After exchanging the code server-side, allow only the configured Google account with a verified email. Issue a short-lived vault session with its own token purpose, honoring existing revocation controls. The access page links to the login in all three locales. Deploy the configured Worker before publishing the button; verify both owner and guest flows.

## Setup

- In Google Cloud, configure a Web OAuth client with the exact redirect URI `https://arpagon.co/demos/api/owner/callback`. If the OAuth app is in testing mode, add the owner's Google account as a test user.
- Configure `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `GOOGLE_OWNER_EMAIL` on `arpagon-demos-vault`. Keep the client secret in a Worker secret. Use the primary Google account email returned by Google, not a plus-address used for notifications.
- Verify sign-in, sign-out, and playback as owner; verify a different account is denied and a guest link still works.
