# Astro Staging Deployment Plan

> **For the executor:** follow this plan verbatim, task by task. If a step fails twice, stop and report `BLOCKED astro-staging: <one-line reason>`.

**Goal:** Publish the existing Astro parallel track at `https://misocamp.com/new/astro/` through the repository's existing GitHub Pages root deployment, without changing `/new/`.

**Architecture:** The canonical Astro build remains unchanged in `astro/dist/new/`. A small Node script copies that output into the repository-owned deployment artifact `new/astro/`, rewrites `/new/` URLs to `/new/astro/`, and changes the staging robots directive to `noindex, nofollow`. GitHub Pages continues publishing `master` from `/`.

**Baseline:** `npm run check` reports 10 files with zero errors, warnings, or hints; `npm run build` produces four pages; `https://misocamp.com/new/astro/` currently returns 404.

## Constraints

- Work on branch `astro-staging-deploy` from current `master`.
- Modify only `astro/package.json`, `astro/scripts/build-staging.mjs`, and generated files under `new/astro/`.
- Do not modify any existing file elsewhere under `new/`.
- Do not modify `_session.md` or workspace-state files; the coordinator owns them.
- Do not touch or stage `.superpowers/`, `MISo Camp - Sponsorship Deck v2.md`, or `partnership-deck.html`.
- Do not deploy or push. The coordinator owns merge, push, live verification, and cleanup.
- No new dependency.

## Task 1: Add deterministic staging generation

**Files:**

- Modify: `astro/package.json`
- Create: `astro/scripts/build-staging.mjs`
- Generate: `new/astro/index.html`
- Generate: `new/astro/tokyo/index.html`
- Generate: `new/astro/adelaide/index.html`
- Generate: `new/astro/about/index.html`
- Generate: `new/astro/miso.css`

- [ ] **Step 1: Create the branch**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
git pull --ff-only origin master
if git show-ref --verify --quiet refs/heads/astro-staging-deploy; then echo 'BLOCKED astro-staging: branch already exists'; exit 1; fi
git switch -c astro-staging-deploy >/dev/null
test "$(git branch --show-current)" = astro-staging-deploy && echo 'PASS on astro-staging-deploy'
```

Expected output ends with:

```text
PASS on astro-staging-deploy
```

- [ ] **Step 2: Replace `astro/package.json` with this complete file**

```bash
cat > astro/package.json <<'EOF'
{
  "name": "make-it-so-camp-astro",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "astro build",
    "build:staging": "npm run build && node scripts/build-staging.mjs",
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

- [ ] **Step 3: Create `astro/scripts/build-staging.mjs` with this complete file**

```bash
mkdir -p astro/scripts
cat > astro/scripts/build-staging.mjs <<'EOF'
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
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
const target = join(repoRoot, 'new', 'astro');

if (!existsSync(source)) {
  throw new Error(`Astro output missing: ${source}`);
}

if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

function collectHtml(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return collectHtml(path);
    return entry.isFile() && entry.name.endsWith('.html') ? [path] : [];
  });
}

const htmlFiles = collectHtml(target);
if (htmlFiles.length !== 4) {
  throw new Error(`Expected 4 staging pages, found ${htmlFiles.length}`);
}
for (const path of htmlFiles) {
  const original = readFileSync(path, 'utf8');
  const rewritten = original
    .replaceAll('/new/', '/new/astro/')
    .replace(
      '<meta name="robots" content="index, follow">',
      '<meta name="robots" content="noindex, nofollow">',
    );

  if (rewritten === original) {
    throw new Error(`No staging rewrite applied: ${path}`);
  }
  writeFileSync(path, rewritten);
}

const expected = [
  join(target, 'index.html'),
  join(target, 'tokyo', 'index.html'),
  join(target, 'adelaide', 'index.html'),
  join(target, 'about', 'index.html'),
  join(target, 'miso.css'),
];
for (const path of expected) {
  if (!existsSync(path)) throw new Error(`Missing staging output: ${path}`);
}

for (const path of htmlFiles) {
  const html = readFileSync(path, 'utf8');
  if (!html.includes('content="noindex, nofollow"')) {
    throw new Error(`Staging robots directive missing: ${path}`);
  }
  if (!html.includes('/new/astro/miso.css')) {
    throw new Error(`Staging stylesheet URL missing: ${path}`);
  }
  if (/href="\/new\/(?!astro\/)/.test(html)) {
    throw new Error(`Unscoped internal link remains: ${path}`);
  }
  if (html.includes('<script')) {
    throw new Error(`Client script emitted: ${path}`);
  }
}

if (!readFileSync(join(target, 'miso.css')).equals(readFileSync(join(source, 'miso.css')))) {
  throw new Error('Staging CSS differs from Astro build CSS');
}

console.log('PASS staging artifact: 4 pages, scoped links, noindex, zero scripts, CSS parity');
EOF
```

- [ ] **Step 4: Typecheck, build, and generate the staging artifact**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run check
npm run build:staging
```

Expected output includes:

```text
Result (10 files):
- 0 errors
PASS staging artifact: 4 pages, scoped links, noindex, zero scripts, CSS parity
```

- [ ] **Step 5: Verify the live static tree outside `new/astro/` is unchanged**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git diff --name-only | grep -v '^astro/package.json$' && { echo 'FAIL tracked change outside package.json'; exit 1; } || echo 'PASS tracked change limited to package.json'
git diff --quiet -- new/index.html new/miso.css new/tokyo/index.html new/adelaide/index.html new/about/index.html && echo 'PASS existing /new files unchanged'
```

Expected output:

```text
PASS tracked change limited to package.json
PASS existing /new files unchanged
```

- [ ] **Step 6: Commit the completed staging deployment artifact**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro/package.json astro/scripts/build-staging.mjs new/astro
git diff --cached --check
git diff --cached --name-only | grep -vE '^(astro/package.json|astro/scripts/build-staging.mjs|new/astro/)' && { echo 'FAIL staged path outside scope'; exit 1; } || echo 'PASS staged paths in scope'
git commit -m "feat: publish Astro preview under /new/astro"
```

Expected output includes:

```text
PASS staged paths in scope
[astro-staging-deploy
```

## Final report

After the commit, run:

```bash
git status --short --branch
git log --oneline master..HEAD
```

The only untracked paths may be the three pre-existing user-owned paths. Do not merge, push, or deploy.
