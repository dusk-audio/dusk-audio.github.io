---
layout: plugin
title: TapeMachine 2
slug: tapemachine-2
tagline: Two-Machine Analog Tape Emulation
description: The next-generation Dusk Audio tape engine — two modeled machines, Swiss 800 and Classic 102, with anti-aliased saturation, per-speed head bump and HF response, wow & flutter, repro EQ, and machine-authentic front-panel toggles. Free AU, VST3, CLAP, and LV2 plugin for macOS and Linux.
version: "1.0.0"
screenshot: /assets/images/plugins/tapemachine-2-screenshot.png

features:
  - Two modeled machines — Swiss 800 (Studer A800-style) and Classic 102 (Ampex ATR-102-style)
  - Anti-aliased waveshaping saturation (ADAA with internal oversampling)
  - Per-speed head bump and high-frequency response modeling
  - Four tape speeds — 3.75, 7.5, 15, and 30 IPS
  - Four tape formulations — Type 456, GP9, Type 900, Type 250
  - Four calibration levels — +3, +6, +7.5, +9 dB
  - Adjustable head width on Classic 102 — 1/4", 1/2", 1"
  - Machine-authentic front-panel toggles — Crosstalk, Wow & Flutter, Transformer
  - Four signal path modes — Repro, Sync, Input, Thru
  - NAB and CCIR EQ standards
  - Separate Wow & Flutter controls with coherent stereo processing
  - Four-band advanced Repro EQ (LF / LMF / HMF / HF)
  - Bias and auto-calibration controls for fine-tuning tape response
  - Auto Compensation mode for unity gain across drive levels
  - Dual stereo VU meters with vintage analog styling
  - 20 factory presets modeled on the hardware units' classic settings
  - Resizable interface
  - Full automation support

requirements:
  - "Linux: glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "Windows: build to follow"
  - "64-bit DAW with AU, VST3, CLAP, or LV2 support"
  - "Sample rates: 44.1kHz – 192kHz"

changelog:
  - version: "1.0.0"
    date: "2026-07-15"
    changes:
      - Ground-up DPF rebuild of TapeMachine with AU, VST3, CLAP, and LV2 support
      - Swiss 800 (Studer A800-style) and Classic 102 (Ampex ATR-102-style) machines
      - Anti-aliased waveshaping saturation with per-speed head bump and HF response
      - Four tape speeds (3.75–30 IPS), four formulations, and four calibration levels
      - Adjustable head width and ATR-style front-panel toggles on Classic 102
      - Four-band advanced Repro EQ modeled on the hardware repro path
      - 20 factory presets modeled on the hardware units' classic settings
---

TapeMachine 2 is the next-generation Dusk Audio tape engine — two faithfully modeled reel-to-reel machines with authentic saturation, head response, and machine character, completely free.

## Overview

Analog tape has shaped the sound of recorded music for decades. TapeMachine 2 captures the magic of two legendary studio machines with anti-aliased waveshaping saturation and per-speed head-response modeling, tuned against reference hardware behavior.

Whether you want subtle glue on your mix bus, punchy tracking color, or heavy lo-fi character, TapeMachine 2 delivers authentic tape sound across two distinct machines.

## Tape Machine Models

TapeMachine 2 recreates two iconic decks, each with its own saturation character and head response:

**Swiss 800** (Studer A800-style)
- Clean, punchy, and precise
- Transformerless signal path
- Tight low end with extended highs
- The modern studio workhorse

**Classic 102** (Ampex ATR-102-style)
- Warm, rich, and musical
- Transformer coloration with adjustable head width
- Pronounced head bump and smooth top end
- ATR-style front-panel toggles — Crosstalk, Wow & Flutter, and Transformer
- The mastering room classic

## Tape Formulations

Choose from four tape types, each with distinct sonic characteristics:

| Type | Character | Best For |
|------|-----------|----------|
| **Type 456** | Warm, punchy saturation | Rock, pop, mix bus |
| **GP9** | Clean, extended headroom | Mastering, classical |
| **Type 900** | European precision | Warmth, character |
| **Type 250** | Vintage, early saturation | Lo-fi, creative effects |

## Tape Speeds

Four selectable speeds, each with its own head bump and high-frequency response:

| Speed | Character |
|-------|-----------|
| **30 IPS** | Tightest low end, most extended highs |
| **15 IPS** | The studio standard — balanced head bump |
| **7.5 IPS** | Warmer, more pronounced low-frequency bump |
| **3.75 IPS** | Lo-fi character (Classic 102) |

## Signal Path Modes

Like a real tape machine, TapeMachine 2 offers multiple signal paths:

| Mode | Description |
|------|-------------|
| **Repro** | Full tape processing — the classic sound |
| **Sync** | Record-head playback with extra HF rolloff (for overdub workflows) |
| **Input** | Electronics only — hear just transformers and EQ coloration |
| **Thru** | Clean bypass for A/B comparison |

## EQ Standards

Two professional equalization standards on both machines:

| Standard | Character |
|----------|-----------|
| **NAB** | American — more HF pre-emphasis, warmer saturation |
| **CCIR** | European — balanced, precise response |

## Calibration & Head Width

- **Calibration levels** — +3, +6, +7.5, and +9 dB reference fluxivity. Higher calibration drives the tape harder for more saturation.
- **Head width** (Classic 102) — 1/4", 1/2", or 1" head stack for different weight and low-end behavior.
- **Bias & Auto Calibration** — dial in bias manually, or let auto-calibration find the optimal operating point.
- **Auto Compensation** — holds unity output while driving the tape for color, so louder saturation never means a louder mix.

## Repro EQ

A four-band advanced Repro EQ models the hardware repro-head path:

- **LF shelf** — low-frequency weight and body
- **LMF peak** — low-mid warmth and fullness
- **HMF peak** — presence and high-mid detail
- **HF shelf** — air and top-end sheen

## Wow & Flutter

TapeMachine 2 features separate controls for wow and flutter:

**Wow** — Slow pitch drift
- Creates subtle vinyl-like wobble
- Adds organic movement to sustained notes
- Perfect for lo-fi and vintage vibes

**Flutter** — Faster modulation
- Adds tape machine character
- Creates subtle chorus-like effects

Both effects share coherent stereo processing for a natural, phase-aligned sound, and can be disabled together from the Classic 102 front panel.

## Factory Presets

TapeMachine 2 ships with 20 factory presets, each modeled on the hardware units' classic settings, across five categories:

**Classic 102 — Master**
- Big 456 Master, Nice 456 Master, Jazz Vision Master, Clean 900 Master

**Classic 102 — Color**
- Fat 456 Master, GP9 Drum Bus, Massive Bass, Bright & Sizzly

**Swiss 800 — Mix**
- Classic Rock Crisp, Modern Rock, Drum Bus, Hi-Fi Shine, Lush Film, Jazz Warmth

**Swiss 800 — Color**
- Thick Saturation, Hip-Hop Punch, Vocal Presence

**Lo-Fi**
- Sunbaked Cassette, Analog Warmth, Old Tape

## Technical Specifications

### DSP Details
- **Saturation:** anti-aliased waveshaping with per-speed head-bump and HF response modeling
- **Oversampling:** fixed 2x core with deep local anti-aliasing (ADAA) on the nonlinearities — alias-free saturation with no user tuning needed
- **Repro path:** four-band advanced Repro EQ modeled on the hardware repro head
- **Metering:** dual stereo VU meters with vintage analog ballistics

### Parameter Ranges
- **Input Gain (drive):** ±12dB
- **Output Gain:** ±12dB
- **Bias:** 0–100%
- **Wow:** 0–100%
- **Flutter:** 0–100%
- **Highpass Filter:** 20–500Hz
- **Lowpass Filter:** 3kHz–20kHz
- **Repro EQ (per band):** ±12dB

## Installation

### Linux
```
VST3: ~/.vst3/TapeMachine2.vst3
CLAP: ~/.clap/TapeMachine2.clap
LV2:  ~/.lv2/TapeMachine2.lv2
```

### macOS
```
AU:   ~/Library/Audio/Plug-Ins/Components/TapeMachine2.component
VST3: ~/Library/Audio/Plug-Ins/VST3/TapeMachine2.vst3
CLAP: ~/Library/Audio/Plug-Ins/CLAP/TapeMachine2.clap
```

## Open Source

TapeMachine 2 is open source under GPL-3.0. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).

---

*Disclaimer: This is an independent emulation inspired by classic tape machines. This project is not affiliated with or endorsed by any hardware manufacturer.*
