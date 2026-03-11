---
title: "Building a 32-scene benchmark for Gaussian Splatting"
date: 2026-01-01
description: "How we curated a diverse evaluation dataset and what PSNR/SSIM tell us across scene types."
tags: ["3DGS", "Evaluation"]
dotColor: "#FFE03D"
---

Most 3D Gaussian Splatting papers evaluate on the same handful of scenes — Mip-NeRF 360, Tanks and Temples, maybe a few from DeepBlending. That's fine for comparing against baselines on their home turf, but it doesn't tell you how methods generalize. We built a 32-scene benchmark specifically to stress-test our complexity-aware loss functions across a wide range of scene characteristics.

The curation process was deliberate. We wanted diversity along three axes: geometric complexity (simple rooms to dense foliage), material variety (diffuse, specular, translucent), and capture conditions (studio lighting to outdoor HDR). Scenes were drawn from public datasets, our own captures, and synthetic renders where we needed specific properties.

What surprised us was how poorly PSNR correlates with perceptual quality across scene types. A method can score 2dB higher on an indoor scene and look noticeably worse to humans, because PSNR weights all pixels equally while humans fixate on edges and regions of high detail. SSIM tracks human judgment better but still misses artifacts in specular regions. We ended up reporting both metrics alongside LPIPS for completeness, but the benchmark's real value is in revealing failure modes — scenes where a method falls apart tell you more than average scores ever could.
