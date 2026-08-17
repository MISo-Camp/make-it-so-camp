# Workshop skills

De-personalised versions of the Claude Code skills demonstrated at Make It So Camp. Meant to be adapted to your own setup, not run as-is.

## What's here

- **`summarize-meetings/`** — processes meeting transcripts into a summary and extracts people, organizations, and concepts into a knowledge base. Configure: your transcript source, your knowledge base location, your extraction targets.
- **`publish-note/`** — publishes a note from your knowledge base to a live site: sanitizes internal links and frontmatter, converts ASCII diagrams to SVG, commits and pushes. Configure: your notes source, your site repo path and content directory, your deploy step.
- **`design-system/`** — empty structure for describing your own visual identity to an agent: a mode router plus rulesets for type/colour, components, layout, motion, diagrams, and findability. Configure: everything — this one ships with no answers filled in.
- **`voiceprint/`** — empty structure for describing your own writing voice to an agent: a router by writing type, then tokens, components, rhythm, and a list of things you never do. Configure: everything — this one ships with no answers filled in.

`summarize-meetings` and `publish-note` are ports of working skills — the pipeline is real, only the environment-specific settings (paths, tools, destinations) need filling in. `design-system` and `voiceprint` are empty structures to fill in yourself; nothing in them is filled in for you.

## How a skill gets installed

A skill is a folder containing a `SKILL.md` file, placed under `~/.claude/skills/`. The file is plain markdown — read it, edit it, understand it before you rely on it. There's no build step and no hidden format.

## Linked, not copied

Two things shown at the camp are published by the people who made them. Use theirs — a copy here would only go stale.

- **`frontend-design`** — the skill behind the live website build. It ships with Claude Code, so you may already have it; the source is at [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design). Anthropic's, under its own licence.
- **DESIGN.md** — the format for describing a visual identity to an agent, open-sourced by Google Labs: [google-labs-code/design.md](https://github.com/google-labs-code/design.md). A good skeleton for the token half of a design system. It does not cover the mode router or the per-mode prose rules — the `design-system/` template here is about those.

## Caution

These skills write files, and one of them (`publish-note`) pushes to a live site. Read a skill before you run it.
