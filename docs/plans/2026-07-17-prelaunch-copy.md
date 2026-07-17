# Prelaunch Copy Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. If any step fails twice, STOP and report `BLOCKED prelaunch-copy: <one-line reason>`.

Implementation environment: opencode

**Goal:** Apply the locked pre-launch copy pass to the staging hub (`new/index.html`) and mirror it exactly into the Astro sources, then regenerate `new/astro/` — adding a second hero CTA (partnership), a partnership note in the Request section, a rewritten "Who it's for" section (new lead, a fourth audience card, no card letters, a 4-column grid), and a minimal German Impressum on the About page with an Impressum link in the shared footer of all pages.

**Architecture:** Two parallel tracks carry the same content: the static track (`new/*.html`, styled by `/new/miso.css`) and the Astro track (`astro/src/**`, `astro/public/new/miso.css`, republished via `npm run build:staging` into `new/astro/`). The Astro hub page inlines its "Who it's for" body (no component), so it is edited directly like the static page; the hero CTA lives in the shared `Hero.astro` component, which gains an optional second CTA prop; the footer lives in `Footer.astro`. `build-staging.mjs` rewrites every `/new/` → `/new/astro/` (so `/new/about/#impressum` becomes `/new/astro/about/#impressum` in staging), flips `index, follow` → `noindex, nofollow`, refuses any non-JSON-LD `<script`, and asserts a CSS-parity + 4-page output — none of that script's logic is touched by this plan.

**Tech Stack:** Static HTML, CSS, TypeScript (Astro), Python 3 standard library, headless Google Chrome (optional screenshots). `npm run build:staging` for the Astro rebuild.

## Global Constraints

- Work on branch `prelaunch-copy`, branched from current `master`.
- One commit per task, with the **exact** commit messages shown below. If any step fails twice, STOP and report `BLOCKED prelaunch-copy: <one-line reason>`.
- **All copy in this plan is LOCKED.** Transcribe byte-for-byte, especially: the em dash `—`, en dashes `–`, middot `·`, arrow `↗`, the bare ampersand in `Public & policy`, and the German `§`, `ß` (Fregestraße, gemäß), `ä` (gemäß, Geschäftsführer, Fregestraße), `hr` none. The Impressum block is legally vetted — `HRB 129945 B`, `DE273843619`, `§ 5 DDG`, `Fregestraße 65`, `gemäß` must be byte-exact.
- Do NOT touch: root `index.html`, `CNAME`, `_session.md`, any workspace state file, `astro/scripts/build-staging.mjs`, the Astro source robots meta (`content="index, follow"` in `BaseLayout.astro` — the build flips it).
- Camp pages (`new/tokyo/`, `new/adelaide/`) and the About page are touched **ONLY** for the one shared-footer Impressum link line; About is additionally touched for the appended Impressum section. No other edit to those pages.
- Card-letter removal is scoped to the **Who it's for** section (the `.moves` grid in `#who`) only. The section-label number spans (`<span class="num">01</span>` … `05`) stay everywhere — do not touch them.
- No `og-image*` changes, no JSON-LD changes, no canonical changes, no robots-meta changes on the static pages (they are already `noindex, nofollow` from the prior SEO pass). JSON-LD block counts stay: hub 1, Tokyo 2, Adelaide 2, About 3 (static and astro output).
- Banned language stays absent from any new/edited copy: `free pilot`, prices/cost/`offers`, `supporting partner`, `Supported by`, `laptops closed`, `On paper`.
- After all edits, the footer block must remain byte-identical across all four static pages (now carrying the Impressum link) and across all four astro output pages.
- Optional screenshots use port **8812** for the static server and CDP port **9428** — with occupied-port BLOCK guards on both before starting. **Never use port 8765.**

## File Structure

- `new/miso.css`: add `.hero-cta-alt` rules, `.moves-four` rules, `.imprint` rules (three small additions adjacent to the existing rules they extend).
- `new/index.html` (hub): hero CTA second link, Who it's for lead + 4 cards + `moves-four` class + bottom note, Request section partnership note.
- `new/about/index.html`: append the Impressum section (number 04, `id="impressum"`) after the Request section; update the footer's third div with the Impressum link.
- `new/tokyo/index.html`, `new/adelaide/index.html`: footer third div only (Impressum link).
- `astro/src/components/Hero.astro`: add optional `ctaAlt` prop and render a second `.hero-cta-alt` link inside the `.hero-cta` block.
- `astro/src/pages/new/index.astro`: pass `ctaAlt`; mirror the hub's Who it's for + Request edits inline.
- `astro/src/pages/new/about.astro`: append the Impressum section after the Request section.
- `astro/src/components/Footer.astro`: add the Impressum link to the third footer div (carries through to all astro pages and rewrites to `/new/astro/about/#impressum` in staging).
- `astro/public/new/miso.css`: refreshed byte-identical copy of `new/miso.css`.
- `new/astro/**`: regenerated build output.
- `docs/plans/prelaunch-copy-screenshots/` (new, optional): verification screenshots.

## Task 1: Static hub + miso.css + About Impressum + footer on all four static pages

**Files:**
- Modify: `new/miso.css`
- Modify: `new/index.html`
- Modify: `new/about/index.html`
- Modify: `new/tokyo/index.html`, `new/adelaide/index.html` (footer line only)

**Produces:**
- `new/miso.css` carries `.hero-cta-alt`, `.moves-four`, and `.imprint` rules.
- The hub shows two hero CTAs, a rewritten Who it's for section (4 cards, no letters, `moves-four` grid), and a partnership note under the big email line in Request (05).
- The About page renders an Impressum section (04) after Request; all four static pages share one byte-identical footer that now links to `/new/about/#impressum`.

- [ ] **Step 1: Create the branch from current `master`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
git pull --ff-only origin master
if git show-ref --verify --quiet refs/heads/prelaunch-copy; then echo "BLOCKED prelaunch-copy: branch prelaunch-copy already exists"; exit 1; fi
git switch -c prelaunch-copy >/dev/null
test "$(git branch --show-current)" = "prelaunch-copy" && echo "PASS on branch prelaunch-copy"
```

Expected output ends with:

```text
PASS on branch prelaunch-copy
```

- [ ] **Step 2: Add the three CSS rule blocks to `new/miso.css`**

The current hero-cta block is:

```css
.hero-cta { margin-top:clamp(1.2rem, 2.5vw, 2rem); font-size:clamp(1.05rem, 1.4vw, 1.3rem); font-weight:600; }
.hero-cta a { color:var(--accent); text-decoration:none; border-bottom:2px solid var(--accent); }
.hero-cta a:hover { color:var(--accent-hover); border-color:var(--accent-hover); }
```

The current `.moves` block is:

```css
.moves { display:grid; grid-template-columns:repeat(3, 1fr); gap:clamp(1.5rem, 3vw, 3rem); }
.move { border-top:2px solid var(--ink); padding-top:0.9rem; }
.move .num { display:block; margin-bottom:0.6rem; }
.move h3 { font-weight:700; font-size:clamp(1.3rem, 1.8vw, 1.65rem); letter-spacing:-0.01em; margin-bottom:0.45rem; }
.move p { color:var(--ink); }
```

The current invitation block is:

```css
.invite .email { font-weight:700; font-size:clamp(2rem, 5.5vw, 4.2rem); letter-spacing:-0.02em; }
.invite .email a { color:var(--accent); text-decoration:none; border-bottom:3px solid var(--accent); }
.invite .email a:hover { color:var(--accent-hover); border-color:var(--accent-hover); }
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('new/miso.css')
text = path.read_text(encoding='utf-8')

# 1) hero-cta-alt rules — append after the existing .hero-cta a:hover rule.
anchor1 = '.hero-cta a:hover { color:var(--accent-hover); border-color:var(--accent-hover); }'
if text.count(anchor1) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: hero-cta a:hover anchor not found / not unique')
if '.hero-cta-alt' in text:
    raise SystemExit('BLOCKED prelaunch-copy: .hero-cta-alt already present')
add1 = (
    '\n.hero-cta-alt { margin-left:1.4rem; }'
    '\n.hero-cta a.hero-cta-alt { color:var(--muted); border-bottom:2px solid var(--line); }'
    '\n.hero-cta a.hero-cta-alt:hover { color:var(--ink); border-color:var(--ink); }'
)
text = text.replace(anchor1, anchor1 + add1)

# 2) moves-four rules — append after the .move p rule.
anchor2 = '.move p { color:var(--ink); }'
if text.count(anchor2) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: .move p anchor not found / not unique')
if '.moves-four' in text:
    raise SystemExit('BLOCKED prelaunch-copy: .moves-four already present')
add2 = (
    '\n.moves-four { grid-template-columns:repeat(4, 1fr); }'
    '\n@media (max-width:1100px) { .moves-four { grid-template-columns:repeat(2, 1fr); } }'
    '\n@media (max-width:640px) { .moves-four { grid-template-columns:1fr; } }'
)
text = text.replace(anchor2, anchor2 + add2)

# 3) imprint rules — append after the .invite .email a:hover rule.
anchor3 = '.invite .email a:hover { color:var(--accent-hover); border-color:var(--accent-hover); }'
if text.count(anchor3) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: .invite .email a:hover anchor not found / not unique')
if '.imprint' in text:
    raise SystemExit('BLOCKED prelaunch-copy: .imprint already present')
add3 = (
    '\n.imprint { font-size:0.85rem; line-height:1.65; color:var(--muted); }'
    '\n.imprint a { font-size:inherit; }'
)
text = text.replace(anchor3, anchor3 + add3)

path.write_text(text, encoding='utf-8')
print('PASS miso.css: hero-cta-alt + moves-four + imprint rules added')
PY
```

Expected output:

```text
PASS miso.css: hero-cta-alt + moves-four + imprint rules added
```

- [ ] **Step 3: Edit the hub `new/index.html` — hero CTA, Who it's for, Request note**

Current hero-cta line (one line, exactly):

```html
    <p class="hero-cta"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">Request an invitation ↗</a></p>
```

Current Who it's for block (the `<div class="moves" …>` … `</div>`, exactly):

```html
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
```

Current Request section tail (exactly):

```html
    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>
  </section>
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('new/index.html')
text = path.read_text(encoding='utf-8')

# 1) Hero: add the second, muted partnership link inside the existing hero-cta paragraph.
old_hero = '    <p class="hero-cta"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">Request an invitation ↗</a></p>'
new_hero = '    <p class="hero-cta"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">Request an invitation ↗</a><a class="hero-cta-alt" href="mailto:hello@misocamp.com?subject=Partnership">Partner with us to run a camp ↗</a></p>'
if text.count(old_hero) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: hub hero-cta line not found / not unique')
if 'hero-cta-alt' in text:
    raise SystemExit('BLOCKED prelaunch-copy: hub already has hero-cta-alt')
text = text.replace(old_hero, new_hero)

# 2) Who it's for: replace the lead-statement, the moves div, and the bottom note.
old_who_lead = '    <p class="lead-statement">Experienced practitioners with real work to bring. <span class="dim">The cohort mixes domains on purpose: the method transfers, and the demos are better for it.</span></p>'
new_who_lead = '    <p class="lead-statement">Come for your experience, not your AI experience. <span class="dim">The camp leans on what you already know — strategy, research, policy, craft — and mixes domains on purpose: the method transfers, and the demos are better for it.</span></p>'
if text.count(old_who_lead) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: hub who-for lead not found / not unique')
text = text.replace(old_who_lead, new_who_lead)

old_moves = '''    <div class="moves" style="margin-top:clamp(2rem,3.5vw,3rem)">
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
    </div>'''
new_moves = '''    <div class="moves moves-four" style="margin-top:clamp(2rem,3.5vw,3rem)">
      <div class="move">
        <h3>Academic</h3>
        <p>Researchers, teachers, lab leads. People whose methods are rigorous but rarely written for anyone else to run.</p>
      </div>
      <div class="move">
        <h3>Creative</h3>
        <p>Strategists, designers, writers, cultural workers. People who work by taste and want it to survive contact with the tools.</p>
      </div>
      <div class="move">
        <h3>Corporate</h3>
        <p>Product, operations, transformation. People who own a process a team needs to understand, not just follow.</p>
      </div>
      <div class="move">
        <h3>Public & policy</h3>
        <p>Policy makers, public servants, civic institutions. People whose decisions must hold up when someone asks why.</p>
      </div>
    </div>'''
if text.count(old_moves) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: hub moves block not found / not unique')
if 'moves-four' in text:
    raise SystemExit('BLOCKED prelaunch-copy: hub already has moves-four')
text = text.replace(old_moves, new_moves)

old_note = '    <p class="note">You do not need to be technical. You need work you care about, and the patience to say what you mean. If you would rather wait for a playbook, this camp is not the place — the people here are writing it.</p>'
new_note = '    <p class="note">You need work you care about, and the patience to say what you mean. If you would rather wait for a playbook, this camp is not the place — the people here are writing it.</p>'
if text.count(old_note) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: hub who-for note not found / not unique')
text = text.replace(old_note, new_note)

# 3) Request section: add the partnership note after the big email line.
old_email = '    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>\n  </section>'
new_email = '    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>\n    <p class="note">Interested in running a version of Make It So Camp — at your university, company, or city? <a class="accent" href="mailto:hello@misocamp.com?subject=Partnership">Partner with us ↗</a></p>\n  </section>'
if text.count(old_email) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: hub Request email+section tail not found / not unique')
if 'Interested in running a version' in text:
    raise SystemExit('BLOCKED prelaunch-copy: hub already has partnership note')
text = text.replace(old_email, new_email)

path.write_text(text, encoding='utf-8')
print('PASS new/index.html: hero CTA + who-for + request note edited')
PY
```

Expected output:

```text
PASS new/index.html: hero CTA + who-for + request note edited
```

- [ ] **Step 4: Append the Impressum section to `new/about/index.html`**

Current About tail (the Request section's closing followed by the footer, exactly):

```html
    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>
  </section>

  <footer class="footer">
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('new/about/index.html')
text = path.read_text(encoding='utf-8')
anchor = '  </section>\n\n  <footer class="footer">'
if text.count(anchor) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: About </section>+footer anchor not found / not unique')
if 'id="impressum"' in text:
    raise SystemExit('BLOCKED prelaunch-copy: About already has impressum section')
impressum = (
    '  </section>\n\n'
    '  <section class="section" id="impressum" aria-labelledby="impressum-label">\n'
    '    <div class="section-label"><span class="num">04</span><h2 class="label" id="impressum-label">Impressum</h2></div>\n'
    '    <p class="imprint">Angaben gemäß § 5 DDG<br><br>Known Unknowns GmbH<br>Fregestraße 65<br>12159 Berlin<br><br>Vertreten durch: Igor Schwarzmann, Geschäftsführer<br>Registergericht: Amtsgericht Charlottenburg, HRB 129945 B<br>USt-IdNr.: DE273843619<br>Kontakt: <a class="accent" href="mailto:hello@misocamp.com">hello@misocamp.com</a></p>\n'
    '  </section>\n\n'
    '  <footer class="footer">'
)
path.write_text(text.replace(anchor, impressum), encoding='utf-8')
print('PASS new/about/index.html: Impressum section appended')
PY
```

Expected output:

```text
PASS new/about/index.html: Impressum section appended
```

- [ ] **Step 5: Update the shared footer on all four static pages with the Impressum link**

The current third footer div is byte-identical on all four pages (verified `ed2b23a36c42`):

```html
    <div><a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
old = '    <div><a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>'
new = '    <div><a href="/new/about/">About</a> · <a href="/new/about/#impressum">Impressum</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>'
for rel in ['new/index.html', 'new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html']:
    path = Path(rel)
    text = path.read_text(encoding='utf-8')
    c = text.count(old)
    if c != 1:
        raise SystemExit(f'BLOCKED prelaunch-copy: {rel} footer div count={c}')
    if '/new/about/#impressum"' in text:
        raise SystemExit(f'BLOCKED prelaunch-copy: {rel} already has Impressum footer link')
    path.write_text(text.replace(old, new), encoding='utf-8')
    print(f'PASS footer Impressum link added {rel}')
PY
```

Expected output:

```text
PASS footer Impressum link added new/index.html
PASS footer Impressum link added new/tokyo/index.html
PASS footer Impressum link added new/adelaide/index.html
PASS footer Impressum link added new/about/index.html
```

- [ ] **Step 6: Verify Task 1 (static track)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
# CSS rule blocks present.
grep -Fq '.hero-cta-alt { margin-left:1.4rem; }' new/miso.css && echo 'PASS hero-cta-alt rule'
grep -Fq '.hero-cta a.hero-cta-alt { color:var(--muted); border-bottom:2px solid var(--line); }' new/miso.css && echo 'PASS hero-cta-alt color rule'
grep -Fq '.moves-four { grid-template-columns:repeat(4, 1fr); }' new/miso.css && echo 'PASS moves-four base rule'
grep -Fq '@media (max-width:640px) { .moves-four { grid-template-columns:1fr; } }' new/miso.css && echo 'PASS moves-four 640 rule'
grep -Fq '.imprint { font-size:0.85rem; line-height:1.65; color:var(--muted); }' new/miso.css && echo 'PASS imprint rule'
# Hub hero: two CTAs.
grep -Fq 'Request an invitation ↗</a><a class="hero-cta-alt" href="mailto:hello@misocamp.com?subject=Partnership">Partner with us to run a camp ↗</a>' new/index.html && echo 'PASS hub hero two CTAs'
# Hub who-for.
grep -Fq 'Come for your experience, not your AI experience.' new/index.html && echo 'PASS hub who-for lead'
grep -Fq '<div class="moves moves-four" style="margin-top:clamp(2rem,3.5vw,3rem)">' new/index.html && echo 'PASS hub moves-four class'
grep -Fq '<h3>Public & policy</h3>' new/index.html && echo 'PASS hub fourth card'
grep -Fq 'You need work you care about, and the patience to say what you mean. If you would rather wait for a playbook, this camp is not the place — the people here are writing it.</p>' new/index.html && echo 'PASS hub who-for note'
# Hub: no card letters A/B/C remain inside the who-for section.
python3 - <<'PY'
import re
from pathlib import Path
t = Path('new/index.html').read_text(encoding='utf-8')
m = re.search(r'<section class="section" id="who"[^>]*>.*?</section>', t, re.S)
if not m:
    raise SystemExit('FAIL: who-for section not found')
who = m.group(0)
for L in ['A','B','C']:
    if f'<span class="num">{L}</span>' in who:
        raise SystemExit(f'FAIL: card letter {L} still present in who-for')
print('PASS hub: no A/B/C card letters in who-for')
# Section-label nums 01/02/03 still present on the hub.
for n in ['01','02','03']:
    if f'<span class="num">{n}</span>' not in t:
        raise SystemExit(f'FAIL: section-label num {n} missing on hub')
print('PASS hub: section-label 01/02/03 still present')
PY
# Hub Request note.
grep -Fq 'Interested in running a version of Make It So Camp — at your university, company, or city? <a class="accent" href="mailto:hello@misocamp.com?subject=Partnership">Partner with us ↗</a>' new/index.html && echo 'PASS hub request note'
# About Impressum.
grep -Fq 'Angaben gemäß § 5 DDG' new/about/index.html && echo 'PASS About § 5 DDG'
grep -Fq 'HRB 129945 B' new/about/index.html && echo 'PASS About HRB'
grep -Fq 'DE273843619' new/about/index.html && echo 'PASS About USt-IdNr'
grep -Fq 'Fregestraße 65' new/about/index.html && echo 'PASS About Fregestraße'
grep -Fq '<h2 class="label" id="impressum-label">Impressum</h2>' new/about/index.html && echo 'PASS About impressum label'
# About section numbering 01-04.
python3 - <<'PY'
from pathlib import Path
t = Path('new/about/index.html').read_text(encoding='utf-8')
for n in ['01','02','03','04']:
    c = t.count(f'<span class="num">{n}</span>')
    if c != 1:
        raise SystemExit(f'FAIL: About num {n} count={c} (want 1)')
print('PASS About: sections numbered 01-04 each once')
PY
# Footer Impressum link on all four static pages + byte-identity.
python3 - <<'PY'
import re, hashlib
from pathlib import Path
fr = re.compile(r'  <footer class="footer">\n.*?\n  </footer>', re.S)
hashes = {}
for rel in ['new/index.html','new/tokyo/index.html','new/adelaide/index.html','new/about/index.html']:
    t = Path(rel).read_text(encoding='utf-8')
    if '<a href="/new/about/#impressum">Impressum</a>' not in t:
        raise SystemExit(f'FAIL: {rel} footer missing Impressum link')
    m = fr.search(t)
    if not m:
        raise SystemExit(f'FAIL: {rel} footer missing')
    hashes[rel] = hashlib.sha256(m.group(0).encode()).hexdigest()[:12]
if len(set(hashes.values())) != 1:
    raise SystemExit(f'FAIL: footers differ: {hashes}')
print('PASS all four static footers byte-identical and carry Impressum link')
PY
```

Expected output ends with:

```text
PASS hero-cta-alt rule
PASS hero-cta-alt color rule
PASS moves-four base rule
PASS moves-four 640 rule
PASS imprint rule
PASS hub hero two CTAs
PASS hub who-for lead
PASS hub moves-four class
PASS hub fourth card
PASS hub who-for note
PASS hub: no A/B/C card letters in who-for
PASS hub: section-label 01/02/03 still present
PASS hub request note
PASS About § 5 DDG
PASS About HRB
PASS About USt-IdNr
PASS About Fregestraße
PASS About impressum label
PASS About: sections numbered 01-04 each once
PASS all four static footers byte-identical and carry Impressum link
```

- [ ] **Step 7: Commit Task 1**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add new/miso.css new/index.html new/about/index.html new/tokyo/index.html new/adelaide/index.html
git commit -m "feat: add partnership CTA, who-for fourth audience, and Impressum to staging pages"
```

Expected output includes:

```text
[prelaunch-copy
```

## Task 2: Mirror the copy pass into the Astro sources

**Files:**
- Modify: `astro/src/components/Hero.astro`
- Modify: `astro/src/pages/new/index.astro`
- Modify: `astro/src/pages/new/about.astro`
- Modify: `astro/src/components/Footer.astro`
- Modify (copy refresh): `astro/public/new/miso.css`

**Produces:**
- `Hero.astro` accepts an optional `ctaAlt` and renders a second `.hero-cta-alt` link.
- `index.astro` passes `ctaAlt` and carries the same Who it's for + Request edits as the static hub.
- `about.astro` renders the Impressum section (04) after Request.
- `Footer.astro`'s third div links to `/new/about/#impressum` (becomes `/new/astro/about/#impressum` in staging).
- `astro/public/new/miso.css` is byte-identical to `new/miso.css`.

- [ ] **Step 1: Add the `ctaAlt` prop and render a second CTA in `Hero.astro`**

Current `Hero.astro` Props + destructure (exactly):

```astro
  /** Optional CTA. When provided, renders the hero-cta block. */
  cta?: { href: string; label: string };
}

const { leftMeta, rightMeta, statement, small, minHeight, heroSub, cta } = Astro.props;
```

Current `Hero.astro` CTA render (exactly):

```astro
  {cta && (
    <p class="hero-cta"><a href={cta.href}>{cta.label}</a></p>
  )}
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/components/Hero.astro')
text = path.read_text(encoding='utf-8')

old_iface = '''  /** Optional CTA. When provided, renders the hero-cta block. */
  cta?: { href: string; label: string };
}'''
new_iface = '''  /** Optional CTA. When provided, renders the hero-cta block. */
  cta?: { href: string; label: string };
  /** Optional second, muted CTA rendered inside the same hero-cta block. */
  ctaAlt?: { href: string; label: string };
}'''
if text.count(old_iface) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: Hero Props anchor not found / not unique')
if 'ctaAlt' in text:
    raise SystemExit('BLOCKED prelaunch-copy: Hero already references ctaAlt')
text = text.replace(old_iface, new_iface)

old_destructure = 'const { leftMeta, rightMeta, statement, small, minHeight, heroSub, cta } = Astro.props;'
new_destructure = 'const { leftMeta, rightMeta, statement, small, minHeight, heroSub, cta, ctaAlt } = Astro.props;'
if text.count(old_destructure) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: Hero destructure anchor not found / not unique')
text = text.replace(old_destructure, new_destructure)

old_render = '''  {cta && (
    <p class="hero-cta"><a href={cta.href}>{cta.label}</a></p>
  )}'''
new_render = '''  {cta && (
    <p class="hero-cta"><a href={cta.href}>{cta.label}</a>{ctaAlt && <a class="hero-cta-alt" href={ctaAlt.href}>{ctaAlt.label}</a>}</p>
  )}'''
if text.count(old_render) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: Hero render anchor not found / not unique')
text = text.replace(old_render, new_render)

path.write_text(text, encoding='utf-8')
print('PASS Hero.astro: ctaAlt prop + render added')
PY
```

Expected output:

```text
PASS Hero.astro: ctaAlt prop + render added
```

- [ ] **Step 2: Pass `ctaAlt` and mirror the Who it's for + Request edits in `index.astro`**

Current `index.astro` Hero call (exactly):

```astro
  <Hero
    leftMeta="By invitation"
    rightMeta='Two-day AI workshop<br><span class="light">Tokyo · Adelaide · 2026</span>'
    statement="You cannot delegate what you cannot articulate."
    cta={{ href: 'mailto:hello@misocamp.com?subject=Invitation%20request', label: 'Request an invitation ↗' }}
  />
```

Current `index.astro` Who it's for block (exactly, same text as the static hub):

```astro
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
```

Current `index.astro` Request tail (exactly):

```astro
    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>
  </section>
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/pages/new/index.astro')
text = path.read_text(encoding='utf-8')

old_hero_call = '''  <Hero
    leftMeta="By invitation"
    rightMeta='Two-day AI workshop<br><span class="light">Tokyo · Adelaide · 2026</span>'
    statement="You cannot delegate what you cannot articulate."
    cta={{ href: 'mailto:hello@misocamp.com?subject=Invitation%20request', label: 'Request an invitation ↗' }}
  />'''
new_hero_call = '''  <Hero
    leftMeta="By invitation"
    rightMeta='Two-day AI workshop<br><span class="light">Tokyo · Adelaide · 2026</span>'
    statement="You cannot delegate what you cannot articulate."
    cta={{ href: 'mailto:hello@misocamp.com?subject=Invitation%20request', label: 'Request an invitation ↗' }}
    ctaAlt={{ href: 'mailto:hello@misocamp.com?subject=Partnership', label: 'Partner with us to run a camp ↗' }}
  />'''
if text.count(old_hero_call) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: index.astro Hero call not found / not unique')
if 'ctaAlt' in text:
    raise SystemExit('BLOCKED prelaunch-copy: index.astro already references ctaAlt')
text = text.replace(old_hero_call, new_hero_call)

old_who_lead = '    <p class="lead-statement">Experienced practitioners with real work to bring. <span class="dim">The cohort mixes domains on purpose: the method transfers, and the demos are better for it.</span></p>'
new_who_lead = '    <p class="lead-statement">Come for your experience, not your AI experience. <span class="dim">The camp leans on what you already know — strategy, research, policy, craft — and mixes domains on purpose: the method transfers, and the demos are better for it.</span></p>'
if text.count(old_who_lead) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: index.astro who-for lead not found / not unique')
text = text.replace(old_who_lead, new_who_lead)

old_moves = '''    <div class="moves" style="margin-top:clamp(2rem,3.5vw,3rem)">
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
    </div>'''
new_moves = '''    <div class="moves moves-four" style="margin-top:clamp(2rem,3.5vw,3rem)">
      <div class="move">
        <h3>Academic</h3>
        <p>Researchers, teachers, lab leads. People whose methods are rigorous but rarely written for anyone else to run.</p>
      </div>
      <div class="move">
        <h3>Creative</h3>
        <p>Strategists, designers, writers, cultural workers. People who work by taste and want it to survive contact with the tools.</p>
      </div>
      <div class="move">
        <h3>Corporate</h3>
        <p>Product, operations, transformation. People who own a process a team needs to understand, not just follow.</p>
      </div>
      <div class="move">
        <h3>Public & policy</h3>
        <p>Policy makers, public servants, civic institutions. People whose decisions must hold up when someone asks why.</p>
      </div>
    </div>'''
if text.count(old_moves) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: index.astro moves block not found / not unique')
if 'moves-four' in text:
    raise SystemExit('BLOCKED prelaunch-copy: index.astro already has moves-four')
text = text.replace(old_moves, new_moves)

old_note = '    <p class="note">You do not need to be technical. You need work you care about, and the patience to say what you mean. If you would rather wait for a playbook, this camp is not the place — the people here are writing it.</p>'
new_note = '    <p class="note">You need work you care about, and the patience to say what you mean. If you would rather wait for a playbook, this camp is not the place — the people here are writing it.</p>'
if text.count(old_note) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: index.astro who-for note not found / not unique')
text = text.replace(old_note, new_note)

old_email = '    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>\n  </section>'
new_email = '    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>\n    <p class="note">Interested in running a version of Make It So Camp — at your university, company, or city? <a class="accent" href="mailto:hello@misocamp.com?subject=Partnership">Partner with us ↗</a></p>\n  </section>'
if text.count(old_email) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: index.astro Request email+section tail not found / not unique')
if 'Interested in running a version' in text:
    raise SystemExit('BLOCKED prelaunch-copy: index.astro already has partnership note')
text = text.replace(old_email, new_email)

path.write_text(text, encoding='utf-8')
print('PASS index.astro: ctaAlt + who-for + request note mirrored')
PY
```

Expected output:

```text
PASS index.astro: ctaAlt + who-for + request note mirrored
```

> **Note on the bare `&` in `Public & policy`:** Astro's template parser treats `.astro` body as an HTML superset, so a bare `&` in text content passes through as a literal `&` (matching the locked copy and the `grep "Public & policy"` check). If `npm run check` (Step 5) or the build (Task 3) rejects it, the only approved fallback is to encode it as `Public &amp; policy` in **both** `index.astro` and `new/index.html`, and then change the verification greps from `Public & policy` to `Public &amp; policy`. Try the bare form first.

- [ ] **Step 3: Append the Impressum section to `about.astro`**

Current `about.astro` tail (exactly):

```astro
    <p class="email"><a href="mailto:hello@misocamp.com?subject=Invitation%20request">hello@misocamp.com</a></p>
  </section>

  <Footer />
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/pages/new/about.astro')
text = path.read_text(encoding='utf-8')
anchor = '  </section>\n\n  <Footer />'
if text.count(anchor) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: about.astro </section>+Footer anchor not found / not unique')
if 'id="impressum"' in text:
    raise SystemExit('BLOCKED prelaunch-copy: about.astro already has impressum section')
impressum = (
    '  </section>\n\n'
    '  <section class="section" id="impressum" aria-labelledby="impressum-label">\n'
    '    <div class="section-label"><span class="num">04</span><h2 class="label" id="impressum-label">Impressum</h2></div>\n'
    '    <p class="imprint">Angaben gemäß § 5 DDG<br><br>Known Unknowns GmbH<br>Fregestraße 65<br>12159 Berlin<br><br>Vertreten durch: Igor Schwarzmann, Geschäftsführer<br>Registergericht: Amtsgericht Charlottenburg, HRB 129945 B<br>USt-IdNr.: DE273843619<br>Kontakt: <a class="accent" href="mailto:hello@misocamp.com">hello@misocamp.com</a></p>\n'
    '  </section>\n\n'
    '  <Footer />'
)
path.write_text(text.replace(anchor, impressum), encoding='utf-8')
print('PASS about.astro: Impressum section appended')
PY
```

Expected output:

```text
PASS about.astro: Impressum section appended
```

- [ ] **Step 4: Add the Impressum link to `Footer.astro`**

Current `Footer.astro` third div (exactly):

```astro
  <div><a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>
```

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from pathlib import Path
path = Path('astro/src/components/Footer.astro')
text = path.read_text(encoding='utf-8')
old = '  <div><a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>'
new = '  <div><a href="/new/about/">About</a> · <a href="/new/about/#impressum">Impressum</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>'
if text.count(old) != 1:
    raise SystemExit('BLOCKED prelaunch-copy: Footer.astro third div not found / not unique')
if '/new/about/#impressum' in text:
    raise SystemExit('BLOCKED prelaunch-copy: Footer.astro already has Impressum link')
path.write_text(text.replace(old, new), encoding='utf-8')
print('PASS Footer.astro: Impressum link added')
PY
```

Expected output:

```text
PASS Footer.astro: Impressum link added
```

- [ ] **Step 5: Refresh `astro/public/new/miso.css` from `new/miso.css`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
cp new/miso.css astro/public/new/miso.css
cmp -s new/miso.css astro/public/new/miso.css && echo 'PASS astro/public/new/miso.css refresh matches new/miso.css' || { echo 'FAIL astro/public/new/miso.css differs'; exit 1; }
```

Expected output:

```text
PASS astro/public/new/miso.css refresh matches new/miso.css
```

- [ ] **Step 6: Run `npm run check` (Astro diagnostics)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run check >/tmp/prelaunch-astro-check.log 2>&1 && echo 'PASS astro check clean' || { echo 'FAIL astro check'; tail -40 /tmp/prelaunch-astro-check.log; exit 1; }
```

Expected output ends with:

```text
PASS astro check clean
```

If this fails on the bare `&` in `Public & policy`, apply the `&amp;` fallback noted in Task 2 Step 2 (in both `index.astro` and `new/index.html`), then re-run. Any other failure that recurs twice → STOP and report `BLOCKED prelaunch-copy: astro check failed — <one-line reason>`.

- [ ] **Step 7: Verify Task 2 (astro sources)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'ctaAlt?: { href: string; label: string };' astro/src/components/Hero.astro && echo 'PASS Hero ctaAlt prop'
grep -Fq 'const { leftMeta, rightMeta, statement, small, minHeight, heroSub, cta, ctaAlt } = Astro.props;' astro/src/components/Hero.astro && echo 'PASS Hero ctaAlt destructure'
grep -Fq '{ctaAlt && <a class="hero-cta-alt" href={ctaAlt.href}>{ctaAlt.label}</a>}' astro/src/components/Hero.astro && echo 'PASS Hero ctaAlt render'
grep -Fq "ctaAlt={{ href: 'mailto:hello@misocamp.com?subject=Partnership', label: 'Partner with us to run a camp ↗' }}" astro/src/pages/new/index.astro && echo 'PASS index.astro passes ctaAlt'
grep -Fq 'Come for your experience, not your AI experience.' astro/src/pages/new/index.astro && echo 'PASS index.astro who-for lead'
grep -Fq '<div class="moves moves-four" style="margin-top:clamp(2rem,3.5vw,3rem)">' astro/src/pages/new/index.astro && echo 'PASS index.astro moves-four'
grep -Fq '<h3>Public & policy</h3>' astro/src/pages/new/index.astro && echo 'PASS index.astro fourth card'
grep -Fq 'Interested in running a version of Make It So Camp — at your university, company, or city? <a class="accent" href="mailto:hello@misocamp.com?subject=Partnership">Partner with us ↗</a>' astro/src/pages/new/index.astro && echo 'PASS index.astro request note'
python3 - <<'PY'
import re
from pathlib import Path
t = Path('astro/src/pages/new/index.astro').read_text(encoding='utf-8')
m = re.search(r'<section class="section" id="who"[^>]*>.*?</section>', t, re.S)
who = m.group(0) if m else ''
for L in ['A','B','C']:
    if f'<span class="num">{L}</span>' in who:
        raise SystemExit(f'FAIL: index.astro card letter {L} still in who-for')
for n in ['01','02','03']:
    if f'<span class="num">{n}</span>' not in t:
        raise SystemExit(f'FAIL: index.astro section-label num {n} missing')
print('PASS index.astro: no A/B/C in who-for; 01/02/03 present')
PY
grep -Fq 'Angaben gemäß § 5 DDG' astro/src/pages/new/about.astro && echo 'PASS about.astro § 5 DDG'
grep -Fq 'HRB 129945 B' astro/src/pages/new/about.astro && echo 'PASS about.astro HRB'
grep -Fq 'DE273843619' astro/src/pages/new/about.astro && echo 'PASS about.astro USt-IdNr'
grep -Fq '<h2 class="label" id="impressum-label">Impressum</h2>' astro/src/pages/new/about.astro && echo 'PASS about.astro impressum label'
python3 - <<'PY'
from pathlib import Path
t = Path('astro/src/pages/new/about.astro').read_text(encoding='utf-8')
for n in ['01','02','03','04']:
    c = t.count(f'<span class="num">{n}</span>')
    if c != 1:
        raise SystemExit(f'FAIL: about.astro num {n} count={c} (want 1)')
print('PASS about.astro: sections numbered 01-04 each once')
PY
grep -Fq '<a href="/new/about/#impressum">Impressum</a>' astro/src/components/Footer.astro && echo 'PASS Footer.astro Impressum link'
cmp -s new/miso.css astro/public/new/miso.css && echo 'PASS astro/public/new/miso.css parity'
```

Expected output ends with:

```text
PASS Hero ctaAlt prop
PASS Hero ctaAlt destructure
PASS Hero ctaAlt render
PASS index.astro passes ctaAlt
PASS index.astro who-for lead
PASS index.astro moves-four
PASS index.astro fourth card
PASS index.astro request note
PASS index.astro: no A/B/C in who-for; 01/02/03 present
PASS about.astro § 5 DDG
PASS about.astro HRB
PASS about.astro USt-IdNr
PASS about.astro impressum label
PASS about.astro: sections numbered 01-04 each once
PASS Footer.astro Impressum link
PASS astro/public/new/miso.css parity
```

- [ ] **Step 8: Commit Task 2**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add astro/src/components/Hero.astro astro/src/pages/new/index.astro astro/src/pages/new/about.astro astro/src/components/Footer.astro astro/public/new/miso.css
git commit -m "feat: mirror partnership CTA, fourth audience, and Impressum in Astro sources"
```

Expected output includes:

```text
[prelaunch-copy
```

## Task 3: Rebuild Astro staging output

**Files:**
- Regenerate: `new/astro/index.html`, `new/astro/tokyo/index.html`, `new/astro/adelaide/index.html`, `new/astro/about/index.html`, `new/astro/miso.css`

**Produces:**
- `npm run build:staging` succeeds; `new/astro/` carries the new copy (hero alt CTA, Who it's for, Request note, Impressum on About, Impressum footer link scoped to `/new/astro/about/#impressum`), the `noindex, nofollow` meta (flipped by the build), unchanged JSON-LD counts, and CSS parity.

- [ ] **Step 1: Run the staging build**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp/astro
npm run build:staging
```

Expected output ends with:

```text
PASS staging artifact: 4 pages, scoped links, noindex, zero scripts, CSS parity
```

If it fails twice, STOP and report `BLOCKED prelaunch-copy: astro build failed — <one-line reason>`. (If the failure is the bare `&` in `Public & policy`, apply the `&amp;` fallback noted in Task 2 Step 2 first.)

- [ ] **Step 2: Verify the astro output carries the copy pass**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
# Hero alt CTA + Request note on the hub (2 partner links each). mailto survives the /new/->/new/astro/ rewrite.
test "$(grep -c 'Partner with us' new/astro/index.html)" = "2" && echo 'PASS astro hub: 2 "Partner with us"'
test "$(grep -F 'subject=Partnership' new/astro/index.html | wc -l | tr -d " ")" = "2" && echo 'PASS astro hub: 2 subject=Partnership'
grep -Fq 'Come for your experience, not your AI experience.' new/astro/index.html && echo 'PASS astro hub who-for lead'
grep -Fq '<h3>Public & policy</h3>' new/astro/index.html && echo 'PASS astro hub fourth card' || { grep -Fq '<h3>Public &amp; policy</h3>' new/astro/index.html && echo 'PASS astro hub fourth card (encoded)' || { echo 'FAIL astro hub fourth card'; exit 1; }; }
grep -Fq 'moves moves-four' new/astro/index.html && echo 'PASS astro hub moves-four'
# Impressum on About (both the link and the section).
grep -Fq 'Angaben gemäß § 5 DDG' new/astro/about/index.html && echo 'PASS astro About § 5 DDG'
grep -Fq 'HRB 129945 B' new/astro/about/index.html && echo 'PASS astro About HRB'
grep -Fq 'DE273843619' new/astro/about/index.html && echo 'PASS astro About USt-IdNr'
# Footer Impressum link scoped to /new/astro/ on all four astro pages.
for f in new/astro/index.html new/astro/tokyo/index.html new/astro/adelaide/index.html new/astro/about/index.html; do
  grep -Fq '<a href="/new/astro/about/#impressum">Impressum</a>' "$f" && echo "PASS astro footer Impressum $f" || { echo "FAIL astro footer Impressum $f"; exit 1; }
done
# JSON-LD counts unchanged by this pass.
for pair in "new/astro/index.html:1" "new/astro/tokyo/index.html:2" "new/astro/adelaide/index.html:2" "new/astro/about/index.html:3"; do
  file="${pair%%:*}"; want="${pair##*:}"
  got=$(grep -c 'application/ld+json' "$file")
  test "$got" = "$want" && echo "PASS $file has $want ld+json scripts" || { echo "FAIL $file has $got, want $want"; exit 1; }
done
# noindex still present on astro output.
for f in new/astro/index.html new/astro/tokyo/index.html new/astro/adelaide/index.html new/astro/about/index.html; do
  grep -Fq 'content="noindex, nofollow"' "$f" || { echo "FAIL noindex missing $f"; exit 1; }
done
echo 'PASS astro noindex all four'
# CSS parity for the three new rules.
grep -Fq '.hero-cta-alt { margin-left:1.4rem; }' new/astro/miso.css && echo 'PASS astro miso.css hero-cta-alt'
grep -Fq '.moves-four { grid-template-columns:repeat(4, 1fr); }' new/astro/miso.css && echo 'PASS astro miso.css moves-four'
grep -Fq '.imprint { font-size:0.85rem; line-height:1.65; color:var(--muted); }' new/astro/miso.css && echo 'PASS astro miso.css imprint'
```

Expected output ends with:

```text
PASS astro noindex all four
PASS astro miso.css hero-cta-alt
PASS astro miso.css moves-four
PASS astro miso.css imprint
```

- [ ] **Step 3: Commit Task 3**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add new/astro
git commit -m "build: regenerate Astro staging preview with prelaunch copy"
```

Expected output includes:

```text
[prelaunch-copy
```

## Task 4: Final verification across both tracks

**Files:**
- Create: `docs/plans/prelaunch-copy-screenshots/` (optional, only if Chrome is available)

**Produces:**
- Deterministic verification pass across the static and astro tracks: the partnership CTA and Request note present (2 per track), the Who it's for rewrite, the Impressum block (byte-exact German), the footer Impressum link on all pages, footer byte-identity, no card letters in Who it's for, section-label nums intact, About numbered 01–04, JSON-LD still parses, noindex still present, tag balance, protected paths untouched; optional screenshots on port 8812 / CDP 9428 (never 8765).

- [ ] **Step 1: Branch + changed-file scope; protected paths untouched**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test "$(git branch --show-current)" = "prelaunch-copy" && echo 'PASS on branch prelaunch-copy'
python3 - <<'PY'
import subprocess
allowed = {
  'new/miso.css',
  'new/index.html', 'new/tokyo/index.html', 'new/adelaide/index.html', 'new/about/index.html',
  'astro/src/components/Hero.astro',
  'astro/src/components/Footer.astro',
  'astro/src/pages/new/index.astro',
  'astro/src/pages/new/about.astro',
  'astro/public/new/miso.css',
  'new/astro/index.html', 'new/astro/tokyo/index.html', 'new/astro/adelaide/index.html', 'new/astro/about/index.html', 'new/astro/miso.css',
  'docs/plans/2026-07-17-prelaunch-copy.md',
}
changed = set(subprocess.check_output(['git', 'diff', '--name-only', 'master...HEAD'], text=True).splitlines())
extra = sorted(p for p in changed if p not in allowed and not p.startswith('docs/plans/prelaunch-copy-screenshots/'))
if extra:
    raise SystemExit('FAIL unexpected changed files: ' + ', '.join(extra))
forbidden = {p for p in changed if p in {'CNAME', 'index.html', '_session.md'} or p.endswith('/_session.md') or 'astro/scripts/build-staging.mjs' in p}
if forbidden:
    raise SystemExit('FAIL protected path touched: ' + ', '.join(forbidden))
print('PASS changed files limited to prelaunch-copy scope; protected paths untouched')
PY
```

Expected output:

```text
PASS on branch prelaunch-copy
PASS changed files limited to prelaunch-copy scope; protected paths untouched
```

- [ ] **Step 2: Partnership copy — `Partner with us` and `subject=Partnership`, 2 per track**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
# Static track: only the hub carries these (2); camp/About pages carry none.
static_pw=$(for f in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html; do grep -o 'Partner with us' "$f"; done | wc -l | tr -d ' ')
test "$static_pw" = "2" && echo 'PASS static "Partner with us" x2' || { echo "FAIL static \"Partner with us\" count=$static_pw (want 2)"; exit 1; }
static_sp=$(for f in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html; do grep -oF 'subject=Partnership' "$f"; done | wc -l | tr -d ' ')
test "$static_sp" = "2" && echo 'PASS static subject=Partnership x2' || { echo "FAIL static subject=Partnership count=$static_sp (want 2)"; exit 1; }
# Astro track: 2 on the hub.
test "$(grep -r 'Partner with us' new/astro --include='*.html' | wc -l | tr -d " ")" = "2" && echo 'PASS astro "Partner with us" x2' || { echo 'FAIL astro "Partner with us" count'; exit 1; }
test "$(grep -rF 'subject=Partnership' new/astro --include='*.html' | wc -l | tr -d " ")" = "2" && echo 'PASS astro subject=Partnership x2' || { echo 'FAIL astro subject=Partnership count'; exit 1; }
```

Expected output:

```text
PASS static "Partner with us" x2
PASS static subject=Partnership x2
PASS astro "Partner with us" x2
PASS astro subject=Partnership x2
```

- [ ] **Step 3: Who it's for rewrite — lead, fourth card, moves-four, no card letters, nums intact**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for track in "new/index.html" "new/astro/index.html"; do
  grep -Fq 'Come for your experience, not your AI experience.' "$track" && echo "PASS $track who-for lead" || { echo "FAIL $track who-for lead"; exit 1; }
  grep -Fq 'moves moves-four' "$track" && echo "PASS $track moves-four" || { echo "FAIL $track moves-four"; exit 1; }
  grep -Fq 'Public & policy</h3>' "$track" && echo "PASS $track fourth card" || grep -Fq 'Public &amp; policy</h3>' "$track" && echo "PASS $track fourth card (encoded)" || { echo "FAIL $track fourth card"; exit 1; }
  python3 - "$track" <<'PY'
import re, sys
from pathlib import Path
p = sys.argv[1]
t = Path(p).read_text(encoding='utf-8')
m = re.search(r'<section class="section" id="who"[^>]*>.*?</section>', t, re.S)
who = m.group(0) if m else ''
for L in ['A','B','C']:
    if f'<span class="num">{L}</span>' in who:
        raise SystemExit(f'FAIL {p}: card letter {L} in who-for')
for n in ['01','02','03']:
    if f'<span class="num">{n}</span>' not in t:
        raise SystemExit(f'FAIL {p}: section-label num {n} missing')
print(f'PASS {p}: no A/B/C in who-for; 01/02/03 present')
PY
done
```

Expected output:

```text
PASS new/index.html who-for lead
PASS new/index.html moves-four
PASS new/index.html fourth card
PASS new/index.html: no A/B/C in who-for; 01/02/03 present
PASS new/astro/index.html who-for lead
PASS new/astro/index.html moves-four
PASS new/astro/index.html fourth card
PASS new/astro/index.html: no A/B/C in who-for; 01/02/03 present
```

- [ ] **Step 4: Impressum block present once on About, both tracks (byte-exact German)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for f in new/about/index.html new/astro/about/index.html; do
  for s in "§ 5 DDG" "HRB 129945 B" "DE273843619" "Fregestraße 65" "gemäß" "Geschäftsführer"; do
    c=$(grep -Fc "$s" "$f")
    test "$c" = "1" && echo "PASS $f :: $s (x1)" || { echo "FAIL $f :: $s count=$c (want 1)"; exit 1; }
  done
  # Section numbered 01-04 on About.
  python3 - "$f" <<'PY'
import sys
from pathlib import Path
t = Path(sys.argv[1]).read_text(encoding='utf-8')
for n in ['01','02','03','04']:
    c = t.count(f'<span class="num">{n}</span>')
    if c != 1:
        raise SystemExit(f'FAIL {sys.argv[1]}: num {n} count={c} (want 1)')
print(f'PASS {sys.argv[1]}: sections 01-04 each once')
PY
done
```

Expected output ends with:

```text
PASS new/about/index.html: sections 01-04 each once
PASS new/astro/about/index.html: sections 01-04 each once
```

- [ ] **Step 5: Footer Impressum link on all pages, both tracks; byte-identity holds**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
import re, hashlib
from pathlib import Path
fr = re.compile(r'  <footer class="footer">\n.*?\n  </footer>', re.S)

# Static track: identical across all four, each with /new/about/#impressum.
static_hashes = {}
for rel in ['new/index.html','new/tokyo/index.html','new/adelaide/index.html','new/about/index.html']:
    t = Path(rel).read_text(encoding='utf-8')
    if '<a href="/new/about/#impressum">Impressum</a>' not in t:
        raise SystemExit(f'FAIL {rel}: footer missing Impressum link')
    m = fr.search(t)
    static_hashes[rel] = hashlib.sha256(m.group(0).encode()).hexdigest()[:12]
if len(set(static_hashes.values())) != 1:
    raise SystemExit(f'FAIL static footers differ: {static_hashes}')
print('PASS static footers byte-identical and carry Impressum link')

# Astro track: identical across all four, each scoped to /new/astro/about/#impressum.
astro_hashes = {}
for rel in ['new/astro/index.html','new/astro/tokyo/index.html','new/astro/adelaide/index.html','new/astro/about/index.html']:
    t = Path(rel).read_text(encoding='utf-8')
    if '<a href="/new/astro/about/#impressum">Impressum</a>' not in t:
        raise SystemExit(f'FAIL {rel}: astro footer missing scoped Impressum link')
    m = fr.search(t)
    astro_hashes[rel] = hashlib.sha256(m.group(0).encode()).hexdigest()[:12]
if len(set(astro_hashes.values())) != 1:
    raise SystemExit(f'FAIL astro footers differ: {astro_hashes}')
print('PASS astro footers byte-identical and carry scoped Impressum link')
PY
```

Expected output:

```text
PASS static footers byte-identical and carry Impressum link
PASS astro footers byte-identical and carry scoped Impressum link
```

- [ ] **Step 6: noindex still present; JSON-LD blocks still parse (counts unchanged)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for f in new/index.html new/tokyo/index.html new/adelaide/index.html new/about/index.html new/astro/index.html new/astro/tokyo/index.html new/astro/adelaide/index.html new/astro/about/index.html; do
  grep -Fq 'content="noindex, nofollow"' "$f" || { echo "FAIL noindex missing $f"; exit 1; }
done
echo 'PASS noindex present on all 8 pages'
for pair in \
  "new/index.html:1" "new/tokyo/index.html:2" "new/adelaide/index.html:2" "new/about/index.html:3" \
  "new/astro/index.html:1" "new/astro/tokyo/index.html:2" "new/astro/adelaide/index.html:2" "new/astro/about/index.html:3"; do
  file="${pair%%:*}"; want="${pair##*:}"
  got=$(grep -c 'application/ld+json' "$file")
  test "$got" = "$want" && echo "PASS $file ld+json x$want" || { echo "FAIL $file ld+json $got want $want"; exit 1; }
done
python3 - <<'PY'
import json, re
from pathlib import Path
for rel in ['new/index.html','new/tokyo/index.html','new/adelaide/index.html','new/about/index.html',
            'new/astro/index.html','new/astro/tokyo/index.html','new/astro/adelaide/index.html','new/astro/about/index.html']:
    text = Path(rel).read_text(encoding='utf-8')
    blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S)
    for i, b in enumerate(blocks):
        try:
            json.loads(b)
        except Exception as e:
            raise SystemExit(f'FAIL invalid JSON-LD in {rel} block {i}: {e}')
    print(f'PASS {rel} JSON-LD parses ({len(blocks)})')
PY
```

Expected output: 1 noindex PASS + 8 count PASS + 8 parse PASS lines.

- [ ] **Step 7: Tag balance across all 8 pages; banned language absent; footers unchanged elsewhere**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class B(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=True); self.stack=[]
    def handle_starttag(self,t,a):
        if t not in VOID: self.stack.append(t)
    def handle_startendtag(self,t,a): pass
    def handle_endtag(self,t):
        if t in VOID: return
        if not self.stack or self.stack[-1]!=t: raise SystemExit(f'FAIL unbalanced </{t}>; stack={self.stack}')
        self.stack.pop()
for p in ['new/index.html','new/tokyo/index.html','new/adelaide/index.html','new/about/index.html',
          'new/astro/index.html','new/astro/tokyo/index.html','new/astro/adelaide/index.html','new/astro/about/index.html']:
    pr=B(); pr.feed(Path(p).read_text(encoding='utf-8')); pr.close()
    if pr.stack: raise SystemExit(f'FAIL unclosed in {p}: {pr.stack}')
    print(f'PASS tag-balanced {p}')
PY
if grep -RniE 'free pilot|supporting partner|Supported by|laptops closed|On paper' new astro/src new/astro --include='*.html' --include='*.astro' | grep -q .; then echo 'FAIL banned language'; exit 1; else echo 'PASS banned language absent'; fi
# No card letters anywhere in who-for (defensive: no <span class="num">A/B/C anywhere on hub sources).
if grep -RIn '<span class="num">A</span>\|<span class="num">B</span>\|<span class="num">C</span>' new/index.html astro/src/pages/new/index.astro new/astro/index.html | grep -q .; then echo 'FAIL card letter span remains (any track)'; exit 1; else echo 'PASS no A/B/C card spans anywhere'; fi
```

Expected output includes the 8 `PASS tag-balanced …` lines, `PASS banned language absent`, and `PASS no A/B/C card spans anywhere`.

- [ ] **Step 8: Non-ASCII load-bearing strings intact (both tracks)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'Fregestraße 65' new/about/index.html && grep -Fq 'Fregestraße 65' new/astro/about/index.html && echo 'PASS Fregestraße (ß) both tracks'
grep -Fq 'gemäß § 5 DDG' new/about/index.html && grep -Fq 'gemäß § 5 DDG' new/astro/about/index.html && echo 'PASS gemäß § both tracks'
grep -Fq 'Geschäftsführer' new/about/index.html && grep -Fq 'Geschäftsführer' new/astro/about/index.html && echo 'PASS Geschäftsführer both tracks'
grep -Fq 'Crypto Café Tokyo' new/tokyo/index.html && grep -Fq 'Crypto Café Tokyo' new/astro/tokyo/index.html && echo 'PASS Café both tracks'
grep -Fq 'Tokyo · Adelaide · 2026' new/index.html && grep -Fq 'Tokyo · Adelaide · 2026' new/astro/index.html && echo 'PASS middot both tracks'
grep -Fq 'Request an invitation ↗' new/index.html && grep -Fq 'Partner with us to run a camp ↗' new/index.html && echo 'PASS arrows static hub'
```

Expected output: 6 PASS lines.

- [ ] **Step 9: Optional screenshots on required ports (8812 / CDP 9428; never 8765)**

If Google Chrome is unavailable, report `BLOCKED prelaunch-plan: Chrome unavailable for optional screenshots` and skip — the deterministic checks above are authoritative. Do NOT halt the plan on screenshot failure; the Task 4 commit (Step 10) still proceeds without screenshots.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if lsof -ti:8812 >/dev/null 2>&1; then echo 'BLOCKED prelaunch-copy: port 8812 occupied'; exit 1; fi
if lsof -ti:9428 >/dev/null 2>&1; then echo 'BLOCKED prelaunch-copy: CDP port 9428 occupied'; exit 1; fi
# 8765 must never be used by this step.
if lsof -ti:8765 >/dev/null 2>&1; then echo 'NOTE port 8765 in use (must not be used here)'; fi
python3 -m http.server 8812 >/tmp/prelaunch-http.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
  if [ -n "${CHROME_PID:-}" ]; then kill "$CHROME_PID" >/dev/null 2>&1 || true; fi
  rm -rf /tmp/prelaunch-cdp 2>/dev/null || true
}
trap cleanup EXIT
sleep 1
mkdir -p docs/plans/prelaunch-copy-screenshots
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then echo 'NOTE Chrome unavailable; skipping screenshots'; exit 0; fi
"$CHROME" --headless --disable-gpu --remote-debugging-port=9428 --user-data-dir=/tmp/prelaunch-cdp about:blank >/dev/null 2>&1 &
CHROME_PID=$!
sleep 2
node - <<'NODEEOF'
(async () => {
const list = await (await fetch('http://localhost:9428/json/list')).json();
const target = list.find(t => t.type === 'page');
if (!target) { console.error('FAIL no CDP page target'); process.exit(1); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0; const pend = new Map();
const send = (method, params={}) => new Promise((resolve, reject) => {
  const i = ++id; pend.set(i, {resolve, reject}); ws.send(JSON.stringify({id:i, method, params}));
});
await new Promise(resolve => ws.onopen = resolve);
ws.onmessage = event => {
  const m = JSON.parse(event.data);
  if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.reject(new Error(JSON.stringify(m.error))) : p.resolve(m.result); }
};
await send('Page.enable');
let failed = false;
const pages = [
  { path: '/new/', slug: 'hub' },
  { path: '/new/about/', slug: 'about' },
];
for (const page of pages) {
  for (const width of [1440, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 1600, deviceScaleFactor: 2, mobile: width < 900 });
    await send('Page.navigate', { url: 'http://127.0.0.1:8812' + page.path });
    await new Promise(r => setTimeout(r, 1200));
    const overflow = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth > document.documentElement.clientWidth', returnByValue: true });
    if (overflow.result.value) { console.error('FAIL overflow at ' + page.path + ' width ' + width); failed = true; }
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x:0, y:0, width, height: 3200, scale: 1 } });
    require('fs').writeFileSync('docs/plans/prelaunch-copy-screenshots/' + page.slug + '-' + width + '.png', Buffer.from(shot.data, 'base64'));
  }
}
ws.close();
if (failed) { console.log('FAIL screenshot overflow check'); process.exit(1); }
console.log('PASS screenshots saved for hub and about at 1440 and 390');
})();
NODEEOF
```

Expected output ends with (if Chrome is available):

```text
PASS screenshots saved for hub and about at 1440 and 390
```

- [ ] **Step 10: Commit Task 4 (screenshots, if produced)**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if [ -d docs/plans/prelaunch-copy-screenshots ] && [ -n "$(ls -A docs/plans/prelaunch-copy-screenshots 2>/dev/null)" ]; then
  git add docs/plans/prelaunch-copy-screenshots
  git commit -m "test: verify prelaunch copy pass"
else
  echo 'NOTE no screenshots produced; Task 4 was deterministic (no screenshot commit)'
fi
```

Expected output either includes `[prelaunch-copy` for a commit, or the NOTE line.

- [ ] **Step 11: Final report**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
echo "Prelaunch copy pass complete on branch prelaunch-copy."
git log --oneline master..HEAD
git status --short
```

Expected output: the task commits (`feat: add partnership CTA…`, `feat: mirror partnership CTA…`, `build: regenerate Astro staging preview…`, optionally `test: verify prelaunch copy pass`) and a clean working tree (the pre-existing untracked `.superpowers/`, `MISo Camp - Sponsorship Deck v2.md`, `partnership-deck.html` may still show as untracked — they are out of scope and must NOT be staged).

## Cross-cutting verification recap (what "done" means)

- `Partner with us` appears **twice** per track (hero + Request note): 2 in the static track (hub only), 2 in the astro track (hub only). `subject=Partnership` likewise **twice** per track (Task 4 Step 2).
- Hub Who it's for on both tracks: lead is `Come for your experience, not your AI experience.`; cards grid is `moves moves-four`; a fourth card `Public & policy` is present; **no** `<span class="num">A/B/C</span>` inside `#who`; section-label `01/02/03` (and 04/05) still present (Task 4 Step 3).
- Request section (05) on the hub carries the partnership note after the big email line (Task 4 Step 2/3).
- About on both tracks: Impressum section (number `04`, `id="impressum"`) appended after Request; `§ 5 DDG`, `HRB 129945 B`, `DE273843619`, `Fregestraße 65`, `gemäß`, `Geschäftsführer` each present **exactly once**; About sections numbered 01–04 (Task 4 Steps 4 and 8).
- Footer on all four pages, both tracks: carries the Impressum link (`/new/about/#impressum` static, `/new/astro/about/#impressum` astro); footers byte-identical within each track (Task 4 Step 5).
- noindex still present on all 8 pages; JSON-LD counts unchanged (hub 1, Tokyo 2, Adelaide 2, About 3) and all blocks parse (Task 4 Step 6).
- Tag balance across all 8 pages; banned language absent; no A/B/C card spans anywhere (Task 4 Step 7).
- Branch `prelaunch-copy` off `master`; protected paths (`CNAME`, root `index.html`, `_session.md`, `astro/scripts/build-staging.mjs`) untouched (Task 4 Step 1).
- One commit per task with the exact messages shown; STOP after two failures on any step.
- Report `DONE prelaunch-plan: wrote the plan` (or `BLOCKED prelaunch-plan: <reason>`) to the herdr pane when the **plan itself** is written. The **executor** of this plan reports `DONE prelaunch-copy: <summary>` (or `BLOCKED prelaunch-copy: <reason>`) only after Task 4 passes.

## Open decisions flagged (not this plan's lane)

- **Bare `&` in `Public & policy`.** The locked copy uses a literal `&`. Both the static HTML and Astro templates are expected to pass it through unchanged so `grep "Public & policy"` matches. If `astro check` or the build rejects the bare ampersand, the only approved fallback is `&amp;` in **both** `index.astro` and `new/index.html`, with the two `Public & policy` greps in Task 4 Step 3 changed to `Public &amp; policy`. The visible rendering is identical either way.
- **Canonical/robots posture.** Static pages stay `noindex, nofollow` (staging); the launch cut-over to `index, follow` and the root-path canonical/redirect decision are out of scope and unchanged by this plan.
- **Adelaide venue.** Stays `TBD` / `Venue to be announced` until separately locked; untouched here (only the footer line on the Adelaide page is edited).