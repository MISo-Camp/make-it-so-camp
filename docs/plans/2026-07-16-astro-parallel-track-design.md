# Astro Parallel Track — Design

## Goals

- Stand up a self-contained Astro 7.0.9 project under `astro/` that reproduces the four `/new` routes exactly as they exist today under `new/`.
- Make the existing static `new/` tree the parity oracle: untouched, read-only during build, and the reference for every content, metadata, link, and CSS assertion.
- Establish a typed, prop-driven component model (BaseLayout, Header, Footer, Hero) and a single typed camps data module so the two camp pages render from one dynamic route, one set of fields, and one copy of the camp copy.
- Prove zero client JavaScript and exact output parity with the static reference, so promotion of `astro/` over `new/` is a verified, mechanical swap rather than a rewrite.

## Non-goals

- No deployment, hosting, adapter, or CDN work. Output is static files in `dist/` only.
- No integrations: no CMS, image optimization, sitemap, RSS, analytics, fonts, or SEO tooling beyond the hand-written metadata already in `new/`.
- No forms, no client or server interactivity, no islands, no hydration.
- No changes to anything outside `astro/` during the build. `new/` is read-only.
- No re-skin, no copywriting, no new pages, no new metadata fields beyond what `new/` already carries.

## Route and output model

The site serves four routes, all under `/new`:

| Route             | Astro source                          | Build output                      |
|-------------------|---------------------------------------|-----------------------------------|
| `/new/`           | `src/pages/new/index.astro`           | `dist/new/index.html`             |
| `/new/tokyo/`     | `src/pages/new/[camp].astro` (tokyo)  | `dist/new/tokyo/index.html`       |
| `/new/adelaide/`  | `src/pages/new/[camp].astro` (adelaide) | `dist/new/adelaide/index.html`  |
| `/new/about/`     | `src/pages/new/about.astro`           | `dist/new/about/index.html`       |

`getStaticPaths` enumerates the camps from `camps.ts`, so both camp pages are emitted from one dynamic route with `prerender = true` and zero runtime.

The stylesheet is copied verbatim: `new/miso.css` → `astro/public/new/miso.css` → `dist/new/miso.css`. Every page references it as `/new/miso.css`, exactly as `new/` does today.

## File architecture

```
astro/
  .gitignore
  package.json
  package-lock.json
  astro.config.mjs
  tsconfig.json
  src/
    data/
      camps.ts
    layouts/
      BaseLayout.astro
    components/
      Header.astro
      Footer.astro
      Hero.astro
    pages/
      new/
        index.astro
        [camp].astro
        about.astro
  public/
    new/
      miso.css
```

Nothing else is authored. `package-lock.json` is produced by `npm install`; `.gitignore` keeps `node_modules/`, `dist/`, and `.astro/` out of Git.

## Data boundaries

`src/data/camps.ts` is the only camp data source. It exports a `Camp` type with exactly the fields the shared camp page consumes: `slug`, `title`, `description`, `ogDescription`, `statement`, `metaLine`, `subject`, the overview lead/dim text, the two overview paragraph arrays, and an ordered `facts` array. The `facts` rows model Adelaide's additional `Supported by` row without adding unused top-level fields. The module contains exactly two records, `tokyo` and `adelaide`, plus the lookup helper used by the dynamic route.

No future camps, no guessed schema, and no fields that the template does not render.

Hub-only data (the camp cards on the home page) is inline in `src/pages/new/index.astro`, because it is presentation, not a camp record. About-only data (founder bios, collaborators facts) is inline in `about.astro` for the same reason. `camps.ts` holds only what the dynamic route consumes.

## Parity contract

The build must reproduce `new/` to a level that survives these assertions, run against the built files after `html.unescape` (Astro entity-escapes apostrophes; the static source uses them raw):

1. **Five outputs exist:** `dist/new/index.html`, `dist/new/tokyo/index.html`, `dist/new/adelaide/index.html`, `dist/new/about/index.html`, `dist/new/miso.css`.
2. **Full semantic page parity:** after HTML entity decoding, whitespace normalization, and attribute-order normalization, every built page has the same ordered tags, attributes, and text nodes as its corresponding `new/` file. This covers metadata, content, links, semantics, and the footer without relying on spot checks.
3. **Links are correct:** every internal link points to a `/new/...` path (never a bare `index.html`), camp cards on the home page link to `/new/tokyo/` and `/new/adelaide/`, About nav links to `/new/`, `/new/tokyo/`, `/new/adelaide/`.
4. **Mailto subjects** are exact and camp-specific: home and About use `Invitation%20request`, Tokyo uses `Tokyo%20invitation%20request`, Adelaide uses `Adelaide%20invitation%20request`.
5. **No client JS:** no `<script>` tags and no emitted `.js` files in `dist/`.
6. **CSS parity:** `dist/new/miso.css` is byte-identical to `new/miso.css`.
7. **Footer parity:** covered by the full semantic-page comparison; component rendering may change formatting whitespace but not markup, attributes, links, or text.
8. **Forbidden content** is absent: no `styles.css`, no forms, no analytics, no client JS, no invented camp facts, no session times, cohort sizes, or prices.
9. **Diff scope:** `git diff master` shows changes only under `astro/`.

Non-ASCII characters are load-bearing and must survive the build: en dashes in dates, `é` in `Café`, middots `·`, arrows `↗`, the em dash in titles and footers.

## Trade-offs

- **Dynamic route for two camps over two static files.** One `[camp].astro` plus a typed data module costs one indirection but removes the class of bug where Tokyo and Adelaide drift in structure. The kill criterion below guards the downside.
- **Prop-driven Header over per-page header copy.** The header differs subtly across pages (home anchors to sections, camp pages anchor to `#overview`/`#days`/`#logistics`, About lists the three routes). A single `Header` taking a links array keeps the structure shared while preserving the exact per-page nav seen in `new/`.
- **Inline hub and About data over a second data module.** The home-page camp cards and the About founders are single-use presentation. Lifting them into `camps.ts` would force that module to model presentation concerns it has no reason to own.
- **`html.unescape` in verification, not in output.** Astro entity-escapes apostrophes by default; the rendered HTML is still semantically identical and visually identical. We verify against unescaped text rather than disabling Astro's escaping, because disabling escaping is a larger and riskier change than accounting for it in tests.
- **No Astro integrations or adapters.** Static output with the default behavior is the whole point. Anything more is out of scope and would be a separate plan.

## Kill criterion

Pause or abandon this track if any of the following becomes true:

- Parity with `new/` cannot be reached without shipping client JavaScript.
- Parity cannot be reached from a single dynamic `[camp].astro` and requires hand-duplicating the camp pages (the whole point of the typed data module evaporates).
- After promotion, the `astro/` tree would require ongoing manual synchronization with `new/` — i.e., every content change has to be made twice. The parallel track is justified only if it replaces `new/`, not if it doubles it.

If any of these triggers, stop and report `BLOCKED astro-parallel-track: <reason>` rather than patching around it.
