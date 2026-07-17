# Root Cutover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. The final task is verification-only and carries no commit. If any step fails twice, STOP and report `BLOCKED root-cutover: <one-line reason>`.

Implementation environment: opencode

**Goal:** Cut the Astro-built site over to the domain root `https://misocamp.com/`, replacing the old "Become a Captain of AI" root page (backed up first, browsable under `/legacy/`), via a new production build path; publish the four camp pages + stylesheet to the repo root; deploy launch discovery assets (`robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`); retire the `/new/` staging preview behind a one-line redirect stub; and verify the live root site end to end.

**Architecture:** The Astro source stays where it is (`astro/src/pages/new/{index,about,[camp]}.astro`) and still emits to `dist/new/` under a plain `astro build`. **The retarget is done entirely in a new post-process script** — `astro/scripts/build-production.mjs` — which copies `dist/new/{index.html,tokyo/,adelaide/,about/,miso.css}` to the repo root and rewrites every `/new/`-scoped URL to the root: internal links `"/new/…` → `"/…` (so the stylesheet becomes `/miso.css`), and absolute `https://misocamp.com/new/…` → `https://misocamp.com/…` (canonical, `og:url`, and every JSON-LD URL / `@id`).

This single string substitution converts the staging JSON-LD into the **launch variants from `docs/drafts/jsonld.md`** verbatim in semantics, because `docs/drafts/jsonld.md` states — and this plan confirms by inspection — that the *only* difference between staging and launch JSON-LD is the URL base (`misocamp.com/new/` → `misocamp.com/`). The built JSON-LD is minified (Astro renders it via `JSON.stringify`), so the launch variant is the minified form of the launch blocks; it is verified by parsing, not by byte-matching the pretty-printed draft.

`astro/scripts/build-staging.mjs`, `astro/astro.config.mjs`, and every file under `astro/src/**` and `astro/public/**` are **not modified** by this plan. `build:staging` continues to work and continues to emit `noindex` staging output to `new/astro/` if run; it is simply not run for launch. The old root `index.html` is backed up first with `git mv` (git history is the deep backup; `/legacy/2026-captain-site/` makes it browsable too). `sponsorship-deck.html` and `partnership-deck.html` stay at their current root paths (shared externally). `CNAME` and `og-image.jpg` are untouched.

**Coordinator-facing note (about the "Astro About JSON-LD gap"):** the gap is **already resolved in source**. `astro/src/pages/new/about.astro` carries `igorObj` (Person, Igor) + `noahObj` (Person, Noah) + `breadcrumbObj` (BreadcrumbList) and renders 3 `application/ld+json` blocks; a raw `astro build` today yields `dist/new/about/index.html` with 3 blocks of type `Person`, `Person`, `BreadcrumbList` (verified by parse). So Task 2 performs **no source edit** for the Persons — it only (a) confirms the present source carries both founders + Breadcrumb and (b) retargets the Breadcrumb `item` URLs to launch via the production-build rewrite. If a fresh `astro build` ever drops a Person block, that is a `BLOCKED` condition — do not synthesize one.

**Tech Stack:** Static HTML, CSS, TypeScript (Astro 7), Node 20+ (`cpSync`/`rmSync`/`replaceAll`), Python 3 standard library (`json`, `xml.etree`, `html.parser`), headless Google Chrome (optional screenshots). `npm run build:production` for the root site; `npm run build` (raw) or `npm run build:staging` not run as part of launch.

## Global Constraints

- Work on branch `root-cutover`, branched from current `master`.
- One commit per task, with the **exact** commit messages shown in each task's final step. If any step fails twice, STOP and report `BLOCKED root-cutover: <one-line reason>`.
- **Every commit stages only its own explicitly-listed files** (`git add <files>` then `git commit`). The working tree carries unrelated changes (`_session.md` modified; `partnership-deck.html`, `.superpowers/`, `MISo Camp - Sponsorship Deck v2.md` untracked). **Do not stash, restore, `git add -A`, or touch any of them** — `_session.md` and workspace state files are protected.
- **Do not push until every task passes.** The repo root `index.html` is intentionally absent between Task 1 (backup) and Task 3 (publish); that intermediate state is local only and is not deployed.
- **Copy is byte-exact:** em dash `—`, en dashes `–` (in `24–25`, `17–18 September`), middot `·`, arrow `↗`, the bare ampersand in `Public & policy`, and the German `§`, `ß` (Fregestraße), `ä` (gemäß, Geschäftsführer, Fregestraße) in the Impressum. The Impressum block is legally vetted — `HRB 129945 B`, `DE273843619`, `§ 5 DDG`, `Fregestraße 65`, `gemäß` must be byte-exact on the built `/about/` page.
- **Protected (do NOT touch in any task):** root `index.html` (moved, not deleted, in Task 1), `sponsorship-deck.html`, `partnership-deck.html`, `CNAME`, `og-image.jpg`, `.nojekyll`, `_session.md`, any workspace state file, `astro/scripts/build-staging.mjs`, `astro/astro.config.mjs`, `astro/src/**`, `astro/public/**`, `astro/tsconfig.json`, `astro/.gitignore`, `docs/drafts/**`, `docs/plans/**` (except this file already written), `docs/plans/*-screenshots/**`, the `.md` proposal/deck files at repo root, `chiba-tech-logo.png`, `flinders-nvi-logo.jpg`, `sa-futures-agency-logo.png`, `assets/`, `Curriculum Design - Spiral Architecture (Complete).md`, `Make It So Camp - Main Proposal.md`, `MISo Camp - Sponsorship Deck.md`, `MISo Camp - Sponsorship Deck v2.md`.
- Banned language stays absent from any built page: `free pilot`, prices / cost / `offers`, `supporting partner`, `Supported by`, `laptops closed`, `On paper`.
- Optional screenshots use port **8813** for the static server and CDP port **9429** — with occupied-port BLOCK guards on both before starting. **Never use port 8765.**

## File Structure

- `legacy/2026-captain-site/index.html` (new, via `git mv` from old root `index.html`): the old "Become a Captain of AI" page, browsable backup.
- `astro/scripts/build-production.mjs` (new): production post-process — copies `dist/new/*` to repo root, rewrites `/new/` → root, guards.
- `astro/package.json` (modify): add the `build:production` script entry alongside `build:staging`.
- Repo root (new, generated): `index.html`, `tokyo/index.html`, `adelaide/index.html`, `about/index.html`, `miso.css`.
- Repo root (new): `robots.txt` (updated with `Disallow: /legacy/` and `Disallow: /new/`), `sitemap.xml` (verbatim from draft), `llms.txt` (verbatim from draft, already root URLs), `llms-full.txt` (rewritten, faithful to current `new/*.html`).
- `new/index.html` (replaced): the redirect stub. Everything else under `new/` is `git rm`'d.
- `docs/plans/root-cutover-screenshots/` (new, optional): verification screenshots.

## Task 1: Back up the old root page to `legacy/2026-captain-site/`

**Files:**
- Move (tracked): root `index.html` → `legacy/2026-captain-site/index.html`

**Produces:**
- The old "Become a Captain of AI" page lives at `legacy/2026-captain-site/index.html` (browsable; git history is the deep backup).
- The repo root no longer has an `index.html` (re-created by Task 3).
- `sponsorship-deck.html`, `partnership-deck.html`, `CNAME`, `og-image.jpg`, `.nojekyll` untouched and still at the repo root.

- [ ] **Step 1: Create the branch from current `master`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
git pull --ff-only origin master
if git show-ref --verify --quiet refs/heads/root-cutover; then echo "BLOCKED root-cutover: branch root-cutover already exists"; exit 1; fi
git switch -c root-cutover >/dev/null
test "$(git branch --show-current)" = "root-cutover" && echo "PASS on branch root-cutover"
```

Expected output ends with:

```text
PASS on branch root-cutover
```

- [ ] **Step 2: Record pre-task hashes of protected files, then move the old root page**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
shasum -a 256 sponsorship-deck.html partnership-deck.html CNAME og-image.jpg > /tmp/miso-cutover-protected.sha
mkdir -p legacy/2026-captain-site
git mv index.html legacy/2026-captain-site/index.html
test -f legacy/2026-captain-site/index.html && echo "PASS moved old root to legacy"
test ! -e index.html && echo "PASS root index.html removed"
git diff --quiet -- sponsorship-deck.html CNAME og-image.jpg && echo "PASS tracked-protected clean"
test -f sponsorship-deck.html && test -f partnership-deck.html && echo "PASS decks present"
grep -Fq 'Become a Captain of AI' legacy/2026-captain-site/index.html && echo "PASS legacy still has Captain title"
```

Expected output ends with:

```text
PASS moved old root to legacy
PASS root index.html removed
PASS tracked-protected clean
PASS decks present
PASS legacy still has Captain title
```

(`partnership-deck.html` is intentionally untracked in the repo — it stays untracked and present at the root; its byte-unchanged state is verified by the SHA-256 snapshot in Task 6.)

(`shasum` over the four protected files is written to `/tmp/miso-cutover-protected.sha` and re-checked in Task 6.)

- [ ] **Step 3: Commit Task 1**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add legacy/2026-captain-site/index.html
git commit -q -m "chore: back up old Captain-site root page to legacy/2026-captain-site/"
git show --stat --oneline HEAD | head -3
```

Expected output includes:

```text
chore: back up old Captain-site root page to legacy/2026-captain-site/
 legacy/2026-captain-site/index.html | …
```

(The rename shows as a rename / move in `git show --stat`; the working-tree `_session.md` modification and untracked decks remain untouched because only `legacy/2026-captain-site/index.html` is staged.)

## Task 2: Astro retarget — the production build path

**Files:**
- New: `astro/scripts/build-production.mjs`
- Modify: `astro/package.json` (add one `build:production` script line)

**Produces:**
- `npm run build:production` exists alongside `npm run build:staging` and is syntactically valid; `astro check` passes.
- A raw `npm run build` still emits `dist/new/{index.html,tokyo/,adelaide/,about/,miso.css}` with `index, follow`, `/new/`-scoped internal links, `/new/miso.css` stylesheet, and staging JSON-LD URLs.
- The built `dist/new/about/index.html` still carries 3 JSON-LD blocks: `Person` (Igor), `Person` (Noah), `BreadcrumbList` (the About gap, already fixed in source, confirmed here).
- Nothing is published to the repo root yet (that is Task 3). `astro/src/**`, `astro/public/**`, `astro/scripts/build-staging.mjs`, and `astro/astro.config.mjs` are unchanged.

- [ ] **Step 1: Write `astro/scripts/build-production.mjs`**

Create the file with exactly this content:

```js
import {
  cpSync,
  existsSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const astroRoot = resolve(scriptDir, '..');
const repoRoot = resolve(astroRoot, '..');
const source = join(astroRoot, 'dist', 'new');

if (!existsSync(source)) {
  throw new Error(`Astro output missing: ${source}`);
}

// 1. Clear only the five prior production outputs at repo root.
const outFiles = ['index.html', 'miso.css'];
const outDirs = ['tokyo', 'adelaide', 'about'];
for (const name of outFiles) {
  rmSync(join(repoRoot, name), { force: true });
}
for (const name of outDirs) {
  rmSync(join(repoRoot, name), { recursive: true, force: true });
}

// 2. Copy the four built pages + the stylesheet into repo root, flattening /new/.
const pages = [
  join(source, 'index.html'),
  join(source, 'tokyo'),
  join(source, 'adelaide'),
  join(source, 'about'),
  join(source, 'miso.css'),
];
for (const path of pages) {
  if (!existsSync(path)) throw new Error(`Missing production output: ${path}`);
}
cpSync(join(source, 'index.html'), join(repoRoot, 'index.html'));
cpSync(join(source, 'tokyo'), join(repoRoot, 'tokyo'), { recursive: true });
cpSync(join(source, 'adelaide'), join(repoRoot, 'adelaide'), { recursive: true });
cpSync(join(source, 'about'), join(repoRoot, 'about'), { recursive: true });
cpSync(join(source, 'miso.css'), join(repoRoot, 'miso.css'));

// 3. Retarget root: /new/ scoped URLs -> root, in the four built pages only.
const htmlTargets = [
  join(repoRoot, 'index.html'),
  join(repoRoot, 'tokyo', 'index.html'),
  join(repoRoot, 'adelaide', 'index.html'),
  join(repoRoot, 'about', 'index.html'),
];
for (const path of htmlTargets) {
  const original = readFileSync(path, 'utf8');
  const rewritten = original
    .replaceAll('https://misocamp.com/new/', 'https://misocamp.com/')
    .replaceAll('"/new/', '"/');
  if (rewritten === original) {
    throw new Error(`No production rewrite applied: ${path}`);
  }
  writeFileSync(path, rewritten);
}

// 4. Guards on the four root pages: index,follow; no /new/; root stylesheet; zero client scripts.
for (const path of htmlTargets) {
  const html = readFileSync(path, 'utf8');
  if (!html.includes('content="index, follow"')) {
    throw new Error(`Production robots directive missing: ${path}`);
  }
  if (html.includes('/new/')) {
    throw new Error(`Staging /new/ reference remains: ${path}`);
  }
  if (!html.includes('href="/miso.css"')) {
    throw new Error(`Root stylesheet URL missing: ${path}`);
  }
  if (/href="https?:\/\/misocamp\.com\/new/.test(html)) {
    throw new Error(`Staging absolute URL remains: ${path}`);
  }
  const stripped = html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g,
    '',
  );
  if (/<script/i.test(stripped)) {
    throw new Error(`Client script emitted: ${path}`);
  }
}

if (!readFileSync(join(repoRoot, 'miso.css')).equals(readFileSync(join(source, 'miso.css')))) {
  throw new Error('Production CSS parity check');
}

console.log('PASS production artifact: 4 root pages, root URLs, index,follow, zero scripts, root CSS');
```

- [ ] **Step 2: Add the `build:production` script to `astro/package.json`**

The current `scripts` block in `astro/package.json` is:

```json
  "scripts": {
    "build": "astro build",
    "build:staging": "npm run build && node scripts/build-staging.mjs",
    "check": "astro check",
    "preview": "astro preview"
  },
```

Change it to (one new line inserted directly after the `build:staging` line):

```json
  "scripts": {
    "build": "astro build",
    "build:staging": "npm run build && node scripts/build-staging.mjs",
    "build:production": "npm run build && node scripts/build-production.mjs",
    "check": "astro check",
    "preview": "astro preview"
  },
```

- [ ] **Step 3: Verify the build script parses and `astro check` still passes**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
node --check scripts/build-production.mjs && echo 'PASS build-production.mjs parses'
node -e "import('./package.json', { assert: { type: 'json' } }).then(m => m.default.scripts['build:production'] === 'npm run build && node scripts/build-production.mjs' ? console.log('PASS script registered') : process.exit(1))"
npx astro check 2>&1 | tail -4
```

Expected output ends with:

```text
PASS build-production.mjs parses
PASS script registered
- 0 errors
- 0 warnings
```

(`astro check` may report `1 hint`; that is acceptable. `0 errors` is the gate.)

- [ ] **Step 4: Run a raw build and confirm the pre-rewrite shape (no repo-root writes)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run build >/dev/null 2>&1
python3 - <<'PY'
import re, json, os
base = 'dist/new'
for rel in ['index.html','tokyo/index.html','adelaide/index.html','about/index.html']:
    p = os.path.join(base, rel)
    assert os.path.isfile(p), f'missing {p}'
    t = open(p).read()
    assert 'content="index, follow"' in t, f'robots not index,follow: {rel}'
    assert 'href="/new/miso.css"' in t, f'staging stylesheet missing: {rel}'
for rel in ['index.html','tokyo/index.html','adelaide/index.html','about/index.html','miso.css']:
    assert os.path.isfile(os.path.join(base, rel)), f'missing dist/new/{rel}'
# JSON-LD types per page (minified: JSON.stringify, no space after colon)
def types(f):
    t=open(f).read(); out=[]
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
        o=json.loads(b)
        if '@graph' in o: out += ['@graph:'+n['@type'] for n in o['@graph']]
        else: out.append(o['@type'])
    return out
hub=types(f'{base}/index.html'); ab=types(f'{base}/about/index.html'); tk=types(f'{base}/tokyo/index.html'); ad=types(f'{base}/adelaide/index.html')
assert hub == ['@graph:Organization','@graph:WebSite','@graph:Person','@graph:Person','@graph:Event','@graph:Event'], hub
assert ab == ['Person','Person','BreadcrumbList'], ab
assert tk == ['Event','BreadcrumbList'], tk
assert ad == ['Event','BreadcrumbList'], ad
print('PASS raw dist/new: 5 files, index,follow, /new/miso.css, JSON-LD types correct (About = 2 Person + Breadcrumb)')
PY
```

Expected output ends with:

```text
PASS raw dist/new: 5 files, index,follow, /new/miso.css, JSON-LD types correct (About = 2 Person + Breadcrumb)
```

(The `astro check` Person-confirmation here is the "About gap already fixed" gate. If `ab` is not exactly `['Person','Person','BreadcrumbList']`, STOP — that means a Person dropped and the gap is real; report `BLOCKED root-cutover: About JSON-LD missing a founder Person`.)

- [ ] **Step 5: Commit Task 2**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro/scripts/build-production.mjs astro/package.json
git commit -q -m "feat: add production build path retargeting Astro site to root URLs"
git show --stat --oneline HEAD | head -4
```

Expected output includes:

```text
feat: add production build path retargeting Astro site to root URLs
 astro/package.json            | …
 astro/scripts/build-production.mjs | …
```

## Task 3: Publish the Astro site to the repo root

**Files:**
- New (generated at repo root): `index.html`, `tokyo/index.html`, `adelaide/index.html`, `about/index.html`, `miso.css`

**Produces:**
- `npm run build:production` writes the four root pages + `/miso.css` to the repo root.
- Root `index.html` is the Swiss site (statement + hero-sub partner link + "Come for your experience, not your AI experience"), canonical `https://misocamp.com/`.
- `/tokyo/`, `/adelaide/`, `/about/` carry canonical `https://misocamp.com/tokyo/`, `…/adelaide/`, `…/about/`; none contains `/new/` anywhere; all carry `content="index, follow"` and reference `href="/miso.css"`.
- About JSON-LD = `Person, Person, BreadcrumbList`; hub = the 6-type `@graph`; camp pages = `Event, BreadcrumbList` — all with launch (root) URLs.

- [ ] **Step 1: Run the production build**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run build:production
```

Expected output ends with:

```text
PASS production artifact: 4 root pages, root URLs, index,follow, zero scripts, root CSS
```

(If the script throws a guard, read the error message: `Staging /new/ reference remains` / `Root stylesheet URL missing` / `No production rewrite applied` / `Client script emitted`. Do not proceed to Step 2 until it prints the PASS line.)

- [ ] **Step 2: Verify the four root pages**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import re, json, os
root = '.'
pages = {
  'index.html': 'https://misocamp.com/',
  'tokyo/index.html': 'https://misocamp.com/tokyo/',
  'adelaide/index.html': 'https://misocamp.com/adelaide/',
  'about/index.html': 'https://misocamp.com/about/',
}
for rel, canon in pages.items():
    p = os.path.join(root, rel)
    assert os.path.isfile(p), f'missing root {rel}'
    t = open(p).read()
    assert '/new/' not in t, f'/new/ present in {rel}'
    assert f'<link rel="canonical" href="{canon}"' in t, f'canonical wrong in {rel}: want {canon}'
    assert f'property="og:url" content="{canon}"' in t, f'og:url wrong in {rel}: want {canon}'
    assert 'content="index, follow"' in t, f'robots not index,follow in {rel}'
    assert 'href="/miso.css"' in t, f'no root stylesheet in {rel}'

# Hub content
hub = open('index.html').read()
assert 'You cannot delegate what you cannot articulate.' in hub
assert 'Partner with us to run a camp' in hub          # hero-sub partner CTA
assert 'Come for your experience, not your AI experience.' in hub
assert '<h3>Public & policy</h3>' in hub

# JSON-LD parse + types (minified)
def blocks(f):
    t = open(f).read()
    return [json.loads(b) for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', t, re.S)]
def types(o):
    return ['@graph:'+n['@type'] for n in o['@graph']] if '@graph' in o else [o['@type']]
assert types(blocks('index.html')[0]) == ['@graph:Organization','@graph:WebSite','@graph:Person','@graph:Person','@graph:Event','@graph:Event']
ab = blocks('about/index.html')
assert [t for o in ab for t in types(o)] == ['Person','Person','BreadcrumbList']
assert ab[2]['itemListElement'][0]['item'] == 'https://misocamp.com/' and ab[2]['itemListElement'][1]['item'] == 'https://misocamp.com/about/'
tk = blocks('tokyo/index.html')
assert [t for o in tk for t in types(o)] == ['Event','BreadcrumbList']
assert tk[0]['url'] == 'https://misocamp.com/tokyo/' and tk[0]['organizer']['url'] == 'https://misocamp.com/'
ad = blocks('adelaide/index.html')
assert [t for o in ad for t in types(o)] == ['Event','BreadcrumbList']
assert ad[0]['url'] == 'https://misocamp.com/adelaide/' and ad[0]['organizer']['url'] == 'https://misocamp.com/'

# About Impressum present, byte-exact
about = open('about/index.html').read()
for s in ['Angaben gemäß § 5 DDG','Fregestraße 65','HRB 129945 B','DE273843619','gemäß','Geschäftsführer','id="impressum"']:
    assert s in about, f'Impressum byte-mismatch: {s}'
print('PASS root site: 4 pages, root canonicals/og, index,follow, /miso.css, JSON-LD launch + About 2 Persons + Breadcrumb + Impressum')
PY
```

Expected output ends with:

```text
PASS root site: 4 pages, root canonicals/og, index,follow, /miso.css, JSON-LD launch + About 2 Persons + Breadcrumb + Impressum
```

- [ ] **Step 3: Commit Task 3**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add index.html tokyo adelaide about miso.css
git commit -q -m "build: publish Astro site to repo root"
git show --stat --oneline HEAD | head -8
```

Expected output lists the five new outputs under `build: publish Astro site to repo root`.

## Task 4: Deploy launch discovery assets to the repo root

**Files:**
- New at repo root: `robots.txt` (updated), `sitemap.xml` (verbatim from draft), `llms.txt` (verbatim from draft), `llms-full.txt` (rewritten, faithful to current `new/*.html`)

**Produces:**
- `robots.txt` carries `Allow: /`, `Disallow: /legacy/`, `Disallow: /new/`, and the Sitemap line.
- `sitemap.xml` lists the four root URLs and parses with `xml.etree`.
- `llms.txt` links use root URLs (`https://misocamp.com/`, `/tokyo/`, `/adelaide/`, `/about/`, `/llms-full.txt`).
- `llms-full.txt` is a faithful markdown transcription of the **current** `new/{index,tokyo,adelaide,about}/index.html` — the who-for rework (`Come for your experience, not your AI experience`, four cards incl. `Public & policy`), both partnership CTAs, the About Impressum, and the Café/straße/§-ß-ä glyphs all transcribed verbatim with root URLs.

> Task 4 runs before Task 5 because `llms-full.txt` is transcribed from `new/*.html`, which Task 5 deletes.

- [ ] **Step 1: Write the updated `robots.txt` at repo root**

Write exactly this file to `/Users/zeigor/GitHub/make-it-so-camp/robots.txt`:

```text
# robots.txt for https://misocamp.com
# Deploy to the domain root at cutover. Not before.

User-agent: *
Allow: /
Disallow: /legacy/
Disallow: /new/

Sitemap: https://misocamp.com/sitemap.xml
```

- [ ] **Step 2: Copy `sitemap.xml` and `llms.txt` verbatim from the draft (already root URLs)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
cp docs/drafts/launch-assets/sitemap.xml sitemap.xml
cp docs/drafts/launch-assets/llms.txt llms.txt
grep -Fq 'https://misocamp.com/tokyo/' sitemap.xml && echo 'PASS sitemap root urls'
grep -Fq 'https://misocamp.com/llms-full.txt' llms.txt && echo 'PASS llms.txt root urls'
```

Expected output ends with:

```text
PASS sitemap root urls
PASS llms.txt root urls
```

- [ ] **Step 3: Write the refreshed `llms-full.txt` at repo root**

Write exactly this file to `/Users/zeigor/GitHub/make-it-so-camp/llms-full.txt` (faithful transcription of the current `new/*.html`; em dash `—`, en dash `–`, middot `·`, `§`, `ß`, `ä`, `é`, `↗` preserved byte-for-byte):

```text
# Make It So Camp

Make It So Camp is a selective two-day AI workshop for experienced practitioners. By invitation. Tokyo and Adelaide, 2026.

Site: https://misocamp.com/
Contact: hello@misocamp.com (email-only)
Founders: Igor Schwarzmann and Noah Raford

---

## Home

By invitation. Two-day AI workshop. Tokyo · Adelaide · 2026.

You cannot delegate what you cannot articulate.

[Request an invitation ↗](mailto:hello@misocamp.com?subject=Invitation%20request)  [Partner with us to run a camp ↗](mailto:hello@misocamp.com?subject=Partnership)

### 01 The idea

AI can only help with work you can describe. And the most valuable work — yours — has usually never been described.

When these tools arrived, the people who got the most out of them were not the most technical. They were the ones who could state what they wanted: the goal, the constraints, what good looks like. The machine does not guess. It needs you to say what you mean.

Most AI training starts with the tools: which model, which prompt, which trick. We start with your work. Whatever your field and however long you have been in it, most of your method is unwritten — how you frame a problem, what you pay attention to, when you call something good enough. That unwritten method is the material the camp works with.

The camp is for writing it down. That sounds simple, and it is the whole difference: a written method is something a machine can execute, a stranger can question, and a team can improve. And it compounds — each piece of your work you make explicit makes the next thing you build faster.

The aim is not to get faster at generic tasks. It is to make your work legible enough that AI becomes a collaborator, and to leave with a way of working that keeps paying off long after the two days end.

### 02 Who it's for

Come for your experience, not your AI experience. The camp leans on what you already know — strategy, research, policy, craft — and mixes domains on purpose: the method transfers, and the demos are better for it.

- **Academic.** Researchers, teachers, lab leads. People whose methods are rigorous but rarely written for anyone else to run.
- **Creative.** Strategists, designers, writers, cultural workers. People who work by taste and want it to survive contact with the tools.
- **Corporate.** Product, operations, transformation. People who own a process a team needs to understand, not just follow.
- **Public & policy.** Policy makers, public servants, civic institutions. People whose decisions must hold up when someone asks why.

You need work you care about, and the patience to say what you mean. If you would rather wait for a playbook, this camp is not the place — the people here are writing it.

### 03 How it works

Hands-on from the first hour. Theory only ever names what you have already experienced.

**Before — A map of the room.** We ask everyone beforehand what they are working on and how they work today, so Day 1 starts from what is actually in the room rather than a round of introductions.

**Day 1 — Articulate.** You work on a real problem you bring with you, and make the method behind it explicit: the steps, the assumptions, what good looks like. Exercises with people from other fields test whether someone else could actually follow it.

**Day 2 — Build and demo.** Alone or in a small cross-domain team, you put the written method to work with the tools and build something real. The day ends in demo rounds — not show-and-tell, but what did your way of working make possible.

### 04 2026 camps

Tokyo
- Dates: 24–25 August 2026
- Venue: Crypto Café Tokyo
- Partner: Chiba Institute of Technology
[View Tokyo ↗](https://misocamp.com/tokyo/)

Adelaide
- Dates: 17–18 September 2026
- Venue: TBD
- Partner: Flinders University New Venture Institute and SA Futures Agency
[View Adelaide ↗](https://misocamp.com/adelaide/)

### 05 Request an invitation

Tell us which camp, what work you would bring, and why now. We reply if there is a fit.

[hello@misocamp.com](mailto:hello@misocamp.com?subject=Invitation%20request)

Interested in running a version of Make It So Camp — at your university, company, or city? [Partner with us ↗](mailto:hello@misocamp.com?subject=Partnership)

Make It So Camp — created by [Igor Schwarzmann and Noah Raford](https://misocamp.com/about/).
In collaboration with Chiba Institute of Technology, Flinders University New Venture Institute, and SA Futures Agency.
[About](https://misocamp.com/about/) · [Impressum](https://misocamp.com/about/#impressum) · hello@misocamp.com

---

## Tokyo

Make It So Camp Tokyo.

By invitation. Two-day AI workshop. Tokyo · 24–25 August 2026.

In collaboration with Chiba Institute of Technology.

[Request an invitation ↗](mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request)

### 01 Overview

Two days to make your way of working legible — to a machine, and to people who work nothing like you. This page is what to expect in Tokyo.

Make It So Camp Tokyo runs over two days at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.

You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.

Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.

You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.

### 02 The two days

Hands-on from the first hour. Theory only ever names what you have already experienced.

**Before — A map of the room.** We ask everyone beforehand what they are working on and how they work today. Day 1 starts from what is actually in the room, not from a round of introductions.

**Day 1 — Articulate.** A sequence of short working blocks, each ending hands-on. You surface the steps, assumptions, and quality signals behind your real problem, write them down, and test with people from other fields whether your method actually transfers. The day ends with choosing what to build — and with whom, or solo.

**Day 2 — Build and demo.** Working blocks with the tools, building from the method you wrote down, with a mid-point critique to catch wrong turns early. The day ends in demo rounds in small groups — not show-and-tell, but what did your way of working make possible — and finishes early enough to travel.

**After — The method stays.** What you wrote down is yours: a working method your team can read, question, and improve — and a starting point that compounds with every next build.

### 03 The schedule

What happens on those two days. Times are indicative — the exact rhythm may shift.

Day 1
- 09:00 Welcome + frame
- 10:00 Methods you can't see
- 11:40 Lunch
- 12:40 Write it down, it compounds
- 14:15 Explicit = shareable
- 15:30 Form teams, or go solo
- 16:15 Networking drinks

Day 2
- 09:00 Re-entry
- 09:15 Morning frame: lock the build
- 09:45 Build I
- 11:15 Mid-build crit
- 11:45 Lunch
- 12:30 Build II
- 14:00 Demo rounds
- 14:45 Wrap, early finish

### 04 Logistics

- Dates: 24–25 August 2026
- Venue: Crypto Café Tokyo
- In collaboration with: Chiba Institute of Technology
- Format: Two days, hands-on
- Cohort: Deliberately mixed: academic, creative industries, corporate
- Bring: A real problem you are working on

### 05 Request an invitation

Tell us what work you would bring, and why now. We reply if there is a fit.

[hello@misocamp.com](mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request)

---

## Adelaide

Make It So Camp Adelaide.

By invitation. Two-day AI workshop. Adelaide · 17–18 September 2026.

In collaboration with Flinders University New Venture Institute and SA Futures Agency.

[Request an invitation ↗](mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request)

### 01 Overview

Two days to make your way of working legible — to a machine, and to people who work nothing like you. This page is what to expect in Adelaide.

Make It So Camp Adelaide runs over two days in Adelaide, in collaboration with Flinders University New Venture Institute and SA Futures Agency. The venue will be announced. The cohort is deliberately mixed: researchers, strategists, designers, operators — people from the region who share a problem type, not a job title.

You bring real work. Not a case study, not a sandbox exercise: a live problem where your judgment matters and your method has never been written down. That problem is your material for both days.

Day 1 is about articulation — making the method behind your work explicit enough that someone from another field could follow it. Day 2 puts it to work: you build with the tools, alone or in a small team, and demo what your way of working makes possible.

You leave with three things: a written method you can keep using, a working thing you built from it, and a set of people who now know how you think.

### 02 The two days

Hands-on from the first hour. Theory only ever names what you have already experienced.

**Before — A map of the room.** We ask everyone beforehand what they are working on and how they work today. Day 1 starts from what is actually in the room, not from a round of introductions.

**Day 1 — Articulate.** A sequence of short working blocks, each ending hands-on. You surface the steps, assumptions, and quality signals behind your real problem, write them down, and test with people from other fields whether your method actually transfers. The day ends with choosing what to build — and with whom, or solo.

**Day 2 — Build and demo.** Working blocks with the tools, building from the method you wrote down, with a mid-point critique to catch wrong turns early. The day ends in demo rounds in small groups — not show-and-tell, but what did your way of working make possible — and finishes early enough to travel.

**After — The method stays.** What you wrote down is yours: a working method your team can read, question, and improve — and a starting point that compounds with every next build.

### 03 The schedule

What happens on those two days. Times are indicative — the exact rhythm may shift.

Day 1
- 09:00 Welcome + frame
- 10:00 Methods you can't see
- 11:40 Lunch
- 12:40 Write it down, it compounds
- 14:15 Explicit = shareable
- 15:30 Form teams, or go solo
- 16:15 Networking drinks

Day 2
- 09:00 Re-entry
- 09:15 Morning frame: lock the build
- 09:45 Build I
- 11:15 Mid-build crit
- 11:45 Lunch
- 12:30 Build II
- 14:00 Demo rounds
- 14:45 Wrap, early finish

### 04 Logistics

- Dates: 17–18 September 2026
- Venue: TBD
- In collaboration with: Flinders University New Venture Institute and SA Futures Agency
- Format: Two days, hands-on
- Cohort: Deliberately mixed: academic, creative industries, corporate
- Bring: A real problem you are working on

### 05 Request an invitation

Tell us what work you would bring, and why now. We reply if there is a fit.

[hello@misocamp.com](mailto:hello@misocamp.com?subject=Adelaide%20invitation%20request)

---

## About

Who's behind this.

Make It So Camp was created by Igor Schwarzmann and Noah Raford. Two practices, one thesis: articulation is the bottleneck.

### 01 Founders

[Igor Schwarzmann ↗](https://igorschwarzmann.com)
Independent strategist and researcher working at the intersection of culture and technology: cultural and trend research, brand and growth strategy, and AI strategy. He ran a foresight and strategic-design studio out of Berlin, which he sold in 2022. Recent clients include frontier AI labs, luxury fashion houses, and home-appliance makers.

[Noah Raford ↗](https://www.noahraford.com)
Futurist and strategist. Managing Partner at EMIR, he advises businesses and governments on emerging technologies and foresight. He spent a decade in the Government of Dubai as Futurist-in-Chief — founding executive of the Dubai Future Foundation and the Museum of the Future, and senior advisor to the UAE Prime Minister's Office. He holds a PhD from MIT.

### 02 Collaborators

- Tokyo: In collaboration with Chiba Institute of Technology
- Adelaide: In collaboration with Flinders University New Venture Institute and SA Futures Agency

### 03 Request an invitation

Tell us which camp, what work you would bring, and why now. We reply if there is a fit.

[hello@misocamp.com](mailto:hello@misocamp.com?subject=Invitation%20request)

### 04 Impressum

Angaben gemäß § 5 DDG

Known Unknowns GmbH
Fregestraße 65
12159 Berlin

Vertreten durch: Igor Schwarzmann, Geschäftsführer
Registergericht: Amtsgericht Charlottenburg, HRB 129945 B
USt-IdNr.: DE273843619
Kontakt: hello@misocamp.com

Make It So Camp — created by [Igor Schwarzmann and Noah Raford](https://misocamp.com/about/).
In collaboration with Chiba Institute of Technology, Flinders University New Venture Institute, and SA Futures Agency.
[About](https://misocamp.com/about/) · [Impressum](https://misocamp.com/about/#impressum) · hello@misocamp.com
```

- [ ] **Step 4: Verify the launch assets and that `llms-full.txt` matches the current `new/*.html`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'Disallow: /legacy/' robots.txt && grep -Fq 'Disallow: /new/' robots.txt && echo 'PASS robots Disallow legacy+new'
python3 -c "import xml.etree.ElementTree as ET; t=ET.parse('sitemap.xml'); ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}; loc=[e.text for e in t.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]; assert loc==['https://misocamp.com/','https://misocamp.com/tokyo/','https://misocamp.com/adelaide/','https://misocamp.com/about/'], loc; print('PASS sitemap parses, 4 root urls')"
for u in 'https://misocamp.com/' 'https://misocamp.com/tokyo/' 'https://misocamp.com/adelaide/' 'https://misocamp.com/about/' 'https://misocamp.com/llms-full.txt'; do grep -Fq "$u" llms.txt && echo "PASS llms.txt has $u"; done
# llms-full.txt faithful to current new/*.html
grep -Fq 'Come for your experience, not your AI experience.' llms-full.txt && echo 'PASS llms-full who-for lead'
grep -Fq '- **Public & policy.**' llms-full.txt && echo 'PASS llms-full Public & policy'
grep -Fq 'Partner with us to run a camp' llms-full.txt && grep -Fq '[Partner with us ↗](mailto:hello@misocamp.com?subject=Partnership)' llms-full.txt && echo 'PASS llms-full partnership CTAs'
grep -Fq 'Angaben gemäß § 5 DDG' llms-full.txt && grep -Fq 'Fregestraße 65' llms-full.txt && grep -Fq 'HRB 129945 B' llms-full.txt && echo 'PASS llms-full Impressum glyphs byte-exact'
grep -Fq 'Crypto Café Tokyo' llms-full.txt && echo 'PASS llms-full keeps Café é'
# cross-check: every section label number on the live hub is represented in llms-full
grep -Fq '### 01 The idea' llms-full.txt && grep -Fq '### 02 Who it' llms-full.txt && grep -Fq '### 03 How it works' llms-full.txt && grep -Fq '### 04 2026 camps' llms-full.txt && grep -Fq '### 05 Request an invitation' llms-full.txt && echo 'PASS llms-full hub sections'
```

Expected output ends with:

```text
PASS robots Disallow legacy+new
PASS sitemap parses, 4 root urls
PASS llms.txt has https://misocamp.com/
PASS llms.txt has https://misocamp.com/tokyo/
PASS llms.txt has https://misocamp.com/adelaide/
PASS llms.txt has https://misocamp.com/about/
PASS llms.txt has https://misocamp.com/llms-full.txt
PASS llms-full who-for lead
PASS llms-full Public & policy
PASS llms-full partnership CTAs
PASS llms-full Impressum glyphs byte-exact
PASS llms-full keeps Café é
PASS llms-full hub sections
```

- [ ] **Step 5: Commit Task 4**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add robots.txt sitemap.xml llms.txt llms-full.txt
git commit -q -m "feat: deploy launch discovery assets (robots, sitemap, llms.txt, llms-full.txt)"
git show --stat --oneline HEAD | head -6
```

Expected output lists the four discovery files under the commit message.

## Task 5: Retire `/new/` behind a redirect stub

**Files:**
- Remove (tracked): everything under `new/` — the static pages and the `new/astro/` output.
- New: `new/index.html` (single redirect stub).

**Produces:**
- `new/` contains exactly one file, `new/index.html`, which meta-refreshes + canonicalises to `https://misocamp.com/`, carries `noindex`, and shows the line "This staging preview moved to misocamp.com."
- All prior tracked `new/**` paths are staged for deletion.
- `docs/drafts/**` and `docs/plans/**` are untouched.

- [ ] **Step 1: Remove the tracked `new/` tree**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git rm -r --quiet new/
test ! -d new && echo 'PASS new/ removed from working tree'
```

Expected output ends with:

```text
PASS new/ removed from working tree
```

(`git rm -r new/` stages deletions for every tracked path under `new/`: `new/index.html`, `new/about/`, `new/tokyo/`, `new/adelaide/`, `new/miso.css`, `new/astro/**`.)

- [ ] **Step 2: Write the redirect stub `new/index.html`**

Create the directory and write exactly this file to `/Users/zeigor/GitHub/make-it-so-camp/new/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Make It So Camp — staging moved</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="canonical" href="https://misocamp.com/">
  <meta http-equiv="refresh" content="0; url=https://misocamp.com/">
</head>
<body>
  <p>This staging preview moved to <a href="https://misocamp.com/">misocamp.com</a>.</p>
</body>
</html>
```

- [ ] **Step 3: Verify the stub and that nothing else remains under `new/`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
files=$(find new -type f)
test "$files" = "new/index.html" && echo 'PASS only new/index.html remains' || { echo "FAIL extra files: $files"; exit 1; }
grep -Fq 'http-equiv="refresh" content="0; url=https://misocamp.com/"' new/index.html && echo 'PASS stub refresh'
grep -Fq '<link rel="canonical" href="https://misocamp.com/">' new/index.html && echo 'PASS stub canonical'
grep -Fq 'content="noindex, nofollow"' new/index.html && echo 'PASS stub noindex'
grep -Fq 'This staging preview moved to' new/index.html && echo 'PASS stub copy'
```

Expected output ends with:

```text
PASS only new/index.html remains
PASS stub refresh
PASS stub canonical
PASS stub noindex
PASS stub copy
```

- [ ] **Step 4: Commit Task 5**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add new/index.html
git commit -q -m "chore: retire /new/ staging preview behind redirect stub"
git show --stat --oneline HEAD | head -20
```

Expected output shows the deletions of the old `new/**` tracked files plus the new `new/index.html`, under `chore: retire /new/ staging preview behind redirect stub`.

## Task 6: Verification (no commit)

This task produces no commit. If any check fails twice, STOP and report `BLOCKED root-cutover: <one-line reason>` — do not commit a fix speculatively; surface it.

- [ ] **Step 1: Root serves the Swiss site**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for s in 'You cannot delegate what you cannot articulate.' 'Partner with us to run a camp' 'Come for your experience, not your AI experience.' '<h3>Public & policy</h3>'; do
  grep -Fq "$s" index.html && echo "PASS root has: $s" || echo "FAIL root missing: $s"
done
```

Expected: four `PASS root has:` lines.

- [ ] **Step 2: Four root pages exist with correct canonicals; no `/new/` anywhere in canonical/og/JSON-LD**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import re, json, os
pages = {
  'index.html':'https://misocamp.com/','tokyo/index.html':'https://misocamp.com/tokyo/',
  'adelaide/index.html':'https://misocamp.com/adelaide/','about/index.html':'https://misocamp.com/about/',
}
for rel,canon in pages.items():
    t=open(rel).read()
    assert '/new/' not in t, f'/new/ in {rel}'
    assert f'<link rel="canonical" href="{canon}"' in t, f'canon {rel}'
    assert f'property="og:url" content="{canon}"' in t, f'og {rel}'
    # JSON-LD urls also root-scoped
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
        assert 'misocamp.com/new' not in b, f'staging jsonld url in {rel}'
print('PASS 4 root pages, root canonicals/og, zero /new/ in canonical/og/JSON-LD')
PY
```

Expected output ends with:

```text
PASS 4 root pages, root canonicals/og, zero /new/ in canonical/og/JSON-LD
```

- [ ] **Step 3: `robots meta index,follow` on all four**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for f in index.html tokyo/index.html adelaide/index.html about/index.html; do
  grep -Fq 'content="index, follow"' "$f" && echo "PASS index,follow: $f" || echo "FAIL index,follow: $f"
done
```

Expected: four `PASS index,follow:` lines.

- [ ] **Step 4: JSON-LD parses everywhere; About = 2 Persons + Breadcrumb**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import re, json
def blocks(f):
    return [json.loads(b) for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', open(f).read(), re.S)]
def types(o):
    return ['@graph:'+n['@type'] for n in o['@graph']] if '@graph' in o else [o['@type']]
assert types(blocks('index.html')[0]) == ['@graph:Organization','@graph:WebSite','@graph:Person','@graph:Person','@graph:Event','@graph:Event']
a=[t for o in blocks('about/index.html') for t in types(o)]; assert a==['Person','Person','BreadcrumbList'], a
assert [t for o in blocks('tokyo/index.html') for t in types(o)]==['Event','BreadcrumbList']
assert [t for o in blocks('adelaide/index.html') for t in types(o)]==['Event','BreadcrumbList']
ab=blocks('about/index.html')[2]; assert ab['itemListElement'][1]['item']=='https://misocamp.com/about/'
print('PASS JSON-LD parses on 4 pages; About = 2 Person + Breadcrumb (launch urls)')
PY
```

Expected output ends with:

```text
PASS JSON-LD parses on 4 pages; About = 2 Person + Breadcrumb (launch urls)
```

- [ ] **Step 5: Footer Impressum link works; `/about/` has the Impressum section**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for f in index.html tokyo/index.html adelaide/index.html about/index.html; do
  grep -Fq 'href="/about/#impressum"' "$f" && echo "PASS footer impressum link: $f" || echo "FAIL footer impressum link: $f"
done
for s in 'id="impressum"' 'Angaben gemäß § 5 DDG' 'Fregestraße 65' 'HRB 129945 B' 'DE273843619' 'gemäß' 'Geschäftsführer'; do
  grep -Fq "$s" about/index.html && echo "PASS about has: $s" || echo "FAIL about missing: $s"
done
```

Expected: four `PASS footer impressum link:` lines and seven `PASS about has:` lines.

- [ ] **Step 6: Launch assets exist at root; sitemap parses; robots has the Disallows**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for f in robots.txt sitemap.xml llms.txt llms-full.txt; do test -f "$f" && echo "PASS exists: $f" || echo "FAIL missing: $f"; done
python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml'); print('PASS sitemap parses')"
grep -Fq 'Disallow: /legacy/' robots.txt && grep -Fq 'Disallow: /new/' robots.txt && echo 'PASS robots Disallow legacy+new'
grep -Fq 'Sitemap: https://misocamp.com/sitemap.xml' robots.txt && echo 'PASS robots sitemap line'
```

Expected output includes:

```text
PASS exists: robots.txt
PASS exists: sitemap.xml
PASS exists: llms.txt
PASS exists: llms-full.txt
PASS sitemap parses
PASS robots Disallow legacy+new
PASS robots sitemap line
```

- [ ] **Step 7: Legacy backup exists and still carries the old Captain title**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test -f legacy/2026-captain-site/index.html && echo 'PASS legacy file exists'
grep -Fq 'Become a Captain of AI' legacy/2026-captain-site/index.html && echo 'PASS legacy has Captain title'
```

Expected: two `PASS` lines.

- [ ] **Step 8: Decks + CNAME + og-image byte-unchanged (compare against Task-1 snapshot)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test -f /tmp/miso-cutover-protected.sha && shasum -a 256 -c /tmp/miso-cutover-protected.sha && echo 'PASS protected files byte-unchanged'
git diff --quiet -- sponsorship-deck.html CNAME og-image.jpg && echo 'PASS tracked-protected diff-clean'
test -z "$(git ls-files partnership-deck.html)" && echo 'PASS partnership-deck.html untracked (not committed)'
test -f sponsorship-deck.html && test -f partnership-deck.html && echo 'PASS decks still at root'
```

Expected: `PASS protected files byte-unchanged` (the snapshot covers all four), `PASS tracked-protected diff-clean`, `PASS partnership-deck.html untracked (not committed)`, `PASS decks still at root`.

- [ ] **Step 9: `new/` is the redirect stub and nothing else remains under it**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
files=$(find new -type f)
test "$files" = "new/index.html" && echo 'PASS new/ is only the stub' || echo "FAIL new/ has: $files"
grep -Fq 'http-equiv="refresh" content="0; url=https://misocamp.com/"' new/index.html && grep -Fq 'content="noindex, nofollow"' new/index.html && grep -Fq '<link rel="canonical" href="https://misocamp.com/">' new/index.html && echo 'PASS stub redirect+noindex+canonical'
```

Expected: `PASS new/ is only the stub` and `PASS stub redirect+noindex+canonical`.

- [ ] **Step 10: Tag balance on the four built pages**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from html.parser import HTMLParser
VOID={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class C(HTMLParser):
    def __init__(s): super().__init__(); s.s=[]
    def handle_starttag(s,t,a):
        if t not in VOID: s.s.append(t)
    def handle_endtag(s,t):
        if t in VOID: return
        if s.s and s.s[-1]==t: s.s.pop()
        elif t in s.s:
            while s.s and s.s.pop()!=t: pass
for f in ['index.html','tokyo/index.html','adelaide/index.html','about/index.html']:
    p=C(); p.feed(open(f).read()); p.close()
    assert not p.s, f'{f} unbalanced: {p.s}'
print('PASS tag balance on 4 built pages')
PY
```

Expected output ends with:

```text
PASS tag balance on 4 built pages
```

- [ ] **Step 11: Footers byte-identical (whitespace-normalized) across the four**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import re
norm=lambda b:''.join(b.split())
footers={}
for f in ['index.html','tokyo/index.html','adelaide/index.html','about/index.html']:
    m=re.search(r'<footer class="footer">.*?</footer>', open(f).read(), re.S)
    assert m, f'no footer in {f}'
    footers[f]=norm(m.group(0))
assert len(set(footers.values()))==1, f'footers differ: {footers}'
s=list(footers.values())[0]
assert 'href="/about/"' in s and 'href="/about/#impressum"' in s and 'mailto:hello@misocamp.com' in s
print('PASS 4 footers byte-identical (normalized) with Impressum link')
PY
```

Expected output ends with:

```text
PASS 4 footers byte-identical (normalized) with Impressum link
```

- [ ] **Step 12: Banned phrases absent**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
b=false
for p in 'free pilot' 'supporting partner' 'Supported by' 'laptops closed' 'On paper'; do
  if grep -Fiql "$p" index.html tokyo/index.html adelaide/index.html about/index.html; then echo "FAIL banned phrase: $p"; b=true; fi
done
# prices/cost/offers (word-boundary)
if grep -Eiq '\b(offers?|priced?|pricing|cost)\b' index.html tokyo/index.html adelaide/index.html about/index.html; then echo 'FAIL banned: price/cost/offers'; b=true; fi
$b || echo 'PASS banned phrases absent'
```

Expected output ends with:

```text
PASS banned phrases absent
```

- [ ] **Step 13: Protected paths untouched (git-side)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git diff --quiet origin/master -- sponsorship-deck.html CNAME og-image.jpg && echo 'PASS tracked-protected diff-clean' || echo 'FAIL tracked-protected changed'
test -z "$(git ls-files partnership-deck.html)" && echo 'PASS partnership-deck.html untracked & not staged' || echo 'FAIL partnership-deck.html got tracked'
# astro source + staging script + config untouched
git diff --quiet origin/master -- astro/src astro/public astro/scripts/build-staging.mjs astro/astro.config.mjs && echo 'PASS astro source/staging/config diff-clean' || echo 'FAIL astro source/staging/config changed'
git diff --quiet origin/master -- docs/drafts docs/plans/2026-07-15-site-refresh.md docs/plans/2026-07-16-seo-implementation.md docs/plans/2026-07-17-prelaunch-copy.md && echo 'PASS docs/drafts + prior plans diff-clean' || echo 'FAIL docs/drafts or prior plans changed'
```

Expected output includes:

```text
PASS tracked-protected diff-clean
PASS partnership-deck.html untracked & not staged
PASS astro source/staging/config diff-clean
PASS docs/drafts + prior plans diff-clean
```

- [ ] **Step 14: Optional screenshots (occupied-port BLOCK guards; never 8765)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for p in 8813 9429; do
  if lsof -nP -iTCP:$p -sTCP:LISTEN >/dev/null 2>&1; then echo "BLOCKED root-cutover: port $p in use"; exit 1; fi
done
test 8765 -ne 8765 && echo '8765 never used'
python3 -m http.server 8813 >/tmp/miso-cutover-server.log 2>&1 &
SRV=$!
sleep 1
for u in / /tokyo/ /adelaide/ /about/ /robots.txt /sitemap.xml /llms.txt /llms-full.txt; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:8813$u")
  test "$code" = "200" && echo "PASS 200 $u" || echo "FAIL $code $u"
done
curl -s http://127.0.0.1:8813/ | grep -Fq 'Come for your experience, not your AI experience.' && echo 'PASS served hub who-for'
kill $SRV >/dev/null 2>&1
```

Expected: `PASS 200 …` for the eight paths and `PASS served hub who-for`.

(If Chrome CDP screenshots are desired, drive headless Chrome against `http://127.0.0.1:8813/` with `--remote-debugging-port=9429` for the four pages and save PNGs under `docs/plans/root-cutover-screenshots/`. The occupied-port guard on `9429` above already blocks if it is in use. Screenshots are optional — all Step 1–13 checks passing is sufficient for launch sign-off.)

## Summary of commits on `root-cutover` (one per task, in order)

1. `chore: back up old Captain-site root page to legacy/2026-captain-site/`
2. `feat: add production build path retargeting Astro site to root URLs`
3. `build: publish Astro site to repo root`
4. `feat: deploy launch discovery assets (robots, sitemap, llms.txt, llms-full.txt)`
5. `chore: retire /new/ staging preview behind redirect stub`

(Task 6 is verification-only — no commit. Do not push until every Step in Task 6 passes; on a second failure of any Step, report `BLOCKED root-cutover: <reason>` and stop.)

## Known risks flagged

- **Built pages are single-line / minified.** Astro renders JSON-LD via `JSON.stringify` (no space after `:`), so `grep -c` and line-counting are unreliable on the built output; every JSON-LD check in this plan parses with `re.findall` + `json.loads`, not `grep -c`, following the repo's astro-minification lesson. HTML-structure checks use `re.S` (newline-agnostic) or the stdlib `html.parser`.
- **The launch JSON-LD == staging JSON-LD with `misocamp.com/new/` → `misocamp.com/`.**Confirmed by inspection of `docs/drafts/jsonld.md` (which states the only difference is the URL base). The production-build rewrite therefore produces the launch variants verbatim in semantics; verification gates on parse + types + launch URLs, not on byte-matching the pretty-printed draft.
- **The "Astro About JSON-LD gap" is already fixed in source.** `astro/src/pages/new/about.astro` already renders `Person` (Igor) + `Person` (Noah) + `BreadcrumbList` (3 blocks). Task 2 Step 4 asserts this; no source edit is made for the Persons. If a fresh build drops a Person, STOP — it is a real regression, not something to synthesize.
- **`new/` deletions are staged via `git rm -r`.** The redirect stub is the only replacement. Anyone holding an old `/new/…` deep link lands on the stub and is refreshed to the root in 0 seconds (and the stub is `noindex`, canonicalised to `https://misocamp.com/`).
- **`sponsorship-deck.html` / `partnership-deck.html` / `CNAME` / `og-image.jpg` are module-protected.** Their SHA-256 is snapshotted in Task 1 and re-checked in Task 6; `git diff` against `origin/master` must be clean for the tracked ones.
- **`docs/drafts/**` and `docs/plans/**` (other than this file) must remain diff-clean** — the launch assets are *deployed copies* at the repo root, not edits to the drafts.