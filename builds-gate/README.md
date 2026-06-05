# Dusk Studio build gate (Cloudflare Worker, tokenized)

Serves the official Dusk Studio binaries from the **private** `dusk-studio-releases`
repo to anyone holding the current access token. You paste the token link inside a
**patrons-only ($1+) Patreon post** — Patreon's post-gating is the paywall; this Worker
is just the delivery door so patrons don't need GitHub access. The GitHub token never
reaches the browser.

Independent of the Jekyll site (excluded from the Pages build).

## How it works

```
Patron reads a $1+ gated Patreon post
  -> clicks  https://builds.duskaudio.com/latest?t=<DL_TOKEN>
  -> Worker checks the token -> lists the latest release files
  -> /dl/<id>?t=<DL_TOKEN> -> 302 to a short-lived GitHub signed URL
```

Non-patrons / wrong token -> a "Get access on Patreon" page.

## One-time setup

1. **GitHub PAT** — fine-grained token, **read-only `Contents` on `dusk-audio/dusk-studio-releases` only**.
2. **Pick an access token** — a long random string, e.g. `openssl rand -hex 24`.
3. **Config** — `wrangler.toml [vars]`: `RELEASES_REPO`, `PATREON_JOIN_URL` (already set).
4. **Secrets** (never committed):
   ```
   wrangler login
   wrangler secret put DL_TOKEN     # paste the random string from step 2
   wrangler secret put GH_PAT       # paste the fine-grained PAT
   ```
5. **Deploy**: `npm install && npm run deploy`
6. **Custom domain**: add `builds.duskaudio.com` as a Worker custom domain (Cloudflare
   dashboard → the Worker → Settings → Domains & Routes), or uncomment `routes` in `wrangler.toml`.
7. **Test**: open `https://builds.duskaudio.com/latest?t=<DL_TOKEN>` — you should see the
   latest release's files and be able to download. Open it without `?t=` — you should get
   the "Get access on Patreon" page.

## Per-release workflow

- Publish the build to the private `dusk-studio-releases` repo as the **latest** release.
- In the patrons-only Patreon post, paste: `https://builds.duskaudio.com/latest?t=<DL_TOKEN>`
- That link always serves the newest release, so you can reuse it every post.

## Rotating the token (if a link leaks)

```
wrangler secret put DL_TOKEN     # new random value -> old links die instantly
```
Then put the new `?t=` link in future posts.

## Local dev

```
cp .dev.vars.example .dev.vars   # fill DL_TOKEN + GH_PAT
npm install
npm run dev
```

## Notes / tradeoffs

- This is a **bearer link**: a patron *could* copy it out and it would work until you
  rotate the token. Patreon's $1+ post-gate is the real fence; the link is delivery.
  Fine for alpha. If sharing ever becomes a problem, upgrade to the Patreon-OAuth gate
  (full membership check per download) — that code is in git history.
- Binaries are GPL-3.0; patrons may legally redistribute. Don't add DRM.
- If a build exceeds GitHub release-asset size limits, move storage to Cloudflare R2 and
  point `/dl` at a presigned R2 URL — same token gate, different storage.
