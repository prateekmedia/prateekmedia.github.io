---
title: How I Won My First Hackathon at Ente ft. Ensu
date: October 1, 2026
author: Prateek Sunal
summary: Ensu hackathon, launch, and traction
---

# How I Won My First Hackathon at Ente ft. Ensu

In December last year, Ente hosted an internal hackathon where the idea was to build something cool in one day and publish it the same day. Whichever project topped the criteria would win the prize of ₹50,000 on 01/01/2026.

## Criteria – Wins

The criteria was simple: the website with the most views wins.

I analysed top viral websites and hackathon projects, and these things felt common across all the ideas:
- Simple -> Shouldn't be complex
- Sounds Fun -> When people hear about it, they should feel it's something fun
- Easy to Try -> The time from opening the website to actually doing what it was made for should be minimal
- Company Related -> An idea that is company-related is highly likely to win since it resonates well
- Self-sustaining -> Should have almost zero maintenance

## Choosing My Battle

I knew that my top priority would be something local and encrypted that respects privacy. The reason behind choosing a company-related topic was that if we launch it, it shouldn't feel like just a hackathon project, but more like a product from the company. I had seen this with an xAI hackathon where someone built seamless ads inside a real movie using AI; it felt to me like xAI had launched it until I read that it was from a hackathon winner.

I actually wanted to build a lot of other things, like an Ente Desktop MCP that lets you control the Ente Photos app (say, to filter photos better and find specific images since it can read them). But due to limited time, I dropped the idea.

Another idea was to build an open-source Google Lens so you could reverse image search or look up a person and get all their info. But because it wasn't "self-sustaining" and could easily drift into stalking territory, I decided to drop that too.

I had used local LLMs before and knew their potential. I had also seen crazy demos using WebGPU + Local LLMs and realised that running an LLM doesn't require a desktop app because a browser is enough. This was important since I wanted something easy to try, and a desktop app would feel too heavy.

Finally, I decided on a local LLM app that lives in the browser. It was a perfect match for my winning criteria.

## D-Day

On the day of the hackathon, everyone had to build their project within 12 hours. It was mostly vibed; it couldn't have been built perfectly in that time, so leaning into the vibe was expected.

I made sure it looked good. I might not be the best at creating a perfect design if you just hand me a blank Figma canvas, but show me enough options and I can judge what to choose. So I did just that: generated multiple prototypes and chose the best one I liked.

The backend of it was also relatively simple. Since I wanted to ensure it worked smoothly on the web, I looked at the best WebGPU LLM tech, and MLC WebLLM offered the best performance. So I used that to fetch and run the LLM models.

I settled on Qwen2.5-1.5B-Instruct-q4f16_1-MLC, as it was predictable and gave good enough responses.

## Naming It

The first two letters were easy because they came from Ente itself. The last two letters meant two things: first, my surname initials, and second (and more importantly): Superuser.

ENSU = Ente + Superuser

You are the superuser: ask anything, and Ensu will give you a response.

Rejected idea: Drake (because a male duck is called a drake, so good thing it was rejected).

## Promoting It

The initial channels were mostly where all the other hackathon projects were getting promoted: PrivacyGuides and our Discord community channel. But I wanted to do something different.

I wanted to create a video that could get posted by the official account. That was the main reason I built something company-related: if we announced it anywhere, it would feel like an official Ente announcement rather than a random side project.

I created a very simple video with some sound effects and text animation at the end. I wanted to do it on the day of the hackathon itself, but because Loom and other screen-recording tools were paid and not open-source, I had to delay it until I found good software.

[https://x.com/enteio/status/2004547733395554458](https://x.com/enteio/status/2004547733395554458)

It got posted on 26 Dec, and the rest is history. It ended up in the top 3 most-liked posts of December from the Ente account, with 112 likes.

## 01/01/2026

The results were announced, and my website had 3x the visits of the 2nd-ranked hackathon project. In fact, my project almost got more views than the cumulative views of all the other projects combined. It wasn't a crazy astronomical number of views, but relatively speaking, I won.

After that, I kept working on Ensu and made it available across platforms: native apps for Android and iOS, plus a Tauri app for desktop. Now it is an official product by Ente. Read more here:

[https://ente.com/blog/ensu/](https://ente.com/blog/ensu/?utm_source=prateek)

P.S. I still haven't thrown a party for winning :(
