#!/usr/bin/env bash
# Checks the built site for the links people download from, so a site change can't
# quietly send members or plugin users somewhere that doesn't download. Run by
# .github/workflows/site-downloads.yml on every pull request (a required check), on
# every push to main and every 6 hours, since a plugin release can change on GitHub
# without a site change.
#
#   .github/scripts/check-downloads.sh [SITE_DIR]     (default _site, after `jekyll build`)
#
# 1. The Dusk Studio page's main button opens the build gate (members' download page).
# 2. Every builds.duskaudio.com link goes to a page the gate serves.
# 3. Every plugin download and release-page link on GitHub answers 200 (a draft release
#    or a version that was never published answers 404).
set -uo pipefail

SITE="${1:-_site}"
GATE="https://builds.duskaudio.com"
failed=0
fail() { echo "FAIL $*"; failed=1; }

page="$SITE/dusk-studio/index.html"
if [ ! -f "$page" ]; then
  fail "$page is missing; build the site first"
elif grep -qE "class=\"btn btn-primary\" href=\"${GATE//./\\.}/latest\"" "$page"; then
  echo "ok   Dusk Studio page: main button opens $GATE/latest"
else
  fail "Dusk Studio page: the main (btn-primary) button must link to $GATE/latest, where members download"
fi

links() { grep -rhoE "$1" "$SITE" --include='*.html' | sort -u; }

bad=$(links "${GATE//./\\.}[^\"' <>]*" | grep -vE "^${GATE//./\\.}/(latest|early|manual)?$")
if [ -n "$bad" ]; then
  fail "links to gate pages that don't exist (the gate serves /latest, /early, /manual):"
  sed 's/^/       /' <<<"$bad"
else
  echo "ok   every $GATE link goes to a page the gate serves"
fi

urls=$(links "https://github\.com/dusk-audio/dusk-audio-plugins/releases/(download|tag|latest/download)/[^\"' <>]+")
n=0
for u in $urls; do
  n=$((n + 1))
  code=$(curl -sS -o /dev/null -I -L --retry 2 --max-time 30 -w '%{http_code}' "$u")
  [ "$code" = 200 ] || fail "$u answered $code"
done
[ "$n" -gt 0 ] || fail "found no plugin download links; did the plugin pages change?"
[ "$failed" = 1 ] || echo "ok   all $n plugin download and release links answer 200"

exit "$failed"
