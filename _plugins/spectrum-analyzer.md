---
layout: plugin
title: Spectrum Analyzer
slug: spectrum-analyzer
tagline: Professional FFT spectrum analyzer with LUFS metering
description: Real-time FFT spectrum analyzer with LUFS loudness metering, true peak detection, stereo correlation, and K-System support. Free VST3, LV2, and AU plugin.
version: "1.0.0"
screenshot: /assets/images/plugins/spectrum-analyzer-screenshot.png

features:
  - Real-time FFT spectrum display (2048/4096/8192 resolution)
  - LUFS metering (Momentary, Short-term, Integrated, LRA)
  - True peak detection (ITU-R BS.1770-4)
  - Stereo correlation meter with visual bar
  - K-System metering (K-12, K-14, K-20)
  - Mid/Side and Left/Right channel routing
  - Adjustable smoothing, slope, decay, and display range
  - Peak hold with configurable decay rate
  - Resizable UI with persistent window size

requirements:
  - "Linux: Debian 12+, Ubuntu 22.04+, Fedora 36+ (glibc 2.36+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"

changelog:
  - version: "1.0.0"
    date: "2026-04-15"
    changes:
      - Initial release
      - FFT spectrum display with 2048/4096/8192 resolution options
      - LUFS loudness metering (EBU R128 compliant)
      - True peak detection (ITU-R BS.1770-4 compliant)
      - Stereo correlation meter
      - K-System metering support
      - Channel routing (Stereo, Mono, Mid, Side)
      - Settings overlay for analysis parameters
      - Resizable UI
---

Spectrum Analyzer is a professional real-time FFT spectrum analyzer with comprehensive metering, completely free.

## Overview

Insert Spectrum Analyzer on any track or bus to see a detailed frequency spectrum, loudness readings, true peak levels, and stereo correlation at a glance. All settings are accessible via the gear icon, keeping the main display clean and maximized.

## Features

### FFT Spectrum Display
Real-time frequency analysis with selectable resolution (2048, 4096, or 8192 samples). Adjustable smoothing, slope compensation, and display range. Optional peak hold overlay with configurable decay rate.

### LUFS Loudness Metering
EBU R128 compliant loudness metering with Momentary (400ms), Short-term (3s), Integrated (gated), and Loudness Range (LRA) readings. Integrated LUFS is highlighted for quick reference.

### True Peak Detection
ITU-R BS.1770-4 compliant true peak detection with 4x oversampling. Visual clip indicator shows red when levels exceed 0 dBTP.

### Stereo Correlation
Visual correlation meter ranging from -1 (out of phase) to +1 (mono). Color-coded bar (green/yellow/red) for instant stereo field assessment.

### Channel Routing
Analyze in Stereo, Mono, Mid, or Side modes directly from the header dropdown.

## Installation

| Platform | Format | Location |
|----------|--------|----------|
| Linux | VST3 | `~/.vst3/` |
| Linux | LV2 | `~/.lv2/` |
| macOS | AU | `~/Library/Audio/Plug-Ins/Components/` |
| macOS | VST3 | `~/Library/Audio/Plug-Ins/VST3/` |
| Windows | VST3 | `C:\Program Files\Common Files\VST3\` |

## Open Source

Spectrum Analyzer is free and open source. Source code is available on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).
