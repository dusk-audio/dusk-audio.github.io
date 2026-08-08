---
layout: plugin
title: Tape Echo 2
slug: tape-echo-2
tagline: Three-Head Tape Delay with Spring Reverb
description: A three-head tape echo and spring reverb modeled end to end, with 12 echo modes, mechanical head timing, tape age, splice dropout, and regeneration that runs into self-oscillation. Free AU, VST3, CLAP, and LV2 plugin for Linux, Windows, and macOS.
version: "1.0.0"
screenshot: /assets/images/plugins/tape-echo-2-screenshot.png

features:
  - "12 echo modes covering every head and reverb combination"
  - Three playback heads at fixed mechanical ratios, driven by one motor
  - Spring reverb tank with three unequal springs and a dispersive tail
  - Tape saturation with a modeled record and playback chain
  - "Tape Age in three cartridge conditions: New, Used, Old"
  - Wow and flutter that worsen with tape age, as on the hardware
  - Automatic splice dropout as the tape join circulates past the heads
  - Regeneration that runs from a single repeat into self-oscillation
  - "Tempo sync across eleven note detents, held to the motor range as on the hardware"
  - Record-path VU meter with peak lamp
  - Dry/wet mix plus independent echo and spring panning
  - Record-input switch that mutes the tape feed while the spring stays live
  - 13 factory presets
  - Resizable interface
  - Full automation support

formats:
  - "Linux: VST3, LV2, CLAP"
  - "Windows: VST3, CLAP"
  - "macOS: VST3, AU, LV2, CLAP"

requirements:
  - "Linux: glibc 2.31+ (Ubuntu 20.04+, Debian 11+, Fedora 34+)"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "Windows: Windows 10 or later"
  - "64-bit DAW with AU, VST3, CLAP, or LV2 support"
  - "Sample rates: 44.1 kHz to 192 kHz"

changelog:
  - version: "1.0.0"
    date: "2026-08-04"
    changes:
      - Ground-up DPF rebuild of Tape Echo with AU, VST3, CLAP, and LV2 support
      - Three-head transport with mechanical head ratios across the full motor range
      - Spring reverb tank rebuilt with a linear send and recalibrated recurrence
      - Tape age drives wow, flutter, hiss, and level wobble together
      - Self-oscillation reworked so runaway builds from the tape flux, not loop gain alone
      - Tempo sync across eleven note detents, held to the transport's physical range
      - Record-path VU and peak metering
      - 13 factory presets
---

Tape Echo 2 is a three-head tape delay and spring reverb, modeled from the record head to the output amplifier. Completely free.

## Overview

A tape echo is a loop of tape running past one record head and three playback heads. Where the heads sit determines the rhythm, how fast the motor turns determines the tempo, and how much signal you feed back onto the tape determines whether you get one repeat, a rhythmic cascade, or a howling runaway.

Tape Echo 2 models that machine rather than approximating it with a delay line. The three heads share a single motor, so moving the Repeat Rate moves all three together and the tape glides into its new speed the way a real transport does. Age the tape and the wow, flutter, hiss, and level wobble all worsen together. Push the regeneration and the loop saturates, compresses, and eventually self-oscillates.

## Echo Modes

Twelve modes select which heads are active and whether the spring tank is in the path:

| Mode | Path |
|------|------|
| **1** | Head 1 |
| **2** | Head 2 |
| **3** | Head 3 |
| **4** | Heads 2 + 3 |
| **5** | Head 1 + Reverb |
| **6** | Head 2 + Reverb |
| **7** | Head 3 + Reverb |
| **8** | Heads 1 + 2 + Reverb |
| **9** | Heads 2 + 3 + Reverb |
| **10** | Heads 1 + 3 + Reverb |
| **11** | Heads 1 + 2 + 3 + Reverb |
| **12** | Reverb Only |

## The Transport

One motor drives all three heads. Head 1 spans roughly 70 to 178 ms; heads 2 and 3 sit at fixed mechanical ratios beyond it, reaching about 490 ms at the slow end of the motor range.

Because the heads are mechanically linked, selecting a multi-head mode gives you a rhythm rather than a single echo, and changing the Repeat Rate transposes that whole rhythm at once. The motor has inertia, so a tempo change glides instead of jumping.

## Tempo Sync

Eleven note detents derive the motor speed from the host tempo. The rhythmic value belongs to the leading active head, so the same detent reads differently in a Head 1 mode than in a Head 3 mode.

A real tape echo can only run its motor so slowly. Tempo Sync respects that: a note longer than the transport can carry is held at the motor's maximum rather than transposed down, which is what the hardware does. Longer divisions therefore converge on the same timing at a given tempo, and slow tempos reach the limit sooner. Reach for a shorter division or a multi-head mode when you want the repeat to track the bar at low tempos.

## Tape Age

Three cartridge conditions rather than a continuous wear knob:

| Condition | Character |
|-----------|-----------|
| **New** | Tightest timing, lowest noise, cleanest repeats |
| **Used** | Audible flutter, a little hiss, gentle level wobble |
| **Old** | Heavy scrape flutter, pronounced hiss, unstable level |

Age drives all of the transport's imperfections together: wow, scrape flutter, tape hiss, and slow playback-level wobble each worsen on their own curve, the way a worn cartridge actually degrades.

## Spring Reverb

The spring tank uses three unequal springs, spread widely enough that their transit times span about 5.6 ms. Each pair beats at the difference of its round-trip rate, and that beating is the tank's movement: there is no LFO anywhere in it. Spacing the springs far apart gives fewer, faster beats that read as texture rather than the slow warble you get from bunching them together. Two short allpass diffusers then fill the gaps between the three arrivals, so the tail is dense instead of a set of spikes.

The send is linear across the full drive range, which means the spring keeps its character whether you feed it gently or hit it hard.

The Record Input switch mutes the feed to the tape while leaving the spring live, so you can hold a spring wash while the echoes decay away underneath it.

## Regeneration and Self-Oscillation

Intensity controls how much of the playback signal is written back to the tape. Low settings give a single soft repeat. Mid settings build a decaying cascade. Past unity the loop stops decaying and starts growing.

Runaway is modeled through the tape rather than bolted on: the loop saturates the tape flux, the record chain compresses, and the oscillation settles into a howl rather than clipping into digital noise.

## Factory Presets

Thirteen presets covering the machine's range:

**Starting Point**
- Default

**Short and Rhythmic**
- Slapback Vocal, Rockabilly Guitar, Classic Tape Echo

**Dub and Multi-Head**
- Dub Throw, Synced 1/8 Dub, Multi-Head Bounce, Orbital Echo

**Ambient**
- Full Wash, Ambient Trails

**Character**
- Worn Tape, Runaway Drone, Spring Only

## Metering

The VU meter reads the record path, after the input amplifier and immediately before the tape. It shows what is actually being written, including the regenerated signal, so you can see the loop building before you hear it run away. The peak lamp is referenced to digital full scale and lights just below clipping.

## Technical Specifications

### DSP Details
- **Record chain:** oversampled preamp with latency-compensated halfband filtering
- **Heads:** three fixed mechanical ratios from one motor position, Hermite-interpolated
- **Modulation:** wow, sinusoidal flutter, and band-limited scrape flutter, all age-coupled
- **Spring tank:** three unequal springs with allpass dispersion and modeled pickup taps
- **Metering:** record-path VU with analog ballistics plus a peak lamp

### Parameter Ranges
- **Repeat Rate:** full motor range, about 70 to 178 ms at Head 1
- **Intensity:** 0 to 100%, self-oscillating at the top of the range
- **Echo and Reverb Volume:** independent, each with its own pan
- **Bass and Treble:** tone controls on the echo return
- **Output Volume:** -20 dB to +20 dB
- **Mix:** dry only at 0%, both paths at unity at 50%, fully wet at 100%

## Installation

### Linux
```
VST3: ~/.vst3/tape_echo.vst3
CLAP: ~/.clap/tape_echo.clap
LV2:  ~/.lv2/tape_echo.lv2
```

### macOS
```
AU:   ~/Library/Audio/Plug-Ins/Components/tape_echo.component
VST3: ~/Library/Audio/Plug-Ins/VST3/tape_echo.vst3
CLAP: ~/Library/Audio/Plug-Ins/CLAP/tape_echo.clap
LV2:  ~/Library/Audio/Plug-Ins/LV2/tape_echo.lv2
```

### Windows
```
VST3: C:\Program Files\Common Files\VST3\tape_echo.vst3
CLAP: C:\Program Files\Common Files\CLAP\tape_echo.clap
```

## Open Source

Tape Echo 2 is open source under GPL-3.0-or-later. View the source, report issues, or contribute on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).

---

*Disclaimer: This is an independent emulation inspired by classic tape echo hardware. This project is not affiliated with or endorsed by any hardware manufacturer.*
