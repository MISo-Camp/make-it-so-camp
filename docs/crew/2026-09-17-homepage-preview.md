# Homepage preview — 2026-09-17

Scope: implement the approved institutional homepage at `/new/`, preserving the current homepage and event pages. User authorized deployment.

## Dispatch and routing

ROUTE: bounded homepage build → LunaRoute GLM 5.3 Flash, regular lane. Coordinator supplied copy and layout brief at `/tmp/miso-home-build/brief.md` and `/tmp/miso-home-build/copy.md`. Worker owns the home Astro source, a scoped publish script, package command and two generated preview files.

## Provider failure and replacement

Flash run `miso-homepage-20260917T152844-3013dd` failed with HTTP 500 after image fixture input, including provider retries. No site files changed. Report absent; failure is not a completed build. Logs retained in the crew state directory.

ROUTE: replacement homepage build → LunaRoute GLM 5.3 Vision, regular lane, same brief and image-fixture gate. This route is selected because visual inspection is required.

## Baseline

Astro check: zero errors, zero warnings, one existing BaseLayout hint. Build: seven routes. Production snapshot covers 386 files; `/tmp/miso-home-build/production-baseline.json`. Existing untracked files are excluded from this change. GitHub Pages publishes the root of master.

## Review and deployment

Pending coordinator checks and review. No deployment yet.

## Second provider failure

Vision run `miso-homepage-vision-20260917T153131-66a5b0` reported a terminated model response after source inspection; no tracked implementation changes existed when checked. Provider automatic retry is active. Coordinator surfaced the stall accurately and requested user choice between Claude Code Opus and continued LunaRoute. No deployment or verified build.

## Recovery and authorized Opus takeover

Vision automatic retry recovered and produced a draft/report before the next user turn. User authorized Claude Code Opus takeover. Opus launch failed before inference with expired OAuth session; user asked to reauthenticate. No deployment. Coordinator independently confirmed check/build pass (17 files, zero errors/warnings, one existing hint), all386 original production hashes unchanged, root camp/about/imprint links HTTP200, no broken in-page anchors or mobile overflow. Actual desktop section and mobile screenshots inspected in `/tmp/miso-home-build/review-*.png`. Muted text contrast and section-heading semantics flagged in the Opus brief for correction. Original worker report incorrectly describes CSS as tracked and root links as unavailable locally; coordinator does not rely on those statements.

## Resume — 2026-09-18

User confirmed Claude Code login restored. Resumed authorized Opus takeover with the same brief and coordinator findings at `/tmp/miso-home-build/opus/brief.md`; result and receipt use `output-retry.json` and `receipt-retry.json`. Remote master has not advanced; live root homepage and CSS still match saved baseline.

## Opus review result

Claude Code Opus completed successfully with no permission denials. Report `/tmp/miso-home-build/opus/report.md`. Eight findings corrected: muted text contrast, section heading semantics, mobile nav clipping, tap target sizes, stage numeral specificity, orphaned directional glyph, footer wrapping, reused header. All61 checked copy strings present; no added claims. All386 production files unchanged. Build/check pass with existing JSON-LD hint. Coordinator independently inspected corrected desktop sections and mobile/footer, and identified additional320px email overflow outside the worker original390px viewport scope. Dispatched a bounded Opus correction with `/tmp/miso-home-build/opus/narrow-fix.md`; no copy changes authorized.

Review rubric: code spec adherence, scope safety, accessibility and responsive behavior; public copy source fidelity and unsupported claims. No unresolved content or publish-script findings; narrow-screen correction pending.

## Final pre-deployment verification

Narrow correction completed successfully in Claude Code Opus; report `/tmp/miso-home-build/opus/narrow-report.md`. Fluid email font floor fixes320px overflow without changing390px or desktop sizing. Coordinator independently inspected320px host screenshot and390px header plus every desktop section; measured no overflow at320/390/768/1440. Generated HTML equals current Astro output after robots rewrite; stylesheet equals source. All386 baseline files still unchanged. Final Astro check/build rerun passed with zero errors/warnings and the existing BaseLayout hint. `git diff --check` passed. Review findings resolved; coordinator approves deployment within the authorized /new scope. Live verification pending push.
