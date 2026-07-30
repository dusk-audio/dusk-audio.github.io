---
layout: page
title: Plugins
subtitle: Free audio plugins for Linux, Windows, and macOS
description: Download free VST3, LV2, AU, and CLAP audio plugins from Dusk Audio. EQ, compression, analysis tools and more.
body_class: page-wide
---

All Dusk Audio plugins are **100% free**: no trials, no feature locks, no accounts. Just download and create.

## Available Now

<div class="plugin-grid">
{% assign released = site.data.plugins | where: "status", "released" %}
{% assign prerelease = site.data.plugins | where: "status", "pre-release" %}
{% assign available = released | concat: prerelease | sort: "released" | reverse %}
{% for plugin in available %}
<div class="plugin-card">
  <div class="plugin-card-image">
    <img src="{{ '/assets/images/plugins/' | append: plugin.slug | append: '-screenshot.png' | relative_url }}" alt="{{ plugin.name }} screenshot">
  </div>
  <div class="plugin-card-content">
    <div class="plugin-card-header">
      <h3>{{ plugin.name }}</h3>
      {% if plugin.status == "released" %}
      <span class="status-badge released">Released</span>
      {% else %}
      <span class="status-badge pre-release">Pre-release</span>
      {% endif %}
    </div>
    <p>{{ plugin.description }}</p>
    <div class="plugin-card-footer">
      <a href="{{ '/plugins/' | append: plugin.slug | append: '/' | relative_url }}" class="btn btn-primary">Details</a>
      <a href="{{ site.releases_url }}/tag/{{ plugin.slug }}-v{{ plugin.version }}" class="btn btn-download">Download</a>
    </div>
  </div>
</div>
{% endfor %}
</div>

{% assign coming_soon = site.data.plugins | where: "status", "coming-soon" %}
{% if coming_soon.size > 0 %}

## Coming Soon

Plugins that are nearly finished and will be released shortly.

<div class="plugin-grid">
{% for plugin in coming_soon %}
<div class="plugin-card">
  <div class="plugin-card-image">
    <span class="placeholder">Screenshot coming soon</span>
  </div>
  <div class="plugin-card-content">
    <div class="plugin-card-header">
      <h3>{{ plugin.name }}</h3>
      <span class="status-badge coming-soon">Coming Soon</span>
    </div>
    <p>{{ plugin.description }}</p>
  </div>
</div>
{% endfor %}
</div>
{% endif %}

## In Development

Plugins currently being built. Follow us for updates!

<table class="plugins-table">
  <thead>
    <tr>
      <th>Plugin</th>
      <th>Description</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {% assign in_dev = site.data.plugins | where: "status", "in-dev" %}
    {% for plugin in in_dev %}
    <tr>
      <td><strong>{{ plugin.name }}</strong></td>
      <td>{{ plugin.tagline }}</td>
      <td><span class="status-badge in-dev">In Development</span></td>
    </tr>
    {% endfor %}
  </tbody>
</table>

---

## Platform Support

All released plugins are available for:

| Platform | Formats |
|----------|---------|
| **Linux** (x86_64 and arm64) | VST3, LV2, CLAP |
| **Windows** | VST3, CLAP |
| **macOS** | VST3, AU, CLAP |

CLAP ships with every plugin except Spectrum Analyzer, and TapeMachine 2 and Sunset Circuits also ship LV2 on macOS. See each plugin's page for its exact formats.

## Installation

### Linux

**VST3:**
```
~/.vst3/
/usr/lib/vst3/
/usr/local/lib/vst3/
```

**LV2:**
```
~/.lv2/
/usr/lib/lv2/
/usr/local/lib/lv2/
```

**CLAP:**
```
~/.clap/
/usr/lib/clap/
```

### Windows

**VST3:**
```
C:\Program Files\Common Files\VST3\
```

**CLAP:**
```
C:\Program Files\Common Files\CLAP\
```

### macOS

**VST3:**
```
~/Library/Audio/Plug-Ins/VST3/
/Library/Audio/Plug-Ins/VST3/
```

**AU:**
```
~/Library/Audio/Plug-Ins/Components/
/Library/Audio/Plug-Ins/Components/
```

**CLAP:**
```
~/Library/Audio/Plug-Ins/CLAP/
/Library/Audio/Plug-Ins/CLAP/
```

---

## Get Updates

Want to know when new plugins are released?

<a href="{{ site.patreon_url }}" class="btn btn-primary">Follow on Patreon</a>
