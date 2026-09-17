# Session handoff

Updated: 2026-09-18 Australia/Adelaide

## What changed

- Revised the homepage source at `astro/src/pages/new/index.astro` around a hands-on executive programme for institutional decision makers and people designing systems. Preserved the MISO visual system and existing camp facts.
- Added `npm run build:home-preview` in `astro/`. It builds and copies only the homepage and stylesheet to `new/index.html` and `new/miso.css`, validates anchors/canonical/no executable scripts, and sets `noindex, nofollow`. It does not replace the current root homepage or other pages.
- Opus reviewed and corrected contrast, heading semantics, mobile navigation, tap targets and wrapping. Coordinator independently inspected rendered sections and narrow/mobile/desktop views. No overflow at 320, 390, 768 or 1440px. Astro check/build passed with one existing BaseLayout JSON-LD hint.
- All 386 production baseline files are unchanged. Existing unrelated untracked files were preserved.

## Next steps

- Published and verified at `https://misocamp.com/new/` (deployment commit `dcea595`). Live HTML/CSS match the reviewed build; current root homepage remains unchanged. Evidence in `docs/crew/2026-09-17-homepage-preview.md`.
- Review the preview before any future promotion to the root homepage.

## Open questions

- Whether and when to promote the new positioning to the root homepage.

## Decisions

- Existing root homepage and event pages remain unchanged. Use root links for camp, About and Imprint details.
- Keep the preview out of search indexes. No new client scripts, dependencies, tracking, forms, metrics, testimonials or unconfirmed partnerships.
- Earlier `build:staging` still targets `new/astro/`; do not use it to publish this homepage. `build:production` replaces the root site and is outside this task.
