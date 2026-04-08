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

## Installation

| Platform | Format | Location |
|----------|--------|----------|
| Linux | VST3 | `~/.vst3/` |
| Linux | LV2 | `~/.lv2/` |
| macOS | AU | `~/Library/Audio/Plug-Ins/Components/` |
| macOS | VST3 | `~/Library/Audio/Plug-Ins/VST3/` |
| Windows | VST3 | `C:\Program Files\Common Files\VST3\` |

## Open Source

Chord Analyzer is free and open source. Source code is available on [GitHub](https://github.com/dusk-audio/dusk-audio-plugins).
