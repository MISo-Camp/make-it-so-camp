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

## Not included here

`frontend-design` is a skill that ships with Claude Code itself. It's Anthropic's, carries its own licence, and isn't reproduced in this folder — look for it in your own Claude Code installation.

## Caution

These skills write files, and one of them (`publish-note`) pushes to a live site. Read a skill before you run it.
