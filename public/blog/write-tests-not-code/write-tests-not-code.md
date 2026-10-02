---
title: Write Tests, Not Code
date: September 11, 2026
author: Prateek Sunal
---

# Write Tests, Not Code

> "The only thing stopping cancer from becoming a solved problem is a feedback loop."
> — Prateek (when sleep-deprived)

The quote is sleep deprivation talking, but the principle holds: without a tight feedback loop, you’re just guessing. Yet writing tests has a massive PR problem. To most developers, it feels like a tax you’re forced to pay after the "real work" is done.

## Background

In one of my previous companies, we had zero tests. That meant any change we pushed had to be tested by ourselves thoroughly. Otherwise, production became the UAT environment.

Recently, I joined Bruno as an SDE II, and it completely changed my mindset around tests.

I was not the guy who preferred to write tests. Mostly because why write them, and are they even helping? When I was working in Flutter, integration tests were really scary for me, but now they feel like second nature.

## The Rise of TDD

Nowadays, when starting things fresh, I first do research around the code that is affected and what the potential bug is. Once I have clarity, I begin to write a black-box test that takes the existing setup, performs the set of actions that triggers the bug, and expects a correct output from it.

Basically, I write a failing test that I expect to pass once the fix is implemented.

This is a huge unlock because it gives a feedback loop where I can validate my work. Once it passes, I at least know that the problem I was trying to solve is done.

*(Note: I am not claiming that any garbage code fitting in the black box should be accepted. It is just that we know what we were aiming for is handled.)*

This works best with bug fixes, but with enough information, it can handle features as well.

## Solving the Right Problem Is More Important Than Solving a Problem

If you can't test it, you don’t know the problem well enough.

Many times, people don’t even know what they are solving. They get third-hand information about something, and Chinese whispers kicks in. No one really knows why it was even raised.

The best thing to do here is to be Sherlock. Find the origin of the issue or request, and understand it carefully. Try to replicate it. If that is not possible, get in touch and understand more about what they want solved.

It is not about fixing anything; it is about fixing the right problem.

## Conclusion

Just write tests. Either at the beginning or at the end of development. But write them. Not just to "write them," but to understand whether the problem you were trying to solve is solved correctly or not.
