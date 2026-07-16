# Camp Pages V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. If any step fails twice, STOP and report `BLOCKED camp-v2: <one-line reason>`.

**Goal:** Update the `/new/tokyo/` and `/new/adelaide/` camp pages with the approved collaboration hero line, schedule section, and Adelaide fact changes.

**Architecture:** Static HTML pages use the existing Swiss `/new/miso.css` system. The two camp pages are full-file rewrites because the section order, nav, numbering, and schedule markup change substantially; shared CSS, hub facts, and About collaborators are edited surgically against current source strings.

**Tech Stack:** Static HTML, CSS, Python 3 standard library, Chrome DevTools Protocol via headless Chrome and Node WebSocket. No build tool, no JavaScript shipped to the site.

## Global Constraints

- Work on branch `camp-v2`, from current `master`.
- Touch only `new/miso.css`, `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`, and `docs/plans/camp-v2-screenshots/` during implementation.
- Do not touch `astro/`, root site files, `CNAME`, `_session.md`, or any workspace state file.
- Camp pages use `/new/miso.css` only.
- Hero collaboration lines are locked verbatim:
  - Tokyo: `In collaboration with Chiba Institute of Technology.`
  - Adelaide: `In collaboration with Flinders University New Venture Institute and SA Futures Agency.`
- The schedule section is locked verbatim: `What happens on those two days. <span class="dim">Times are indicative — the exact rhythm may shift.</span>`
- Schedule rows contain times and titles only, with 7 Day-1 slots and 8 Day-2 slots.
- Adelaide venue is `TBD` on the camp page and hub card.
- Adelaide collaboration wording is `Flinders University New Venture Institute and SA Futures Agency`; no `supporting partner`, `Supported by`, or `with SA Futures Agency as` anywhere under `new/`.
- Footers must remain byte-identical across `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, and `new/about/index.html`.
- Non-ASCII characters are load-bearing: en dashes `–`, middots `·`, `é` in `Café`, arrows `↗`, and the em dash `—` in the schedule indicative-times line.
- One commit per task, with the exact commit messages shown below.

## File Structure

- `new/miso.css`: insert `.hero-sub`, `.sched`, `.sched h3`, `.slot`, `.slot-time`, and the mobile schedule media query after the existing `.statement` rules.
- `new/tokyo/index.html`: full replacement with the camp-v2 Tokyo page.
- `new/adelaide/index.html`: full replacement with the camp-v2 Adelaide page.
- `new/index.html`: surgical Adelaide card fact edits only.
- `new/about/index.html`: surgical Adelaide collaborators fact edit only.
- `docs/plans/camp-v2-screenshots/`: generated verification screenshots only.

### Task 1: Add camp-v2 hero and schedule CSS

**Files:**
- Modify: `new/miso.css`

**Produces:**
- `.hero-sub` for the collaboration hero line on camp pages.
- `.sched`, `.slot`, and `.slot-time` for the new schedule section, including stacked mobile layout at `max-width:820px`.

- [ ] **Step 1: Create the branch from current `master`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
git pull --ff-only origin master
if git show-ref --verify --quiet refs/heads/camp-v2; then echo "BLOCKED camp-v2: branch camp-v2 already exists"; exit 1; fi
git switch -c camp-v2 >/dev/null
test "$(git branch --show-current)" = "camp-v2" && echo "PASS on branch camp-v2"
```

Expected output ends with:

```text
PASS on branch camp-v2
```

- [ ] **Step 2: Apply the exact CSS replacement against current `new/miso.css`**

The current block is:

```css
.statement {
  font-weight:700;
  font-size:clamp(2.7rem, 9.2vw, 8.4rem);
  line-height:0.98;
  letter-spacing:-0.03em;
  max-width:15ch;
}
.hero-cta { margin-top:clamp(1.2rem, 2.5vw, 2rem); font-size:clamp(1.05rem, 1.4vw, 1.3rem); font-weight:600; }
```

Replace it with:

```css
.statement {
  font-weight:700;
  font-size:clamp(2.7rem, 9.2vw, 8.4rem);
  line-height:0.98;
  letter-spacing:-0.03em;
  max-width:15ch;
}
.hero-sub { margin-top:clamp(0.9rem,1.8vw,1.5rem); font-weight:600; font-size:clamp(1.25rem,2.2vw,2rem); line-height:1.25; letter-spacing:-0.015em; max-width:32ch; color:var(--muted); }
.sched { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,4.5vw,4.5rem); margin-top:clamp(2rem,3.5vw,3rem); }
.sched h3 { font-weight:700; font-size:clamp(1.3rem,1.8vw,1.65rem); letter-spacing:-0.01em; margin-bottom:0.9rem; }
.slot { display:grid; grid-template-columns:4.5rem 1fr; gap:1rem; padding:0.55rem 0; border-top:1px solid var(--line); font-weight:500; }
.slot-time { font-size:0.85rem; font-weight:700; color:var(--accent); padding-top:0.15rem; }
@media (max-width:820px){ .sched { grid-template-columns:1fr; gap:2rem; } }
.hero-cta { margin-top:clamp(1.2rem, 2.5vw, 2rem); font-size:clamp(1.05rem, 1.4vw, 1.3rem); font-weight:600; }
```

Use this exact script so it fails if the old block is absent, duplicated, or already edited:

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('new/miso.css')
text = path.read_text()
old = '''.statement {
  font-weight:700;
  font-size:clamp(2.7rem, 9.2vw, 8.4rem);
  line-height:0.98;
  letter-spacing:-0.03em;
  max-width:15ch;
}
.hero-cta { margin-top:clamp(1.2rem, 2.5vw, 2rem); font-size:clamp(1.05rem, 1.4vw, 1.3rem); font-weight:600; }'''
new = '''.statement {
  font-weight:700;
  font-size:clamp(2.7rem, 9.2vw, 8.4rem);
  line-height:0.98;
  letter-spacing:-0.03em;
  max-width:15ch;
}
.hero-sub { margin-top:clamp(0.9rem,1.8vw,1.5rem); font-weight:600; font-size:clamp(1.25rem,2.2vw,2rem); line-height:1.25; letter-spacing:-0.015em; max-width:32ch; color:var(--muted); }
.sched { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,4.5vw,4.5rem); margin-top:clamp(2rem,3.5vw,3rem); }
.sched h3 { font-weight:700; font-size:clamp(1.3rem,1.8vw,1.65rem); letter-spacing:-0.01em; margin-bottom:0.9rem; }
.slot { display:grid; grid-template-columns:4.5rem 1fr; gap:1rem; padding:0.55rem 0; border-top:1px solid var(--line); font-weight:500; }
.slot-time { font-size:0.85rem; font-weight:700; color:var(--accent); padding-top:0.15rem; }
@media (max-width:820px){ .sched { grid-template-columns:1fr; gap:2rem; } }
.hero-cta { margin-top:clamp(1.2rem, 2.5vw, 2rem); font-size:clamp(1.05rem, 1.4vw, 1.3rem); font-weight:600; }'''
count = text.count(old)
if count != 1:
    raise SystemExit(f'BLOCKED camp-v2: expected one CSS insertion point, found {count}')
path.write_text(text.replace(old, new))
PY
```

Expected output: none.

- [ ] **Step 3: Verify Task 1 CSS additions and limited diff**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq '.hero-sub { margin-top:clamp(0.9rem,1.8vw,1.5rem); font-weight:600; font-size:clamp(1.25rem,2.2vw,2rem); line-height:1.25; letter-spacing:-0.015em; max-width:32ch; color:var(--muted); }' new/miso.css && echo 'PASS hero-sub CSS exact'
grep -Fq '.sched { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,4.5vw,4.5rem); margin-top:clamp(2rem,3.5vw,3rem); }' new/miso.css && echo 'PASS sched CSS exact'
grep -Fq '.slot { display:grid; grid-template-columns:4.5rem 1fr; gap:1rem; padding:0.55rem 0; border-top:1px solid var(--line); font-weight:500; }' new/miso.css && echo 'PASS slot CSS exact'
grep -Fq '@media (max-width:820px){ .sched { grid-template-columns:1fr; gap:2rem; } }' new/miso.css && echo 'PASS schedule mobile CSS exact'
git diff --unified=0 -- new/miso.css > /tmp/camp-v2-css-task1.diff
python3 - <<'PY'
from pathlib import Path
text = Path('/tmp/camp-v2-css-task1.diff').read_text()
required = [
'+.hero-sub { margin-top:clamp(0.9rem,1.8vw,1.5rem); font-weight:600; font-size:clamp(1.25rem,2.2vw,2rem); line-height:1.25; letter-spacing:-0.015em; max-width:32ch; color:var(--muted); }',
'+.sched { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,4.5vw,4.5rem); margin-top:clamp(2rem,3.5vw,3rem); }',
'+.sched h3 { font-weight:700; font-size:clamp(1.3rem,1.8vw,1.65rem); letter-spacing:-0.01em; margin-bottom:0.9rem; }',
'+.slot { display:grid; grid-template-columns:4.5rem 1fr; gap:1rem; padding:0.55rem 0; border-top:1px solid var(--line); font-weight:500; }',
'+.slot-time { font-size:0.85rem; font-weight:700; color:var(--accent); padding-top:0.15rem; }',
'+@media (max-width:820px){ .sched { grid-template-columns:1fr; gap:2rem; } }',
]
for needle in required:
    if needle not in text:
        raise SystemExit(f'FAIL missing CSS diff line: {needle}')
changed = [line for line in text.splitlines() if line.startswith(('+', '-')) and not line.startswith(('+++', '---'))]
minus = [line for line in changed if line.startswith('-')]
plus = [line for line in changed if line.startswith('+')]
if minus:
    raise SystemExit(f'FAIL CSS task has removals: {minus}')
if plus != required:
    raise SystemExit('FAIL CSS diff includes additions beyond approved camp-v2 lines')
print('PASS CSS diff limited to approved camp-v2 additions')
PY
```

Expected output:

```text
PASS hero-sub CSS exact
PASS sched CSS exact
PASS slot CSS exact
PASS schedule mobile CSS exact
PASS CSS diff limited to approved camp-v2 additions
```

- [ ] **Step 4: Commit Task 1**

```bash
git add new/miso.css
git commit -m "feat: add camp v2 shared schedule styles"
```

Expected output includes:

```text
[camp-v2
```

### Task 2: Rewrite the Tokyo camp page

**Files:**
- Modify: `new/tokyo/index.html`

**Consumes:**
- `.hero-sub`, `.sched`, `.slot`, and `.slot-time` from Task 1.

**Produces:**
- A complete Tokyo camp page with hero collaboration line, schedule nav, 01–05 section numbering, and unchanged Tokyo facts.

- [ ] **Step 1: Replace `new/tokyo/index.html` with this complete file**

```bash
mkdir -p new/tokyo
cat > new/tokyo/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Make It So Camp Tokyo — 24–25 August 2026</title>
  <meta name="description" content="Make It So Camp Tokyo is a two-day AI workshop at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology.">
  <meta name="author" content="Make It So Camp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://misocamp.com/new/tokyo/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://misocamp.com/new/tokyo/">
  <meta property="og:site_name" content="Make It So Camp">
  <meta property="og:title" content="Make It So Camp Tokyo — 24–25 August 2026">
  <meta property="og:description" content="Two days to make your way of working legible — to a machine, and to people who work nothing like you.">
  <meta property="og:image" content="https://misocamp.com/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Make It So Camp Tokyo — 24–25 August 2026">
  <meta name="twitter:description" content="Two days to make your way of working legible — to a machine, and to people who work nothing like you.">
  <meta name="twitter:image" content="https://misocamp.com/og-image.jpg">
  <link rel="stylesheet" href="/new/miso.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/new/">Make It So Camp</a>
    <nav class="nav" aria-label="Primary">
      <a href="#overview">Overview</a>
      <a href="#days">The two days</a>
      <a href="#schedule">Schedule</a>
      <a href="#logistics">Logistics</a>
      <a href="/new/about/">About</a>
      <a href="#request" class="accent">Request an invitation</a>
    </nav>
  </header>

  <section class="hero" style="min-height:48svh">
    <div class="hero-top">
      <p class="meta light">By invitation</p>
      <p class="meta">Two-day AI workshop<br><span class="light">Tokyo · 24–25 August 2026</span></p>
    </div>
    <div class="spacer"></div>
    <h1 class="statement statement-sm">Make It So Camp Tokyo.</h1>
    <p class="hero-sub">In collaboration with Chiba Institute of Technology.</p>
    <p class="hero-cta"><a href="mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request">Request an invitation ↗</a></p>
  </section>

  <section class="section" id="overview" aria-labelledby="overview-label">
    <div class="section-label"><span class="num">01</span><span class="label" id="overview-label">Overview</span></div>
    <p class="lead-statement">Two days to make your way of working legible — to a machine, and to people who work nothing like you. <span class="dim">This page is what to expect in Tokyo.</span></p>
    <div class="cols">
      <div>
        <p>Make It So Camp Tokyo runs over two days at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.</p>
        <p>You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.</p>
      </div>
      <div>
        <p>Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.</p>
        <p>You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.</p>
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
      <div>
        <h3>Day 1</h3>
        <div class="slot"><span class="slot-time">09:00</span><span>Welcome + frame</span></div>
        <div class="slot"><span class="slot-time">10:00</span><span>Methods you can't see</span></div>
        <div class="slot"><span class="slot-time">11:40</span><span>Lunch</span></div>
        <div class="slot"><span class="slot-time">12:40</span><span>Write it down, it compounds</span></div>
        <div class="slot"><span class="slot-time">14:15</span><span>Explicit = shareable</span></div>
        <div class="slot"><span class="slot-time">15:30</span><span>Form teams, or go solo</span></div>
        <div class="slot"><span class="slot-time">16:15</span><span>Networking drinks</span></div>
      </div>
      <div>
        <h3>Day 2</h3>
        <div class="slot"><span class="slot-time">09:00</span><span>Re-entry</span></div>
        <div class="slot"><span class="slot-time">09:15</span><span>Morning frame: lock the build</span></div>
        <div class="slot"><span class="slot-time">09:45</span><span>Build I</span></div>
        <div class="slot"><span class="slot-time">11:15</span><span>Mid-build crit</span></div>
        <div class="slot"><span class="slot-time">11:45</span><span>Lunch</span></div>
        <div class="slot"><span class="slot-time">12:30</span><span>Build II</span></div>
        <div class="slot"><span class="slot-time">14:00</span><span>Demo rounds</span></div>
        <div class="slot"><span class="slot-time">14:45</span><span>Wrap, early finish</span></div>
      </div>
    </div>
  </section>

  <section class="section" id="logistics" aria-labelledby="logistics-label">
    <div class="section-label"><span class="num">04</span><span class="label" id="logistics-label">Logistics</span></div>
    <dl class="facts">
      <dt>Dates</dt><dd>24–25 August 2026</dd>
      <dt>Venue</dt><dd>Crypto Café Tokyo</dd>
      <dt>In collaboration with</dt><dd>Chiba Institute of Technology</dd>
      <dt>Format</dt><dd>Two days, hands-on</dd>
      <dt>Cohort</dt><dd>Deliberately mixed: academic, creative industries, corporate</dd>
      <dt>Bring</dt><dd>A real problem you are working on</dd>
    </dl>
  </section>

  <section class="section invite" id="request" aria-labelledby="request-label">
    <div class="section-label"><span class="num">05</span><span class="label" id="request-label">Request an invitation</span></div>
    <p class="lead-statement" style="margin-bottom:1.6rem">Tell us what work you would bring, and why now. <span class="dim">We reply if there is a fit.</span></p>
    <p class="email"><a href="mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request">hello@misocamp.com</a></p>
  </section>

  <footer class="footer">
    <div>Make It So Camp — created by <a href="/new/about/">Igor Schwarzmann and Noah Raford</a></div>
    <div class="collab light">In collaboration with Chiba Institute of Technology, Flinders University New Venture Institute, and SA Futures Agency.</div>
    <div><a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>
  </footer>
</body>
</html>
EOF
```

- [ ] **Step 2: Verify Tokyo camp-v2 content and schedule shape**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq '<a href="#schedule">Schedule</a>' new/tokyo/index.html && echo 'PASS Tokyo nav includes Schedule'
grep -Fq '<p class="hero-sub">In collaboration with Chiba Institute of Technology.</p>' new/tokyo/index.html && echo 'PASS Tokyo hero-sub exact'
grep -Fq '<div class="section-label"><span class="num">03</span><span class="label" id="schedule-label">The schedule</span></div>' new/tokyo/index.html && echo 'PASS Tokyo schedule section numbered 03'
grep -Fq 'What happens on those two days. <span class="dim">Times are indicative — the exact rhythm may shift.</span>' new/tokyo/index.html && echo 'PASS Tokyo schedule lead exact'
grep -Fq '<div class="section-label"><span class="num">04</span><span class="label" id="logistics-label">Logistics</span></div>' new/tokyo/index.html && echo 'PASS Tokyo logistics renumbered 04'
grep -Fq '<div class="section-label"><span class="num">05</span><span class="label" id="request-label">Request an invitation</span></div>' new/tokyo/index.html && echo 'PASS Tokyo request renumbered 05'
python3 - <<'PY'
from pathlib import Path
text = Path('new/tokyo/index.html').read_text()
day1 = ['09:00|Welcome + frame', '10:00|Methods you can\'t see', '11:40|Lunch', '12:40|Write it down, it compounds', '14:15|Explicit = shareable', '15:30|Form teams, or go solo', '16:15|Networking drinks']
day2 = ['09:00|Re-entry', '09:15|Morning frame: lock the build', '09:45|Build I', '11:15|Mid-build crit', '11:45|Lunch', '12:30|Build II', '14:00|Demo rounds', '14:45|Wrap, early finish']
for item in day1 + day2:
    time, title = item.split('|', 1)
    needle = f'<div class="slot"><span class="slot-time">{time}</span><span>{title}</span></div>'
    if needle not in text:
        raise SystemExit(f'FAIL missing Tokyo slot: {needle}')
if text.count('<div class="slot"><span class="slot-time">') != 15:
    raise SystemExit('FAIL Tokyo schedule does not have exactly 15 slots')
if text.count('<h3>Day 1</h3>') != 1 or text.count('<h3>Day 2</h3>') != 1:
    raise SystemExit('FAIL Tokyo schedule day headings incorrect')
print('PASS Tokyo schedule has 7 Day-1 and 8 Day-2 title-only slots')
PY
grep -Fq '24–25 August 2026' new/tokyo/index.html && echo 'PASS Tokyo date byte-exact'
grep -Fq 'Crypto Café Tokyo' new/tokyo/index.html && echo 'PASS Tokyo Café byte-exact'
grep -Fq 'Request an invitation ↗' new/tokyo/index.html && echo 'PASS Tokyo CTA arrow byte-exact'
grep -Eiq 'supporting partner|Supported by|with SA Futures Agency as|styles\.css' new/tokyo/index.html && { echo 'FAIL Tokyo forbidden string present'; exit 1; } || echo 'PASS Tokyo forbidden strings absent'
```

Expected output:

```text
PASS Tokyo nav includes Schedule
PASS Tokyo hero-sub exact
PASS Tokyo schedule section numbered 03
PASS Tokyo schedule lead exact
PASS Tokyo logistics renumbered 04
PASS Tokyo request renumbered 05
PASS Tokyo schedule has 7 Day-1 and 8 Day-2 title-only slots
PASS Tokyo date byte-exact
PASS Tokyo Café byte-exact
PASS Tokyo CTA arrow byte-exact
PASS Tokyo forbidden strings absent
```

- [ ] **Step 3: Commit Task 2**

```bash
git add new/tokyo/index.html
git commit -m "feat: update Tokyo camp v2 page"
```

Expected output includes:

```text
[camp-v2
```

### Task 3: Rewrite the Adelaide camp page

**Files:**
- Modify: `new/adelaide/index.html`

**Consumes:**
- `.hero-sub`, `.sched`, `.slot`, and `.slot-time` from Task 1.

**Produces:**
- A complete Adelaide camp page with hero collaboration line, schedule nav, 01–05 section numbering, `TBD` venue, and combined collaboration facts.

- [ ] **Step 1: Replace `new/adelaide/index.html` with this complete file**

```bash
mkdir -p new/adelaide
cat > new/adelaide/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Make It So Camp Adelaide — 17–18 September 2026</title>
  <meta name="description" content="Make It So Camp Adelaide is a two-day AI workshop in Adelaide, in collaboration with Flinders University New Venture Institute and SA Futures Agency.">
  <meta name="author" content="Make It So Camp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://misocamp.com/new/adelaide/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://misocamp.com/new/adelaide/">
  <meta property="og:site_name" content="Make It So Camp">
  <meta property="og:title" content="Make It So Camp Adelaide — 17–18 September 2026">
  <meta property="og:description" content="Two days to make your way of working legible — to a machine, and to people who work nothing like you.">
  <meta property="og:image" content="https://misocamp.com/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Make It So Camp Adelaide — 17–18 September 2026">
  <meta name="twitter:description" content="Two days to make your way of working legible — to a machine, and to people who work nothing like you.">
  <meta name="twitter:image" content="https://misocamp.com/og-image.jpg">
  <link rel="stylesheet" href="/new/miso.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/new/">Make It So Camp</a>
    <nav class="nav" aria-label="Primary">
      <a href="#overview">Overview</a>
      <a href="#days">The two days</a>
      <a href="#schedule">Schedule</a>
      <a href="#logistics">Logistics</a>
      <a href="/new/about/">About</a>
      <a href="#request" class="accent">Request an invitation</a>
    </nav>
  </header>

  <section class="hero" style="min-height:48svh">
    <div class="hero-top">
      <p class="meta light">By invitation</p>
      <p class="meta">Two-day AI workshop<br><span class="light">Adelaide · 17–18 September 2026</span></p>
    </div>
    <div class="spacer"></div>
    <h1 class="statement statement-sm">Make It So Camp Adelaide.</h1>
    <p class="hero-sub">In collaboration with Flinders University New Venture Institute and SA Futures Agency.</p>
    <p class="hero-cta"><a href="mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request">Request an invitation ↗</a></p>
  </section>

  <section class="section" id="overview" aria-labelledby="overview-label">
    <div class="section-label"><span class="num">01</span><span class="label" id="overview-label">Overview</span></div>
    <p class="lead-statement">Two days to make your way of working legible — to a machine, and to people who work nothing like you. <span class="dim">This page is what to expect in Adelaide.</span></p>
    <div class="cols">
      <div>
        <p>Make It So Camp Adelaide runs over two days in Adelaide, in collaboration with Flinders University New Venture Institute and SA Futures Agency. The venue will be announced. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.</p>
        <p>You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.</p>
      </div>
      <div>
        <p>Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.</p>
        <p>You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.</p>
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
      <div>
        <h3>Day 1</h3>
        <div class="slot"><span class="slot-time">09:00</span><span>Welcome + frame</span></div>
        <div class="slot"><span class="slot-time">10:00</span><span>Methods you can't see</span></div>
        <div class="slot"><span class="slot-time">11:40</span><span>Lunch</span></div>
        <div class="slot"><span class="slot-time">12:40</span><span>Write it down, it compounds</span></div>
        <div class="slot"><span class="slot-time">14:15</span><span>Explicit = shareable</span></div>
        <div class="slot"><span class="slot-time">15:30</span><span>Form teams, or go solo</span></div>
        <div class="slot"><span class="slot-time">16:15</span><span>Networking drinks</span></div>
      </div>
      <div>
        <h3>Day 2</h3>
        <div class="slot"><span class="slot-time">09:00</span><span>Re-entry</span></div>
        <div class="slot"><span class="slot-time">09:15</span><span>Morning frame: lock the build</span></div>
        <div class="slot"><span class="slot-time">09:45</span><span>Build I</span></div>
        <div class="slot"><span class="slot-time">11:15</span><span>Mid-build crit</span></div>
        <div class="slot"><span class="slot-time">11:45</span><span>Lunch</span></div>
        <div class="slot"><span class="slot-time">12:30</span><span>Build II</span></div>
        <div class="slot"><span class="slot-time">14:00</span><span>Demo rounds</span></div>
        <div class="slot"><span class="slot-time">14:45</span><span>Wrap, early finish</span></div>
      </div>
    </div>
  </section>

  <section class="section" id="logistics" aria-labelledby="logistics-label">
    <div class="section-label"><span class="num">04</span><span class="label" id="logistics-label">Logistics</span></div>
    <dl class="facts">
      <dt>Dates</dt><dd>17–18 September 2026</dd>
      <dt>Venue</dt><dd>TBD</dd>
      <dt>In collaboration with</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>
      <dt>Format</dt><dd>Two days, hands-on</dd>
      <dt>Cohort</dt><dd>Deliberately mixed: academic, creative industries, corporate</dd>
      <dt>Bring</dt><dd>A real problem you are working on</dd>
    </dl>
  </section>

  <section class="section invite" id="request" aria-labelledby="request-label">
    <div class="section-label"><span class="num">05</span><span class="label" id="request-label">Request an invitation</span></div>
    <p class="lead-statement" style="margin-bottom:1.6rem">Tell us what work you would bring, and why now. <span class="dim">We reply if there is a fit.</span></p>
    <p class="email"><a href="mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request">hello@misocamp.com</a></p>
  </section>

  <footer class="footer">
    <div>Make It So Camp — created by <a href="/new/about/">Igor Schwarzmann and Noah Raford</a></div>
    <div class="collab light">In collaboration with Chiba Institute of Technology, Flinders University New Venture Institute, and SA Futures Agency.</div>
    <div><a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>
  </footer>
</body>
</html>
EOF
```

- [ ] **Step 2: Verify Adelaide camp-v2 content, fact changes, and schedule shape**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq '<a href="#schedule">Schedule</a>' new/adelaide/index.html && echo 'PASS Adelaide nav includes Schedule'
grep -Fq '<p class="hero-sub">In collaboration with Flinders University New Venture Institute and SA Futures Agency.</p>' new/adelaide/index.html && echo 'PASS Adelaide hero-sub exact'
grep -Fq 'Make It So Camp Adelaide runs over two days in Adelaide, in collaboration with Flinders University New Venture Institute and SA Futures Agency. The venue will be announced. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.' new/adelaide/index.html && echo 'PASS Adelaide overview P1 exact'
grep -Fq '<dt>Venue</dt><dd>TBD</dd>' new/adelaide/index.html && echo 'PASS Adelaide venue TBD exact'
grep -Fq '<dt>In collaboration with</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>' new/adelaide/index.html && echo 'PASS Adelaide collaboration dl exact'
grep -Fq '<div class="section-label"><span class="num">03</span><span class="label" id="schedule-label">The schedule</span></div>' new/adelaide/index.html && echo 'PASS Adelaide schedule section numbered 03'
grep -Fq 'What happens on those two days. <span class="dim">Times are indicative — the exact rhythm may shift.</span>' new/adelaide/index.html && echo 'PASS Adelaide schedule lead exact'
grep -Fq '<div class="section-label"><span class="num">04</span><span class="label" id="logistics-label">Logistics</span></div>' new/adelaide/index.html && echo 'PASS Adelaide logistics renumbered 04'
grep -Fq '<div class="section-label"><span class="num">05</span><span class="label" id="request-label">Request an invitation</span></div>' new/adelaide/index.html && echo 'PASS Adelaide request renumbered 05'
python3 - <<'PY'
from pathlib import Path
text = Path('new/adelaide/index.html').read_text()
day1 = ['09:00|Welcome + frame', '10:00|Methods you can\'t see', '11:40|Lunch', '12:40|Write it down, it compounds', '14:15|Explicit = shareable', '15:30|Form teams, or go solo', '16:15|Networking drinks']
day2 = ['09:00|Re-entry', '09:15|Morning frame: lock the build', '09:45|Build I', '11:15|Mid-build crit', '11:45|Lunch', '12:30|Build II', '14:00|Demo rounds', '14:45|Wrap, early finish']
for item in day1 + day2:
    time, title = item.split('|', 1)
    needle = f'<div class="slot"><span class="slot-time">{time}</span><span>{title}</span></div>'
    if needle not in text:
        raise SystemExit(f'FAIL missing Adelaide slot: {needle}')
if text.count('<div class="slot"><span class="slot-time">') != 15:
    raise SystemExit('FAIL Adelaide schedule does not have exactly 15 slots')
if text.count('<h3>Day 1</h3>') != 1 or text.count('<h3>Day 2</h3>') != 1:
    raise SystemExit('FAIL Adelaide schedule day headings incorrect')
print('PASS Adelaide schedule has 7 Day-1 and 8 Day-2 title-only slots')
PY
grep -Fq '17–18 September 2026' new/adelaide/index.html && echo 'PASS Adelaide date byte-exact'
grep -Fq 'Request an invitation ↗' new/adelaide/index.html && echo 'PASS Adelaide CTA arrow byte-exact'
grep -Eiq 'supporting partner|Supported by|with SA Futures Agency as|styles\.css' new/adelaide/index.html && { echo 'FAIL Adelaide forbidden string present'; exit 1; } || echo 'PASS Adelaide forbidden strings absent'
```

Expected output:

```text
PASS Adelaide nav includes Schedule
PASS Adelaide hero-sub exact
PASS Adelaide overview P1 exact
PASS Adelaide venue TBD exact
PASS Adelaide collaboration dl exact
PASS Adelaide schedule section numbered 03
PASS Adelaide schedule lead exact
PASS Adelaide logistics renumbered 04
PASS Adelaide request renumbered 05
PASS Adelaide schedule has 7 Day-1 and 8 Day-2 title-only slots
PASS Adelaide date byte-exact
PASS Adelaide CTA arrow byte-exact
PASS Adelaide forbidden strings absent
```

- [ ] **Step 3: Commit Task 3**

```bash
git add new/adelaide/index.html
git commit -m "feat: update Adelaide camp v2 page"
```

Expected output includes:

```text
[camp-v2
```

### Task 4: Update hub and About Adelaide facts

**Files:**
- Modify: `new/index.html`
- Modify: `new/about/index.html`

**Produces:**
- Hub Adelaide card uses `TBD` venue and combined collaboration partner text.
- About collaborators list uses the approved Adelaide collaboration sentence.

- [ ] **Step 1: Apply the exact hub Adelaide fact replacement against current `new/index.html`**

The current hub Adelaide fact block is:

```html
          <dt>Dates</dt><dd>17–18 September 2026</dd>
          <dt>Venue</dt><dd>Flinders University New Venture Institute</dd>
          <dt>Partner</dt><dd>with SA Futures Agency</dd>
```

Replace it with:

```html
          <dt>Dates</dt><dd>17–18 September 2026</dd>
          <dt>Venue</dt><dd>TBD</dd>
          <dt>Partner</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>
```

Use this exact script:

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('new/index.html')
text = path.read_text()
old = '''          <dt>Dates</dt><dd>17–18 September 2026</dd>
          <dt>Venue</dt><dd>Flinders University New Venture Institute</dd>
          <dt>Partner</dt><dd>with SA Futures Agency</dd>'''
new = '''          <dt>Dates</dt><dd>17–18 September 2026</dd>
          <dt>Venue</dt><dd>TBD</dd>
          <dt>Partner</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>'''
count = text.count(old)
if count != 1:
    raise SystemExit(f'BLOCKED camp-v2: expected one hub Adelaide fact block, found {count}')
path.write_text(text.replace(old, new))
PY
```

Expected output: none.

- [ ] **Step 2: Apply the exact About collaborators replacement against current `new/about/index.html`**

The current About Adelaide collaborator line is:

```html
      <dt>Adelaide</dt><dd>Flinders University New Venture Institute, with SA Futures Agency as a supporting partner</dd>
```

Replace it with:

```html
      <dt>Adelaide</dt><dd>In collaboration with Flinders University New Venture Institute and SA Futures Agency</dd>
```

Use this exact script:

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('new/about/index.html')
text = path.read_text()
old = '      <dt>Adelaide</dt><dd>Flinders University New Venture Institute, with SA Futures Agency as a supporting partner</dd>'
new = '      <dt>Adelaide</dt><dd>In collaboration with Flinders University New Venture Institute and SA Futures Agency</dd>'
count = text.count(old)
if count != 1:
    raise SystemExit(f'BLOCKED camp-v2: expected one About Adelaide collaborator line, found {count}')
path.write_text(text.replace(old, new))
PY
```

Expected output: none.

- [ ] **Step 3: Verify Task 4 facts and limited diffs**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq '<dt>Venue</dt><dd>TBD</dd>' new/index.html && echo 'PASS hub Adelaide venue TBD'
grep -Fq '<dt>Partner</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>' new/index.html && echo 'PASS hub Adelaide partner exact'
grep -Fq '<dt>Adelaide</dt><dd>In collaboration with Flinders University New Venture Institute and SA Futures Agency</dd>' new/about/index.html && echo 'PASS About Adelaide collaborator exact'
grep -RniE 'supporting partner|with SA Futures Agency as' new && { echo 'FAIL forbidden Adelaide legacy wording present under new/'; exit 1; } || echo 'PASS Adelaide legacy wording absent under new/'
git diff --unified=0 -- new/index.html new/about/index.html > /tmp/camp-v2-facts-task4.diff
python3 - <<'PY'
from pathlib import Path
text = Path('/tmp/camp-v2-facts-task4.diff').read_text()
required = [
'-          <dt>Venue</dt><dd>Flinders University New Venture Institute</dd>',
'+          <dt>Venue</dt><dd>TBD</dd>',
'-          <dt>Partner</dt><dd>with SA Futures Agency</dd>',
'+          <dt>Partner</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>',
'-      <dt>Adelaide</dt><dd>Flinders University New Venture Institute, with SA Futures Agency as a supporting partner</dd>',
'+      <dt>Adelaide</dt><dd>In collaboration with Flinders University New Venture Institute and SA Futures Agency</dd>',
]
for needle in required:
    if needle not in text:
        raise SystemExit(f'FAIL missing fact diff line: {needle}')
changed = [line for line in text.splitlines() if line.startswith(('+', '-')) and not line.startswith(('+++', '---'))]
if changed != required:
    raise SystemExit('FAIL hub/About diff includes changes beyond approved fact edits')
print('PASS hub/About diffs limited to approved fact edits')
PY
```

Expected output:

```text
PASS hub Adelaide venue TBD
PASS hub Adelaide partner exact
PASS About Adelaide collaborator exact
PASS Adelaide legacy wording absent under new/
PASS hub/About diffs limited to approved fact edits
```

- [ ] **Step 4: Commit Task 4**

```bash
git add new/index.html new/about/index.html
git commit -m "feat: update camp v2 Adelaide facts"
```

Expected output includes:

```text
[camp-v2
```

### Task 5: Final verification and screenshots

**Files:**
- Create: `docs/plans/camp-v2-screenshots/`

**Consumes:**
- Task 1 CSS.
- Task 2 Tokyo page.
- Task 3 Adelaide page.
- Task 4 hub and About fact edits.

**Produces:**
- Static verification output for the approved camp-pages-v2 spec.
- Four screenshots: Tokyo and Adelaide at 1440px and 390px.
- A final verification commit.

- [ ] **Step 1: Verify branch, changed-file scope, required CSS, and protected paths**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test "$(git branch --show-current)" = "camp-v2" && echo 'PASS on branch camp-v2'
python3 - <<'PY'
import subprocess
allowed = {
    'new/miso.css',
    'new/index.html',
    'new/tokyo/index.html',
    'new/adelaide/index.html',
    'new/about/index.html',
}
changed = set(subprocess.check_output(['git', 'diff', '--name-only', 'master...HEAD'], text=True).splitlines())
extra = sorted(p for p in changed if p not in allowed and not p.startswith('docs/plans/camp-v2-screenshots/'))
if extra:
    raise SystemExit('FAIL unexpected changed files: ' + ', '.join(extra))
if any(p.startswith('astro/') for p in changed):
    raise SystemExit('FAIL astro/ was touched')
if any(p in {'index.html', 'styles.css', 'CNAME'} for p in changed):
    raise SystemExit('FAIL root site file or CNAME was touched')
print('PASS changed files limited to camp-v2 scope')
PY
grep -Fq '.hero-sub { margin-top:clamp(0.9rem,1.8vw,1.5rem); font-weight:600; font-size:clamp(1.25rem,2.2vw,2rem); line-height:1.25; letter-spacing:-0.015em; max-width:32ch; color:var(--muted); }' new/miso.css && echo 'PASS hero-sub CSS exact'
grep -Fq '.sched { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2rem,4.5vw,4.5rem); margin-top:clamp(2rem,3.5vw,3rem); }' new/miso.css && echo 'PASS sched CSS exact'
grep -Fq '.slot-time { font-size:0.85rem; font-weight:700; color:var(--accent); padding-top:0.15rem; }' new/miso.css && echo 'PASS slot-time CSS exact'
```

Expected output:

```text
PASS on branch camp-v2
PASS changed files limited to camp-v2 scope
PASS hero-sub CSS exact
PASS sched CSS exact
PASS slot-time CSS exact
```

- [ ] **Step 2: Verify required camp-page content, section numbering, schedules, and non-ASCII strings**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for file in new/tokyo/index.html new/adelaide/index.html; do
  grep -Fq '<a href="#schedule">Schedule</a>' "$file" && echo "PASS ${file} nav includes Schedule"
  grep -Fq '<div class="section-label"><span class="num">01</span><span class="label" id="overview-label">Overview</span></div>' "$file" && echo "PASS ${file} section 01 Overview"
  grep -Fq '<div class="section-label"><span class="num">02</span><span class="label" id="days-label">The two days</span></div>' "$file" && echo "PASS ${file} section 02 The two days"
  grep -Fq '<div class="section-label"><span class="num">03</span><span class="label" id="schedule-label">The schedule</span></div>' "$file" && echo "PASS ${file} section 03 The schedule"
  grep -Fq '<div class="section-label"><span class="num">04</span><span class="label" id="logistics-label">Logistics</span></div>' "$file" && echo "PASS ${file} section 04 Logistics"
  grep -Fq '<div class="section-label"><span class="num">05</span><span class="label" id="request-label">Request an invitation</span></div>' "$file" && echo "PASS ${file} section 05 Request"
  grep -Fq 'What happens on those two days. <span class="dim">Times are indicative — the exact rhythm may shift.</span>' "$file" && echo "PASS ${file} schedule em dash byte-exact"
  grep -Fq 'Request an invitation ↗' "$file" && echo "PASS ${file} arrow byte-exact"
done
grep -Fq '<p class="hero-sub">In collaboration with Chiba Institute of Technology.</p>' new/tokyo/index.html && echo 'PASS Tokyo hero-sub exact'
grep -Fq '<p class="hero-sub">In collaboration with Flinders University New Venture Institute and SA Futures Agency.</p>' new/adelaide/index.html && echo 'PASS Adelaide hero-sub exact'
grep -Fq 'Tokyo · 24–25 August 2026' new/tokyo/index.html && echo 'PASS Tokyo middot/date byte-exact'
grep -Fq 'Adelaide · 17–18 September 2026' new/adelaide/index.html && echo 'PASS Adelaide middot/date byte-exact'
grep -Fq 'Crypto Café Tokyo' new/tokyo/index.html && echo 'PASS Café byte-exact'
python3 - <<'PY'
from pathlib import Path
expected = [
('09:00', 'Welcome + frame'),
('10:00', "Methods you can't see"),
('11:40', 'Lunch'),
('12:40', 'Write it down, it compounds'),
('14:15', 'Explicit = shareable'),
('15:30', 'Form teams, or go solo'),
('16:15', 'Networking drinks'),
('09:00', 'Re-entry'),
('09:15', 'Morning frame: lock the build'),
('09:45', 'Build I'),
('11:15', 'Mid-build crit'),
('11:45', 'Lunch'),
('12:30', 'Build II'),
('14:00', 'Demo rounds'),
('14:45', 'Wrap, early finish'),
]
for path in ['new/tokyo/index.html', 'new/adelaide/index.html']:
    text = Path(path).read_text()
    for time, title in expected:
        needle = f'<div class="slot"><span class="slot-time">{time}</span><span>{title}</span></div>'
        if needle not in text:
            raise SystemExit(f'FAIL missing slot in {path}: {needle}')
    if text.count('<div class="slot"><span class="slot-time">') != 15:
        raise SystemExit(f'FAIL wrong slot count in {path}')
    schedule_start = text.index('<section class="section" id="schedule"')
    schedule_end = text.index('</section>', schedule_start)
    schedule = text[schedule_start:schedule_end]
    if '<p>' in schedule or '</p>' in schedule:
        raise SystemExit(f'FAIL schedule has descriptions in {path}')
    print(f'PASS {path} schedule has exact title-only slots')
PY
```

Expected output:

```text
PASS new/tokyo/index.html nav includes Schedule
PASS new/tokyo/index.html section 01 Overview
PASS new/tokyo/index.html section 02 The two days
PASS new/tokyo/index.html section 03 The schedule
PASS new/tokyo/index.html section 04 Logistics
PASS new/tokyo/index.html section 05 Request
PASS new/tokyo/index.html schedule em dash byte-exact
PASS new/tokyo/index.html arrow byte-exact
PASS new/adelaide/index.html nav includes Schedule
PASS new/adelaide/index.html section 01 Overview
PASS new/adelaide/index.html section 02 The two days
PASS new/adelaide/index.html section 03 The schedule
PASS new/adelaide/index.html section 04 Logistics
PASS new/adelaide/index.html section 05 Request
PASS new/adelaide/index.html schedule em dash byte-exact
PASS new/adelaide/index.html arrow byte-exact
PASS Tokyo hero-sub exact
PASS Adelaide hero-sub exact
PASS Tokyo middot/date byte-exact
PASS Adelaide middot/date byte-exact
PASS Café byte-exact
PASS new/tokyo/index.html schedule has exact title-only slots
PASS new/adelaide/index.html schedule has exact title-only slots
```

- [ ] **Step 3: Verify Adelaide facts and forbidden legacy wording across `/new/`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq '<dt>Venue</dt><dd>TBD</dd>' new/adelaide/index.html && echo 'PASS Adelaide camp venue TBD'
grep -Fq '<dt>In collaboration with</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>' new/adelaide/index.html && echo 'PASS Adelaide camp collaboration exact'
grep -Fq '<dt>Venue</dt><dd>TBD</dd>' new/index.html && echo 'PASS hub Adelaide venue TBD'
grep -Fq '<dt>Partner</dt><dd>Flinders University New Venture Institute and SA Futures Agency</dd>' new/index.html && echo 'PASS hub Adelaide partner exact'
grep -Fq '<dt>Adelaide</dt><dd>In collaboration with Flinders University New Venture Institute and SA Futures Agency</dd>' new/about/index.html && echo 'PASS About Adelaide collaborator exact'
grep -RniE 'supporting partner|Supported by|with SA Futures Agency as' new && { echo 'FAIL forbidden Adelaide legacy wording present under new/'; exit 1; } || echo 'PASS no supporting-partner legacy wording under new/'
grep -RniE 'styles\.css' new && { echo 'FAIL styles.css reference present under new/'; exit 1; } || echo 'PASS no styles.css references under new/'
```

Expected output:

```text
PASS Adelaide camp venue TBD
PASS Adelaide camp collaboration exact
PASS hub Adelaide venue TBD
PASS hub Adelaide partner exact
PASS About Adelaide collaborator exact
PASS no supporting-partner legacy wording under new/
PASS no styles.css references under new/
```

- [ ] **Step 4: Verify footer blocks are byte-identical across all four `/new/` pages**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
import re
footer_re = re.compile(r'  <footer class="footer">\n.*?\n  </footer>', re.S)
hub_match = footer_re.search(Path('new/index.html').read_text())
if not hub_match:
    raise SystemExit('FAIL footer missing in new/index.html')
hub = hub_match.group(0)
for path in ['new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html']:
    match = footer_re.search(Path(path).read_text())
    if not match:
        raise SystemExit(f'FAIL footer missing in {path}')
    block = match.group(0)
    if block != hub:
        Path('/tmp/camp-v2-hub-footer.txt').write_text(hub)
        Path('/tmp/camp-v2-page-footer.txt').write_text(block)
        raise SystemExit(f'FAIL footer differs in {path}; inspect diff -u /tmp/camp-v2-hub-footer.txt /tmp/camp-v2-page-footer.txt')
    print(f'PASS footer byte-identical for {path}')
PY
```

Expected output:

```text
PASS footer byte-identical for new/tokyo/index.html
PASS footer byte-identical for new/adelaide/index.html
PASS footer byte-identical for new/about/index.html
```

- [ ] **Step 5: Verify HTML tags are balanced with `html.parser`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}

class BalanceParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append(tag)
    def handle_startendtag(self, tag, attrs):
        pass
    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1] != tag:
            raise AssertionError(f'unbalanced closing tag </{tag}>; stack={self.stack}')
        self.stack.pop()

for path in ['new/index.html', 'new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html']:
    parser = BalanceParser()
    parser.feed(Path(path).read_text())
    parser.close()
    if parser.stack:
        raise SystemExit(f'FAIL unclosed tags in {path}: {parser.stack}')
    print(f'PASS tag-balanced {path}')
PY
```

Expected output:

```text
PASS tag-balanced new/index.html
PASS tag-balanced new/tokyo/index.html
PASS tag-balanced new/adelaide/index.html
PASS tag-balanced new/about/index.html
```

- [ ] **Step 6: Capture CDP screenshots on required ports and verify no horizontal overflow**

If Google Chrome is unavailable, STOP and report `BLOCKED camp-v2: Chrome unavailable for required screenshots`.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if lsof -ti:8801 >/dev/null 2>&1; then echo 'BLOCKED camp-v2: port 8801 occupied'; exit 1; fi
if lsof -ti:9424 >/dev/null 2>&1; then echo 'BLOCKED camp-v2: CDP port 9424 occupied'; exit 1; fi
python3 -m http.server 8801 >/tmp/miso-camp-v2-http.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
  if [ -n "${CHROME_PID:-}" ]; then kill "$CHROME_PID" >/dev/null 2>&1 || true; fi
  rm -rf /tmp/camp-v2-cdp 2>/dev/null || true
}
trap cleanup EXIT
sleep 1
mkdir -p docs/plans/camp-v2-screenshots
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then echo 'BLOCKED camp-v2: Chrome unavailable for required screenshots'; exit 1; fi
"$CHROME" --headless --disable-gpu --remote-debugging-port=9424 --user-data-dir=/tmp/camp-v2-cdp about:blank >/dev/null 2>&1 &
CHROME_PID=$!
sleep 2
node - <<'NODEEOF'
(async () => {
const list = await (await fetch('http://localhost:9424/json/list')).json();
const target = list.find(t => t.type === 'page');
if (!target) { console.error('FAIL no CDP page target'); process.exit(1); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0; const pend = new Map();
const send = (method, params={}) => new Promise((resolve, reject) => {
  const i = ++id;
  pend.set(i, {resolve, reject});
  ws.send(JSON.stringify({id:i, method, params}));
});
await new Promise(resolve => ws.onopen = resolve);
ws.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id && pend.has(message.id)) {
    const pending = pend.get(message.id);
    pend.delete(message.id);
    if (message.error) pending.reject(new Error(JSON.stringify(message.error)));
    else pending.resolve(message.result);
  }
};
await send('Page.enable');
let failed = false;
for (const page of [
  { path: '/new/tokyo/', slug: 'tokyo' },
  { path: '/new/adelaide/', slug: 'adelaide' }
]) {
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1200, deviceScaleFactor: 2, mobile: width < 900 });
    await send('Page.navigate', { url: 'http://127.0.0.1:8801' + page.path });
    await new Promise(resolve => setTimeout(resolve, 1200));
    const overflow = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth > document.documentElement.clientWidth', returnByValue: true });
    if (overflow.result.value) { console.error('FAIL overflow at ' + page.path + ' width ' + width); failed = true; }
    const scheduleStacks = await send('Runtime.evaluate', { expression: '(() => { const s = document.querySelector(".sched"); if (!s) return false; const cols = getComputedStyle(s).gridTemplateColumns.split(" ").length; return window.innerWidth >= 900 ? cols === 2 : cols === 1; })()', returnByValue: true });
    if (!scheduleStacks.result.value) { console.error('FAIL schedule grid columns at ' + page.path + ' width ' + width); failed = true; }
    const footer = await send('Runtime.evaluate', { expression: 'Boolean(document.querySelector("footer.footer"))', returnByValue: true });
    if (!footer.result.value) { console.error('FAIL missing footer at ' + page.path); failed = true; }
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: 2600, scale: 1 } });
    require('fs').writeFileSync('docs/plans/camp-v2-screenshots/' + page.slug + '-' + width + '.png', Buffer.from(shot.data, 'base64'));
  }
}
ws.close();
if (failed) { console.log('FAIL screenshot verification'); process.exit(1); }
console.log('PASS screenshots saved for Tokyo and Adelaide at desktop and 390px');
console.log('PASS no horizontal overflow at 390px');
console.log('PASS schedule stacks at 390px and remains two-column at desktop');
})();
NODEEOF
```

Expected output:

```text
PASS screenshots saved for Tokyo and Adelaide at desktop and 390px
PASS no horizontal overflow at 390px
PASS schedule stacks at 390px and remains two-column at desktop
```

- [ ] **Step 7: Verify screenshot files exist**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for file in \
  docs/plans/camp-v2-screenshots/tokyo-1440.png \
  docs/plans/camp-v2-screenshots/tokyo-390.png \
  docs/plans/camp-v2-screenshots/adelaide-1440.png \
  docs/plans/camp-v2-screenshots/adelaide-390.png; do
  test -s "$file" && echo "PASS screenshot exists $file"
done
```

Expected output:

```text
PASS screenshot exists docs/plans/camp-v2-screenshots/tokyo-1440.png
PASS screenshot exists docs/plans/camp-v2-screenshots/tokyo-390.png
PASS screenshot exists docs/plans/camp-v2-screenshots/adelaide-1440.png
PASS screenshot exists docs/plans/camp-v2-screenshots/adelaide-390.png
```

- [ ] **Step 8: Commit Task 5**

```bash
git add docs/plans/camp-v2-screenshots
git commit -m "test: verify camp v2 pages"
```

Expected output includes:

```text
[camp-v2
```
