# Dusk Studio build gate (Cloudflare Worker, Patreon OAuth)

Serves the official Dusk Studio binaries from the **private** `dusk-studio-releases`
repo, and early-access plugin releases from the **private** `dusk-plugins-early` repo, to
**active $1+ Patreon members** of the Dusk Audio campaign. New members join at $5+; the
closed $1 and $3 tiers keep access. The Worker verifies
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

`/early` lists plugin releases still inside their early-access window and serves them
through `/edl/<id>`. The plugins repo's release workflows mirror each early-access release
there (see `.github/scripts/early_access.sh` in dusk-audio-plugins); its notes start with
"Free for everyone on YYYY-MM-DD", and the page hides it once that day arrives because the
release is public on GitHub by then. Sign-in from `/early` returns to `/early`.

A visitor the gate turns away sees which Patreon account they signed in with, what
Patreon shows for it (payment declined, membership ended, free membership, or no Dusk
Audio membership), how to retry with another account, and the `SUPPORT_EMAIL` address.
A download link opened without a live session asks to sign in again; it never claims
the visitor isn't a member. We never store Patreon tokens. The
membership check happens once at login and the access/refresh tokens are discarded;
only a signed `{exp}` lives in the cookie. `/manual` stays public (no login).

## One-time setup

1. **GitHub PAT**: fine-grained token, **read-only `Contents` on `dusk-audio/dusk-studio-releases`
   and `dusk-audio/dusk-plugins-early` only**.
2. **Patreon OAuth client**: Patreon → Account settings → **API / Developers** → Create Client.
   - Redirect URI: `https://builds.duskaudio.com/auth/callback` (must match `OAUTH_REDIRECT_URI`).
   - Copy the **Client ID** and **Client Secret**.
3. **Campaign id**: Dusk Audio's Patreon campaign id. Get it from the Patreon API
   (`GET /api/oauth2/v2/identity?include=memberships,memberships.campaign` while logged in as
   the creator, or `GET /api/oauth2/v2/campaigns`). Put it in `wrangler.toml` → `DUSK_CAMPAIGN_ID`.
4. **Session secret**: `openssl rand -hex 32`.
5. **Config** in `wrangler.toml [vars]`: `RELEASES_REPO`, `EARLY_REPO`, `PATREON_JOIN_URL`, `DUSK_CAMPAIGN_ID`, `DUSK_CREATOR_USER_ID`,
   `OAUTH_REDIRECT_URI`, `SESSION_TTL_HOURS`, `FREE_DOWNLOADS="0"`.
6. **Secrets** (never committed):
   ```
   wrangler login
   wrangler secret put PATREON_CLIENT_ID
   wrangler secret put PATREON_CLIENT_SECRET
   wrangler secret put SESSION_SECRET     # the openssl rand value from step 4
   wrangler secret put GH_PAT             # the fine-grained PAT
   ```
7. **Deploy**: merge to `main` (see Deploys below); by hand only in an emergency: `npm install && npm run deploy`
8. **Custom domain**: add `builds.duskaudio.com` as a Worker custom domain (Cloudflare
   dashboard → the Worker → Settings → Domains & Routes), or uncomment `routes` in `wrangler.toml`.
9. **Test** (see below).

## Per-release workflow

- Publish the build to the private `dusk-studio-releases` repo as the **latest** release.
- Nothing else: the website button (`https://builds.duskaudio.com/latest`) and the gate always
  serve the newest published **non-prerelease** release.
- Tag CI and single-platform builds as **prereleases**. The gate skips them, so a Windows-only
  artifact can't shadow the full release patrons are entitled to. Only if the repo has no
  stable release at all does the gate fall back to the newest prerelease.
- `/manual` serves the `MANUAL.pdf` from that same release, falling back to the newest release
  that has one if the current build shipped without it.

## Testing

- As an **active $1+ patron**: `/latest` → Sign in with Patreon → authorize → build list → a
  file downloads (302 to a GitHub signed URL).
- As the **campaign owner** (Patreon user `DUSK_CREATOR_USER_ID`): same flow, lands on the build
  list without a pledge. This is the way to check a release on the live site.
- As a **non-member**: same start → after Patreon auth → "We couldn't find your membership"
  page with Patreon's reason, no files. `GET /dl/<id>` with no session → 403 sign-in page.
- **Cancellation**: cancel the pledge; after `SESSION_TTL_HOURS`, `/latest` re-auths and blocks.
- `curl -s https://builds.duskaudio.com/latest` (no cookie) → the sign-in page, not the file list.
- `/manual` loads the PDF with no login.
- `node --test` runs the unit tests, including the whole sign-in against a stubbed Patreon.
- `builds-gate/smoke.sh` checks the live gate from outside (`/health`, sign-in pages, the
  OAuth redirect, `/manual`, a download link); with `HEALTH_TOKEN` set, also that every
  member file downloads. CI runs it after each deploy and every 30 minutes.

## Deploys, and what stops a change from breaking downloads

Merges to `main` deploy the gate; don't deploy from a laptop.

- **Before merge**: `main` is protected. A pull request can't merge until two checks pass:
  `gate-tests` (these unit tests) and `site-downloads` (the site is built and every
  download link on it checked: the Dusk Studio main button opens `/latest`, every gate
  link is a page the gate serves, every plugin download answers 200). Both run on every
  pull request, whatever it changes.
- **Deploy** (`.github/workflows/builds-gate.yml`, job `deploy`): on a push to `main` that
  changes `builds-gate/`, the tests run again, `wrangler deploy` ships the Worker, and
  `smoke.sh` runs with the deep `/health` check. If that fails four times over a minute,
  the job runs `wrangler rollback` to the version before and fails, which emails you.
- **After**: the smoke check every 30 minutes and the site check every 6 hours catch what
  changes outside a pull request: a new Dusk Studio release missing a platform, a GH_PAT
  that expired or lost a repo, a plugin release turned back into a draft.

The deep `/health` check (`Authorization: Bearer <HEALTH_TOKEN>`) reports: the newest
stable Dusk Studio release has the Linux x86_64, Linux aarch64, macOS and Windows files,
GitHub hands out every one of them and every file `/early` lists, and Patreon knows
`PATREON_CLIENT_ID`. It can't prove `PATREON_CLIENT_SECRET` without a real sign-in;
a wrong one shows as `"step":"token","why":"invalid_client"` in the logs.

Secrets for CI (repo Settings → Secrets and variables → Actions):
`CLOUDFLARE_API_TOKEN` (a Cloudflare API token from the "Edit Cloudflare Workers"
template), `CLOUDFLARE_ACCOUNT_ID`, and `HEALTH_TOKEN`, the same random value as the
Worker's secret (`openssl rand -hex 32`, then `wrangler secret put HEALTH_TOKEN`).

Emergency deploy by hand: `npm run deploy` (runs the tests first), then
`HEALTH_TOKEN=... ./smoke.sh`; `npx wrangler rollback` undoes it.

An `early-access/<date>` website branch (see the plugins repo's `early_access.sh`) goes
into `main` through a pull request too, once its release is public, so `site-downloads`
can check its links.

## When a patron can't download

Every sign-in writes one JSON log line with `"gate":true`. Find it in the dashboard
(Workers → dusk-builds-gate → Logs) or live with `npx wrangler tail --format pretty`:

- `"outcome":"refused"` with `reason`, plus Patreon's own `status` and `cents`:
  `declined` (Patreon marked the payment declined), `former`, `free` (free follow or a
  pledge under $1), `none` (no membership of `DUSK_CAMPAIGN_ID` on that account, usually
  a second Patreon account). Compare with the member's page in Patreon's dashboard.
- `"outcome":"failed"`: `step` `token` with `why` `invalid_client` means
  `PATREON_CLIENT_ID`/`PATREON_CLIENT_SECRET` are wrong, and nobody can sign in;
  `invalid_grant` is one visitor's stale code. `step` `callback` is a lost state cookie or
  a cancelled sign-in. `step` `download` with `http` 404 means `GH_PAT` lost a repo.
- No line at all: they never got back from Patreon to `/auth/callback`.

`/health` answers `{"ok":true,...}` when the config is set and both repos can be read.

## Notes / tradeoffs

- **Session TTL** bounds how long a just-cancelled patron keeps access (default 6h). Shorter =
  tighter enforcement, more re-logins; Patreon SSO makes re-login a fast redirect.
- `FREE_DOWNLOADS="1"` is an **emergency public override** that drops the gate on the Dusk
  Studio builds (`/latest`, `/dl`), e.g. to make a build public. Early access (`/early`, `/edl`)
  always needs a member session, so a members-only prerelease never goes public. Default `"0"`.
- Security: signed `HttpOnly`/`Secure`/`SameSite=Lax` cookies; CSRF `state` on the OAuth
  round-trip; constant-time signature compare; numeric-only GitHub asset id (blocks SSRF).
- Binaries are GPL-3.0; members may legally redistribute. Don't add DRM.
- If a build exceeds GitHub release-asset size limits, move storage to Cloudflare R2 and point
  `/dl` at a presigned R2 URL. Same session gate, different storage.
