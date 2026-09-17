---
name: publish-note
description: Publish a notes-collection markdown file to a live site. Sanitizes wikilinks, strips internal sections, converts ASCII diagrams to SVG, and pushes to production. Use when the user says "publish this", "publish this note", "put this on the site", or /publish-note.
---

# Publish Note

One-click publish path from a source note to a public site. Works on any markdown file with a title and description. This is a port of a working skill — adapt the configuration block below to your own setup before using it.

## Configuration (fill in for your setup)

```
Source
  where your notes live: <path to your notes/vault root>
  which of them are publishable: <e.g. a "concepts" folder, an "essays" folder, or any path passed as argument>

Destination
  site repo path: <path to your site's repo>
  content directory inside it: <e.g. src/content/notes/>

Deploy step
  <describe your deploy: this skill assumes commit + push, with CI building and deploying.
   If your site deploys differently (manual build, different host, no CI), rewrite Step 4.>

Image export (optional)
  <if you want generated diagrams saved somewhere outside the site repo — e.g. a photo library
   or an assets folder — describe the destination and the export tool. The original renders
   diagrams to JPEG and files them in a photo album via a small shell script. If you don't want
   this, skip Step 4b and 2b's SVG-tracking note entirely.>

Diagram style reference (optional)
  <if you have a design system with SVG diagram conventions, point Step 2b at it — your design
   system's diagram rules, if you have them. If you don't have one, skip Step 2b; ASCII
   diagrams stay as plain code blocks.>
```

## Prerequisites

- A content collection or equivalent target at `<destination content directory>`
- A source markdown file with a `#` title heading (or `title` in frontmatter) and a `description`. Usually under `<source: publishable notes path>`, but any path passed as argument works.

## Workflow

### Step 1: Identify the source file

If a file path is provided as argument, use it. If the conversation has been working on a specific note, use that. If ambiguous, ask.

The notes root is: `<source: where your notes live>`

Read the source file. The same sanitization applies regardless of note type — some note types simply won't have `## Connections`/`## Sources` sections, which the steps below skip when absent.

### Step 2: Sanitize

Apply these transformations in order:

**Frontmatter:** Strip the source frontmatter entirely. Replace with site frontmatter:

```yaml
---
title: "{title from the # heading or source frontmatter}"
description: "{description from source frontmatter, trimmed to ~160 chars if needed}"
date: "{today's date, YYYY-MM-DD}"
---
```

**Wikilinks:** Convert all `[[Name]]` to plain text `Name`. Convert `[[Name|Display]]` to `Display`.

**Remove "Connections" section:** Delete the entire `## Connections` section (heading through next `##` or end of file). This section is always internal-only linking.

**Clean "Sources" section:** In the `## Sources` section, remove any bullet that is *only* an internal link with no external URL (e.g., `- [[some-internal-file]] — description`). Keep bullets that contain real URLs. If the section becomes empty after cleaning, remove it entirely.

**First heading:** The content body should start with `##` (h2), not `#` (h1). The title renders via the template. Remove the `# Title` line from the body.

**No other changes.** Keep tables, keep structure, keep external links. The content should read as the author wrote it, just without source-system machinery.

### Step 2b: Convert ASCII diagrams to SVG

Scan the sanitized content for code blocks that contain ASCII-style diagrams rather than actual code. A code block is a diagram if it contains box-drawing characters (`┌ ┐ └ ┘ │ ─ ═ ║`), arrow characters (`→ ← ↕ ▶ ▼ ►`), or a pattern of aligned `|`, `+`, `-` characters forming boxes and connection lines.

**If no diagram code blocks are found:** skip this step entirely.

**If diagram code blocks are found:**

1. Load your SVG diagram reference: `<diagram style reference, if you have one>`. This should contain the color palette, typography specs, element types, and layout patterns.

2. For each diagram code block, convert it to an inline SVG wrapped in `<figure class="diagram">`:
   - Interpret the diagram semantically: identify what each box/element represents (stakeholder, tool, system, output) and assign the appropriate fill/stroke from the reference
   - Use the layout pattern that best fits the diagram's structure (top-to-bottom flow for architecture diagrams, side-by-side panels for comparisons)
   - Use `viewBox` for responsive scaling, never fixed dimensions
   - Include `role="img"` and a descriptive `aria-label`
   - Add a `<figcaption>` that summarizes what the diagram shows
   - Replace the original code block with the `<figure>` HTML block

3. When interpreting element types, use these heuristics:
   - People/roles → stakeholder pills (bordered, rounded)
   - Tools/platforms → tool boxes (subtle border)
   - Central systems/agents → primary box (accent border, heavier stroke)
   - Memory/state → inner highlighted box (accent fill)
   - Outputs/documents → dashed-border box
   - Active connections → solid accent lines
   - Future/planned → dashed lines

**Important:** Do not auto-convert code blocks that contain actual code (functions, config, CLI output, etc.). Only convert blocks that are clearly visual diagrams.

**Track the generated SVGs.** Keep the markup of each `<svg>` you produce — Step 4b exports them (if you've configured an image-export destination).

### Step 3: Confirm

**This skill pushes to production. Do not skip this gate.**

Present the proposed publication in a single message:

```
Publishing to <your site>/notes/{slug}/

Title: {title}
Description: {description}
Slug: {slug}
Diagrams: {N ASCII diagrams converted to SVG / none}

Content preview: {first 3 lines of body}

Go?
```

If diagrams were converted, briefly describe each one.

Derive slug from title: lowercase, spaces to hyphens, strip non-alphanumeric except hyphens, collapse consecutive hyphens. Wait for confirmation.

### Step 4: Write, commit, push

```bash
# Write the file
# Path: <destination site repo>/<content directory>/{slug}.md

cd <destination site repo>
git add <content directory>/{slug}.md
git commit -m "Add note: {title}"
git push origin main
```

Adjust this step to match your actual deploy mechanism if it isn't commit-and-push-to-main.

### Step 4b: Export diagrams (optional)

Only if Step 2b generated SVGs and you've configured an image-export destination. For each generated diagram, write **only the `<svg>…</svg>` element** (not the `<figure>`/`<figcaption>` wrapper) to a temp file and run your export tool. The original renders to a retina JPEG (headless Chrome on a dark page background, with web fonts) and imports it into a Photos album:

```bash
# write the svg markup to a temp file named after the slug + index
printf '%s' '<svg ...>…</svg>' > "/tmp/{slug}-1.svg"
<your svg-to-image export tool> "/tmp/{slug}-1.svg" "<destination album/folder>"
```

Name the temp files `{slug}-1.svg`, `{slug}-2.svg`, … so the exported images are identifiable. If the export step errors, report it but don't fail the publish; the note is already live.

### Step 5: Output URL

```
Published: https://<your site>/notes/{slug}/
Deploy completes in ~1-2 minutes.
Diagrams: {N} image(s) exported to <destination> / none.
```

## What gets stripped (summary)

| Element | Action |
|---------|--------|
| Source frontmatter (internal fields: type, canonical_id, aliases, projects, hub, tags, status, etc.) | Replaced with site frontmatter |
| `[[Wikilinks]]` | Converted to plain text |
| `## Connections` section | Removed entirely |
| Source bullets with only internal links | Removed |
| `# Title` heading | Removed (template renders h1) |

## What stays

| Element | Action |
|---------|--------|
| All body prose | Kept as-is |
| Tables | Kept |
| External URLs | Kept |
| Code blocks (actual code) | Kept |
| Source bullets with real URLs | Kept |

## What gets converted

| Element | Action |
|---------|--------|
| ASCII diagram code blocks | Converted to inline SVG using your diagram style reference (if configured) |
| Generated SVGs | Also exported as images to your configured destination (Step 4b, optional) |
| Actual code blocks | Kept as-is (not converted) |
