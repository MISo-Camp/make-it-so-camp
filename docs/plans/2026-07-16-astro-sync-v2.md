# Astro Sync V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Astro staging track to full content parity with the current static `/new/` pages, rebuild `new/astro/`, and verify the published staging artifact.

**Architecture:** The static files under `new/` remain the source of truth. The Astro track stays self-contained under `astro/`, with shared page structure in components/layouts, camp-specific content in `astro/src/data/camps.ts`, static CSS in `astro/public/new/miso.css`, and generated staging output in `new/astro/` via `astro/scripts/build-staging.mjs`.

**Tech Stack:** Astro 7.0.9, TypeScript 6.0.3, plain HTML/CSS, Node/npm, existing `npm run build:staging` publisher.

## Global Constraints

- Work only in `/Users/zeigor/GitHub/make-it-so-camp`.
- Create branch `astro-sync` from current `master`.
- Static source-of-truth files are `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`, and `new/miso.css`.
- Do not touch static `new/*.html` pages, root site files, `CNAME`, `_session.md`, or workspace state files.
- Allowed implementation paths: `astro/**`, `new/astro/**`, and this plan file.
- Keep Astro staging pages `noindex, nofollow` after rebuild.
- Do not introduce references to `/new/styles.css`.
- Banned phrases must be absent from `new/astro/`: `supporting partner`, `Supported by`, `with SA Futures Agency as`.
- Schedule copy must be byte-identical to the static camp pages.
- If any task fails twice, STOP. Do not improvise around the failure; report the exact command and output.
- Screenshot ports, if screenshots are taken: `http.server` port `8810`, Chrome/CDP port `9426`; block if either port is occupied. Never use port `8765`.
- One commit per task with the exact messages specified below.

## File Structure

- Modify `astro/src/data/camps.ts`: camp facts, hero collaboration line, and shared two-day schedule data.
- Modify `astro/src/components/Hero.astro`: render optional `.hero-sub` copy between the hero statement and CTA.
- Modify `astro/src/pages/new/[camp].astro`: add Schedule nav anchor, render `.hero-sub`, add schedule section, and renumber Logistics/Request to 04/05.
- Modify `astro/src/pages/new/index.astro`: update Adelaide hub card facts to match `new/index.html`.
- Modify `astro/src/pages/new/about.astro`: update Adelaide collaborator line to match `new/about/index.html`.
- Modify `astro/public/new/miso.css`: copy byte-for-byte from `new/miso.css`.
- Regenerate `new/astro/**`: run the existing Astro staging build path.

## Preflight: branch and source confirmation

- [ ] **Step 1: Enter the repo and confirm current state**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git status --short --branch
```

Expected: branch is `master...origin/master`; only known pre-existing untracked files may appear (`.superpowers/`, `MISo Camp - Sponsorship Deck v2.md`, `partnership-deck.html`). If tracked files are dirty, STOP before editing.

- [ ] **Step 2: Create the implementation branch from current master**

```bash
git switch master
git pull --ff-only origin master
git switch -c astro-sync
```

Expected: new branch `astro-sync` created from current `master`.

- [ ] **Step 3: Re-read source-of-truth files before editing**

```bash
python3 - <<'PY'
from pathlib import Path
for path in [
    'new/index.html',
    'new/tokyo/index.html',
    'new/adelaide/index.html',
    'new/about/index.html',
    'new/miso.css',
    'astro/scripts/build-staging.mjs',
    'astro/package.json',
]:
    p = Path(path)
    print(f'READ {path}: {p.stat().st_size} bytes')
PY
```

Expected: all files exist and print byte counts. If any source-of-truth file is missing, STOP.

### Task 1: Update Astro sources for static `/new/` v2 parity

**Files:**
- Modify: `astro/src/data/camps.ts`
- Modify: `astro/src/components/Hero.astro`
- Modify: `astro/src/pages/new/[camp].astro`
- Modify: `astro/src/pages/new/index.astro`
- Modify: `astro/src/pages/new/about.astro`
- Modify: `astro/public/new/miso.css`

**Interfaces:**
- Consumes: static `/new/` source copy and the existing Astro component/data architecture.
- Produces: `Camp.heroSub: string`, `Camp.schedule: CampScheduleDay[]`, a Hero component with optional `heroSub`, camp pages with `#schedule`, and an Astro stylesheet matching `new/miso.css`.

- [ ] **Step 1: Replace `astro/src/data/camps.ts` with current camp data and schedule slots**

```bash
cat > astro/src/data/camps.ts <<'EOF'
export interface CampFactsRow {
  /** Term, e.g. "Dates", "Venue", "In collaboration with". */
  term: string;
  /** Value cell. */
  value: string;
}

export interface CampScheduleSlot {
  time: string;
  title: string;
}

export interface CampScheduleDay {
  day: 'Day 1' | 'Day 2';
  slots: CampScheduleSlot[];
}

export interface Camp {
  /** URL slug, also the getStaticPaths param. */
  slug: 'tokyo' | 'adelaide';
  /** <title> contents. */
  title: string;
  /** <meta name="description"> contents. */
  description: string;
  /** og:description / twitter:description. */
  ogDescription: string;
  /** Hero <h1> statement, including trailing period. */
  statement: string;
  /** Hero collaboration line. */
  heroSub: string;
  /** Hero meta line after the middot, e.g. "Tokyo · 24–25 August 2026". */
  metaLine: string;
  /** Mailto subject slug without the host, percent-encoded, e.g. "Tokyo%20invitation%20request". */
  subject: string;
  /** Overview lead-statement text before the <span class="dim">. */
  overviewLead: string;
  /** Overview lead-statement dim text. */
  overviewDim: string;
  /** Overview left column paragraphs, in order. */
  overviewLeft: string[];
  /** Overview right column paragraphs, in order. */
  overviewRight: string[];
  /** Schedule days and slots, in order. */
  schedule: CampScheduleDay[];
  /** Logistics facts rows, in order. */
  facts: CampFactsRow[];
}

const sharedSchedule: CampScheduleDay[] = [
  {
    day: 'Day 1',
    slots: [
      { time: '09:00', title: 'Welcome + frame' },
      { time: '10:00', title: "Methods you can't see" },
      { time: '11:40', title: 'Lunch' },
      { time: '12:40', title: 'Write it down, it compounds' },
      { time: '14:15', title: 'Explicit = shareable' },
      { time: '15:30', title: 'Form teams, or go solo' },
      { time: '16:15', title: 'Networking drinks' },
    ],
  },
  {
    day: 'Day 2',
    slots: [
      { time: '09:00', title: 'Re-entry' },
      { time: '09:15', title: 'Morning frame: lock the build' },
      { time: '09:45', title: 'Build I' },
      { time: '11:15', title: 'Mid-build crit' },
      { time: '11:45', title: 'Lunch' },
      { time: '12:30', title: 'Build II' },
      { time: '14:00', title: 'Demo rounds' },
      { time: '14:45', title: 'Wrap, early finish' },
    ],
  },
];

export const camps: Camp[] = [
  {
    slug: 'tokyo',
    title: 'Make It So Camp Tokyo — 24–25 August 2026',
    description: 'Make It So Camp Tokyo is a two-day AI workshop at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology.',
    ogDescription: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    statement: 'Make It So Camp Tokyo.',
    heroSub: 'In collaboration with Chiba Institute of Technology.',
    metaLine: 'Tokyo · 24–25 August 2026',
    subject: 'Tokyo%20invitation%20request',
    overviewLead: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    overviewDim: 'This page is what to expect in Tokyo.',
    overviewLeft: [
      'Make It So Camp Tokyo runs over two days at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.',
      'You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.',
    ],
    overviewRight: [
      'Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.',
      'You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.',
    ],
    schedule: sharedSchedule,
    facts: [
      { term: 'Dates', value: '24–25 August 2026' },
      { term: 'Venue', value: 'Crypto Café Tokyo' },
      { term: 'In collaboration with', value: 'Chiba Institute of Technology' },
      { term: 'Format', value: 'Two days, hands-on' },
      { term: 'Cohort', value: 'Deliberately mixed: academic, creative industries, corporate' },
      { term: 'Bring', value: 'A real problem you are working on' },
    ],
  },
  {
    slug: 'adelaide',
    title: 'Make It So Camp Adelaide — 17–18 September 2026',
    description: 'Make It So Camp Adelaide is a two-day AI workshop in Adelaide, in collaboration with Flinders University New Venture Institute and SA Futures Agency.',
    ogDescription: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    statement: 'Make It So Camp Adelaide.',
    heroSub: 'In collaboration with Flinders University New Venture Institute and SA Futures Agency.',
    metaLine: 'Adelaide · 17–18 September 2026',
    subject: 'Adelaide%20invitation%20request',
    overviewLead: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    overviewDim: 'This page is what to expect in Adelaide.',
    overviewLeft: [
      'Make It So Camp Adelaide runs over two days in Adelaide, in collaboration with Flinders University New Venture Institute and SA Futures Agency. The venue will be announced. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.',
      'You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.',
    ],
    overviewRight: [
      'Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.',
      'You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.',
    ],
    schedule: sharedSchedule,
    facts: [
      { term: 'Dates', value: '17–18 September 2026' },
      { term: 'Venue', value: 'TBD' },
      { term: 'In collaboration with', value: 'Flinders University New Venture Institute and SA Futures Agency' },
      { term: 'Format', value: 'Two days, hands-on' },
      { term: 'Cohort', value: 'Deliberately mixed: academic, creative industries, corporate' },
      { term: 'Bring', value: 'A real problem you are working on' },
    ],
  },
];

export function getCamp(slug: string): Camp {
  const camp = camps.find((c) => c.slug === slug);
  if (!camp) throw new Error(`Unknown camp slug: ${slug}`);
  return camp;
}
EOF
```

- [ ] **Step 2: Replace `astro/src/components/Hero.astro` so it can render the collaboration line**

```bash
cat > astro/src/components/Hero.astro <<'EOF'
---
export interface Props {
  /** Left meta label, e.g. "By invitation" or "About". */
  leftMeta: string;
  /** Right meta line, typically "Two-day AI workshop<br>...". May contain HTML. */
  rightMeta: string;
  /** Hero <h1> text. */
  statement: string;
  /** Optional small-statement modifier for camp/about pages. */
  small?: boolean;
  /** Optional inline min-height style override, e.g. "48svh". */
  minHeight?: string;
  /** Optional collaboration/supporting line below the statement. */
  heroSub?: string;
  /** Optional CTA. When provided, renders the hero-cta block. */
  cta?: { href: string; label: string };
}

const { leftMeta, rightMeta, statement, small, minHeight, heroSub, cta } = Astro.props;
---
<section class="hero" style={minHeight ? `min-height:${minHeight}` : undefined}>
  <div class="hero-top">
    <p class="meta light">{leftMeta}</p>
    <p class="meta" set:html={rightMeta} />
  </div>
  <div class="spacer"></div>
  <h1 class={`statement${small ? ' statement-sm' : ''}`}>{statement}</h1>
  {heroSub && (
    <p class="hero-sub">{heroSub}</p>
  )}
  {cta && (
    <p class="hero-cta"><a href={cta.href}>{cta.label}</a></p>
  )}
</section>
EOF
```

- [ ] **Step 3: Replace `astro/src/pages/new/[camp].astro` with the v2 camp template**

```bash
cat > 'astro/src/pages/new/[camp].astro' <<'EOF'
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import Footer from '../../components/Footer.astro';
import { camps, getCamp } from '../../data/camps';

export function getStaticPaths() {
  return camps.map((camp) => ({ params: { camp: camp.slug } }));
}

const camp = getCamp(Astro.params.camp as string);
const rightMeta = `Two-day AI workshop<br><span class="light">${camp.metaLine}</span>`;
const requestHref = `mailto:hello@misocamp.com?subject=${camp.subject}`;
---
<BaseLayout
  title={camp.title}
  description={camp.description}
  canonicalPath={`/new/${camp.slug}/`}
  ogDescription={camp.ogDescription}
  twitterDescription={camp.ogDescription}
>
  <Header links={[
    { label: 'Overview', href: '#overview' },
    { label: 'The two days', href: '#days' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Logistics', href: '#logistics' },
    { label: 'About', href: '/new/about/' },
    { label: 'Request an invitation', href: '#request', accent: true },
  ]} />

  <Hero
    leftMeta="By invitation"
    rightMeta={rightMeta}
    statement={camp.statement}
    small={true}
    minHeight="48svh"
    heroSub={camp.heroSub}
    cta={{ href: requestHref, label: 'Request an invitation ↗' }}
  />

  <section class="section" id="overview" aria-labelledby="overview-label">
    <div class="section-label"><span class="num">01</span><span class="label" id="overview-label">Overview</span></div>
    <p class="lead-statement">{camp.overviewLead} <span class="dim">{camp.overviewDim}</span></p>
    <div class="cols">
      <div>
        {camp.overviewLeft.map((p) => <p>{p}</p>)}
      </div>
      <div>
        {camp.overviewRight.map((p) => <p>{p}</p>)}
      </div>
    </div>
  </section>

  <section class="section" id="days" aria-labelledby="days-label">
    <div class="section-label"><span class="num">02</span><span class="label" id="days-label">The two days</span></div>
    <p class="lead-statement">Hands-on from the first hour. <span class="dim">Theory only ever names what you have already experienced.</span></p>
    <div class="day-list" style="margin-top:clamp(2rem,3.5vw,3rem)">
      <div class="day-row">
        <p class="day-label">Before</p>
        <div>
          <h3>A map of the room.</h3>
          <p>We ask everyone beforehand what they are working on and how they work today. Day 1 starts from what is actually in the room, not from a round of introductions.</p>
        </div>
      </div>
      <div class="day-row">
        <p class="day-label">Day 1</p>
        <div>
          <h3>Articulate.</h3>
          <p>A sequence of short working blocks, each ending hands-on. You surface the steps, assumptions, and quality signals behind your real problem, write them down, and test with people from other fields whether your method actually transfers. The day ends with choosing what to build — and with whom, or solo.</p>
        </div>
      </div>
      <div class="day-row">
        <p class="day-label">Day 2</p>
        <div>
          <h3>Build and demo.</h3>
          <p>Working blocks with the tools, building from the method you wrote down, with a mid-point critique to catch wrong turns early. The day ends in demo rounds in small groups — not show-and-tell, but what did your way of working make possible — and finishes early enough to travel.</p>
        </div>
      </div>
      <div class="day-row">
        <p class="day-label">After</p>
        <div>
          <h3>The method stays.</h3>
          <p>What you wrote down is yours: a working method your team can read, question, and improve — and a starting point that compounds with every next build.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="schedule" aria-labelledby="schedule-label">
    <div class="section-label"><span class="num">03</span><span class="label" id="schedule-label">The schedule</span></div>
    <p class="lead-statement">What happens on those two days. <span class="dim">Times are indicative — the exact rhythm may shift.</span></p>
    <div class="sched">
      {camp.schedule.map((day) => (
        <div>
          <h3>{day.day}</h3>
          {day.slots.map((slot) => (
            <div class="slot"><span class="slot-time">{slot.time}</span><span>{slot.title}</span></div>
          ))}
        </div>
      ))}
    </div>
  </section>

  <section class="section" id="logistics" aria-labelledby="logistics-label">
    <div class="section-label"><span class="num">04</span><span class="label" id="logistics-label">Logistics</span></div>
    <dl class="facts">
      {camp.facts.map((row) => (
        <>
          <dt>{row.term}</dt>
          <dd>{row.value}</dd>
        </>
      ))}
    </dl>
  </section>

  <section class="section invite" id="request" aria-labelledby="request-label">
    <div class="section-label"><span class="num">05</span><span class="label" id="request-label">Request an invitation</span></div>
    <p class="lead-statement" style="margin-bottom:1.6rem">Tell us what work you would bring, and why now. <span class="dim">We reply if there is a fit.</span></p>
    <p class="email"><a href={requestHref}>hello@misocamp.com</a></p>
  </section>

  <Footer />
</BaseLayout>
EOF
```

- [ ] **Step 4: Update the Astro homepage Adelaide card to match `new/index.html`**

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/pages/new/index.astro')
text = path.read_text()
old = '''      <div class="camp">
        <h2>Adelaide</h2>
        <dl>
          <dt>Dates</dt><dd>17–18 September 2026</dd>
          <dt>Venue</dt><dd>Flinders University New Venture Institute</dd>
          <dt>Partner</dt><dd>with SA Futures Agency</dd>
        </dl>
        <p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>
      </div>'''
new = '''      <div class="camp">
        <h2>Adelaide</h2>
        <dl>
          <dt>Dates</dt><dd>17–18 September 2026</dd>
          <dt>Venue</dt><dd>TBD</dd>
          <dt>Partner</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>
        </dl>
        <p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>
      </div>'''
if old not in text:
    raise SystemExit('Expected old Adelaide homepage card not found')
path.write_text(text.replace(old, new))
PY
```

- [ ] **Step 5: Update the Astro About collaborators line to match `new/about/index.html`**

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/pages/new/about.astro')
text = path.read_text()
old = '<dt>Adelaide</dt><dd>Flinders University New Venture Institute, with SA Futures Agency as a supporting partner</dd>'
new = '<dt>Adelaide</dt><dd>In collaboration with Flinders University New Venture Institute and SA Futures Agency</dd>'
if old not in text:
    raise SystemExit('Expected old Adelaide About collaborator line not found')
path.write_text(text.replace(old, new))
PY
```

- [ ] **Step 6: Copy the current static stylesheet into Astro public assets**

```bash
cp new/miso.css astro/public/new/miso.css
cmp -s new/miso.css astro/public/new/miso.css
```

Expected: `cmp` exits 0. This carries `.hero-sub`, `.sched`, `.slot`, `.slot-time`, and `.nav { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:0.6rem 1.3rem; font-weight:500; }` into Astro.

- [ ] **Step 7: Run Astro type/content check**

```bash
cd astro
npm run check
cd ..
```

Expected: Astro check completes with zero errors. If dependencies are missing, run `cd astro && npm install && npm run check && cd ..` once; if it fails again, STOP.

- [ ] **Step 8: Source-level parity smoke checks before commit**

```bash
grep -F "heroSub: 'In collaboration with Chiba Institute of Technology.'" astro/src/data/camps.ts
grep -F "heroSub: 'In collaboration with Flinders University New Venture Institute and SA Futures Agency.'" astro/src/data/camps.ts
grep -F "{ time: '14:45', title: 'Wrap, early finish' }" astro/src/data/camps.ts
grep -F "{ label: 'Schedule', href: '#schedule' }" 'astro/src/pages/new/[camp].astro'
grep -F '<span class="num">05</span><span class="label" id="request-label">Request an invitation</span>' 'astro/src/pages/new/[camp].astro'
grep -F '<dt>Venue</dt><dd>TBD</dd>' astro/src/pages/new/index.astro
grep -F '<dt>Adelaide</dt><dd>In collaboration with Flinders University New Venture Institute and SA Futures Agency</dd>' astro/src/pages/new/about.astro
grep -F '.hero-sub' astro/public/new/miso.css
grep -F '.sched' astro/public/new/miso.css
grep -F 'flex-wrap:wrap; justify-content:flex-end; gap:0.6rem 1.3rem;' astro/public/new/miso.css
```

Expected: every grep prints exactly the matching line.

- [ ] **Step 9: Commit Task 1**

```bash
git add astro/src/data/camps.ts astro/src/components/Hero.astro 'astro/src/pages/new/[camp].astro' astro/src/pages/new/index.astro astro/src/pages/new/about.astro astro/public/new/miso.css
git commit -m "feat: sync Astro sources with camp v2 content"
```

### Task 2: Rebuild and republish Astro staging output

**Files:**
- Modify: `new/astro/index.html`
- Modify: `new/astro/tokyo/index.html`
- Modify: `new/astro/adelaide/index.html`
- Modify: `new/astro/about/index.html`
- Modify: `new/astro/miso.css`

**Interfaces:**
- Consumes: Task 1 Astro sources and existing `astro/scripts/build-staging.mjs`.
- Produces: regenerated `new/astro/` staging preview with scoped `/new/astro/` links, `noindex, nofollow`, zero client scripts, and CSS parity with Astro public CSS.

- [ ] **Step 1: Install dependencies only if needed**

```bash
cd astro
if [ ! -d node_modules ]; then npm install; fi
cd ..
```

Expected: `astro/node_modules` exists. If `npm install` fails twice, STOP.

- [ ] **Step 2: Run the existing staging build path**

```bash
cd astro
npm run build:staging
cd ..
```

Expected final line from `scripts/build-staging.mjs`:

```text
PASS staging artifact: 4 pages, scoped links, noindex, zero scripts, CSS parity
```

- [ ] **Step 3: Verify the staging publisher regenerated the expected files**

```bash
test -f new/astro/index.html
test -f new/astro/tokyo/index.html
test -f new/astro/adelaide/index.html
test -f new/astro/about/index.html
test -f new/astro/miso.css
cmp -s astro/public/new/miso.css new/astro/miso.css
```

Expected: all commands exit 0.

- [ ] **Step 4: Verify noindex and scoped staging links**

```bash
for page in new/astro/index.html new/astro/tokyo/index.html new/astro/adelaide/index.html new/astro/about/index.html; do
  grep -F '<meta name="robots" content="noindex, nofollow">' "$page"
  grep -F '/new/astro/miso.css' "$page"
  ! grep -F '<script' "$page"
done
python3 - <<'PY'
from pathlib import Path
import re
for path in [
    'new/astro/index.html',
    'new/astro/tokyo/index.html',
    'new/astro/adelaide/index.html',
    'new/astro/about/index.html',
]:
    html = Path(path).read_text()
    if re.search(r'href="/new/(?!astro/)', html):
        raise SystemExit(f'unscoped /new/ link remains: {path}')
print('PASS scoped staging links')
PY
```

Expected: `grep` prints the robots and CSS lines for each page; script greps exit 0 through `!`; Python prints `PASS scoped staging links`.

- [ ] **Step 5: Confirm generated diff is limited to Astro staging output**

```bash
git status --short
git diff --name-only -- new/astro
```

Expected: generated changes are under `new/astro/`. Do not stage or edit static `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`, or `new/miso.css`.

- [ ] **Step 6: Commit Task 2**

```bash
git add new/astro
git commit -m "build: republish Astro staging preview"
```

### Task 3: Verify Astro v2 parity against static `/new/`

**Files:**
- No source files should change.
- Optional create: `docs/plans/astro-sync-v2-screenshots/` only if screenshots are taken.

**Interfaces:**
- Consumes: Task 2 regenerated `new/astro/` output and static `/new/` reference pages.
- Produces: verified content parity and one verification commit.

- [ ] **Step 1: Grep-present hero collaboration lines, Adelaide facts, and EMIR bio line**

```bash
grep -F 'In collaboration with Chiba Institute of Technology.' new/astro/tokyo/index.html
grep -F 'In collaboration with Flinders University New Venture Institute and SA Futures Agency.' new/astro/adelaide/index.html
grep -F '<dt>Venue</dt><dd>TBD</dd>' new/astro/adelaide/index.html
grep -F '<dt>Partner</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>' new/astro/index.html
grep -F '<dt>Adelaide</dt><dd>In collaboration with Flinders University New Venture Institute and SA Futures Agency</dd>' new/astro/about/index.html
grep -F "Managing Partner at EMIR" new/astro/about/index.html
grep -F "Futurist-in-Chief — founding executive of the Dubai Future Foundation and the Museum of the Future" new/astro/about/index.html
```

Expected: every grep prints a matching line from the generated Astro staging pages.

- [ ] **Step 2: Grep-present all schedule titles on both camp pages**

```bash
for page in new/astro/tokyo/index.html new/astro/adelaide/index.html; do
  grep -F '<a href="#schedule">Schedule</a>' "$page"
  grep -F '<span class="num">03</span><span class="label" id="schedule-label">The schedule</span>' "$page"
  grep -F 'What happens on those two days.' "$page"
  grep -F 'Times are indicative — the exact rhythm may shift.' "$page"
  grep -F '<h3>Day 1</h3>' "$page"
  grep -F '<h3>Day 2</h3>' "$page"
  grep -F '<span>Welcome + frame</span>' "$page"
  grep -F "<span>Methods you can't see</span>" "$page"
  grep -F '<span>Lunch</span>' "$page"
  grep -F '<span>Write it down, it compounds</span>' "$page"
  grep -F '<span>Explicit = shareable</span>' "$page"
  grep -F '<span>Form teams, or go solo</span>' "$page"
  grep -F '<span>Networking drinks</span>' "$page"
  grep -F '<span>Re-entry</span>' "$page"
  grep -F '<span>Morning frame: lock the build</span>' "$page"
  grep -F '<span>Build I</span>' "$page"
  grep -F '<span>Mid-build crit</span>' "$page"
  grep -F '<span>Build II</span>' "$page"
  grep -F '<span>Demo rounds</span>' "$page"
  grep -F '<span>Wrap, early finish</span>' "$page"
done
```

Expected: every grep prints at least one matching line for each camp page.

- [ ] **Step 3: Verify each camp page has exactly 15 slot-time entries and every required time appears**

```bash
for page in new/astro/tokyo/index.html new/astro/adelaide/index.html; do
  count="$(grep -o 'class="slot-time"' "$page" | wc -l | tr -d ' ')"
  test "$count" = "15"
  grep -F '<span class="slot-time">09:00</span>' "$page"
  grep -F '<span class="slot-time">10:00</span>' "$page"
  grep -F '<span class="slot-time">11:40</span>' "$page"
  grep -F '<span class="slot-time">12:40</span>' "$page"
  grep -F '<span class="slot-time">14:15</span>' "$page"
  grep -F '<span class="slot-time">15:30</span>' "$page"
  grep -F '<span class="slot-time">16:15</span>' "$page"
  grep -F '<span class="slot-time">09:15</span>' "$page"
  grep -F '<span class="slot-time">09:45</span>' "$page"
  grep -F '<span class="slot-time">11:15</span>' "$page"
  grep -F '<span class="slot-time">11:45</span>' "$page"
  grep -F '<span class="slot-time">12:30</span>' "$page"
  grep -F '<span class="slot-time">14:00</span>' "$page"
  grep -F '<span class="slot-time">14:45</span>' "$page"
done
```

Expected: `test "$count" = "15"` exits 0 for both pages. `09:00` appears twice per page; the command only checks presence and the count check catches total slot count.

- [ ] **Step 4: Grep-absent banned phrases and old stylesheet references**

```bash
! grep -R -F 'supporting partner' new/astro
! grep -R -F 'Supported by' new/astro
! grep -R -F 'with SA Futures Agency as' new/astro
! grep -R -F '/new/styles.css' astro/src astro/public new/astro
```

Expected: all commands exit 0 through `!` and print nothing.

- [ ] **Step 5: Verify footer text parity with `/new/` allowing the staging link base and whitespace compression**

```bash
python3 - <<'PY'
from pathlib import Path
import re
pairs = [
    ('new/index.html', 'new/astro/index.html'),
    ('new/tokyo/index.html', 'new/astro/tokyo/index.html'),
    ('new/adelaide/index.html', 'new/astro/adelaide/index.html'),
    ('new/about/index.html', 'new/astro/about/index.html'),
]

def footer(path: str) -> str:
    html = Path(path).read_text()
    match = re.search(r'<footer class="footer">.*?</footer>', html, flags=re.S)
    if not match:
        raise SystemExit(f'footer missing: {path}')
    text = match.group(0).replace('/new/astro/', '/new/')
    return re.sub(r'\s+', ' ', text).strip()

for static, staged in pairs:
    a = footer(static)
    b = footer(staged)
    if a != b:
        print(f'FOOTER MISMATCH: {static} vs {staged}')
        print('STATIC:', a)
        print('STAGED:', b)
        raise SystemExit(1)
print('PASS footer parity for 4 pages')
PY
```

Expected:

```text
PASS footer parity for 4 pages
```

- [ ] **Step 6: Verify generated pages parse as HTML and preserve noindex**

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

class Parser(HTMLParser):
    pass

for path in [
    'new/astro/index.html',
    'new/astro/tokyo/index.html',
    'new/astro/adelaide/index.html',
    'new/astro/about/index.html',
]:
    html = Path(path).read_text()
    Parser().feed(html)
    if '<meta name="robots" content="noindex, nofollow">' not in html:
        raise SystemExit(f'noindex missing: {path}')
print('PASS html parser + noindex for 4 pages')
PY
```

Expected:

```text
PASS html parser + noindex for 4 pages
```

- [ ] **Step 7: Verify branch diff did not touch protected paths**

```bash
python3 - <<'PY'
import subprocess
allowed_prefixes = ('astro/', 'new/astro/', 'docs/plans/2026-07-16-astro-sync-v2.md')
changed = subprocess.check_output(['git', 'diff', '--name-only', 'master...HEAD'], text=True).splitlines()
blocked = [p for p in changed if not (p.startswith('astro/') or p.startswith('new/astro/') or p == 'docs/plans/2026-07-16-astro-sync-v2.md')]
if blocked:
    print('Blocked path changes:')
    for path in blocked:
        print(path)
    raise SystemExit(1)
print('PASS protected path guard')
PY
```

Expected:

```text
PASS protected path guard
```

- [ ] **Step 8: Optional screenshot verification, only with required port guards**

Run this step only if visual screenshots are requested during implementation review. Content greps above are the core verification.

```bash
python3 - <<'PY'
import socket
for port in (8810, 9426):
    with socket.socket() as s:
        if s.connect_ex(('127.0.0.1', port)) == 0:
            raise SystemExit(f'BLOCKED: port {port} is occupied')
print('PASS ports available: 8810, 9426')
PY
mkdir -p docs/plans/astro-sync-v2-screenshots
python3 -m http.server 8810 > /tmp/miso-astro-sync-v2-http.log 2>&1 &
HTTP_PID=$!
open -na "Google Chrome" --args --remote-debugging-port=9426 --user-data-dir=/tmp/miso-astro-sync-v2-chrome http://127.0.0.1:8810/new/astro/
echo "Capture screenshots manually or with the existing CDP helper, then stop the server with: kill $HTTP_PID"
```

Expected: ports are checked before starting anything. Do not substitute `8765`.

- [ ] **Step 9: Commit Task 3**

If screenshot files were created and reviewed, commit them. If no files changed during verification, create the required empty verification commit.

```bash
if [ -n "$(git status --short docs/plans/astro-sync-v2-screenshots 2>/dev/null)" ]; then
  git add docs/plans/astro-sync-v2-screenshots
  git commit -m "test: verify Astro v2 parity"
else
  git commit --allow-empty -m "test: verify Astro v2 parity"
fi
```

## Final verification before merge or push

- [ ] **Step 1: Run the full verification sequence from a clean Task 3 state**

```bash
git status --short --branch
cd astro
npm run check
npm run build:staging
cd ..
```

Expected: branch is `astro-sync`; only known pre-existing untracked files may remain. `npm run check` succeeds. `npm run build:staging` ends with the staging PASS line.

- [ ] **Step 2: Re-run the parity command block from Task 3 Steps 1–7**

Expected: every grep-present, grep-absent, footer parity, noindex, HTML parser, and protected-path guard passes.

- [ ] **Step 3: Confirm final commit sequence**

```bash
git log --oneline --decorate --max-count=5
```

Expected: the branch contains these task commits in order:

```text
feat: sync Astro sources with camp v2 content
build: republish Astro staging preview
test: verify Astro v2 parity
```

## Notes for the implementer

- `astro/scripts/build-staging.mjs` is the existing publication path. It copies `astro/dist/new` to `new/astro`, rewrites `/new/` links to `/new/astro/`, changes robots from `index, follow` to `noindex, nofollow`, checks exactly four HTML pages, checks scoped stylesheet URLs, rejects client scripts, and verifies CSS parity.
- Do not replace the build path unless `npm run build:staging` itself is broken. If you must use the equivalent fallback, run `cd astro && npx astro build && node scripts/build-staging.mjs && cd ..` and keep the same checks.
- The source static pages stay untouched. Any copy changes must happen in Astro sources and regenerated `new/astro/` output only.
