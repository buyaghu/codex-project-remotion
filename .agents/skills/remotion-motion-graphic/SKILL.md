---
name: remotion-motion-graphic
description: Create and revise Indonesian 2D motion graphic explainers with Remotion, original cartoon characters, researched scripts, narration, highlighted captions, and verified MP4 delivery through GitHub Actions.
---

# Remotion motion graphic

Use for requests to create, adapt, or revise explainer motion graphics in this repository.

## Default creative direction
- Indonesian narration, vertical 1080×1920 at 30 fps; duration follows the story and voice.
- Original simple 2D characters with expressive eyes, blinks, mouth shapes, and hand gestures.
- Full-scene illustrated environments, animated props, restrained camera motion and transitions.
- Warm cream, teal, green and gold palette; readable titles; green highlighting on active subtitle words.
- Quiet original instrumental bed under speech.
- Treat the provided cartoon explainer as a style reference; create original characters and audio.
- User requests override these defaults. Do not require reconfirmation of routine reversible choices.

## Workflow
1. Read README.md, story.json, voice.json, src/Film.tsx, src/Root.tsx, scripts/prepare.py and the render workflow. Read repository AGENTS.md instructions.
2. Research historical claims with primary sources. Separate commemorative anniversaries, administrative formation and naming dates. Keep sources and editorial limitations in story.json and README.
3. Write a concise Indonesian script with an engaging opening and clear chronological scenes. Mark illustrations as illustrations; do not present invented likenesses, buildings or maps as archival evidence.
4. Generate fresh narration through an available authorized speech tool. Use a discovered voice ID, never invent one. Avoid exposing credentials or storing private access material in source. Prefer durable audio assets over temporary media links.
5. For a new script, replace public/narration.mp3 with matching new audio or remove the old file before prepare.py. The current preparation script reuses existing audio; changing voice.json alone will not replace it.
6. Run prepare.py to normalize audio, derive spoken timestamps, align approved wording, create chapter timing, SRT and the original music bed. Keep approved spellings; review interpolated number/name timings. Low alignment coverage is a review signal even above the script's minimum threshold.
7. Build scenes in Remotion with useCurrentFrame, interpolate, spring and Sequence. Keep animation deterministic. src/Root.tsx reads generated src/timing.json for composition duration.
8. Run TypeScript checking, generate preview frames, render MP4 and verify resolution, duration and an audio stream. Inspect actual preview images; do not claim to have watched/listened to the full video unless actually done.
9. If workspace npm access fails, diagnose the connection accurately. Use the connected GitHub tools and Actions runner when available; do not claim the local npm issue was fixed by a successful remote render.
10. Push authorized changes with an expected-head lease, preserving existing files and generated media. When creating a tree, use the current base tree; do not replace the repository with a connection-test tree or a stale local snapshot.
11. Monitor Actions until success, fixing concrete failures. The runner needs FFmpeg, Node, Python, faster-whisper and a Remotion browser. Check the actual failing step before retrying.
12. Deliver a direct MP4 download link from renders/ when available, plus duration and a short description. Verify current artifact IDs before linking; reruns can replace them. Never claim rendering succeeded solely because a workflow was queued.

## Repository files
- story.json: approved narration, chapter labels, research sources, editorial notes.
- src/Film.tsx: reusable illustrated scenes and guide.
- src/timing.json: word timestamps, scenes and duration generated from speech.
- public/narration.mp3 and public/music.wav: reusable audio.
- scripts/prepare.py: media preparation and alignment.
- scripts/previews.mjs: four representative frame renders.
- .github/workflows/render.yml: remote verification, rendering and delivery.
- renders/: delivered MP4, preview images, SRT and metadata.

## Current historical project
Bandar Lampung: 17 June 1682 is the designated anniversary, grounded in the Telukbetung historical account. PP 24/1983 changed the name Tanjungkarang–Telukbetung to Bandar Lampung, effective 17 June 1983. Do not describe 1983 as a verified merger date. See the primary-source links in story.json.

## Scope
This is a repository skill, not a globally installed ChatGPT plugin. Future sessions must open this repository or read this skill explicitly. Do not imply automatic availability in every new chat.
