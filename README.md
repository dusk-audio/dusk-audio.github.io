# Dusk Audio Website

Official website for Dusk Audio: Dusk Studio and a collection of free audio plugins.

**Live site:** https://duskaudio.com

## Local Development

### Prerequisites

- Ruby 2.7+ with Bundler
- Jekyll 4.x

### Setup

```bash
# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000/
```

## Structure

```
├── _config.yml          # Site configuration
├── _data/
│   ├── plugins.yml      # Plugin database, generations, and display order
│   └── studio.yml       # DAW version and release state
├── _includes/           # Reusable components
├── _layouts/            # Page templates
├── _plugins/            # Individual plugin pages
├── assets/
│   ├── css/style.css    # Existing product-page styles
│   ├── css/showcase.css # Shared studio design and responsive showcase layouts
│   ├── js/showcase.js   # Navigation, accessible screenshot zoom, scrollable content
│   └── images/          # Images and screenshots
├── builds-gate/         # Cloudflare Worker gating patron builds at builds.duskaudio.com
├── plugins/             # Plugins listing page
├── index.md             # Home page
├── about.md             # About page
├── dusk-studio.md       # Dusk Studio product page
└── support.md           # Support/donation page
```

## Page themes

Every page uses the same charcoal palette, warm white text, and amber accents
defined in `assets/css/showcase.css`. Slightly lighter charcoal surfaces separate
headers, product information, installation details, and footers. Shared components
use the same color tokens so navigation, downloads, and newsletter forms remain
consistent when moving between the DAW, plugins, and information pages.

## Adding a New Plugin

1. Add the plugin entry to `_data/plugins.yml`
2. Create a page in `_plugins/` (copy an existing one as template)
3. Add screenshot to `assets/images/plugins/`

Use `generation: current` for DAF plugins and `generation: legacy` for the original
JUCE collection. Set `display_order`, `category`, and a short `summary` for the
collection cards. Release `status` is separate from development generation:
legacy products still have working downloads and bug-fix support. Only released
or pre-release entries appear as downloadable cards. Add `successor` only when
the replacement has an existing product page and a published download.

## Dusk Studio releases

`_data/studio.yml` controls the beta version and the takes showcase labels.
While 0.15 is pending, keep `release_status: upcoming` and the actual published
beta in `published_version`. Once the official 0.15 build is available, set
`release_status: released` and `published_version: "0.15.0"`. The hero and feature
labels update together. Do not change this simply because a release is planned.

Official beta builds use the existing Patreon flow. A purchase option is planned
for 1.0, with pricing, terms, and timing to be announced separately. Plugins remain
free. Do not advertise a 1.0 date or a future license benefit without confirmed terms.

## Product screenshots

The website uses real application captures, converted to lossless WebP in
`assets/images/studio/`. No generated mockup interface imagery is shipped.

| Website asset | Dusk Studio capture |
| --- | --- |
| `console.webp` | `full-mix-playing.png` |
| `recording.webp` | `qg-04-record-rolling.png` |
| `takes.webp` | `docs/images/ed-06-take-lanes.png` |
| `mastering.webp` | `np-08-mastering-view.png` |
| `instrument.webp` | `bi-05-sunset.png` |
| `channel.webp` | `np-03-channel-strip-mixing.png` |

Console, recording, mastering, instrument, and channel images were recaptured
from the local development binary. The takes image is the inspected documentation
capture, chosen for its readable portrait layout. These demonstrate the 0.15
development UI; they are not proof that 0.15 has been released.

The console hero was refreshed on October 5, 2026 from actual playback of an
isolated 16-track session using existing local multitrack audio. All ten visible
channels, four buses, and the stereo master show live levels. The 2560×1080 capture
is lossless WebP; no audio files are included in the website. Capture evidence is
in `/tmp/dusk-full-mix-capture/`.

Use the DAW's capture harness on an isolated Xvfb display, with
`DUSKSTUDIO_CONFIG_DIR` pointing at a temporary folder to preserve personal audio
and window settings. Reject captures containing warnings, dialogs, or incomplete
native panels. Check dimensions before updating image width/height attributes.

### Plugin screenshots

`_data/plugin_screenshots.yml` records the published release, capture date,
format, dimensions, and SHA-256 for each website plugin image. The October 5,
2026 refresh captured all 11 released plugins from their published Linux x86_64
binaries, with CLAP for ten plugins and LV2 for Spectrum Analyzer. Mode galleries
use those same binaries. These captures do not imply that PDF manuals were rebuilt.

When updating a plugin release, refresh both its collection-card screenshot and
all product-page gallery/body images from the released binary. Record the new
version and image hashes in the manifest, and update explicit image dimensions.
Use an isolated Xvfb display for native captures; keep host chrome, tooltips,
and unrelated dialogs out of the image. Give analyzers real audio or MIDI input
when showing their analysis. Check the page and carousel on desktop and mobile.

## Validation

```bash
bundle exec jekyll build --strict_front_matter
git diff --check
```

Check the homepage, DAW showcase, collections, and product pages at desktop and
mobile widths. Test the menu, screenshot zoom (including Escape and focus return),
plugin carousel, installation accordions, and navigation without JavaScript.
Confirm download filenames against published GitHub release assets. The latest
visual comparison and validation notes are in `design-qa.md` (excluded from the
published site).

## Email signup

“Get updates” stays visible outside the mobile menu. Contextual prompts open the
same MailerLite form in an accessible dialog; closing restores it to the footer.
There is one embed and one input, including after success. Without JavaScript,
links scroll to the footer and the form posts directly to MailerLite. Field and
network failures show inline messages. No timed popup or email gate is used.

Signup browser tests intercept MailerLite requests: they do not create subscribers
or prove actual confirmation-email delivery.

Audio demonstrations are deferred until real recordings are available. The
rejected generated examples, players, session download, and related walkthrough
have been removed.

## License

Website content © Dusk Audio. All rights reserved.
