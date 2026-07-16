# Session handoff

Updated: 2026-07-16 14:23 Europe/Berlin

## What changed

- Added a self-contained Astro 7.0.9 parallel track under `astro/`; the existing root and `new/` static site are unchanged.
- Reproduced `/new/`, `/new/tokyo/`, `/new/adelaide/`, and `/new/about/` as static Astro output using a shared layout, Header, Footer, Hero, typed Tokyo/Adelaide data, and one dynamic camp route.
- Added reviewed design and implementation plans under `docs/plans/`.
- Verified 10 Astro/TypeScript files with zero errors, warnings, or hints; built all four routes; passed full semantic parity against the static oracle, byte-identical CSS, zero emitted JavaScript, and diff-scope checks.
- Added `npm run build:staging`, which publishes a deterministic static preview under `new/astro/`, scopes internal URLs to that path, and marks every preview page `noindex, nofollow`.
- Published the preview at `https://misocamp.com/new/astro/`. Verified the homepage, Tokyo, Adelaide, About, CSS, and existing `/new/` routes return HTTP 200; the live preview files are byte-identical to the committed artifact.
- Added the root `.nojekyll` marker so legacy GitHub Pages serves the repository as static files instead of parsing Astro source as Jekyll content.

## Next steps

- Review the online preview at `https://misocamp.com/new/astro/` on desktop and mobile before considering promotion.
- If the visual comparison passes and Igor/Noah approve the design, plan the deployment switch separately. No deployment wiring exists in this track.

## Open questions

- Whether and when `astro/` should replace the current static publishing path.
- Fresh Astro screenshots were not captured because no browser surface was connected; the public responses and artifact identity were verified instead.

## Decisions

- Keep Astro self-contained rather than importing from `new/`; `new/` remains the temporary parity oracle.
- Keep homepage and About copy in explicit page files; model only the repeated camp content as typed data.
- Ship static HTML and CSS with no client JavaScript, framework integrations, CMS, analytics, forms, or deployment adapter.
- Treat `/new/astro/` as a staging preview only: keep it out of search indexes and leave `/new/` untouched until a separate promotion decision.
