---
layout: plugin
title: Multi-Q
slug: multi-q
tagline: Universal EQ — Digital, British Console, and Tube
description: Three professional EQs in one plugin. Modern parametric with dynamics, classic British console, and vintage tube Pultec-style. Free VST3, LV2, and AU plugin.
version: "0.9.0"
screenshot: /assets/images/plugins/multi-q-digital.png

features:
  - Three distinct EQ modes in one plugin
  - "Digital: 8-band parametric with per-band dynamics"
  - "British: Classic console EQ (Brown/Black modes)"
  - "Tube: Pultec-style passive EQ with tube saturation"
  - Linear phase processing option (Digital mode)
  - Per-band dynamic EQ with threshold, attack, release, range
  - Real-time spectrum analyzer
  - 2x/4x oversampling
  - Auto-gain compensation
  - Preset system with A/B comparison
  - Full automation support

requirements:
  - "Linux: Debian 12+, Ubuntu 22.04+, Fedora 36+ (glibc 2.36+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "Sample rates: 44.1kHz – 192kHz"

changelog:
  - version: "0.9.0"
    date: "2026-02-05"
    changes:
      - Beta release with all three EQ modes
      - Digital mode with 8-band dynamic EQ
      - British mode with Brown/Black console emulation
      - Tube mode with Pultec-style curves
      - Linear phase processing
      - Real-time spectrum analyzer
---

Multi-Q is a universal equalizer that combines three legendary EQ designs into one powerful plugin — completely free.

## Overview

Instead of buying separate plugins for different EQ tasks, Multi-Q gives you everything in one place:

- **Digital** — Modern surgical precision with dynamic EQ
- **British** — Classic SSL-style console character
- **Tube** — Vintage Pultec warmth and musicality

Switch between modes instantly while keeping your session settings. Each mode has been carefully crafted to capture the essence of the original hardware.

## Digital Mode

Modern parametric EQ with per-band dynamics — similar to FabFilter Pro-Q but with dynamic processing built in.

**Features:**
- 8 fully parametric bands
- Per-band dynamic EQ (threshold, attack, release, range)
- Multiple filter types per band
- Linear phase option for transparent processing
- Low-pass filter with multiple curve types
- Real-time spectrum analyzer with pre/post display

**Dynamic EQ:**
Each band can respond dynamically to the input signal. Set a threshold, and the band will boost or cut based on the audio level — perfect for de-essing, dynamic resonance control, or frequency-dependent compression.

## British Mode

Classic console EQ emulation — the same engine as our 4K-EQ, integrated into Multi-Q.

**Features:**
- 4-band parametric (LF, LMF, HMF, HF)
- Brown (E-series) and Black (G-series) modes
- High-pass and low-pass filters
- Bell/Shelf switching on LF and HF bands
- Analog saturation with Drive control
- Per-band harmonic modeling

**Brown vs Black:**
- **Brown** — Musical, broad curves with transformer warmth
- **Black** — Surgical, tight response with proportional Q

## Tube Mode

Pultec-style passive EQ with tube saturation — the legendary "boost and cut at the same frequency" trick.

**Features:**
- LF Boost and Attenuation with selectable frequency
- HF Boost and Attenuation with bandwidth control
- Mid Dip/Peak section for presence shaping
- Tube Drive control for harmonic saturation
- Passive EQ curves that interact musically
- Vintage teal panel aesthetic

**The Pultec Trick:**
Boosting and cutting at the same low frequency creates a unique curve that adds punch without mud — a technique used on countless classic records.

## Technical Specifications

### Digital Mode
- **Bands:** 8 fully parametric
- **Filter types:** Bell, High/Low shelf, High/Low pass, Notch, Band pass
- **Dynamic range:** Up to 24dB boost/cut per band
- **Linear phase:** Zero phase distortion option

### British Mode
- **Topology:** Console-accurate biquad filters
- **Saturation:** Multi-stage analog modeling
- **Q behavior:** Fixed (Brown) or proportional (Black)

### Tube Mode
- **Curves:** Passive LC filter emulation
- **Tube model:** 12AX7 triode saturation
- **Interaction:** Authentic boost/cut frequency coupling

### Performance
- **CPU usage:** ~2-4% per instance (varies by mode)
- **Latency:** Minimum phase: ~32 samples / Linear phase: ~2048 samples
- **Memory:** ~15MB per instance

## Installation

### Linux
```
VST3: ~/.vst3/Multi-Q.vst3
LV2:  ~/.lv2/Multi-Q.lv2
```

### Windows
```
VST3: C:\Program Files\Common Files\VST3\Multi-Q.vst3
```

### macOS
```
VST3: ~/Library/Audio/Plug-Ins/VST3/Multi-Q.vst3
AU:   ~/Library/Audio/Plug-Ins/Components/Multi-Q.component
```

## Beta Status

Multi-Q is currently in beta (v0.9.0). Core functionality is stable, but we're still refining:

- Additional presets
- UI polish and responsiveness
- Documentation and tooltips

Please report any issues on [GitHub](https://github.com/luna-co-software/plugins/issues).

## Open Source

Multi-Q is open source under GPL-2.0. View the source, report issues, or contribute on [GitHub](https://github.com/luna-co-software/plugins).

---

*Multi-Q combines emulations inspired by classic British consoles and vintage American tube EQs. This project is not affiliated with or endorsed by any hardware manufacturer.*
