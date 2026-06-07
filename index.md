---
layout: default
title: Home
og_title: "Dusk Audio: a constrained DAW and a free plugin suite"
description: "Dusk Audio builds free, open-source audio plugins (VST3 / LV2, GPL-3.0), and Dusk Studio, a deliberately constrained portastudio DAW built on the same DSP."
---

<!-- HERO (brand) -->
<section class="hero hero-studio" id="top">
  <div class="container">
    <p class="hero-eyebrow">Open source · GPL-3.0 · Linux / macOS / Windows</p>
    <h1>A constrained DAW and a free plugin suite.</h1>
    <p class="tagline">Dusk Audio builds free, open-source audio plugins. <strong>Dusk Studio</strong> is the deliberately constrained portastudio DAW built on the same DSP.</p>
  </div>
</section>

<!-- TWO PATHS -->
<section class="section hub-paths">
  <div class="container">
    <div class="hub-grid">
      <a class="hub-card" href="{{ '/dusk-studio/' | relative_url }}">
        <img src="{{ '/assets/images/dusk-studio-hero.png' | relative_url }}" alt="The Dusk Studio console." loading="lazy">
        <h3>Dusk Studio</h3>
        <p>A portastudio-style DAW. 24 tracks, a fixed signal chain, mastering built in. Record, mix, and master in one window. Alpha, $1+ on Patreon, or build it free.</p>
        <span class="hub-cta">Explore Dusk Studio →</span>
      </a>
      <a class="hub-card" href="{{ '/plugins/' | relative_url }}">
        <img src="{{ '/assets/images/plugins/4k-eq-screenshot.png' | relative_url }}" alt="A Dusk Audio plugin interface." loading="lazy">
        <h3>Free plugins</h3>
        <p>Open-source EQs, compressors, tape, reverb, and more. Free for any DAW that runs VST3 or LV2, no trials or accounts. The same DSP powers Dusk Studio's console.</p>
        <span class="hub-cta">Browse the plugins →</span>
      </a>
    </div>
  </div>
</section>

<!-- EMAIL CAPTURE -->
<section class="section email-band">
  <div class="container">
    <div class="section-header">
      <h2>Get notified when new builds drop</h2>
      <p>New Dusk Studio builds and plugins. No spam, a couple of emails a month, tops.</p>
    </div>
    <!-- MailerLite form 189284465127720015 (account 2404218), themed to match the site.
         webforms.min.js upgrades submit to inline AJAX success; without it the form falls
         back to a plain POST (opens MailerLite's confirmation in a new tab). No tracking pixel. -->
    <div id="mlb2-42165633" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-42165633">
      <div class="row-form">
        <form class="ml-block-form email-form" action="https://assets.mailerlite.com/jsonp/2404218/forms/189284465127720015/subscribe" method="post" target="_blank" rel="noopener">
          <input class="email-form-input" type="email" name="fields[email]" placeholder="you@email.com" autocomplete="email" aria-label="Email address" required>
          <input type="hidden" name="ml-submit" value="1">
          <input type="hidden" name="anticsrf" value="true">
          <button class="btn btn-primary" type="submit">Notify me</button>
        </form>
      </div>
      <div class="row-success email-success" style="display: none;">
        <p>Thanks. You are on the list. Check your inbox to confirm your address.</p>
      </div>
    </div>
  </div>
</section>

<script>
  function ml_webform_success_42165633() {
    var $ = ml_jQuery || jQuery;
    $('.ml-subscribe-form-42165633 .row-success').show();
    $('.ml-subscribe-form-42165633 .row-form').hide();
  }
</script>
<script src="https://groot.mailerlite.com/js/w/webforms.min.js?vb397d78ebaa8a0f631d35384c46d781b" type="text/javascript"></script>
