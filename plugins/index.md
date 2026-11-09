---
layout: default
title: Free plugins
og_title: "Dusk Audio — free instruments and effects"
description: "The current Dusk Audio plugins: free instruments, EQ, tape, and delay for Linux, Windows, and macOS. Legacy plugins remain available with bug-fix support."
body_class: showcase-page plugins-page
---

<section class="showcase-hero collection-hero">
  <div class="container">
    <h1>Free plugins</h1>
    <p class="hero-description">Instruments and effects for Linux, macOS, and Windows, free and open source.</p>
    <nav class="collection-nav" aria-label="Plugin collections">
      <a href="#current">Current plugins</a>
      <a href="#legacy">Legacy collection</a>
      <a href="#installation">Installation</a>
    </nav>
  </div>
</section>

<section class="showcase-section" id="current" aria-labelledby="current-title">
  <div class="container">
    <div class="section-intro">
      <h2 id="current-title">Current plugins</h2>
      <p>The newest Dusk Audio plugins, built on the Dusk Audio Framework (DAF). They get new features as well as bug fixes.</p>
    </div>
    <ul class="plugin-list plugin-list--showcase">
      {% assign released = site.data.plugins | where: 'status', 'released' %}
      {% assign prerelease = site.data.plugins | where: 'status', 'pre-release' %}
      {% assign available = released | concat: prerelease %}
      {% assign current = available | where: 'generation', 'current' | sort: 'display_order' %}
      {% for product in current %}{% include plugin-row.html product=product %}{% endfor %}
    </ul>
  </div>
</section>

<section class="showcase-section legacy-section" id="legacy" aria-labelledby="legacy-title">
  <div class="container">
    <div class="section-intro">
      <h2 id="legacy-title">Legacy collection</h2>
      <p>The original JUCE-based Dusk Audio plugins remain free to download. Bug fixes continue; new features and interface development focus on the current generation.</p>
      <p class="fine-print">For existing projects, keep the version they were created with. Successor plugins are separate products; preset and session compatibility varies by plugin.</p>
    </div>
    <ul class="plugin-list plugin-list--compact">
      {% assign legacy = available | where: 'generation', 'legacy' | sort: 'display_order' %}
      {% for product in legacy %}{% include plugin-row.html product=product %}{% endfor %}
    </ul>
  </div>
</section>

{% assign in_dev = site.data.plugins | where: 'status', 'in-dev' %}
{% assign coming_soon = site.data.plugins | where: 'status', 'coming-soon' %}
{% assign future = in_dev | concat: coming_soon %}
{% if future.size > 0 %}
<section class="showcase-section development-section" aria-labelledby="development-title">
  <div class="container">
    <div class="section-intro">
      <h2 id="development-title">In development</h2>
      <p>These aren't available to download yet.</p>
    </div>
    <ul class="development-list">
      {% for product in future %}
      <li><h3>{{ product.name }}</h3><p>{{ product.tagline }}</p></li>
      {% endfor %}
    </ul>
  </div>
</section>
{% endif %}

<section class="showcase-section installation-section" id="installation" aria-labelledby="installation-title">
  <div class="container reading-width">
    <h2 id="installation-title">Installation</h2>
    <p>Linux builds include x86_64 and arm64. Windows and macOS builds are also available. Formats and requirements vary by plugin; check its product page before downloading.</p>
    <details class="installation-details">
      <summary>Plugin installation paths</summary>
      <div class="installation-content" markdown="1">

## Plugin installation

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

</div>
</details>
</div>
</section>
