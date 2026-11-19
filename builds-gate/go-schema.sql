-- Click counts for the /go links (builds-gate/src/index.js, "link counter").
-- One row per UTC day, destination, link and campaign label.
--
--   npx wrangler d1 execute dusk-go --remote --file=go-schema.sql
CREATE TABLE IF NOT EXISTS go_counts (
  day      TEXT    NOT NULL,            -- UTC date, YYYY-MM-DD
  dest     TEXT    NOT NULL,            -- patreon | join | site
  place    TEXT    NOT NULL,            -- the link clicked (?at=), or for dest "site" the page landed on (?page=)
  campaign TEXT    NOT NULL,            -- the announcement that brought the visitor (?from=); '' when none
  n        INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, dest, place, campaign)
);
