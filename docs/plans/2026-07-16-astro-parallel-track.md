# Astro Parallel Track Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. If any step fails twice, STOP and report `BLOCKED astro-parallel-track: <one-line reason>`.

**Goal:** Stand up a self-contained Astro 7.0.9 project under `astro/` that reproduces the four `/new` routes from `new/` exactly, with zero client JavaScript, typed camp data, and a prop-driven component model. The existing `new/` tree stays untouched and serves as the parity oracle.

**Architecture:** Static Astro output only. One BaseLayout, a prop-driven Header, a shared Footer, a flexible Hero, one typed `camps.ts`, one dynamic `[camp].astro` for both camp pages, and explicit home and About pages. `new/miso.css` is copied verbatim to `astro/public/new/miso.css`.

**Tech Stack:** Astro 7.0.9, TypeScript 6.0.3, `@astrojs/check` 0.9.9, npm 11.17.0, Node 26.5.0, Python 3 standard library. No integrations, no adapters, no client JS, no CMS, no analytics, no forms.

## Global Constraints

- Work on branch `astro-parallel-track`, from current `master`.
- Touch only files under `astro/` during implementation. Do not modify, stage, or commit any pre-existing untracked files (`.superpowers/`, `MISo Camp - Sponsorship Deck v2.md`, `partnership-deck.html`). The two reviewed Astro plan documents are already committed on `master` before builder dispatch.
- Do not modify `new/` at all. It is the read-only parity oracle.
- Do not modify `_session.md` or workspace state files.
- All site paths are root-absolute (`/new/...`), exactly as in `new/`.
- Non-ASCII characters are load-bearing: en dashes in dates, `é` in `Café`, middots `·`, arrows `↗`, em dashes `—`.
- `camps.ts` holds only Tokyo and Adelaide, only the fields those two pages render today.
- No deployment, no integrations, no adapters, no analytics, no forms.
- One commit per task, with the exact commit messages shown below.
- Zero client JS is required: no `<script>` tags, no emitted `.js` files in `dist/`.
- If any step fails twice, STOP and report `BLOCKED astro-parallel-track: <one-line reason>`.

## File Structure

- `astro/package.json`: project manifest pinning `astro@7.0.9`.
- `astro/.gitignore`: excludes dependency, build, and Astro cache directories.
- `astro/astro.config.mjs`: static output, `site` set, no integrations or adapters.
- `astro/tsconfig.json`: Astro's `strict` preset.
- `astro/src/data/camps.ts`: typed camp records for Tokyo and Adelaide only.
- `astro/src/layouts/BaseLayout.astro`: `<html>`, `<head>` metadata, body slot.
- `astro/src/components/Header.astro`: prop-driven site header and nav.
- `astro/src/components/Footer.astro`: shared footer block.
- `astro/src/components/Hero.astro`: flexible hero section.
- `astro/src/pages/new/index.astro`: home page.
- `astro/src/pages/new/[camp].astro`: dynamic camp-detail route (Tokyo + Adelaide).
- `astro/src/pages/new/about.astro`: About page.
- `astro/public/new/miso.css`: verbatim copy of `new/miso.css`.
- `astro/package-lock.json`: produced by `npm install`.

### Task 1: Branch and scaffold the Astro project

**Files:**
- Create: `astro/package.json`
- Create: `astro/.gitignore`
- Create: `astro/astro.config.mjs`
- Create: `astro/tsconfig.json`
- Create: `astro/public/new/miso.css`

**Produces:**
- A branch `astro-parallel-track` from `master`.
- An Astro 7.0.9 project skeleton with the stylesheet copied.

- [ ] **Step 1: Create the branch from current `master`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
git pull --ff-only origin master
if git show-ref --verify --quiet refs/heads/astro-parallel-track; then echo "BLOCKED astro-parallel-track: branch astro-parallel-track already exists"; exit 1; fi
git switch -c astro-parallel-track >/dev/null
test "$(git branch --show-current)" = "astro-parallel-track" && echo "PASS on branch astro-parallel-track"
```

Expected output ends with:

```text
PASS on branch astro-parallel-track
```

- [ ] **Step 2: Create `astro/package.json`**

```bash
mkdir -p astro
cat > astro/package.json <<'EOF'
{
  "name": "make-it-so-camp-astro",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "astro build",
    "check": "astro check",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "7.0.9"
  },
  "devDependencies": {
    "@astrojs/check": "0.9.9",
    "typescript": "6.0.3"
  }
}
EOF
```

- [ ] **Step 3: Create `astro/.gitignore`**

```bash
cat > astro/.gitignore <<'EOF'
node_modules/
dist/
.astro/
EOF
```

- [ ] **Step 4: Create `astro/astro.config.mjs`**

```bash
cat > astro/astro.config.mjs <<'EOF'
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://misocamp.com',
  output: 'static',
});
EOF
```

- [ ] **Step 5: Create `astro/tsconfig.json`**

```bash
cat > astro/tsconfig.json <<'EOF'
{
  "extends": "astro/tsconfigs/strict"
}
EOF
```

- [ ] **Step 6: Copy `new/miso.css` verbatim into `astro/public/new/`**

```bash
mkdir -p astro/public/new
cp new/miso.css astro/public/new/miso.css
diff -q new/miso.css astro/public/new/miso.css && echo 'PASS miso.css copied byte-identical'
```

Expected output:

```text
PASS miso.css copied byte-identical
```

- [ ] **Step 7: Install dependencies (produces `astro/package-lock.json`)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm install
```

Expected output includes a line matching `added N packages`, with no error output. A `package-lock.json` file now exists under `astro/`.

- [ ] **Step 8: Verify the scaffold builds an empty site and the checker runs**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run build
npm run check
test -d dist && echo 'PASS dist produced'
test -s public/new/miso.css && echo 'PASS miso.css present in source'
```

Expected output includes successful Astro build and check summaries and ends with:

```text
PASS dist produced
PASS miso.css present in source
```

- [ ] **Step 9: Commit Task 1**

Stage only the `astro/` directory. Do not stage any pre-existing untracked files.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro
git diff --cached --name-only | grep -v '^astro/' && { echo 'FAIL staged path outside astro/'; exit 1; } || echo 'PASS only astro/ staged'
git diff --cached --name-only | grep -Eq '^astro/(node_modules|dist|\.astro)/' && { echo 'FAIL generated directory staged'; exit 1; } || echo 'PASS generated directories ignored'
git commit -m "chore: scaffold astro 7.0.9 project with miso.css"
```

Expected output includes:

```text
PASS only astro/ staged
PASS generated directories ignored
[astro-parallel-track
```

### Task 2: Write the typed camp data module

**Files:**
- Create: `astro/src/data/camps.ts`

**Consumes:**
- The Tokyo and Adelaide copy in `new/tokyo/index.html` and `new/adelaide/index.html`.

**Produces:**
- A typed `Camp` interface and a `camps` array with exactly two entries.

- [ ] **Step 1: Create `astro/src/data/camps.ts`**

```bash
mkdir -p astro/src/data
cat > astro/src/data/camps.ts <<'EOF'
export interface CampFactsRow {
  /** Term, e.g. "Dates", "Venue", "In collaboration with", "Supported by". */
  term: string;
  /** Value cell. */
  value: string;
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
  /** Logistics facts rows, in order. */
  facts: CampFactsRow[];
}

export const camps: Camp[] = [
  {
    slug: 'tokyo',
    title: 'Make It So Camp Tokyo — 24–25 August 2026',
    description: 'Make It So Camp Tokyo is a two-day AI workshop at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology.',
    ogDescription: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    statement: 'Make It So Camp Tokyo.',
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
    description: 'Make It So Camp Adelaide is a two-day AI workshop at Flinders University New Venture Institute, with SA Futures Agency as a supporting partner.',
    ogDescription: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    statement: 'Make It So Camp Adelaide.',
    metaLine: 'Adelaide · 17–18 September 2026',
    subject: 'Adelaide%20invitation%20request',
    overviewLead: 'Two days to make your way of working legible — to a machine, and to people who work nothing like you.',
    overviewDim: 'This page is what to expect in Adelaide.',
    overviewLeft: [
      'Make It So Camp Adelaide runs over two days at Flinders University New Venture Institute, with SA Futures Agency as a supporting partner. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.',
      'You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.',
    ],
    overviewRight: [
      'Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.',
      'You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.',
    ],
    facts: [
      { term: 'Dates', value: '17–18 September 2026' },
      { term: 'Venue', value: 'Flinders University New Venture Institute' },
      { term: 'In collaboration with', value: 'Flinders University New Venture Institute' },
      { term: 'Supported by', value: 'SA Futures Agency' },
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

- [ ] **Step 2: Typecheck the data module and verify exactly two camps**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run check
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq "slug: 'tokyo'" astro/src/data/camps.ts && echo 'PASS tokyo record present'
grep -Fq "slug: 'adelaide'" astro/src/data/camps.ts && echo 'PASS adelaide record present'
grep -c 'slug:' astro/src/data/camps.ts | grep -qx '2' && echo 'PASS exactly two camp records'
```

Expected output:

```text
Result (1 file):
- 0 errors
PASS tokyo record present
PASS adelaide record present
PASS exactly two camp records
```

- [ ] **Step 3: Commit Task 2**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro/src/data/camps.ts
git commit -m "feat(astro): add typed camps data for tokyo and adelaide"
```

Expected output includes:

```text
[astro-parallel-track
```

### Task 3: Write BaseLayout, Header, Footer, and Hero components

**Files:**
- Create: `astro/src/layouts/BaseLayout.astro`
- Create: `astro/src/components/Header.astro`
- Create: `astro/src/components/Footer.astro`
- Create: `astro/src/components/Hero.astro`

**Consumes:**
- The `<head>`, header, footer, and hero markup patterns from `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`.

**Produces:**
- A shared shell and three composable components that reproduce the exact markup of `new/`.

- [ ] **Step 1: Create `astro/src/layouts/BaseLayout.astro`**

```bash
mkdir -p astro/src/layouts astro/src/components astro/src/pages/new
cat > astro/src/layouts/BaseLayout.astro <<'EOF'
---
export interface Props {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

const {
  title,
  description,
  canonicalPath,
  ogTitle = title,
  ogDescription = description,
  twitterTitle = ogTitle,
  twitterDescription = ogDescription,
} = Astro.props;

const site = Astro.site?.toString().replace(/\/$/, '') ?? 'https://misocamp.com';
const canonical = `${site}${canonicalPath}`;
const ogImage = `${site}/og-image.jpg`;
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta name="author" content="Make It So Camp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href={canonical}>
  <meta property="og:type" content="website">
  <meta property="og:url" content={canonical}>
  <meta property="og:site_name" content="Make It So Camp">
  <meta property="og:title" content={ogTitle}>
  <meta property="og:description" content={ogDescription}>
  <meta property="og:image" content={ogImage}>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={twitterTitle}>
  <meta name="twitter:description" content={twitterDescription}>
  <meta name="twitter:image" content={ogImage}>
  <link rel="stylesheet" href="/new/miso.css">
</head>
<body>
  <slot />
</body>
</html>
EOF
```

- [ ] **Step 2: Create `astro/src/components/Header.astro`**

```bash
cat > astro/src/components/Header.astro <<'EOF'
---
export interface NavLink {
  label: string;
  href: string;
  accent?: boolean;
}

export interface Props {
  links: NavLink[];
}

const { links } = Astro.props;
---
<header class="site-header">
  <a class="brand" href="/new/">Make It So Camp</a>
  <nav class="nav" aria-label="Primary">
    {links.map((link) => (
      <a href={link.href} class={link.accent ? 'accent' : undefined}>{link.label}</a>
    ))}
  </nav>
</header>
EOF
```

- [ ] **Step 3: Create `astro/src/components/Footer.astro`**

```bash
cat > astro/src/components/Footer.astro <<'EOF'
---
---
<footer class="footer">
  <div>Make It So Camp — created by <a href="/new/about/">Igor Schwarzmann and Noah Raford</a></div>
  <div class="collab light">In collaboration with Chiba Institute of Technology, Flinders University New Venture Institute, and SA Futures Agency.</div>
  <div><a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>
</footer>
EOF
```

- [ ] **Step 4: Create `astro/src/components/Hero.astro`**

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
  /** Optional CTA. When provided, renders the hero-cta block. */
  cta?: { href: string; label: string };
}

const { leftMeta, rightMeta, statement, small, minHeight, cta } = Astro.props;
---
<section class="hero" style={minHeight ? `min-height:${minHeight}` : undefined}>
  <div class="hero-top">
    <p class="meta light">{leftMeta}</p>
    <p class="meta" set:html={rightMeta} />
  </div>
  <div class="spacer"></div>
  <h1 class={`statement${small ? ' statement-sm' : ''}`}>{statement}</h1>
  {cta && (
    <p class="hero-cta"><a href={cta.href}>{cta.label}</a></p>
  )}
</section>
EOF
```

- [ ] **Step 5: Verify the four component files exist and reference the expected classes**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for f in src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro src/components/Hero.astro; do
  test -s "astro/$f" && echo "PASS exists astro/$f"
done
grep -Fq '/new/miso.css' astro/src/layouts/BaseLayout.astro && echo 'PASS BaseLayout links miso.css'
grep -Fq 'class="brand"' astro/src/components/Header.astro && echo 'PASS Header brand class'
grep -Fq 'class="footer"' astro/src/components/Footer.astro && echo 'PASS Footer class'
grep -Fq 'statement-sm' astro/src/components/Hero.astro && echo 'PASS Hero supports statement-sm'
```

Expected output:

```text
PASS exists astro/src/layouts/BaseLayout.astro
PASS exists astro/src/components/Header.astro
PASS exists astro/src/components/Footer.astro
PASS exists astro/src/components/Hero.astro
PASS BaseLayout links miso.css
PASS Header brand class
PASS Footer class
PASS Hero supports statement-sm
```

- [ ] **Step 6: Commit Task 3**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro/src/layouts astro/src/components
git commit -m "feat(astro): add base layout header footer and hero components"
```

Expected output includes:

```text
[astro-parallel-track
```

### Task 4: Write the home page

**Files:**
- Create: `astro/src/pages/new/index.astro`

**Consumes:**
- `BaseLayout`, `Header`, `Hero`, `Footer`.
- The home-page copy and structure in `new/index.html`.

**Produces:**
- `/new/` rendered as `dist/new/index.html`.

- [ ] **Step 1: Create `astro/src/pages/new/index.astro`**

```bash
cat > astro/src/pages/new/index.astro <<'EOF'
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import Footer from '../../components/Footer.astro';

const title = 'Make It So Camp — You cannot delegate what you cannot articulate';
const description = 'Make It So Camp is a selective two-day AI workshop for experienced practitioners. Day 1 you make your working method explicit; Day 2 you build with others and demo. Tokyo and Adelaide, 2026. By invitation.';
---
<BaseLayout
  title={title}
  description={description}
  canonicalPath="/new/"
  ogTitle={title}
  ogDescription="A selective two-day AI workshop for experienced practitioners. Tokyo and Adelaide, 2026. By invitation."
>
  <Header links={[
    { label: "Who it's for", href: '#who' },
    { label: 'How it works', href: '#how' },
    { label: 'Tokyo · Adelaide', href: '#camps' },
    { label: 'About', href: '/new/about/' },
    { label: 'Request an invitation', href: '#request', accent: true },
  ]} />

  <Hero
    leftMeta="By invitation"
    rightMeta='Two-day AI workshop<br><span class="light">Tokyo · Adelaide · 2026</span>'
    statement="You cannot delegate what you cannot articulate."
    cta={{ href: 'mailto:hello@misocamp.com?subject=Invitation%20request', label: 'Request an invitation ↗' }}
  />

  <section class="section" id="idea" aria-labelledby="idea-label">
    <div class="section-label"><span class="num">01</span><span class="label" id="idea-label">The idea</span></div>
    <p class="lead-statement">AI can only help with work you can describe. <span class="dim">And the most valuable work — yours — has usually never been described.</span></p>
    <div class="cols">
      <div>
        <p>When these tools arrived, the people who got the most out of them were not the most technical. They were the ones who could state what they wanted: the goal, the constraints, what good looks like. The machine does not guess. It needs you to say what you mean.</p>
        <p>Most AI training starts with the tools: which model, which prompt, which trick. We start with your work. Whatever your field and however long you have been in it, most of your method is unwritten — how you frame a problem, what you pay attention to, when you call something good enough. That unwritten method is the material the camp works with.</p>
      </div>
      <div>
        <p>The camp is for writing it down. That sounds simple, and it is the whole difference: a written method is something a machine can execute, a stranger can question, and a team can improve. And it compounds — each piece of your work you make explicit makes the next thing you build faster.</p>
        <p>The aim is not to get faster at generic tasks. It is to make your work legible enough that AI becomes a collaborator, and to leave with a way of working that keeps paying off long after the two days end.</p>
      </div>
    </div>
  </section>

  <section class="section" id="who" aria-labelledby="who-label">
    <div class="section-label"><span class="num">02</span><span class="label" id="who-label">Who it's for</span></div>
    <p class="lead-statement">Experienced practitioners with real work to bring. <span class="dim">The cohort mixes domains on purpose: the method transfers, and the demos are better for it.</span></p>
    <div class="moves" style="margin-top:clamp(2rem,3.5vw,3rem)">
      <div class="move">
        <span class="num">A</span>
        <h3>Academic</h3>
        <p>Researchers, teachers, lab leads. People whose methods are rigorous but rarely written for anyone else to run.</p>
      </div>
      <div class="move">
        <span class="num">B</span>
        <h3>Creative</h3>
        <p>Strategists, designers, writers, cultural workers. People who work by taste and want it to survive contact with the tools.</p>
      </div>
      <div class="move">
        <span class="num">C</span>
        <h3>Corporate</h3>
        <p>Product, operations, transformation. People who own a process a team needs to understand, not just follow.</p>
      </div>
    </div>
    <p class="note">You do not need to be technical. You need work you care about, and the patience to say what you mean. If you would rather wait for a playbook, this camp is not the place — the people here are writing it.</p>
  </section>

  <section class="section" id="how" aria-labelledby="how-label">
    <div class="section-label"><span class="num">03</span><span class="label" id="how-label">How it works</span></div>
    <p class="lead-statement">Hands-on from the first hour. <span class="dim">Theory only ever names what you have already experienced.</span></p>
    <div class="day-list" style="margin-top:clamp(2rem,3.5vw,3rem)">
      <div class="day-row">
        <p class="day-label">Before</p>
        <div>
          <h3>A map of the room.</h3>
          <p>We ask everyone beforehand what they are working on and how they work today, so Day 1 starts from what is actually in the room rather than a round of introductions.</p>
        </div>
      </div>
      <div class="day-row">
        <p class="day-label">Day 1</p>
        <div>
          <h3>Articulate.</h3>
          <p>You work on a real problem you bring with you, and make the method behind it explicit: the steps, the assumptions, what good looks like. Exercises with people from other fields test whether someone else could actually follow it.</p>
        </div>
      </div>
      <div class="day-row">
        <p class="day-label">Day 2</p>
        <div>
          <h3>Build and demo.</h3>
          <p>Alone or in a small cross-domain team, you put the written method to work with the tools and build something real. The day ends in demo rounds — not show-and-tell, but what did your way of working make possible.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="camps" aria-labelledby="camps-label">
    <div class="section-label"><span class="num">04</span><span class="label" id="camps-label">2026 camps</span></div>
    <div class="camps">
      <div class="camp">
        <h2>Tokyo</h2>
        <dl>
          <dt>Dates</dt><dd>24–25 August 2026</dd>
          <dt>Venue</dt><dd>Crypto Café Tokyo</dd>
          <dt>Partner</dt><dd>Chiba Institute of Technology</dd>
        </dl>
        <p class="cta"><a class="accent" href="/new/tokyo/">View Tokyo ↗</a></p>
      </div>
      <div class="camp">
        <h2>Adelaide</h2>
        <dl>
          <dt>Dates</dt><dd>17–18 September 2026</dd>
          <dt>Venue</dt><dd>Flinders University New Venture Institute</dd>
          <dt>Partner</dt><dd>with SA Futures Agency</dd>
        </dl>
        <p class="cta"><a class="accent" href="/new/adelaide/">View Adelaide ↗</a></p>
      </div>
    </div>
  </section>

  <section class="section invite" id="request" aria-labelledby="request-label">
    <div class="section-label"><span class="num">05</span><span class="label" id="request-label">Request an invitation</span></div>
    <p class="lead-statement" style="margin-bottom:1.6rem">Tell us which camp, what work you would bring, and why now. <span class="dim">We reply if there is a fit.</span></p>
    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>
  </section>

  <Footer />
</BaseLayout>
EOF
```

- [ ] **Step 2: Build and verify the home page output**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run build >/tmp/astro-build-home.log 2>&1
test -s dist/new/index.html && echo 'PASS dist/new/index.html produced'
```

Expected output includes:

```text
PASS dist/new/index.html produced
```

- [ ] **Step 3: Spot-check required home strings (after html.unescape)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import html
from pathlib import Path
text = html.unescape(Path('astro/dist/new/index.html').read_text())
for needle in [
    'You cannot delegate what you cannot articulate.',
    'The idea',
    'Who it\'s for',
    'How it works',
    '2026 camps',
    'Crypto Café Tokyo',
    'Flinders University New Venture Institute',
    'View Tokyo',
    'View Adelaide',
    'mailto:hello@misocamp.com?subject=Invitation%20request',
]:
    if needle not in text:
        raise SystemExit(f'FAIL missing home string: {needle}')
print('PASS home required strings present')
PY
```

Expected output:

```text
PASS home required strings present
```

- [ ] **Step 4: Commit Task 4**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro/src/pages/new/index.astro
git commit -m "feat(astro): add home page"
```

Expected output includes:

```text
[astro-parallel-track
```

### Task 5: Write the dynamic camp-detail route

**Files:**
- Create: `astro/src/pages/new/[camp].astro`

**Consumes:**
- `BaseLayout`, `Header`, `Hero`, `Footer`.
- `camps.ts` (Tokyo and Adelaide records).
- The camp-detail structure shared by `new/tokyo/index.html` and `new/adelaide/index.html`.

**Produces:**
- `dist/new/tokyo/index.html` and `dist/new/adelaide/index.html` from one dynamic route.

- [ ] **Step 1: Create `astro/src/pages/new/[camp].astro`**

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

  <section class="section" id="logistics" aria-labelledby="logistics-label">
    <div class="section-label"><span class="num">03</span><span class="label" id="logistics-label">Logistics</span></div>
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
    <div class="section-label"><span class="num">04</span><span class="label" id="request-label">Request an invitation</span></div>
    <p class="lead-statement" style="margin-bottom:1.6rem">Tell us what work you would bring, and why now. <span class="dim">We reply if there is a fit.</span></p>
    <p class="email"><a href={requestHref}>hello@misocamp.com</a></p>
  </section>

  <Footer />
</BaseLayout>
EOF
```

- [ ] **Step 2: Build and verify both camp outputs**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run build >/tmp/astro-build-camps.log 2>&1
test -s dist/new/tokyo/index.html && echo 'PASS dist/new/tokyo/index.html produced'
test -s dist/new/adelaide/index.html && echo 'PASS dist/new/adelaide/index.html produced'
```

Expected output:

```text
PASS dist/new/tokyo/index.html produced
PASS dist/new/adelaide/index.html produced
```

- [ ] **Step 3: Spot-check per-camp required strings (after html.unescape)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import html
from pathlib import Path
checks = {
    'tokyo': [
        'Make It So Camp Tokyo.',
        '24–25 August 2026',
        'Crypto Café Tokyo',
        'Chiba Institute of Technology',
        'mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request',
    ],
    'adelaide': [
        'Make It So Camp Adelaide.',
        '17–18 September 2026',
        'Flinders University New Venture Institute',
        'SA Futures Agency',
        'mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request',
    ],
}
for slug, needles in checks.items():
    text = html.unescape(Path(f'astro/dist/new/{slug}/index.html').read_text())
    for needle in needles:
        if needle not in text:
            raise SystemExit(f'FAIL missing {slug} string: {needle}')
    print(f'PASS {slug} required strings present')
PY
```

Expected output:

```text
PASS tokyo required strings present
PASS adelaide required strings present
```

- [ ] **Step 4: Commit Task 5**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add 'astro/src/pages/new/[camp].astro'
git commit -m "feat(astro): add dynamic camp detail route"
```

Expected output includes:

```text
[astro-parallel-track
```

### Task 6: Write the About page

**Files:**
- Create: `astro/src/pages/new/about.astro`

**Consumes:**
- `BaseLayout`, `Header`, `Hero`, `Footer`.
- The About copy in `new/about/index.html`.

**Produces:**
- `dist/new/about/index.html`.

- [ ] **Step 1: Create `astro/src/pages/new/about.astro`**

```bash
cat > astro/src/pages/new/about.astro <<'EOF'
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import Footer from '../../components/Footer.astro';

const title = 'About — Make It So Camp';
const description = 'Make It So Camp was created by Igor Schwarzmann and Noah Raford. A selective two-day AI workshop. Tokyo and Adelaide, 2026.';
---
<BaseLayout
  title={title}
  description={description}
  canonicalPath="/new/about/"
>
  <Header links={[
    { label: 'Home', href: '/new/' },
    { label: 'Tokyo', href: '/new/tokyo/' },
    { label: 'Adelaide', href: '/new/adelaide/' },
    { label: 'Request an invitation', href: 'mailto:hello@misocamp.com?subject=Invitation%20request', accent: true },
  ]} />

  <Hero
    leftMeta="About"
    rightMeta='Two-day AI workshop<br><span class="light">Tokyo · Adelaide · 2026</span>'
    statement="Who's behind this."
    small={true}
    minHeight="38svh"
  />

  <section class="section" id="founders" aria-labelledby="founders-label">
    <div class="section-label"><span class="num">01</span><span class="label" id="founders-label">Founders</span></div>
    <p class="lead-statement">Make It So Camp was created by Igor Schwarzmann and Noah Raford. <span class="dim">Two practices, one thesis: articulation is the bottleneck.</span></p>
    <div class="camps" style="margin-top:clamp(2rem,3.5vw,3rem)">
      <div class="camp">
        <h2><a href="https://igorschwarzmann.com" style="text-decoration:none; color:inherit">Igor Schwarzmann ↗</a></h2>
        <p>Independent strategist and researcher working at the intersection of culture and technology: cultural and trend research, brand and growth strategy, and AI strategy. He ran a foresight and strategic-design studio out of Berlin, which he sold in 2022. Recent clients include frontier AI labs, luxury fashion houses, and home-appliance makers.</p>
      </div>
      <div class="camp">
        <h2><a href="https://www.noahraford.com" style="text-decoration:none; color:inherit">Noah Raford ↗</a></h2>
        <p>Futurist and strategist. Managing Partner at EMIR, he advises businesses and governments on emerging technologies and foresight. He spent a decade in the Government of Dubai as Futurist-in-Chief — founding executive of the Dubai Future Foundation and the Museum of the Future, and senior advisor to the UAE Prime Minister's Office. He holds a PhD from MIT.</p>
      </div>
    </div>
  </section>

  <section class="section" id="collaborators" aria-labelledby="collaborators-label">
    <div class="section-label"><span class="num">02</span><span class="label" id="collaborators-label">Collaborators</span></div>
    <dl class="facts">
      <dt>Tokyo</dt><dd>In collaboration with Chiba Institute of Technology</dd>
      <dt>Adelaide</dt><dd>Flinders University New Venture Institute, with SA Futures Agency as a supporting partner</dd>
    </dl>
  </section>

  <section class="section invite" id="request" aria-labelledby="request-label">
    <div class="section-label"><span class="num">03</span><span class="label" id="request-label">Request an invitation</span></div>
    <p class="lead-statement" style="margin-bottom:1.6rem">Tell us which camp, what work you would bring, and why now. <span class="dim">We reply if there is a fit.</span></p>
    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>
  </section>

  <Footer />
</BaseLayout>
EOF
```

- [ ] **Step 2: Build and verify the About output**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run build >/tmp/astro-build-about.log 2>&1
test -s dist/new/about/index.html && echo 'PASS dist/new/about/index.html produced'
```

Expected output includes:

```text
PASS dist/new/about/index.html produced
```

- [ ] **Step 3: Spot-check required About strings (after html.unescape)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import html
from pathlib import Path
text = html.unescape(Path('astro/dist/new/about/index.html').read_text())
for needle in [
    "Who's behind this.",
    'Igor Schwarzmann ↗',
    'Noah Raford ↗',
    'Managing Partner at EMIR',
    'PhD from MIT',
    'Museum of the Future',
    'https://igorschwarzmann.com',
    'https://www.noahraford.com',
    'mailto:hello@misocamp.com?subject=Invitation%20request',
]:
    if needle not in text:
        raise SystemExit(f'FAIL missing About string: {needle}')
print('PASS About required strings present')
PY
```

Expected output:

```text
PASS About required strings present
```

- [ ] **Step 4: Commit Task 6**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro/src/pages/new/about.astro
git commit -m "feat(astro): add about page"
```

Expected output includes:

```text
[astro-parallel-track
```

### Task 7: Final verification

**Files:**
- None authored. Verification only.

**Consumes:**
- All authored files from Tasks 1–6.
- `new/` as the parity oracle.

**Produces:**
- A clean production build passing the full parity contract from the design document.

Baseline: there was no Astro project and therefore zero Astro checks before this work. Final verification runs the Astro typechecker, five output-existence checks, four full semantic-page parity checks, 24 forbidden-content checks, one emitted-JS check, and one CSS-parity check: 35 explicit assertions after the typecheck and production build.

- [ ] **Step 1: Production build from clean**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
rm -rf dist
npm run check
npm run build
```

Expected output includes the checker summary with `0 errors` and Astro's successful build summary. Both commands exit 0.

- [ ] **Step 2: Verify the exact five outputs exist**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for f in \
  astro/dist/new/index.html \
  astro/dist/new/tokyo/index.html \
  astro/dist/new/adelaide/index.html \
  astro/dist/new/about/index.html \
  astro/dist/new/miso.css; do
  test -s "$f" && echo "PASS output exists $f"
done
```

Expected output:

```text
PASS output exists astro/dist/new/index.html
PASS output exists astro/dist/new/tokyo/index.html
PASS output exists astro/dist/new/adelaide/index.html
PASS output exists astro/dist/new/about/index.html
PASS output exists astro/dist/new/miso.css
```

- [ ] **Step 3: Verify full semantic-page parity, forbidden content, no JS, and CSS parity**

This script compares each built page to its corresponding static oracle as an ordered stream of tags, normalized attributes, and normalized text nodes. `HTMLParser` decodes entities, so Astro's `&#39;` and the oracle's straight apostrophe compare equally; formatting whitespace and attribute order are ignored. Everything substantive is compared: metadata, links, mailto subjects, visible copy, semantic tags, classes, IDs, ARIA attributes, and footer markup.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path('.')
DIST = ROOT / 'astro' / 'dist' / 'new'
ORACLE = ROOT / 'new'

pages = {
    'index': (ORACLE / 'index.html', DIST / 'index.html'),
    'tokyo': (ORACLE / 'tokyo' / 'index.html', DIST / 'tokyo' / 'index.html'),
    'adelaide': (ORACLE / 'adelaide' / 'index.html', DIST / 'adelaide' / 'index.html'),
    'about': (ORACLE / 'about' / 'index.html', DIST / 'about' / 'index.html'),
}

passed = 0
def check(cond, label):
    global passed
    if not cond:
        raise SystemExit(f'FAIL {label}')
    passed += 1
    print(f'PASS {label}')

class Snapshot(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.events = []

    @staticmethod
    def attrs(items):
        return tuple(sorted((name, ' '.join((value or '').split())) for name, value in items))

    def handle_starttag(self, tag, attrs):
        self.events.append(('start', tag, self.attrs(attrs)))

    def handle_startendtag(self, tag, attrs):
        self.events.append(('startend', tag, self.attrs(attrs)))

    def handle_endtag(self, tag):
        self.events.append(('end', tag))

    def handle_data(self, data):
        text = ' '.join(data.split())
        if text:
            self.events.append(('text', text))

def snapshot(path):
    parser = Snapshot()
    parser.feed(Path(path).read_text())
    parser.close()
    return parser.events

for slug, (oracle_path, built_path) in pages.items():
    check(snapshot(oracle_path) == snapshot(built_path), f'{slug} full semantic parity')

# --- Forbidden content ---
forbidden_global = ['styles.css', '<script', '<form', 'formspree', 'google-analytics', 'gtag']
for slug, (_, built_path) in pages.items():
    t = built_path.read_text().lower()
    for needle in forbidden_global:
        check(needle.lower() not in t, f'{slug} forbids {needle}')

# --- No emitted JS in dist ---
js_files = list((ROOT / 'astro' / 'dist').rglob('*.js'))
check(not js_files, f'no emitted js files (found {len(js_files)})')

# --- CSS parity: byte-identical to oracle ---
oracle_css = (ORACLE / 'miso.css').read_bytes()
built_css = (DIST / 'miso.css').read_bytes()
check(oracle_css == built_css, 'miso.css byte-identical to oracle')

if passed != 30:
    raise SystemExit(f'FAIL assertion count: expected 30, got {passed}')
print('PASS assertion count: 30')
PY
```

Expected output ends with:

```text
PASS assertion count: 30
```

If any line reads `FAIL ...`, treat it as a failed step and stop after the second failure per the global constraints.

- [ ] **Step 4: Verify diff is limited to `astro/`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
base=$(git merge-base master HEAD)
changed=$(git diff --name-only "$base" HEAD)
echo "$changed" | grep -v '^astro/' && { echo 'FAIL changes outside astro/'; exit 1; } || echo 'PASS diff limited to astro/'
```

Expected output:

```text
PASS diff limited to astro/
```

- [ ] **Step 5: Verify the lockfile was committed with the scaffold**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git ls-files --error-unmatch astro/package-lock.json >/dev/null && echo 'PASS package-lock tracked'
```

Expected output:

```text
PASS package-lock tracked
```

- [ ] **Step 6: Final branch sanity check**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test "$(git branch --show-current)" = "astro-parallel-track" && echo 'PASS on branch astro-parallel-track'
git log --oneline master..HEAD
```

Expected output lists the per-task commits in order and ends without error.
