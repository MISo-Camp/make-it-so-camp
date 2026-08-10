# tokyo-agenda — 2026-08-10

Record kept in the repo (code + site artifacts live here; the vault holds the
thinking). Deliverable: hidden participant agenda page at `/tokyo/agenda/`,
reached by QR from the printed name cards.

## agenda-build (dispatch)

ROUTE: /tokyo/agenda page → default (spec: writing myself → build: omlx local typist) — copy selection and register are the judgment; the Astro wiring is mechanical.
SPEC: writing myself — the content decisions (what of the internal run of show is participant-safe, and the site's voice) are the actual work; briefing that out would cost more than writing it.

Brief: `/tmp/crew-brief-agenda-build.md`
Plan: `docs/plans/2026-08-10-tokyo-agenda.md` (committed bd4e29a before dispatch)
Run: `run_260b76d505c2` · Task: `task_7b6bfa0d0298` · Dispatch: `ctx_0ce70d2a529b`
Worker: `pi --model omlx/Qwopus3.6-27B-v2-MLX-4bit`, branch `agenda-page`
Expects: `astro/src/pages/new/tokyo/agenda.astro`, `astro/src/components/Programme.astro`, rebuilt root output, screenshots in `/tmp`

Design decisions made by the coordinator before dispatch:

- The run of show is internal. Demo owners, prep list, open questions and
  room-management notes are stripped; what ships is the arc, the blocks, the
  times, what you leave each block with, and practicalities.
- Hidden means hidden: `noindex, nofollow`, no nav link, absent from
  `sitemap.xml`, `llms.txt` and `robots.txt`. No `Disallow` line — it would
  publish the URL and block crawlers from reading the noindex tag.
- Two structural changes were needed: `BaseLayout` hardcoded `index, follow`
  (now an optional `robots` prop), and `build-production.mjs` asserted that
  directive on every shipped page (now a noindex carve-out that asserts the
  agenda IS noindex).
- New `Programme` component — time / title / kicker / description / takeaway.
  Neither `.sched` nor `.day-row` carried a block with both a description and
  a takeaway. Existing type scale, rules and accent; no new visual language.
- Day 2's end time is genuinely unset, so the page says the day finishes in
  time to travel and invents no clock.
- Register follows the site, not the PDF.

## agenda-build (completion)

1. git: bd4e29a..5fbaa8a on `agenda-page` (6 commits); tree clean apart from pre-existing untracked files
2. tests: n/a — no suite in this repo. Equivalent: `npm run build:production` guards, rerun by the coordinator → `PASS production artifact: 5 root pages (1 unlisted noindex), root URLs, zero scripts, root CSS`
3. behavior: agenda is `noindex, nofollow`; the other five pages still `index, follow`; zero `/new/` refs in the agenda; canonical `https://misocamp.com/tokyo/agenda/`; zero client scripts; the string "agenda" appears 0 times in index.html, tokyo/index.html, adelaide/index.html, about/index.html, sitemap.xml, robots.txt, llms.txt, llms-full.txt
4. screenshots: /tmp/agenda-d900.png (1440x900), /tmp/agenda-m500.png (500x844), plus the worker's full-page /tmp/agenda-desktop.png, /tmp/agenda-mobile.png. Coordinator reviewed all. One real defect found and fixed: stacked `.cols` collided on mobile because the last paragraph in each column has no bottom margin — one rule added in the existing 820px media query, which also fixes the same collision on /tokyo/ and /about/. Not verified on a real phone.
5. merged/deployed: NOT merged — held on `agenda-page` for Igor's review before anything goes live

## agenda-build (evaluate)

Rubric: knowledge (`~/.claude/agent_docs/writing-register.md` plus assignment lines)
Findings: 4 at `docs/crew/2026-08-10-agenda-eval-findings.md` (evaluator: pi/zai-coding-cn/glm-5.2, task_ac200e230f1b)
Verdict: 1 accepted, 3 rejected on provenance.

- Accepted: "the clock bends around the room" — coordinator's own invention, an
  invented flourish where `[camp].astro` states the same fact plainly. Replaced
  with "how long each one takes depends on the room" (5fbaa8a).
- Rejected: the Shift 1 kicker, "challengeable, improvable, re-runnable", and
  "Find your tribe" are Igor's own words carried verbatim from the run of show,
  which he explicitly asked to adopt. The evaluator had no provenance signal.
  Surfaced to him rather than rewritten.

## failures

- none
