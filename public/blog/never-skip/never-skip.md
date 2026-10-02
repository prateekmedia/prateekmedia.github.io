---
title: Never Skip: How to Farm in a Brownfield Site
date: August 23, 2026
author: Prateek Sunal
---

"It's a one-line change."

That sentence has taken down more production systems than any exploit, and the maddening part is that it is usually true. It really is one line. `x = 5` becomes `x = 6`. You read the function, the function is fine, the pipeline is green.

But one line is never one line. Something reads `x`. Something else reads the thing that read `x`. Three hops out, a job you have never opened divides by it at 4 AM on a Sunday, and nobody connects that page to your commit until you have shipped four more things on top of it.

You are not working empty land. You are farming a brownfield site, and the job is the five checks around the change: what to write down before you code, what to trace before you edit, what to dig up before you delete, what to verify before you commit, and who has to agree before you merge.

## Before You Execute the Prisoner

Three questions, answered in plain sentences, before any code exists:

**What are we actually solving?** Not the one-line request you were handed. The underlying problem, in the words a user would use.

**How are we planning to solve it?** Start to finish, with no gaps. If any step still rests on the word "somehow", that step is not an approach yet.

**What does done look like?** What changes for whom, and how would someone else verify it without asking you.

If those three sentences won't come out cleanly, that's not writer's block. That's the design not being finished, and every hour you spend building past that point is an hour you'll spend again.

But clarity about the destination tells you nothing about the road. The first approach that comes to mind is the one that comes to everyone's mind, which is not the same thing as the one that works.

So you build the ugliest thing that will answer one question: does this direction survive contact with the real system? Cheap proof first, polish after the proof.

Sometimes that rough version compiles, runs, does the thing, but still feels wrong. That feeling is data. It's usually your pattern-matching noticing a cost you haven't articulated yet. There is always another approach. Shifting on day two is free. Shifting on day nine, after the tests and the docs and the review comments, is not.

And when two approaches genuinely look equal, don't flip a coin. Do both things: consult someone who has been burned in that part of the codebase, then measure the impact and write the numbers down. A decision with a benchmark attached survives review. A decision with a vibe attached gets reopened every time somebody new looks at it.

## Blast from a Blast (Terrorism in Code)

Approach settled, you finally touch the code. Which is when that one-character change comes due, because now you have to know precisely what it disturbs.

Checking blast radius properly means checking it recursively. Not "who calls this function," but who calls the caller, and who depends on what that one returns.

Think about how anyone traces a virus outbreak. You don't stop at the person who fell ill. You ask who they sat with, then who those people sat with, then which room they shared, then who used that room after them. Every name hands you more names. You keep expanding until the edges stop touching anyone who matters, and only then do you know how far it went.

It runs the same way through code. You changed a constant, so you find its readers. One of those readers writes a cached value, so now you follow the cache. Something invalidates that cache on deploy, so now you're reading a deploy script you didn't know existed. That's four hops out from a one-character diff, and the fourth hop is the one that pages you.

Most incidents aren't caused by hard code. They're caused by someone stopping one hop early, at the point where the answers stopped being interesting.

## Blast from the Past (Regression in Code)

Every codebase is a crater field. That strange conditional nobody can explain, the retry with the oddly specific timeout, the comment reading `do not remove`, the function that sorts a list which is already sorted: none of those were written by an idiot. Each one is a scar, and the incident that caused it happened to someone who was as confident as you are right now.

So before you delete a fence, find out what it was keeping out. `git blame` the line, read the commit message, follow whatever it links to, find out what was on fire that week. Ten minutes of digging tells you whether you're removing dead weight or removing somebody's fix.

And it decides what you test. Regression is a question about behaviour, not about bugs. Every change moves something, and the only acceptable outcome is that nothing moved except what you meant to. Your fix gets to change what you set out to change. Everything else has to be exactly where you found it.

So write the tests before you touch anything. Take the behaviour that exists today across that radius, what touches `x`, what touches those, the code standing beside it you never meant to disturb, and pin it down in tests that describe what the system actually does rather than what you believe it should do.

Then run them against the unchanged code. They have to pass first. A test that fails before you have changed anything is describing your assumptions, not the system. Once they are green, make the change and run them again, and whatever flips is a behaviour that moved.

The forward trace tells you what your change will reach. The backward one tells you what will notice.

## Assumption Is Injurious to Health

All of that digging is worth nothing if you decide to guess at the last step. The most expensive bugs don't come from bad code. They come from confident, incorrect understanding of good code.

"I think this is only called from the API layer." "I'm fairly sure this is idempotent." "This should be safe because nothing else writes here." Each of those is a guess wearing the costume of a fact, and production has never once cared how sure you were.

So every claim you make about the system needs evidence behind it. Especially the claims you make to yourself. Grep it. Trace it. Read the caller. Put a log line in and watch it fire. It costs you minutes now, and hand-wavy today is an apology in a postmortem later.

Once you're that deep in, though, you'll find ten other things that are wrong. The urge to fix them all is genuinely well-intentioned, which is exactly what makes it dangerous.

Which is why the right diff is the smallest one that does the job. Read your own change back and take out everything that isn't load-bearing: the line you rewrote because you preferred it that way, the comment repeating the code beneath it, the tidy-up nobody asked for. And when a fix genuinely drifts from what was asked, open a separate PR. Scope creep isn't generosity, it's a bigger blast radius nobody signed off on.

## See You in Court

Assume you will have to prove all of this to somebody who wasn't there.

Start with the diff itself. Before you send it anywhere, run a code review or blindspot pass over the change. Not the feature, the diff. Read it as a stranger who has to approve it and who will be paged when it breaks.

A clean diff is still not a working system, though, and neither is a green pipeline.

So run the actual build and click the actual thing. An agent's red-team pass is a genuinely good second opinion and a terrible only opinion. For the edges, go looking on purpose: the empty list, the double click, the 10,000-row payload, the request that arrives twice.

Every check so far has happened inside your own head.

So record a short demo of the final behaviour and get confirmation from the people who asked for it, *before* the merge rather than after. Thirty seconds of screen recording resolves arguments that three days of messages cannot.

And write whatever changed in scope into your single source of truth, wherever your team keeps it, so nobody downstream is left reverse-engineering your intent from a diff.

---

None of this is process for its own sake. Every check on this list exists because somebody skipped it and somebody else paid for it. The strange code you are working around was left by people who thought they were only changing one line.

Never skip.
