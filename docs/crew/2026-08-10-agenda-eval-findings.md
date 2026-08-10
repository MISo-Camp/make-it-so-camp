# Agenda copy evaluation — findings

Evaluator: worker task_ac200e230f1b (findings only, no score/verdict).
Scope: participant-facing copy in
`astro/src/pages/new/tokyo/agenda.astro` — `dayOne`/`dayTwo` arrays
(title, kicker, body, takeaway), `<Hero>` props, `lead-statement`
paragraphs, "Before you come" paragraphs, and `<dl class="facts">`.
Rubric: `~/.claude/agent_docs/writing-register.md` (read in full) plus the
assignment's additional lines. Voice register checked against
`astro/src/pages/new/[camp].astro` and `astro/src/data/camps.ts`.

Format: `- <file>:<line> — "<exact quote>" — violates: <rubric line>`

## Findings

- `astro/src/pages/new/tokyo/agenda.astro:93` — "the clock bends around the room" — violates: "Register must match the existing site, not a slide deck or a PDF." Invented imagery where the sibling page states the same idea plainly ("Times are indicative — the exact rhythm may shift", `[camp].astro`). The register calls for observational, journalistic prose; "the clock bends" is a small invented flourish rather than the plain fact.

- `astro/src/pages/new/tokyo/agenda.astro:18` — "Automation is where it starts. The value is the work that was not possible before." — violates: '"It\'s this, not that" constructions.' The second sentence reframes value away from the automation just named toward the previously-impossible work — a contrastive pivot in the "the real X is not A, it is B" shape. (Secondary read: it also edges toward an overclaim — "the value is the work that was not possible before" — against "Claims carry evidence; nothing promises an outcome the workshop cannot deliver.")

- `astro/src/pages/new/tokyo/agenda.astro:34` — "Written down, a method becomes challengeable, improvable, re-runnable." — violates: "Tyranny of three: obsessive triplets of adjectives, verbs, concepts." Three parallel `-able` adjectives in a row is the rhetorical-triplet cadence the register flags.

- `astro/src/pages/new/tokyo/agenda.astro:48` — "Find your tribe" — violates: "Register must match the existing site, not a slide deck or a PDF" (and "Action titles describe what a section contains; headlines never dramatize"). "Tribe" is a buzzy/marketing metaphor for the team-formation block; the sibling schedule states the same activity plainly ("Form teams, or go solo", `camps.ts`). The title reaches for a cultural cliché where a plain action title would do.

## Coverage — rubric lines checked, no findings

- clean: "It's this, not that" constructions — one instance found (line 18, above); no further explicit "not X but Y" / "less about A, more about B" forms in scope. Plain negatives ("we are not handing out accounts") and ability negatives ("could not do at all") are not contrastive reframes.
- clean: Dramatized headlines — section titles ("Before you come", "Day 1 · Articulate", "Day 2 · Build and demo", "Practicalities", "What happens, and when.") describe their contents; no mystery-reveal or unearned-tension titles. (Kicker aphorism quality is handled under "Poetic aphorism landings" below.)
- clean: Em-dash overuse — verified per cell/paragraph; no paragraph carries more than one em-dash (Welcome body, "What to bring" para, Shift 2b takeaway, Day 2 Build body, Day 2 Share-out body each use exactly one). Sparing use only.
- clean: Superlatives and performative praise — no "best/most/sharpest/ultimate"-class language present.
- clean: Moral wrap-up endings — no "Ultimately," / "In conclusion," + balanced-uplift landings; endings stay concrete or open ("that is the documentation of the two days", "We finish in time to travel").
- clean: Word bank — none of delve, foster, leverage, demystify, resonate, spearhead, streamline, tapestry, beacon, testament, plethora, synergy, paradigm, moreover, furthermore, crucially, "it's worth noting" appear.
- clean: Symmetric sandwich — copy is not built as intro-restating-ask → bolded bullets → tidy-summary; shape varies (blocks, cols, facts list).
- clean: Uniform cadence — rhythm varies; fragments and lowercase takeaways ("three hops for your own work, one of them circled.") break even cadence.
- clean: Over-explaining — no "This means…" restatements; the copy trusts the reader.
- clean: Over-hedging — stances taken directly; no "While X is certainly true, we must also consider Y" patterns.
- clean: Earnest politeness openers — N/A (UI copy, no chat openers).
- clean: No language mixing — English throughout; date ranges use en-dashes correctly.
- clean: Client-facing copy shorter and plainer than feels natural — the copy is tight and plain overall; most cells are a single concrete sentence.

## Considered, not flagged (noted for coordinator visibility — not findings)

- `astro/src/pages/new/tokyo/agenda.astro:24` — "You cannot delegate what you cannot articulate." — this is an aphorism in the "neat punchy truism" shape, but it is the verbatim camp thesis ("Thesis: You cannot delegate what you cannot articulate.", repo `AGENTS.md`), used once as a load-bearing line rather than as decorative slop. Left out of the findings above for that reason; flagging it would second-guess the deliberate brand line.
- `astro/src/pages/new/tokyo/agenda.astro:19` — "Demos of systems that are actually in use, run from the simple to the strange." — "the simple to the strange" has a faint paired-abstraction cadence, but it describes a concrete spectrum (escalating complexity) and is not decorative triplet-slop.
- `astro/src/pages/new/tokyo/agenda.astro:42` — "Explicit expertise is coordinable." — terse maxim as a kicker; reads as a plain block thesis rather than a poetic landing, so not flagged under "Poetic aphorism landings."
- `astro/src/pages/new/tokyo/agenda.astro:21` — "what gets faster, what becomes more, and the thing you could not do at all." — a three-part list, but it is the literal structure of the "three hops" exercise (mirrored in the takeaway "three hops"), not rhetorical triplet cadence.
