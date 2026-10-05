---
layout: default
title: Home
og_title: "Dusk Audio — from first take to finished song"
description: "Meet Dusk Studio, a focused desktop portastudio for recording, mixing, and mastering. Explore free Dusk Audio instruments and effects for Linux, macOS, and Windows."
body_class: showcase-page home-page
og_image: /assets/images/studio/console.webp
---

<section class="showcase-hero dark-surface" aria-labelledby="home-title">
  <div class="container">
    <div class="hero-intro">
      <div>
        <h1 id="home-title">From first take<br>to finished song.</h1>
        <p class="hero-description">Recording, mixing, and mastering<br class="desktop-break"> in a focused desktop portastudio.</p>
        <p>Made for bands and songwriters. At home with electronic music, too.</p>
        <div class="cta-row">
          <a class="btn btn-primary" href="{{ '/dusk-studio/' | relative_url }}">Explore Dusk Studio</a>
          <a class="btn btn-secondary" href="{{ '/plugins/' | relative_url }}">Browse free plugins</a>
        </div>
      </div>
      <p class="hero-aside">A portastudio for the desktop.<br>Linux · macOS · Windows</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/console.webp' alt='Dusk Studio playing a multitrack mix with active channel, bus, and stereo master meters' eager=true width=2560 height=1080 %}
  </div>
</section>

<section class="showcase-section takes-preview" aria-labelledby="takes-title">
  <div class="container feature-split">
    <div class="feature-copy">
      <h2 id="takes-title">Keep every take.<br>Build your best performance.</h2>
      <p class="eyebrow release-label">{% include studio-release-label.html %}</p>
      <p>Record another pass. Choose the strongest sections from each take, and hear your comp edits while the song plays. Your performances stay intact, ready for another listen.</p>
      <a class="text-link" href="{{ '/dusk-studio/' | relative_url }}#takes">Explore takes and comping</a>
    </div>
    {% include screenshot.html src='/assets/images/studio/takes.webp' alt='Three colored take lanes with selected sections combined into a performance in the audio editor' width=1294 height=1030 %}
  </div>
</section>

<section class="showcase-section" aria-label="Dusk Audio updates">
  <div class="container">{% include signup-prompt.html %}</div>
</section>

<section class="showcase-section plugin-showcase" aria-labelledby="plugins-title">
  <div class="container">
    <div class="feature-split feature-split--image-first">
      <a class="spotlight-image" href="{{ '/plugins/sunset-circuits/' | relative_url }}" aria-label="Explore Sunset Circuits">
        <img src="{{ '/assets/images/plugins/sunset-circuits-screenshot.png' | relative_url }}" alt="Sunset Circuits synthesizer with oscillator, filter, modulation, sequencer, and keyboard controls" loading="lazy" decoding="async" width="1240" height="780">
      </a>
      <div class="feature-copy">
        <p class="eyebrow">Free instruments and effects</p>
        <h2 id="plugins-title">Six vintage synth circuits.<br>One expressive instrument.</h2>
        <p>Analog character, expressive instruments, and tools for shaping a mix. Discover the current generation of Dusk Audio plugins, built with the Dusk Audio Framework.</p>
        <a class="text-link" href="{{ '/plugins/' | relative_url }}">Explore current plugins</a>
        <div class="legacy-link">
          <a class="text-link" href="{{ '/plugins/' | relative_url }}#legacy">Legacy collection</a>
          <p>Bug fixes continue. New development focuses on the current generation.</p>
        </div>
      </div>
    </div>
    <div class="collection-heading">
      <h3>Find your sound.</h3>
      <p>Always free. No trials, accounts, or feature locks.</p>
    </div>
    <div class="product-grid">
      {% assign current_plugins = site.data.plugins | where: 'generation', 'current' | where: 'status', 'released' | sort: 'display_order' %}
      {% for product in current_plugins %}{% include product-card.html product=product %}{% endfor %}
    </div>
  </div>
</section>

<section class="showcase-section" aria-labelledby="workflow-title">
  <div class="container">
    <div class="section-intro">
      <p class="eyebrow">Dusk Studio</p>
      <h2 id="workflow-title">Your whole studio.<br>One focused workflow.</h2>
      <p>Inspired by the hands-on simplicity of a hardware portastudio. A familiar console, a purposeful signal chain, and the tools to carry a song all the way through.</p>
    </div>
    <ol class="workflow-list">
      <li><h3>Record</h3><p>Capture audio and MIDI across 24 tracks.</p></li>
      <li><h3>Refine</h3><p>With 0.15, keep your takes and comp the best sections.</p></li>
      <li><h3>Mix</h3><p>Shape your sound with EQ, compression, and sends.</p></li>
      <li><h3>Master</h3><p>Finish with mastering EQ, multiband compression, and limiting.</p></li>
    </ol>
    <a class="text-link" href="{{ '/dusk-studio/' | relative_url }}">Meet Dusk Studio</a>
  </div>
</section>

<section class="showcase-section story-section" aria-labelledby="story-title">
  <div class="container feature-split">
    <div class="feature-copy">
      <p class="eyebrow">Why Dusk</p>
      <h2 id="story-title">Built to help you<br>finish music.</h2>
      <p>When a much-loved Tascam DP-24 stopped working, the search for that same focused experience became Dusk Studio. The constraints are intentional: fewer decisions between an idea and a finished song.</p>
      <a class="text-link" href="{{ '/about/' | relative_url }}">The story behind Dusk Audio</a>
    </div>
    <div class="get-started-copy">
      <h3>Start making music.</h3>
      <p>Dusk Studio is in beta. Official builds are available through Patreon from $1/month, or you can build from the open-source code for free.</p>
      <a class="btn btn-primary" href="{{ '/dusk-studio/' | relative_url }}#get">Get Dusk Studio beta</a>
      <p class="fine-print">The plugins are always free. A purchase option for Dusk Studio is planned for 1.0; pricing and release timing are still to come.</p>
    </div>
  </div>
</section>
