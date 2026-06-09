---
title: "Notes from AI Unlocked 2026"
date: 2026-06-06
description: "A collection of tools, resources, and workflow ideas I learned about at AI Unlocked 2026."
tags: ["AI", "Workshop", "Research"]
dotColor: "#00F0FF"
---


# Things I Learned at AI Unlocked That I Wish More Researchers Knew About

I attended AI Unlocked and came back with a list of research tools, platforms, and ideas that I honestly did not know enough about before.

This post is not meant to be a formal conference report. It is more of a resource guide for my research community: here are the sessions I attended, who presented them, what I learned, and why I think these tools and frameworks are worth knowing about.

## 1. Research infrastructure I wish more researchers knew about

### AI Workflows on National Cyberinfrastructure

**Presenters:** Mats Rynge and Karan Vahi

They introduced [Pegasus](https://pegasus.access-ci.org/) workflows for AI/ML workloads. Pegasus is built around the idea that abstract workflows should be portable, generic, and platform-independent. Instead of hard-coding a workflow for one machine or cluster, you describe the jobs, inputs, outputs, and dependencies. Pegasus then maps that workflow to the infrastructure where it will run.

This is useful because many research projects start as collections of scripts that only work on one laptop, one cluster, or one specific directory structure. Pegasus helps move beyond the “works on my machine” problem by making workflows more portable, reproducible, and easier to debug.

Pegasus also includes failure recovery mechanisms, which are especially important for long AI/ML workflows that may run for hours or days. A node can fail, a job can crash, a file transfer can break, or something can go wrong halfway through the workflow. With recovery mechanisms such as rescue DAGs and checkpoints, the workflow does not always have to restart from scratch. It can recover from the point of failure and continue more safely.

This is especially useful when experiments are long, expensive, or running on shared cyberinfrastructure. In those cases, recoverability is not just convenient. It becomes part of making the research workflow reliable and practical.


### AI-Enabled Education and Research on the National Research Platform

**Presenters:** Mohammad Firas Sada and Daniel Diaz

Another infrastructure-focused session introduced the [National Research Platform (NRP)](https://nrp.ai/). NRP is built around Kubernetes through the Nautilus cluster. It supports research and education tools such as JupyterHub, GitLab, container registries, Overleaf, Nextcloud, and other collaborative services.

NRP also provides access to local LLMs and multiple models through its platform. They keep these models stable and up to date, which is useful if you want to test different LLMs for different research or teaching use cases without setting up every model yourself.

One useful example from the session was using OpenCode with one of NRP’s hosted LLMs to build our own coding agent. That was one of the coolest hands-on parts because I got to create my own agentic coding setup instead of only seeing a demo of one. This is especially helpful for researchers and students who want to experiment with coding agents but do not have access to paid enterprise tools such as Claude Code or Codex.

This makes NRP useful not only as a compute resource, but also as a shared AI experimentation environment. Instead of every researcher or lab rebuilding the same infrastructure from scratch, platforms like NRP can provide common services for running notebooks, hosting tools, testing models, building coding agents, and supporting collaborative research workflows.



## 2. Agentic tools for research writing and review

### Augmenting the Research Lifecycle with Agentic AI: A Hands-On Tutorial for Grant and Scientific Manuscript Development

**Presenters:** Mayank Kejriwal and Zhisheng Tang

They introduced several tools for agentic research workflows:

* [GRAIL](https://grailai.io/) for agentic research writing, including an [AI peer review tool](https://review.grail.page/) and an [agentic LaTeX editor](https://grailai.io/)
* [GPTZero’s hallucination detector](https://gptzero.me/hallucination-detector) for checking whether AI-generated content may contain unsupported claims
* [Paper-Banana](https://paper-banana.org/) for generating paper-style images and visual explanations

[GRAIL](https://grailai.io/) is the main tool in this group. It is designed as an agentic research writing platform rather than a general chatbot. Two parts are especially relevant for researchers: the LaTeX editor and the peer review tool.

The agentic LaTeX editor is interesting because it brings agents into a LaTeX writing environment. If you have ever wished you had an AI coding agent inside Overleaf, this is the idea. The useful part is not only making LaTeX easier for beginners. Even if you are comfortable with LaTeX, having an agent that can access the whole document, understand the structure, and help edit or modify the source directly could make the writing workflow much smoother.

The [GRAIL AI peer review tool](https://review.grail.page/) can be used as a first-pass reviewer for manuscripts or proposals. It should not replace an advisor, collaborator, or peer reviewer, but it could help flag unclear motivation, weak framing, missing context, unsupported claims, or places where the contribution is not coming through clearly.

[GPTZero’s hallucination detector](https://gptzero.me/hallucination-detector) is useful because fluent AI-generated text can still contain unsupported claims. It is not a final authority, but it can be one checkpoint before AI-assisted writing becomes part of a paper or proposal.

[Paper-Banana](https://paper-banana.org/) is a tool for generating paper-style images and visual explanations. It feels like the research-figure cousin of the Nano Banana image-generation/editing trend, but pointed toward scientific communication. Any generated scientific figure still needs to be checked carefully for accuracy before being used.

The common thread across these tools is that they are moving closer to specific research tasks: writing in LaTeX, reviewing drafts, checking for hallucinations, and creating paper figures.


## 3. Responsible AI use in graduate research workflows

### Teaching Responsible AI Use in Graduate Research Workflows: A Framework for Transparency, Integrity, and Rigor in Proposal Development

**Presenter:** Jason Hans

Jason Hans presented a structured way to use AI in graduate research while preserving learning, authorship, and academic integrity.

The framework has two practical parts:

1. Students complete the first draft or first attempt without AI assistance, then use AI as a second-pass critique tool.
2. Students document their AI use through a GenAI use log.

The first part is important because it keeps the learning process intact. If AI generates the first draft, the student may skip the struggle that helps them understand the material. In this workflow, the student first does the work themselves. Then AI is used to critique the draft, suggest improvements, identify missing pieces, or point out unclear reasoning. The student still decides what to change and revises the work with tracked changes.

This makes AI function more like a tutor, reviewer, or writing coach instead of a replacement writer. It also creates a useful comparison point: what did the student produce on their own, and what did AI help them notice afterward?

The second part is the GenAI use log. Instead of treating AI use as hidden, vague, or informal, the student documents which tool they used, what task they used it for, what the AI contributed, and how the work changed afterward. This makes AI-assisted work visible, traceable, and reviewable.

Hans also introduced a set of tools that can support different parts of the graduate research workflow:

* [NotebookLM](https://notebooklm.google/) for asking questions across a curated body of literature
* [SciSpace](https://typeset.io/) for paper summaries and paper-by-paper overviews
* [Scite.ai](https://scite.ai/) for citation-grounded research questions and checking how papers support, mention, or contrast with a claim
* [ResearchRabbit](https://www.researchrabbit.ai/) for literature discovery and exploring paper networks

## 4. AI tools for literature review

### Using AI for Literature Review: What Works and What Does Not

**Presenter:** Shibbir Ahmed

Shibbir Ahmed focused on where AI can help in a literature review process and where it should not be trusted.

The session broke AI use for literature review into different phases. AI can be useful for paper discovery, first-pass summaries, and organizing themes across a reading list. These are the parts where speed matters and where AI can help map the space more quickly.

The risk starts when AI is treated as a substitute for reading. AI summaries can skip important details, blur differences between methods, hide disagreements between papers, or fabricate citations. A literature review is not just a list of papers that sound related. It needs careful comparison: what each paper actually did, what assumptions it made, what dataset or method it used, and how it differs from the others.

One useful framing from the session was comparing different prompting approaches for the same literature review task. A zero-shot prompt can produce a generic overview. A one-shot prompt can improve the structure by giving the model an example to follow. A more guided prompt can ask the model to identify contributions, group related work into themes, compare papers, and explain how the target paper differs. The strongest workflow adds verification: after AI drafts or organizes the review, each citation and claim is checked against the original paper.

A practical literature review workflow could look like this:

1. Use AI to discover relevant papers and map the topic.
2. Use AI to create first-pass summaries or group papers by theme.
3. Ask AI for explicit contrasts between papers, not just descriptions.
4. Read the original papers before citing them.
5. Verify every claim, citation, and comparison against the source text.

This puts AI in the mapping and organization role, while keeping interpretation, citation, and final judgment with the researcher. 

One useful connection across sessions is that tools like [NotebookLM](https://notebooklm.google/) can make the verification step easier. For example, after uploading the papers in your citation set, you can ask NotebookLM to help find where a specific claim appears in the source text. That does not replace reading the paper, but it can make source-checking and claim verification faster.


## 5. AI-ready data and open science

### From FAIR to FAIR4AI: Open Science and Data Readiness for AI in Research

**Presenters:** Eric Sokol, Christine Laney, and John Quinn

This session focused on how open science practices need to evolve for AI-enabled research.

The original FAIR principles focus on making data findable, accessible, interoperable, and reusable. FAIR4AI extends that idea by asking what it means for data to be usable by AI systems, not only by humans.

This matters because AI changes how researchers interact with data. If datasets are only available as files that humans have to manually download, inspect, clean, and interpret, then AI agents cannot reliably use them. For data to be useful in AI-enabled workflows, the metadata needs to be machine-readable, the context around data points needs to be extractable, formats need to be standardized, and ontologies or schemas need to be queryable.

In that sense, AI-ready data is not just “data that exists online.” It is data that an automated system can discover, understand, evaluate for a specific task, and use with minimal human intervention.

This also connects to access. Making data FAIR4AI can democratize not only access to the data itself, but also access to the ways researchers use that data. If AI agents can help search, interpret, query, and reason over well-documented datasets, then more researchers can work with complex data resources without needing to already know every file format, API, or domain-specific convention.

The FAIR4AI checklist is useful because it turns this idea into something more practical. Instead of treating “AI-ready” as a vague label, a checklist can help dataset creators and researchers evaluate whether the data has the metadata, structure, context, and interfaces needed for AI-enabled use.

As more research workflows include AI agents, data readiness becomes part of research infrastructure. The bottleneck is not only whether models are powerful enough. It is also whether the data we produce is structured well enough for both humans and AI systems to use responsibly.


## My overall takeaway

The biggest shift for me was seeing AI for research less as a collection of separate tools and more as a workflow question. In my own work on neural 3D reconstruction, the hard part is often not just getting one result. It is running experiments repeatedly, recovering from failures, comparing outputs, documenting the process, and explaining the results clearly.

AI Unlocked introduced a lot of resources I did not know about before, but it also changed how I think about using them. The goal is not to add AI everywhere. The goal is to use the right tools in the right parts of the research workflow.


The question is not only, “What AI tool should I use?”

The better questions are:

- What part of the research workflow am I trying to improve?
- What should I do myself first?
- Where can AI help me see what I missed?
- How do I verify the output?
- How do I document what AI contributed?
- How do I make the work reproducible?

That is the kind of AI use I want to practice and share.
