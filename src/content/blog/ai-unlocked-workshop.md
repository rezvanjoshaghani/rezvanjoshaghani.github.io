---
title: "Free GPUs, AI Reviewers, and a Coding Agent You Can Build Yourself: Notes from AI Unlocked 2026"
date: 2026-06-06
description: "A resource guide from AI Unlocked 2026: free national compute, agentic writing tools, and workflows for responsible AI use in research."
tags: ["AI", "Workshop", "Research"]
dotColor: "#00F0FF"
---

I attended AI Unlocked and came back with a list of research tools, platforms, and ideas that I honestly did not know enough about before.

This is a resource guide for my research community: the sessions I attended, who presented them, what I learned, and why I think these tools and frameworks are worth knowing about.

## TL;DR: everything in this post, in one table

| Tool / Resource | What it is | Link |
|---|---|---|
| Pegasus | Portable, fault-tolerant workflows for AI/ML experiments | [pegasus.access-ci.org](https://pegasus.access-ci.org/) |
| ACCESS allocations | Free NSF-funded compute (GPU/CPU clusters) that grad students can apply for | [allocations.access-ci.org](https://allocations.access-ci.org/) |
| National Research Platform (NRP) | Free Kubernetes-based research platform: GPUs, JupyterHub, hosted LLMs | [nrp.ai](https://nrp.ai/) |
| OpenCode | Open-source coding agent you can point at NRP's hosted LLMs | [opencode.ai](https://opencode.ai/) |
| GRAIL | Agentic research writing platform with a LaTeX editor | [grailai.io](https://grailai.io/) |
| GRAIL peer review | AI first-pass reviewer for manuscripts and proposals | [review.grail.page](https://review.grail.page/) |
| GPTZero hallucination detector | Flags unsupported claims in AI-generated text | [gptzero.me](https://gptzero.me/hallucination-detector) |
| Paper-Banana | Generates paper-style scientific figures | [paper-banana.org](https://paper-banana.org/) |
| NotebookLM | Q&A across a curated set of papers; useful for claim verification | [notebooklm.google](https://notebooklm.google/) |
| SciSpace | Paper summaries and paper-by-paper overviews | [typeset.io](https://typeset.io/) |
| Scite.ai | Checks how papers support, mention, or contrast a claim | [scite.ai](https://scite.ai/) |
| ResearchRabbit | Literature discovery through paper networks | [researchrabbit.ai](https://www.researchrabbit.ai/) |
| GenAI use log | A simple practice for documenting AI contributions to your work | [Section 4 below](#4-use-ai-without-losing-the-learning-or-your-integrity) |
| FAIR4AI | Checklist for making datasets that AI agents can actually use | [Section 6 below](#6-get-your-data-ready-for-ai-agents) |

## How to actually get access (it's free)

The most surprising thing for me was how much of this infrastructure is free for researchers, including graduate students. If you take one thing from this post, take this box.

**ACCESS (national compute allocations).** ACCESS gives you credits you can exchange for time on NSF-funded GPU and CPU clusters across the US, at no cost. Start with an **Explore ACCESS** allocation: the request needs only a short project abstract, a CV (max 3 pages), and, if you are a graduate student, a signed letter from your advisor on letterhead confirming they are aware of the request, with your advisor listed as co-PI. Grad students are explicitly eligible to be PIs on Explore allocations for dissertation work. Apply at [allocations.access-ci.org](https://allocations.access-ci.org/) (create an ACCESS ID first, then "Get Your First Project").

**NRP / Nautilus.** Log in at the [NRP portal](https://nrp.ai/) with your institutional credentials via CILogon (Google works if your institution is not listed). On first login you are a "guest"; to actually run jobs you need to be added to a **namespace** (a project group). Students typically ask their advisor or a campus namespace admin to add them; faculty and researchers can request their own namespace through NRP's Matrix support channel. Details at [nrp.ai/get-access](https://nrp.ai/get-access/).

Neither of these requires a grant. If you are a grad student who has been rationing GPU time, this is for you.

## 1. Make your experiments portable and crash-proof

*Session: "AI Workflows on National Cyberinfrastructure" by Mats Rynge and Karan Vahi*

They introduced [Pegasus](https://pegasus.access-ci.org/) workflows for AI/ML workloads. Pegasus is built around the idea that abstract workflows should be portable, generic, and platform-independent. Instead of hard-coding a workflow for one machine or cluster, you describe the jobs, inputs, outputs, and dependencies. Pegasus then maps that workflow to the infrastructure where it will run.

This is useful because many research projects start as collections of scripts that only work on one laptop, one cluster, or one specific directory structure. Pegasus helps move past the "works on my machine" problem: the same workflow description can run on a laptop, a campus cluster, or national infrastructure, and it is much easier to rerun and debug.

Pegasus also includes failure recovery mechanisms, which are especially important for long AI/ML workflows that may run for hours or days. A node can fail, a job can crash, a file transfer can break, or something can go wrong halfway through the workflow. With recovery mechanisms such as rescue DAGs (a saved record of which jobs already completed, so a failed workflow can resume from where it stopped instead of restarting) and checkpoints, the workflow does not always have to restart from scratch.

This one hit close to home. My dissertation experiments run for hours on a shared university cluster, and I have lost enough runs to node failures and walltime limits that I eventually built my own small DAG-based experiment tracker just to keep my sanity. Seeing a mature, battle-tested version of that idea, with recovery built in, made me wish I had known about Pegasus two years ago.

## 2. Free GPUs, hosted LLMs, and a place to build your own coding agent

*Session: "AI-Enabled Education and Research on the National Research Platform" by Mohammad Firas Sada and Daniel Diaz*

Another infrastructure-focused session introduced the [National Research Platform (NRP)](https://nrp.ai/). NRP is built on Kubernetes (a system for running and managing containerized software across many machines) through the Nautilus cluster, a distributed GPU cluster spanning many institutions. It supports research and education tools such as JupyterHub, GitLab, container registries, Overleaf, Nextcloud, and other collaborative services.

NRP also provides access to local LLMs and multiple models through its platform. They keep these models stable and up to date, which is useful if you want to test different LLMs for different research or teaching use cases without setting up every model yourself.

The hands-on highlight for me: we used OpenCode with one of NRP's hosted LLMs to build our own coding agent. I got to create my own agentic coding setup instead of only seeing a demo of one, and it worked well enough that I came away convinced this is a real option for researchers and students who want to experiment with coding agents but do not have access to paid tools such as Claude Code or Codex. The model quality is not frontier-level, but for scripting, refactoring, and experiment plumbing, it was genuinely usable.

The compute is only half the value here. NRP also works as a shared AI experimentation environment: common services for notebooks, model hosting, and coding agents that every researcher or lab would otherwise have to rebuild from scratch.

## 3. AI agents for writing and reviewing papers

*Session: "Augmenting the Research Lifecycle with Agentic AI: A Hands-On Tutorial for Grant and Scientific Manuscript Development" by Mayank Kejriwal and Zhisheng Tang*

They introduced several tools for agentic research workflows:

* [GRAIL](https://grailai.io/) for agentic research writing, including an [AI peer review tool](https://review.grail.page/) and an agentic LaTeX editor
* [GPTZero's hallucination detector](https://gptzero.me/hallucination-detector) for checking whether AI-generated content may contain unsupported claims
* [Paper-Banana](https://paper-banana.org/) for generating paper-style images and visual explanations

[GRAIL](https://grailai.io/) is the main tool in this group. It is designed as an agentic research writing platform rather than a general chatbot. Two parts are especially relevant for researchers: the LaTeX editor and the peer review tool.

The agentic LaTeX editor is interesting because it brings agents into a LaTeX writing environment. If you have ever wished you had an AI coding agent inside Overleaf, this is the idea. Beginners get the obvious benefit. But even if you are comfortable with LaTeX, an agent that can see the whole document, understand its structure, and edit the source directly could make the writing workflow much smoother.

The [GRAIL AI peer review tool](https://review.grail.page/) can be used as a first-pass reviewer for manuscripts or proposals. It should not replace an advisor, collaborator, or peer reviewer, but it could help flag unclear motivation, weak framing, missing context, unsupported claims, or places where the contribution is not coming through clearly. I am planning to run the next paper I draft through it before sending it to my co-authors, partly as a test and partly because every review cycle with humans is expensive. A decent first pass would be worth a lot.

[GPTZero's hallucination detector](https://gptzero.me/hallucination-detector) is useful because fluent AI-generated text can still contain unsupported claims. It is not a final authority, but it can be one checkpoint before AI-assisted writing becomes part of a paper or proposal.

[Paper-Banana](https://paper-banana.org/) is a tool for generating paper-style images and visual explanations. It feels like the research-figure cousin of the Nano Banana image-generation/editing trend, but pointed toward scientific communication. Any generated scientific figure still needs to be checked carefully for accuracy before being used.

None of these are general chatbots, and that seems deliberate. Each one sits inside a specific step of the paper pipeline: drafting in LaTeX, reviewing, fact-checking, making figures.

## 4. Use AI without losing the learning (or your integrity)

*Session: "Teaching Responsible AI Use in Graduate Research Workflows: A Framework for Transparency, Integrity, and Rigor in Proposal Development" by Jason Hans*

Jason Hans presented a structured way to use AI in graduate research while preserving learning, authorship, and academic integrity.

The framework has two practical parts:

1. Students complete the first draft or first attempt without AI assistance, then use AI as a second-pass critique tool.
2. Students document their AI use through a GenAI use log.

The first part is important because it keeps the learning process intact. If AI generates the first draft, the student may skip the struggle that helps them understand the material. In this workflow, the student first does the work themselves. Then AI is used to critique the draft, suggest improvements, identify missing pieces, or point out unclear reasoning. The student still decides what to change and revises the work with tracked changes.

AI ends up in the role of a writing coach: it points out problems, and the student decides what to do about them. It also creates a useful comparison point between what the student produced alone and what AI helped them notice afterward.

The second part is the GenAI use log. The student records which tool they used, what task they used it for, what the AI contributed, and how the work changed afterward. AI-assisted work stops being something hidden and becomes something an advisor or committee can actually review.

Hans also introduced a set of tools that can support different parts of the graduate research workflow:

* [NotebookLM](https://notebooklm.google/) for asking questions across a curated body of literature
* [SciSpace](https://typeset.io/) for paper summaries and paper-by-paper overviews
* [Scite.ai](https://scite.ai/) for citation-grounded research questions and checking how papers support, mention, or contrast with a claim
* [ResearchRabbit](https://www.researchrabbit.ai/) for literature discovery and exploring paper networks

## 5. AI for literature review: where it helps and where it lies

*Session: "Using AI for Literature Review: What Works and What Does Not" by Shibbir Ahmed*

Shibbir Ahmed focused on where AI can help in a literature review process and where it should not be trusted.

The session broke AI use for literature review into different phases. AI can be useful for paper discovery, first-pass summaries, and organizing themes across a reading list. These are the parts where speed matters and where AI can help map the space more quickly.

The risk starts when AI is treated as a substitute for reading. AI summaries can skip important details, blur differences between methods, hide disagreements between papers, or fabricate citations. A literature review lives or dies on careful comparison: what each paper actually did, what assumptions it made, what dataset or method it used, and how it differs from the others. A list of papers that sound related does not get you there. I have been burned by this myself. An AI summary once collapsed two papers with genuinely different evaluation protocols into "similar approaches," and I only caught it because I went back to the originals. The summary was fluent. It was also wrong in exactly the way that matters for related work.

One useful framing from the session was comparing different prompting approaches for the same literature review task. A zero-shot prompt can produce a generic overview. A one-shot prompt can improve the structure by giving the model an example to follow. A more guided prompt can ask the model to identify contributions, group related work into themes, compare papers, and explain how the target paper differs. The strongest workflow adds verification: after AI drafts or organizes the review, each citation and claim is checked against the original paper.

A practical literature review workflow could look like this:

1. Use AI to discover relevant papers and map the topic.
2. Use AI to create first-pass summaries or group papers by theme.
3. Ask AI for explicit contrasts between papers, not just descriptions.
4. Read the original papers before citing them.
5. Verify every claim, citation, and comparison against the source text.

AI handles mapping and organization. Interpretation, citation, and final judgment stay with the researcher.

One useful connection across sessions is that tools like [NotebookLM](https://notebooklm.google/) can make the verification step easier. For example, after uploading the papers in your citation set, you can ask NotebookLM to help find where a specific claim appears in the source text. That does not replace reading the paper, but it can make source-checking and claim verification faster.

## 6. Get your data ready for AI agents

*Session: "From FAIR to FAIR4AI: Open Science and Data Readiness for AI in Research" by Eric Sokol, Christine Laney, and John Quinn*

This session focused on how open science practices need to evolve for AI-enabled research.

The original FAIR principles focus on making data findable, accessible, interoperable, and reusable. FAIR4AI extends that idea with a follow-up question: can an AI system actually use this data, or does it take a human to make sense of it?

This matters because AI changes how researchers interact with data. If datasets are only available as files that humans have to manually download, inspect, clean, and interpret, then AI agents cannot reliably use them. For data to be useful in AI-enabled workflows, the metadata needs to be machine-readable, the context around data points needs to be extractable, formats need to be standardized, and ontologies or schemas (the formal vocabularies that define what each field in a dataset means) need to be queryable.

"AI-ready" sets a higher bar than "available online." It means an automated system can discover the data, understand it, evaluate whether it fits a specific task, and use it with minimal human intervention.

This also connects to access. Making data FAIR4AI democratizes two things at once: the data itself, and the expertise needed to work with it. If AI agents can help search, interpret, query, and reason over well-documented datasets, then more researchers can work with complex data resources without needing to already know every file format, API, or domain-specific convention.

The FAIR4AI checklist is useful because it turns this idea into something more practical. Instead of treating "AI-ready" as a vague label, a checklist can help dataset creators and researchers evaluate whether the data has the metadata, structure, context, and interfaces needed for AI-enabled use. I have started experimenting with building a small agent that evaluates datasets against AI-readiness criteria. From what I have tested so far, when a dataset has well-structured, machine-readable metadata, even weaker models can work with it effectively, and you do not need a frontier model to get useful results.

As more research workflows include AI agents, data readiness becomes part of research infrastructure. Model capability gets most of the attention, but whether the data we produce is structured well enough for both humans and AI systems to use responsibly matters at least as much.

## My overall takeaway

I went into AI Unlocked expecting a list of tools. I came out thinking about workflows. In my own work on neural 3D reconstruction, getting one good result is the easy part. The hard part is everything around it: rerunning experiments, recovering from failures, comparing outputs, documenting the process, and explaining the results clearly.

AI Unlocked introduced a lot of resources I did not know about before, and it changed how I think about using them. Nobody needs AI in every step of their research. What helps is matching a specific tool to the specific part of the workflow where it earns its place.

Before I ask "what AI tool should I use," I now ask:

- What part of the research workflow am I trying to improve?
- What should I do myself first?
- Where can AI help me see what I missed?
- How do I verify the output?
- How do I document what AI contributed?
- How do I make the work reproducible?

That is the kind of AI use I want to practice and share.