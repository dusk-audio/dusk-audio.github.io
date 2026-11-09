---
layout: plugin
title: Multi-Comp 2
slug: multi-comp-2
published: false
tagline: Multi-Mode Compressor with Hardware-Style Faces
description: Eight compression modes in one plugin, each with its own face. Opto, FET Black, FET Blue, VCA, Bus, and Studio VCA are matched to measurements of reference units; Digital and 4-band Multiband are our own designs. Free AU, VST3, CLAP, and LV2 plugin for Linux, Windows, and macOS.
version: "1.0.0"
screenshot: /assets/images/plugins/multi-comp-2-screenshot.webp

features:
  - "Eight modes, each with its own face: Opto, FET Black, VCA, Bus, FET Blue, Studio VCA, Digital, and Multiband"
  - "Six modes matched to measurements of reference units: Opto, FET Black, FET Blue, VCA, Bus, and Studio VCA"
  - "Two FET voices: FET Black with the 4, 8, 12, 20, and All ratio buttons, and FET Blue with 2, 4, 8, and 20 and their two-button combinations"
  - "Digital compressor with Knee, Lookahead, and Adaptive Release"
  - "4-band Multiband with adjustable crossovers and per-band solo and bypass"
  - "Settings drawer for the external sidechain, sidechain listen and EQ, Oversampling, True Peak, Analog Noise, Stereo Link, Drive, and Lookahead"
  - "Needle meters with gain reduction and output scales"
  - "Sidechain filter on the Opto, FET Blue, VCA, Bus, and Digital faces"
  - "Mix control on every mode for parallel compression"
  - "Auto Makeup gain"
  - "Mode and Oversampling changes fade out and back in instead of clicking"
  - "The same latency in every mode while Lookahead is off"
  - "13 factory presets plus user presets"
  - "Mono and stereo operation"
  - "One 1120 x 380 window for every mode, resizable, with every face legible at that size"
  - "Full automation support"

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

Multi-Comp 2 is the successor to Multi-Comp. It has its own plugin identity, so both can be installed side by side; keep the original for projects that already use it.

## Overview

Multi-Comp 2 puts eight compressors in one plugin. Choose a mode from the row under the title bar and its face appears below it: a hardware-style faceplate for each of the six measured modes, and a rack panel of their own for Digital and Multiband.

The six measured modes are matched to reference units. Each one was measured against its reference on test signals and on music at many settings, comparing the gain reduction the two apply, control by control. Digital and Multiband are our own designs.

## The Modes

| Mode | Character | Controls |
|------|-----------|----------|
| **Opto** | Optical leveling amplifier with a smooth, program-dependent response | Gain, Peak Reduction, Compress / Limit, SC HP, Mix |
| **FET Black** | Fast FET limiting amplifier | Input, Output, Attack, Release, ratio buttons 4, 8, 12, 20, and All, Mix |
| **FET Blue** | A second FET limiting amplifier, measured from a different reference unit | Input, Output, Attack with an SLO position, Release, ratio buttons 2, 4, 8, and 20 with their two-button combinations, SC Filter, Headroom, Mix |
| **VCA** | VCA compressor/limiter with Below and Above threshold lamps | Threshold, Compression, Output Gain, PULL/SC sidechain switch, Mix |
| **Bus** | Stereo bus compressor | Threshold, Ratio (2, 4, 10), Attack, Release (including Auto), Make-Up, SC Filter, Headroom, Mix, Auto Fade |
| **Studio VCA** | Clean studio VCA compressor | Input, Ratio, Threshold, Attack, Release, Auto Release, Make Up Gain, Dry/Wet |
| **Digital** | Clean digital compressor | Threshold, Ratio, Knee, Attack, Release, Lookahead, Mix, Output, Adaptive Release, SC HP |
| **Multiband** | Four bands split by three adjustable crossovers | Threshold, Ratio, Attack, Release, and Make-Up per band, band Bypass and Solo, Output, Mix |

AUTO MAKEUP and BYPASS sit in the mode row beside the eight mode tabs.

## Settings Drawer

SETTINGS, at the right end of the mode row, opens a drawer over the face with the controls that work across modes:

- **Sidechain:** External Key, SC Listen, and a sidechain EQ with a low and a high shelf
- **Processing:** Oversampling (Off, 2x, 4x), True Peak detection (4x or 8x), and Analog Noise
- **Stereo:** Link amount and Link Mode (Stereo, Mid-Side, Dual Mono)
- **Drive:** Soft, Hard, or Clip, with an Amount
- **Lookahead:** for Digital and Multiband
- **FET Black:** Threshold, Transient, and Curve

A setting the current mode does not use stays in place, greyed out, so the drawer reads the same in every mode. Choosing a mode closes it.

## Lookahead and Latency

Lookahead belongs to the digital modes. The drawer's Lookahead (up to 10 ms) acts in Digital and Multiband, and Digital has a Lookahead knob of its own on its face. The six measured modes ignore Lookahead, as their reference units have none, so it adds no delay there.

With Lookahead at zero, Multi-Comp 2 reports the same latency in every mode (73 samples at 44.1 and 48 kHz), so switching modes never moves the track in time. With a Lookahead set, switching between Digital or Multiband and another mode changes the latency, and your host updates its delay compensation.

## Switching Modes

Changing the mode, the Oversampling setting, or FET Black's All button while audio plays fades the output out, makes the change in silence, and fades it back in, all within a few milliseconds. A switch does not jump, click, or replay audio from before it.

## Metering

Every face carries its own gain reduction metering. Opto and the two FET faces have VU needles that read gain reduction or output level. The VCA meter reads input, output, or gain reduction; Bus has its compression meter; Studio VCA pairs an input or output meter with a gain reduction meter. Digital shows its gain reduction on a VU or, with a click, as a history graph, and Multiband has a meter for each band.

## One Window for Every Mode

Every mode opens in the same 1120 x 380 window, and the window can be enlarged. Each face is laid out to be read at that size: control legends are at least 16 px and values 17 px.

## Factory Presets

Thirteen factory presets, plus your own presets saved from the preset menu:

**Vocals**
- Smooth Opto Vocal, Vocal Presence, Modern Pop Control

**Drums**
- Classic Drum Glue, Room Nuke (FET All), Snare Snap

**Bass**
- Rock Bass Anchor, Vintage Pinned Bass

**Guitars**
- Acoustic Strum Tamer, Funk Rhythm Guitar

**Mix Bus**
- Console-Style Glue, Gentle Master

**Creative**
- EDM Pump (115-130 BPM)

## Installation

### Linux
```
VST3: ~/.vst3/multi-comp-2.vst3
CLAP: ~/.clap/multi-comp-2.clap
LV2:  ~/.lv2/multi-comp-2.lv2
```

### macOS
```
AU:   ~/Library/Audio/Plug-Ins/Components/multi-comp-2.component
VST3: ~/Library/Audio/Plug-Ins/VST3/multi-comp-2.vst3
CLAP: ~/Library/Audio/Plug-Ins/CLAP/multi-comp-2.clap
LV2:  ~/Library/Audio/Plug-Ins/LV2/multi-comp-2.lv2
```

### Windows
```
VST3: C:\Program Files\Common Files\VST3\multi-comp-2.vst3
CLAP: C:\Program Files\Common Files\CLAP\multi-comp-2.clap
```

## Open Source

Multi-Comp 2 is open source under GPL-3.0-or-later. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).

---

*Disclaimer: This is an independent emulation inspired by classic compressor hardware. This project is not affiliated with or endorsed by any hardware or software manufacturer.*
