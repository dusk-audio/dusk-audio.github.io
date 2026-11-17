---
layout: plugin
title: 4K EQ 2
slug: 4k-eq-2
tagline: Calibrated British console EQ with Brown and Black voicings
description: A ground-up rebuild of the 4K EQ, with the equalizer and high-pass/low-pass filters of a classic British E-series channel strip measured band by band. Brown and Black are separate voicings rather than cosmetic themes, each with its own measured frequency, gain, Q, shelf, filter, interaction, nonlinearity and overload behavior. Free AU, VST3, CLAP, and LV2 plugin for Linux, Windows, and macOS.
version: "1.0.6"
screenshot: /assets/images/plugins/4k-eq-2-screenshot.webp

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
  - version: "1.0.6"
    date: "2026-11-17"
    changes:
      - "1.0.6 keeps 1.0.5's frequency dial law (what each dial setting plays), its parameters and its factory presets: every parameter has the same name, range and default in every format, and each factory preset sets the same values as in 1.0.5"
      - "Sessions and user presets from 1.0.5 open with the same settings, and at 4x from 44.1 kHz, 2x from 88.2 kHz or 1x from 176.4 kHz they also sound as in 1.0.5, apart from tiny rounding differences in a few settings"
      - "Projects and user presets saved with 1.0.6 open in 1.0.5 with the same settings"
      - "At 1x and 2x oversampling the bands and the LPF no longer cramp near the top: measured at 44.1 and 48 kHz, up to 20 kHz their curves now stay within about 1 dB of the 4x curves for one band or the LPF, and within about 2.5 dB with all four bands at full boost or cut; in the worst settings found, 1.0.5 at 1x was off by about 10 dB for one band, about 25 dB for the LPF and more than 40 dB for several bands together (#289)"
      - "Because of that, sessions from 1.0.5 run at other settings, such as 1x or 2x at 44.1 or 48 kHz, can sound different, mostly in the highs. Measured at 1x and 44.1 kHz on 1.0.5 settings: a 4 dB high shelf changes by 0.25 dB or less, a 4 dB high bell by up to about 2.3 dB at 20 kHz, the LPF at a dial setting of 10000 by about 18 to 19 dB at 20 kHz, and, in the worst settings found with all four bands at full boost or cut, by about 40 dB at 20 kHz and more than 6 dB below 5 kHz"
      - "At 2x and 44.1 kHz the worst changes found were about 5 dB near 20 kHz and about 1.8 dB below 5 kHz; at 48 kHz the changes in the highs were smaller. Below 100 Hz the largest changes found were about 0.4 dB at 1x and about 1.2 dB at 2x, and more on the slope of a switched-in HPF where the sound is already about 20 dB or more down"
      - "The value a frequency knob shows while you hover or drag it, and in its typing field, is now its dial setting (for example 30.0 Hz, 200 Hz, 1.00 k, 16.0 k, the LPF in whole hertz such as 15201 Hz, and Out for a filter switched out), and it no longer changes with the gain or with Brown and Black; 1.0.5 showed a computed band frequency that moved with both, for example 189 Hz for the LF at its 200 marking, 271 Hz with 12 dB of boost and 310 Hz in Black"
      - "Typing into a frequency knob's field sets that dial setting, and accepts k, kHz and Hz (1.2k, 5.00 k, 12 kHz, 450 Hz) and, on the HPF and LPF, Out; in 1.0.5 a typed number set the computed frequency the value bubble showed, and text with a unit or Out was not accepted"
      - "Between its printed marks a frequency knob now moves through the dial the way the modeled console's dial does (measured at 21 positions per knob), so between two marks the same knob angle can give a different setting than in 1.0.5: halfway between the LF 75 and 200 marks is now 125 on the dial, where 1.0.5 gave about 103"
      - "The LMF and HMF Q knobs now move through the modeled console's Q dial: between the 1.5 and .88 marks they set 1.35, 1.2, 1.05 and 0.95, where 1.0.5 set 1.376, 1.252, 1.128 and 1.004 (the band's Q was up to about 15% too high there). Q values in sessions and presets play as before; a stored Q between those marks now shows its pointer at the angle the new travel gives it"
      - "The HPF and LPF markings now set the filter where the modeled console's markings do. In 1.0.5 a marking put the filter's 3 dB point near the marked frequency, where the filter could reach it; now, in Brown, the HPF at 120 is 3 dB down at about 80 Hz (1.0.5: about 112 Hz) and the LPF at 10 at about 13.6 kHz (1.0.5: about 10 kHz). Filters in sessions from 1.0.5 keep their settings, but their knobs now point where the console's dial has that setting: a Brown HPF set at the 120 marking in 1.0.5 now points about two thirds of the way toward 250 and reads 198 Hz"
      - "Pressing a knob without moving it no longer sends a value to the host. In 1.0.5 a press on a band, gain, Q or filter knob sent its value again on every frame while held, and on a filter set beyond the knob's 1.0.5 range it moved the filter: an LPF switched in at its top setting (15201, about 30 kHz in Brown) dropped to about 15 kHz"
      - "A click inside a knob's open value field now stays in the field; in 1.0.5 it closed the field, and a drag started there moved the knob (#337)"
      - "In a knob's value field, text that is not a number now keeps the field open and marked instead of closing it, Escape always cancels without sending anything, and Enter on text you did not change no longer rounds the value to the digits shown (in 1.0.5 a gain of 7.2305 dB became 7.231)"
      - "Saving a user preset now writes a temporary file first, so a save that fails partway, for example on a full disk, no longer damages an existing preset of the same name"
      - "Projects last saved with 4K EQ 2 1.0.0 open with their settings again in VST3 and CLAP, where 1.0.5 opened them at the default settings, and in AU they now also keep their bypass state"
      - "A parameter value that is not a finite number, from automation or a damaged project, is now ignored in VST3, CLAP and LV2, as the AU already did; in 1.0.5 such a value on Input Gain silenced the plugin"
      - "The editor now passes keys it does not use on to the host, so host shortcuts such as the space bar can work while the editor has the keyboard focus"
      - "CLAP: hosts now see the plugin's version and website, which were blank (#358)"
      - "VST3 and CLAP hosts now show parameter values without trailing zeros (16 instead of 16.000000), and CLAP values carry their unit (16 Hz, 0 dB)"
      - "Saturation and M/S Mode, kept only so older projects load, are now marked hidden in VST3 and CLAP, so hosts can leave them out of their parameter lists; projects keep their values"
      - "VST3 and CLAP: the plugin now also offers a mono layout (one input, one output), as its AU already did"
      - "At 4x oversampling below 88.2 kHz (such as 44.1 and 48 kHz) the plugin now reports 26 samples of latency, the 25.75 it delays the audio, instead of 27, so delay compensation lines it up to within a quarter sample instead of 1.25 samples; 2x and 1x report 23 and 0 as before"
      - "AU: the plugin now tells the host when changing Oversampling or Bypass changes its latency, so the host's delay compensation can follow"
      - "VST3: when a host pauses processing, as some do whenever playback stops, the plugin no longer clears its filter and oversampler state; settings were never affected"
      - "VST3: a parameter change that a host sends in a processing call with no audio, and a program change sent along with the audio, now take effect; 1.0.5 dropped both"
      - "Linux (X11): the editor no longer takes the keyboard focus away from other applications, hands the focus back to the host window when it is hidden or closed, and keeps its own X errors from reaching the host's error handler, which could make the host quit"
      - "macOS: with a high-resolution and a standard-resolution display connected, the editor no longer opens at half or double size on a display other than the main one"
      - "The Special Thanks panel (click the title) lists supporters under the current Patreon tiers in larger text; a double-click that closes it no longer also clicks the control underneath, and for 0.3 s after it closes the plugin ignores clicks"
      - "The manual now describes the frequency knobs as the console's dial markings and corrects how Brown and Black differ: in both modes the LMF and HMF bells narrow as you add boost or cut and a cut mirrors its boost, and Black applies more boost or cut at the same setting"
  - version: "1.0.5"
    date: "2026-09-06"
    changes:
      - "Frequency knobs regain their full travel"
      - "Shared printed knob ring and detent laws"
      - "Framework update (DAF 22b82824, pugl d46e7871): the first click on an unfocused editor registers on macOS, macOS resize sizing fix, drawing state set up on the expose path, AU buffer handling fix, Wayland backend updated"
  - version: "1.0.4"
    date: "2026-08-29"
    changes:
      - "Fixed the GRAPH toggle leaving the editor clipped on the right, or with empty space below it, in hosts that keep the window on a fixed aspect ratio (CLAP and VST3)"
      - "Fixed the window aspect the plugin reports to the host, which was very slightly wrong and made hosts size the editor a pixel off its design"
      - "Fixed knob dragging stopping when the plugin window loses keyboard focus mid-drag"
  - version: "1.0.3"
    date: "2026-08-28"
    changes:
      - "Fixed VST3 output peak meters being reported to the host as parameter edits, which churned the undo history in hosts such as Bitwig until Undo and Redo were no longer offered, and marked the project modified on every save (#233)"
      - "Added VST3 and CLAP regression harnesses, plus an editor drag test, that fail the build if output parameters reach the host or if a knob stops responding to the mouse"
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
