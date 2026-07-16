# Launch discovery assets (draft)

Draft discovery files for the post-launch URL structure of https://misocamp.com. The launch structure moves the four camp pages from the current staging `/new/` paths to the domain root:

- `https://misocamp.com/` (home)
- `https://misocamp.com/tokyo/`
- `https://misocamp.com/adelaide/`
- `https://misocamp.com/about/`

## Files

- `robots.txt` — allows all crawlers, points to the sitemap.
- `sitemap.xml` — the four launch URLs. Validated with `python3 xml.etree`.
- `llms.txt` — follows the [llmstxt.org](https://llmstxt.org) convention: H1, one-line summary, and sections linking the four pages with one-line descriptions in the site's plain voice.
- `llms-full.txt` — the full site content transcribed faithfully from the four staging pages (`new/index.html`, `new/tokyo/index.html`, `new/adelaide/index.html`, `new/about/index.html`) as clean markdown. Not paraphrased.

## Deploy: domain root, at cutover, NOT before these live

These are launch assets. They are written against the post-cutover URLs (`/tokyo/`, `/adelaide/`, `/about/`), not the current staging `/new/` paths. Deploying them to the domain root before the site itself moves to the root structure would advertise URLs that do not yet resolve.

Copy these four files to the web root of `misocamp.com` only when the site is cut over from `/new/` to the root paths. Until cutover, leave them here as drafts.

## Source of truth

Copy was transcribed from the staging pages in the repository at the time of drafting. If the staging copy changes before cutover, regenerate `llms.txt` and `llms-full.txt` from the updated staging pages.