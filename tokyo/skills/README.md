# Workshop skills

De-personalised versions of the Claude Code skills demonstrated at Make It So Camp. Meant to be adapted to your own setup, not run as-is.

## What's here

- **`summarize-meetings/`** — processes meeting transcripts into a summary and extracts people, organizations, and concepts into a knowledge base. Configure: your transcript source, your knowledge base location, your extraction targets.
- **`publish-note/`** — publishes a note from your knowledge base to a live site: sanitizes internal links and frontmatter, converts ASCII diagrams to SVG, commits and pushes. Configure: your notes source, your site repo path and content directory, your deploy step.
- **`design-system/`** — empty structure for describing your own visual identity to an agent: a mode router plus rulesets for type/colour, components, layout, motion, diagrams, and findability. Configure: everything — this one ships with no answers filled in.
- **`voiceprint/`** — empty structure for describing your own writing voice to an agent: a router by writing type, then tokens, components, rhythm, and a list of things you never do. Configure: everything — this one ships with no answers filled in.

`summarize-meetings` and `publish-note` are ports of working skills — the pipeline is real, only the environment-specific settings (paths, tools, destinations) need filling in. `design-system` and `voiceprint` are empty structures to fill in yourself; nothing in them is filled in for you.

## Full skills (working copies)

Complete, working skills copied from a live setup, snapshot 2026-08-24. These run once installed. Some reference companion skills by name; each entry says what it pairs with. Where a public repo exists, prefer it for updates: the copy here is frozen at the snapshot date.

- **`prose-craft/`**: sentence-level writing. A Strunk floor (economy), a machine-tell filter (kill AI patterns), a construction ceiling from Virginia Tufte's *Grammar as Style*, and a catalog of rhetorical figures. Canonical: [nraford7/prose-craft-skill](https://github.com/nraford7/prose-craft-skill).
- **`narrative-engine/`**: turns source material into narrative-driven prose or presentations. Embeds its own copy of prose-craft, so it runs standalone. Canonical: [nraford7/Narrative-Engine](https://github.com/nraford7/Narrative-Engine).
- **`keynote-create/`**: source material to a slide deck. Distills a punchline, picks a narrative spine, drafts story-beat titles, renders HTML, exports PDF. Style comes from swappable packs; a neutral pack is bundled. Pairs with prose-craft for title polish.
- **`deep-research/`**: retrieval-first research harness. Scoped web retrieval, an evidence gate, synthesis, mechanical citation verification. Needs API keys (see `config.toml.example`). Canonical: [nraford7/deep-research-v2](https://github.com/nraford7/deep-research-v2).
- **`do-it/`**: an end-to-end build pipeline with a light/medium/heavy effort dial, escalation on evidence, and an independent-model review step. Canonical: [nraford7/do-it-skill](https://github.com/nraford7/do-it-skill).
- **`creative-diversification/`**: breaks mode collapse in ideation. Asks how weird you want to get (creative / weird / feral), then generates under different cognitive frames.
- **`art-direct/`**: reads any content and proposes 2-3 creative directions, then writes AI image prompts and visual briefs section by section. Includes a fal.ai model table for direct generation.

## How a skill gets installed

A skill is a folder containing a `SKILL.md` file, placed under `~/.claude/skills/`. The file is plain markdown — read it, edit it, understand it before you rely on it. There's no build step and no hidden format.

## Linked, not copied

Two things shown at the camp are published by the people who made them. Use theirs — a copy here would only go stale.

- **`frontend-design`** — the skill behind the live website build. It ships with Claude Code, so you may already have it; the source is at [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design). Anthropic's, under its own licence.
- **DESIGN.md** — the format for describing a visual identity to an agent, open-sourced by Google Labs: [google-labs-code/design.md](https://github.com/google-labs-code/design.md). A good skeleton for the token half of a design system. It does not cover the mode router or the per-mode prose rules — the `design-system/` template here is about those.

## Caution

These skills write files. `publish-note` pushes to a live site, `do-it` runs autonomous multi-step builds, and `deep-research` spends API budget on retrieval. Read a skill before you run it.
