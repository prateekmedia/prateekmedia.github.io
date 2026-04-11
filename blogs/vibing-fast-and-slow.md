# Vibing Fast and Slow

Over the last year, I’ve been trying to understand this shift in software development where developers have started becoming vibe coders, and vibe coders have started, well… doing nothing.

The shift feels drastic. AI can now generate so much code, so quickly, that it creates a weird kind of confusion: if code can be written this fast, where exactly does engineering begin? Where does judgment begin? Where do you begin?

That question has been stuck in my head for a while.

So instead of treating AI coding as either magic or doom, I’ve been trying to build a system for using it without losing control of the process or my mind. This post is that system.

It has two parts:
- the Fast vibe
- the Slow vibe

The Fast vibe is about speed, momentum, and getting to a working proof of concept quickly.

The Slow vibe is about understanding what was built, taking control back, and turning a rough prototype into something you can actually trust.

Because yes, the agent can write code.

But no, that is not the same thing as engineering.

# Step 1: The Fast vibe

Whenever you meet a stranger, you judge them first by appearance, tone, and first impression. You do not know them yet, but you still run a vibe check. Based on that, you decide whether to know them better, keep some distance, or ignore them for the rest of your life.

That is what the Fast vibe is.

You let the agent move fast in one direction, maybe multiple directions, and then you judge the output based on one thing: did it move the problem forward or not?

This is not the phase where you obsess over clean code, architecture, naming, or whether some helper should live in `utils/` or `services/` or `core/` or whatever folder people are fighting over this week.

This phase is about getting signal.

## Step 1.1: Breaking the ice
Before letting the agent loose, you need to give it context.

If you are working in an existing codebase, bring in the knowledge you already have. If you do not know the codebase well enough, gather context first, otherwise the whole thing can go nowhere very fast.

Then give the agent what it needs:
- the problem
- examples
- references
- places to look

Do not make it start from a blank state and then act surprised when it writes nonsense.

## Step 1.2: Let it loose
Now let it work.

And yes, I really mean loose.

At this stage, at least one agent should just be allowed to run with the problem. You are not micromanaging every step. You are not interrupting every move. You are not obsessing over every line.

Because that is not what you are optimizing for yet.

You are optimizing for: can this thing produce a working prototype, a useful direction, or at least a meaningful signal?

## Step 1.3: Feel the motion
Now the agent has produced something, maybe one solution or several.

This is where the vibe check actually happens.

You do not yet care deeply about how it built the thing. First, you care about whether it solved the task, or got meaningfully close to solving it.

So test it.

Run it. Click through it. Break it. Push it a little. See if it behaves like something that deserves more attention.

This is different from regular coding, where you try to write good code and then test it.

Here, the goal is simpler: get to a level of confidence that the agent has generated a working prototype, or at least something close enough to one.

If it did, great. The Fast vibe did its job.

If it did not, do not get emotionally attached to the mess. Read enough of the code to understand what went wrong, extract the fresh learnings, scrap it, and run again.

That is an important part of this system:  the point of the Fast vibe is not to rescue bad generations. It is to get signal quickly.

## Step 1.4: The vibe ends here
Ideally, by now, you have something that appears to work. It may not be clean. It may not be elegant. It may not even be remotely production-ready. But it is going in the right direction.

That is enough.

The vibe check ends here.

At this point, you are no longer treating the output like a stranger you just met. You have seen enough to know whether it is worth taking a look at.

And that matters, because this is where LLMs are genuinely strong: they can generate code absurdly fast. Faster than you think, faster than you would by hand, and often fast enough to turn vague ideas into an actual POC before your overthinking kicks in.

That is the value of the Fast vibe.

# Step 2: The Slow vibe

Now let’s assume you have something that works.

This is exactly where a lot of people stop thinking.

This is also where a lot of bad software begins.

Because the reality is: the code you have right now may be working, but it is still often at the same level of confidence as code a non-technical person can generate by repeatedly pressing “Yes, run these commands” without checking whether the command is useful, dangerous, or `rm -rf /`.

The Fast vibe got you a prototype.

The Slow vibe is where engineering starts.

This is where you use the thing called a BRAIN.

I was once asked by a non-technical person: if AI can write code, then why do we still need engineers?

This section is the answer.

## Step 2.1: The infinite why’s
Now that you have this rough, working piece of code, your next job is to understand it.

- Why did it choose this approach?
- Why did it structure the code this way?
- Why this abstraction?
- Why this library?
- Why this flow?
- Why this logic?
- Why this tradeoff?
- Why ...

One of my colleagues at my last job literally wrote code down in a notebook just to force himself to understand what was happening. I am not saying you need to go that far, but the spirit of it is correct.

You need to know what the agent saw, what assumptions it made, why it moved in the direction it did, and where it went wrong.

Because it did go wrong somewhere. It always does. Maybe not disastrously, maybe not obviously, but there will be mistakes, over-engineering, weird shortcuts, hidden assumptions, and choices that looked smart only because they were generated quickly.

This is where you stop being impressed by output and start interrogating it.

## Step 2.2: The human in the loop

By this point, you know the stranger better.

Maybe you trust it a bit more. Maybe much less.

But one thing should now be obvious: the code was always meant to be scrappy. It was written fast. It was written to explore. It was written to test the idea, not to earn your trust.

And this is exactly why not every AI-generated PR deserves to be merged just because it compiles and appears to work.

If all someone is doing is asking an agent to write code and then forwarding that code to the codebase without truly reviewing it, they are not engineering. They are relaying output.

That is why code review matters. That is why judgment matters. That is why you are still getting paid and not getting replaced by AI.

THIS IS THE AGI.

Not the part where it writes code.

The part where you can look at generated code, understand what is wrong, understand what is useful, and decide what deserves to survive.

## Step 2.3: AGI is !HERE

Now comes the real work.

You have seen the prototype. You have learned from it. You know what direction seems valid. You know what mistakes were made.

This is the moment to design the architecture for the actual solution.

This is where you use what you learned from the Fast vibe and think properly about integration, boundaries, modules, tradeoffs, and long-term maintenance.

How would you have approached the code of the problem, after knowing the solution?

That is the question now.

And yes, you can still use the agent for help here. But the important difference is this:

the agent is no longer deciding the direction.

You are.

Also, this is where breaking the design into smaller modules becomes extremely important. Large vague tasks make agents drift. Smaller scoped pieces make them useful.

## Step 2.4: Taking help from the stranger

Now bring the agent back.

But this time, it is not leading. It is assisting.

That changes everything.

You now know:
- what problem you are solving
- what direction makes sense
- what mistakes the first pass made
- what structure the solution should follow

So instead of asking the agent to “solve the whole thing,” you ask it to implement your design.

This is where it starts behaving less like a random force of nature and more like a useful tool.

Because the problem in the Fast vibe was never that the agent could not write code.

The problem was that it did not know the direction to go.

Now it does.

Now you can tell it:  take this value, do this, do that.

And that is where it shines.

## Step 2.5: Testing and reiterating
At this point, the code should be in much better shape.

Now test it properly.

Write the unit tests. Write the integration tests. Validate the edge cases. Check whether the thing fails gracefully or explodes dramatically.

If something breaks, ask:
- was this already broken in the POC?
- did I miss this in the design?
- is this a flaw in implementation, or a flaw in understanding?

If the issue existed in the POC too, sometimes the right move is to go back, adjust the prototype, extract the new learning, and then bring that back into the Slow vibe implementation.

This may take multiple iterations.

That is fine.

The goal here is not just “working code.” The goal is code you can trust, so that you can improve, maintain and scale it.

That is the difference.

# Conclusion
This is the system I have been settling into after talking to a lot of engineers who are using AI, knowingly or unknowingly, in some version of this exact way.

The Fast vibe is for discovery.

The Slow vibe is for control.

The Fast vibe gets you to a prototype quickly. The Slow vibe turns that prototype into engineering.

And I think that distinction matters more and more now.

Because AI is very good at generating code fast. But speed is not judgment.

So yes, let the agent move fast. Let it surprise you. Let it give you a POC in minutes.

But after that, take control back.
