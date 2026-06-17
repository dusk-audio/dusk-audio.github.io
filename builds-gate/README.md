# Dusk Studio build gate (Cloudflare Worker, Patreon OAuth)

Serves the official Dusk Studio binaries from the **private** `dusk-studio-releases`
repo to **active $1+ Patreon members** of the Dusk Audio campaign. The Worker verifies
membership live via Patreon OAuth on each login, mints a short-lived signed session
cookie, and gates downloads on it. The GitHub token never reaches the browser.

Independent of the Jekyll site (excluded from the Pages build).

## How it works

```
Visitor hits  https://builds.duskaudio.com/latest
  -> "Sign in with Patreon"  (/auth/login -> Patreon authorize)
  -> /auth/callback verifies live membership via the Patreon identity API
       active_patron AND currently_entitled_amount_cents >= 100 AND campaign == DUSK_CAMPAIGN_ID
  -> member: signed session cookie (ds_sess), redirect to the build list
  -> /dl/<id> checks the session -> 302 to a short-lived GitHub signed URL
```

Non-members land on a "Join on Patreon" page. We never store Patreon tokens — the
membership check happens once at login and the access/refresh tokens are discarded;
only a signed `{exp}` lives in the cookie. `/manual` stays public (no login).

## One-time setup

1. **GitHub PAT** — fine-grained token, **read-only `Contents` on `dusk-audio/dusk-studio-releases` only**.
2. **Patreon OAuth client** — Patreon → Account settings → **API / Developers** → Create Client.
   - Redirect URI: `https://builds.duskaudio.com/auth/callback` (must match `OAUTH_REDIRECT_URI`).
   - Copy the **Client ID** and **Client Secret**.
3. **Campaign id** — Dusk Audio's Patreon campaign id. Get it from the Patreon API
   (`GET /api/oauth2/v2/identity?include=memberships,memberships.campaign` while logged in as
   the creator, or `GET /api/oauth2/v2/campaigns`). Put it in `wrangler.toml` → `DUSK_CAMPAIGN_ID`.
4. **Session secret** — `openssl rand -hex 32`.
5. **Config** — `wrangler.toml [vars]`: `RELEASES_REPO`, `PATREON_JOIN_URL`, `DUSK_CAMPAIGN_ID`,
   `OAUTH_REDIRECT_URI`, `SESSION_TTL_HOURS`, `FREE_DOWNLOADS="0"`.
6. **Secrets** (never committed):
   ```
   wrangler login
   wrangler secret put PATREON_CLIENT_ID
   wrangler secret put PATREON_CLIENT_SECRET
   wrangler secret put SESSION_SECRET     # the openssl rand value from step 4
   wrangler secret put GH_PAT             # the fine-grained PAT
   ```
7. **Deploy**: `npm install && npm run deploy`
8. **Custom domain**: add `builds.duskaudio.com` as a Worker custom domain (Cloudflare
   dashboard → the Worker → Settings → Domains & Routes), or uncomment `routes` in `wrangler.toml`.
9. **Test** (see below).

## Per-release workflow

- Publish the build to the private `dusk-studio-releases` repo as the **latest** release.
- Nothing else: the website button (`https://builds.duskaudio.com/latest`) and the gate always
  serve the newest published release.

## Testing

- As an **active $1+ patron**: `/latest` → Sign in with Patreon → authorize → build list → a
  file downloads (302 to a GitHub signed URL).
- As a **non-member**: same start → after Patreon auth → "Join on Patreon" page, no files.
  `GET /dl/<id>` with no session → 403.
- **Cancellation**: cancel the pledge; after `SESSION_TTL_HOURS`, `/latest` re-auths and blocks.
- `curl -s https://builds.duskaudio.com/latest` (no cookie) → the sign-in page, not the file list.
- `/manual` loads the PDF with no login.

## Notes / tradeoffs

- **Session TTL** bounds how long a just-cancelled patron keeps access (default 6h). Shorter =
  tighter enforcement, more re-logins; Patreon SSO makes re-login a fast redirect.
- `FREE_DOWNLOADS="1"` is an **emergency public override** that drops the gate entirely
  (e.g. to make a build public). Default `"0"`.
- Security: signed `HttpOnly`/`Secure`/`SameSite=Lax` cookies; CSRF `state` on the OAuth
  round-trip; constant-time signature compare; numeric-only GitHub asset id (blocks SSRF).
- Binaries are GPL-3.0; members may legally redistribute. Don't add DRM.
- If a build exceeds GitHub release-asset size limits, move storage to Cloudflare R2 and point
  `/dl` at a presigned R2 URL — same session gate, different storage.
