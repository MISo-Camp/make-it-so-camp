---
name: summarize-meetings
description: Process meeting recordings into a written summary per meeting, extract people/organizations/concepts into an entity directory, and propose decision records for human review.
---

# Summarize Meetings

Process meetings — write a summary for each one to your notes directory, then run an extraction pass against your entity directory (people, organizations, concepts). This is a port of a working skill. Two things are environment-specific: where the transcript comes from, and where the output lands. Both are configured below; everything after the two blocks is the pipeline itself, unchanged.

## SOURCE adapter

A source must yield four things for each meeting: the transcript text; speaker labels, turn by turn; a start timestamp; and a stable id, so the same meeting is never processed twice.

Three worked examples, in increasing order of effort:

1. **A recording app with an API or MCP.** This setup reads one called Talat — query it live for the transcript, the speaker list, a stored summary, and action points. Richest option: speakers and dedup come for free (a meeting id, plus a tag you set on it once you've processed it).
2. **A folder of exported transcript files, watched on disk.** A previous setup worked this way, against Granola exports — one file per meeting. The file name carries the timestamp, and the file path is the stable id. A Zoom/Teams/Meet transcript export or a Whisper output fits this pattern with no changes.
3. **Manual paste, no automation.** Still works. You supply the transcript and the timestamp by hand, and dedup is your own memory (or a plain log of what you've already run).

None of these is a recommendation — pick whatever you already have. The pipeline below is written against example 1 (an MCP-style tool called `talat`, invoked as `mcp__talat__*`) because it needs the least translation. Swap those calls for your source's equivalent, or for reading a file / a pasted block if you're on example 2 or 3.

## DESTINATION adapter

Define these once, then use them throughout the pipeline:

- **`NOTES_DIR`** — where one file per meeting lands, e.g. `<vault>/intake/`.
- **`ENTITY_DIR`** — where extracted people, organizations, and concepts live, e.g. `<vault>/atlas/`, with `people/`, `organizations/`, and `concepts/` subfolders (and a `records/_pending/` subfolder for proposed decisions). If you don't have one yet, the skill still produces meeting summaries — only the extraction half (Step 3 below) needs it.
- **`TASK_SYSTEM`** (optional) — where action items you own go. This setup uses Things 3 as one worked example; any task manager with an API or CLI slots in the same way.
- **`SCHEMA_FILES`** (optional) — your own frontmatter rules and identity-resolution rules, if you have them. This skill states its own frontmatter contract and identity-resolution sequence inline below; treat `SCHEMA_FILES` as an override if your own rules are stricter or different. If they conflict with anything below, they take precedence.

## Workflow

### Step 1: List Unprocessed Meetings

```
mcp__talat__list-meetings  state: "ended", since/before for the batch window
```

**Dedup lives in tags, where the data lives.** Skip any meeting already tagged `ingested` or `skipped`.

Belt-and-braces backstop: Glob `NOTES_DIR/*<slug>*.md` for the slug before writing — only relevant for force-reprocessed meetings.

### Step 2: Triage

`mcp__talat__get-meeting` gives `wordCount`, `segmentCount`, `speakerCount`, duration, and the speaker list — no file-size guessing.

| Signal | Action |
|--------|--------|
| duration < ~5m or wordCount < ~300 | Read the transcript — likely stub, false-start recording, or logistics-only |
| speakerCount = 1 (only `You`) | Check: solo dictation (may still be substantive) vs. capture failure |
| Title suggests non-meeting | Medical appointments, recording setup, screen-sharing setup — confirm, then skip |

**Skip criteria (with log entry):** empty stubs, < 20 words of real content, garbled recordings, scheduling fragments, medical/personal appointments, recording-setup conversations. Sparse-but-substantive content still gets processed.

Skipped meetings: orchestrator tags them `mcp__talat__add-meeting-tag` → `skipped`, so they never resurface in Step 1.

### Step 2.5: Calendar Cross-Reference (orchestrator, demoted)

Recording-app titles are usually usable and speakers are often already named by voice recognition, so the calendar step is gap-filling, not load-bearing:

1. Call `mcp__claude_ai_Google_Calendar__list_events` once for the batch's date range (primary calendar, a fixed `timeZone`, `orderBy: "startTime"`). **If the calendar tool is unavailable (headless / no MCP), skip this step entirely** — agents use the source title and named speakers.
2. Match each meeting's start time to the event whose window contains it (recording may start ~15 min early). Prefer real meetings (attendees / a meeting link) over personal blocks. No confident match = no calendar data.
3. Pass to the agent: `[MEETING_NAME]` (event summary — used when the source title is content-derived rather than a real meeting name) and `[ATTENDEES]` (invited list minus you — used to name unresolved `Speaker N` voices). Both empty on a miss; a miss is not an error.

### Step 3: Dispatch Parallel Agents

Spawn one Task agent per meeting using `subagent_type: general-purpose` with `model: "sonnet"`, `mode: bypassPermissions` and `run_in_background: true`.

**Model routing (fixed — never ask the user to switch models):** per-meeting summarizer/extraction agents always run on `sonnet` — the extraction contract is judgment-heavy enough to rule out a small model, and nothing in it needs a larger one. The orchestrator (triage, tagging, task-system writes, report) runs on whatever model the session already has. Running the per-meeting agents on a local model was tried and deliberately not adopted.

**Wave sizing:** 10-15 per wave. Wait for returns, then dispatch the rest.

**Agent prompt template:**

```
You are a meeting summarizer for the notes system at NOTES_DIR / ENTITY_DIR
(see the DESTINATION adapter above).

Before writing, read your own schema and identity-resolution rules
(SCHEMA_FILES), if you have them. These override anything in this prompt
if they conflict. If you don't have any, the frontmatter contract and
identity-resolution sequence stated inline below is what you follow.

Your meeting is [MEETING_ID] ("[TITLE]", started [STARTED_AT]).
Fetch it yourself via the source's tool:
1. `mcp__talat__get-meeting` — metadata, speaker list, stats
2. `mcp__talat__get-transcript` (format: markdown, include_timestamps: true) —
   the real content. For very long meetings the response is large; work
   through it fully regardless.
3. `mcp__talat__get-summary` — the source's own stored LLM summary, if it has
   one. Cross-reference ONLY; never write the note's summary from it without
   reading the transcript.
4. `mcp__talat__list-action-points` — the source's structured action points
   with status and resolved assignee, if it has them. Candidates, not truth —
   verify each against the transcript, and catch commitments the source
   missed.

Do NOT write anything back to the source app — no tags, titles, summaries,
chapters, or action points. The orchestrator owns all writes back to it.

The calendar meeting name for this meeting is: `[MEETING_NAME]` (empty if no
calendar match — then use the source's title).
The invited attendees (from the calendar, minus you) are: `[ATTENDEES]`
(empty if no match).

**Speaker resolution.** Many recording apps diarize and sometimes NAME
speakers at capture time (voice recognition across meetings) — named
speakers in the transcript are the primary identity signal.
- `You` is always you. Named speakers (e.g. `Dana Okafor`) are taken as
  identified — still run them through identity resolution against the
  entity directory.
- Unnamed `Speaker N` voices: name only on a clear cue (self-introduction,
  addressed by name, 1:1 with a single-person `[ATTENDEES]` list). Never
  guess just to use up the invited list — invited ≠ present. Unresolved
  speakers stay `Speaker N`, kept DISTINCT in the People table and quotes.
- `Unattributed` segments are audio the diarizer could not assign — a
  catch-all, NEVER a person. They can carry real content (sometimes long
  stretches); read them, use them, but never count them as a voice.
- Record in the summary: distinct-voice count, invited list, name mappings,
  any invited-vs-present gap, and the rough share of unattributed audio if
  substantial. Facts (N voices) stay separate from inference (probable
  names).

**Context lookup (before writing).** If you have a local search index over
your own notes, run one or two focused queries for what's already known
about this meeting's main people, organizations, and project. It sharpens
identity resolution and feeds the `## Context & changes` section. Skip only
for a genuine first-ever contact, or if you don't have an index at all.

1. Build the note filename: `NOTES_DIR/YYYY-MM-DD_HHmm_<slug>.md`
   - Date and HHmm from the meeting's start time, converted to your local
     timezone.
   - <slug>: from `[MEETING_NAME]` if provided, else from the source's
     title — kebab-case, lowercase, ASCII only.
   - The note's H1 = `[MEETING_NAME]` when provided, else the source's
     title.
2. Write the meeting summary to that path using the Summary Template below.
   Include a `## Context & changes` block (right after `## Meeting Summary`)
   that, grounded in the context lookup, flags ONLY what genuinely applies,
   each with a cited `[[wikilink]]`/path: **Contradicts**, **Answers**,
   **New**, **Updates**. Omit the block if there's no real prior context;
   never manufacture connections.
   Frontmatter must satisfy the notes schema:
     type: meeting
     description: ~150 chars
     status: active
     source: talat   # or your own source name
     created: YYYY-MM-DD
     agent: summarize-meetings
     project: ["[[project-name]]"] # array of wikilinks; empty if none
     domain: ["[[domain-name]]"]    # array; empty if none
     extraction_status: processed
     tags: [topical, lowercase, hyphenated]

3. Run the Extraction Contract (atomic — finish before returning):
   For each person, organization, and concept mentioned:
   - Follow the 7-step Identity Resolution Sequence (email → canonical_id →
     filename → alias → unambiguous partial match → ambiguous defer →
     no-context defer), or your own sequence from SCHEMA_FILES if you have
     one.
   - Match found: enrich the existing entity file. Append a
     Sources/Appearances entry. Update the modified date. Add this source's
     project to `projects:` if missing. Never rewrite existing biographical
     text.
   - No match, unambiguous: create a new file in `ENTITY_DIR/people/`,
     `ENTITY_DIR/organizations/`, or `ENTITY_DIR/concepts/` using the schema
     below.
     CREATION BAR: only for entities you have an actual relationship or
     engagement with (attendee, collaborator, client, active thread).
     People/orgs merely name-dropped stay as red wikilinks in the body — do
     NOT create files for them. Red links are by design; creation is
     reserved for relationship-level entities.
     RELATIONSHIP AT CREATION (required array — Known vs Reference
     contract): direct-interaction evidence in the source → a known-vocab
     value, e.g. [network] or [peer]. If a file is warranted for a
     non-interacted entity (rare) → [reference], exclusive, and NEVER set
     stage/cadence/next-touch/how-we-met/last-contact on it.
     Never change an existing file's relationship value — propose it in
     chat; a manual tag always wins over an inferred one.
   - Ambiguous or first-name-only with no context: write to
     `ENTITY_DIR/{type}/_pending/` with `status: needs_review` and an
     `ambiguity:` field. SURFACE the deferral in your return message with
     the reason.
   - DO NOT extract products. Products are manually created — not part of
     the extraction contract.
4. Wikilink every person, organization, concept, and product name in the
   body using bare filenames: `[[Name]]` not `[[ENTITY_DIR/people/Name]]`.
5. Filter yourself out of attendee lists.
6. Reference existing projects via wikilink — never create new project
   files or stubs.

Never fabricate info not in the transcript.
Don't create entity files for first-name-only references without clear context — defer to `_pending/` instead.

7. Propose decision records (PROPOSE ONLY — never write a ratified record).

   A decision fills all four slots or it is not one:
   **On [date], [owner] chose [X] over [Y], which binds [future work].**
   - owner: a named decider or clearly identified joint deciders. No
     attributable decider → not a decision.
   - over: at least one alternative died. Nothing rejected → it is a
     preference or an intention, not a decision. An unnamed but agreed
     constraint (a cap, a limit) counts as `foreclosure: implicit`.
   - binds: it constrains how later work happens. A TASK ("draft the
     email", "make the slides") is never a decision — those are action
     items.
   - source: quote the transcript line(s) that evidence it.

   Three kinds, all proposed the same way, distinguished by frontmatter:
   - **made** — decided in this meeting. `status: made`, `decided:` = the
     meeting date.
   - **open** — a pending choice with an owner, and a deadline if stated
     ("we must decide by end of month"). `status: open`, no `chose`/`over`
     yet; put the question in `description` and the alternatives in the
     body.
   - **reported** — narrated as already made elsewhere/earlier.
     `status: made`, `reported: true`, `decided:` approximate (say so in
     the body), and name the speaker who reported it.

   Write each as its own file in `ENTITY_DIR/records/_pending/`, named
   `YYYY-MM-DD_<slug>.md` (date = `decided`), with `status: needs_review`
   overriding the lifecycle status in a `proposed_status:` field, following
   the Decision Record Schema below. Set `source:` to the bare wikilink of
   the note you just wrote, and put the verbatim evidence quote in the body
   under `## Evidence`.

   `scope_level` — judge honestly and default down: `project` unless it
   plainly binds a whole domain or your whole way of working. Over-scoping
   is the failure mode that makes records useless.

   Exclude and never propose: tasks, preferences, opinions, scheduling,
   pleasantries, aspirations, forecasts, hypotheticals ("if trust broke I'd
   leave"), and self-descriptions of current state.

   Zero decisions is a valid and common finding — a 60-minute interview
   often contains none. Never pad.

8. Collect action items owned by you (and ONLY you — items owned by anyone
   else stay in the summary's Action Items section and are not collected).
   Merge the source's own action points (verified against the transcript)
   with your own extraction. Do NOT write to a task system yourself —
   return them in your report.

Return: a short report listing the note file path, entity files
created/enriched, any `_pending/` deferrals with their ambiguity reason, a
DECISION PROPOSALS block, and an ACTION ITEMS block.

DECISION PROPOSALS — one line per proposed record (or "none"):
kind (made|open|reported) | scope_level | one-line "chose X over Y, binds Z" | file path

ACTION ITEMS — one line per item:
title | deadline (YYYY-MM-DD only if explicitly stated, else "none") | one-line context | note file path
```

### Step 4: Completion per Meeting (orchestrator only)

As each agent returns:

1. **Verify** the note file exists at the reported path (a `ls`/Glob, not trust).
2. **Tag in the source app:** `mcp__talat__add-meeting-tag` → `ingested`. This IS the dedup state — never tag before verification.
3. **Task-system todos** from the ACTION ITEMS block, if you've wired one up (see `TASK_SYSTEM` in the DESTINATION adapter):
   - Dedup: search for a close title match — skip if found.
   - Create the todo: `title`; a list/project mapped per your own contract if you have one (unmapped → default inbox); `notes` = one-line context + a link back to the note file; a tag identifying it as agent-created; `deadline` only if the block states one; NEVER set a start date on it.
4. **Decision proposals** from the DECISION PROPOSALS block: verify each proposed file exists, then SURFACE them in chat for you — one line each, grouped by meeting. Do not ratify, do not move them out of `_pending/`, and never turn one into a task-system todo. A decision is not a task; ratification is yours, and it is a separate act.

Subagents never write to the source app or the task system — all of Step 4 is orchestrator-only.

### Step 5: Compile Report

After all agents return, present a summary table:

```
| Meeting | Date | Note file | People | Orgs | Concepts | Decisions | Pending | Tasks | Status |
|---------|------|-----------|--------|------|----------|-----------|---------|-------|--------|
| Dana | Jul 30 | 2026-07-30_1234_dana.md | 2 (1 new) | 1 (new) | 3 (2 new) | 1 proposed | 0 | 2 | Done → tagged ingested |
| stub | Jul 29 | - | - | - | - | - | - | - | Skipped (1m stub) → tagged skipped |
```

Include: total processed, total skipped (with reasons), total deferrals to `_pending/`, decision proposals awaiting ratification, and notable highlights.

## Summary File Template

Write to: `NOTES_DIR/YYYY-MM-DD_HHmm_<slug>.md`

```yaml
---
type: meeting
description: "~150 chars: what this meeting was about and the key thread"
status: active
source: talat   # or your own source name
created: YYYY-MM-DD
agent: summarize-meetings
project: ["[[project-name]]"]
domain: ["[[domain-name]]"]
extraction_status: processed
tags: [topical, lowercase, hyphenated]
attendees: ["[[Person 1]]", "[[Person 2]]"]
date: YYYY-MM-DD
duration_minutes: N
---
```

```markdown
# Meeting Title

> Source: talat meeting id <id> ("source title" — omit the quote if it equals the H1)
> Date: Month DD, YYYY, HH:mm (your timezone), duration
> Invited (calendar): [[Person 1]], [[Person 2]]   (the invite list — may exceed who actually attended; omit if no calendar match)
> Speakers: N distinct voices — You = [[Your Name]]; Dana Okafor = [[Dana Okafor]] (named by the source app); Speaker 2 → unidentified. (note any invited-vs-present gap and substantial Unattributed share)

## Meeting Summary

(A strong 2-4 paragraph narrative summary capturing the substance. What was
the meeting about? Key themes? Decisions made? Directions set? Energy/vibe?
Should read like a well-written recap someone who wasn't there could
understand.)

## Context & changes

(How this meeting connects to what your notes already knew — from the context lookup.
Only what genuinely applies, each with a cited [[wikilink]]/path. Omit the whole section
if there's no real prior context; never manufacture connections.)
- **Contradicts** — [[prior note]]: what conflicts
- **Answers** — [[open thread]]: what this resolves
- **New** — [[Entity]]: first appearance in your notes
- **Updates** — [[project/session]]: what moved forward

## Key Topics

(Organized by discussion thread — use subheadings for distinct topics)

## People

List every distinct speaker, named or not, so who-said-what stays legible even when a voice can't be named.

| Speaker | Identity | Role/Context |
|---------|----------|-------------|
| You | [[Your Name]] | — |
| Dana Okafor | [[Dana Okafor]] (named by the source app) | context/role from this meeting |
| Speaker 2 | unidentified | any cue heard, else leave blank |

## Action Items
- [ ] Task description — owner if known

## Project References
- [[Existing Project]] — what was discussed, potential next steps

## Blog Ideas
- **Idea title** — why it's worth writing about, angle to take

## Knowledge Graph
- [[Entity A]] <-> [[Entity B]] — nature of relationship/connection

## Concepts
- [[Concept Name]] — brief description and why it matters

## Ideas
- Idea description — enough context to act on later

## Key Quotes
> "Notable quote" — [[Speaker]]
```

## Extraction Reference

Identity resolution and enrichment-over-duplication follow your own rules in `SCHEMA_FILES` if you have them; otherwise, follow this exactly. Key points:

- **Defer on doubt.** Better 30 pending entries to review than two people silently merged.
- **First-name-only with no context** → `_pending/` with `status: needs_review` and `ambiguity:` field.
- **Wikilink every entity in the body**, even if no file exists yet.
- **Bare filenames only:** `[[Name]]`, never `[[ENTITY_DIR/people/Name]]`.
- **Products are NOT extracted.** They are created manually. Red product wikilinks are by design.

### Person File (when creating new)

Path: `ENTITY_DIR/people/<Canonical Name>.md`:

```markdown
---
type: person
description: "~150 chars: who this person is and their relevance"
status: active
created: YYYY-MM-DD
modified: YYYY-MM-DD
canonical_id: "email@example.com"   # or firstname-lastname-org slug
aliases: ["Nat", "Natalia Reyes"]
email: "email@example.com"
company: "Organization Name"
role: "Title"
relationship: [network]   # REQUIRED array — vocab + Known vs Reference rules, see SCHEMA_FILES if you have one
projects: ["[[project-name]]"]
how-we-met: "Short context"   # known people only — never on [reference]
last-contact: YYYY-MM-DD      # known people only — never on [reference]
tags: []
---

# Canonical Name

2-4 sentences distilled from the meeting: role, company, what they're working on, how they connected with you. Only facts clearly about THIS attendee.

## Appearances

- [[YYYY-MM-DD_HHmm_slug]] (YYYY-MM-DD)
```

### Person Enrichment (when match found)

- Add `email` if frontmatter has no `email:` and we now have one
- Append wikilink to `## Appearances` only if not already present
- Update `modified:` to today
- Update `last-contact:` if newer
- Add this source's project to `projects:` array if missing
- Append a sentence or two to the body if the meeting reveals NEW facts (new role, company, project) — never rewrite existing text

### Organization File (when creating new)

Path: `ENTITY_DIR/organizations/<Org Name>.md`:

```markdown
---
type: organization
description: "~150 chars: what this org is and how it relates to the work"
status: active
created: YYYY-MM-DD
modified: YYYY-MM-DD
canonical_id: "org-name-slug"
aliases: ["Old Name", "Acronym"]
relationship: [network]   # REQUIRED array — vocab: client | partner | prospect | vendor | network | own | reference
projects: ["[[project-name]]"]
tags: []
---

# Org Name

2-4 sentences: what they do, how they relate to your work, any current engagement.

## Appearances

- [[YYYY-MM-DD_HHmm_slug]] (YYYY-MM-DD)
```

### Concept File (when creating new)

Path: `ENTITY_DIR/concepts/<Concept Name>.md`:

```markdown
---
type: concept
description: "~150 chars: what this concept is and why it matters"
status: active
created: YYYY-MM-DD
modified: YYYY-MM-DD
canonical_id: "concept-name-slug"
aliases: ["Alternative Name"]
target_project: "primary-project-name"
projects: ["[[project-name]]"]
hub: "[[Area MOC]]"   # see hub rules in SCHEMA_FILES if you have one
tags: []
---

# Concept Name

## What is it?
[1-3 paragraph definition]

## Why it matters
[1-3 paragraph strategic implication]

## Connections
- [[Related Concept]] — how they relate

## Sources
- [[YYYY-MM-DD_HHmm_slug]] — Specific paragraph describing what THIS source contributed.
```

Hub assignment: pick from existing area MOCs only, if you use them. When in doubt, leave `hub: ""`. NEVER create new area MOCs.

Concept granularity: **stance/frame-level, not phrase-level.** Phrase-level observations stay in the meeting summary body. Check the entity directory first — enrich an existing concept's `## Sources` rather than creating duplicates.

### Concept Enrichment (when match found)

- Append a paragraph to `## Sources` describing what THIS source contributed, with a bare wikilink to the note file
- Update `modified:` to today
- Add this source's project to `projects:` array if missing
- Do not rewrite existing What is it / Why it matters sections — append to Sources only

### Pending Deferral

Path: `ENTITY_DIR/{people,organizations,concepts}/_pending/<provisional name>.md`:

```yaml
---
type: person | organization | concept
status: needs_review
ambiguity: "First-name-only reference 'Sam'; could be [[Sam Ito]] or [[Sam Delgado]]"
extracted_from: "[[YYYY-MM-DD_HHmm_slug]]"
created: YYYY-MM-DD
---
```

ALWAYS surface deferrals in the agent's return message with the reason.

### Decision Proposal

Path: `ENTITY_DIR/records/_pending/YYYY-MM-DD_<slug>.md` (date = `decided`).

```yaml
---
type: decision
description: "Kickoff phase run as async written updates instead of a weekly call, in exchange for full transcript access"
status: needs_review
proposed_status: made        # what it becomes on ratification: made | open | superseded
created: YYYY-MM-DD
decided: 2026-07-31
owner: "[[Dana Okafor]]"
scope_level: project
chose: "async written updates in a shared document, with full transcript access to project meetings"
over: "a standing weekly status call"
binds: "how project updates move between the two teams for the length of the engagement"
foreclosure: explicit
decider: human
source: "[[2026-07-31_1022_northgate-kickoff]]"
projects: ["[[Northgate Studio]]"]
domain: []
tags: [working-mode]
---
```

```markdown
# Async updates over weekly calls for the Northgate kickoff

One paragraph: what was chosen, against what, and what it now constrains.

## Evidence

> "We're happy to skip the weekly call if we get full access to the transcripts instead."
> — Dana Okafor, 2026-07-31

## Open

Anything genuinely unresolved by the decision (omit if nothing).
```

For an **open** decision: `proposed_status: open`, omit `chose`/`over`/
`foreclosure`, put the question in `description` and the alternatives in the
body, add `deadline: YYYY-MM-DD` when one was stated.
For a **reported** decision: add `reported: true`, name the reporting speaker
in the body, and say plainly that `decided` is approximate.

## What NOT To Do

- Never write to the source app except the orchestrator's `ingested`/`skipped` tags — no title, summary, chapter, or action-point edits in this skill
- Never tag a meeting `ingested` before verifying the note file exists
- Never write outside `NOTES_DIR` / `ENTITY_DIR`
- Never create duplicate person/org/concept files — check the entity directory first, enrich existing
- Never extract products — they are manually created
- Never modify Dataview or Tasks query blocks in any note
- Never fabricate information not present in the transcript
- Never create new project files — only reference existing ones
- Never set `extraction_status: pending` as a resting state — it must be `processed` by the time the agent returns
- Never use path-qualified wikilinks — bare filenames only
- Never create new area MOCs to host a new concept — use `hub: ""` instead
- Don't create entity files for first-name-only references without clear context — defer to `_pending/`
- Don't process medical appointments or recording setup conversations
- Don't rely on the source app's stored summary — always read the actual transcript
- Never count `Unattributed` segments as a person — but do read them, they carry real content
- Never create task-system todos for items owned by anyone but you
- Never write a decision record outside `ENTITY_DIR/records/_pending/` — extraction proposes, you ratify
- Never turn a decision into a task-system todo, or a task into a decision record — a task is work to do, a decision constrains how work happens
- Never pad decision proposals to look productive — zero is a normal finding
- Never set a start date on captured task-system todos, and never invent deadlines
- Never let subagents write to the source app or the task system — both happen in the orchestrator (Step 4)
- Don't append to daily notes unless that's part of your own notes system
