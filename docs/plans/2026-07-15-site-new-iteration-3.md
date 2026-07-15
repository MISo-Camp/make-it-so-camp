# Site New Iteration 3 Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans task-by-task. If any step fails twice, STOP and report `BLOCKED iter3-plan: <one-line reason>`.

**Goal:** Apply iteration-3 `/new/` site changes: copy fixes, heading tracking, section-head rule alignment, About page, and slim footer.

**Architecture:** Static HTML/CSS only. The section-head fix is CSS-only; current markup already supports it, so no section-head HTML restructuring is required.

**Tech Stack:** Static HTML, shared CSS, Google Fonts, Formspree. No new dependencies.

## Global Constraints

- Work on branch `site-new-3`, from current `master`.
- Touch only `new/styles.css`, `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`, and `docs/plans/iteration-3-screenshots`.
- Do not modify `_session.md` or workspace state files.
- Use `mailto:hello@misocamp.com` for the hub outreach line and slim footer on all four pages.
- Use `#[0-9A-Fa-f]{3,8}\b` for hardcoded-color grep.
- One commit per task.

## File Structure

- `new/index.html`: hub page.
- `new/tokyo/index.html`: Tokyo page.
- `new/adelaide/index.html`: Adelaide page.
- `new/styles.css`: shared stylesheet.
- `new/about/index.html`: About page with verbatim bios.

### Task 1: Apply iteration-3 content changes

Branch setup:

Branch setup:

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
if git show-ref --verify --quiet refs/heads/site-new-3; then echo "BLOCKED iter3-plan: branch site-new-3 already exists"; exit 1; fi
git switch -c site-new-3 >/dev/null
test "$(git branch --show-current)" = "site-new-3" && echo "PASS on branch site-new-3"
```

Expected output:

```text
PASS on branch site-new-3
```

Create `new/about/`, then write these complete files. They already include the copy fixes, heading tracking, and section-head rule from the approved spec, so writing them is the single action that produces all of iteration 3's content:

Create `new/about/`, then write these complete files.

#### `new/styles.css`

```bash
cat > new/styles.css <<'EOF'
:root {
  --paper:#FCFBF8;
  --surface:#FFFFFF;
  --ink:#211A16;
  --muted:#6E6259;
  --rule:#E7DFD5;
  --accent:#A63D2F;
  --accent-deep:#822C20;
  --accent-tint:rgba(166,61,47,0.06);
  --font-serif:"Newsreader", Georgia, serif;
  --font-mono:"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --measure:68ch;
  --wide:1160px;
  --radius:1.2rem;
  --radius-small:0.65rem;
  --space-page:clamp(1.25rem, 4vw, 3rem);
}

* {
  box-sizing:border-box;
}

html {
  background:var(--paper);
  color:var(--ink);
  font-family:var(--font-serif);
  scroll-behavior:smooth;
}

body {
  margin:0;
  background:var(--paper);
  color:var(--ink);
  font-family:var(--font-serif);
  font-size:clamp(1.05rem, 0.98rem + 0.32vw, 1.25rem);
  line-height:1.58;
  text-rendering:optimizeLegibility;
}

img,
svg {
  display:block;
  max-width:100%;
}

a {
  color:var(--accent-deep);
  text-decoration-thickness:0.06em;
  text-underline-offset:0.16em;
}

a:hover {
  color:var(--accent);
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline:2px solid var(--accent);
  outline-offset:0.18rem;
}

p,
ul,
ol {
  max-width:var(--measure);
}

p {
  margin:0 0 1rem;
}

ul,
ol {
  margin:0;
  padding-left:1.3rem;
}

li + li {
  margin-top:0.45rem;
}

h1,
h2,
h3,
h4 {
  margin:0;
  font-family:var(--font-serif);
  font-weight:500;
  letter-spacing:-0.01em;
  line-height:1.04;
  text-wrap:balance;
}

h1 {
  max-width:12ch;
  font-size:clamp(3.7rem, 12vw, 8.5rem);
}

h2 {
  max-width:15ch;
  font-size:clamp(2.25rem, 6vw, 4.8rem);
}

h3 {
  font-size:clamp(1.35rem, 2.5vw, 2rem);
}

h4 {
  font-size:1.08rem;
}

strong {
  font-weight:650;
}

.site-header {
  position:sticky;
  top:0;
  z-index:10;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  padding:0.9rem var(--space-page);
  border-bottom:1px solid var(--rule);
  background:var(--paper);
}

.wordmark {
  font-size:1.15rem;
  font-weight:650;
  letter-spacing:-0.015em;
  color:var(--ink);
  text-decoration:none;
}

.nav-list,
.kicker,
.meta,
.eyebrow,
.date-line,
.time,
.shift-number,
.label,
.tag {
  font-family:var(--font-mono);
  font-size:0.72rem;
  font-weight:500;
  letter-spacing:0.12em;
  line-height:1.45;
  text-transform:uppercase;
}

.nav-list {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:flex-end;
  gap:0.9rem;
  list-style:none;
  padding:0;
}

.nav-list li {
  margin:0;
}

.nav-list a {
  color:var(--muted);
  text-decoration:none;
}

.nav-list a:hover {
  color:var(--accent-deep);
}

.page {
  min-height:100vh;
}

.hero,
.section,
.footer {
  padding-right:var(--space-page);
  padding-left:var(--space-page);
}

.hero {
  display:grid;
  grid-template-columns:minmax(0, 1.15fr) minmax(18rem, 0.85fr);
  gap:clamp(2rem, 7vw, 6rem);
  align-items:end;
  max-width:var(--wide);
  margin:0 auto;
  padding-top:clamp(4.5rem, 10vw, 8rem);
  padding-bottom:clamp(4rem, 9vw, 7rem);
}

.hero-narrow {
  grid-template-columns:minmax(0, 1fr);
  max-width:900px;
}

.hero-copy {
  display:grid;
  gap:1.25rem;
}

.hero-aside {
  display:grid;
  gap:1rem;
  align-content:start;
  padding:1.1rem;
  border:1px solid var(--rule);
  border-radius:var(--radius);
  background:var(--surface);
}

.eyebrow,
.kicker,
.label,
.tag,
.meta,
.date-line,
.time,
.shift-number {
  color:var(--muted);
}

.thesis {
  max-width:16ch;
  font-size:clamp(1.85rem, 4.5vw, 4.2rem);
  line-height:1.08;
  letter-spacing:-0.03em;
}

.lede {
  max-width:44ch;
  font-size:clamp(1.25rem, 2.3vw, 1.8rem);
  line-height:1.32;
  color:var(--ink);
}

.section {
  padding-top:clamp(3.5rem, 8vw, 7rem);
  padding-bottom:clamp(3.5rem, 8vw, 7rem);
  border-top:1px solid var(--rule);
}

.section-inner {
  max-width:var(--wide);
  margin:0 auto;
}

.section-head {
  display:grid;
  grid-template-columns:minmax(0, 0.82fr) minmax(18rem, 1fr);
  gap:clamp(1.5rem, 5vw, 4rem);
  align-items:start;
  margin-bottom:clamp(1.75rem, 4vw, 3rem);
  padding-top:1.15rem;
  border-top:1px solid var(--rule);
}

.section-head > div {
  display:grid;
  gap:0.65rem;
}

.section-head .eyebrow {
  margin-top:-2.25rem;
  margin-bottom:0;
}

.section-lead {
  font-size:clamp(1.15rem, 1.7vw, 1.45rem);
  line-height:1.38;
  color:var(--muted);
}

.grid {
  display:grid;
  grid-template-columns:repeat(2, minmax(0, 1fr));
  gap:1rem;
}

.grid-three {
  grid-template-columns:repeat(3, minmax(0, 1fr));
}

.card,
.camp-card,
.shift-card,
.flow-card,
.schedule-card,
.form-panel {
  border:1px solid var(--rule);
  border-radius:var(--radius);
  background:var(--surface);
}

.card,
.shift-card,
.flow-card,
.schedule-card,
.form-panel {
  padding:clamp(1rem, 3vw, 1.45rem);
}

.card,
.flow-card {
  display:grid;
  gap:0.75rem;
}

.card p,
.flow-card p,
.schedule-card p,
.camp-card p {
  color:var(--muted);
}

.camp-card {
  display:grid;
  grid-template-rows:auto 1fr auto;
  gap:1rem;
  padding:clamp(1.1rem, 3vw, 1.65rem);
  min-height:100%;
  color:var(--ink);
  text-decoration:none;
}

.camp-card:hover {
  border-color:var(--accent);
  color:var(--ink);
}

.camp-card-top {
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:1rem;
}

.camp-card .icon {
  color:var(--accent);
}

.button-row {
  display:flex;
  flex-wrap:wrap;
  gap:0.75rem;
  align-items:center;
}

.button {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:0.45rem;
  min-height:2.75rem;
  padding:0.72rem 1rem;
  border:1px solid var(--accent-deep);
  border-radius:999px;
  background:var(--accent-deep);
  color:var(--paper);
  font-family:var(--font-serif);
  font-size:1rem;
  line-height:1;
  text-decoration:none;
}

.button:hover {
  background:var(--accent);
  color:var(--paper);
}

.button-secondary {
  background:var(--paper);
  color:var(--accent-deep);
}

.button-secondary:hover {
  background:var(--accent-tint);
  color:var(--accent-deep);
}

.pill-row {
  display:flex;
  flex-wrap:wrap;
  gap:0.5rem;
  padding:0;
  list-style:none;
}

.pill-row li {
  margin:0;
}

.tag {
  display:inline-flex;
  align-items:center;
  min-height:1.75rem;
  padding:0.3rem 0.55rem;
  border:1px solid var(--rule);
  border-radius:999px;
  background:var(--accent-tint);
  color:var(--accent-deep);
}

.shift-list {
  position:relative;
  display:grid;
  gap:1rem;
}

.shift-list::before {
  content:"";
  position:absolute;
  top:1.4rem;
  bottom:1.4rem;
  left:1.18rem;
  width:1px;
  background:var(--rule);
}

.shift-item {
  position:relative;
  display:grid;
  grid-template-columns:2.45rem minmax(0, 1fr);
  gap:1rem;
}

.shift-number {
  position:relative;
  z-index:1;
  display:grid;
  place-items:center;
  width:2.45rem;
  height:2.45rem;
  border:1px solid var(--accent);
  border-radius:999px;
  background:var(--paper);
  color:var(--accent-deep);
  font-variant-numeric:tabular-nums;
}

.shift-card {
  display:grid;
  gap:0.75rem;
}

.shift-card dl {
  display:grid;
  gap:0.55rem;
  margin:0;
}

.shift-card .line {
  display:grid;
  grid-template-columns:5.4rem minmax(0, 1fr);
  gap:0.8rem;
}

.shift-card dt {
  color:var(--accent-deep);
  font-weight:650;
}

.shift-card dd {
  margin:0;
  color:var(--muted);
}

.flow {
  display:grid;
  gap:1rem;
}

.schedule {
  display:grid;
  gap:0.8rem;
}

.schedule-card {
  display:grid;
  grid-template-columns:8rem minmax(0, 1fr);
  gap:1rem;
  align-items:start;
}

.time {
  color:var(--accent-deep);
  font-variant-numeric:tabular-nums;
}

.duration {
  display:block;
  margin-top:0.14rem;
  color:var(--muted);
}

.partner-row {
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  gap:0.75rem;
  padding-top:1rem;
  border-top:1px solid var(--rule);
}

.partner-logo-chip {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-width:5.5rem;
  min-height:3.35rem;
  padding:0.42rem 0.7rem;
  border:1px solid var(--rule);
  border-radius:var(--radius-small);
  background:var(--surface);
}

.partner-logo {
  width:auto;
  height:2.5rem;
  object-fit:contain;
}

.partner-logo-small {
  height:2.15rem;
}

.signup-form {
  display:grid;
  gap:1rem;
}

.form-panel {
  max-width:720px;
}

.form-grid {
  display:grid;
  grid-template-columns:repeat(2, minmax(0, 1fr));
  gap:1rem;
}

.form-field {
  display:grid;
  gap:0.35rem;
}

.form-field-full {
  grid-column:1 / -1;
}

label {
  color:var(--muted);
}

input,
select,
textarea {
  width:100%;
  border:1px solid var(--rule);
  border-radius:var(--radius-small);
  background:var(--paper);
  color:var(--ink);
  font:inherit;
  padding:0.82rem 0.9rem;
}

textarea {
  min-height:8rem;
  resize:vertical;
}

.form-note {
  color:var(--muted);
  font-size:0.95rem;
}

.icon-sprite {
  display:none;
}

.icon {
  width:1.25rem;
  height:1.25rem;
  flex:none;
  color:currentColor;
}

.footer {
  padding-top:clamp(3rem, 7vw, 5.5rem);
  padding-bottom:2.5rem;
  border-top:1px solid var(--rule);
}

.footer-inner {
  max-width:var(--wide);
  margin:0 auto;
  color:var(--muted);
}

.footer-colophon p {
  margin-bottom:0;
}

.footer-colophon {
  padding-top:1rem;
  border-top:1px solid var(--rule);
}

@media (max-width:900px) {
  .hero,
  .section-head,
  .grid,
  .grid-three,
  .form-grid {
    grid-template-columns:1fr;
  }

  .hero {
    align-items:start;
  }

  .section-head .eyebrow {
    margin-top:0;
  }

  .hero-aside {
    max-width:42rem;
  }
}

@media (max-width:640px) {
  body {
    font-size:1.04rem;
  }

  .site-header {
    position:static;
    align-items:flex-start;
    flex-direction:column;
  }

  .nav-list {
    justify-content:flex-start;
  }

  .hero,
  .section {
    padding-top:3.25rem;
    padding-bottom:3.25rem;
  }

  .shift-item,
  .schedule-card {
    grid-template-columns:1fr;
  }

  .shift-list::before {
    display:none;
  }

  .shift-card .line {
    grid-template-columns:1fr;
    gap:0.1rem;
  }

  .partner-row {
    align-items:flex-start;
    flex-direction:column;
  }
}
EOF
```

#### `new/index.html`

```bash
cat > new/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Make It So Camp — AI work begins with articulation</title>
  <meta name="description" content="Make It So Camp is a two-day working format for people learning to articulate work clearly enough that AI systems can carry it out and teams can share the method.">
  <meta name="author" content="Make It So Camp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://misocamp.com/new/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://misocamp.com/new/">
  <meta property="og:site_name" content="Make It So Camp">
  <meta property="og:title" content="Make It So Camp — AI work begins with articulation">
  <meta property="og:description" content="Two-day camps in Tokyo and Adelaide for people turning tacit methods into clear, reusable AI-enabled work.">
  <meta property="og:image" content="https://misocamp.com/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Make It So Camp — AI work begins with articulation">
  <meta name="twitter:description" content="Two-day camps in Tokyo and Adelaide for people turning tacit methods into clear, reusable AI-enabled work.">
  <meta name="twitter:image" content="https://misocamp.com/og-image.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&amp;family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,650&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/new/styles.css">
</head>
<body>
  <svg class="icon-sprite" aria-hidden="true" focusable="false">
    <symbol id="ph-arrow-right" viewBox="0 0 256 256">
      <path d="M40 128h176M144 56l72 72-72 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
    <symbol id="ph-calendar" viewBox="0 0 256 256">
      <path d="M80 40v32M176 40v32M48 96h160M56 64h144a16 16 0 0 1 16 16v120a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
    <symbol id="ph-map-pin" viewBox="0 0 256 256">
      <path d="M128 136a32 32 0 1 0 0-64 32 32 0 0 0 0 64Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
      <path d="M208 104c0 72-80 120-80 120S48 176 48 104a80 80 0 0 1 160 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
  </svg>

  <header class="site-header">
    <a class="wordmark" href="/new/">Make It So Camp</a>
    <nav aria-label="Primary navigation">
      <ul class="nav-list">
        <li><a href="#format">Format</a></li>
        <li><a href="#camps">Camps</a></li>
        <li><a href="/new/tokyo/">Tokyo</a></li>
        <li><a href="/new/adelaide/">Adelaide</a></li>
      </ul>
    </nav>
  </header>

  <main class="page">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Two-day AI working camps</p>
        <h1>Make It So Camp</h1>
        <p class="thesis">You cannot delegate what you cannot articulate.</p>
        <p class="lede">A practical format for senior practitioners who want AI to extend their work without flattening their judgment. The point is not speed for its own sake. The point is clearer intent, reusable methods, and work that people can build and demo together.</p>
        <div class="button-row">
          <a class="button" href="/new/tokyo/">Tokyo camp <svg class="icon" aria-hidden="true"><use href="#ph-arrow-right"></use></svg></a>
          <a class="button button-secondary" href="/new/adelaide/">Adelaide pilot</a>
        </div>
      </div>
      <aside class="hero-aside" aria-label="Camp dates">
        <p class="kicker">Upcoming camps</p>
        <div>
          <p class="date-line">24–25 August 2026</p>
          <h3>Tokyo</h3>
          <p>Crypto Café Tokyo. In collaboration with Chiba Institute of Technology.</p>
        </div>
        <div>
          <p class="date-line">17–18 September 2026</p>
          <h3>Adelaide</h3>
          <p>Flinders University New Venture Institute.</p>
        </div>
      </aside>
    </section>

    <section class="section" id="why" aria-labelledby="why-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Why articulation</p>
            <h2 id="why-title">The strange truth.</h2>
          </div>
          <p class="section-lead">The people who get the most out of AI are not the most technical. When Claude Code shipped, developers quickly went from using it for code to directing it at everything else. Years of programming had trained them to state goals, constraints, and success criteria precisely. The machine does not guess. You have to say exactly what you mean.</p>
        </div>
        <p>That is the gap this camp works on. Not information: tutorials exist in abundance. The gap is turning years of tacit expertise into something precise enough for a machine to execute and a colleague to challenge. Most knowledge workers have never needed to make their methods explicit. The expertise lives in intuition, pattern recognition, and judgment calls made in milliseconds.</p>
        <p>Which is why experienced practitioners have the most to gain here. Twenty years of method is the raw material. The camp is where you write it down, hand it to a machine, and watch what it produces.</p>
      </div>
    </section>

    <section class="section" id="format" aria-labelledby="format-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">The format</p>
            <h2 id="format-title">Purposeful, not faster.</h2>
          </div>
          <p class="section-lead">Make It So Camp has two movements: Day 1 makes your method explicit; Day 2 turns that method into collaborative build work. Participants bring real work, make the hidden method visible, write it down, build something real with other people, and demo it to each other.</p>
        </div>
        <div class="shift-list" aria-label="The four Shifts">
          <article class="shift-item">
            <div class="shift-number">01</div>
            <div class="shift-card">
              <h3>Welcome + Frame</h3>
              <p class="kicker">The positioning shift: purposeful, not faster.</p>
              <p>Start from a real ambition rather than a task list. Name what you want to build, not only what you want to accelerate.</p>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">02</div>
            <div class="shift-card">
              <h3>Shift 2 · Methods You Can't See</h3>
              <p class="kicker">The articulation shift: the bottleneck is articulation, not the tech.</p>
              <p>Translate tacit judgment into instructions, constraints, and decision logic that another actor can follow.</p>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">03</div>
            <div class="shift-card">
              <h3>Shift 3 · Write It Down, It Compounds</h3>
              <p class="kicker">The reuse shift: documented once, reused all day.</p>
              <p>Turn the method into a head-start document so the next build begins from shared context instead of a blank page.</p>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">04</div>
            <div class="shift-card">
              <h3>Shift 4 · Explicit = Shareable</h3>
              <p class="kicker">The collaboration shift: if it is explicit, someone else can run it.</p>
              <p>Compare methods with peers, find overlaps, and leave with a protocol that can be challenged and improved.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="camps" aria-labelledby="camps-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">2026 camps</p>
            <h2 id="camps-title">Tokyo and Adelaide.</h2>
          </div>
          <p class="section-lead">Make It So Camp runs twice in 2026: in Tokyo in collaboration with Chiba Institute of Technology, and in Adelaide in collaboration with Flinders University's New Venture Institute. Both are two-day camps with a deliberately mixed cohort — academic, creative industries, corporate. If you want to bring Make It So Camp into your own context, <a href="mailto:hello@misocamp.com">get in touch</a>.</p>
        </div>
        <div class="grid">
          <a class="camp-card" href="/new/tokyo/" aria-label="Read about the Tokyo camp">
            <div class="camp-card-top">
              <div>
                <p class="date-line">24–25 August 2026</p>
                <h3>Tokyo</h3>
              </div>
              <svg class="icon" aria-hidden="true"><use href="#ph-map-pin"></use></svg>
            </div>
            <p>Crypto Café Tokyo. In collaboration with Chiba Institute of Technology.</p>
            <div class="partner-row" aria-label="Tokyo partner">
              <span class="label">In collaboration with</span>
              <span class="partner-logo-chip"><img class="partner-logo" src="/chiba-tech-logo.png" alt="Chiba Institute of Technology"></span>
            </div>
          </a>
          <a class="camp-card" href="/new/adelaide/" aria-label="Read about the Adelaide pilot">
            <div class="camp-card-top">
              <div>
                <p class="date-line">17–18 September 2026</p>
                <h3>Adelaide</h3>
              </div>
              <svg class="icon" aria-hidden="true"><use href="#ph-calendar"></use></svg>
            </div>
            <p>Flinders University New Venture Institute. The same two-day format.</p>
            <div class="partner-row" aria-label="Adelaide partners">
              <span class="label">In collaboration with</span>
              <span class="partner-logo-chip"><img class="partner-logo" src="/flinders-nvi-logo.jpg" alt="Flinders University New Venture Institute"></span>
            </div>
            <div class="partner-row" aria-label="Adelaide supporting partner">
              <span class="label">With</span>
              <span class="partner-logo-chip"><img class="partner-logo partner-logo-small" src="/sa-futures-agency-logo.png" alt="SA Futures Agency"></span>
            </div>
          </a>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-colophon">
        <p>Make It So Camp was created by Igor Schwarzmann and Noah Raford. <a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></p>
      </div>
    </div>
  </footer>
</body>
</html>
EOF
```

#### `new/tokyo/index.html`

```bash
cat > new/tokyo/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Make It So Camp Tokyo — 24–25 August 2026</title>
  <meta name="description" content="Make It So Camp Tokyo is a two-day participant camp at Crypto Café Tokyo on 24–25 August 2026, in collaboration with Chiba Institute of Technology.">
  <meta name="author" content="Make It So Camp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://misocamp.com/new/tokyo/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://misocamp.com/new/tokyo/">
  <meta property="og:site_name" content="Make It So Camp">
  <meta property="og:title" content="Make It So Camp Tokyo — 24–25 August 2026">
  <meta property="og:description" content="A two-day participant camp at Crypto Café Tokyo, built around articulation, reusable methods, and hands-on AI work.">
  <meta property="og:image" content="https://misocamp.com/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Make It So Camp Tokyo — 24–25 August 2026">
  <meta name="twitter:description" content="A two-day participant camp at Crypto Café Tokyo, built around articulation, reusable methods, and hands-on AI work.">
  <meta name="twitter:image" content="https://misocamp.com/og-image.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&amp;family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,650&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/new/styles.css">
</head>
<body>
  <svg class="icon-sprite" aria-hidden="true" focusable="false">
    <symbol id="ph-arrow-right" viewBox="0 0 256 256">
      <path d="M40 128h176M144 56l72 72-72 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
    <symbol id="ph-calendar" viewBox="0 0 256 256">
      <path d="M80 40v32M176 40v32M48 96h160M56 64h144a16 16 0 0 1 16 16v120a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
    <symbol id="ph-users" viewBox="0 0 256 256">
      <path d="M88 144a56 56 0 1 1 80 0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
      <path d="M32 216c10-38 44-64 96-64s86 26 96 64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
  </svg>

  <header class="site-header">
    <a class="wordmark" href="/new/">Make It So Camp</a>
    <nav aria-label="Primary navigation">
      <ul class="nav-list">
        <li><a href="/new/">Home</a></li>
        <li><a href="#before">Before</a></li>
        <li><a href="#schedule">Schedule</a></li>
        <li><a href="#apply">Apply</a></li>
      </ul>
    </nav>
  </header>

  <main class="page">
    <section class="hero hero-narrow">
      <div class="hero-copy">
        <p class="eyebrow">Tokyo camp · participant invitation</p>
        <h1>Make It So Camp Tokyo</h1>
        <p class="thesis">You cannot delegate what you cannot articulate.</p>
        <p class="lede">Two days at Crypto Café Tokyo for practitioners ready to turn tacit expertise into clear instructions, reusable methods, and a rough working thing they can build with others and demo back to the room.</p>
        <ul class="pill-row" aria-label="Tokyo camp facts">
          <li><span class="tag">24–25 August 2026</span></li>
          <li><span class="tag">Crypto Café Tokyo</span></li>
          <li><span class="tag">In collaboration with Chiba Institute of Technology</span></li>
        </ul>
        <div class="partner-row" aria-label="Tokyo partner">
          <span class="label">In collaboration with</span>
          <span class="partner-logo-chip"><img class="partner-logo" src="/chiba-tech-logo.png" alt="Chiba Institute of Technology"></span>
        </div>
      </div>
    </section>

    <section class="section" id="before" aria-labelledby="before-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Before the camp</p>
            <h2 id="before-title">Arrive with the room already visible.</h2>
          </div>
          <p class="section-lead">The work starts before everyone sits down together. A short AI interview gives the facilitators a view of what participants are wrestling with, so Day 1 begins from real patterns rather than generic assumptions.</p>
        </div>
        <div class="grid">
          <article class="card">
            <svg class="icon" aria-hidden="true"><use href="#ph-users"></use></svg>
            <h3>Pre-event interviews through Boswell</h3>
            <p>Each participant does a 15–20 minute AI interview instead of a written application. It probes AI experience, workflow, use cases, and tools. The responses cluster into a live heat map of what is in the room, shown on Day 1.</p>
          </article>
          <article class="card">
            <svg class="icon" aria-hidden="true"><use href="#ph-calendar"></use></svg>
            <h3>Bring-your-own prerequisites</h3>
            <p>Participants bring their own tokens, subscriptions, laptop, and some of their current ways of working. Day 1 runs on paper, with laptops closed until the Day 2 build.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="day-one-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Day 1</p>
            <h2 id="day-one-title">Implant the Thinking</h2>
          </div>
          <p class="section-lead">Day 1 moves through the four Shifts. Every block ends hands-on, on paper, and seeds what participants build on Day 2.</p>
        </div>
        <div class="shift-list" aria-label="Day 1 Shifts">
          <article class="shift-item">
            <div class="shift-number">01</div>
            <div class="shift-card">
              <h3>Welcome + Frame</h3>
              <p class="kicker">The positioning shift: purposeful, not faster.</p>
              <dl>
                <div class="line"><dt>Input</dt><dd>Arrive, settle, and see the Boswell heat map. The room starts with its own patterns in view.</dd></div>
                <div class="line"><dt>Apply</dt><dd>Trace a technology two or three hops out, then name one task you would merely accelerate and one thing you could newly build.</dd></div>
                <div class="line"><dt>Capture</dt><dd>Your candidate problem, framed as an ambition rather than a first-hop task.</dd></div>
              </dl>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">02</div>
            <div class="shift-card">
              <h3>Shift 2 · Methods You Can't See</h3>
              <p class="kicker">The articulation shift: the bottleneck is articulation, not the tech.</p>
              <dl>
                <div class="line"><dt>Input</dt><dd>Your method is invisible until you can teach it to a machine.</dd></div>
                <div class="line"><dt>Apply</dt><dd>Run a literal-instructions exercise, then map delegation for your real problem with a partner probing for gaps.</dd></div>
                <div class="line"><dt>Capture</dt><dd>Your two-sentence method or decision logic.</dd></div>
              </dl>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">03</div>
            <div class="shift-card">
              <h3>Shift 3 · Write It Down, It Compounds</h3>
              <p class="kicker">The reuse shift: documented once, reused all day.</p>
              <dl>
                <div class="line"><dt>Input</dt><dd>A head-start document is what lets the next build begin from shared context.</dd></div>
                <div class="line"><dt>Apply</dt><dd>Draft a head-start for your Day 2 problem, then test whether a fresh pair of eyes would understand it.</dd></div>
                <div class="line"><dt>Capture</dt><dd>The head-start document itself.</dd></div>
              </dl>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">04</div>
            <div class="shift-card">
              <h3>Shift 4 · Explicit = Shareable</h3>
              <p class="kicker">The collaboration shift: if it is explicit, someone else can run it.</p>
              <dl>
                <div class="line"><dt>Input</dt><dd>Explicit methods can be challenged, improved, and shared.</dd></div>
                <div class="line"><dt>Apply</dt><dd>Compare head-starts in your heat-map cluster and look for overlaps, contradictions, and useful matches.</dd></div>
                <div class="line"><dt>Capture</dt><dd>A shared starting protocol, plus who you may want to build with.</dd></div>
              </dl>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="day-two-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Day 2</p>
            <h2 id="day-two-title">Look at What It Produced</h2>
          </div>
          <p class="section-lead">The second day turns the Day 1 captures into collaborative build work. Participants team up or work solo, build from the methods they made explicit, critique each other, and demo to each other in rounds before an early finish.</p>
        </div>
        <div class="flow">
          <article class="flow-card">
            <h3>Build together</h3>
            <p>Groups and solo builders use the Day 1 problem and head-start document to build toward a clear demo target. The emphasis is on making the method usable with other people, while facilitators circulate through the room during the build blocks.</p>
          </article>
          <article class="flow-card">
            <h3>Demo to each other</h3>
            <p>Rather than one long sequence of presentations, groups of about four demo to each other in rounds. The format gives high exposure to other work and lets participants see how other teams translated explicit methods into artifacts.</p>
          </article>
          <article class="flow-card">
            <h3>Wrap + early finish</h3>
            <p>A short synthesis closes the camp around 15:00 so participants can travel home with the method and artifact still fresh.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="schedule" aria-labelledby="schedule-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Run of show</p>
            <h2 id="schedule-title">The shape of the two days.</h2>
          </div>
          <p class="section-lead">Both days start at 9:00. Day 1 is a full, well-paced day. Day 2 is deliberately shorter, with real collaborative build time, demo rounds, and an early finish.</p>
        </div>
        <h3>Day 1 — Implant the Thinking</h3>
        <div class="schedule" aria-label="Day 1 schedule">
          <article class="schedule-card"><div class="time">9:00–9:45<span class="duration">45 min</span></div><div><h4>Welcome + Frame</h4><p>Arrive, coffee, settle. The Boswell heat map goes up, followed by the framing and a paper exercise to name your candidate Day 2 problem.</p></div></article>
          <article class="schedule-card"><div class="time">9:45–10:00<span class="duration">15 min</span></div><div><h4>Break</h4></div></article>
          <article class="schedule-card"><div class="time">10:00–11:40<span class="duration">100 min</span></div><div><h4>Shift 2 · Methods You Can't See</h4><p>The articulation claim, a literal-instructions exercise, a Delegation Map on your real problem, and capture of your two-sentence method.</p></div></article>
          <article class="schedule-card"><div class="time">11:40–12:40<span class="duration">60 min</span></div><div><h4>Lunch</h4></div></article>
          <article class="schedule-card"><div class="time">12:40–14:00<span class="duration">80 min</span></div><div><h4>Shift 3 · Write It Down, It Compounds</h4><p>Turn your method into a head-start document and feel how much faster the next build can start from a written artifact.</p></div></article>
          <article class="schedule-card"><div class="time">14:00–14:15<span class="duration">15 min</span></div><div><h4>Break</h4></div></article>
          <article class="schedule-card"><div class="time">14:15–15:30<span class="duration">75 min</span></div><div><h4>Shift 4 · Explicit = Shareable</h4><p>Compare head-starts in heat-map clusters, looking for overlaps, contradictions, and people you may want to build with on Day 2.</p></div></article>
          <article class="schedule-card"><div class="time">15:30–16:00<span class="duration">30 min</span></div><div><h4>Form groups or go solo</h4><p>The heat map plus the day's captures help people self-organize. Solo builders remain a first-class option.</p></div></article>
          <article class="schedule-card"><div class="time">16:00–16:15<span class="duration">15 min</span></div><div><h4>Day 1 close</h4><p>Short synthesis. Everyone leaves knowing what to bring into the Day 2 build.</p></div></article>
          <article class="schedule-card"><div class="time">16:15 →<span class="duration">open</span></div><div><h4>Networking drinks</h4><p>Conversations continue while people are still fresh, so Day 2 begins with useful connections already made.</p></div></article>
        </div>
        <h3>Day 2 — Look at What It Produced</h3>
        <div class="schedule" aria-label="Day 2 schedule">
          <article class="schedule-card"><div class="time">9:00–9:15<span class="duration">15 min</span></div><div><h4>Re-entry</h4><p>Coffee and settling back in.</p></div></article>
          <article class="schedule-card"><div class="time">9:15–9:45<span class="duration">30 min</span></div><div><h4>Morning frame</h4><p>Lock the problem each group or solo builder will build, then state the demo target before collaborative work begins.</p></div></article>
          <article class="schedule-card"><div class="time">9:45–11:15<span class="duration">90 min</span></div><div><h4>Build I</h4><p>Build toward a rough working thing, together or solo. Facilitators circulate to answer questions.</p></div></article>
          <article class="schedule-card"><div class="time">11:15–11:45<span class="duration">30 min</span></div><div><h4>Mid-build crit</h4><p>Each group or solo builder swaps with a neighbor for a fast critique before the final stretch.</p></div></article>
          <article class="schedule-card"><div class="time">11:45–12:30<span class="duration">45 min</span></div><div><h4>Lunch</h4></div></article>
          <article class="schedule-card"><div class="time">12:30–14:00<span class="duration">90 min</span></div><div><h4>Build II</h4><p>Fold in the critique and push the shared work to demo-ready.</p></div></article>
          <article class="schedule-card"><div class="time">14:00–14:45<span class="duration">45 min</span></div><div><h4>Demo rounds</h4><p>Groups of about four demo to each other. Everyone presents, alone or paired.</p></div></article>
          <article class="schedule-card"><div class="time">14:45–15:00<span class="duration">15 min</span></div><div><h4>Wrap + early finish</h4><p>Short synthesis, thanks, and send-off.</p></div></article>
        </div>
      </div>
    </section>

    <section class="section" id="apply" aria-labelledby="apply-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Apply</p>
            <h2 id="apply-title">Tell us what you want to work on.</h2>
          </div>
          <p class="section-lead">This form expresses interest in the Tokyo camp. It is the first step, not automatic enrollment.</p>
        </div>
        <div class="form-panel">
          <form class="signup-form" action="https://formspree.io/f/xeeajpey" method="POST">
            <div class="form-grid">
              <div class="form-field">
                <label class="label" for="name">Name</label>
                <input type="text" id="name" name="name" autocomplete="name" required>
              </div>
              <div class="form-field">
                <label class="label" for="email">Email</label>
                <input type="email" id="email" name="email" autocomplete="email" required>
              </div>
              <div class="form-field">
                <label class="label" for="role">Role</label>
                <input type="text" id="role" name="role" autocomplete="organization-title" required>
              </div>
              <div class="form-field">
                <label class="label" for="link">LinkedIn or website</label>
                <input type="url" id="link" name="link" placeholder="https://">
              </div>
              <div class="form-field form-field-full">
                <label class="label" for="interest">What problem are you hoping to work on with AI?</label>
                <textarea id="interest" name="interest" required></textarea>
              </div>
              <input type="hidden" name="camp" value="Tokyo 24–25 August 2026">
            </div>
            <button class="button" type="submit">Apply for Tokyo <svg class="icon" aria-hidden="true"><use href="#ph-arrow-right"></use></svg></button>
            <p class="form-note">We will follow up with next steps and cohort details.</p>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-colophon">
        <p>Make It So Camp was created by Igor Schwarzmann and Noah Raford. <a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></p>
      </div>
    </div>
  </footer>
</body>
</html>
EOF
```

#### `new/adelaide/index.html`

```bash
cat > new/adelaide/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Make It So Camp Adelaide — 17–18 September 2026</title>
  <meta name="description" content="Make It So Camp Adelaide is a two-day pilot at Flinders University New Venture Institute on 17–18 September 2026.">
  <meta name="author" content="Make It So Camp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://misocamp.com/new/adelaide/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://misocamp.com/new/adelaide/">
  <meta property="og:site_name" content="Make It So Camp">
  <meta property="og:title" content="Make It So Camp Adelaide — 17–18 September 2026">
  <meta property="og:description" content="A two-day pilot at Flinders University New Venture Institute using the Make It So Camp format.">
  <meta property="og:image" content="https://misocamp.com/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Make It So Camp Adelaide — 17–18 September 2026">
  <meta name="twitter:description" content="A two-day pilot at Flinders University New Venture Institute using the Make It So Camp format.">
  <meta name="twitter:image" content="https://misocamp.com/og-image.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&amp;family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,650&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/new/styles.css">
</head>
<body>
  <svg class="icon-sprite" aria-hidden="true" focusable="false">
    <symbol id="ph-arrow-right" viewBox="0 0 256 256">
      <path d="M40 128h176M144 56l72 72-72 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
    <symbol id="ph-calendar" viewBox="0 0 256 256">
      <path d="M80 40v32M176 40v32M48 96h160M56 64h144a16 16 0 0 1 16 16v120a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
    <symbol id="ph-map-pin" viewBox="0 0 256 256">
      <path d="M128 136a32 32 0 1 0 0-64 32 32 0 0 0 0 64Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
      <path d="M208 104c0 72-80 120-80 120S48 176 48 104a80 80 0 0 1 160 0Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/>
    </symbol>
  </svg>

  <header class="site-header">
    <a class="wordmark" href="/new/">Make It So Camp</a>
    <nav aria-label="Primary navigation">
      <ul class="nav-list">
        <li><a href="/new/">Home</a></li>
        <li><a href="#format">Format</a></li>
        <li><a href="#apply">Interest form</a></li>
        <li><a href="/new/tokyo/">Tokyo</a></li>
      </ul>
    </nav>
  </header>

  <main class="page">
    <section class="hero hero-narrow">
      <div class="hero-copy">
        <p class="eyebrow">Adelaide pilot · two-day format</p>
        <h1>Make It So Camp Adelaide</h1>
        <p class="thesis">Making AI-enabled work explicit enough to share.</p>
        <p class="lede">Hosted at Flinders University New Venture Institute on 17–18 September 2026, the Adelaide pilot uses the same Make It So Camp structure: pre-session context, a day of articulation work, and a second day where participants build with others and demo what they made.</p>
        <ul class="pill-row" aria-label="Adelaide pilot facts">
          <li><span class="tag">17–18 September 2026</span></li>
          <li><span class="tag">Flinders University New Venture Institute</span></li>
        </ul>
        <div class="partner-row" aria-label="Adelaide partners">
          <span class="label">In collaboration with</span>
          <span class="partner-logo-chip"><img class="partner-logo" src="/flinders-nvi-logo.jpg" alt="Flinders University New Venture Institute"></span>
        </div>
        <div class="partner-row" aria-label="Adelaide supporting partner">
          <span class="label">With</span>
          <span class="partner-logo-chip"><img class="partner-logo partner-logo-small" src="/sa-futures-agency-logo.png" alt="SA Futures Agency"></span>
        </div>
      </div>
    </section>

    <section class="section" id="format" aria-labelledby="format-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Pilot shape</p>
            <h2 id="format-title">How the pilot runs.</h2>
          </div>
          <p class="section-lead">The Adelaide pilot is a co-designed learning instance of the camp. Day 1 makes the cohort's methods explicit; Day 2 turns those methods into collaborative build and demo work shaped around the participants, their work, and the New Venture Institute context.</p>
        </div>
        <div class="grid grid-three">
          <article class="card">
            <svg class="icon" aria-hidden="true"><use href="#ph-calendar"></use></svg>
            <h3>Before the pilot</h3>
            <p>An online pre-session roughly one month before the event surfaces what is top of mind for the cohort and gives facilitators a view of the room.</p>
          </article>
          <article class="card">
            <svg class="icon" aria-hidden="true"><use href="#ph-map-pin"></use></svg>
            <h3>Day 1</h3>
            <p>Participants work through the four Shifts: framing an ambition, making tacit methods visible, writing them down, and comparing them with others.</p>
          </article>
          <article class="card">
            <svg class="icon" aria-hidden="true"><use href="#ph-arrow-right"></use></svg>
            <h3>Day 2</h3>
            <p>Teams and solo builders turn the Day 1 captures into rough working artifacts, build with and around each other, critique the work, and demo to each other in smaller rounds.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="shifts-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Curriculum</p>
            <h2 id="shifts-title">The four Shifts.</h2>
          </div>
          <p class="section-lead">The curriculum is about articulation becoming action. Participants leave with a clearer method, a shared language for improving it, and something concrete to discuss.</p>
        </div>
        <div class="shift-list" aria-label="The four Shifts">
          <article class="shift-item">
            <div class="shift-number">01</div>
            <div class="shift-card">
              <h3>Welcome + Frame</h3>
              <p class="kicker">The positioning shift: purposeful, not faster.</p>
              <p>Name an ambition worth building toward, then identify the work that must become explicit enough to support it.</p>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">02</div>
            <div class="shift-card">
              <h3>Shift 2 · Methods You Can't See</h3>
              <p class="kicker">The articulation shift: the bottleneck is articulation, not the tech.</p>
              <p>Find the instructions, constraints, and judgment calls that usually stay inside a person's head.</p>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">03</div>
            <div class="shift-card">
              <h3>Shift 3 · Write It Down, It Compounds</h3>
              <p class="kicker">The reuse shift: documented once, reused all day.</p>
              <p>Turn the method into a reusable head-start so a second attempt begins with better context.</p>
            </div>
          </article>
          <article class="shift-item">
            <div class="shift-number">04</div>
            <div class="shift-card">
              <h3>Shift 4 · Explicit = Shareable</h3>
              <p class="kicker">The collaboration shift: if it is explicit, someone else can run it.</p>
              <p>Compare methods across the room and look for protocols that can be tested, challenged, and improved.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section" id="apply" aria-labelledby="apply-title">
      <div class="section-inner">
        <div class="section-head">
          <div>
            <p class="eyebrow">Interest form</p>
            <h2 id="apply-title">Register interest in the Adelaide pilot.</h2>
          </div>
          <p class="section-lead">Use this form to share your interest and the kind of work you would bring into the room.</p>
        </div>
        <div class="form-panel">
          <form class="signup-form" action="https://formspree.io/f/xeeajpey" method="POST">
            <div class="form-grid">
              <div class="form-field">
                <label class="label" for="name">Name</label>
                <input type="text" id="name" name="name" autocomplete="name" required>
              </div>
              <div class="form-field">
                <label class="label" for="email">Email</label>
                <input type="email" id="email" name="email" autocomplete="email" required>
              </div>
              <div class="form-field">
                <label class="label" for="role">Role</label>
                <input type="text" id="role" name="role" autocomplete="organization-title" required>
              </div>
              <div class="form-field">
                <label class="label" for="organization">Organization</label>
                <input type="text" id="organization" name="organization" autocomplete="organization">
              </div>
              <div class="form-field form-field-full">
                <label class="label" for="interest">What work would you want to make clearer with AI?</label>
                <textarea id="interest" name="interest" required></textarea>
              </div>
              <input type="hidden" name="camp" value="Adelaide 17–18 September 2026">
            </div>
            <button class="button" type="submit">Register interest <svg class="icon" aria-hidden="true"><use href="#ph-arrow-right"></use></svg></button>
            <p class="form-note">We will follow up with pilot details through the Adelaide host team.</p>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-colophon">
        <p>Make It So Camp was created by Igor Schwarzmann and Noah Raford. <a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></p>
      </div>
    </div>
  </footer>
</body>
</html>
EOF
```

#### `new/about/index.html`

```bash
cat > new/about/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Make It So Camp</title>
  <meta name="description" content="Make It So Camp was created by Igor Schwarzmann and Noah Raford.">
  <meta name="author" content="Make It So Camp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://misocamp.com/new/about/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://misocamp.com/new/about/">
  <meta property="og:site_name" content="Make It So Camp">
  <meta property="og:title" content="About Make It So Camp">
  <meta property="og:description" content="Make It So Camp was created by Igor Schwarzmann and Noah Raford.">
  <meta property="og:image" content="https://misocamp.com/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About Make It So Camp">
  <meta name="twitter:description" content="Make It So Camp was created by Igor Schwarzmann and Noah Raford.">
  <meta name="twitter:image" content="https://misocamp.com/og-image.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&amp;family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,650&amp;display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/new/styles.css">
</head>
<body>
  <header class="site-header">
    <a class="wordmark" href="/new/">Make It So Camp</a>
    <nav aria-label="Primary navigation">
      <ul class="nav-list">
        <li><a href="/new/">Home</a></li>
        <li><a href="/new/tokyo/">Tokyo</a></li>
        <li><a href="/new/adelaide/">Adelaide</a></li>
      </ul>
    </nav>
  </header>

  <main class="page">
    <section class="hero hero-narrow">
      <div class="hero-copy">
        <p class="eyebrow">About</p>
        <h1>Who's behind this</h1>
        <p class="thesis">Make It So Camp was created by Igor Schwarzmann and Noah Raford.</p>
        <p class="lede">The camp brings together strategy, foresight, cultural research, AI practice, and hands-on workflow design.</p>
      </div>
    </section>
    <section class="section" aria-labelledby="behind-title">
      <div class="section-inner">
        <div class="section-head"><div><p class="eyebrow">Who's behind this</p><h2 id="behind-title">Two complementary practices.</h2></div><p class="section-lead">Make It So Camp was created by Igor Schwarzmann and Noah Raford.</p></div>
        <div class="grid"><article class="card"><h3>Igor Schwarzmann</h3><p>Independent strategist and researcher working at the intersection of culture and technology: cultural and trend research, brand and growth strategy, and AI strategy. He ran a foresight and strategic-design studio out of Berlin, which he sold in 2022. Recent clients include frontier AI labs, luxury fashion houses, and home-appliance makers.</p></article><article class="card"><h3>Noah Raford</h3><p>Strategist and futurist. He spent a decade running strategy and innovation for Dubai's Prime Minister's office and now advises a global network of CEOs on foresight and AI. He holds a PhD in computational public policy and has been building deeply with AI-augmented workflows since late 2025.</p></article></div>
      </div>
    </section>
  </main>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-colophon">
        <p>Make It So Camp was created by Igor Schwarzmann and Noah Raford. <a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></p>
      </div>
    </div>
  </footer>
</body>
</html>
EOF
```

Verification:

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -RniE 'Free pilot|free pilot|, with Chiba|, with Flinders|<span class="tag">With Chiba Institute of Technology</span>' new/index.html new/tokyo/index.html new/adelaide/index.html && { echo "FAIL removed copy remains"; exit 1; } || echo "PASS removed copy absent"
grep -Rhoi 'in collaboration with' new/index.html new/tokyo/index.html new/adelaide/index.html | wc -l | tr -d ' '
grep -Fq 'mailto:hello@misocamp.com' new/index.html && echo "PASS hub mailto outreach present"
```

Expected output:

```text
PASS removed copy absent
8
PASS hub mailto outreach present
```

Verification:

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'letter-spacing:-0.01em;' new/styles.css && echo "PASS h1-h4 tracking is -0.01em"
if grep -Fq 'letter-spacing:-0.025em;' new/styles.css; then echo "FAIL old headline tracking remains"; exit 1; else echo "PASS old headline tracking absent"; fi
grep -Fq 'border-top:1px solid var(--rule);' new/styles.css && echo "PASS section-head shared rule present"
```

Expected output:

```text
PASS h1-h4 tracking is -0.01em
PASS old headline tracking absent
PASS section-head shared rule present
```

Verification:

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test -f new/about/index.html && echo "PASS about page exists"
grep -Fq 'Independent strategist and researcher working at the intersection of culture and technology: cultural and trend research, brand and growth strategy, and AI strategy. He ran a foresight and strategic-design studio out of Berlin, which he sold in 2022. Recent clients include frontier AI labs, luxury fashion houses, and home-appliance makers.' new/about/index.html && echo "PASS Igor bio paragraph verbatim"
grep -Fq "Strategist and futurist. He spent a decade running strategy and innovation for Dubai's Prime Minister's office and now advises a global network of CEOs on foresight and AI. He holds a PhD in computational public policy and has been building deeply with AI-augmented workflows since late 2025." new/about/index.html && echo "PASS Noah bio paragraph verbatim"
grep -Rho 'mailto:hello@misocamp.com' new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html | wc -l | tr -d ' '
grep -RniE 'footer-bio-section|bio-grid|bio-card|bio-name|footer-statement' new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html new/styles.css && { echo "FAIL footer bio class remains"; exit 1; } || echo "PASS footer bio classes absent"
```

Expected output:

```text
PASS about page exists
PASS Igor bio paragraph verbatim
PASS Noah bio paragraph verbatim
5
PASS footer bio classes absent
```

Commit:

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add new/styles.css new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html
git commit -m "feat: iteration three copy, type, about page, and footer"
```

Expected output includes:

```text
[site-new-3
```

### Task 2: Final verification

Run static verification plus screenshot verification. If Chrome is unavailable, STOP and report `BLOCKED iter3-plan: Chrome unavailable for required screenshots`.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git branch --show-current
grep -RniE 'Free pilot|free pilot|, with Chiba|, with Flinders|<span class="tag">With Chiba Institute of Technology</span>' new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html && { echo "FAIL removed copy remains"; exit 1; } || echo "PASS removed copy absent"
grep -RniE '#[0-9A-Fa-f]{3,8}\b|rgba?\(' new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html && { echo "FAIL hardcoded page color"; exit 1; } || echo "PASS no hardcoded page colors"
awk '/#[0-9A-Fa-f]{3,8}\b|rgba?\(/ && $0 !~ /^[[:space:]]*--/ {print FILENAME ":" FNR ":" $0; bad=1} END {exit bad}' new/styles.css && echo "PASS stylesheet colors are tokenized"
```

Expected output:

```text
site-new-3
PASS removed copy absent
PASS no hardcoded page colors
PASS stylesheet colors are tokenized
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
lsof -ti:8796 | xargs kill -9 2>/dev/null
python3 -m http.server 8796 >/tmp/miso-iter3-http.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" >/dev/null 2>&1 || true' EXIT
sleep 1
mkdir -p docs/plans/iteration-3-screenshots
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --remote-debugging-port=9401 --user-data-dir=/tmp/iter3-cdp about:blank >/dev/null 2>&1 &
CHROME_PID=$!
sleep 2
node - <<'NODEEOF'
(async () => {
const list = await (await fetch('http://localhost:9401/json/list')).json();
const target = list.find(t => t.type === 'page');
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0; const pend = new Map();
const send = (method, params={}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({id:i, method, params})); });
await new Promise(r => ws.onopen = r);
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } };
await send('Page.enable');
let failed = false;
for (const path of ['/new/','/new/tokyo/','/new/adelaide/','/new/about/']) {
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1100, deviceScaleFactor: 2, mobile: width < 900 });
    await send('Page.navigate', { url: 'http://127.0.0.1:8796' + path });
    await new Promise(r => setTimeout(r, 1200));
    const overflow = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth > document.documentElement.clientWidth', returnByValue: true });
    if (overflow.result.value) { console.error('FAIL overflow at ' + path + ' width ' + width); failed = true; }
    const rule = await send('Runtime.evaluate', { expression: `(()=>{const h=document.querySelector('.section-head');if(!h)return false;const s=getComputedStyle(h);return s.borderTopStyle!=='none'&&parseFloat(s.borderTopWidth)>=1})()`, returnByValue: true });
    if (!rule.result.value) { console.error('FAIL no section-head rule at ' + path); failed = true; }
    const name = path.replace(/\//g, '-') + '-' + width + '.png';
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: 2400, scale: 1 } });
    require('fs').writeFileSync('docs/plans/iteration-3-screenshots/' + name, Buffer.from(shot.result.data, 'base64'));
  }
}
ws.close();
if (failed) { console.log('FAIL screenshot verification'); process.exit(1); }
console.log('PASS screenshots saved for hub/tokyo/adelaide/about at desktop and 390px');
console.log('PASS no horizontal overflow at 390px');
console.log('PASS section-head rule detected in browser');
})();
NODEEOF
STATUS=$?
kill $CHROME_PID 2>/dev/null
rm -rf /tmp/iter3-cdp 2>/dev/null
exit $STATUS
```

Expected output:

```text
PASS screenshots saved for hub/tokyo/adelaide/about at desktop and 390px
PASS no horizontal overflow at 390px
PASS section-head rule detected in browser
```

Commit:

```bash
git add docs/plans/iteration-3-screenshots
git commit -m "test: verify site-new iteration three"
```
