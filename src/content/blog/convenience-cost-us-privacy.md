---
title: "Convenience Cost Us Privacy. It Could Cost Us AI Safety Too."
date: 2026-04-20
description: "We repeated the social media mistake once with privacy. We are about to repeat it with AI safety. Why verification before acting matters more than testing after the fact."
tags: ["AI Safety", "Privacy"]
dotColor: "#FF3CAC"
---

One of my deepest concerns about AI is that we are about to repeat one of the defining mistakes of the social media era.

With social media, convenience came first. Safety came later.

Platforms made sharing effortless. Posting, liking, tagging, messaging, and uploading became so frictionless that people stopped having to think carefully about where their information was going, who could access it, or how it might be used later. The privacy crisis did not happen because every user made reckless choices. It happened because the systems around them were designed to make disclosure easy and reflection hard.

But privacy was only part of the story.

Those same platforms also learned how to optimize behavior. They learned what kept people scrolling, clicking, reacting, and returning. Over time, convenience turned into dependency. Engagement became the metric, attention became the product, and the harms were understood only after the systems had already become deeply embedded in everyday life.

I worry that AI is moving along a similar path.

Language models and AI agents are becoming useful very quickly. They help us write, code, search, summarize, plan, tutor, organize, and automate. That usefulness is exactly what makes them powerful. It is also what makes them risky. When a system is helpful enough, adoption can outrun understanding. People begin to rely on it before we have verified what it is doing internally, how it reasons about the world, or how it may shape human behavior over time.

The lesson from social media is not simply "technology can be harmful." The deeper lesson is that safety cannot be treated as something we add after the system has already transformed society.

## From privacy verification to AI safety

My research background began in privacy, and that shaped how I think about AI safety. In my master's work, I built a formal verification framework for privacy-preserving information sharing. The system had three parts: a model of the world, a specification of what privacy should mean in that world, and a verifier that could check whether an action violated the specification before it happened.

At the time, I was working on privacy. Now, I see the same architecture as deeply relevant to AI safety.

A safe AI system also needs a model of the world: what it believes is happening, what actions are available, and how those actions may affect people and environments. It needs a safety specification: a formal description of what kinds of behavior are acceptable or unacceptable in a given context. And it needs a verifier: a mechanism that can check whether the system's proposed action satisfies the safety specification before the action is taken.

This is the shift I think AI safety needs: from "test after the fact" to "verify before acting."

## Why empirical testing is not enough

Today, much of AI safety relies on behavioral evaluation. We red-team models. We test them on benchmarks. We look for failures. These methods are useful, but they mostly tell us that we found a problem. They do not prove that a problem is absent.

That distinction matters.

In safety-critical systems, finding many bugs is not the same as proving that a system satisfies a safety property. We understand this in hardware, aviation, cryptography, and critical software. AI systems are increasingly being placed in roles where they make recommendations, take actions, influence decisions, and mediate access to opportunity. For these systems, empirical testing alone is not enough.

We need a verification layer for AI.

This does not mean pretending that safety can be reduced to a simple checklist. In fact, one of the hardest problems is specification: defining what "safe" means in a way that is precise enough to verify but flexible enough to handle real-world context.

## Context determines everything

My privacy research taught me that context determines everything. An information flow that is appropriate in one relationship may be inappropriate in another. Sharing health information with a doctor is different from sharing it with an employer, even if the data itself is the same. Privacy is not just about the information; it is about roles, relationships, expectations, and environment.

AI safety has the same problem.

An AI agent's action may be harmless in one deployment context and dangerous in another. A recommendation may be appropriate for one user and harmful for another. A system that appears safe on average may still fail systematically for people who are already more vulnerable.

## Safety on average is not safety

This is another lesson from privacy. In my work on privacy and fairness, I saw that protections that work "on average" can fail for minority and vulnerable populations. The burden of maintaining privacy is not evenly distributed. Some people are easier to deanonymize. Some people face higher consequences when systems fail. Some people have fewer resources to understand, challenge, or opt out of harmful systems.

The same will be true for AI safety.

If a model is safe on average but unsafe for specific demographic groups, then it has not been meaningfully verified. If an AI assistant is usable by technically fluent users but risky for users with less technical literacy, then the system's safety claims are incomplete. If guardrails work in benchmark settings but fail in the messy contexts where people actually live, then we have built the illusion of safety rather than safety itself.

## Where I want to go

This is why I am interested in formal verification of AI system behavior, especially for autonomous agents and language models. I want to understand how we can move from empirical safety testing toward provable safety guarantees. I am particularly interested in verification-based guardrails for computer-use agents, runtime compliance checking, formal specifications of alignment properties, and the relationship between learned internal representations and the world models that safety verification depends on.

My PhD work in neural rendering may seem far from AI safety at first glance, but it has shaped how I think about learned representations. Neural systems encode structure. They build internal models of the world, whether that world is visual, linguistic, social, or interactive. The safety question is not only what output a model gives. It is also what structure the model has learned, what assumptions it is making, and whether those assumptions can be inspected, constrained, or verified.

This is why the [Guaranteed Safe AI framework](https://arxiv.org/pdf/2405.06624) resonated with me so strongly. It argues for AI systems that come with explicit world models, safety specifications, and verifiers capable of producing auditable guarantees. Reading that framework made me realize that the path from privacy verification to AI safety verification is not just a metaphor. It is a technical bridge.

## We get one more chance

The social media era showed us what happens when we let convenience scale faster than accountability.

We cannot afford to do the same with AI.

AI safety should not be a retrofit. It should not be a public apology after the damage is already distributed unevenly across society. It should not depend only on discovering failures after deployment.

We need systems that can explain what assumptions their safety depends on. We need specifications that account for context. We need verification methods that check safety across populations, not just in aggregate. And we need infrastructure that makes safety-by-construction the default, not a luxury feature added after adoption.

The mistake of the social media era was not that we failed to predict every harm.

The mistake was that we built systems powerful enough to reshape human behavior before building the safety infrastructure to govern them.

AI gives us one more chance to do it differently.
