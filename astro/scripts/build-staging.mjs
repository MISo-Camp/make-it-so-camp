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
  throw new Error('Staging CSS parity check');
}

console.log('PASS staging artifact: 4 pages, scoped links, noindex, zero scripts, CSS parity');
