---
layout: default
title: "Dusk Studio"
permalink: /dusk-studio/
og_title: "Dusk Studio: a portastudio for the desktop"
description: "Dusk Studio is a deliberately constrained, portastudio-style DAW: 24 tracks, a fixed signal chain, MIDI and soundfonts, mastering built in. Open source, GPL-3.0, beta."
---

<!-- HERO -->
<section class="hero hero-studio" id="top">
  <div class="container">
    <p class="hero-eyebrow">Open source · GPL-3.0 · Linux (x86_64 + arm64) / macOS (Apple Silicon) / Windows</p>
    <h1>A portastudio for the desktop.</h1>
    <p class="tagline">24 tracks. A fixed signal chain. Everything on one screen. Dusk Studio is a deliberately constrained DAW built to make you stop tweaking and finish music.</p>
    <p class="hero-badge">v0.12.6 beta</p>
    <div class="hero-buttons">
      <a href="https://builds.duskaudio.com/latest" class="btn btn-primary btn-lg">Get the latest build</a>
      <a href="https://github.com/dusk-audio/dusk-studio" class="btn btn-secondary btn-lg">Build from source</a>
      <!-- Temporary fallback: points at MANUAL.md on GitHub until the builds-gate Worker fix is deployed. -->
      <a href="https://github.com/dusk-audio/dusk-studio/blob/main/MANUAL.md" class="btn btn-secondary btn-lg">Manual</a>
    </div>
    <ul class="spec-strip" aria-label="At a glance">
      <li>24 tracks</li>
      <li>3 banks of 8</li>
      <li>Fixed signal chain</li>
      <li>MIDI + soundfonts</li>
      <li>VST3 · LV2 · AU · CLAP</li>
      <li>BS.1770 mastering</li>
    </ul>
    <!-- TODO: screenshot predates the 0.11/0.12 UI overhauls — re-capture -->
    <img src="{{ '/assets/images/dusk-studio-hero.png' | relative_url }}" alt="The Dusk Studio console: 24 tracks in three banks of eight with a fixed channel signal chain, shown on one screen." class="hero-shot" width="2560" height="1048" decoding="async">
  </div>
</section>

<!-- VIEWS (record / mix / master) -->
<section class="section views">
  <div class="container">
    <div class="section-header">
      <h2>Record, mix, and master in one place.</h2>
      <p>No exporting to a second app. The signal chain, the mix, and the master all live in the same window.</p>
      <p>Four stages, one page each: RECORDING to track, MIXING for the console, MASTERING for the final pass, AUX for the sends and returns. Within a stage there are no tabs and nothing hidden.</p>
    </div>
    <div class="views-grid">
      <figure class="view">
        <!-- TODO: screenshot predates the 0.11/0.12 UI overhauls — re-capture -->
        <img src="{{ '/assets/images/dusk-studio-mixing.png' | relative_url }}" alt="Dusk Studio mixing view: 24 channels across three banks, one insert per channel." loading="lazy">
        <figcaption>Mixing: 24 channels, one insert each</figcaption>
      </figure>
      <figure class="view">
        <!-- TODO: screenshot predates the 0.11/0.12 UI overhauls — re-capture -->
        <img src="{{ '/assets/images/dusk-studio-mastering.png' | relative_url }}" alt="Dusk Studio mastering view: 5-band digital EQ, multiband compressor, brick-wall limiter, BS.1770 metering." loading="lazy">
        <figcaption>Mastering: 5-band digital EQ, multiband, limiter, BS.1770</figcaption>
      </figure>
    </div>
  </div>
</section>

<!-- STORY STRIP -->
<section class="section story-strip">
  <div class="container">
    <blockquote class="story">
      <p>In December my Tascam DP-24 died. It helped me finish songs, not because it was powerful, but because it wasn't. Nothing in software felt like that. So I built it.</p>
    </blockquote>
    <p class="story-link"><a href="https://www.patreon.com/posts/meet-dusk-studio-160135290" target="_blank" rel="noopener noreferrer">Read the full story →</a></p>
  </div>
</section>

<!-- GET DUSK STUDIO (dual-path) -->
<section class="section section-alt" id="get">
  <div class="container">
    <div class="section-header">
      <h2>Get Dusk Studio</h2>
    </div>

    <div class="dual-path">
      <div class="path-card">
        <h3>Build it yourself (free)</h3>
        <p>The source is GPL-3.0 and free forever. Clone it, audit it, build it, modify it.</p>
        <a href="https://github.com/dusk-audio/dusk-studio" class="btn btn-secondary btn-full">Source on GitHub</a>
        <p class="path-fineprint">Self-builds get no support tier, but the code is identical.</p>
      </div>

      <div class="path-card path-card--primary">
        <h3>Get the official build</h3>
        <p>Back Dusk Studio on Patreon from $1/month and get every beta build — Linux tarball, Windows MSI, macOS DMG — for as long as you're subscribed. New builds land in the patrons-only feed as they ship.</p>
        <p>Early backers are credited as Founding Patrons, with your name in the app's About panel.</p>
        <a href="{{ site.patreon_membership_url }}" class="btn btn-primary btn-full">Get builds on Patreon</a>
        <p class="path-fineprint">One-time and lifetime licenses come later, closer to 1.0. During the beta it's Patreon only.</p>
      </div>
    </div>

    <p class="path-centerline">The source is always free. The paid builds fund development.</p>
    <p class="path-honesty">It's a beta, built to a production bar — 1.0 is the public stable declaration. Expect rough edges and <a href="https://github.com/dusk-audio/dusk-studio/discussions" target="_blank" rel="noopener noreferrer">report everything →</a></p>
  </div>
</section>

<!-- FIRST-LAUNCH NOTE -->
<section class="section" id="first-launch">
  <div class="container">
    <div class="section-header">
      <h2>First launch on Mac and Windows</h2>
      <p>The builds are unsigned by design, so macOS and Windows warn you the first time. On macOS, right-click the app and choose Open. On Windows, click More info, then Run anyway. About 30 seconds, once.</p>
    </div>
    <!-- Temporary fallback: points at MANUAL.md on GitHub until the builds-gate Worker fix is deployed. -->
    <p><a class="btn btn-secondary" href="https://github.com/dusk-audio/dusk-studio/blob/main/MANUAL.md#installing-dusk-studio">First-launch walkthrough in the manual</a></p>
  </div>
</section>

<!-- SYSTEM REQUIREMENTS -->
<section class="section" id="requirements">
  <div class="container">
    <div class="section-header">
      <h2>System requirements</h2>
      <p>Three desktop platforms, no exotic hardware. Here's what each one needs.</p>
    </div>
    <div class="philosophy-row">
      <div class="info-box">
        <h3>Linux</h3>
        <p>PipeWire (recommended) or ALSA. An X11 display is required — on a Wayland desktop that means XWayland, which GNOME and KDE enable by default. Tarballs ship for x86_64 and arm64 (64-bit Raspberry Pi).</p>
      </div>
      <div class="info-box">
        <h3>macOS</h3>
        <p>Apple Silicon, delivered as an arm64 DMG. macOS 14.4 (Sonoma) or later for the out-of-process plugin sandbox; older macOS runs plugins in-process.</p>
      </div>
      <div class="info-box">
        <h3>Windows</h3>
        <p>Windows 10 or later, installed from an MSI. An ASIO driver is recommended; without one, Dusk Studio falls back to WASAPI exclusive mode.</p>
      </div>
    </div>
    <p>Any modern multi-core CPU handles a 24-track session at 48 kHz. Multicore DSP is on by default, spreading the channel-strip work across the cores you have.</p>
  </div>
</section>

<!-- CHANGELOG -->
<section class="section" id="changelog">
  <div class="container">
    <div class="section-header">
      <h2>Changelog</h2>
      <p>What has landed on the beta line so far.</p>
    </div>
    <div>
      <div class="changelog-entry">
        <h3>v0.12.6 <span class="changelog-date">25 July 2026</span></h3>
        <ul>
          <li>Manual recording latency offset in Audio Settings → Advanced, applied to every take at placement, for interfaces that misreport their round-trip latency — plus a raw-sample readout in the region editor so a loopback calibration can be measured directly.</li>
          <li>Aux sends on a monitored input now sound during playback, so a vocal tracked with reverb keeps it while playing along (0.12.3); armed instrument and MIDI tracks sound live over the timeline too (0.12.1).</li>
          <li>Fixed a crash when bouncing, rendering stems, or freezing a track through a CLAP, VST3 or LV2 insert (0.12.2).</li>
          <li>Multi-preset SoundFonts open in a filterable, program-grouped preset grid instead of one long dropdown (0.12.4).</li>
          <li>Control-surface faders follow the standard Mackie taper — printed 0 means 0.0 dB — and the out-of-process plugin-scan sandbox now actually engages on Windows (0.12.1).</li>
        </ul>
      </div>
      <div class="changelog-entry">
        <h3>v0.12.0 <span class="changelog-date">11 July 2026</span></h3>
        <ul>
          <li>Native plugin hosting on Linux across CLAP, LV2 and VST3 — effects and instruments alike — with editors that embed reliably on Wayland desktops, automatable and MIDI-learnable parameters, and crash-safe discovery.</li>
          <li>Sessions remember the sample rate their audio was made at and switch the device to match on open, warning loudly when they can't.</li>
          <li>Mastering delivery presets: 24-bit WAV at the session rate, 16-bit 44.1 kHz WAV with TPDF dither, or 320 kbps MP3.</li>
          <li>Save As now copies every session-owned file into the new folder instead of silently referencing the old one; loop playback is seamless; latent plugins on an aux return no longer flam against the dry mix.</li>
          <li>The channel and bus EQ moved to the new-generation console core — a subtle, deliberate re-voicing at 10–20% less CPU on the EQ/compressor path.</li>
        </ul>
      </div>
      <div class="changelog-entry">
        <h3>v0.11.0 <span class="changelog-date">22 June 2026</span></h3>
        <ul>
          <li>MP3 bounce and master export at 320 kbps. WAV stays the default, and stems stay WAV so they re-import sample-aligned.</li>
          <li>Import DP Song (experimental): reads a raw TASCAM DP-24 / DP-24SD / DP-32 song folder off the SD card and rebuilds the session, with recovered clip positions, mixer recall, tempo and markers.</li>
          <li>The mastering limiter was rebuilt as a true-peak brick-wall limiter, joined by an FFT spectrum overlay on the mastering EQ and DP-24-style multiband compressor presets.</li>
          <li>A Multicore DSP setting, a Dusk-native audio device selector, and a piecewise tempo map for songs that change tempo.</li>
          <li>0.11.1 added chase / follow playhead, a bar-and-beat grid in the region editors, and a Raspberry Pi (arm64) Linux tarball.</li>
        </ul>
      </div>
      <div class="changelog-entry">
        <h3>v0.10.0-beta.1 <span class="changelog-date">29 May 2026 — first beta</span></h3>
        <ul>
          <li>The first beta, after an architectural-audit sprint over every working feature: real-time safety, lifecycle correctness, cross-platform CI, documentation parity. 148 Catch2 tests green on Linux (amd64 + arm64), macOS and Windows.</li>
          <li>Plugin scanning moved out of process, so a plugin that crashes or hangs during discovery is blacklisted instead of taking the app down.</li>
          <li>Ten new MIDI binding targets — per-track EQ and compressor toggles, bus EQ, master Pultec and bus compressor — with bank-relative variants that keep an 8-fader surface useful across 24 tracks.</li>
          <li>Accessibility pass: every channel-strip slider reads its name and value to VoiceOver and Orca, and text-input dialogs render inside the main window.</li>
          <li>Hot-unplug detection — an interface disappearing stops the transport and says so, leaving the session intact in memory and on disk.</li>
        </ul>
      </div>
    </div>
    <p><a href="https://github.com/dusk-audio/dusk-studio/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">Full changelog on GitHub →</a></p>
  </div>
</section>

<!-- PHILOSOPHY -->
<section class="section philosophy">
  <div class="container">
    <div class="philosophy-row">
      <div class="philosophy-item">
        <h3>24 tracks, fixed.</h3>
        <p>Three banks of 8, mapped to real control surfaces.</p>
      </div>
      <div class="philosophy-item">
        <h3>One insert per channel.</h3>
        <p>Never a chain.</p>
      </div>
      <div class="philosophy-item">
        <h3>Everything visible.</h3>
        <p>No tabs, no hidden panels, no preferences sprawl.</p>
      </div>
    </div>

    <p class="philosophy-tagline">The constraints are the product.</p>

    <div class="philosophy-row philosophy-row--promise">
      <div class="philosophy-item">
        <h3>Linux first</h3>
        <p>Built primarily for the Linux audio community, where quality free tools are especially needed. Also on Windows and macOS.</p>
      </div>
      <div class="philosophy-item">
        <h3>No strings attached</h3>
        <p>No trials, no feature limitations, no nag screens, no accounts required. Download, install, and create.</p>
      </div>
    </div>
  </div>
</section>

<!-- Click-to-zoom lightbox (binds to .hero-shot) -->
<div class="lightbox" id="lightbox" aria-hidden="true">
  <button class="lightbox-close" id="lightbox-close" aria-label="Close">&times;</button>
  <img id="lightbox-img" src="" alt="">
</div>
<script>
  (function () {
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-img');
    var closeBtn = document.getElementById('lightbox-close');
    if (!lb) return;
    var lastFocused = null;

    function open(trigger) {
      lastFocused = trigger || document.activeElement;
      lbImg.src = (trigger && (trigger.currentSrc || trigger.src)) || '';
      lbImg.alt = (trigger && trigger.alt) || '';
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
    }
    function close() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
      lastFocused = null;
    }

    document.querySelectorAll('.hero-shot').forEach(function (img) {
      if (!img.hasAttribute('tabindex')) img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.addEventListener('click', function () { open(img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
      });
    });

    lb.addEventListener('click', function (e) { if (e.target !== lbImg) close(); });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }
    });
  })();
</script>
