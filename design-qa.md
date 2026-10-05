# Website redesign QA

final result: passed

## Unified site theme — October 5, 2026

Latest approved direction: carry the DAW's charcoal palette across every page.
This supersedes the earlier dark-DAW/light-site split below. The shared root
tokens now define charcoal backgrounds, warm white text, amber links/buttons,
and lighter charcoal panels. Headers, footers, plugin pages, About, Support,
404, installation code, status badges, newsletter fields, and support boxes use
the same palette. Product screenshots, typography, layouts, and links are retained.

Evidence: `/tmp/dusk-site-unified-theme-2026-10-05/`. `plugins-comparison.png`,
`about-comparison.png`, and `support-comparison.png` combine the previous light
pages and revised dark pages at matching 1440 × 1000 dimensions. Desktop and
mobile captures use deviceScaleFactor 1, loaded fonts/images, and signed-out
state. Representative evidence includes `plugins-1440-top.png`,
`sunset-390-top.png`, `home-plugins-1440.png`, and `about-menu-390.png`.
The changes in palette are intentional; headings, spacing, image quality, and
content retain the existing design. No actionable P0/P1/P2 differences remain.

During validation, the old plugin support button had insufficient contrast with
the new amber tokens. Replaced its white/amber styling with a charcoal panel and
an amber button with dark text. Post-fix evidence: `all-pages-report.json`.
All 34 page/viewport checks and twelve interaction checks pass, with no detected
WCAG A/AA violations, overflow, missing visible images, or page JavaScript errors.
Strict Jekyll build and `git diff --check` also pass. Chromium coverage and
previously documented external-flow limitations still apply.

## Earlier theme refinement — October 5, 2026 (superseded)

Marc approved a dark Dusk Studio page and homepage DAW opening, with warm ivory
for the remaining homepage sections, plugin pages, About, and Support. This
supersedes the original mockup's alternating DAW sections and dark plugin band.
Typography, amber accents, product imagery, and layouts retain the selected
direction. The synth heading now describes six vintage synth circuits and one
expressive instrument instead of “Instruments for real music.”

Theme evidence: `/tmp/dusk-site-theme-2026-10-05/`. Desktop/mobile viewports are
1440 × 1000 and 390 × 1000 at deviceScaleFactor 1, with fonts and images loaded.
`studio-record-1440.png` shows the continuous dark DAW treatment;
`studio-details-390.png` shows readable dark installation details;
`plugins-1440-top.png`, `sunset-390-top.png`, and `about-menu-390.png` show light
headers, content, and mobile navigation. `home-plugins-1440.png` shows the light
homepage plugin section. Shared footers and newsletter sections inherit their
page palette. Computed surface colors are recorded in `surfaces.json`.
`plugins-theme-comparison.png` combines the prior dark collection header and
the new light header at matching 1440 × 1000 dimensions. The palette difference
is intentional; the typography, grid, and product image treatment are retained.

The theme change passed all 34 desktop/mobile page checks and twelve interaction
checks with no detected WCAG A/AA violations, overflow, missing visible images,
or page JavaScript errors. Evidence: `all-pages-report.json`. The final homepage
and plugin collection copy received four additional desktop/mobile checks in
`final-copy-checks.json`. Earlier screenshot-comparison notes below document the
initial redesign rather than the superseding theme revision.

## Comparison target and evidence

Source visual truth: selected option 1 at
`/home/marc/.codex/generated_images/01a106da-de50-70a3-9895-edb31b0baa82/exec-181df76a-0746-44e4-b2c2-56e11c9ef6b0.png`.

Implementation: `http://127.0.0.1:4000/`, captured using local headless Google
Chrome through Playwright. The in-app browser was unavailable; Marc explicitly
approved this fallback. No personal browser profile was used.

Source pixels: 1122 × 1402, normalized to 1440 × 1800 for comparison.
Implementation pixels and CSS viewport: 1440 × 1800, deviceScaleFactor 1.
State: signed-out homepage, scroll position zero, fonts loaded, dialog and menu
closed. The source is an art-direction mockup, rather than a browser capture;
native screenshots and verified product copy intentionally replace mock content.

Evidence directory: `/tmp/dusk-site-qa/evidence/`.

- Rendered implementation: `home-reference-viewport.png`.
- Full-view combined comparison: `comparison-final.png` (source left, site right).
- Focused combined comparisons: `hero-detail.png` and `takes-detail.png`.
  These compare corresponding typography and feature regions; section positions
  differ slightly because the real images retain their native proportions.
- Mobile implementation: `home-mobile-top.png`, `plugins-390-top.png`.
- DAW showcase: `dusk-studio-1440-top.png`; full-page evidence for every route
  is listed in `report.json`.

## Findings and iteration history

No actionable P0/P1/P2 findings remain.

1. Initial comparison: blocked. [P2] The hero consumed too much vertical space,
   the takes heading wrapped into three desktop lines, and the feature copy
   was vertically centered against the image. Evidence: `comparison-initial.png`.
   Tightened header/hero spacing, adjusted display type scale and the two-column
   grid, and aligned the takes copy to the image top.
2. Second comparison: blocked. [P2] The landscape takes capture weakened the
   intended composition and made the lanes less readable. Used the genuine
   portrait documentation capture, preserving its aspect ratio. Evidence:
   `comparison-round2.png`.
3. Final comparison: passed. Evidence: `comparison-final.png`, `hero-detail.png`,
   `takes-detail.png`. The opening hierarchy, charcoal/ivory transitions,
   condensed headings, warm accents, and screenshot emphasis follow option 1.
4. Browser checks also found [P2] inline links distinguished only by color and
   [P2] installation code overflowing a phone viewport. Added underlines and
   contained horizontal scrolling for code/specifications, with keyboard focus.
   The final automated checks found neither issue.

## Required fidelity surfaces

- **Typography:** Saira Condensed supplies the heavy display hierarchy, with
  readable system sans body/control text. Desktop heading line breaks and
  mobile wrapping were inspected. The mock's unknown exact font and raster
  antialiasing differ acceptably from browser text.
- **Spacing/layout:** Hero, console, takes, and dark plugin spotlight retain
  the selected composition. Actual screenshot proportions and additional
  released-product cards lengthen later sections intentionally. Mobile grids
  stack cleanly; navigation and CTAs remain accessible.
- **Colors:** Charcoal, warm ivory, muted body text, and amber accents match
  the direction. Links, focus states, and controls have sufficient contrast
  in the checked states.
- **Images:** Six real DAW captures use lossless WebP. Original plugin images
  remain uncropped within collection cards. The generated mock UI is not used
  as a product screenshot. Enlarging preserves legibility and restores focus
  on close. No fake interface drawings substitute for product assets.
- **Copy:** DAW and plugin offers are distinct. Plugins remain free. Official
  beta builds use the existing Patreon flow; source builds remain available.
  1.0 purchase pricing and timing are unannounced. 0.15 takes are marked upcoming
  until the release data is updated. Legacy JUCE products explicitly retain
  bug-fix support with no new feature development.

## Validation

- Strict Jekyll build passes; JavaScript syntax and `git diff --check` pass.
- All 17 HTML pages have valid local asset/link targets and unique IDs.
- 34 browser page/viewport cases: 1440 × 1800 and 390 × 844. No horizontal
  page overflow, missing visible images, or axe WCAG A/AA violations detected.
- Twelve extra layout cases at 320, 768, and 769 pixels wide have no overflow.
- Twelve interaction checks pass: mobile menu, Escape and focus return,
  keyboard screenshot zoom, plugin carousel, installation accordion, and
  mobile navigation with JavaScript disabled. No page JavaScript errors recorded.
- All 44 direct plugin download targets match published GitHub release assets;
  evidence: `/tmp/dusk-site-qa/release-check.json`.

Limitations: Chromium only; no Safari/Firefox or physical-device checks.
Automated accessibility checks do not replace a screen-reader audit. Newsletter
submission and authenticated Patreon downloads were not exercised. No publishing
or release action was performed.

## Implementation checklist

- [x] Implement selected direction using real product images.
- [x] Showcase takes, recording, mixing, instruments, and mastering.
- [x] Present current DAF plugins first and supported legacy JUCE separately.
- [x] Preserve existing downloads and installation information.
- [x] Validate responsive layouts, keyboard interactions, and accessibility.
- [x] Record final visual comparison and remaining coverage limits.

Release follow-up: when official 0.15 builds ship, update `release_status` to
`released` and `published_version` to `0.15.0` in `_data/studio.yml`.


## Plugin release screenshots — October 5, 2026

- All 11 released plugin versions in the catalog and product pages match the
  latest published GitHub releases checked today. Download tags remain unchanged.
- Refreshed 42 images from those released Linux x86_64 binaries: 11 card images,
  six Sunset Circuits modes and its preset browser, three Multi-Q modes, eight
  Multi-Comp modes, twelve visible DuskVerb engines, and TapeMachine 2 calibration.
- TapeMachine 2 v1.0.11 now shows the faceplate selector, with an additional gallery
  image displaying +3, +6, +7.5, and +9 dB. Added those levels to its features.
- 4K EQ 2 now shows v1.0.5, replacing an image labeled v2.0.11. DuskVerb now includes
  Parallel Hall and describes twelve selectable engines, matching the released UI.
- Captures used CLAP for ten plugins and LV2 for Spectrum Analyzer. Chord Analyzer
  received a C-major MIDI triad; Spectrum Analyzer received real generated audio.
  Other screenshots show idle interfaces and do not pretend to show live processing.
- Release URLs, dimensions, and SHA-256 hashes are recorded in
  `_data/plugin_screenshots.yml`. Capture evidence is in
  `/tmp/dusk-plugin-captures-2026-10-05/`.
- PDF manuals were not regenerated. Native captures cover Linux, not macOS/Windows.

- Validation: strict Jekyll build and `git diff --check` pass. All 26 desktop/mobile
  cases (home, collection, and eleven product pages) have no visible broken images,
  page overflow, JavaScript errors, or axe WCAG A/AA findings. Twelve existing
  interaction checks pass. Eight extra carousel checks cover every slide and
  wrapping in TapeMachine 2, DuskVerb, Sunset Circuits, and Multi-Q at both widths.
  Website evidence is in the capture directory's `website-qa/` folder.


## Final publication review — October 5, 2026

- Fixed two TapeMachine 2 changelog entries parsed as YAML mappings, and escaped
  shared HTML metadata. Rechecked all changelog entries as plain strings.
- Preserved upstream Multi-Q 2 and DuskVerb 2 development listings and builds-gate
  fixes. Kept the 0.1.0 DuskVerb 2 manual matching the current source version.
- Production strict Jekyll build, JavaScript syntax checks, all 17 pages' local
  targets/anchors/IDs, all 44 release download filenames, and 42 screenshot hashes pass.
- After merging upstream changes, all 34 desktop/mobile browser cases and twelve
  interaction checks pass, with no broken visible images, horizontal overflow,
  JavaScript errors, or automated WCAG A/AA findings.
- All twelve post-notify tests pass using mocked services. It is excluded from the
  site and remains in draft mode. Its documentation now clarifies that sequential
  retry deduplication does not serialize overlapping webhook deliveries. The Worker
  requires separate deployment; this website publication does not deploy it or send email.
- Coverage remains Chromium only. No real newsletter submission or authenticated
  Patreon purchase/download was performed; existing PDF manuals were not rebuilt.
- Final build and browser evidence: `/tmp/dusk-publish-final/`.
