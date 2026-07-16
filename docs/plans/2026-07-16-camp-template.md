# Camp Detail Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. If any step fails twice, STOP and report `BLOCKED camp-template: <one-line reason>`.

**Goal:** Rebuild `/new/tokyo/` and `/new/adelaide/` as shared camp-detail template instances of the approved Swiss poster system.

**Architecture:** Static HTML and one shared CSS file. The hub remains the source of truth for header, footer, typography, and page register; the camp pages use `/new/miso.css` plus two small appended utility blocks.

**Tech Stack:** Static HTML, CSS, Python 3 standard library, Chrome DevTools Protocol via headless Chrome and Node WebSocket. No build tool, no JavaScript shipped to the site.

## Global Constraints

- Work on branch `camp-template`, from current `master`.
- Touch only `new/miso.css`, `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, and `docs/plans/camp-template-screenshots/` during implementation.
- Do not modify `_session.md` or workspace state files.
- Partner formula is always `In collaboration with [partner]`; no `free pilot`, no cost or price language anywhere.
- CTA is email-only on camp pages: `mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request` or `mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request`.
- No forms, no founder bios on camp pages, no invented testimonials, no session times, no cohort sizes, no prices.
- Do not prescribe undecided workshop mechanics: no `laptops closed`, no `On paper`, no mandated interview tool.
- All site paths are root-absolute and camp pages use `/new/miso.css` only.
- Non-ASCII characters are load-bearing: en dashes in dates, `é` in `Café`, and middots `·` in nav/meta.
- One commit per task, with the exact commit messages shown below.

## File Structure

- `new/miso.css`: append `.statement-sm` and `.facts` only.
- `new/index.html`: replace two camp CTA mailto lines with links to `/new/tokyo/` and `/new/adelaide/`.
- `new/tokyo/index.html`: full replacement with the shared camp-detail template and Tokyo copy.
- `new/adelaide/index.html`: full replacement with the shared camp-detail template and Adelaide copy.
- `docs/plans/camp-template-screenshots/`: generated verification screenshots only.

### Task 1: Add shared camp utilities and route hub camp CTAs to detail pages

**Files:**
- Modify: `new/miso.css`
- Modify: `new/index.html`

**Produces:**
- `.statement-sm` for camp-detail H1s.
- `.facts` for standalone logistics definition lists.
- Hub camp cards linking to detail pages instead of mailto CTAs.

- [ ] **Step 1: Create the branch from current `master`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
git pull --ff-only origin master
if git show-ref --verify --quiet refs/heads/camp-template; then echo "BLOCKED camp-template: branch camp-template already exists"; exit 1; fi
git switch -c camp-template >/dev/null
test "$(git branch --show-current)" = "camp-template" && echo "PASS on branch camp-template"
```

Expected output ends with:

```text
PASS on branch camp-template
```

- [ ] **Step 2: Append the complete camp utility CSS block to `new/miso.css`**

```bash
cat >> new/miso.css <<'EOF'

/* Camp detail utilities */
.statement-sm {
  font-size:clamp(2.2rem, 6vw, 5rem);
  max-width:16ch;
}

.facts {
  display:grid;
  grid-template-columns:auto 1fr;
  gap:0.45rem 1.4rem;
  margin:0;
  max-width:56rem;
}

.facts dt {
  color:var(--muted);
  font-weight:500;
}

.facts dd {
  margin:0;
  font-weight:500;
}
EOF
```

- [ ] **Step 3: Apply the two exact hub CTA line replacements against current `new/index.html`**

The current Tokyo line is:

```html
        <p class="cta"><a class="accent" href="mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request">Request an invitation ↗</a></p>
```

Replace it with:

```html
        <p class="cta"><a class="accent" href="/new/tokyo/">View Tokyo ↗</a></p>
```

The current Adelaide line is:

```html
        <p class="cta"><a class="accent" href="mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request">Request an invitation ↗</a></p>
```

Replace it with:

```html
        <p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>
```

Use this exact script so it fails if either old string is absent or duplicated:

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('new/index.html')
text = path.read_text()
replacements = {
    '        <p class="cta"><a class="accent" href="mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request">Request an invitation ↗</a></p>':
    '        <p class="cta"><a class="accent" href="/new/tokyo/">View Tokyo ↗</a></p>',
    '        <p class="cta"><a class="accent" href="mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request">Request an invitation ↗</a></p>':
    '        <p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>',
}
for old, new in replacements.items():
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'BLOCKED camp-template: expected one match for {old!r}, found {count}')
    text = text.replace(old, new)
path.write_text(text)
PY
```

Expected output: none.

- [ ] **Step 4: Verify Task 1 changed only the intended hub lines and appended CSS utilities**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq '.statement-sm {' new/miso.css && echo 'PASS statement-sm present'
grep -Fq '.facts {' new/miso.css && echo 'PASS facts present'
grep -Fq '<p class="cta"><a class="accent" href="/new/tokyo/">View Tokyo ↗</a></p>' new/index.html && echo 'PASS Tokyo hub link present'
grep -Fq '<p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>' new/index.html && echo 'PASS Adelaide hub link present'
git diff --unified=0 -- new/index.html > /tmp/camp-template-hub.diff
python3 - <<'PY'
from pathlib import Path
text = Path('/tmp/camp-template-hub.diff').read_text()
required = [
'-        <p class="cta"><a class="accent" href="mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request">Request an invitation ↗</a></p>',
'+        <p class="cta"><a class="accent" href="/new/tokyo/">View Tokyo ↗</a></p>',
'-        <p class="cta"><a class="accent" href="mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request">Request an invitation ↗</a></p>',
'+        <p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>',
]
for needle in required:
    if needle not in text:
        raise SystemExit(f'FAIL missing expected diff line: {needle}')
changed = [line for line in text.splitlines() if line.startswith(('+', '-')) and not line.startswith(('+++', '---'))]
if changed != required:
    raise SystemExit('FAIL hub diff includes changes beyond the two CTA lines')
print('PASS hub diff limited to two CTA lines')
PY
```

Expected output:

```text
PASS statement-sm present
PASS facts present
PASS Tokyo hub link present
PASS Adelaide hub link present
PASS hub diff limited to two CTA lines
```

- [ ] **Step 5: Commit Task 1**

```bash
git add new/miso.css new/index.html
git commit -m "feat: prepare camp template shared styles and hub links"
```

Expected output includes:

```text
[camp-template
```

### Task 2: Write the Tokyo camp-detail page

**Files:**
- Modify: `new/tokyo/index.html`

**Consumes:**
- `/new/miso.css` from Task 1.
- Hub header/footer class patterns from `new/index.html`.

**Produces:**
- A complete Tokyo camp-detail page using the shared template and Tokyo copy.

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

  <section class="section" id="logistics" aria-labelledby="logistics-label">
    <div class="section-label"><span class="num">03</span><span class="label" id="logistics-label">Logistics</span></div>
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
    <div class="section-label"><span class="num">04</span><span class="label" id="request-label">Request an invitation</span></div>
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

- [ ] **Step 2: Verify Tokyo page facts, copy, and forbidden strings**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Eiq 'free pilot|laptops closed|On paper|testimonial|styles\.css' new/tokyo/index.html && { echo 'FAIL Tokyo forbidden string present'; exit 1; } || echo 'PASS Tokyo forbidden strings absent'
grep -Fq '/new/miso.css' new/tokyo/index.html && echo 'PASS Tokyo uses miso.css'
grep -Fq 'In collaboration with' new/tokyo/index.html && echo 'PASS Tokyo collaboration formula present'
grep -Fq 'mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request' new/tokyo/index.html && echo 'PASS Tokyo mailto subject present'
grep -Fq 'statement-sm' new/tokyo/index.html && echo 'PASS Tokyo statement-sm present'
for label in Before 'Day 1' 'Day 2' After; do grep -Fq ">${label}<" new/tokyo/index.html && echo "PASS Tokyo day label ${label}"; done
grep -Fq '24–25 August 2026' new/tokyo/index.html && echo 'PASS Tokyo date exact'
grep -Fq 'Crypto Café Tokyo' new/tokyo/index.html && echo 'PASS Tokyo venue exact'
grep -Fq 'Chiba Institute of Technology' new/tokyo/index.html && echo 'PASS Tokyo partner exact'
```

Expected output:

```text
PASS Tokyo forbidden strings absent
PASS Tokyo uses miso.css
PASS Tokyo collaboration formula present
PASS Tokyo mailto subject present
PASS Tokyo statement-sm present
PASS Tokyo day label Before
PASS Tokyo day label Day 1
PASS Tokyo day label Day 2
PASS Tokyo day label After
PASS Tokyo date exact
PASS Tokyo venue exact
PASS Tokyo partner exact
```

- [ ] **Step 3: Commit Task 2**

```bash
git add new/tokyo/index.html
git commit -m "feat: rebuild Tokyo camp detail page"
```

Expected output includes:

```text
[camp-template
```

### Task 3: Write the Adelaide camp-detail page

**Files:**
- Modify: `new/adelaide/index.html`

**Consumes:**
- `/new/miso.css` from Task 1.
- Hub header/footer class patterns from `new/index.html`.

**Produces:**
- A complete Adelaide camp-detail page using the shared template and Adelaide copy.

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
  <meta name="description" content="Make It So Camp Adelaide is a two-day AI workshop at Flinders University New Venture Institute, with SA Futures Agency as a supporting partner.">
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
    <p class="hero-cta"><a href="mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request">Request an invitation ↗</a></p>
  </section>

  <section class="section" id="overview" aria-labelledby="overview-label">
    <div class="section-label"><span class="num">01</span><span class="label" id="overview-label">Overview</span></div>
    <p class="lead-statement">Two days to make your way of working legible — to a machine, and to people who work nothing like you. <span class="dim">This page is what to expect in Adelaide.</span></p>
    <div class="cols">
      <div>
        <p>Make It So Camp Adelaide runs over two days at Flinders University New Venture Institute, with SA Futures Agency as a supporting partner. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.</p>
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

  <section class="section" id="logistics" aria-labelledby="logistics-label">
    <div class="section-label"><span class="num">03</span><span class="label" id="logistics-label">Logistics</span></div>
    <dl class="facts">
      <dt>Dates</dt><dd>17–18 September 2026</dd>
      <dt>Venue</dt><dd>Flinders University New Venture Institute</dd>
      <dt>In collaboration with</dt><dd>Flinders University New Venture Institute</dd>
      <dt>Supported by</dt><dd>SA Futures Agency</dd>
      <dt>Format</dt><dd>Two days, hands-on</dd>
      <dt>Cohort</dt><dd>Deliberately mixed: academic, creative industries, corporate</dd>
      <dt>Bring</dt><dd>A real problem you are working on</dd>
    </dl>
  </section>

  <section class="section invite" id="request" aria-labelledby="request-label">
    <div class="section-label"><span class="num">04</span><span class="label" id="request-label">Request an invitation</span></div>
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

- [ ] **Step 2: Verify Adelaide page facts, copy, and forbidden strings**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Eiq 'free pilot|laptops closed|On paper|testimonial|styles\.css' new/adelaide/index.html && { echo 'FAIL Adelaide forbidden string present'; exit 1; } || echo 'PASS Adelaide forbidden strings absent'
grep -Fq '/new/miso.css' new/adelaide/index.html && echo 'PASS Adelaide uses miso.css'
grep -Fq 'In collaboration with' new/adelaide/index.html && echo 'PASS Adelaide collaboration formula present'
grep -Fq 'mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request' new/adelaide/index.html && echo 'PASS Adelaide mailto subject present'
grep -Fq 'statement-sm' new/adelaide/index.html && echo 'PASS Adelaide statement-sm present'
for label in Before 'Day 1' 'Day 2' After; do grep -Fq ">${label}<" new/adelaide/index.html && echo "PASS Adelaide day label ${label}"; done
grep -Fq '17–18 September 2026' new/adelaide/index.html && echo 'PASS Adelaide date exact'
grep -Fq 'Flinders University New Venture Institute' new/adelaide/index.html && echo 'PASS Adelaide venue exact'
grep -Fq 'SA Futures Agency' new/adelaide/index.html && echo 'PASS Adelaide supporting partner exact'
```

Expected output:

```text
PASS Adelaide forbidden strings absent
PASS Adelaide uses miso.css
PASS Adelaide collaboration formula present
PASS Adelaide mailto subject present
PASS Adelaide statement-sm present
PASS Adelaide day label Before
PASS Adelaide day label Day 1
PASS Adelaide day label Day 2
PASS Adelaide day label After
PASS Adelaide date exact
PASS Adelaide venue exact
PASS Adelaide supporting partner exact
```

- [ ] **Step 3: Commit Task 3**

```bash
git add new/adelaide/index.html
git commit -m "feat: rebuild Adelaide camp detail page"
```

Expected output includes:

```text
[camp-template
```

### Task 4: Final verification and screenshots

**Files:**
- Create: `docs/plans/camp-template-screenshots/`

**Consumes:**
- Task 1 CSS and hub updates.
- Task 2 Tokyo page.
- Task 3 Adelaide page.

**Produces:**
- Static verification output for the approved spec.
- Four screenshots: Tokyo and Adelaide at 1440px and 390px.
- A final verification commit.

- [ ] **Step 1: Verify branch, stylesheet, hub links, forbidden strings, required strings, and exact facts**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test "$(git branch --show-current)" = "camp-template" && echo 'PASS on branch camp-template'
grep -Fq '.statement-sm {' new/miso.css && echo 'PASS statement-sm CSS present'
grep -Fq '.facts {' new/miso.css && echo 'PASS facts CSS present'
grep -Fq '<p class="cta"><a class="accent" href="/new/tokyo/">View Tokyo ↗</a></p>' new/index.html && echo 'PASS hub links to Tokyo page'
grep -Fq '<p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>' new/index.html && echo 'PASS hub links to Adelaide page'
grep -RniE 'free pilot|Free pilot|laptops closed|On paper|testimonial|styles\.css' new/tokyo/index.html new/adelaide/index.html && { echo 'FAIL forbidden string present'; exit 1; } || echo 'PASS forbidden strings absent on camp pages'
for file in new/tokyo/index.html new/adelaide/index.html; do
  grep -Fq 'miso.css' "$file" && echo "PASS ${file} uses miso.css"
  grep -Fq 'In collaboration with' "$file" && echo "PASS ${file} has collaboration formula"
  grep -Fq 'statement-sm' "$file" && echo "PASS ${file} has statement-sm"
  for label in Before 'Day 1' 'Day 2' After; do grep -Fq ">${label}<" "$file" && echo "PASS ${file} day label ${label}"; done
done
grep -Fq 'mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request' new/tokyo/index.html && echo 'PASS Tokyo subject exact'
grep -Fq 'mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request' new/adelaide/index.html && echo 'PASS Adelaide subject exact'
grep -Fq '24–25 August 2026' new/tokyo/index.html && echo 'PASS Tokyo date byte-exact'
grep -Fq 'Crypto Café Tokyo' new/tokyo/index.html && echo 'PASS Tokyo venue byte-exact'
grep -Fq 'Chiba Institute of Technology' new/tokyo/index.html && echo 'PASS Tokyo partner byte-exact'
grep -Fq '17–18 September 2026' new/adelaide/index.html && echo 'PASS Adelaide date byte-exact'
grep -Fq 'Flinders University New Venture Institute' new/adelaide/index.html && echo 'PASS Adelaide venue byte-exact'
grep -Fq 'SA Futures Agency' new/adelaide/index.html && echo 'PASS Adelaide supporting partner byte-exact'
```

Expected output:

```text
PASS on branch camp-template
PASS statement-sm CSS present
PASS facts CSS present
PASS hub links to Tokyo page
PASS hub links to Adelaide page
PASS forbidden strings absent on camp pages
PASS new/tokyo/index.html uses miso.css
PASS new/tokyo/index.html has collaboration formula
PASS new/tokyo/index.html has statement-sm
PASS new/tokyo/index.html day label Before
PASS new/tokyo/index.html day label Day 1
PASS new/tokyo/index.html day label Day 2
PASS new/tokyo/index.html day label After
PASS new/adelaide/index.html uses miso.css
PASS new/adelaide/index.html has collaboration formula
PASS new/adelaide/index.html has statement-sm
PASS new/adelaide/index.html day label Before
PASS new/adelaide/index.html day label Day 1
PASS new/adelaide/index.html day label Day 2
PASS new/adelaide/index.html day label After
PASS Tokyo subject exact
PASS Adelaide subject exact
PASS Tokyo date byte-exact
PASS Tokyo venue byte-exact
PASS Tokyo partner byte-exact
PASS Adelaide date byte-exact
PASS Adelaide venue byte-exact
PASS Adelaide supporting partner byte-exact
```

- [ ] **Step 2: Verify hub diff is limited to two CTA lines and stylesheet diff contains only the appended camp utility block**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git diff master...HEAD --unified=0 -- new/index.html > /tmp/camp-template-hub-final.diff
python3 - <<'PY'
from pathlib import Path
text = Path('/tmp/camp-template-hub-final.diff').read_text()
required = [
'-        <p class="cta"><a class="accent" href="mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request">Request an invitation ↗</a></p>',
'+        <p class="cta"><a class="accent" href="/new/tokyo/">View Tokyo ↗</a></p>',
'-        <p class="cta"><a class="accent" href="mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request">Request an invitation ↗</a></p>',
'+        <p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>',
]
for needle in required:
    if needle not in text:
        raise SystemExit(f'FAIL missing hub diff line: {needle}')
changed = [line for line in text.splitlines() if line.startswith(('+', '-')) and not line.startswith(('+++', '---'))]
if changed != required:
    raise SystemExit('FAIL hub diff includes changes beyond the two CTA lines')
print('PASS hub diff limited to two CTA lines')
PY
git diff master...HEAD --unified=0 -- new/miso.css > /tmp/camp-template-css-final.diff
python3 - <<'PY'
from pathlib import Path
text = Path('/tmp/camp-template-css-final.diff').read_text()
block = '''+
+/* Camp detail utilities */
+.statement-sm {
+  font-size:clamp(2.2rem, 6vw, 5rem);
+  max-width:16ch;
+}
+
+.facts {
+  display:grid;
+  grid-template-columns:auto 1fr;
+  gap:0.45rem 1.4rem;
+  margin:0;
+  max-width:56rem;
+}
+
+.facts dt {
+  color:var(--muted);
+  font-weight:500;
+}
+
+.facts dd {
+  margin:0;
+  font-weight:500;
+}'''
changed = '\n'.join(line for line in text.splitlines() if line.startswith(('+', '-')) and not line.startswith(('+++', '---')))
if block not in changed:
    raise SystemExit('FAIL appended CSS block not found exactly')
minus_lines = [line for line in changed.splitlines() if line.startswith('-')]
if minus_lines:
    raise SystemExit('FAIL stylesheet has removals or edits, not append-only')
print('PASS stylesheet diff is append-only camp utilities')
PY
```

Expected output:

```text
PASS hub diff limited to two CTA lines
PASS stylesheet diff is append-only camp utilities
```

- [ ] **Step 3: Verify footer blocks are byte-identical to the hub footer**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
import re
footer_re = re.compile(r'  <footer class="footer">\n.*?\n  </footer>', re.S)
hub = footer_re.search(Path('new/index.html').read_text()).group(0)
for path in ['new/tokyo/index.html', 'new/adelaide/index.html']:
    block = footer_re.search(Path(path).read_text()).group(0)
    if block != hub:
        Path('/tmp/hub-footer.txt').write_text(hub)
        Path('/tmp/camp-footer.txt').write_text(block)
        raise SystemExit(f'FAIL footer differs in {path}; inspect diff -u /tmp/hub-footer.txt /tmp/camp-footer.txt')
    print(f'PASS footer byte-identical for {path}')
PY
```

Expected output:

```text
PASS footer byte-identical for new/tokyo/index.html
PASS footer byte-identical for new/adelaide/index.html
```

- [ ] **Step 4: Verify HTML tags are balanced with `html.parser`**

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

for path in ['new/tokyo/index.html', 'new/adelaide/index.html']:
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
PASS tag-balanced new/tokyo/index.html
PASS tag-balanced new/adelaide/index.html
```

- [ ] **Step 5: Capture CDP screenshots for both camp pages at 1440px and 390px, and verify no horizontal overflow**

If Google Chrome is unavailable, STOP and report `BLOCKED camp-template: Chrome unavailable for required screenshots`.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if lsof -ti:8797 >/dev/null 2>&1; then echo 'BLOCKED camp-template: port 8797 occupied'; exit 1; fi
python3 -m http.server 8797 >/tmp/miso-camp-template-http.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
  if [ -n "${CHROME_PID:-}" ]; then kill "$CHROME_PID" >/dev/null 2>&1 || true; fi
  rm -rf /tmp/camp-template-cdp 2>/dev/null || true
}
trap cleanup EXIT
sleep 1
mkdir -p docs/plans/camp-template-screenshots
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then echo 'BLOCKED camp-template: Chrome unavailable for required screenshots'; exit 1; fi
"$CHROME" --headless --disable-gpu --remote-debugging-port=9421 --user-data-dir=/tmp/camp-template-cdp about:blank >/dev/null 2>&1 &
CHROME_PID=$!
sleep 2
node - <<'NODEEOF'
(async () => {
const list = await (await fetch('http://localhost:9421/json/list')).json();
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
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1100, deviceScaleFactor: 2, mobile: width < 900 });
    await send('Page.navigate', { url: 'http://127.0.0.1:8797' + page.path });
    await new Promise(resolve => setTimeout(resolve, 1200));
    const overflow = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth > document.documentElement.clientWidth', returnByValue: true });
    if (overflow.result.value) { console.error('FAIL overflow at ' + page.path + ' width ' + width); failed = true; }
    const footer = await send('Runtime.evaluate', { expression: 'Boolean(document.querySelector("footer.footer"))', returnByValue: true });
    if (!footer.result.value) { console.error('FAIL missing footer at ' + page.path); failed = true; }
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: 2400, scale: 1 } });
    require('fs').writeFileSync('docs/plans/camp-template-screenshots/' + page.slug + '-' + width + '.png', Buffer.from(shot.data, 'base64'));
  }
}
ws.close();
if (failed) { console.log('FAIL screenshot verification'); process.exit(1); }
console.log('PASS screenshots saved for Tokyo and Adelaide at desktop and 390px');
console.log('PASS no horizontal overflow at 390px');
})();
NODEEOF
```

Expected output:

```text
PASS screenshots saved for Tokyo and Adelaide at desktop and 390px
PASS no horizontal overflow at 390px
```

- [ ] **Step 6: Verify screenshot files exist**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for file in \
  docs/plans/camp-template-screenshots/tokyo-1440.png \
  docs/plans/camp-template-screenshots/tokyo-390.png \
  docs/plans/camp-template-screenshots/adelaide-1440.png \
  docs/plans/camp-template-screenshots/adelaide-390.png; do
  test -s "$file" && echo "PASS screenshot exists $file"
done
```

Expected output:

```text
PASS screenshot exists docs/plans/camp-template-screenshots/tokyo-1440.png
PASS screenshot exists docs/plans/camp-template-screenshots/tokyo-390.png
PASS screenshot exists docs/plans/camp-template-screenshots/adelaide-1440.png
PASS screenshot exists docs/plans/camp-template-screenshots/adelaide-390.png
```

- [ ] **Step 7: Commit Task 4**

```bash
git add docs/plans/camp-template-screenshots
git commit -m "test: verify camp template pages"
```

Expected output includes:

```text
[camp-template
```
