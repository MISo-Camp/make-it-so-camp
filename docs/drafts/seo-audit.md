# SEO / AEO Audit — Make It So Camp (`/new/` staging pages)

Audited: `new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`,
`new/about/index.html`, `new/miso.css`.
Repo context checked: root `index.html` (the currently live site), `CNAME`
(`misocamp.com`), `.nojekyll`, `og-image.jpg`, and absence of `robots.txt` /
`sitemap.xml`.

Scope of this audit: titles/meta, Open Graph + Twitter, `og-image` status,
heading hierarchy, semantic landmarks, link text, image alts, canonical
strategy for a staging-vs-root-launch situation, answerability for LLM
crawlers, and rich-results blockers.

Facts used are the supplied brief only; no new facts invented. Findings are
recommendations — no file other than this audit was edited.

## Priority summary

| # | Pri | Finding | Page(s) |
|---|-----|---------|---------|
| 1 | P1 | `/new/*` staging pages are `index,follow` with self-canonicals while a different live root `/` is also indexed → duplicate/cannibalization during staging | all four |
| 2 | P1 | `og-image.jpg` is the OLD design (615×434 "Captain Picard"), reused on all `/new/` pages, no `og:image:width/height/alt` | all four |
| 3 | P1 | No structured data (JSON-LD) → no event rich results possible; the old root site already ships JSON-LD, the new pages ship zero | Tokyo, Adelaide, hub, About |
| 4 | P2 | No `robots.txt` and no `sitemap.xml` in repo → crawl/rich-result discovery is unmanaged | site-wide |
| 5 | P2 | Section labels are `<span class="label">`, not headings; document outline skips levels and major sections have no real heading → weak for AEO extraction | all four |
| 6 | P2 | No `<main>` landmark; content sits in `<body>` directly under `<header>` | all four |
| 7 | P2 | No `og:image:alt` anywhere; Open Graph cards carry no accessible description | all four |
| 8 | P2 | `og:description` is byte-identical for Tokyo and Adelaide pages, and for hub vs About title differs only by label — low per-page discrimination in social/answer extraction | Tokyo, Adelaide |
| 9 | P3 | About title generic (`About — Make It So Camp`); founder names live only in body, not title/meta | About |
| 10 | P3 | No favicon, `theme-color`, or `manifest`; no skip link; external founder links have no `rel="noopener"` | all four |
| 11 | P3 | Hub nav link "Tokyo · Adelaide" is two destinations behind one anchor; "View Tokyo ↗"/"View Adelaide ↗" are fine but hub CTA could name the camp | hub |
| 12 | P3 | BreadcrumbList / `Organization` / site-name schema absent → fewer entity signals for LLM crawlers | all four |

## How to read each finding

Every finding gives: the problem (with the exact offending string/location),
a launch-vs-now split, and the exact fix. "Now" = while `/new/` remains a
staging path beside the live root. "Launch" = when the Swiss design becomes
the public site.

---

## P1-1 — Staging `/new/*` pages are indexable and self-canonical while root `/` is a different, also-indexed live site

**Problem.** All four `/new/` pages carry:

```html
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://misocamp.com/new/...">       <!-- e.g. new/index.html:9-10 -->
```

The live root `index.html` simultaneously carries:

```html
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://misocamp.com/">               <!-- root index.html -->
```

So the same domain serves two distinct versions of the homepage (and the
event narrative): root `/` ("Become a Captain of AI", Tokyo-only, stale
keywords) and `/new/` (the Swiss thesis version, Tokyo + Adelaide). Both are
indexable and self-canonical. That is the textbook duplicate/cannibalization
condition: Google picks one version, indexes it, and the other — plus all
the `/new/tokyo`, `/new/adelaide`, `/new/about` pages that build on it —
risk being treated as near-duplicates of a homepage that does not even
describe them. The Astro preview at `/new/astro/*` is correctly
`noindex,nofollow` (verified), which makes the `/new/*` choice to be
`index,follow` an inconsistency, not a deliberate stance.

**Fix — now (staging).** Make the staging tree invisible to indexers until
it is the real site. In all four `/new/` files, change:

```html
<meta name="robots" content="index, follow">
```
to
```html
<meta name="robots" content="noindex, follow">
```

Leave canonicals pointing at the eventual launch URLs (root paths), not the
`/new/` paths, so that if a crawler ignores `noindex` it still sees the
intended canonical target. Concretely:

| File | New canonical (now slot) |
|------|------------------------|
| `new/index.html` | `<link rel="canonical" href="https://misocamp.com/">` |
| `new/tokyo/index.html` | `<link rel="canonical" href="https://misocamp.com/tokyo/">` |
| `new/adelaide/index.html` | `<link rel="canonical" href="https://misocamp.com/adelaide/">` |
| `new/about/index.html` | `<link rel="canonical" href="https://misocamp.com/about/">` |

`noindex,follow` (not `noindex,nofollow`): you still want internal link
equity to flow during the staging period so the eventual launch pages
inherit it.

Add `X-Robots-Tag: noindex` for `/new/*` at the serving layer too if you can
(headers beat meta tags when both exist), but the meta tag change is the
minimum that lives in this repo.

**Fix — launch.** Promote the Swiss design to root: make the current
`new/index.html` content the new root `/` (replacing the old "Captain of AI"
`index.html`), and 301-redirect the staging paths to their root equivalents:

- `/new/` → `/`
- `/new/tokyo/` → `/tokyo/`
- `/new/adelaide/` → `/adelaide/`
- `/new/about/` → `/about/`

Then flip all four pages back to `index, follow`, set canonicals to the
root paths shown above, and submit a `sitemap.xml` (see P2-4). Keep the old
root `index.html` and the `/new/astro/*` preview either deleted or
`noindex`-ed to stop the old "Captain of AI" wording lingering in the index.
Do not leave `/new/` as a parallel-indexable tree after launch.

---

## P1-2 — `og-image.jpg` is the OLD design, undersized, and reused unannotated on all new pages

**Problem.** Every `/new/` page points at the same social image:

```html
<meta property="og:image" content="https://misocamp.com/og-image.jpg">   <!-- new/index.html:16, tokyo:16, adelaide:16, about:16 -->
<meta name="twitter:image" content="https://misocamp.com/og-image.jpg">
```

That file is the old design: `og-image.jpg` is 615×434 px (verified
`file`/`sips`), and the live root `index.html` documents its meaning as
`og:image:alt content="Captain Picard saying Make It So"` with declared
`og:image:width 625 / height 468` — dimensions that do not even match the
real 615×434. So every share, link preview, and LLM crawl of the new Swiss
pages renders a stale "Become a Captain of AI" branded card pre-dating the
Tokyo/Adelaide relaunch. None of the `/new/` pages declare
`og:image:width`, `og:image:height`, or `og:image:alt`, so even if the
image were right, scrapers must fetch it to know its size and have no text
fallback.

On top of the stale design, the ratio is wrong for modern cards: OG wants
1200×630 (1.91:1); Twitter `summary_large_image` wants at least
1200×600 with <1MB size. 615×434 is below Twitter's minimum and will render
cropped/blurred.

**Fix — now.** Stop advertising the old card before launch:

1. In each `/new/` page, add the missing dimensions and an alt that matches
   the new branding (not Picard) — even with the existing image:
   ```html
   <meta property="og:image" content="https://misocamp.com/og-image.jpg">
   <meta property="og:image:width" content="615">
   <meta property="og:image:height" content="434">
   <meta property="og:image:alt" content="Make It So Camp — a two-day AI workshop, Tokyo and Adelaide 2026">
   <meta name="twitter:image:alt" content="Make It So Camp — a two-day AI workshop, Tokyo and Adelaide 2026">
   ```
   This at least makes the card honest about what it is.

2. Or, as the cleaner now-option, commission a new 1200×630 Swiss-design
   image (bone background, terracotta accent, the thesis line) and reference
   it from all four `/new/` pages with correct `width`/`height`/`alt`.
   Because `/new/` is `noindex` after P1-1, the card is not yet seen by the
   public, so this can be staged without urgency — a P1 that becomes P1 at
   launch.

**Fix — launch (mandatory).** Ship a new `og-image.jpg` at 1200×630 in the
approved Swiss system. Consider per-page variants:
- Hub: thesis + "Tokyo · Adelaide · 2026"
- Tokyo: "Make It So Camp Tokyo — 24–25 August 2026"
- Adelaide: "Make It So Camp Adelaide — 17–18 September 2026"
- About: founder names or the "Two practices, one thesis" line

Each gets its own `og:image:url`/`width`/`height`/`alt`. Do not reuse one
card across all four pages (see P2-8).

---

## P1-3 — No structured data on new pages (rich results impossible)

**Problem.** `grep -rn "application/ld+json" new/` returns nothing. The new
pages ship zero structured data. The old root site already carries JSON-LD
(`"description": "A two-day working session in Tokyo…"` appears in root
`index.html`), so the relaunch is actively regressing on entity/structured
signals. The Tokyo and Adelaide pages describe offline events with dates,
venues, organizers and cohorts — exactly the `Event` rich-result surface —
but expose none of it as schema, so neither Google's event module nor an
LLM answer engine can lift a structured record.

**Fix — now.** Optional during staging (pages are `noindex`), but cheap to
add so launch is schema-ready. Add JSON-LD per page in `<head>`:

- `new/tokyo/index.html` — `schema.org/Event` (offline), type can be
  `Event` or the more specific `EducationEvent`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    "name": "Make It So Camp Tokyo",
    "startDate": "2026-08-24",
    "endDate": "2026-08-25",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Crypto Café Tokyo",
      "address": {"@type": "PostalAddress", "addressCountry": "JP"}
    },
    "organizer": {"@type": "Organization", "name": "Make It So Camp", "url": "https://misocamp.com"},
    "collaborator": {"@type": "CollegeOrUniversity", "name": "Chiba Institute of Technology"},
    "description": "A two-day, by-invitation AI workshop for experienced practitioners. Day 1: articulate your method. Day 2: build and demo.",
    "inLanguage": "en",
    "url": "https://misocamp.com/tokyo/"
  }
  ```
  Use `url` = the launch root path, not `/new/tokyo/`, to match the
  canonical strategy in P1-1.

- `new/adelaide/index.html` — same shape with `startDate 2026-09-17` /
  `endDate 2026-09-18`, `location.name "TBD"` (place TBD is fine; if the
  venue is confirmed before launch, swap in a `Place`/`address`), and a
  `collaborator` array of Flinders NVI + SA Futures Agency.

- `new/index.html` — `schema.org/WebSite` + `schema.org/Organization`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Make It So Camp",
    "url": "https://misocamp.com",
    "email": "hello@misocamp.com",
    "founder": [
      {"@type": "Person", "name": "Igor Schwarzmann", "url": "https://igorschwarzmann.com"},
      {"@type": "Person", "name": "Noah Raford", "url": "https://www.noahraford.com", "jobTitle": "Managing Partner at EMIR"}
    ],
    "slogan": "You cannot delegate what you cannot articulate."
  }
  ```

- `new/about/index.html` — a `WebPage` with `about` referencing the two
  `Person` records above (and the `Organization`), so an LLM answer engine
  can answer "who runs Make It So Camp" from the page itself rather than
  inferring.

Do not add `offers`/`price`/`free pilot` language — schema fields for cost
are omitted on purpose (matches the supplied banned-language list). An
invitation-only event with no public price is legitimately representable in
schema simply by omitting `offers`.

**Fix — launch.** Validate the blocks with Google's Rich Results Test and
Schema Markup Validator before flipping to `index`. Update `url`s to root
paths. Resubmit sitemap (P2-4).

---

## P2-4 — No `robots.txt`, no `sitemap.xml`

**Problem.** At repo root, `robots.txt` and `sitemap.xml` do not exist
(`cat` exits non-zero). Crawl guidance and discovery are entirely implicit.
With a staging tree and an Astro preview both present, this matters: you
have no way to tell crawlers to ignore `/new/astro/` and `/new/` (now) or
to discover `/tokyo/`, `/adelaide/`, `/about/` (at launch).

**Fix — now.** Add a `robots.txt` at repo root:

```
User-agent: *
Disallow: /new/astro/
Allow: /

# Staging tree — keep out until launch
Disallow: /new/
```

Note: `Disallow` does not force de-indexing of already-indexed `/new/`; pair
with the `noindex` meta from P1-1 and the URL Removal tool if anything is
already indexed.

**Fix — launch.** Replace with a permissive robots + sitemap reference:

```
User-agent: *
Allow: /
Disallow: /new/astro/

Sitemap: https://misocamp.com/sitemap.xml
```

And add `sitemap.xml` listing the four launch URLs (`/`, `/tokyo/`,
`/adelaide/`, `/about/`) with `lastmod` = build timestamp and the canonical
root URLs. Submit it in Google Search Console.

---

## P2-5 — Section labels are `<span>`, not headings; document outline skips levels

**Problem.** Every section's title is a span, e.g. `new/index.html`:

```html
<div class="section-label"><span class="num">01</span><span class="label" id="idea-label">The idea</span></div>
```

`aria-labelledby="idea-label"` gives the `<section>` an accessible name
(good for screen readers via the landmark), but the label itself is not a
heading, so it is invisible to heading-based extraction. The resulting
outline is wobbly:

- Hub `new/index.html`: one `h1` (thesis), then a jump straight to `h2`
  ("Tokyo"/"Adelaide" camp cards) and `h3` ("Academic/Creative/Corporate"
  `.move` cards, and "A map of the room"/"Articulate."/"Build and demo."
  `.day-row` headings) with **no `h2` for "The idea", "Who it's for", "How
  it works", "2026 camps", "Request an invitation"** — five major sections
  with no heading-level representation.
- Tokyo/Adelaide `new/tokyo/index.html`, `new/adelaide/index.html`: `h1`
  ("Make It So Camp Tokyo.") then `h3` ("A map of the room.", "Day 1/Day 2"
  under schedule) — `h2` is skipped entirely. Logistics has no heading
  inside it.
- About `new/about/index.html`: `h1` ("Who's behind this.") then `h2`
  ("Igor Schwarzmann ↗", "Noah Raford ↗"). "Founders"/"Collaborators"
  sections are spans.

For LLM answer engines that chunk pages by heading (and for classic SEO
outline signals), the major-section titles ("The idea", "Who it's for",
"How it works", "Overview", "The two days", "The schedule", "Logistics",
"Founders", "Collaborators") being non-headings is a real readability loss.

**Fix — now/launch (same change).** Promote the label span to a real
heading while keeping the visual unchanged. Two equally cheap options:

Option A — make the label an `h2`:

```html
<div class="section-label"><span class="num">01</span><h2 class="label" id="idea-label">The idea</h2></div>
```

Option B — keep the span for the `num`/`label` styling but add an `h2`
visually-hidden or restructure. Option A is simpler and the CSS rule
`.label { font-size:0.82rem; font-weight:600; letter-spacing:0.04em; color:var(--muted); }`
already styles it; just add `.section-label h2.label { margin:0; }` to
`new/miso.css` to neutralize default heading margins. Then the outline
becomes `h1` → `h2` (sections) → `h3` (moves, day-rows, schedule days),
which is the intended hierarchy.

Apply uniformly across all four files to the section labels: "The idea",
"Who it's for", "How it works", "2026 camps", "Request an invitation"
(hub); "Overview", "The two days", "The schedule", "Logistics", "Request
an invitation" (Tokyo, Adelaide); "Founders", "Collaborators", "Request an
invitation" (About). Leave the camp-card `h2` "Tokyo"/"Adelaide" and the
person `h2`s as they are; they become correctly nested.

No copy changes — pure structural fix, no banned language introduced.

---

## P2-6 — No `<main>` landmark

**Problem.** Each page is structured as `<header>` → a sequence of
`<section>` → `<footer>`, with no `<main>` wrapper. The `<section
aria-labelledby>` blocks are good regions, but the absence of a `<main>`
landmark means screen-reader users and structured extractors have no
"primary content" boundary distinct from nav and footer.

**Fix — now/launch.** Wrap the page content (everything between `</header>`
and `<footer>`) in `<main>`. One edit per page, e.g. in `new/index.html`:

```html
</header>
<main>
  <section class="hero"> … </section>
  <section class="section" id="idea"> … </section>
  …
  <section class="section invite" id="request"> … </section>
</main>
<footer class="footer">
```

Add `id` like `<main id="main">` and a skip-link in the header
(`<a class="skip-link" href="#main">Skip to content</a>`) — that also
covers P3-10's skip-link point. One `<main>` per page is the contract.

---

## P2-7 — No `og:image:alt` anywhere

**Problem.** All four `/new/` pages omit `og:image:alt` (and
`twitter:image:alt`). Even after P1-2 fixes the image itself, an image with
no alt text gives accessibility tools and answer engines no textual handle
on the card.

**Fix — now/launch.** Add, per page, an alt that names the page, e.g.:

- Hub: `"Make It So Camp — a two-day, by-invitation AI workshop. Tokyo and Adelaide, 2026."`
- Tokyo: `"Make It So Camp Tokyo — 24–25 August 2026, in collaboration with Chiba Institute of Technology."`
- Adelaide: `"Make It So Camp Adelaide — 17–18 September 2026, in collaboration with Flinders University New Venture Institute and SA Futures Agency."`
- About: `"Make It So Camp — founded by Igor Schwarzmann and Noah Raford."`

(Dimensions come from P1-2.) Keep these short; OG alt is not a paragraph.

---

## P2-8 — `og:description` duplication across Tokyo and Adelaide

**Problem.** Tokyo and Adelaide share an identical social description:

```html
<!-- new/tokyo/index.html:14 and new/adelaide/index.html:14 -->
<meta property="og:description" content="Two days to make your way of working legible — to a machine, and to people who work nothing like you.">
```

The page-level `<meta name="description">` is correctly differentiated
(Tokyo mentions Crypto Café Tokyo + Chiba; Adelaide mentions Flinders NVI
+ SA Futures Agency), but the social description is not. When this card is
shared or crawled for an answer, Tokyo and Adelaide look identical.

**Fix — now/launch.** Differentiate the `og:description`/`twitter:description`
to mirror the page `meta description`, shortened for card length (≈150 chars):

- Tokyo: `"Make It So Camp Tokyo — a two-day AI workshop at Crypto Café Tokyo, in collaboration with Chiba Institute of Technology. By invitation."`
- Adelaide: `"Make It So Camp Adelaide — a two-day AI workshop, in collaboration with Flinders University New Venture Institute and SA Futures Agency. By invitation."`

Also differentiate the hub `meta description` (currently ~199 chars, fine)
and About `meta description` from each other — they already differ, keep
as is but confirm at launch.

---

## P3-9 — About title/meta are generic

**Problem.** `new/about/index.html:6-7`:

```html
<title>About — Make It So Camp</title>
<meta name="description" content="Make It So Camp was created by Igor Schwarzmann and Noah Raford. A selective two-day AI workshop. Tokyo and Adelaide, 2026.">
```

"About" is navigation chrome, not a topic. An LLM asked "who founded Make
It So Camp" reads the body but the title does not reinforce it; in
answer-card surfaces the title often IS the answer line.

**Fix — now/launch.**

```html
<title>Founders — Igor Schwarzmann and Noah Raford — Make It So Camp</title>
<meta name="og:title" content="Founders — Make It So Camp">
```

Keep the description (it already names both founders). Update the matching
`og:title`. Optionally add a `Founders and collaborators` H1 alternative,
but the founding body is the substantive content — title rename is the
cheap win.

---

## P3-10 — No favicon, `theme-color`, `manifest`, skip link, `rel="noopener"`

**Problem.** `grep` across `/new/` finds no `favicon`, `apple-touch-icon`,
`theme-color`, or `manifest` references, and no skip-link. Browser tabs and
Android home-screen installs render a default glob; no theme-color means no
bone/terracotta tint in Safari/Chrome UI. External founder links on About
open same-tab with no `rel="noopener"`:

```html
<!-- new/about/index.html -->
<a href="https://igorschwarzmann.com" style="text-decoration:none; color:inherit">Igor Schwarzmann ↗</a>
<a href="https://www.noahraford.com" style="text-decoration:none; color:inherit">Noah Raford ↗</a>
```

`rel="noopener"` is not strictly SEO, but if these ever become
`target="_blank"` it matters, and it costs nothing now.

**Fix — now/launch.** Add to each `/new/` `<head>`:

```html
<meta name="theme-color" content="#EAE6DD">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

Create a one-color SVG favicon (terracotta square with a bone "M" or the
numeral-less mark) and a `site.webmanifest` with `name`,
`short_name = "Make It So Camp"`, and the `--bg`/`--accent` colors. Add the
skip link as in P2-6. On About, add `rel="noopener"` to the two founder
links.

These are not rich-result blockers but they are cheap brand/entity
reinforcements and matter for "is this a real site" signals at launch.

---

## P3-11 — Hub nav "Tokyo · Adelaide" is two destinations behind one anchor

**Problem.** `new/index.html`:

```html
<a href="#camps">Tokyo · Adelaide</a>
```

This anchors to the `#camps` section (one destination), so it is
navigationally fine, but the link *text* names two camps as if it offered
both. When a crawler or LLM lists the page's navigational targets, "Tokyo ·
Adelaide → #camps" is ambiguous.

**Fix — now/launch.** Rename to the section's actual label:

```html
<a href="#camps">2026 camps</a>
```

Matches the section's own label (`04 2026 camps`) and the H2 you'll add in
P2-5. The two camps are already reachable as the "View Tokyo ↗"/"View
Adelaide ↗" CTAs, which are good, descriptive link text.

---

## P3-12 — No `BreadcrumbList` / `WebSite` / `WebPage` schema

**Problem.** Already partly covered by P1-3's `Organization`. The camp
pages would additionally benefit from `BreadcrumbList` so the breadcrumb
trail `Home › Tokyo` is explicit, and `WebSite` (with
`potentialAction: SearchAction` only if a search box existed — it does not,
so omit `SearchAction`) on the hub. These are entity signals LLM answer
engines use to attribute and de-duplicate.

**Fix — launch.** On `new/tokyo/index.html` and `new/adelaide/index.html`
add a `BreadcrumbList` JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://misocamp.com/"},
    {"@type": "ListItem", "position": 2, "name": "Tokyo", "item": "https://misocamp.com/tokyo/"}
  ]
}
```

On the hub, add a small `WebSite` node referencing the `Organization` from
P1-3. Keep all `@id`s stable so entity consolidation works.

---

## Rich-results readiness (summary)

| Surface | Currently achievable from `/new/`? | What unblocks it |
|---------|-------------------------------------|------------------|
| Event rich result (Tokyo, Adelaide) | No — no `Event` JSON-LD | P1-3 |
| Sitelinks search box | Not applicable — no on-site search | n/a |
| Breadcrumb rich result | No — no `BreadcrumbList`, no proper headings | P3-12 + P2-5 |
| Logo / organization knowledge panel contribution | Weak — no `Organization` JSON-LD on the canonical site | P1-3 |
| Social / link preview card | Broken — old undersized image | P1-2 + P2-7 + P2-8 |
| Crawl hygiene | Untmanaged — no robots/sitemap, staging indexable | P1-1 + P2-4 |

---

## AEO answerability matrix — the W-test

"Can an LLM crawler extract what / when / where / who-for / how-to-apply
from each page, as-is today?"

### Hub `new/index.html`
- **What:** ✅ "selective two-day AI workshop" in `<title>`, `meta description`, hero meta, h1 thesis.
- **When:** ✅ "2026" hero; precise dates only inside `#camps` (`24–25 August 2026`, `17–18 September 2026`). Extractable but lives in a `<dl>`, not a heading — fine for AEO, slightly less reliable until P2-5.
- **Where:** ✅ Tokyo, Adelaide (Adelaide venue `TBD`).
- **Who-for:** ✅ "Experienced practitioners", and the academic/creative/corporate split under `#who` with three `h3`s.
- **How-to-apply:** ✅ "Request an invitation" → `mailto:hello@misocamp.com?subject=Invitation%20request`. An LLM can state "email hello@misocamp.com with which camp, what work you'd bring, and why now" from the `#request` section.

### Tokyo `new/tokyo/index.html`
- **What:** ✅ Two-day AI workshop, articulation → build-and-demo.
- **When:** ✅ `24–25 August 2026` in hero, title, meta, and Logistics `<dl>`.
- **Where:** ✅ `Crypto Café Tokyo` in hero sub, overview, Logistics `<dl>`.
- **Who-for:** ✅ Logistics `<dl>` `Cohort`: "Deliberately mixed: academic, creative industries, corporate".
- **How-to-apply:** ✅ `mailto:hello@misocamp.com?subject=Tokyo%20invitation%20request`.
- **Strongest answerability of the four.** The only gap is no `Event` schema (P1-3) and Logistics lacking a heading (P2-5).

### Adelaide `new/adelaide/index.html`
- **What:** ✅ Same structure as Tokyo.
- **When:** ✅ `17–18 September 2026`.
- **Where:** ⚠️ `Venue: TBD` — accurate (per the supplied facts, Adelaide venue is TBD). An LLM will correctly answer "venue TBD/to be announced". This is honest, not a defect.
- **Who-for:** ✅ Same `<dl>`.
- **How-to-apply:** ✅ Adelaide-specific `mailto` subject.
- **Note:** `og:description` is identical to Tokyo's (P2-8) — for answer surfaces that read the card rather than the page, Adelaide looks like Tokyo until that's fixed.

### About `new/about/index.html`
- **What:** ✅ "selective two-day AI workshop" in meta.
- **Who:** ✅ Igor Schwarzmann (igorschwarzmann.com) and Noah Raford (noahraford.com, "Managing Partner at EMIR", "PhD from MIT") — fully in body; weakly in title (P3-9).
- **Collaborators:** ✅ Tokyo: Chiba Institute of Technology; Adelaide: Flinders NVI + SA Futures Agency — in `<dl>`.
- **When:** ✅ Tokyo · Adelaide · 2026 in hero meta (no per-camp dates on About; not required).
- **How-to-apply:** ✅ `mailto:hello@misocamp.com?subject=Invitation%20request`.
- **Gap:** title says "About", not "Founders" (P3-9); no `Person` schema (P1-3) so an LLM asked "who runs Make It So Camp" reads prose but has no structured record.

**Net AEO verdict:** the four pages are *well-written for human reading and
largely extractable*; the gaps are structural (no headings on major
sections, no structured data, one stale shared social card, Adelaide/Tokyo
social-copy collision). None of the gaps are copy defects.

---

## Already good (keep, don't undo)

- `<dl>`/`<dt>`/`<dd>` for facts and logistics — semantically correct and
  AEO-friendly; preserves the "structured metadata" read.
- `aria-labelledby` on every `<section>` — correct landmark labelling;
  the P2-5 fix keeps it and adds a real heading underneath.
- `<nav aria-label="Primary">` — unambiguous primary nav.
- One `h1` per page, and it is the thesis/page statement — correct.
- `mailto:` CTAs carry per-camp `subject` params (Tokyo, Adelaide, generic)
  — good for triage and extractable as "how to apply".
- `.statement`/`.lead-statement` text is concrete, not AI-gloss — the AEO
  read is high-quality because the copy is.
- The Astro preview tree `/new/astro/*` is correctly `noindex,nofollow`
  with self-canonicals — do not change.
- `<html lang="en">` on every page — correct, saves LLMs a guess.
- Content is text-only (no `<img>`) on `/new/` — no alt defect exists by
  definition; the only alt gap is `og:image:alt` (P2-7).
- No banned language found in any audited file (`grep` for `free pilot`,
  `Supported by`, `supporting partner`, `laptops closed` = clean) — the
  audit's recommended additions (schema, titles) introduce none.

---

## Recommended order of work

1. **P1-1** (`/new/*` → `noindex,follow`, canonicals → root paths) — stops
   the staging-vs-root collision today; reversible at launch.
2. **P2-4** (`robots.txt` disallowing `/new/` and `/new/astro/`) — pair with
   step 1.
3. **P1-2 + P2-7** — new Swiss `og-image(s)` at 1200×630 with dimensions
   and alt; mandatory before launch, fine to stage now.
4. **P2-5 + P2-6** — headings + `<main>` + skip link; one structural pass
   across all four files; do once, do before launch.
5. **P1-3 + P3-12** — JSON-LD (`Event` ×2, `Organization`, `Person` ×2,
   `BreadcrumbList` ×2, `WebSite`); build now, validate, ship at launch.
6. **P2-8** — differentiate Adelaide vs Tokyo `og:description`.
7. **P3-9, P3-10, P3-11** — About title; favicon/theme-color/manifest/
   noopener; nav link rename. Polish batch.
8. **Launch cut-over** — promote Swiss to root, 301 `/new/*` → root paths,
   flip `noindex` → `index,follow`, submit `sitemap.xml`, remove old
   "Captain of AI" root and `/new/astro/` from the index via Search Console.

## Open decisions flagged (not in the audit's lane to decide)

- **Canonical target shape at launch**: root paths (`/tokyo/`) vs keeping
  `/new/tokyo/` promoted to `/tokyo/` with redirects. The audit assumes
  root paths; confirm before implementing P1-1's canonical URLs.
- **Adelaide venue**: stays `TBD` until locked; `Event` schema for Adelaide
  uses `location.name "TBD"` until a `Place`/`address` is supplied.
- **A new OG image**: needs design ownership (Swiss system, bone +
  terracotta, at 1200×630). Out of scope for this audit; P1-2 lists it as a
  dependency.