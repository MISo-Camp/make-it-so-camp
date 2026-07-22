# AGENTS.md — Make It So Camp

Rules for any agent working in this repo. Read this before editing anything.

## What this is

The website for **misocamp.com** — Make It So Camp, a selective two-day AI
workshop (Tokyo 24–25 Aug 2026, Adelaide 17–18 Sep 2026). By invitation.

- **Remote:** `github.com/MISo-Camp/make-it-so-camp`, branch `master`.
- **Deploy:** GitHub Pages from the **root of `master`** — `CNAME`
  (`misocamp.com`) and `.nojekyll` sit at the repo root and there is no Actions
  workflow, so Pages builds straight from the branch. **Whatever is committed to
  root is live.**

## The one rule that matters

**The site is built by Astro. The HTML at the repo root is generated output.
Do not hand-edit it.**

- **Source of truth:** `astro/src/` — pages in `astro/src/pages/new/`
  (`index.astro`, `about.astro`, `imprint.astro`, `[camp].astro` → Tokyo +
  Adelaide), plus `components/`, `layouts/`, `data/`.
- **Generated at root (never edit by hand):** `index.html`, `miso.css`, and the
  `tokyo/`, `adelaide/`, `about/`, `imprint/` directories. A hand-edit here is
  silently overwritten on the next build.

To change the site: edit `astro/src/`, then rebuild.

## Build & deploy

Run from `astro/`:

```bash
cd astro
npm install                 # first time only
npm run build:staging       # → new/astro/ , a /new/-scoped noindex preview
npm run build:production     # → copies 4 built pages + miso.css to repo root,
                             #   flattens /new/ → /, then runs guard checks
```

`build:production` (`astro/scripts/build-production.mjs`) self-verifies the
artifact and throws if any guard fails: `robots: index, follow` present, zero
leftover `/new/` references, root stylesheet URL, **zero client-side scripts**
(JSON-LD only), and CSS parity. If it throws, the artifact is wrong — fix the
source, do not patch the root HTML.

Production ships exactly these pages: `/`, `/tokyo/`, `/adelaide/`, `/about/`,
`/imprint/`.

## Repo layout

- `astro/` — the site source and build (the only thing you edit to change the site).
- `index.html`, `miso.css`, `tokyo/`, `adelaide/`, `about/`, `imprint/` — **build output.**
- `new/` — staging preview output (`/new/`-scoped, noindex).
- `legacy/` — superseded earlier versions; reference only.
- `assets/`, `og-image.jpg`, `*-logo.*` — static assets served as-is.
- `sponsorship-deck.html`, `partnership-deck.html`, `*.md` at root (proposal,
  curriculum, sponsorship decks) — **source/reference docs, not part of the
  Astro build.** Hand-maintained.
- `docs/` — `plans/` (dated build plans + screenshots) and `drafts/` (SEO, FAQ,
  JSON-LD, launch assets).
- `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml` — SEO surface.

## Where work lives (this project)

Code and site artifacts live **here**. Thinking, research, and deliverables live
in the vault:

- **Vault project folder:** `…/brain dead/projects/make-it-so-camp`
  (thinking, research, proposals-as-notes, deliverables).
- Split: HTML / CSS / build → this repo; notes, strategy, research → the vault
  folder. For this project, do **not** auto-file into the vault's global
  `intake/`; keep output in the project folder unless told otherwise.

## Git discipline

- One author machine (igor-mbp); other machines pull-only. Sync-check at start,
  commit per completed change, push at end — never leave the tree silently dirty
  or ahead.
- Make changes on a branch / worktree, not directly on `master`, for anything
  beyond a trivial fix.
- Commit identity is repo-local: `Igor Schwarzmann <schwarzmann@gmail.com>`.
  Confirm `git config user.email` is set before committing; stop and ask if empty.
- **Commit generated root output together with the source change that produced
  it** — the live site is the committed root, so a source edit without its
  rebuilt artifact ships nothing.

## Guardrails

- Never print, paste, or commit `.env` contents, keys, or tokens.
- Destructive ops (delete / overwrite): inventory and confirm first.
- Solve the stated task; don't opportunistically refactor the build or restructure
  the repo without being asked.

## Project context

- **Founders:** Igor Schwarzmann and Noah Raford. Contact: `hello@misocamp.com`
  (email-only, by invitation).
- **Camps:** Tokyo (Crypto Café Tokyo, with Henkaku Center at Chiba Institute of
  Technology; supporters Mousterian and Puddin AI) and Adelaide (venue TBD, with
  Flinders University New Venture Institute and SA Futures Agency).
- **Thesis:** You cannot delegate what you cannot articulate.
