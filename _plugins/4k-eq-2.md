---
layout: plugin
title: 4K EQ 2
slug: 4k-eq-2
tagline: Calibrated British Console EQ with Brown and Black Voicings
description: A ground-up rebuild of the 4K EQ, with the equalizer and high-pass/low-pass filters of a classic British E-series channel strip measured band by band. Brown and Black are separate voicings rather than cosmetic themes, each with its own measured frequency, gain, Q, shelf, filter, interaction, nonlinearity and overload behavior. Free AU, VST3, CLAP, and LV2 plugin for Linux, Windows, and macOS.
version: "1.0.1"
screenshot: /assets/images/plugins/4k-eq-2-screenshot.png

features:
  - "Two calibrated voicings: Brown (E-series) and Black (G-series), each independently measured"
  - "4-band EQ (LF / LMF / HMF / HF) with switchable Bell/Shelf on LF and HF"
  - Adjustable Q on the LMF and HMF bands
  - High-pass and low-pass filters
  - "1x / 2x / 4x oversampling for cramp-free high-frequency response"
  - Fixed modeled path nonlinearity driven by Input Gain, matching the reference channel strip
  - Auto Gain compensation toggle
  - Real-time pre/post FFT spectrum analyzer overlaid on the response graph
  - 14 factory presets plus a user preset library
  - Resizable interface
  - Full automation support

formats:
  - "Linux: VST3, LV2, CLAP"
  - "Windows: VST3, CLAP"
  - "macOS: VST3, AU, LV2, CLAP"

requirements:
  - "Linux: glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "Linux downloads: x64 is for Intel/AMD PCs; arm64 is for ARM systems"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "Windows: Windows 10 or later"
  - "64-bit DAW with AU, VST3, CLAP, or LV2 support"
  - "Sample rates: 44.1 kHz to 192 kHz"

changelog:
  - version: "1.0.1"
    date: "2026-08-26"
    changes:
      - "Fixed CLAP output peak meters being reported to the host as parameter changes, which made hosts such as Bitwig mark the project modified and constantly override the last-touched parameter"
      - "User presets: storage deduplicated in the shared framework layer"
  - version: "1.0.0"
    date: "2026-08-16"
    changes:
      - Initial public release
      - "Brown (E-series) and Black (G-series) voicings, each independently measured and calibrated"
      - "4-band EQ (LF/LMF/HMF/HF) with switchable Bell/Shelf on LF and HF, adjustable Q on LMF/HMF"
      - High-pass and low-pass filters
      - "1x/2x/4x oversampling for cramp-free high-frequency response"
      - Real-time pre/post FFT spectrum analyzer
      - 14 factory presets plus a user preset library
      - Resizable interface
      - Crash logs are now captured; the supporters overlay has an "Open crash log folder" link
---

4K EQ 2 is a ground-up rebuild of 4K EQ, modeling the equalizer and high-pass/low-pass filters of a classic British E-series channel strip band by band. Completely free.

## Overview

Brown and Black are separate voicings rather than cosmetic themes. Each was measured independently: its own frequency, gain, Q, shelf, filter, interaction, nonlinearity, and overload behavior. Use it for broad tonal decisions where a console EQ is faster than a surgical parametric equalizer: shaping drums, moving a vocal forward, removing low-end clutter, or adding a restrained shelf to a mix bus. The LMF and HMF sections stay fully adjustable when a narrower correction is needed.

The modeled EQ path carries a fixed amount of native nonlinear color, the same as the reference channel strip. There is no separate Drive control; raise Input to push the modeled path harder, then trim Output to compare fairly.

## Open Source

4K EQ 2 is open source under GPL-2.0. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).

---

*Disclaimer: This is an independent emulation inspired by classic British console EQs. This project is not affiliated with or endorsed by any hardware manufacturer.*
