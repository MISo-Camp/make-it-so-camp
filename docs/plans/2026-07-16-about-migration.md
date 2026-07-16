# About Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. If any step fails twice, STOP and report `BLOCKED about-migration: <one-line reason>`.

**Goal:** Migrate `/new/about/` from the old warm-serif stylesheet to the approved Swiss poster system and retire `new/styles.css`.

**Architecture:** Static HTML only. The About page becomes a direct instance of the live `/new/miso.css` system, using the hub header/footer patterns and the hub footer as the byte-identity reference. No CSS is added unless a class is genuinely missing; for this plan, no CSS additions are needed.

**Tech Stack:** Static HTML, existing `/new/miso.css`, Git, Python 3 standard library, Chrome DevTools Protocol via headless Chrome and Node WebSocket. No build tool and no JavaScript shipped to the site.

## Global Constraints

- Work on branch `about-migration`, from current `master`.
- Touch only `new/about/index.html`, `new/styles.css`, and `docs/plans/about-migration-screenshots/` during implementation.
- Do not modify `_session.md` or workspace state files.
- The About page uses `/new/miso.css` only; it must not reference `new/styles.css` or `/new/styles.css`.
- After rewriting About, verify no file under `new/` references `styles.css`; if anything does, STOP before removing `new/styles.css`.
- Remove `new/styles.css` with `git rm new/styles.css`.
- Email-only CTA: `mailto:hello@misocamp.com?subject=Invitation%20request`.
- No forms, no cost language, no `free pilot`, no horizontal rules.
- Founder bio copy is locked verbatim from the approved spec; do not rewrite it.
- Founder names link out exactly: Igor Schwarzmann to `https://igorschwarzmann.com`, Noah Raford to `https://www.noahraford.com`; append ` ↗` to each linked name.
- Footer block must be byte-identical to the hub footer block in `new/index.html`.
- Non-ASCII characters are load-bearing: middots `·`, arrows `↗`, the title/footer em dash `—`, and the em dash in `Futurist-in-Chief —`.
- One commit per task, with the exact commit messages shown below.

## File Structure

- `new/about/index.html`: full replacement using the approved About template and copy.
- `new/styles.css`: remove after confirming nothing under `new/` references it.
- `docs/plans/about-migration-screenshots/`: generated verification screenshots only.

### Task 1: Replace About page and remove the old stylesheet

**Files:**
- Modify: `new/about/index.html`
- Delete: `new/styles.css`

**Produces:**
- A complete About page on the Swiss `/new/miso.css` system.
- No remaining `styles.css` references under `new/`.
- The old `new/styles.css` removed from Git.

- [ ] **Step 1: Create the branch from current `master`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git fetch origin
git switch master >/dev/null
git pull --ff-only origin master
if git show-ref --verify --quiet refs/heads/about-migration; then echo "BLOCKED about-migration: branch about-migration already exists"; exit 1; fi
git switch -c about-migration >/dev/null
test "$(git branch --show-current)" = "about-migration" && echo "PASS on branch about-migration"
```

Expected output ends with:

```text
PASS on branch about-migration
```

- [ ] **Step 2: Replace `new/about/index.html` with this complete file**

```bash
mkdir -p new/about
cat > new/about/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About — Make It So Camp</title>
  <meta name="description" content="Make It So Camp was created by Igor Schwarzmann and Noah Raford. A selective two-day AI workshop. Tokyo and Adelaide, 2026.">
  <meta name="author" content="Make It So Camp">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://misocamp.com/new/about/">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://misocamp.com/new/about/">
  <meta property="og:site_name" content="Make It So Camp">
  <meta property="og:title" content="About — Make It So Camp">
  <meta property="og:description" content="Make It So Camp was created by Igor Schwarzmann and Noah Raford. A selective two-day AI workshop. Tokyo and Adelaide, 2026.">
  <meta property="og:image" content="https://misocamp.com/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="About — Make It So Camp">
  <meta name="twitter:description" content="Make It So Camp was created by Igor Schwarzmann and Noah Raford. A selective two-day AI workshop. Tokyo and Adelaide, 2026.">
  <meta name="twitter:image" content="https://misocamp.com/og-image.jpg">
  <link rel="stylesheet" href="/new/miso.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/new/">Make It So Camp</a>
    <nav class="nav" aria-label="Primary">
      <a href="/new/">Home</a>
      <a href="/new/tokyo/">Tokyo</a>
      <a href="/new/adelaide/">Adelaide</a>
      <a href="mailto:hello@misocamp.com?subject=Invitation%20request" class="accent">Request an invitation</a>
    </nav>
  </header>

  <section class="hero" style="min-height:38svh">
    <div class="hero-top">
      <p class="meta light">About</p>
      <p class="meta">Two-day AI workshop<br><span class="light">Tokyo · Adelaide · 2026</span></p>
    </div>
    <div class="spacer"></div>
    <h1 class="statement statement-sm">Who's behind this.</h1>
  </section>

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

  <footer class="footer">
    <div>Make It So Camp — created by <a href="/new/about/">Igor Schwarzmann and Noah Raford</a></div>
    <div class="collab light">In collaboration with Chiba Institute of Technology, Flinders University New Venture Institute, and SA Futures Agency.</div>
    <div><a href="/new/about/">About</a> · <a href="mailto:hello@misocamp.com">hello@misocamp.com</a></div>
  </footer>
</body>
</html>
EOF
```

- [ ] **Step 3: Verify required About strings and forbidden old-system strings**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for needle in \
  '/new/miso.css' \
  'statement-sm' \
  'https://igorschwarzmann.com' \
  'https://www.noahraford.com' \
  'Managing Partner at EMIR' \
  'PhD from MIT' \
  'Museum of the Future'; do
  grep -Fq "$needle" new/about/index.html && echo "PASS present: $needle"
done
grep -Eiq 'styles\.css|bio-card|doc-header|free pilot|Two complementary practices' new/about/index.html && { echo 'FAIL forbidden old About string present'; exit 1; } || echo 'PASS forbidden old About strings absent'
```

Expected output:

```text
PASS present: /new/miso.css
PASS present: statement-sm
PASS present: https://igorschwarzmann.com
PASS present: https://www.noahraford.com
PASS present: Managing Partner at EMIR
PASS present: PhD from MIT
PASS present: Museum of the Future
PASS forbidden old About strings absent
```

- [ ] **Step 4: Verify non-ASCII strings are byte-exact**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'About — Make It So Camp' new/about/index.html && echo 'PASS title em dash byte-exact'
grep -Fq 'Tokyo · Adelaide · 2026' new/about/index.html && echo 'PASS middots byte-exact'
grep -Fq 'Igor Schwarzmann ↗' new/about/index.html && echo 'PASS Igor arrow byte-exact'
grep -Fq 'Noah Raford ↗' new/about/index.html && echo 'PASS Noah arrow byte-exact'
grep -Fq 'Futurist-in-Chief —' new/about/index.html && echo 'PASS Futurist-in-Chief em dash byte-exact'
grep -Fq 'Make It So Camp — created by' new/about/index.html && echo 'PASS footer em dash byte-exact'
```

Expected output:

```text
PASS title em dash byte-exact
PASS middots byte-exact
PASS Igor arrow byte-exact
PASS Noah arrow byte-exact
PASS Futurist-in-Chief em dash byte-exact
PASS footer em dash byte-exact
```

- [ ] **Step 5: Verify nothing under `new/` references `styles.css`, then remove the old stylesheet**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if grep -rn 'styles.css' new/; then
  echo 'BLOCKED about-migration: styles.css still referenced under new/'
  exit 1
else
  echo 'PASS no styles.css references under new/'
fi
git rm new/styles.css
test ! -e new/styles.css && echo 'PASS new/styles.css removed from working tree'
```

Expected output:

```text
PASS no styles.css references under new/
rm 'new/styles.css'
PASS new/styles.css removed from working tree
```

- [ ] **Step 6: Commit Task 1**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add new/about/index.html
git commit -m "feat: migrate About page to Swiss system"
```

Expected output includes:

```text
[about-migration
```

### Task 2: Final verification and screenshots

**Files:**
- Create: `docs/plans/about-migration-screenshots/`

**Consumes:**
- Task 1 About page replacement.
- Task 1 removal of `new/styles.css`.
- Hub footer in `new/index.html` as the byte-identity reference.

**Produces:**
- Static verification output for the approved spec.
- Two screenshots: About at 1440px and 390px.
- A final verification commit.

- [ ] **Step 1: Verify branch, changed site files, stylesheet removal, required strings, and forbidden strings**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
test "$(git branch --show-current)" = "about-migration" && echo 'PASS on branch about-migration'
python3 - <<'PY'
from pathlib import Path
import subprocess
expected = ['new/about/index.html', 'new/styles.css']
base = subprocess.run(['git', 'merge-base', 'master', 'HEAD'], check=True, capture_output=True, text=True).stdout.strip()
result = subprocess.run(['git', 'diff', '--name-only', base, 'HEAD', '--', 'new'], check=True, capture_output=True, text=True)
actual = sorted(line for line in result.stdout.splitlines() if line)
if actual != expected:
    raise SystemExit(f'FAIL unexpected changed site files: {actual}')
print('PASS only About page and old stylesheet changed under new/')
PY
test ! -e new/styles.css && echo 'PASS new/styles.css absent'
if grep -rn 'styles.css' new/; then echo 'FAIL styles.css reference remains under new/'; exit 1; else echo 'PASS no styles.css references under new/'; fi
for needle in \
  '/new/miso.css' \
  'statement-sm' \
  'https://igorschwarzmann.com' \
  'https://www.noahraford.com' \
  'Managing Partner at EMIR' \
  'PhD from MIT' \
  'Museum of the Future' \
  'In collaboration with Chiba Institute of Technology' \
  'Flinders University New Venture Institute, with SA Futures Agency as a supporting partner' \
  'mailto:hello@misocamp.com?subject=Invitation%20request'; do
  grep -Fq "$needle" new/about/index.html && echo "PASS present: $needle"
done
grep -Eiq 'styles\.css|bio-card|doc-header|free pilot|Two complementary practices|<form|formspree|cost|price' new/about/index.html && { echo 'FAIL forbidden string present on About'; exit 1; } || echo 'PASS forbidden strings absent on About'
```

Expected output:

```text
PASS on branch about-migration
PASS only About page and old stylesheet changed under new/
PASS new/styles.css absent
PASS no styles.css references under new/
PASS present: /new/miso.css
PASS present: statement-sm
PASS present: https://igorschwarzmann.com
PASS present: https://www.noahraford.com
PASS present: Managing Partner at EMIR
PASS present: PhD from MIT
PASS present: Museum of the Future
PASS present: In collaboration with Chiba Institute of Technology
PASS present: Flinders University New Venture Institute, with SA Futures Agency as a supporting partner
PASS present: mailto:hello@misocamp.com?subject=Invitation%20request
PASS forbidden strings absent on About
```

- [ ] **Step 2: Verify non-ASCII strings are byte-exact**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
grep -Fq 'About — Make It So Camp' new/about/index.html && echo 'PASS title em dash byte-exact'
grep -Fq 'Tokyo · Adelaide · 2026' new/about/index.html && echo 'PASS middots byte-exact'
grep -Fq 'Igor Schwarzmann ↗' new/about/index.html && echo 'PASS Igor arrow byte-exact'
grep -Fq 'Noah Raford ↗' new/about/index.html && echo 'PASS Noah arrow byte-exact'
grep -Fq 'Futurist-in-Chief —' new/about/index.html && echo 'PASS Futurist-in-Chief em dash byte-exact'
grep -Fq 'Make It So Camp — created by' new/about/index.html && echo 'PASS footer em dash byte-exact'
```

Expected output:

```text
PASS title em dash byte-exact
PASS middots byte-exact
PASS Igor arrow byte-exact
PASS Noah arrow byte-exact
PASS Futurist-in-Chief em dash byte-exact
PASS footer em dash byte-exact
```

- [ ] **Step 3: Verify footer block is byte-identical to the hub footer by extraction and `diff`**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
set -e
python3 - <<'PY'
from pathlib import Path
import re
footer_re = re.compile(r'  <footer class="footer">\n.*?\n  </footer>', re.S)
hub_match = footer_re.search(Path('new/index.html').read_text())
about_match = footer_re.search(Path('new/about/index.html').read_text())
if not hub_match:
    raise SystemExit('FAIL hub footer block not found')
if not about_match:
    raise SystemExit('FAIL About footer block not found')
Path('/tmp/about-migration-hub-footer.txt').write_text(hub_match.group(0))
Path('/tmp/about-migration-about-footer.txt').write_text(about_match.group(0))
PY
diff -u /tmp/about-migration-hub-footer.txt /tmp/about-migration-about-footer.txt
echo 'PASS footer byte-identical to hub'
```

Expected output:

```text
PASS footer byte-identical to hub
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

path = Path('new/about/index.html')
parser = BalanceParser()
parser.feed(path.read_text())
parser.close()
if parser.stack:
    raise SystemExit(f'FAIL unclosed tags in {path}: {parser.stack}')
print(f'PASS tag-balanced {path}')
PY
```

Expected output:

```text
PASS tag-balanced new/about/index.html
```

- [ ] **Step 5: Capture CDP screenshots for About at 1440px and 390px, and verify no horizontal overflow**

If Google Chrome is unavailable, STOP and report `BLOCKED about-migration: Chrome unavailable for required screenshots`.

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
if lsof -ti:8798 >/dev/null 2>&1; then echo 'BLOCKED about-migration: port 8798 occupied'; exit 1; fi
if lsof -ti:9422 >/dev/null 2>&1; then echo 'BLOCKED about-migration: CDP port 9422 occupied'; exit 1; fi
python3 -m http.server 8798 >/tmp/miso-about-migration-http.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" >/dev/null 2>&1 || true
  if [ -n "${CHROME_PID:-}" ]; then kill "$CHROME_PID" >/dev/null 2>&1 || true; fi
  rm -rf /tmp/about-migration-cdp 2>/dev/null || true
}
trap cleanup EXIT
sleep 1
mkdir -p docs/plans/about-migration-screenshots
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then echo 'BLOCKED about-migration: Chrome unavailable for required screenshots'; exit 1; fi
"$CHROME" --headless --disable-gpu --remote-debugging-port=9422 --user-data-dir=/tmp/about-migration-cdp about:blank >/dev/null 2>&1 &
CHROME_PID=$!
sleep 2
node - <<'NODEEOF'
(async () => {
const list = await (await fetch('http://localhost:9422/json/list')).json();
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
for (const width of [1440, 390]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 1100, deviceScaleFactor: 2, mobile: width < 900 });
  await send('Page.navigate', { url: 'http://127.0.0.1:8798/new/about/' });
  await new Promise(resolve => setTimeout(resolve, 1200));
  const overflow = await send('Runtime.evaluate', { expression: 'document.documentElement.scrollWidth > document.documentElement.clientWidth', returnByValue: true });
  if (overflow.result.value) { console.error('FAIL overflow at /new/about/ width ' + width); failed = true; }
  const footer = await send('Runtime.evaluate', { expression: 'Boolean(document.querySelector("footer.footer"))', returnByValue: true });
  if (!footer.result.value) { console.error('FAIL missing footer at /new/about/'); failed = true; }
  const h1 = await send('Runtime.evaluate', { expression: 'document.querySelector("h1.statement.statement-sm")?.textContent === "Who\'s behind this."', returnByValue: true });
  if (!h1.result.value) { console.error('FAIL missing About statement H1 at width ' + width); failed = true; }
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: 2400, scale: 1 } });
  require('fs').writeFileSync('docs/plans/about-migration-screenshots/about-' + width + '.png', Buffer.from(shot.data, 'base64'));
}
ws.close();
if (failed) { console.log('FAIL screenshot verification'); process.exit(1); }
console.log('PASS screenshots saved for About at desktop and 390px');
console.log('PASS no horizontal overflow at 390px');
})();
NODEEOF
```

Expected output:

```text
PASS screenshots saved for About at desktop and 390px
PASS no horizontal overflow at 390px
```

- [ ] **Step 6: Verify screenshot files exist**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
for file in \
  docs/plans/about-migration-screenshots/about-1440.png \
  docs/plans/about-migration-screenshots/about-390.png; do
  test -s "$file" && echo "PASS screenshot exists $file"
done
```

Expected output:

```text
PASS screenshot exists docs/plans/about-migration-screenshots/about-1440.png
PASS screenshot exists docs/plans/about-migration-screenshots/about-390.png
```

- [ ] **Step 7: Commit Task 2**

```bash
cd /Users/zeigor/GitHub/make-it-so-camp
git add docs/plans/about-migration-screenshots
git commit -m "test: verify About migration"
```

Expected output includes:

```text
[about-migration
```
