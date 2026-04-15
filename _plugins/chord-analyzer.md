---
layout: plugin
title: Chord Analyzer
slug: chord-analyzer
tagline: Real-time chord detection with music theory analysis
description: MIDI chord analyzer with Roman numeral analysis, harmonic function detection, intelligent chord suggestions, and session recording. Free VST3, LV2, and AU plugin.
version: "1.0.1"
screenshot: /assets/images/plugins/chord-analyzer-screenshot.png

features:
  - Real-time chord detection from MIDI input
  - 45 chord patterns (triads, 7ths, extended, altered, sus, add)
  - Roman numeral analysis in any key (major and minor)
  - Harmonic function labels (Tonic, Subdominant, Dominant)
  - Inversion detection with slash notation
  - "3-tier chord suggestions: Basic, Intermediate, Advanced"
  - Session recording with JSON export
  - Educational tooltips for music theory concepts
  - Resizable UI with persistent window size

requirements:
  - "Linux: Debian 12+, Ubuntu 22.04+, Fedora 36+ (glibc 2.36+)"
  - "Windows: Windows 10 or later"
  - "macOS: macOS 10.13 (High Sierra) or later"
  - "64-bit DAW with VST3, LV2, or AU support"
  - "DAW must support MIDI routing to analyzer plugins"

changelog:
  - version: "1.0.0"
    date: "2026-03-29"
    changes:
      - Initial release
      - 45 chord patterns with root detection and confidence scoring
      - Roman numeral analysis with major and minor key support
      - "3-tier suggestion system: common progressions, secondary dominants, chromatic mediants"
      - Session recording with timestamped JSON export
      - Educational tooltips for all chord qualities and harmonic functions
      - Resizable UI
---

Chord Analyzer is a real-time MIDI chord detection and music theory analysis plugin — completely free.

## Overview

Route MIDI to Chord Analyzer and instantly see what chord you're playing, its Roman numeral in your chosen key, and its harmonic function. Get intelligent suggestions for what chord to play next, from basic I-IV-V progressions to advanced chromatic mediants and Coltrane changes.

## Features

### Chord Detection
Recognizes 45 chord types including triads, seventh chords, extended chords (9th, 11th, 13th), altered dominants, sus chords, and power chords. Detects inversions and displays slash notation.

### Music Theory Analysis
Set your key (any root, major or minor) and see Roman numeral analysis for every chord. Harmonic function labels (Tonic, Subdominant, Dominant, Borrowed, Chromatic) help you understand the role each chord plays.

### Chord Suggestions
Three tiers of suggestions based on your current chord:
- **Basic** — Common progressions (I-IV-V, ii-V-I, vi-IV)
- **Intermediate** — Secondary dominants, borrowed chords, tritone substitutions
- **Advanced** — Chromatic mediants, Neapolitan chords, augmented 6th approaches

### Session Recording
Record your chord progressions with timing data and export as JSON for analysis, notation software, or further processing.

### Educational Tooltips
Hover over any element to learn about chord qualities, harmonic functions, and why certain progressions work.

## Two Versions

Chord Analyzer ships in two versions to ensure compatibility across all DAWs:

| Version | Plugin Type | Use In |
|---------|------------|--------|
| **Chord Analyzer** | Instrument | FL Studio, Ableton Live |
| **Chord Analyzer FX** | Audio Effect (with MIDI) | Reaper, Bitwig, Logic Pro, Cubase, LV2 hosts |

Both versions are identical in functionality. The difference is how your DAW classifies and routes MIDI to them. **If in doubt, try Chord Analyzer FX first** — it's the simpler workflow in most DAWs.

## DAW Setup Guide

### Bitwig Studio

1. Add your synth to a MIDI track as normal
2. In the device chain, click **+** before your synth
3. Search for **"Chord Analyzer FX"** and add it
4. MIDI passes through automatically — your synth still receives all notes

### Reaper

1. Open the FX chain on your MIDI/instrument track
2. Click **Add** and search for **"Chord Analyzer FX"** (VST3)
3. Drag it above your synth in the chain
4. MIDI passes through to your synth automatically

### Logic Pro

1. On your instrument track, click an empty **Audio FX** slot
2. Search for **"Chord Analyzer FX"** under AU > Dusk Audio
3. Insert it — the plugin receives MIDI from the track and passes audio through
4. Your instrument plugin remains in the Instrument slot as normal

### Cubase / Nuendo

1. On your instrument track, add **"Chord Analyzer FX"** as an insert effect
2. The plugin receives MIDI from the track automatically
3. Your instrument remains unchanged

### Ableton Live

Ableton doesn't route MIDI to effect plugins, so use the **instrument version** with an Instrument Rack:

1. Load your synth on a MIDI track as normal
2. Select your synth and press **Cmd+G** (Mac) or **Ctrl+G** (Windows) to group it into an **Instrument Rack**
3. Click the **Show Chain List** button (three horizontal lines on the left side of the rack)
4. Right-click in the empty space below your synth's chain and choose **Create Chain**
5. Drag **"Chord Analyzer"** (the instrument version, not FX) from the browser into the new empty chain
6. Both chains receive the same MIDI — your synth produces sound, the Chord Analyzer shows chords

### FL Studio

Use the **instrument version** with Patcher:

1. Add a **Patcher** instance to your channel rack
2. Inside Patcher, add both **"Chord Analyzer"** and your synth as nodes
3. Route the MIDI input to both plugins in parallel
4. Route only your synth's audio output to the Patcher output
5. Both plugins receive MIDI — your synth produces sound, the Chord Analyzer shows chords

### LV2 Hosts (Zynthian, Ardour, Carla)

1. Insert **"Chord Analyzer FX"** in your plugin chain before your synth
2. MIDI passes through to the next plugin in the chain
3. Audio passes through unchanged

## Installation

| Platform | Format | Location |
|----------|--------|----------|
| Linux | VST3 | `~/.vst3/` |
| Linux | LV2 | `~/.lv2/` |
| macOS | AU | `~/Library/Audio/Plug-Ins/Components/` |
| macOS | VST3 | `~/Library/Audio/Plug-Ins/VST3/` |
| Windows | VST3 | `C:\Program Files\Common Files\VST3\` |

Both "Chord Analyzer" and "Chord Analyzer FX" are included in the download. Install both — use whichever version works best in your DAW.

## Open Source

Chord Analyzer is free and open source. Source code is available on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).
