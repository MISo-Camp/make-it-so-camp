// Build the /new/ homepage preview artifact.
// Copies ONLY dist/new/index.html + dist/new/miso.css to repo/new/,
// rewrites robots to noindex,nofollow (source stays indexable for the
// eventual root promotion), and validates the artifact before publishing.
// Never touches new/astro/ (staging), the root site, or any other page.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const astroRoot = resolve(scriptDir, '..');
const repoRoot = resolve(astroRoot, '..');
const sourceDir = join(astroRoot, 'dist', 'new');
const targetDir = join(repoRoot, 'new');

const srcHtml = join(sourceDir, 'index.html');
const srcCss = join(sourceDir, 'miso.css');
for (const p of [srcHtml, srcCss]) {
  if (!existsSync(p)) throw new Error(`Astro output missing: ${p}`);
}

// --- Rewrite robots for the unlisted preview (source default is indexable) ---
const original = readFileSync(srcHtml, 'utf8');
const robotsFrom = '<meta name="robots" content="index, follow">';
const robotsTo = '<meta name="robots" content="noindex, nofollow">';
if (!original.includes(robotsFrom)) {
  throw new Error('Expected indexable robots directive not found in source HTML');
}
const html = original.replace(robotsFrom, robotsTo);

// --- Validate before publishing ---
if (/http-equiv\s*=\s*"?refresh/i.test(html)) {
  throw new Error('Meta refresh/redirect present');
}
if (!html.includes('<link rel="canonical" href="https://misocamp.com/new/">')) {
  throw new Error('Canonical URL must be https://misocamp.com/new/');
}
if (!html.includes('href="/new/miso.css"')) {
  throw new Error('Root stylesheet link /new/miso.css missing');
}
if (/href="\/new\/(astro|about|tokyo|adelaide|imprint)/.test(html)) {
  throw new Error('Preview must not link to /new/astro, /new/about, /new/tokyo, /new/adelaide or /new/imprint — use root live routes');
}
// Every in-page anchor must have a matching id.
const anchors = new Set([...html.matchAll(/href="#([\w-]+)"/g)].map((m) => m[1]));
for (const anchor of anchors) {
  if (!html.includes(`id="${anchor}"`)) {
    throw new Error(`Nav anchor target missing: #${anchor}`);
}
}
if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) {
  throw new Error('Homepage must contain exactly one H1');
}
const withoutJsonLd = html.replace(
  /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g,
  '',
);
if (/<script/i.test(withoutJsonLd)) {
  throw new Error('Executable client script emitted');
}

// --- Publish atomically (temp file + rename) ---
mkdirSync(targetDir, { recursive: true });
const tmpHtml = join(targetDir, '.index.html.tmp');
const tmpCss = join(targetDir, '.miso.css.tmp');
writeFileSync(tmpHtml, html);
writeFileSync(tmpCss, readFileSync(srcCss));
renameSync(tmpHtml, join(targetDir, 'index.html'));
renameSync(tmpCss, join(targetDir, 'miso.css'));

// --- Post-publish verification ---
const outHtml = readFileSync(join(targetDir, 'index.html'), 'utf8');
if (!outHtml.includes('content="noindex, nofollow"')) {
  throw new Error('Published robots directive missing');
}
if (!outHtml.includes(robotsTo)) {
  throw new Error('Published robots rewrite missing');
}
const outCss = readFileSync(join(targetDir, 'miso.css'));
if (!outCss.equals(readFileSync(srcCss))) {
  throw new Error('Published CSS does not match build output');
}

console.log('PASS home preview artifact: new/index.html + new/miso.css published');
console.log('     noindex,nofollow · canonical /new/ · stylesheet /new/miso.css · anchors: ' + [...anchors].join(', '));
console.log('     zero executable scripts (JSON-LD only) · one H1 · no scoped /new/* cross-links');
