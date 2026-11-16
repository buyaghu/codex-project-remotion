# Installed content creation skills

This project contains the user's installed content creation skills. Read the appropriate SKILL.md before using it:

- HTML-to-video and motion graphics: `.agents/skills/hyperframes/SKILL.md`, with companion skills `hyperframes-cli`, `hyperframes-registry`, `media-use`, `reverse-any-video` and `style-sampling`.
- Procedural canvas animations: `.agents/skills/animate/SKILL.md` (seven built-in styles).
- Films in 99 styles: `.agents/skills/lemo-opuscar/SKILL.md`. Source `env.sh` first to use the bundled library in `libraries/lemo-opuscar`.
- GSAP: `.agents/skills/gsap-core/SKILL.md`, plus the relevant `gsap-*` companion skill.

This is a project-local installation. A different cloud environment does not automatically receive these files. Read `PINDAH-SESI.md` when restoring from the ZIP. User instructions and session authorization take precedence over upstream defaults.

## Additional creative skills

Four project-local skills are also installed and discoverable through `.agents/skills/`:

- `bang-motion`: cinematic browser motion graphics, openers and explainers.
- `vox-director`: Vox-style collage videos. Requires your own `ATLASCLOUD_API_KEY` for its generation pipeline; installation does not run paid generation.
- `huashu-art-motion`: code-driven art animations and explainer clips; requires uv, FFmpeg and Playwright Chromium when rendering.
- `claude-drawing`: procedural drawing and draw-on animations with Python, NumPy and Pillow.

Read the selected skill's `SKILL.md` before use. Keep the existing Remotion framework and approved mascot when working on existing productions. Sources, commit pins, file hashes and omitted gallery media are recorded in `creative-skills-manifest.json`. Upstream workflow bodies and licenses are retained; skill names and descriptions are adapted for Codex discovery. Cuttr AI is not included because no verified skill source was supplied.

## Free local Vox explainer

- `vox-explainer`: code-driven editorial paper-collage explainers, with no required paid generation API. Read `.agents/skills/vox-explainer/SKILL.md`.
- `brand-intake`: companion for brand and motion setup. Read `.agents/skills/brand-intake/SKILL.md`.

These skills are bundled in `content-studio/.agents/skills/` and linked from root `.agents/skills/`. Prefer `vox-explainer` when the user requests free local Vox-style animation; `vox-director` is a separate API-based workflow. Use the existing bundled HyperFrames tools for local rendering. External narration such as ElevenLabs is optional and follows the user's account quota and authorization; it is not included in the free local skill.
