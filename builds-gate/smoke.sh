#!/usr/bin/env bash
# Live check of the deployed gate, from outside, the way a visitor reaches it. Run by
# .github/workflows/builds-gate.yml after every deploy (a failure rolls the deploy back)
# and every 30 minutes (a failure emails the repo owner). It can't sign in to Patreon, so
# it checks everything up to Patreon's door: the config and GitHub access (/health), the
# sign-in pages, the OAuth redirect and a download link. With HEALTH_TOKEN set it also
# runs the deep /health check: every file of the newest Dusk Studio release and of the
# early-access listing downloads, and Patreon knows the client id.
#
#   [HEALTH_TOKEN=...] builds-gate/smoke.sh [BASE_URL]     (default https://builds.duskaudio.com)
# REQUIRE_DEEP=1 makes a missing HEALTH_TOKEN a failure (CI sets it).
set -uo pipefail

BASE="${1:-https://builds.duskaudio.com}"
CALLBACK="https%3A%2F%2Fbuilds.duskaudio.com%2Fauth%2Fcallback"
failed=0
body=$(mktemp)
trap 'rm -f "$body"' EXIT

# check NAME PATH EXPECTED_STATUS [REGEX]: the regex must match the body, or for a
# redirect the Location.
check() {
  local name="$1" path="$2" want="$3" pattern="${4:-}" status location
  read -r status location < <(curl -sS --max-time 30 -o "$body" -w '%{http_code} %{redirect_url}\n' "$BASE$path")
  if [ "$status" != "$want" ]; then
    echo "FAIL $name: $path answered $status, expected $want"
    failed=1
  elif [ -n "$pattern" ] && ! { grep -qE "$pattern" "$body" || grep -qE "$pattern" <<<"$location"; }; then
    echo "FAIL $name: $path didn't match /$pattern/"
    failed=1
  else
    echo "ok   $name"
  fi
}

check "config and GitHub access" /health 200 '"ok":true'
check "sign-in page" /latest 200 'Sign in with Patreon'
check "early-access sign-in page" /early 200 'Sign in with Patreon'
check "OAuth redirect to Patreon" "/auth/login?next=%2Flatest" 302 \
  "^https://www\.patreon\.com/oauth2/authorize\?.*client_id=[^&]+.*redirect_uri=$CALLBACK"
check "public manual" /manual 200
check "download link asks to sign in" /dl/1 403 'Sign in with Patreon'

if [ -n "${HEALTH_TOKEN:-}" ]; then
  deep=$(curl -sS --max-time 60 -H "Authorization: Bearer $HEALTH_TOKEN" "$BASE/health")
  if grep -q '"deep":true' <<<"$deep" && grep -q '"ok":true' <<<"$deep"; then
    echo "ok   members' files download (deep /health)"
  else
    echo "FAIL deep /health: $deep"
    failed=1
  fi
elif [ "${REQUIRE_DEEP:-0}" = 1 ]; then
  echo "FAIL HEALTH_TOKEN is not set, so the members' files weren't checked"
  failed=1
fi

exit "$failed"
