# Dusk Audio Website

Official website for Dusk Audio — free, high-quality audio plugins.

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
│   └── plugins.yml      # Plugin database (edit this to add/update plugins)
├── _includes/           # Reusable components
├── _layouts/            # Page templates
├── _plugins/            # Individual plugin pages
├── assets/
│   ├── css/style.css    # Stylesheet
│   └── images/          # Images and screenshots
├── builds-gate/         # Cloudflare Worker gating patron builds at builds.duskaudio.com
├── plugins/             # Plugins listing page
├── index.md             # Home page
├── about.md             # About page
├── dusk-studio.md       # Dusk Studio product page
└── support.md           # Support/donation page
```

## Adding a New Plugin

1. Add the plugin entry to `_data/plugins.yml`
2. Create a page in `_plugins/` (copy an existing one as template)
3. Add screenshot to `assets/images/plugins/`

## License

Website content © Dusk Audio. All rights reserved.
