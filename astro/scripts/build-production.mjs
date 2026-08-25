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
const outDirs = ['adelaide', 'about', 'imprint'];
for (const name of outFiles) {
  rmSync(join(repoRoot, name), { force: true });
}
for (const name of outDirs) {
  rmSync(join(repoRoot, name), { recursive: true, force: true });
}
// tokyo/ also hosts hand-maintained content (tokyo/skills/) that is not part of
// the Astro build. Clear only the built outputs inside it, never the directory.
for (const name of ['index.html', 'agenda', 'miso-coach']) {
  rmSync(join(repoRoot, 'tokyo', name), { recursive: true, force: true });
}

// 2. Copy the four built pages + the stylesheet into repo root, flattening /new/.
const pages = [
  join(source, 'index.html'),
  join(source, 'tokyo'),
  join(source, 'adelaide'),
  join(source, 'about'),
  join(source, 'imprint'),
  join(source, 'miso.css'),
];
for (const path of pages) {
  if (!existsSync(path)) throw new Error(`Missing production output: ${path}`);
}
const agendaSource = join(source, 'tokyo', 'agenda', 'index.html');
if (!existsSync(agendaSource)) {
  throw new Error(`Missing production output: ${agendaSource}`);
}
const agentSource = join(source, 'tokyo', 'miso-coach', 'index.html');
if (!existsSync(agentSource)) {
  throw new Error(`Missing production output: ${agentSource}`);
}
cpSync(join(source, 'index.html'), join(repoRoot, 'index.html'));
cpSync(join(source, 'tokyo'), join(repoRoot, 'tokyo'), { recursive: true }); // merges into tokyo/, leaves tokyo/skills/ alone
cpSync(join(source, 'adelaide'), join(repoRoot, 'adelaide'), { recursive: true });
cpSync(join(source, 'about'), join(repoRoot, 'about'), { recursive: true });
cpSync(join(source, 'imprint'), join(repoRoot, 'imprint'), { recursive: true });
cpSync(join(source, 'miso.css'), join(repoRoot, 'miso.css'));

// 3. Retarget root: /new/ scoped URLs -> root, in the four built pages only.
const agendaTarget = join(repoRoot, 'tokyo', 'agenda', 'index.html');
const agentTarget = join(repoRoot, 'tokyo', 'miso-coach', 'index.html');
const htmlTargets = [
  join(repoRoot, 'index.html'),
  join(repoRoot, 'tokyo', 'index.html'),
  join(repoRoot, 'adelaide', 'index.html'),
  join(repoRoot, 'about', 'index.html'),
  join(repoRoot, 'imprint', 'index.html'),
  agendaTarget,
  agentTarget,
];
// Unlisted pages: must be noindex, and are never asserted as indexable.
const noindexTargets = new Set([agendaTarget, agentTarget]);
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
  if (noindexTargets.has(path)) {
    if (!html.includes('content="noindex, nofollow"')) {
      throw new Error(`Unlisted page must be noindex: ${path}`);
    }
  } else if (!html.includes('content="index, follow"')) {
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

console.log('PASS production artifact: 5 root pages (1 unlisted noindex), root URLs, zero scripts, root CSS');