# Plan — /tokyo/agenda/ participant agenda page

Date: 2026-08-10
Branch: `agenda-page`
Repo: `~/GitHub/make-it-so-camp`

## What this builds

A hidden, participant-facing agenda page at `misocamp.com/tokyo/agenda/`, reached
by QR code from the printed name cards. It is not linked from anywhere on the
site and must not be indexed.

The content is derived from the internal run of show
(`…/brain dead/projects/make-it-so-camp/deliverables/run-of-show-v1.html`) with
everything internal stripped: demo owners, prep lists, open questions, and notes
about how the room will behave. Copy is already written into this plan — the
executor transcribes it verbatim and invents no sentences.

Two structural changes make the page possible:

1. `BaseLayout.astro` hardcodes `robots: index, follow`. It gains an optional
   `robots` prop so one page can opt out.
2. `scripts/build-production.mjs` asserts `index, follow` on every page it
   ships. It gains a noindex carve-out for this page only, and asserts the
   agenda is noindex rather than merely tolerating it.

`robots.txt` is deliberately NOT changed: a `Disallow` line would publish the
URL and would stop crawlers from reading the `noindex` meta tag. `sitemap.xml`,
`llms.txt` and `llms-full.txt` are not changed either — the page stays out of
all of them.

## Baseline

There is no test suite in this repo. Verification is `npm run build:production`
(which self-verifies via guards) plus a rendered screenshot.

Current production output: 4 root pages (`/`, `/tokyo/`, `/adelaide/`, `/about/`,
`/imprint/` — the guard message says 4, the list is 5 entries). After this plan:
the same set plus `/tokyo/agenda/`.

---

## Task 1 — confirm the branch

The branch already exists and this plan is already committed on it. Confirm you
are on it; do NOT create it.

```bash
cd ~/GitHub/make-it-so-camp
git checkout agenda-page
```

Verify:

```bash
git branch --show-current
```

Expected output:

```
agenda-page
```

---

## Task 2 — `robots` prop on BaseLayout

File: `astro/src/layouts/BaseLayout.astro`

Find this block in the frontmatter interface:

```
  twitterTitle?: string;
  twitterDescription?: string;
  /** Optional JSON-LD objects; one application/ld+json script is rendered per object. */
  jsonldGraph?: Record<string, unknown>[];
}
```

Replace it with:

```
  twitterTitle?: string;
  twitterDescription?: string;
  /** Robots directive. Defaults to indexable; pass "noindex, nofollow" for unlisted pages. */
  robots?: string;
  /** Optional JSON-LD objects; one application/ld+json script is rendered per object. */
  jsonldGraph?: Record<string, unknown>[];
}
```

Then find:

```
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
  jsonldGraph,
} = Astro.props;
```

Replace it with:

```
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
  robots = 'index, follow',
  jsonldGraph,
} = Astro.props;
```

Then find:

```
  <meta name="robots" content="index, follow">
```

Replace it with:

```
  <meta name="robots" content={robots}>
```

Verify:

```bash
grep -n 'robots' astro/src/layouts/BaseLayout.astro
```

Expected output (four matching lines, line numbers may differ):

```
  /** Robots directive. Defaults to indexable; pass "noindex, nofollow" for unlisted pages. */
  robots?: string;
  robots = 'index, follow',
  <meta name="robots" content={robots}>
```

Commit:

```bash
git add astro/src/layouts/BaseLayout.astro
git commit -m "BaseLayout: optional robots prop, defaults to index,follow"
```

---

## Task 3 — Programme component

Create the new file `astro/src/components/Programme.astro` with exactly this
content:

```astro
---
export interface ProgrammeBlock {
  /** Time or time range, e.g. "09:30 – 11:00". */
  time: string;
  /** Block name. */
  title: string;
  /** Optional one-line framing under the title. */
  kicker?: string;
  /** Optional description of what happens in the block. */
  body?: string;
  /** Optional "you leave with" line. */
  takeaway?: string;
  /** Breaks, lunch and travel rows render quieter. */
  rest?: boolean;
}

export interface Props {
  blocks: ProgrammeBlock[];
}

const { blocks } = Astro.props;
---
<div class="programme">
  {blocks.map((block) => (
    <div class={block.rest ? 'prog-row rest' : 'prog-row'}>
      <p class="prog-time">{block.time}</p>
      <div>
        <h3>{block.title}</h3>
        {block.kicker && <p class="prog-kicker">{block.kicker}</p>}
        {block.body && <p class="prog-body">{block.body}</p>}
        {block.takeaway && (
          <p class="prog-take"><span class="prog-take-label">You leave with </span>{block.takeaway}</p>
        )}
      </div>
    </div>
  ))}
</div>
```

Verify:

```bash
test -f astro/src/components/Programme.astro && echo OK
```

Expected output:

```
OK
```

---

## Task 4 — Programme styles

File: `astro/public/new/miso.css`

Append the following block to the very end of the file (after the
`.imprint-strip .imprint a:hover` rule), preserving everything already there:

```css

/* Programme — timed blocks with a takeaway (agenda page) */
.programme { display:grid; }
.prog-row {
  display:grid; grid-template-columns:8rem minmax(0, 1fr);
  gap:1.5rem; align-items:start;
  padding:1.4rem 0;
  border-top:2px solid var(--ink);
}
.prog-time { font-size:0.82rem; font-weight:700; color:var(--accent); padding-top:0.35rem; white-space:nowrap; }
.prog-row h3 { font-weight:700; font-size:clamp(1.3rem, 1.8vw, 1.65rem); letter-spacing:-0.01em; margin-bottom:0.35rem; }
.prog-kicker { color:var(--muted); font-weight:600; max-width:52ch; margin-bottom:0.5rem; }
.prog-row p.prog-body { color:var(--ink); max-width:62ch; }
.prog-take { margin-top:0.7rem; font-size:0.95rem; font-weight:600; color:var(--accent); max-width:62ch; }
.prog-take .prog-take-label { color:var(--muted); font-weight:500; }

.prog-row.rest { border-top-width:1px; padding:0.7rem 0; }
.prog-row.rest .prog-time { color:var(--muted); }
.prog-row.rest h3 { font-size:1.05rem; font-weight:600; color:var(--muted); margin-bottom:0; }

@media (max-width:820px) {
  .prog-row { grid-template-columns:1fr; gap:0.4rem; border-top-width:1.5px; }
  .prog-row.rest { gap:0.2rem; }
}
```

Verify:

```bash
grep -c 'prog-row' astro/public/new/miso.css
```

Expected output:

```
8
```

Commit:

```bash
git add astro/src/components/Programme.astro astro/public/new/miso.css
git commit -m "Add Programme component and styles for timed agenda blocks"
```

---

## Task 5 — the agenda page

Create the new file `astro/src/pages/new/tokyo/agenda.astro` with exactly this
content. Transcribe the copy verbatim — do not rewrite, shorten, or "improve"
any sentence.

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Header from '../../../components/Header.astro';
import Hero from '../../../components/Hero.astro';
import Programme from '../../../components/Programme.astro';
import Footer from '../../../components/Footer.astro';
import { tokyoVenueMapUrl } from '../../../data/camps';

const dayOne = [
  {
    time: '09:00 – 09:30',
    title: 'Welcome',
    body: 'Opening words, and the map of the room built from your interviews — what everyone here is working on, before anyone introduces themselves.',
  },
  {
    time: '09:30 – 11:00',
    title: 'Shift 1 · From automation to new work',
    kicker: 'Automation is where it starts. The value is the work that was not possible before.',
    body: 'Demos of systems that are actually in use, run from the simple to the strange. Then you write your own three hops: what gets faster, what becomes more, and the thing you could not do at all.',
    takeaway: 'three hops for your own work, one of them circled.',
  },
  { time: '11:00 – 11:15', title: 'Break', rest: true },
  {
    time: '11:15 – 12:30',
    title: 'Shift 2a · Articulation is the bottleneck',
    kicker: 'You cannot delegate what you cannot articulate.',
    body: 'Exact instructions, with real bread. You write down how to make a sandwich; a partner follows what you wrote, exactly as written. Everyone eats the results.',
    takeaway: 'your own method, in two sentences.',
  },
  { time: '12:30 – 13:30', title: 'Lunch', rest: true },
  {
    time: '13:30 – 14:45',
    title: 'Shift 2b · Make it explicit',
    kicker: 'Written down, a method becomes challengeable, improvable, re-runnable.',
    body: 'What explicit looks like on disk: a voiceprint, a design system, a pipeline someone else on your team can run. Then you take a multi-step process from your own work and break it into its parts.',
    takeaway: 'your pipeline, decomposed — the head start for tomorrow.',
  },
  { time: '14:45 – 15:00', title: 'Break', rest: true },
  {
    time: '15:00 – 16:00',
    title: 'Shift 3 · From individual to collective capability',
    kicker: 'Explicit expertise is coordinable.',
    body: 'Everything so far was built for one person. This block widens it to teams: shared protocols, agents as members of a working space, and what the investment buys once more than one person can run it.',
    takeaway: 'an idea worth a day of work.',
  },
  {
    time: '16:00 – 16:30',
    title: 'Find your tribe',
    body: 'You pick who you are building with tomorrow, or decide to work solo. Both are first-class, and both start from what you wrote down today.',
  },
  { time: '16:30 – 16:45', title: 'Close', rest: true },
  { time: '16:45 →', title: 'Drinks, same place', rest: true },
];

const dayTwo = [
  {
    time: '09:00',
    title: 'Build',
    body: 'Teams arrive already paired and start. Heads-down work on the idea you seeded yesterday, with the two of us roaming — theory comes out on demand, when you hit something that needs naming.',
  },
  {
    time: 'mid-day',
    title: 'Check-in',
    body: 'Each group says where it is in a sentence or two, then everyone goes back to work.',
  },
  {
    time: 'afternoon',
    title: 'Share-out',
    body: 'Three or so groups show what they built. Everyone says out loud what they learned — that is the documentation of the two days.',
  },
  { time: 'close', title: 'We finish in time to travel', rest: true },
];
---
<BaseLayout
  title="Agenda — Make It So Camp Tokyo"
  description="The two-day agenda for Make It So Camp Tokyo, 24–25 August 2026."
  canonicalPath="/new/tokyo/agenda/"
  robots="noindex, nofollow"
>
  <Header links={[
    { label: 'Day 1', href: '#day-1' },
    { label: 'Day 2', href: '#day-2' },
    { label: 'Practicalities', href: '#practicalities' },
    { label: 'The camp', href: '/new/tokyo/' },
  ]} />

  <Hero
    leftMeta="Agenda"
    rightMeta={'Make It So Camp Tokyo<br><span class="light">24–25 August 2026</span>'}
    statement="What happens, and when."
    small={true}
    minHeight="42svh"
    heroSub="Times are a guide. The blocks run in this order; the clock bends around the room."
  />

  <section class="section" id="before" aria-labelledby="before-label">
    <div class="section-label"><span class="num">01</span><h2 class="label" id="before-label">Before you come</h2></div>
    <p class="lead-statement">Two things, both small.</p>
    <div class="cols">
      <div>
        <p><strong>The interview.</strong> About a week before the camp you get a link to a short interview about what you are working on and how you work today. It takes fifteen minutes. What comes back becomes the map of the room that Day 1 opens with, so the day starts from what is actually here.</p>
      </div>
      <div>
        <p><strong>What to bring.</strong> Your laptop, and whatever tokens, subscriptions and ways of working you already use — we are not handing out accounts. And a real problem from your own work, the kind you would still be thinking about next week.</p>
      </div>
    </div>
  </section>

  <section class="section" id="day-1" aria-labelledby="day-1-label">
    <div class="section-label"><span class="num">02</span><h2 class="label" id="day-1-label">Day 1 · Articulate</h2></div>
    <p class="lead-statement">Four shifts, each one ending with something written down.</p>
    <Programme blocks={dayOne} />
  </section>

  <section class="section" id="day-2" aria-labelledby="day-2-label">
    <div class="section-label"><span class="num">03</span><h2 class="label" id="day-2-label">Day 2 · Build and demo</h2></div>
    <p class="lead-statement">The day belongs to the teams. <span class="dim">The shape is set; the cuts inside it are called on the day.</span></p>
    <Programme blocks={dayTwo} />
  </section>

  <section class="section" id="practicalities" aria-labelledby="practicalities-label">
    <div class="section-label"><span class="num">04</span><h2 class="label" id="practicalities-label">Practicalities</h2></div>
    <dl class="facts">
      <dt>Dates</dt>
      <dd>24–25 August 2026</dd>
      <dt>Venue</dt>
      <dd><a href={tokyoVenueMapUrl} target="_blank" rel="noopener">Crypto Café Tokyo ↗︎</a></dd>
      <dt>Start</dt>
      <dd>09:00 both days</dd>
      <dt>Food</dt>
      <dd>Lunch both days, drinks after Day 1 at the venue</dd>
      <dt>Bring</dt>
      <dd>Laptop, your own tokens and subscriptions, a real problem</dd>
      <dt>Questions</dt>
      <dd><a href="mailto:hello@misocamp.com">hello@misocamp.com</a></dd>
    </dl>
  </section>

  <Footer />
</BaseLayout>
```

Verify:

```bash
cd astro && npm run build && ls dist/new/tokyo/agenda/index.html && cd ..
```

Expected output ends with:

```
dist/new/tokyo/agenda/index.html
```

If the build errors, read the error, fix only the transcription mistake it
names, and rebuild. Do not restructure the page.

Commit:

```bash
git add astro/src/pages/new/tokyo/agenda.astro
git commit -m "Add hidden participant agenda page at /tokyo/agenda/"
```

---

## Task 6 — ship the agenda in the production build

File: `astro/scripts/build-production.mjs`

**Edit 1.** Find:

```js
for (const path of pages) {
  if (!existsSync(path)) throw new Error(`Missing production output: ${path}`);
}
```

Replace it with:

```js
for (const path of pages) {
  if (!existsSync(path)) throw new Error(`Missing production output: ${path}`);
}
const agendaSource = join(source, 'tokyo', 'agenda', 'index.html');
if (!existsSync(agendaSource)) {
  throw new Error(`Missing production output: ${agendaSource}`);
}
```

**Edit 2.** Find:

```js
const htmlTargets = [
  join(repoRoot, 'index.html'),
  join(repoRoot, 'tokyo', 'index.html'),
  join(repoRoot, 'adelaide', 'index.html'),
  join(repoRoot, 'about', 'index.html'),
  join(repoRoot, 'imprint', 'index.html'),
];
```

Replace it with:

```js
const agendaTarget = join(repoRoot, 'tokyo', 'agenda', 'index.html');
const htmlTargets = [
  join(repoRoot, 'index.html'),
  join(repoRoot, 'tokyo', 'index.html'),
  join(repoRoot, 'adelaide', 'index.html'),
  join(repoRoot, 'about', 'index.html'),
  join(repoRoot, 'imprint', 'index.html'),
  agendaTarget,
];
// Unlisted pages: must be noindex, and are never asserted as indexable.
const noindexTargets = new Set([agendaTarget]);
```

**Edit 3.** Find:

```js
  const html = readFileSync(path, 'utf8');
  if (!html.includes('content="index, follow"')) {
    throw new Error(`Production robots directive missing: ${path}`);
  }
```

Replace it with:

```js
  const html = readFileSync(path, 'utf8');
  if (noindexTargets.has(path)) {
    if (!html.includes('content="noindex, nofollow"')) {
      throw new Error(`Unlisted page must be noindex: ${path}`);
    }
  } else if (!html.includes('content="index, follow"')) {
    throw new Error(`Production robots directive missing: ${path}`);
  }
```

**Edit 4.** Find:

```js
console.log('PASS production artifact: 4 root pages, root URLs, index,follow, zero scripts, root CSS');
```

Replace it with:

```js
console.log('PASS production artifact: 5 root pages (1 unlisted noindex), root URLs, zero scripts, root CSS');
```

Verify:

```bash
cd astro && npm run build:production && cd ..
```

Expected final line of output:

```
PASS production artifact: 5 root pages (1 unlisted noindex), root URLs, zero scripts, root CSS
```

Then verify the artifact directly:

```bash
grep -o 'content="noindex, nofollow"' tokyo/agenda/index.html
grep -c '/new/' tokyo/agenda/index.html
grep -o 'href="/miso.css"' tokyo/agenda/index.html
grep -c 'agenda' index.html tokyo/index.html sitemap.xml robots.txt llms.txt
```

Expected output:

```
content="noindex, nofollow"
0
href="/miso.css"
index.html:0
tokyo/index.html:0
sitemap.xml:0
robots.txt:0
llms.txt:0
```

The last block is the important one: the agenda must be reachable only by its
URL, with no link or listing anywhere.

Commit source and generated root output together, as AGENTS.md requires:

```bash
git add astro/scripts/build-production.mjs index.html miso.css tokyo adelaide about imprint
git commit -m "Ship /tokyo/agenda/ in the production build with a noindex guard"
```

---

## Task 7 — screenshot the result

Serve the built root and capture desktop and mobile widths.

```bash
cd ~/GitHub/make-it-so-camp
python3 -m http.server 8099 >/dev/null 2>&1 &
sleep 2
playwright-cli open
playwright-cli goto --url "http://localhost:8099/tokyo/agenda/"
playwright-cli screenshot --filename /tmp/agenda-desktop.png --full-page
playwright-cli close
pkill -f "http.server 8099"
```

If `playwright-cli` is unavailable, use headless Chrome instead:

```bash
cd ~/GitHub/make-it-so-camp
python3 -m http.server 8099 >/dev/null 2>&1 &
sleep 2
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --screenshot=/tmp/agenda-desktop.png \
  --window-size=1440,3400 --hide-scrollbars "http://localhost:8099/tokyo/agenda/"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --screenshot=/tmp/agenda-mobile.png \
  --window-size=500,3400 --hide-scrollbars "http://localhost:8099/tokyo/agenda/"
pkill -f "http.server 8099"
```

Verify both files exist:

```bash
ls -la /tmp/agenda-desktop.png /tmp/agenda-mobile.png
```

Report the screenshot paths in your completion message. Do not judge the
layout yourself — the coordinator reviews the images.

---

## Rules for the executor

- Transcribe every code block exactly as written. Do not reword any copy on the
  page, do not add sections, do not add a nav link to the agenda from anywhere.
- Do not touch `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, or the
  `legacy/` directory.
- Do not create or modify `_session.md` or any workspace state file.
- Do not push. Leave the branch local.
- If a step fails twice, STOP and escalate with the exact failing output.
