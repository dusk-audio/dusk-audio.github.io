---
layout: default
title: Home
og_title: "Dusk Audio — Dusk Studio, a DAW that keeps you focused on the song"
description: "Dusk Studio is a 24-track DAW with the limits of a hardware multitrack recorder: record, mix, and master, one stage at a time. Dusk Audio also makes free instruments and effects for Linux, macOS, and Windows."
body_class: showcase-page home-page
---

<section class="showcase-hero" aria-labelledby="home-title">
  <div class="container">
    <div class="hero-intro">
      <div>
        <p class="product-name">Dusk Studio</p>
        <h1 id="home-title">A DAW that keeps you focused on the song</h1>
      </div>
      <div class="hero-access">
        <p class="hero-description">24 tracks and the limits of a hardware multitrack recorder. Record, mix, and master, one stage at a time. Runs on Linux, macOS, and Windows.</p>
        <p class="release-readout">{% if site.data.studio.release_status == 'released' %}{{ site.data.studio.version }}{% else %}{{ site.data.studio.published_version }}{% endif %} beta</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="{{ '/dusk-studio/' | relative_url }}#get">Get the beta</a>
          <a class="text-link" href="{{ '/plugins/' | relative_url }}">Free plugins</a>
        </div>
        <p class="access-terms">Official builds through Patreon from $5/month. Free to <a href="{{ site.data.studio.source_url }}">build from source</a>. Not ready yet? <a href="#newsletter" data-newsletter>Get an email</a> when a new build comes out.</p>
      </div>
    </div>
    {% include console-figure.html %}
  </div>
</section>

<section class="maker-story" aria-labelledby="story-title">
  <div class="container">
    <div class="story-copy">
      <div>
        <h2 id="story-title">It started when my Tascam DP-24 stopped working</h2>
        <p>Dusk Studio began as a way to get its workflow back: record the performance, then mix, then master, each on its own stage.</p>
        <a class="text-link" href="{{ '/about/' | relative_url }}#dusk-studio-story">Why I built Dusk Studio</a>
      </div>
      <figure class="story-photo">
        <img src="{{ '/assets/images/story/tascam-dp-24.webp' | relative_url }}" srcset="{{ '/assets/images/story/tascam-dp-24-720.webp' | relative_url }} 720w, {{ '/assets/images/story/tascam-dp-24.webp' | relative_url }} 1440w" sizes="(max-width: 550px) calc(100vw - 44px), (max-width: 768px) 92vw, (min-width: 1440px) 640px, calc(46vw - 24px)" width="1440" height="1080" loading="lazy" decoding="async" alt="My Tascam DP-24 recorder, photographed from above with its faders and transport controls visible">
        <figcaption>My Tascam DP-24.</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="showcase-section takes-preview" aria-labelledby="takes-title">
  <div class="container">
    <div class="feature-copy">
      <h2 id="takes-title">Comp the best parts of every take</h2>
      {% if site.data.studio.release_status != 'released' %}<p class="release-label">{% include studio-release-label.html %}</p>{% endif %}
      <p>Record another pass, pick the best sections from each take, and hear the comp change while the song plays. Every take stays whole underneath.</p>
      <a class="text-link" href="{{ '/dusk-studio/' | relative_url }}#takes">How takes and comping work</a>
    </div>
    {% include screenshot.html src='/assets/images/studio/takes.webp' alt='Three colored take lanes with selected sections combined into a performance in the audio editor' caption='Take lanes in the audio editor. Select the image to see the full editor.' width=1294 height=1030 %}
  </div>
</section>

<section class="showcase-section library-preview" aria-labelledby="instruments-title">
  <div class="container feature-split feature-split--image-first">
    {% include screenshot.html src='/assets/images/studio/sfz-online.webp' alt='The SFZ Manager searching four free sample libraries for orchestra, with VSCO 2 Community Edition selected and its CC0 license shown' width=1112 height=772 %}
    <div class="feature-copy">
      <h2 id="instruments-title">Play SFZ instruments and SoundFonts</h2>
      <p>Search more than 100 free instruments in four libraries from inside Dusk Studio, from the Salamander Grand Piano to the VSCO 2 chamber orchestra, or open your own .sfz and .sf2 files. The sampler is built in.</p>
      <a class="text-link" href="{{ '/dusk-studio/' | relative_url }}#instruments">How instruments work</a>
    </div>
  </div>
</section>

<section class="showcase-section plugins-preview" aria-labelledby="plugins-title">
  <div class="container">
    <div class="section-intro section-intro--with-link">
      <div class="section-heading">
        <h2 id="plugins-title">Free instruments and effects</h2>
        <a class="text-link" href="{{ '/plugins/' | relative_url }}">All plugins</a>
      </div>
      <p>Plugins for Linux, macOS, and Windows, free and open source. <a href="#newsletter" data-newsletter>Get an email</a> when a new one comes out.</p>
    </div>
    <ul class="plugin-list plugin-list--showcase">
      {% assign current_plugins = site.data.plugins | where: 'generation', 'current' | where: 'status', 'released' | sort: 'display_order' %}
      {% for product in current_plugins %}{% include plugin-row.html product=product %}{% endfor %}
    </ul>
  </div>
</section>
