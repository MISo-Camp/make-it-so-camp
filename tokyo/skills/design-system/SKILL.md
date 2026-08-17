---
name: design-system
description: Template for a personal design-system skill. Route by mode, load only the rules that mode needs. Fill in your own type, colour, components, layout, motion, diagrams, and findability rules — this file ships empty.
---

# Design System (template)

A design system here means the decisions an agent needs in order to make something look like yours rather than like a good page by someone else. It is a router plus rulesets, not one document.

This file is an empty structure. Nobody's answers are in it. Fill in each section as you notice yourself re-deciding the same thing twice.

## Mode Detection

Determine which mode applies based on the file being edited or the content type. This table is the router — it should be the first thing an agent reads, and the only thing it reads until a specific rule is needed.

| File path / content type | Mode | Load these references |
|---|---|---|
| `<path pattern, e.g. src/pages/index>` | `<mode name, e.g. Landing>` | `<reference file(s), e.g. type-colour.md + findability.md>` |
| `<path pattern>` | `<mode name>` | `<reference file(s)>` |
| `<path pattern>` | `<mode name>` | `<reference file(s)>` |
| `<content with diagrams>` | Any mode | mode-specific ref + `diagrams.md` |
| New page (any type) | Ask which mode | mode-specific ref |

Why route first: nothing loads until it is needed, so a rule can be changed without disturbing the rest. A change to your motion rules shouldn't require re-reading your colour rules, and an agent working on one page type shouldn't have to hold every other page type's rules in context.

## The Six Families

Each family is its own reference file. Keep them separate — see the "why separate" line under each for the reasoning.

### Type and colour

`<placeholder: fonts, type hierarchy, colour palette with each colour's job, spacing scale>`

Why separate: this is the family that changes least often and gets referenced by every other family — components, layout, and diagrams all cite it rather than repeating it.

### Components

`<placeholder: navigation, headers, footers, recurring page furniture>`

Why separate: components are reused across many pages; a rule change here should propagate everywhere at once, not require hunting through page-specific layout rules.

### Layout

`<placeholder: page architecture, hero treatment, figure placement, responsive behaviour>`

Why separate: layout is page-type-specific in a way components and type/colour are not — a landing page and a long-form essay can share the same type scale and still need different layout rules.

### Motion

`<placeholder: hover states, animation, reduced-motion behaviour>`

Why separate: motion is the family most often skipped or bolted on later; keeping it separate means it can be added, audited, or stripped out (e.g. for accessibility) without touching anything else.

### Diagrams

`<placeholder: palette, typography, layout patterns for figures and SVGs>`

Why separate: diagrams have their own visual grammar (box types, connection lines, element heuristics) that doesn't map cleanly onto page type/colour rules, and they get generated programmatically more often than hand-authored.

### Findability

`<placeholder: meta tags, structured data, cross-reference rules>`

Why separate: findability rules serve machines (search engines, other agents) rather than human readers, and change on a different cadence than visual rules — an SEO update shouldn't touch your type scale.

## Tokens vs Rules

Machine-readable tokens (exact hex values, font names, spacing units) belong in their own file that a tool can validate. Prose rules — how to apply the tokens, when to break them, what a page needs to feel right — belong in the reference files.

Google's open-source [DESIGN.md spec](https://github.com/google-labs-code/design.md) is a good starting skeleton for the token half. Be accurate about scope: that spec covers describing a visual identity to agents — tokens, palette, type. The mode router and the per-mode prose rulesets above are not part of it; you still have to build those yourself.

## How to Start

Two honest paths:

1. **Start from the DESIGN.md skeleton.** Fill in your tokens first, then build the router and rulesets around them.
2. **Start from one page you already like.** Write down why it looks right, being embarrassingly specific — not "clean and modern" but the actual font, the actual spacing, the actual reason a heading is where it is.

Either way, this system accumulates one rule at a time, added the moment you notice yourself re-deciding something. It is not a project you sit down and complete.
