---
layout: plugin
title: Ring Out
slug: ring-out
tagline: Feedback Eliminator for Monitors and PA
description: Ring Out finds the frequencies that feed back and notches them out, with a one-minute SETUP to ring out a system, ADD to catch a ring during the show, and up to twenty editable notch filters. Free AU, VST3, CLAP, and LV2 plugin for Linux, Windows, and macOS.
version: "0.1.0"
screenshot: /assets/images/plugins/ring-out-screenshot.png

features:
  - "SETUP: arm the detector for 60 seconds while you raise the gain, and it places a notch on each ring it hears"
  - "ADD: one press places or deepens one filter on the next ring, for the ring that turns up mid-show"
  - Up to twenty narrow notch filters, each with on/off, cut, frequency, and Q
  - A ring that comes back deepens or widens its existing notch instead of taking a new slot
  - "Tells a ring from a note by how it behaves: feedback holds or grows, a note decays, and harmonic-rich sounds are passed over"
  - "Two sensitivity settings: Low for conservative detection, High for quieter rings and faster response"
  - Stereo detection that a ring in one channel or opposite-polarity signals cannot hide from
  - Global Q and depth trims across every filter
  - LINK trades output gain for cut depth, so turning up also deepens the notches
  - Spectrum display with the filter curve, click to select a filter
  - Input and output level meters with peak hold
  - Notches fade in and out smoothly, with no clicks when filters change or on bypass
  - User presets that store the filter table with the settings
  - Typed value entry for each filter's cut, frequency, and Q
  - Host automation of SENSE, SETUP, ADD, RESET, the global trims, LINK, and output gain

formats:
  - "Linux: VST3, LV2, CLAP"
  - "Windows: VST3, CLAP"
  - "macOS: VST3, AU, LV2, CLAP"

requirements:
  - "Linux: glibc 2.35+ (Ubuntu 22.04+, Debian 12+)"
  - "Linux downloads: x64 is for Intel/AMD PCs; arm64 is for ARM systems"
  - "macOS: macOS 10.15 (Catalina) or later"
  - "Windows: Windows 10 or later"
  - "64-bit DAW with AU, VST3, CLAP, or LV2 support"
  - "Sample rates: 44.1 kHz to 192 kHz"

changelog:
---

Ring Out is built for ringing out wedges and a PA before soundcheck. Arm SETUP, bring the gain up slowly, and let it notch the frequencies that start to ring; then disarm it and keep the filters for the show. Keep a mute within reach while you do it: a ring can grow faster than any detector can react.

Ring Out is open source under GPL-3.0-or-later. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).
