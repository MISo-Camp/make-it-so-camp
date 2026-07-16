# SEO/AEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. If any step fails twice, STOP and report `BLOCKED seo-impl: <one-line reason>`.

Implementation environment: opencode

**Goal:** Apply the approved SEO/AEO technical package to the four static `/new/` pages and mirror it into the Astro staging sources, then regenerate `new/astro/`. Scope is locked to the four approved items below plus a final verification task.

**Architecture:** Four static HTML pages use `/new/miso.css`. The Astro parallel track (`astro/src/**`, `astro/public/new/miso.css`) mirrors the same content and is republished via `npm run build:staging`. The `build-staging.mjs` script rewrites `/new/` → `/new/astro/`, flips `index, follow` → `noindex, nofollow`, and refuses any `<script` in output — so JSON-LD requires a one-line refinement of that check (Task 5) before the rebuild will pass.

**Tech Stack:** Static HTML, CSS, TypeScript (Astro), Python 3 standard library, headless Google Chrome, `sips`. No build tool for the static pages; `npm run build:staging` for Astro.

## Approved scope (coordinator)

1. **Staging noindex** — flip the four static pages to `noindex, nofollow` + staging comment; canonicals stay as-is (already `/new/...`). Astro pages already noindex via the build script; do NOT change the Astro source robots meta.
2. **New OG image** — create `assets/og-src.html`, render it headless-Chrome to a 1200×630 PNG, convert to JPEG, and **overwrite `og-image.jpg` at repo root** (Picard card gone from the working tree). Add `og:image:width 1200`, `og:image:height 630`, and `og:image:alt "Make It So Camp — you cannot delegate what you cannot articulate"` to the four static pages and to `astro/src/layouts/BaseLayout.astro`. No `og-image-new.jpg` anywhere. Root `index.html` is NOT touched (it already points at `og-image.jpg`, so it inherits the new art; its wrong dimensions and "Captain Picard" alt are a known, accepted inconsistency until the launch cut-over).
3. **JSON-LD** — insert the STAGING-variant blocks from `docs/drafts/jsonld.md` verbatim into the four static pages' `<head>` and mirror into the Astro sources so `npm run build:staging` output carries them. Expected `application/ld+json` script counts: hub 1, Tokyo 2, Adelaide 2, About 3.
4. **Heading semantics** — convert every `<span class="label" id="…">…</span>` inside `.section-label` to `<h2 class="label" id="…">…</h2>` on the four static pages and in the Astro sources; add `.section-label h2.label { margin:0; }` to `new/miso.css` (the existing `.label` rule already supplies font-size/weight/letter-spacing/color, so only the heading margin reset is needed) and refresh `astro/public/new/miso.css` from it.
5. **Rebuild Astro staging output** — patch `astro/scripts/build-staging.mjs` so the client-script guard ignores `application/ld+json`, then `npm run build:staging` so `new/astro/` carries items 1–4.

## Global Constraints

- Work on branch `seo-impl`, from current `master`.
- One commit per task, with the exact commit messages shown below.
- Do not touch: `CNAME`, root `index.html`, `_session.md`, any workspace state file, the Astro source robots meta (`content="index, follow"` in `BaseLayout.astro` — the build flips it).
- Do not create `og-image-new.jpg` anywhere in the repo.
- Do not change canonical URLs on the four static pages (they already point at `/new/...`); the launch-path redirect decision is out of scope.
- JSON-LD copy is copied verbatim from `docs/drafts/jsonld.md` STAGING variants. Do not regenerate, paraphrase, or "fix" the draft.
- Banned language stays absent from any new/edited copy: `free pilot`, prices/cost/`offers`, `supporting partner`, `Supported by`, `laptops closed`, `On paper`.
- Non-ASCII characters are load-bearing: en dashes `–`, em dash `—` (OG alt, schedule line), middot `·`, `é` in `Café`, arrow `↗`.
- Headings conversion is structural only — no copy changes. The `.num` span stays a span; only the `.label` span becomes an `<h2>`.
- If any step fails twice, STOP and report `BLOCKED seo-impl: <one-line reason>`.

## File Structure

- `assets/og-src.html` (new): the 1200×630 Swiss OG card source.
- `og-image.jpg` (root, overwritten): rendered JPEG, 1200×630.
- `new/miso.css`: add `.section-label h2.label { margin:0; }` after the `.section-label` rule.
- `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`: noindex flip + comment, OG width/height/alt, JSON-LD inserts, `<span class="label">` → `<h2 class="label">`.
- `astro/src/layouts/BaseLayout.astro`: add optional `jsonldGraph` prop + render `<script type="application/ld+json" set:html>`, add `og:image:width/height/alt` metas.
- `astro/src/pages/new/index.astro`, `astro/src/pages/new/[camp].astro`, `astro/src/pages/new/about.astro`: pass `jsonldGraph`, convert `.label` spans to headings.
- `astro/public/new/miso.css`: refreshed copy of `new/miso.css` (carries the heading margin reset into the build).
- `astro/scripts/build-staging.mjs`: refine the client-script guard to ignore `application/ld+json`.
- `new/astro/**`: regenerated build output.
- `docs/plans/seo-impl-screenshots/` (new): optional verification screenshots.

## Task 1: Staging noindex on the four static pages

**Files:**
- Modify: `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`

**Produces:**
- Each static page carries `<meta name="robots" content="noindex, nofollow">` with `<!-- staging: flip to index,follow at root launch -->` on the line beside it. Canonicals unchanged.

- [ ] **Step 1: Create the branch from current `master`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
git pull --ff-only origin master
if git show-ref --verify --quiet refs/heads/seo-impl; then echo "BLOCKED seo-impl: branch seo-impl already exists"; exit 1; fi
git switch -c seo-impl >/dev/null
test "$(git branch --show-current)" = "seo-impl" && echo "PASS on branch seo-impl"
```

Expected output ends with:

```text
PASS on branch seo-impl
```

- [ ] **Step 2: Flip robots meta and add the staging comment on all four static pages**

Each page currently has exactly one instance of:

```html
  <meta name="robots" content="index, follow">
```

Replace it with:

```html
  <meta name="robots" content="noindex, nofollow"><!-- staging: flip to index,follow at root launch -->
```

Use this exact script (fails if the old line is absent, duplicated, or already edited on any page):

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
files = ['new/index.html', 'new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html']
old = '  <meta name="robots" content="index, follow">'
new = '  <meta name="robots" content="noindex, nofollow"><!-- staging: flip to index,follow at root launch -->'
for rel in files:
    path = Path(rel)
    text = path.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'BLOCKED seo-impl: expected one robots line in {rel}, found {count}')
    if 'noindex, nofollow' in text:
        raise SystemExit(f'BLOCKED seo-impl: {rel} already noindex')
    path.write_text(text.replace(old, new))
    print(f'PASS robots flipped {rel}')
PY
```

Expected output:

```text
PASS robots flipped new/index.html
PASS robots flipped new/tokyo/index.html
PASS robots flipped new/adelaide/index.html
PASS robots flipped new/about/index.html
```

- [ ] **Step 3: Verify Task 1**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for file in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html; do
  grep -Fq '<meta name="robots" content="noindex, nofollow"><!-- staging: flip to index,follow at root launch -->' "$file" && echo "PASS noindex+comment present $file"
  grep -Fq '<meta name="robots" content="index, follow">' "$file" && { echo "FAIL old index,follow still present $file"; exit 1; } || true
done
# Canonicals unchanged (still point at /new/...)
grep -Fq '<link rel="canonical" href="https://misocamp.com/new/">' new/index.html && echo "PASS hub canonical unchanged"
grep -Fq '<link rel="canonical" href="https://misocamp.com/new/tokyo/">' new/tokyo/index.html && echo "PASS Tokyo canonical unchanged"
grep -Fq '<link rel="canonical" href="https://misocamp.com/new/adelaide/">' new/adelaide/index.html && echo "PASS Adelaide canonical unchanged"
grep -Fq '<link rel="canonical" href="https://misocamp.com/new/about/">' new/about/index.html && echo "PASS About canonical unchanged"
# Astro source robots meta must be untouched (build-staging flips it)
grep -Fq '<meta name="robots" content="index, follow">' astro/src/layouts/BaseLayout.astro && echo "PASS astro source robots still index,follow"
```

Expected output:

```text
PASS noindex+comment present new/index.html
PASS noindex+comment present new/tokyo/index.html
PASS noindex+comment present new/adelaide/index.html
PASS noindex+comment present new/about/index.html
PASS hub canonical unchanged
PASS Tokyo canonical unchanged
PASS Adelaide canonical unchanged
PASS About canonical unchanged
PASS astro source robots still index,follow
```

- [ ] **Step 4: Commit Task 1**

```bash
git add new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html
git commit -m "feat: set staging pages to noindex, nofollow"
```

Expected output includes:

```text
[seo-impl
```

### Task 2: New OG image (overwrite og-image.jpg) + OG width/height/alt

**Files:**
- Create: `assets/og-src.html`
- Modify (overwrite binary): `og-image.jpg`
- Modify: `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`
- Modify: `astro/src/layouts/BaseLayout.astro`

**Produces:**
- A 1200×630 Swiss-design OG card rendered to JPEG; `og-image.jpg` at repo root is overwritten (Picard card gone).
- `og:image:width 1200`, `og:image:height 630`, `og:image:alt "Make It So Camp — you cannot delegate what you cannot articulate"` added to the four static pages and to `BaseLayout.astro`.
- No `og-image-new.jpg` exists anywhere; no page references it.

- [ ] **Step 1: Create `assets/og-src.html` with the 1200×630 Swiss card**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
mkdir -p assets
cat > assets/og-src.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1200, initial-scale=1.0">
  <title>Make It So Camp — OG card</title>
  <style>
    :root {
      --bg:#EAE6DD;
      --ink:#1A1712;
      --muted:#8C877D;
      --line:#D6D0C4;
      --accent:#8F2E20;
      --sans:"Helvetica Neue", Helvetica, Arial, sans-serif;
      --mono:"SF Mono", ui-monospace, "Menlo", "Consolas", monospace;
    }
    * { margin:0; padding:0; box-sizing:border-box; }
    html, body { background:var(--bg); color:var(--ink); font-family:var(--sans); }
    body { width:1200px; height:630px; position:relative; overflow:hidden; -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility; }
    .card { position:absolute; inset:0; padding:72px 88px; display:flex; flex-direction:column; }
    .brand { font-weight:700; font-size:28px; letter-spacing:-0.02em; }
    .accent-rule { width:64px; height:6px; background:var(--accent); margin-top:28px; }
    .statement {
      font-weight:700;
      font-size:88px;
      line-height:1.0;
      letter-spacing:-0.03em;
      max-width:15ch;
      margin-top:auto;
    }
    .footnote {
      margin-top:40px;
      font-family:var(--mono);
      font-size:22px;
      letter-spacing:0.01em;
      color:var(--ink);
      font-weight:500;
    }
    .footnote .dot { color:var(--accent); margin:0 0.4ch; }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand">Make It So Camp</div>
    <div class="accent-rule"></div>
    <div class="statement">You cannot delegate what you cannot articulate.</div>
    <div class="footnote">Two-day AI workshop<span class="dot">—</span>Tokyo<span class="dot">·</span>Adelaide<span class="dot">·</span>2026</div>
  </div>
</body>
</html>
EOF
```

- [ ] **Step 2: Verify the card source is byte-well-formed**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'You cannot delegate what you cannot articulate.' assets/og-src.html && echo 'PASS thesis line present'
grep -Fq 'Make It So Camp' assets/og-src.html && echo 'PASS brand present'
grep -Fq 'Two-day AI workshop' assets/og-src.html && echo 'PASS footnote present'
grep -Fq '#8F2E20' assets/og-src.html && echo 'PASS terracotta accent present'
grep -Fq '#EAE6DD' assets/og-src.html && echo 'PASS bone background present'
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class P(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=True); self.stack=[]
    def handle_starttag(self, t, a):
        if t not in VOID: self.stack.append(t)
    def handle_endtag(self, t):
        if t in VOID: return
        if not self.stack or self.stack[-1]!=t: raise SystemExit(f'FAIL unbalanced </{t}> in og-src')
        self.stack.pop()
p=P(); p.feed(Path('assets/og-src.html').read_text()); p.close()
if p.stack: raise SystemExit(f'FAIL unclosed in og-src: {p.stack}')
print('PASS og-src.html tag-balanced')
PY
```

Expected output:

```text
PASS thesis line present
PASS brand present
PASS footnote present
PASS terracotta accent present
PASS bone background present
PASS og-src.html tag-balanced
```

- [ ] **Step 3: Record the pre-overwrite og-image.jpg, then render and overwrite it**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test -f og-image.jpg || { echo 'BLOCKED seo-impl: og-image.jpg missing from repo root'; exit 1; }
# Capture old dimensions to prove replacement afterwards.
OLD_W=$(sips -g pixelWidth og-image.jpg | awk '/pixelWidth/{print $2}')
OLD_H=$(sips -g pixelHeight og-image.jpg | awk '/pixelHeight/{print $2}')
printf '%s\n' "$OLD_W" > /tmp/seo-og-old-w.txt
printf '%s\n' "$OLD_H" > /tmp/seo-og-old-h.txt
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then echo 'BLOCKED seo-impl: Chrome unavailable for OG render'; exit 1; fi
if lsof -ti:8801 >/dev/null 2>&1; then echo 'BLOCKED seo-impl: port 8801 occupied'; exit 1; fi
# Render the card to a 1200x630 PNG via headless Chrome.
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot=/tmp/seo-og-card.png \
  "file://$(pwd)/assets/og-src.html" >/dev/null 2>&1
test -s /tmp/seo-og-card.png || { echo 'BLOCKED seo-impl: Chrome produced no PNG'; exit 1; }
# Convert PNG to JPEG and overwrite og-image.jpg at repo root.
sips -s format jpeg /tmp/seo-og-card.png --out og-image.jpg >/dev/null 2>&1
test -s og-image.jpg || { echo 'BLOCKED seo-impl: og-image.jpg not written'; exit 1; }
echo 'PASS og-image.jpg overwritten'
```

Expected output ends with:

```text
PASS og-image.jpg overwritten
```

- [ ] **Step 4: Verify og-image.jpg is 1200×630, replaced, and no og-image-new.jpg exists**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
NEW_W=$(sips -g pixelWidth og-image.jpg | awk '/pixelWidth/{print $2}')
NEW_H=$(sips -g pixelHeight og-image.jpg | awk '/pixelHeight/{print $2}')
test "$NEW_W" = "1200" -a "$NEW_H" = "630" && echo "PASS og-image.jpg is 1200x630 (got ${NEW_W}x${NEW_H})" || { echo "FAIL og-image.jpg wrong size: ${NEW_W}x${NEW_H}"; exit 1; }
OLD_W=$(cat /tmp/seo-og-old-w.txt); OLD_H=$(cat /tmp/seo-og-old-h.txt)
OLD_SUM=$(printf '%sx%s' "$OLD_W" "$OLD_H"); NEW_SUM=$(printf '%sx%s' "$NEW_W" "$NEW_H")
test "$OLD_SUM" != "$NEW_SUM" && echo "PASS og-image.jpg replaced (was $OLD_SUM, now $NEW_SUM)" || { echo "FAIL og-image.jpg not replaced"; exit 1; }
# Picard dimensions (615x434 from the audit) must be gone.
test "$OLD_W" = "615" -a "$OLD_H" = "434" && echo "PASS Picard-era 615x434 dimensions superseded" || echo "NOTE prior og-image.jpg was $OLD_W x $OLD_H (not the 615x434 Picard card); still replaced"
git diff --quiet -- og-image.jpg && { echo 'FAIL og-image.jpg unchanged in working tree'; exit 1; } || echo 'PASS og-image.jpg modified in working tree'
# Prove replacement against the committed version: expect og-image.jpg listed as a changed (binary) file.
git diff --stat master -- og-image.jpg | grep -q 'og-image.jpg' && echo 'PASS og-image.jpg listed as changed vs master' || { echo 'FAIL og-image.jpg not listed in git diff --stat master'; exit 1; }
if find . -name 'og-image-new.jpg' -not -path './.git/*' | grep -q .; then echo 'FAIL og-image-new.jpg exists'; exit 1; else echo 'PASS no og-image-new.jpg exists'; fi
```

Expected output ends with:

```text
PASS og-image.jpg is 1200x630 (got 1200x630)
PASS og-image.jpg replaced (was 615x434, now 1200x630)
PASS Picard-era 615x434 dimensions superseded
PASS og-image.jpg modified in working tree
PASS no og-image-new.jpg exists
```

(The "NOTE prior…" branch is acceptable if the committed image already differed; the two PASS lines that matter are the size and the replacement.)

- [ ] **Step 5: Add OG width/height/alt to the four static pages**

Each static page currently has:

```html
  <meta property="og:image" content="https://misocamp.com/og-image.jpg">
```

Immediately after that line, insert:

```html
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Make It So Camp — you cannot delegate what you cannot articulate">
```

Use this exact script:

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
anchor = '  <meta property="og:image" content="https://misocamp.com/og-image.jpg">'
insert = (
    '  <meta property="og:image" content="https://misocamp.com/og-image.jpg">\n'
    '  <meta property="og:image:width" content="1200">\n'
    '  <meta property="og:image:height" content="630">\n'
    '  <meta property="og:image:alt" content="Make It So Camp — you cannot delegate what you cannot articulate">'
)
for rel in ['new/index.html', 'new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html']:
    path = Path(rel)
    text = path.read_text()
    count = text.count(anchor)
    if count != 1:
        raise SystemExit(f'BLOCKED seo-impl: expected one og:image anchor in {rel}, found {count}')
    if 'og:image:width' in text:
        raise SystemExit(f'BLOCKED seo-impl: {rel} already has og:image:width')
    path.write_text(text.replace(anchor, insert))
    print(f'PASS OG width/height/alt added {rel}')
PY
```

Expected output:

```text
PASS OG width/height/alt added new/index.html
PASS OG width/height/alt added new/tokyo/index.html
PASS OG width/height/alt added new/adelaide/index.html
PASS OG width/height/alt added new/about/index.html
```

- [ ] **Step 6: Add OG width/height/alt to `astro/src/layouts/BaseLayout.astro`**

The current OG block in `BaseLayout.astro` frontmatter + head is:

```astro
const ogImage = `${site}/og-image.jpg`;
---
```
and

```astro
  <meta property="og:image" content={ogImage}>
```

Replace the head line with four metas (the `ogImage` const is unchanged — same URL):

```astro
  <meta property="og:image" content={ogImage}>
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Make It So Camp — you cannot delegate what you cannot articulate">
```

Use this exact script:

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/layouts/BaseLayout.astro')
text = path.read_text()
old = '  <meta property="og:image" content={ogImage}>'
count = text.count(old)
if count != 1:
    raise SystemExit(f'BLOCKED seo-impl: expected one BaseLayout og:image line, found {count}')
if 'og:image:width' in text:
    raise SystemExit('BLOCKED seo-impl: BaseLayout already has og:image:width')
new = (
    '  <meta property="og:image" content={ogImage}>\n'
    '  <meta property="og:image:width" content="1200">\n'
    '  <meta property="og:image:height" content="630">\n'
    '  <meta property="og:image:alt" content="Make It So Camp — you cannot delegate what you cannot articulate">'
)
path.write_text(text.replace(old, new))
print('PASS BaseLayout OG width/height/alt added')
PY
```

Expected output:

```text
PASS BaseLayout OG width/height/alt added
```

- [ ] **Step 7: Verify Task 2 OG metas across static and astro sources**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for file in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html; do
  grep -Fq '<meta property="og:image:width" content="1200">' "$file" && echo "PASS og:image:width $file"
  grep -Fq '<meta property="og:image:height" content="630">' "$file" && echo "PASS og:image:height $file"
  grep -Fq '<meta property="og:image:alt" content="Make It So Camp — you cannot delegate what you cannot articulate">' "$file" && echo "PASS og:image:alt $file"
done
grep -Fq '<meta property="og:image:width" content="1200">' astro/src/layouts/BaseLayout.astro && echo 'PASS astro og:image:width'
grep -Fq '<meta property="og:image:height" content="630">' astro/src/layouts/BaseLayout.astro && echo 'PASS astro og:image:height'
grep -Fq '<meta property="og:image:alt" content="Make It So Camp — you cannot delegate what you cannot articulate">' astro/src/layouts/BaseLayout.astro && echo 'PASS astro og:image:alt'
# The URL stays og-image.jpg everywhere (no og-image-new reference anywhere).
if grep -RIn 'og-image-new' --exclude-dir=.git . | grep -q .; then echo 'FAIL og-image-new referenced'; exit 1; else echo 'PASS no og-image-new references anywhere'; fi
# Root index.html untouched.
git diff --quiet -- index.html && echo 'PASS root index.html untouched' || echo 'NOTE root index.html modified (acceptable only if unrelated; inspect)'
```

Expected output includes:

```text
PASS og:image:width new/index.html
PASS og:image:height new/index.html
PASS og:image:alt new/index.html
PASS og:image:width new/tokyo/index.html
PASS og:image:height new/tokyo/index.html
PASS og:image:alt new/tokyo/index.html
PASS og:image:width new/adelaide/index.html
PASS og:image:height new/adelaide/index.html
PASS og:image:alt new/adelaide/index.html
PASS og:image:width new/about/index.html
PASS og:image:height new/about/index.html
PASS og:image:alt new/about/index.html
PASS astro og:image:width
PASS astro og:image:height
PASS astro og:image:alt
PASS no og-image-new references anywhere
PASS root index.html untouched
```

- [ ] **Step 8: Commit Task 2**

```bash
git add assets/og-src.html og-image.jpg new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html astro/src/layouts/BaseLayout.astro
git commit -m "feat: new 1200x630 Swiss OG image and og:image width/height/alt"
```

Expected output includes:

```text
[seo-impl
```

### Task 3: JSON-LD on static pages and Astro sources

**Files:**
- Modify: `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`
- Modify: `astro/src/layouts/BaseLayout.astro` (adds the `jsonldGraph` prop + render)
- Modify: `astro/src/pages/new/index.astro`, `astro/src/pages/new/[camp].astro`, `astro/src/pages/new/about.astro` (pass `jsonldGraph`)

**Produces:**
- STAGING-variant JSON-LD blocks (copied verbatim from `docs/drafts/jsonld.md`) inserted into each static page `<head>` immediately before `</head>`.
- The same objects mirrored in the Astro sources and rendered via `BaseLayout`.
- Expected `application/ld+json` counts: hub 1, Tokyo 2, Adelaide 2, About 3 (static and astro output).

**Block placement.** Each static page gets its block(s) inserted on the line immediately before `  </head>`. The Astro page files pass an array of objects via `jsonldGraph={...}`; `BaseLayout` renders one `<script type="application/ld+json" set:html={JSON.stringify(obj)} />` per object, so the array length equals the script count per page.

- [ ] **Step 1: Insert the hub @graph block into `new/index.html`**

One script (the `@graph` containing Organization + WebSite + two Persons + two Events), copied verbatim from the STAGING variant in `docs/drafts/jsonld.md`.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
import json
block = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://misocamp.com/new/#org",
      "name": "Make It So Camp",
      "url": "https://misocamp.com/new/",
      "email": "hello@misocamp.com",
      "description": "Make It So Camp is a selective two-day AI workshop, by invitation. Thesis: You cannot delegate what you cannot articulate.",
      "founder": [
        { "@id": "https://misocamp.com/new/#igor" },
        { "@id": "https://misocamp.com/new/#noah" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://misocamp.com/new/#website",
      "name": "Make It So Camp",
      "url": "https://misocamp.com/new/",
      "inLanguage": "en",
      "publisher": { "@id": "https://misocamp.com/new/#org" }
    },
    {
      "@type": "Person",
      "@id": "https://misocamp.com/new/#igor",
      "name": "Igor Schwarzmann",
      "sameAs": ["https://igorschwarzmann.com"]
    },
    {
      "@type": "Person",
      "@id": "https://misocamp.com/new/#noah",
      "name": "Noah Raford",
      "jobTitle": "Managing Partner",
      "affiliation": { "@type": "Organization", "name": "EMIR" },
      "alumniOf": [{ "@type": "EducationalOrganization", "name": "Massachusetts Institute of Technology" }],
      "hasCredential": "PhD, Massachusetts Institute of Technology",
      "sameAs": ["https://noahraford.com"]
    },
    {
      "@type": "Event",
      "@id": "https://misocamp.com/new/#tokyo-event",
      "name": "Make It So Camp Tokyo",
      "description": "Selective two-day AI workshop, by invitation. In collaboration with Chiba Institute of Technology.",
      "startDate": "2026-08-24",
      "endDate": "2026-08-25",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "organizer": { "@id": "https://misocamp.com/new/#org" },
      "contributor": [{ "@type": "Organization", "name": "Chiba Institute of Technology" }],
      "location": {
        "@type": "Place",
        "name": "Crypto Café Tokyo",
        "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" }
      }
    },
    {
      "@type": "Event",
      "@id": "https://misocamp.com/new/#adelaide-event",
      "name": "Make It So Camp Adelaide",
      "description": "Selective two-day AI workshop, by invitation. In collaboration with Flinders University New Venture Institute and SA Futures Agency.",
      "startDate": "2026-09-17",
      "endDate": "2026-09-18",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "organizer": { "@id": "https://misocamp.com/new/#org" },
      "contributor": [
        { "@type": "Organization", "name": "Flinders University New Venture Institute" },
        { "@type": "Organization", "name": "SA Futures Agency" }
      ],
      "location": {
        "@type": "Place",
        "name": "Venue to be announced",
        "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressCountry": "AU" }
      }
    }
  ]
}
script = '  <script type="application/ld+json">\n' + json.dumps(block, indent=2, ensure_ascii=False) + '\n  </script>\n'
path = Path('new/index.html')
text = path.read_text()
if 'application/ld+json' in text:
    raise SystemExit('BLOCKED seo-impl: hub already has JSON-LD')
if text.count('  </head>') != 1:
    raise SystemExit('BLOCKED seo-impl: hub </head> not unique')
path.write_text(text.replace('  </head>', script + '  </head>'))
print('PASS hub JSON-LD inserted')
PY
```

Expected output:

```text
PASS hub JSON-LD inserted
```

- [ ] **Step 2: Insert Event + BreadcrumbList into `new/tokyo/index.html`**

Two scripts (STAGING variants verbatim from `docs/drafts/jsonld.md`). Insert both before `</head>`.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
import json
event = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Make It So Camp Tokyo",
  "description": "Selective two-day AI workshop, by invitation. In collaboration with Chiba Institute of Technology.",
  "startDate": "2026-08-24",
  "endDate": "2026-08-25",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": "https://misocamp.com/new/tokyo/",
  "organizer": {
    "@type": "Organization",
    "name": "Make It So Camp",
    "url": "https://misocamp.com/new/",
    "email": "hello@misocamp.com"
  },
  "contributor": [{ "@type": "Organization", "name": "Chiba Institute of Technology" }],
  "location": {
    "@type": "Place",
    "name": "Crypto Café Tokyo",
    "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" }
  }
}
breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/new/" },
    { "@type": "ListItem", "position": 2, "name": "Tokyo", "item": "https://misocamp.com/new/tokyo/" }
  ]
}
def script_block(obj):
    return '  <script type="application/ld+json">\n' + json.dumps(obj, indent=2, ensure_ascii=False) + '\n  </script>\n'
path = Path('new/tokyo/index.html')
text = path.read_text()
if 'application/ld+json' in text:
    raise SystemExit('BLOCKED seo-impl: Tokyo already has JSON-LD')
if text.count('  </head>') != 1:
    raise SystemExit('BLOCKED seo-impl: Tokyo </head> not unique')
insert = script_block(event) + script_block(breadcrumb)
path.write_text(text.replace('  </head>', insert + '  </head>'))
print('PASS Tokyo JSON-LD inserted (Event + BreadcrumbList)')
PY
```

Expected output:

```text
PASS Tokyo JSON-LD inserted (Event + BreadcrumbList)
```

- [ ] **Step 3: Insert Event + BreadcrumbList into `new/adelaide/index.html`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
import json
event = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Make It So Camp Adelaide",
  "description": "Selective two-day AI workshop, by invitation. In collaboration with Flinders University New Venture Institute and SA Futures Agency.",
  "startDate": "2026-09-17",
  "endDate": "2026-09-18",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": "https://misocamp.com/new/adelaide/",
  "organizer": {
    "@type": "Organization",
    "name": "Make It So Camp",
    "url": "https://misocamp.com/new/",
    "email": "hello@misocamp.com"
  },
  "contributor": [
    { "@type": "Organization", "name": "Flinders University New Venture Institute" },
    { "@type": "Organization", "name": "SA Futures Agency" }
  ],
  "location": {
    "@type": "Place",
    "name": "Venue to be announced",
    "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressCountry": "AU" }
  }
}
breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/new/" },
    { "@type": "ListItem", "position": 2, "name": "Adelaide", "item": "https://misocamp.com/new/adelaide/" }
  ]
}
def script_block(obj):
    return '  <script type="application/ld+json">\n' + json.dumps(obj, indent=2, ensure_ascii=False) + '\n  </script>\n'
path = Path('new/adelaide/index.html')
text = path.read_text()
if 'application/ld+json' in text:
    raise SystemExit('BLOCKED seo-impl: Adelaide already has JSON-LD')
if text.count('  </head>') != 1:
    raise SystemExit('BLOCKED seo-impl: Adelaide </head> not unique')
insert = script_block(event) + script_block(breadcrumb)
path.write_text(text.replace('  </head>', insert + '  </head>'))
print('PASS Adelaide JSON-LD inserted (Event + BreadcrumbList)')
PY
```

Expected output:

```text
PASS Adelaide JSON-LD inserted (Event + BreadcrumbList)
```

- [ ] **Step 4: Insert two Persons + BreadcrumbList into `new/about/index.html`**

Three scripts (STAGING variants verbatim). The Person blocks are identical for staging and launch per the draft; only the BreadcrumbList uses `/new/...` items.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
import json
igor = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Igor Schwarzmann",
  "sameAs": ["https://igorschwarzmann.com"]
}
noah = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Noah Raford",
  "jobTitle": "Managing Partner",
  "affiliation": { "@type": "Organization", "name": "EMIR" },
  "alumniOf": [{ "@type": "EducationalOrganization", "name": "Massachusetts Institute of Technology" }],
  "hasCredential": "PhD, Massachusetts Institute of Technology",
  "sameAs": ["https://noahraford.com"]
}
breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/new/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://misocamp.com/new/about/" }
  ]
}
def script_block(obj):
    return '  <script type="application/ld+json">\n' + json.dumps(obj, indent=2, ensure_ascii=False) + '\n  </script>\n'
path = Path('new/about/index.html')
text = path.read_text()
if 'application/ld+json' in text:
    raise SystemExit('BLOCKED seo-impl: About already has JSON-LD')
if text.count('  </head>') != 1:
    raise SystemExit('BLOCKED seo-impl: About </head> not unique')
insert = script_block(igor) + script_block(noah) + script_block(breadcrumb)
path.write_text(text.replace('  </head>', insert + '  </head>'))
print('PASS About JSON-LD inserted (Person x2 + BreadcrumbList)')
PY
```

Expected output:

```text
PASS About JSON-LD inserted (Person x2 + BreadcrumbList)
```

- [ ] **Step 5: Add `jsonldGraph` rendering to `BaseLayout.astro`**

Add an optional `jsonldGraph?: Record<string, unknown>[]` prop and render one script per object, placed immediately after the existing `<link rel="stylesheet" href="/new/miso.css">` line in the head (the `<slot />`/page body stays untouched).

The current head ends with:

```astro
  <link rel="stylesheet" href="/new/miso.css">
</head>
```

Replace with:

```astro
  <link rel="stylesheet" href="/new/miso.css">
  {jsonldGraph && jsonldGraph.map((obj) => (
    <script type="application/ld+json" set:html={JSON.stringify(obj)} />
  ))}
</head>
```

And add the prop to the `Props` interface + destructure. Use this exact script:

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/layouts/BaseLayout.astro')
text = path.read_text()
# 1. Add the prop to the Props interface, after the twitterDescription prop.
old_iface = '  twitterTitle?: string;\n  twitterDescription?: string;\n}'
new_iface = '  twitterTitle?: string;\n  twitterDescription?: string;\n  /** Optional JSON-LD objects; one application/ld+json script is rendered per object. */\n  jsonldGraph?: Record<string, unknown>[];\n}'
if text.count(old_iface) != 1:
    raise SystemExit('BLOCKED seo-impl: BaseLayout Props block not found')
text = text.replace(old_iface, new_iface)
# 2. Destructure the prop (after twitterDescription = ogDescription,).
old_destructure = "  twitterDescription = ogDescription,\n} = Astro.props;"
new_destructure = "  twitterDescription = ogDescription,\n  jsonldGraph,\n} = Astro.props;"
if text.count(old_destructure) != 1:
    raise SystemExit('BLOCKED seo-impl: BaseLayout destructure block not found')
text = text.replace(old_destructure, new_destructure)
# 3. Render the scripts after the stylesheet link.
old_head = '  <link rel="stylesheet" href="/new/miso.css">\n</head>'
new_head = '  <link rel="stylesheet" href="/new/miso.css">\n  {jsonldGraph && jsonldGraph.map((obj) => (\n    <script type="application/ld+json" set:html={JSON.stringify(obj)} />\n  ))}\n</head>'
if text.count(old_head) != 1:
    raise SystemExit('BLOCKED seo-impl: BaseLayout head stylesheet line not found')
if 'application/ld+json' in text:
    raise SystemExit('BLOCKED seo-impl: BaseLayout already has jsonld rendering')
text = text.replace(old_head, new_head)
path.write_text(text)
print('PASS BaseLayout jsonldGraph rendering added')
PY
```

Expected output:

```text
PASS BaseLayout jsonldGraph rendering added
```

- [ ] **Step 6: Pass `jsonldGraph` from `astro/src/pages/new/index.astro`**

Insert a JSON-LD array (the hub @graph object, same as the static hub block) into the page frontmatter and pass it to `BaseLayout`. Add the array right after the existing `description` const, before the closing `---`, and add the `jsonldGraph={jsonldGraph}` attribute to `<BaseLayout>`.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/pages/new/index.astro')
text = path.read_text()
if 'jsonldGraph' in text:
    raise SystemExit('BLOCKED seo-impl: index.astro already references jsonldGraph')
# Insert the array after the description const.
anchor = "const description = 'Make It So Camp is a selective two-day AI workshop for experienced practitioners. Day 1 you make your working method explicit; Day 2 you build with others and demo. Tokyo and Adelaide, 2026. By invitation.';"
if text.count(anchor) != 1:
    raise SystemExit('BLOCKED seo-impl: index.astro description anchor not found')
array = anchor + '''
const jsonldGraph = [
  {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://misocamp.com/new/#org", "name": "Make It So Camp", "url": "https://misocamp.com/new/", "email": "hello@misocamp.com", "description": "Make It So Camp is a selective two-day AI workshop, by invitation. Thesis: You cannot delegate what you cannot articulate.", "founder": [ { "@id": "https://misocamp.com/new/#igor" }, { "@id": "https://misocamp.com/new/#noah" } ] },
      { "@type": "WebSite", "@id": "https://misocamp.com/new/#website", "name": "Make It So Camp", "url": "https://misocamp.com/new/", "inLanguage": "en", "publisher": { "@id": "https://misocamp.com/new/#org" } },
      { "@type": "Person", "@id": "https://misocamp.com/new/#igor", "name": "Igor Schwarzmann", "sameAs": ["https://igorschwarzmann.com"] },
      { "@type": "Person", "@id": "https://misocamp.com/new/#noah", "name": "Noah Raford", "jobTitle": "Managing Partner", "affiliation": { "@type": "Organization", "name": "EMIR" }, "alumniOf": [{ "@type": "EducationalOrganization", "name": "Massachusetts Institute of Technology" }], "hasCredential": "PhD, Massachusetts Institute of Technology", "sameAs": ["https://noahraford.com"] },
      { "@type": "Event", "@id": "https://misocamp.com/new/#tokyo-event", "name": "Make It So Camp Tokyo", "description": "Selective two-day AI workshop, by invitation. In collaboration with Chiba Institute of Technology.", "startDate": "2026-08-24", "endDate": "2026-08-25", "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode", "eventStatus": "https://schema.org/EventScheduled", "organizer": { "@id": "https://misocamp.com/new/#org" }, "contributor": [{ "@type": "Organization", "name": "Chiba Institute of Technology" }], "location": { "@type": "Place", "name": "Crypto Café Tokyo", "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" } } },
      { "@type": "Event", "@id": "https://misocamp.com/new/#adelaide-event", "name": "Make It So Camp Adelaide", "description": "Selective two-day AI workshop, by invitation. In collaboration with Flinders University New Venture Institute and SA Futures Agency.", "startDate": "2026-09-17", "endDate": "2026-09-18", "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode", "eventStatus": "https://schema.org/EventScheduled", "organizer": { "@id": "https://misocamp.com/new/#org" }, "contributor": [ { "@type": "Organization", "name": "Flinders University New Venture Institute" }, { "@type": "Organization", "name": "SA Futures Agency" } ], "location": { "@type": "Place", "name": "Venue to be announced", "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressCountry": "AU" } } }
    ]
  }
];'''
text = text.replace(anchor, array)
# Pass the prop on <BaseLayout ...>.
old_bl = '<BaseLayout\n  title={title}\n  description={description}\n  canonicalPath="/new/"\n  ogTitle={title}\n  ogDescription="A selective two-day AI workshop for experienced practitioners. Tokyo and Adelaide, 2026. By invitation."\n>'
if text.count(old_bl) != 1:
    raise SystemExit('BLOCKED seo-impl: index.astro BaseLayout opening tag not found')
new_bl = old_bl.replace('>', '\n  jsonldGraph={jsonldGraph}\n>')
text = text.replace(old_bl, new_bl)
path.write_text(text)
print('PASS index.astro jsonldGraph passed')
PY
```

Expected output:

```text
PASS index.astro jsonldGraph passed
```

- [ ] **Step 7: Pass `jsonldGraph` from `astro/src/pages/new/[camp].astro` (Event + BreadcrumbList per camp)**

Build the Event and BreadcrumbList objects from `camp.slug` so both Tokyo and Adelaide resolve correctly via the shared route. Add the array after the existing `requestHref` const, and pass `jsonldGraph={jsonldGraph}` to `<BaseLayout>`.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/pages/new/[camp].astro')
text = path.read_text()
if 'jsonldGraph' in text:
    raise SystemExit('BLOCKED seo-impl: [camp].astro already references jsonldGraph')
anchor = "const requestHref = `mailto:hello@misocamp.com?subject=${camp.subject}`;"
if text.count(anchor) != 1:
    raise SystemExit('BLOCKED seo-impl: [camp].astro requestHref anchor not found')
block = anchor + '''
const campName = camp.slug === 'tokyo' ? 'Make It So Camp Tokyo' : 'Make It So Camp Adelaide';
const campDescription = camp.slug === 'tokyo'
  ? 'Selective two-day AI workshop, by invitation. In collaboration with Chiba Institute of Technology.'
  : 'Selective two-day AI workshop, by invitation. In collaboration with Flinders University New Venture Institute and SA Futures Agency.';
const campPlace = camp.slug === 'tokyo'
  ? { "@type": "Place", "name": "Crypto Café Tokyo", "address": { "@type": "PostalAddress", "addressLocality": "Tokyo", "addressCountry": "JP" } }
  : { "@type": "Place", "name": "Venue to be announced", "address": { "@type": "PostalAddress", "addressLocality": "Adelaide", "addressCountry": "AU" } };
const campContributor = camp.slug === 'tokyo'
  ? [{ "@type": "Organization", "name": "Chiba Institute of Technology" }]
  : [ { "@type": "Organization", "name": "Flinders University New Venture Institute" }, { "@type": "Organization", "name": "SA Futures Agency" } ];
const eventObj = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": campName,
  "description": campDescription,
  "startDate": camp.slug === 'tokyo' ? "2026-08-24" : "2026-09-17",
  "endDate": camp.slug === 'tokyo' ? "2026-08-25" : "2026-09-18",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "url": `https://misocamp.com/new/${camp.slug}/`,
  "organizer": { "@type": "Organization", "name": "Make It So Camp", "url": "https://misocamp.com/new/", "email": "hello@misocamp.com" },
  "contributor": campContributor,
  "location": campPlace
};
const breadcrumbObj = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/new/" },
    { "@type": "ListItem", "position": 2, "name": camp.slug === 'tokyo' ? "Tokyo" : "Adelaide", "item": `https://misocamp.com/new/${camp.slug}/` }
  ]
};
const jsonldGraph = [eventObj, breadcrumbObj];'''
text = text.replace(anchor, block)
old_bl = '''<BaseLayout
  title={camp.title}
  description={camp.description}
  canonicalPath={`/new/${camp.slug}/`}
  ogDescription={camp.ogDescription}
  twitterDescription={camp.ogDescription}
>'''
if text.count(old_bl) != 1:
    raise SystemExit('BLOCKED seo-impl: [camp].astro BaseLayout opening tag not found')
new_bl = old_bl.replace('>', '\n  jsonldGraph={jsonldGraph}\n>')
text = text.replace(old_bl, new_bl)
path.write_text(text)
print('PASS [camp].astro jsonldGraph passed (Event + BreadcrumbList per camp)')
PY
```

Expected output:

```text
PASS [camp].astro jsonldGraph passed (Event + BreadcrumbList per camp)
```

- [ ] **Step 8: Pass `jsonldGraph` from `astro/src/pages/new/about.astro` (Persons + BreadcrumbList)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/pages/new/about.astro')
text = path.read_text()
if 'jsonldGraph' in text:
    raise SystemExit('BLOCKED seo-impl: about.astro already references jsonldGraph')
anchor = "const description = 'Make It So Camp was created by Igor Schwarzmann and Noah Raford. A selective two-day AI workshop. Tokyo and Adelaide, 2026.';"
if text.count(anchor) != 1:
    raise SystemExit('BLOCKED seo-impl: about.astro description anchor not found')
block = anchor + '''
const igorObj = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Igor Schwarzmann",
  "sameAs": ["https://igorschwarzmann.com"]
};
const noahObj = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Noah Raford",
  "jobTitle": "Managing Partner",
  "affiliation": { "@type": "Organization", "name": "EMIR" },
  "alumniOf": [{ "@type": "EducationalOrganization", "name": "Massachusetts Institute of Technology" }],
  "hasCredential": "PhD, Massachusetts Institute of Technology",
  "sameAs": ["https://noahraford.com"]
};
const breadcrumbObj = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/new/" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://misocamp.com/new/about/" }
  ]
};
const jsonldGraph = [igorObj, noahObj, breadcrumbObj];'''
text = text.replace(anchor, block)
old_bl = '''<BaseLayout
  title={title}
  description={description}
  canonicalPath="/new/about/"
>'''
if text.count(old_bl) != 1:
    raise SystemExit('BLOCKED seo-impl: about.astro BaseLayout opening tag not found')
new_bl = old_bl.replace('>', '\n  jsonldGraph={jsonldGraph}\n>')
text = text.replace(old_bl, new_bl)
path.write_text(text)
print('PASS about.astro jsonldGraph passed (Person x2 + BreadcrumbList)')
PY
```

Expected output:

```text
PASS about.astro jsonldGraph passed (Person x2 + BreadcrumbList)
```

- [ ] **Step 9: Verify Task 3 counts and JSON validity on static pages**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for pair in "new/index.html:1" "new/tokyo/index.html:2" "new/adelaide/index.html:2" "new/about/index.html:3"; do
  file="${pair%%:*}"; want="${pair##*:}"
  got=$(grep -c 'application/ld+json' "$file")
  test "$got" = "$want" && echo "PASS $file has $want ld+json scripts" || { echo "FAIL $file has $got, want $want"; exit 1; }
done
python3 - <<'PY'
import json, re
from pathlib import Path
for rel in ['new/index.html','new/tokyo/index.html','new/adelaide/index.html','new/about/index.html']:
    text = Path(rel).read_text()
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S)
    for i, b in enumerate(blocks):
        try:
            json.loads(b)
        except Exception as e:
            raise SystemExit(f'FAIL invalid JSON-LD in {rel} block {i}: {e}')
    print(f'PASS {rel} JSON-LD parses ({len(blocks)} block(s))')
PY
```

Expected output:

```text
PASS new/index.html has 1 ld+json scripts
PASS new/tokyo/index.html has 2 ld+json scripts
PASS new/adelaide/index.html has 2 ld+json scripts
PASS new/about/index.html has 3 ld+json scripts
PASS new/index.html JSON-LD parses (1 block(s))
PASS new/tokyo/index.html JSON-LD parses (2 block(s))
PASS new/adelaide/index.html JSON-LD parses (2 block(s))
PASS new/about/index.html JSON-LD parses (3 block(s))
```

- [ ] **Step 10: Verify Task 3 astro sources carry the props and `npm run check` is clean**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'jsonldGraph={jsonldGraph}' astro/src/pages/new/index.astro && echo 'PASS index.astro passes jsonldGraph'
grep -Fq 'jsonldGraph={jsonldGraph}' astro/src/pages/new/[camp].astro && echo 'PASS [camp].astro passes jsonldGraph'
grep -Fq 'jsonldGraph={jsonldGraph}' astro/src/pages/new/about.astro && echo 'PASS about.astro passes jsonldGraph'
grep -Fq 'type="application/ld+json" set:html={JSON.stringify(obj)}' astro/src/layouts/BaseLayout.astro && echo 'PASS BaseLayout renders ld+json scripts'
cd astro && npm run check >/tmp/seo-impl-astro-check.log 2>&1 && echo 'PASS astro check clean' || { echo 'FAIL astro check'; tail -40 /tmp/seo-impl-astro-check.log; exit 1; }
```

Expected output:

```text
PASS index.astro passes jsonldGraph
PASS [camp].astro passes jsonldGraph
PASS about.astro passes jsonldGraph
PASS BaseLayout renders ld+json scripts
PASS astro check clean
```

- [ ] **Step 11: Commit Task 3**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html astro/src/layouts/BaseLayout.astro astro/src/pages/new/index.astro astro/src/pages/new/[camp].astro astro/src/pages/new/about.astro
git commit -m "feat: add JSON-LD structured data to staging pages and Astro sources"
```

Expected output includes:

```text
[seo-impl
```

### Task 4: Heading semantics — `.label` span → h2

**Files:**
- Modify: `new/miso.css`
- Modify: `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`
- Modify: `astro/src/pages/new/index.astro`, `astro/src/pages/new/[camp].astro`, `astro/src/pages/new/about.astro`
- Modify (copy refresh): `astro/public/new/miso.css`

**Produces:**
- Every `<span class="label" id="…">…</span>` inside `.section-label` becomes `<h2 class="label" id="…">…</h2>`. The `.num` span is unchanged.
- `new/miso.css` gains `.section-label h2.label { margin:0; }` after the `.section-label` rule (the existing `.label` rule already sets font-size/weight/letter-spacing/color, so only the margin reset is needed).
- `astro/public/new/miso.css` is refreshed from `new/miso.css` so the build carries the same rule.

- [ ] **Step 1: Add the heading margin reset to `new/miso.css`**

The current block is:

```css
.section-label { display:flex; gap:1rem; align-items:baseline; margin-bottom:clamp(1.5rem, 3vw, 2.75rem); }
```

Replace it with:

```css
.section-label { display:flex; gap:1rem; align-items:baseline; margin-bottom:clamp(1.5rem, 3vw, 2.75rem); }
.section-label h2.label { margin:0; }
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('new/miso.css')
text = path.read_text()
old = '.section-label { display:flex; gap:1rem; align-items:baseline; margin-bottom:clamp(1.5rem, 3vw, 2.75rem); }'
new = old + '\n.section-label h2.label { margin:0; }'
count = text.count(old)
if count != 1:
    raise SystemExit(f'BLOCKED seo-impl: expected one .section-label rule, found {count}')
if '.section-label h2.label' in text:
    raise SystemExit('BLOCKED seo-impl: .section-label h2.label already present')
path.write_text(text.replace(old, new))
print('PASS .section-label h2.label margin reset added')
PY
```

Expected output:

```text
PASS .section-label h2.label margin reset added
```

- [ ] **Step 2: Convert `.label` spans to `h2` on the four static pages**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import re
from pathlib import Path
pattern = re.compile(r'<span class="label" id="([^"]+)">([^<]*)</span>')
for rel in ['new/index.html', 'new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html']:
    path = Path(rel)
    text = path.read_text()
    if '<h2 class="label"' in text:
        raise SystemExit(f'BLOCKED seo-impl: {rel} already has h2.label')
    new_text, n = pattern.subn(r'<h2 class="label" id="\1">\2</h2>', text)
    if n == 0:
        raise SystemExit(f'BLOCKED seo-impl: no .label spans found in {rel}')
    path.write_text(new_text)
    print(f'PASS {rel}: converted {n} .label span(s) to h2')
PY
```

Expected output:

```text
PASS new/index.html: converted 5 .label span(s) to h2
PASS new/tokyo/index.html: converted 5 .label span(s) to h2
PASS new/adelaide/index.html: converted 5 .label span(s) to h2
PASS new/about/index.html: converted 3 .label span(s) to h2
```

- [ ] **Step 3: Convert `.label` spans to `h2` in the Astro sources**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import re
from pathlib import Path
pattern = re.compile(r'<span class="label" id="([^"]+)">([^<]*)</span>')
for rel in ['astro/src/pages/new/index.astro', 'astro/src/pages/new/[camp].astro', 'astro/src/pages/new/about.astro']:
    path = Path(rel)
    text = path.read_text()
    if '<h2 class="label"' in text:
        raise SystemExit(f'BLOCKED seo-impl: {rel} already has h2.label')
    new_text, n = pattern.subn(r'<h2 class="label" id="\1">\2</h2>', text)
    if n == 0:
        raise SystemExit(f'BLOCKED seo-impl: no .label spans found in {rel}')
    path.write_text(new_text)
    print(f'PASS {rel}: converted {n} .label span(s) to h2')
PY
```

Expected output:

```text
PASS astro/src/pages/new/index.astro: converted 5 .label span(s) to h2
PASS astro/src/pages/new/[camp].astro: converted 5 .label span(s) to h2
PASS astro/src/pages/new/about.astro: converted 3 .label span(s) to h2
```

- [ ] **Step 4: Refresh `astro/public/new/miso.css` from `new/miso.css`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
cp new/miso.css astro/public/new/miso.css
cmp -s new/miso.css astro/public/new/miso.css && echo 'PASS astro/public/new/miso.css refresh matches new/miso.css' || { echo 'FAIL astro/public/new/miso.css differs'; exit 1; }
```

Expected output:

```text
PASS astro/public/new/miso.css refresh matches new/miso.css
```

- [ ] **Step 5: Verify Task 4 — no `.label` spans left, `h2.label` present, outline sane**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
# No span.label anywhere in static or astro sources.
if grep -RIn 'span class="label"' new astro/src --include='*.html' --include='*.astro' | grep -q .; then echo 'FAIL span.label remains'; grep -RIn 'span class="label"' new astro/src --include='*.html' --include='*.astro'; exit 1; else echo 'PASS no span class="label" remaining'; fi
# h2.label present per page in the expected counts.
for pair in "new/index.html:5" "new/tokyo/index.html:5" "new/adelaide/index.html:5" "new/about/index.html:3"; do
  file="${pair%%:*}"; want="${pair##*:}"
  got=$(grep -c '<h2 class="label"' "$file")
  test "$got" = "$want" && echo "PASS $file has $want h2.label" || { echo "FAIL $file has $got h2.label, want $want"; exit 1; }
done
for pair in "astro/src/pages/new/index.astro:5" "astro/src/pages/new/[camp].astro:5" "astro/src/pages/new/about.astro:3"; do
  file="${pair%%:*}"; want="${pair##*:}"
  got=$(grep -c '<h2 class="label"' "$file")
  test "$got" = "$want" && echo "PASS $file has $want h2.label" || { echo "FAIL $file has $got h2.label, want $want"; exit 1; }
done
# Outline sanity: exactly one h1 per static page, and no h2 sudden skips before a section h2 exists.
for file in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html; do
  h1=$(grep -c '<h1' "$file")
  test "$h1" = "1" && echo "PASS $file has one h1" || { echo "FAIL $file has $h1 h1"; exit 1; }
done
# The new CSS rule is present and the old .label rule still intact.
grep -Fq '.section-label h2.label { margin:0; }' new/miso.css && echo 'PASS margin reset rule present'
grep -Fq '.label { font-size:0.82rem; font-weight:600; letter-spacing:0.04em; color:var(--muted); }' new/miso.css && echo 'PASS original .label rule intact'
# Banned copy stays absent (conversion is structural, no new copy).
grep -RniE 'free pilot|supporting partner|Supported by|laptops closed|On paper' new/*.html new/*/*.html astro/src --include='*.astro' | grep -q . && { echo 'FAIL banned language present'; exit 1; } || echo 'PASS no banned language introduced'
```

Expected output:

```text
PASS no span class="label" remaining
PASS new/index.html has 5 h2.label
PASS new/tokyo/index.html has 5 h2.label
PASS new/adelaide/index.html has 5 h2.label
PASS new/about/index.html has 3 h2.label
PASS astro/src/pages/new/index.astro has 5 h2.label
PASS astro/src/pages/new/[camp].astro has 5 h2.label
PASS astro/src/pages/new/about.astro has 3 h2.label
PASS new/index.html has one h1
PASS new/tokyo/index.html has one h1
PASS new/adelaide/index.html has one h1
PASS new/about/index.html has one h1
PASS margin reset rule present
PASS original .label rule intact
PASS no banned language introduced
```

- [ ] **Step 6: Commit Task 4**

```bash
git add new/miso.css new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html astro/src/pages/new/index.astro astro/src/pages/new/[camp].astro astro/src/pages/new/about.astro astro/public/new/miso.css
git commit -m "feat: promote section labels to h2 for heading semantics"
```

Expected output includes:

```text
[seo-impl
```

### Task 5: Rebuild Astro staging output

**Files:**
- Modify: `astro/scripts/build-staging.mjs`
- Regenerate: `new/astro/index.html`, `new/astro/tokyo/index.html`, `new/astro/adelaide/index.html`, `new/astro/about/index.html`, `new/astro/miso.css`

**Produces:**
- `astro/scripts/build-staging.mjs` no longer rejects `application/ld+json` blocks (it still rejects all other client scripts).
- `npm run build:staging` succeeds and `new/astro/` carries the noindex meta (flipped by the build script), the new OG metas, the JSON-LD scripts (URLs rewritten to `/new/astro/`), and the `h2.label` headings.

- [ ] **Step 1: Refine the client-script guard in `build-staging.mjs`**

The current guard in the verification loop is:

```js
  if (html.includes('<script')) {
    throw new Error(`Client script emitted: ${path}`);
  }
```

Replace it with a guard that strips `application/ld+json` blocks first, then checks for any remaining `<script` tag:

```js
  const stripped = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  if (/<script/i.test(stripped)) {
    throw new Error(`Client script emitted: ${path}`);
  }
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/scripts/build-staging.mjs')
text = path.read_text()
old = """  if (html.includes('<script')) {
    throw new Error(`Client script emitted: ${path}`);
  }"""
new = """  const stripped = html.replace(/<script\\s+type="application\\/ld\\+json">[\\s\\S]*?<\\/script>/g, '');
  if (/<script/i.test(stripped)) {
    throw new Error(`Client script emitted: ${path}`);
  }"""
count = text.count(old)
if count != 1:
    raise SystemExit(f'BLOCKED seo-impl: expected one client-script guard, found {count}')
if 'application/ld+json' in text:
    raise SystemExit('BLOCKED seo-impl: build-staging.mjs already patched for json-ld')
path.write_text(text.replace(old, new))
print('PASS build-staging.mjs client-script guard refined for ld+json')
PY
```

Expected output:

```text
PASS build-staging.mjs client-script guard refined for ld+json
```

- [ ] **Step 2: Run `npm run build:staging` and confirm the build passes**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run build:staging
```

Expected output ends with:

```text
PASS staging artifact: 4 pages, scoped links, noindex, zero scripts, CSS parity
```

If the build fails twice, STOP and report `BLOCKED seo-impl: astro build failed — <one-line reason>`.

- [ ] **Step 3: Verify `new/astro/` carries items 1–4 (noindex, OG metas, JSON-LD, h2.label)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for pair in "new/astro/index.html:1" "new/astro/tokyo/index.html:2" "new/astro/adelaide/index.html:2" "new/astro/about/index.html:3"; do
  file="${pair%%:*}"; want="${pair##*:}"
  got=$(grep -c 'application/ld+json' "$file")
  test "$got" = "$want" && echo "PASS $file has $want ld+json scripts" || { echo "FAIL $file has $got, want $want"; exit 1; }
done
for file in new/astro/index.html new/astro/tokyo/index.html new/astro/adelaide/index.html new/astro/about/index.html; do
  grep -Fq 'content="noindex, nofollow"' "$file" && echo "PASS noindex present $file"
  grep -Fq 'og:image:width" content="1200"' "$file" && echo "PASS og:image:width 1200 $file"
  grep -Fq 'og:image:height" content="630"' "$file" && echo "PASS og:image:height 630 $file"
  grep -Fq 'og:image:alt" content="Make It So Camp — you cannot delegate what you cannot articulate"' "$file" && echo "PASS og:image:alt $file"
  h2=$(grep -c '<h2 class="label"' "$file")
  test "$h2" -ge 3 && echo "PASS $file has $h2 h2.label (>=3)" || { echo "FAIL $file missing h2.label (got $h2)"; exit 1; }
  if grep -q '<span class="label"' "$file"; then echo "FAIL span.label remains in $file"; exit 1; fi
done
# CSS parity for the heading margin reset.
grep -Fq '.section-label h2.label { margin:0; }' new/astro/miso.css && echo 'PASS new/astro/miso.css carries margin reset'
# JSON-LD parses in astro output.
python3 - <<'PY'
import json, re
from pathlib import Path
for rel in ['new/astro/index.html','new/astro/tokyo/index.html','new/astro/adelaide/index.html','new/astro/about/index.html']:
    text = Path(rel).read_text()
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S)
    for i, b in enumerate(blocks):
        try:
            json.loads(b)
        except Exception as e:
            raise SystemExit(f'FAIL invalid astro JSON-LD in {rel} block {i}: {e}')
    print(f'PASS {rel} astro JSON-LD parses ({len(blocks)} block(s))')
PY
# Staging URL rewrite applied inside JSON-LD too (no newline-era /new/ paths leaking without /astro/).
grep -c 'misocamp.com/new/astro/' new/astro/tokyo/index.html | grep -q '[1-9]' && echo 'PASS astro JSON-LD URLs scoped to /new/astro/'
```

Expected output includes:

```text
PASS new/astro/index.html has 1 ld+json scripts
PASS new/astro/tokyo/index.html has 2 ld+json scripts
PASS new/astro/adelaide/index.html has 2 ld+json scripts
PASS new/astro/about/index.html has 3 ld+json scripts
PASS noindex present new/astro/index.html
PASS og:image:width 1200 new/astro/index.html
PASS og:image:height 630 new/astro/index.html
PASS og:image:alt new/astro/index.html
PASS new/astro/index.html has 5 h2.label (>=3)
PASS new/astro/tokyo/index.html has 5 h2.label (>=3)
PASS new/astro/adelaide/index.html has 5 h2.label (>=3)
PASS new/astro/about/index.html has 3 h2.label (>=3)
PASS new/astro/miso.css carries margin reset
PASS new/astro/index.html astro JSON-LD parses (1 block(s))
PASS new/astro/tokyo/index.html astro JSON-LD parses (2 block(s))
PASS new/astro/adelaide/index.html astro JSON-LD parses (2 block(s))
PASS new/astro/about/index.html astro JSON-LD parses (3 block(s))
PASS astro JSON-LD URLs scoped to /new/astro/
```

- [ ] **Step 4: Commit Task 5**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro/scripts/build-staging.mjs new/astro
git commit -m "build: regenerate Astro staging preview with SEO/AEO package"
```

Expected output includes:

```text
[seo-impl
```

### Task 6: Final verification

**Files:**
- Create: `docs/plans/seo-impl-screenshots/` (optional, only if Chrome is available)

**Produces:**
- A full verification pass across static and astro output: noindex on all four static pages; `og-image.jpg` is 1200×630 with no `og-image-new.jpg`; OG width/height/alt on all pages and astro output; JSON-LD counts and parse validity; `h2.label` present with no `span.label` remaining; astro output regenerated and parity-checked; footers byte-identical across static pages; banned phrases absent; tag balance; protected paths untouched; optional screenshots on ports 8811 / CDP 9427.

- [ ] **Step 1: Verify branch and changed-file scope; protected paths untouched**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test "$(git branch --show-current)" = "seo-impl" && echo 'PASS on branch seo-impl'
python3 - <<'PY'
import subprocess
allowed = {
  'new/miso.css',
  'new/index.html', 'new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html',
  'astro/src/layouts/BaseLayout.astro',
  'astro/src/pages/new/index.astro',
  'astro/src/pages/new/[camp].astro',
  'astro/src/pages/new/about.astro',
  'astro/public/new/miso.css',
  'astro/scripts/build-staging.mjs',
  'new/astro/index.html', 'new/astro/tokyo/index.html', 'new/astro/adelaide/index.html', 'new/astro/about/index.html', 'new/astro/miso.css',
  'assets/og-src.html',
  'og-image.jpg',
  'docs/plans/2026-07-16-seo-implementation.md',
}
changed = set(subprocess.check_output(['git', 'diff', '--name-only', 'master...HEAD'], text=True).splitlines())
extra = sorted(p for p in changed if p not in allowed and not p.startswith('docs/plans/seo-impl-screenshots/'))
if extra:
    raise SystemExit('FAIL unexpected changed files: ' + ', '.join(extra))
forbidden = {p for p in changed if p in {'CNAME', 'index.html', '_session.md'} or p.endswith('/_session.md')}
if forbidden:
    raise SystemExit('FAIL protected path touched: ' + ', '.join(forbidden))
if not {'og-image.jpg','assets/og-src.html'}.issubset(changed):
    raise SystemExit('FAIL og-image.jpg or assets/og-src.html not changed')
print('PASS changed files limited to seo-impl scope; protected paths untouched')
PY
```

Expected output:

```text
PASS on branch seo-impl
PASS changed files limited to seo-impl scope; protected paths untouched
```

- [ ] **Step 2: noindex on all four static pages; astro source robots still `index, follow`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for file in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html; do
  grep -Fq '<meta name="robots" content="noindex, nofollow"><!-- staging: flip to index,follow at root launch -->' "$file" && echo "PASS noindex+comment $file"
done
grep -Fq 'content="noindex, nofollow"' new/astro/index.html && echo 'PASS astro output noindex (hub)'
grep -Fq 'content="noindex, nofollow"' new/astro/tokyo/index.html && echo 'PASS astro output noindex (tokyo)'
grep -Fq 'content="noindex, nofollow"' new/astro/adelaide/index.html && echo 'PASS astro output noindex (adelaide)'
grep -Fq 'content="noindex, nofollow"' new/astro/about/index.html && echo 'PASS astro output noindex (about)'
grep -Fq '<meta name="robots" content="index, follow">' astro/src/layouts/BaseLayout.astro && echo 'PASS astro source robots still index,follow (build flips it)'
```

Expected output includes:

```text
PASS noindex+comment new/index.html
PASS noindex+comment new/tokyo/index.html
PASS noindex+comment new/adelaide/index.html
PASS noindex+comment new/about/index.html
PASS astro output noindex (hub)
PASS astro output noindex (tokyo)
PASS astro output noindex (adelaide)
PASS astro output noindex (about)
PASS astro source robots still index,follow (build flips it)
```

- [ ] **Step 3: OG image — dimensions, replacement, no og-image-new**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
W=$(sips -g pixelWidth og-image.jpg | awk '/pixelWidth/{print $2}')
H=$(sips -g pixelHeight og-image.jpg | awk '/pixelHeight/{print $2}')
test "$W" = "1200" -a "$H" = "630" && echo "PASS og-image.jpg is 1200x630" || { echo "FAIL og-image.jpg is ${W}x${H}"; exit 1; }
# Prove replacement against the committed version: expect og-image.jpg listed as a changed (binary) file.
git diff --stat master -- og-image.jpg | grep -q 'og-image.jpg' && echo 'PASS og-image.jpg listed as changed vs master' || { echo 'FAIL og-image.jpg not listed in git diff --stat master'; exit 1; }
find . -name 'og-image-new.jpg' -not -path './.git/*' | grep -q . && { echo 'FAIL og-image-new.jpg exists'; exit 1; } || echo 'PASS no og-image-new.jpg'
if grep -RIn 'og-image-new' --exclude-dir=.git . | grep -q .; then echo 'FAIL og-image-new referenced'; exit 1; else echo 'PASS no og-image-new references'; fi
# Root index.html untouched and still pointing at og-image.jpg (inherits new art at launch).
grep -Fq 'og-image.jpg' index.html && echo 'PASS root index.html still references og-image.jpg'
git diff --quiet master -- index.html && echo 'PASS root index.html unchanged vs master' || echo 'NOTE root index.html differs from master (acceptable only if unrelated)'
```

Expected output includes:

```text
PASS og-image.jpg is 1200x630
PASS no og-image-new.jpg
PASS no og-image-new references
PASS root index.html still references og-image.jpg
PASS root index.html unchanged vs master
```

- [ ] **Step 4: OG width/height/alt on all four static pages and astro output**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for file in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html new/astro/index.html new/astro/tokyo/index.html new/astro/adelaide/index.html new/astro/about/index.html; do
  grep -Fq 'og:image:width" content="1200"' "$file" && echo "PASS og:image:width $file"
  grep -Fq 'og:image:height" content="630"' "$file" && echo "PASS og:image:height $file"
  grep -Fq 'og:image:alt" content="Make It So Camp — you cannot delegate what you cannot articulate"' "$file" && echo "PASS og:image:alt $file"
done
```

Expected output: 24 PASS lines (3 per file × 8 files).

- [ ] **Step 5: JSON-LD counts and parse validity across static and astro output**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for pair in \
  "new/index.html:1" "new/tokyo/index.html:2" "new/adelaide/index.html:2" "new/about/index.html:3" \
  "new/astro/index.html:1" "new/astro/tokyo/index.html:2" "new/astro/adelaide/index.html:2" "new/astro/about/index.html:3"; do
  file="${pair%%:*}"; want="${pair##*:}"
  got=$(grep -c 'application/ld+json' "$file")
  test "$got" = "$want" && echo "PASS $file has $want ld+json scripts" || { echo "FAIL $file has $got, want $want"; exit 1; }
done
python3 - <<'PY'
import json, re
from pathlib import Path
for rel in ['new/index.html','new/tokyo/index.html','new/adelaide/index.html','new/about/index.html',
            'new/astro/index.html','new/astro/tokyo/index.html','new/astro/adelaide/index.html','new/astro/about/index.html']:
    text = Path(rel).read_text()
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S)
    for i, b in enumerate(blocks):
        try:
            json.loads(b)
        except Exception as e:
            raise SystemExit(f'FAIL invalid JSON-LD in {rel} block {i}: {e}')
    print(f'PASS {rel} JSON-LD parses ({len(blocks)} block(s))')
PY
```

Expected output: 8 count PASS lines + 8 parse PASS lines.

- [ ] **Step 6: Headings — no `span.label` left, `h2.label` present, on static and astro output**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if grep -RIn 'span class="label"' new astro/src --include='*.html' --include='*.astro' | grep -q .; then echo 'FAIL span.label remains in sources'; exit 1; else echo 'PASS no span.label in sources'; fi
if grep -RIn '<span class="label"' new/astro --include='*.html' | grep -q .; then echo 'FAIL span.label remains in astro output'; exit 1; else echo 'PASS no span.label in astro output'; fi
for file in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html new/astro/index.html new/astro/tokyo/index.html new/astro/adelaide/index.html new/astro/about/index.html; do
  h2=$(grep -c '<h2 class="label"' "$file")
  test "$h2" -ge 3 && echo "PASS $file has $h2 h2.label" || { echo "FAIL $file h2.label count $h2"; exit 1; }
done
grep -Fq '.section-label h2.label { margin:0; }' new/miso.css && echo 'PASS static miso.css margin reset'
grep -Fq '.section-label h2.label { margin:0; }' new/astro/miso.css && echo 'PASS astro miso.css margin reset'
```

Expected output: span-label absent (×2) + 8 h2.count PASS lines + 2 CSS PASS lines.

- [ ] **Step 7: Footers byte-identical across static pages**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
import re
footer_re = re.compile(r'  <footer class="footer">\n.*?\n  </footer>', re.S)
hub = footer_re.search(Path('new/index.html').read_text())
if not hub:
    raise SystemExit('FAIL footer missing in new/index.html')
ref = hub.group(0)
for path in ['new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html']:
    m = footer_re.search(Path(path).read_text())
    if not m:
        raise SystemExit(f'FAIL footer missing in {path}')
    if m.group(0) != ref:
        raise SystemExit(f'FAIL footer differs in {path}')
    print(f'PASS footer byte-identical for {path}')
PY
```

Expected output:

```text
PASS footer byte-identical for new/tokyo/index.html
PASS footer byte-identical for new/adelaide/index.html
PASS footer byte-identical for new/about/index.html
```

- [ ] **Step 8: Banned-language parity across static and astro output; tag balance**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -RniE 'free pilot|supporting partner|Supported by|laptops closed|On paper' new astro/src new/astro --include='*.html' --include='*.astro' --include='*.ts' | grep -q . && { echo 'FAIL banned language present'; exit 1; } || echo 'PASS banned language absent across static and astro'
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
            raise AssertionError(f'unbalanced </{tag}>; stack={self.stack}')
        self.stack.pop()
for path in ['new/index.html','new/tokyo/index.html','new/adelaide/index.html','new/about/index.html',
             'new/astro/index.html','new/astro/tokyo/index.html','new/astro/adelaide/index.html','new/astro/about/index.html']:
    parser = BalanceParser()
    parser.feed(Path(path).read_text())
    parser.close()
    if parser.stack:
        raise SystemExit(f'FAIL unclosed tags in {path}: {parser.stack}')
    print(f'PASS tag-balanced {path}')
PY
```

Expected output includes the banned-language PASS line and 8 `PASS tag-balanced …` lines.

- [ ] **Step 9: Non-ASCII load-bearing strings intact (static and astro)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'Crypto Café Tokyo' new/tokyo/index.html && echo 'PASS Café static Tokyo'
grep -Fq 'Crypto Café Tokyo' new/astro/tokyo/index.html && echo 'PASS Café astro Tokyo'
grep -Fq '24–25 August 2026' new/tokyo/index.html && echo 'PASS en dash static Tokyo date'
grep -Fq '17–18 September 2026' new/adelaide/index.html && echo 'PASS en dash static Adelaide date'
grep -Fq 'Make It So Camp — you cannot delegate what you cannot articulate' new/index.html && echo 'PASS em dash og:image:alt static hub'
grep -Fq 'Tokyo · Adelaide · 2026' new/index.html && echo 'PASS middot static hub'
grep -Fq 'Request an invitation ↗' new/tokyo/index.html && echo 'PASS arrow static Tokyo'
```

Expected output: 7 PASS lines.

- [ ] **Step 10: Optional screenshots on required ports (8811 / CDP 9427)**

If Google Chrome is unavailable, report `BLOCKED seo-impl: Chrome unavailable for optional screenshots` and stop. These screenshots are visual verification only; the deterministic checks above are authoritative.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if lsof -ti:8811 >/dev/null 2>&1; then echo 'BLOCKED seo-impl: port 8811 occupied'; exit 1; fi
if lsof -ti:9427 >/dev/null 2>&1; then echo 'BLOCKED seo-impl: CDP port 9427 occupied'; exit 1; fi
# Never use port 8765.
if lsof -ti:8765 >/dev/null 2>&1; then echo 'NOTE port 8765 is in use (must not be used by this step)'; fi
python3 -m http.server 8811 >/tmp/seo-impl-http.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
  if [ -n "${CHROME_PID:-}" ]; then kill "$CHROME_PID" >/dev/null 2>&1 || true; fi
  rm -rf /tmp/seo-impl-cdp 2>/dev/null || true
}
trap cleanup EXIT
sleep 1
mkdir -p docs/plans/seo-impl-screenshots
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then echo 'BLOCKED seo-impl: Chrome unavailable for optional screenshots'; exit 1; fi
"$CHROME" --headless --disable-gpu --remote-debugging-port=9427 --user-data-dir=/tmp/seo-impl-cdp about:blank >/dev/null 2>&1 &
CHROME_PID=$!
sleep 2
node - <<'NODEEOF'
(async () => {
const list = await (await fetch('http://localhost:9427/json/list')).json();
const target = list.find(t => t.type === 'page');
if (!target) { console.error('FAIL no CDP page target'); process.exit(1); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0; const pend = new Map();
const send = (method, params={}) => new Promise((resolve, reject) => {
  const i = ++id; pend.set(i, {resolve, reject}); ws.send(JSON.stringify({id:i, method, params}));
});
await new Promise(resolve => ws.onopen = resolve);
ws.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id && pend.has(message.id)) {
    const p = pend.get(message.id); pend.delete(message.id);
    if (message.error) p.reject(new Error(JSON.stringify(message.error))); else p.resolve(message.result);
  }
};
await send('Page.enable');
let failed = false;
const pages = [
  { path: '/new/', slug: 'hub-static' },
  { path: '/new/tokyo/', slug: 'tokyo-static' },
  { path: '/new/adelaide/', slug: 'adelaide-static' },
  { path: '/new/about/', slug: 'about-static' },
];
for (const page of pages) {
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1400, deviceScaleFactor: 2, mobile: width < 900 });
    await send('Page.navigate', { url: 'http://127.0.0.1:8811' + page.path });
    await new Promise(resolve => setTimeout(resolve, 1200));
    const overflow = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth > document.documentElement.clientWidth', returnByValue: true });
    if (overflow.result.value) { console.error('FAIL overflow at ' + page.path + ' width ' + width); failed = true; }
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x:0, y:0, width, height: 2800, scale: 1 } });
    require('fs').writeFileSync('docs/plans/seo-impl-screenshots/' + page.slug + '-' + width + '.png', Buffer.from(shot.data, 'base64'));
  }
}
ws.close();
if (failed) { console.log('FAIL screenshot verification'); process.exit(1); }
console.log('PASS screenshots saved for static pages at 1440 and 390');
})();
NODEEOF
```

Expected output ends with:

```text
PASS screenshots saved for static pages at 1440 and 390
```

- [ ] **Step 11: Commit Task 6 (screenshots, if produced)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if [ -d docs/plans/seo-impl-screenshots ] && [ -n "$(ls -A docs/plans/seo-impl-screenshots 2>/dev/null)" ]; then
  git add docs/plans/seo-impl-screenshots
  git commit -m "test: verify SEO/AEO implementation"
else
  echo 'NOTE no screenshots produced; skipping Task 6 commit (verification was deterministic)'
fi
```

Expected output either includes `[seo-impl` for a commit, or the NOTE line.

- [ ] **Step 12: Final report and push**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
echo "SEO/AEO implementation complete on branch seo-impl."
git log --oneline master..HEAD
git status --short
```

Expected output: a list of the task commits (`feat: set staging pages…`, `feat: new 1200x630 Swiss OG image…`, `feat: add JSON-LD structured data…`, `feat: promote section labels to h2…`, `build: regenerate Astro staging preview…`, optionally `test: verify SEO/AEO implementation`) and a clean working tree (the pre-existing untracked `.superpowers/`, `MISo Camp - Sponsorship Deck v2.md`, and `partnership-deck.html` may still show as untracked — they are out of scope and must NOT be staged).

## Cross-cutting verification recap (what "done" means)

- `grep noindex` on all four static pages: PASS (Step 2 of Task 6).
- `og-image.jpg` is 1200×630 via `sips -g pixelWidth -g pixelHeight`; differs from the prior 615×434; no `og-image-new.jpg` exists; no page references `og-image-new` (Task 2 Step 4, Task 6 Step 3).
- All four static pages + astro output reference `og-image.jpg` with `og:image:width 1200`, `og:image:height 630`, and the `og:image:alt` line (Task 6 Step 4).
- `grep -c "application/ld+json"` per page matches the plan's expected counts (hub 1, Tokyo 2, Adelaide 2, About 3) on static AND astro output; blocks parse via the Python extraction script (Task 6 Step 5).
- `h2.label` present, no `span.label` left, in static sources and astro output; `.section-label h2.label { margin:0; }` in both `new/miso.css` and `new/astro/miso.css` (Task 6 Step 6).
- Astro output regenerated and carries the same (Task 5 Step 3, Task 6 Steps 2/4/5/6).
- Footers byte-identical across static pages (Task 6 Step 7).
- Banned-language parity static vs astro; tag balance across all eight pages (Task 6 Step 8).
- Branch `seo-impl` off `master`; protected paths (`CNAME`, root `index.html`, `_session.md`) untouched; no `og-image-new.jpg` anywhere (Task 6 Step 1).
- Commit per task with the exact messages shown.
- Report `DONE seo-impl-plan: wrote the plan` (or `BLOCKED seo-impl-plan: <reason>`) to the herdr pane when the plan itself is written. The executor of this plan reports `DONE seo-impl: <summary>` (or `BLOCKED seo-impl: <reason>`) only after Task 6 passes.

## Open decisions flagged (not this plan's lane)

- **Root `og:image` metadata inconsistency.** Root `index.html` is intentionally untouched, so it now serves the new 1200×630 `og-image.jpg` while still declaring `og:image:width 625`, `og:image:height 468`, and `og:image:alt "Captain Picard saying Make It So"`. Correcting root is a launch-cut-over task (P1-2 launch slot), not this staging package.
- **Canonical target shape at launch.** Canonicals remain `/new/...` on the staging pages and JSON-LD; the launch redirects to root paths (`/tokyo/`, etc.) and the JSON-LD launch variants in `docs/drafts/jsonld.md` are swapped in at cut-over.
- **Adelaide venue.** Stays `TBD` / `Venue to be announced` in copy and `Place` schema until a venue is locked.