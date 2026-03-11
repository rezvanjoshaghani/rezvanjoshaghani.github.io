---
title: "Energy-based coefficient selection in Triangle-DCT"
date: 2026-03-01
description: "Comparing truncation strategies in our compression pipeline and what the synthetic test results reveal."
tags: ["3DGS", "Compression"]
dotColor: "#00F0FF"
---

One of the key decisions in our Triangle-DCT compression pipeline is how to select which DCT coefficients to keep. The naive approach is low-frequency truncation — keep the first N coefficients in zigzag order and discard the rest. It's simple, fast, and works reasonably well for natural images. But triangle meshes aren't natural images.

We found that energy-based coefficient selection consistently outperforms low-frequency truncation across our test scenes. The idea is straightforward: rank all coefficients by their energy contribution (squared magnitude) and keep the top-K regardless of their frequency position. High-frequency coefficients that carry significant energy — common at sharp edges and material boundaries — are preserved instead of being discarded by a fixed cutoff.

The results on synthetic scenes were particularly striking. Scenes with fine geometric detail (think wire fences, lattice structures, foliage) showed the largest quality gap between the two strategies. On smoother scenes the difference narrowed, but energy-based selection was never worse. The computational overhead of sorting coefficients is negligible compared to the DCT itself, making this a clear win for the pipeline.
