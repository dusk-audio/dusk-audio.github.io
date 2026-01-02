---
layout: plugin
title: 4K-EQ
slug: 4k-eq
tagline: SSL 4000 Series Console EQ Emulation
description: Professional SSL-style 4-band parametric equalizer with analog modeling. Free VST3, LV2, and AU plugin for Linux, Windows, and macOS.
version: "1.0.2"
screenshot: /assets/images/plugins/4k-eq-screenshot.png

features:
  - 4-band parametric EQ (Low, Low-Mid, High-Mid, High)
  - Brown/Black modes — SSL E-series vs G-series characteristics
  - High-pass filter (18dB/oct) and low-pass filter (12dB/oct)
  - Bell/Shelf switching on LF and HF bands (Black mode)
  - 2x/4x oversampling for anti-aliased processing
  - SSL-accurate saturation modeling with per-band harmonics
  - Auto-gain compensation toggle
  - M/S processing mode for stereo width control
  - Real-time FFT spectrum analyzer
  - 15 factory presets
  - Mouse wheel control and double-click reset
  - Full automation support

requirements:
  - "Linux: GLIBC 2.31+ (Ubuntu 20.04+, Fedora 32+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1kHz – 192kHz"

changelog:
  - version: "1.0.2"
    date: "2025-10-21"
    changes:
      - Fixed frequency ranges to match SSL hardware specs
      - Limited Q ranges to realistic SSL values (0.4–4.0)
      - Set default saturation to 0% (SSL is clean unless driven)
      - Fixed tick mark positioning
      - Added auto-gain compensation toggle with UI button
      - Enhanced UI readability with larger labels
      - Added 5 new factory presets (total 15)
  - version: "1.0.1"
    date: "2025-10-02"
    changes:
      - Removed LV2 inline display (JUCE compatibility)
      - Added mouse wheel support for knobs
      - Added double-click reset to defaults
      - Added professional SSL-style tick markings
      - Added pre/post spectrum toggle
      - SIMD-optimized spectrum analyzer (~5% CPU reduction)
  - version: "1.0.0"
    date: "2025-09"
    changes:
      - Initial release with VST3/LV2/AU support
      - SSL Brown/Black modes
      - 2x/4x oversampling
      - Real-time spectrum analyzer
      - 10 factory presets
---

4K-EQ is a professional SSL 4000 series console EQ emulation, bringing the legendary sound of classic British mixing consoles to your DAW — completely free.

## Overview

The SSL 4000 series consoles are renowned for their musical, punchy EQ character. 4K-EQ captures that sound with accurate analog modeling, including the distinct characteristics of both E-series and G-series consoles.

Whether you're tracking, mixing, or mastering, 4K-EQ delivers the SSL sound that has shaped countless hit records.

## Brown vs Black Modes

4K-EQ faithfully recreates both SSL console variants:

**Brown (E-Series)**
- Musical, broader curves
- Gentle shelves with fixed Q
- Predominantly 2nd harmonic saturation (warm, transformer-colored)
- The classic "big console" sound

**Black (G-Series)**
- Surgical, tighter response
- Proportional Q (increases with gain)
- More 3rd harmonic saturation (clean, transformerless)
- Bell/Shelf switching on LF and HF bands

## Saturation Modeling

4K-EQ includes multi-stage SSL-accurate saturation:

- **Input transformer** coloration
- **NE5534 op-amp** characteristics
- **Output transformer** harmonics (E-Series only)
- **Per-band saturation** when boosting

Clean by default (0% saturation) — SSL consoles are transparent unless driven. Push the Drive control to add warmth and glue.

## Factory Presets

4K-EQ includes 15 professionally crafted presets:

| Preset | Description |
|--------|-------------|
| Default | Flat response, neutral starting point |
| Vocal Presence | Clarity boost without harshness |
| Kick Punch | Tight low-end thump |
| Snare Crack | Body and snap |
| Bass Warmth | Definition without mud |
| Bright Mix | Polished enhancement |
| Telephone EQ | Lo-fi narrow bandwidth |
| Air & Silk | High-end sparkle |
| Mix Bus Glue | Subtle cohesion with saturation |
| Master Sheen | Polished top-end for mastering |
| Bass Guitar Polish | Definition and punch |
| Drum Bus Punch | Cohesive drum processing |
| Acoustic Guitar | Clarity and sparkle |
| Piano Brilliance | Clarity and presence |
| Master Bus Sweetening | Final polish |

## Technical Specifications

### DSP Details
- **Filter topology:** Biquad IIR with SSL-specific coefficient shaping
- **Frequency warping:** Pre-warped for HF accuracy (prevents digital cramping)
- **Saturation model:** Asymmetric soft-clipping (NE5534 op-amp characteristic)

### Parameter Ranges (SSL Hardware-Accurate)
- **LF Gain:** ±20dB | **LF Freq:** 30–480Hz
- **LMF Gain:** ±20dB | **LMF Freq:** 200–2500Hz
- **HMF Gain:** ±20dB | **HMF Freq:** 600–7000Hz
- **HF Gain:** ±20dB | **HF Freq:** 1.5kHz–16kHz
- **Q Range:** 0.4–4.0 (proportional in Black mode)
- **HPF:** 16–350Hz (18dB/oct)
- **LPF:** 3kHz–22kHz (12dB/oct)
- **Saturation:** 0–100%
- **Output Gain:** ±12dB

### Performance
- **CPU usage:** ~1–2% per instance (2x oversampling, 48kHz)
- **Memory:** ~10MB per instance
- **Latency:** ~32 samples (2x) / ~96 samples (4x)
- Highly optimized — use on every channel without CPU issues

## DAW Compatibility

### Fully Tested
- **Reaper** — VST3/LV2, all features working
- **Ardour** — LV2 with full GUI
- **Carla** — VST3/LV2, standalone host
- **Standalone** — JUCE standalone application

### Expected to Work
- Bitwig Studio, Studio One, FL Studio
- Ableton Live, Cubase/Nuendo
- Logic Pro, GarageBand (AU on macOS)

## Installation

### Linux
```
VST3: ~/.vst3/4K EQ.vst3
LV2:  ~/.lv2/4K EQ.lv2
```

### Windows
```
VST3: C:\Program Files\Common Files\VST3\4K EQ.vst3
```

### macOS
```
VST3: ~/Library/Audio/Plug-Ins/VST3/4K EQ.vst3
AU:   ~/Library/Audio/Plug-Ins/Components/4K EQ.component
```

## Open Source

4K-EQ is open source under GPL-2.0. View the source, report issues, or contribute on [GitHub](https://github.com/luna-co-software/plugins).

---

*Disclaimer: This is an independent emulation inspired by SSL 4000 series consoles. SSL and Solid State Logic are trademarks of Solid State Logic Ltd. This project is not affiliated with or endorsed by SSL.*
