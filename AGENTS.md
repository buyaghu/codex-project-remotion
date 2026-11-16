# Project instructions

For Remotion motion graphic creation or revision, read and apply [.agents/skills/remotion-motion-graphic/SKILL.md](.agents/skills/remotion-motion-graphic/SKILL.md).

For mascot identity, read [assets/mascot/kodey/README.md](assets/mascot/kodey/README.md) and use its approved reference. The user adopted the black 3D knot mascot with white limbs as the main mascot on 2026-11-01, approving both whole-image and separately animated versions. Future video design may vary while mascot identity stays consistent.

This repository contains an Indonesian explainer workflow, reusable source, narration, timing and rendered deliverables. Preserve existing files when pushing through GitHub tools. User instructions override creative defaults.

## Content creation skills

This repository also includes HyperFrames, Animate, Lemo-Opuscar, and the official GSAP skills. Their sources and references are committed under `content-studio/.agents/skills/`; `.agents/skills/` at the repository root links to them so they can be discovered in a fresh checkout.

- HTML-to-video and motion graphics: `content-studio/.agents/skills/hyperframes/SKILL.md`, with companions `hyperframes-cli`, `hyperframes-registry`, `media-use`, `reverse-any-video`, and `style-sampling`.
- Procedural canvas animations: `content-studio/.agents/skills/animate/SKILL.md` (seven built-in styles).
- Films in a named style: `content-studio/.agents/skills/lemo-opuscar/SKILL.md` (99 styles). Source `content-studio/env.sh` in Bash to set `LEMO_OPUSCAR_HOME` to the bundled library.
- GSAP: `content-studio/.agents/skills/gsap-core/SKILL.md` plus the relevant `gsap-*` companion.

Read the relevant skill before using it. Follow the user's requested framework and preserve the existing Remotion workflow and approved mascot identity. Do not switch an existing Remotion project to another framework unless the request calls for it.

For fresh environments and render dependency setup, read [content-studio/REPO-SETUP.md](content-studio/REPO-SETUP.md). The skills are available when this repository is loaded; opening an unrelated chat does not copy this repository automatically. Keep new content projects out of the bundled skill and library source folders.


## Additional creative skills

Four project-local skills are also installed and discoverable through `.agents/skills/`:

- `bang-motion`: cinematic browser motion graphics, openers and explainers.
- `vox-director`: Vox-style collage videos. Requires your own `ATLASCLOUD_API_KEY` for its generation pipeline; installation does not run paid generation.
- `huashu-art-motion`: code-driven art animations and explainer clips; requires uv, FFmpeg and Playwright Chromium when rendering.
- `claude-drawing`: procedural drawing and draw-on animations with Python, NumPy and Pillow.

Read the selected skill's `SKILL.md` before use. Keep the existing Remotion framework and approved mascot when working on existing productions. Sources, commit pins, file hashes and omitted gallery media are recorded in `content-studio/creative-skills-manifest.json`. Upstream workflow bodies and licenses are retained; skill names and descriptions are adapted for Codex discovery. Cuttr AI is not included because no verified skill source was supplied.

## Free local Vox explainer

- `vox-explainer`: code-driven editorial paper-collage explainers, with no required paid generation API. Read `content-studio/.agents/skills/vox-explainer/SKILL.md`.
- `brand-intake`: companion for brand and motion setup. Read `content-studio/.agents/skills/brand-intake/SKILL.md`.

These skills are bundled in `content-studio/.agents/skills/` and linked from root `.agents/skills/`. Prefer `vox-explainer` when the user requests free local Vox-style animation; `vox-director` is a separate API-based workflow. Use the existing bundled HyperFrames tools for local rendering. External narration such as ElevenLabs is optional and follows the user's account quota and authorization; it is not included in the free local skill.
