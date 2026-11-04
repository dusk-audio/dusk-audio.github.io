---
layout: default
title: Dusk Studio
permalink: /dusk-studio/
og_title: "Dusk Studio — a 24-track DAW laid out like a mixing console"
description: "A 24-track DAW laid out like a mixing console. Record, comp your takes, mix, and master, with online SFZ instrument libraries and mastering phase analysis."
body_class: showcase-page studio-page
---

<section class="showcase-hero dark-surface" aria-labelledby="studio-title">
  <div class="container">
    <h1 id="studio-title">Dusk Studio</h1>
    <p class="hero-description">A 24-track DAW laid out like a mixing console, with separate stages for recording, mixing, and mastering.</p>
    <p>Great for all genres.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="#get">Get the beta</a>
      <a class="btn btn-secondary" href="#takes">How takes and comping work</a>
    </div>
    <p class="hero-meta">Version {% if site.data.studio.release_status == 'released' %}{{ site.data.studio.version }}{% else %}{{ site.data.studio.published_version }}{% endif %} beta, for Linux, macOS, and Windows. Open source under GPL-3.0.</p>
    {% include console-figure.html %}
  </div>
</section>

<nav class="studio-navigation" aria-label="Dusk Studio sections">
  <div class="container">
    <a href="#record">Record</a><a href="#instruments">Instruments</a><a href="#takes">Takes &amp; comping</a><a href="#mix">Mix</a><a href="#master">Master</a><a href="#get">Get the beta</a>
  </div>
</nav>

<section class="showcase-section" id="record" aria-labelledby="record-title">
  <div class="container">
    <div class="section-intro">
      <h2 id="record-title">Record</h2>
      <p>Record audio and MIDI across 24 tracks. Loop and punch recording keep the focus on the performance. With MIDI Merge, each loop pass adds to the same region, and the piano roll shows the notes as you play.</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/recording.webp' alt='Dusk Studio recording console with track inputs, record-arm controls, and channel strips' caption='The recording stage: inputs, record controls, and a familiar console.' width=2560 height=1080 %}
  </div>
</section>

<section class="showcase-section instruments-section" id="instruments" aria-labelledby="instruments-title">
  <div class="container">
    <div class="section-intro">
      <h2 id="instruments-title">Instruments</h2>
      <p>Dusk Studio plays SFZ instruments and SF2 SoundFonts on any MIDI track through its built-in sfizz engine, so there is no separate sampler to set up. Sunset, a six-engine synth, is built in too.</p>
    </div>
    <div class="feature-split feature-split--image-first">
      {% include screenshot.html src='/assets/images/studio/sfz-online.webp' alt='The SFZ Manager searching all four repositories for orchestra, with VSCO 2 Community Edition selected and its CC0 license shown' caption='The SFZ Manager shows each pack’s license before you download it.' width=1112 height=772 %}
      <div class="feature-copy">
        <h3>Four free libraries, searchable in the app</h3>
        <p>Search them all at once, or narrow the results by category: piano, drum kit, acoustic guitar, and more.</p>
        <dl class="library-sources">
          <dt>SFZ Instruments</dt><dd>Community-made SFZ instruments on GitHub</dd>
          <dt>Musical Artifacts</dt><dd>An archive of free instruments and SoundFonts</dd>
          <dt>FreePats</dt><dd>Creative Commons sampled instruments</dd>
          <dt>Versilian Studios</dt><dd>VSCO 2 Community Edition and the Versilian Community Sample Library</dd>
        </dl>
      </div>
    </div>
    <ul class="workflow-list comp-steps">
      <li><h3>Hear it before you download</h3><p>When a pack has a published demo, play it in your browser first.</p></li>
      <li><h3>Your own SoundFonts</h3><p>Open .sfz, .sf2, and ARIA .bank.xml files from your disk. SoundFonts with many presets get a searchable preset picker.</p></li>
      <li><h3>Sessions keep their sounds</h3><p>A session remembers the exact pack and version, so another computer with that pack installed plays the same sound.</p></li>
    </ul>
    <div class="feature-split supporting-feature">
      <div class="feature-copy">
        <h3>Sunset synth and built-in effects</h3>
        <p>The built-in Sunset instrument brings six synth personalities into your session. Add tape, delay, and reverb using built-in units, or load your own plugins.</p>
      </div>
      {% include screenshot.html src='/assets/images/studio/instrument.webp' alt='The built-in Sunset synthesizer interface with oscillator, filter, envelope, and sequencer controls' width=1240 height=780 %}
    </div>
  </div>
</section>

<section class="showcase-section dark-surface" id="takes" aria-labelledby="comp-title">
  <div class="container">
    <div class="section-intro">
      {% if site.data.studio.release_status != 'released' %}<p class="eyebrow">{% include studio-release-label.html %}</p>{% endif %}
      <h2 id="comp-title">Takes and comping</h2>
      <p>Every recording pass stays whole on its track. Open the take lanes, audition a performance, and choose the sections that feel right. Hear edits as you make them, while playback continues.</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/takes.webp' alt='The audio editor showing three colored take lanes and a performance assembled from sections of all three' caption='Selected sections stay bright. Each take remains available beneath your comp.' width=1294 height=1030 %}
    <ol class="workflow-list comp-steps">
      <li><h3>Keep the performance</h3><p>Record again without losing the full earlier pass.</p></li>
      <li><h3>Choose the best sections</h3><p>Click or drag in a lane to bring that part into the track.</p></li>
      <li><h3>Listen as you refine</h3><p>Solo a take, move a seam, and hear changes during playback.</p></li>
    </ol>
    {% if site.data.studio.release_status != 'released' %}<p class="fine-print">This is a preview of {{ site.data.studio.version }}. The current official beta is {{ site.data.studio.published_version }}.</p>{% endif %}
  </div>
</section>

<section class="showcase-section" id="mix" aria-labelledby="mix-title">
  <div class="container feature-split">
    <div class="feature-copy">
      <h2 id="mix-title">Mix</h2>
      <p>EQ, compression, sends, and faders where you expect them. A fixed signal chain and one insert per channel keep the workflow purposeful. Bring your own VST3, LV2, AU, or CLAP plugins on supported platforms.</p>
      <p>Use three banks of eight with a control surface, and shape the mix through the buses and master channel.</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/channel.webp' alt='Dusk Studio channel strip with EQ, compressor, aux sends, pan, fader, and automation controls' caption='A familiar channel strip, with the signal chain laid out in front of you.' width=155 height=944 %}
  </div>
</section>

<section class="showcase-section dark-surface" id="master" aria-labelledby="master-title">
  <div class="container">
    <div class="section-intro">
      <h2 id="master-title">Master</h2>
      <p>Move straight from your mix to a dedicated mastering stage. Shape the balance with EQ, control dynamics with multiband compression, and finish with true-peak limiting and loudness metering. Phase analysis checks mono compatibility band by band, and the Mono monitor lets you hear the fold-down while exports stay stereo.</p>
    </div>
    {% include screenshot.html src='/assets/images/studio/mastering.webp' alt='Dusk Studio mastering stage with waveform, five-band EQ, multiband compressor, true-peak limiter, loudness metering, and phase analysis' caption='Mastering EQ, multiband dynamics, limiting, and phase analysis in a single stage.' width=1424 height=1120 %}
  </div>
</section>

<section class="showcase-section" id="get" aria-labelledby="get-title">
  <div class="container">
    {% include signup-prompt.html %}
    <div class="section-intro">
      <h2 id="get-title">Get the beta</h2>
      <p>Official beta builds are available through Patreon from $5/month. The source is open under GPL-3.0 and free to build yourself.</p>
    </div>
    <div class="beta-options">
      <div>
        <h3>Official builds</h3>
        <p>Linux tarballs, a Windows installer, and a macOS disk image. Patreon membership gives you access to beta builds while subscribed.</p>
        <a class="btn btn-primary" href="{{ site.data.studio.builds_url }}">Download for Patreon members</a>
        <a class="text-link member-link" href="{{ site.patreon_membership_url }}">Not a member yet? Join on Patreon from $5/month</a>
      </div>
      <div>
        <h3>Build from source</h3>
        <p>Read the code, build it yourself, and contribute on GitHub. The source remains available for free.</p>
        <a class="btn btn-secondary" href="{{ site.data.studio.source_url }}">Source on GitHub</a>
        <a class="text-link member-link" href="{{ site.data.studio.manual_url }}">Read the user manual</a>
      </div>
    </div>
    <p class="purchase-note">Dusk Studio is planned to be available for purchase at 1.0. Pricing, licensing details, and release timing will be announced later. Beta membership covers official beta builds; future purchase terms will be announced separately.</p>
  </div>
</section>

<section class="showcase-section studio-details" aria-labelledby="details-title">
  <div class="container reading-width">
    <h2 id="details-title">Before you install</h2>
    <details id="requirements">
      <summary>System requirements</summary>
      <div class="details-body">
        <h3>Linux</h3><p>x86_64 and arm64 builds. PipeWire or ALSA audio. An X11 display is required, including XWayland on a Wayland desktop.</p>
        <h3>macOS</h3><p>Apple Silicon, macOS 11 (Big Sur) or later.</p>
        <h3>Windows</h3><p>Windows 10 or later. An ASIO driver is recommended; WASAPI exclusive mode is also available.</p>
        <p>Check the manual and current release notes for platform-specific requirements.</p>
      </div>
    </details>
    <details id="first-launch">
      <summary>Installation and first launch</summary>
      <div class="details-body"><p>Follow the platform-specific installation instructions supplied with your build. The manual covers first-launch permissions, audio devices, and getting a session started.</p><a class="text-link" href="{{ site.data.studio.manual_url }}#installing-dusk-studio">Installation walkthrough</a></div>
    </details>
    <details id="changelog">
      <summary>Release notes and feedback</summary>
      <div class="details-body"><p>{% if site.data.studio.release_status == 'released' %}Current beta: {{ site.data.studio.version }}. New in this release: {{ site.data.studio.highlights }}.{% else %}Current beta: {{ site.data.studio.published_version }}. {{ site.data.studio.version }} is upcoming, with {{ site.data.studio.highlights }}.{% endif %}</p><p><a class="text-link" href="{{ site.data.studio.source_url }}/blob/main/CHANGELOG.md">Full changelog</a></p><a class="text-link" href="{{ site.data.studio.source_url }}/discussions">Share feedback and report issues</a></div>
    </details>
  </div>
</section>
