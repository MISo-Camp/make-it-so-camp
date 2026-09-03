# Example: Clean Recurring Automation — Maya's Customer-Health Report

Worked example showing the full MISO flow for a clear recurring automation case. This is reference material for the AI interviewer, never read to the participant.

## Participant

Maya, customer-success ops manager at a B2B SaaS company.

## The annoying task

Every Friday morning, Maya produces a customer-health report for the CS lead's Monday meeting. It takes about 45 minutes. She exports a CSV from Salesforce (account data, renewal dates, support tickets), exports a second CSV from Amplitude (product-usage metrics), opens last week's Google Doc, and manually reconciles the two sources into a single review table. She color-codes at-risk accounts based on her judgment, adds context notes from memory and Slack threads, and shares a private draft with the CS lead.

## Anchor occurrence

Last Friday. Trigger: recurring calendar reminder at 8:30 AM. Maya exported both CSVs, opened last week's doc, and started matching accounts. Midway through, she noticed a parent company had been renamed in Salesforce after an acquisition. The old name still appeared in Amplitude. She matched them manually because the data looked right, but the confident-looking match nearly caused her to assign the wrong risk level. She caught the error only because she remembered a Slack thread about the acquisition. The report took 50 minutes instead of the usual 45. The CS lead used it in Monday's meeting without changes.

## Pain evidence

- 45-50 minutes of manual reconciliation every Friday
- Renamed-parent-company match produced a confident-looking but wrong result
- Error was caught by memory, not by the process itself
- Risk: a wrong match that looks right reaches the CS lead unchecked

## The job

> "When the CS lead needs a view of at-risk accounts before a meeting, I need to produce a private, trustworthy review table, so the right accounts get attention, while preserving Maya's risk judgment."

## Project goal

Reduce Friday preparation from 45 minutes to approximately 10 minutes over four Fridays, with no increase in corrected matching errors.

## Subgoals

1. Both data sources are current and accessible [AND]
2. Account records from both sources are matched to the same real entity [AND]
3. At-risk accounts are identified and flagged [AND]
4. The review table is private and reaches only the CS lead

## Activities (anchor occurrence)

1. Export Salesforce CSV (trigger: calendar reminder; actor: Maya; system: Salesforce; output: CSV file)
2. Export Amplitude CSV (actor: Maya; system: Amplitude; output: CSV file)
3. Open prior week's Google Doc (actor: Maya; system: Google Docs; output: template with last week's data)
4. Match accounts across sources by name and ID (actor: Maya; judgment: resolving name mismatches; exception: renamed parent company)
5. Assess risk level per account (actor: Maya; judgment: combines usage trend, ticket volume, renewal date, contextual knowledge from Slack)
6. Add context notes (actor: Maya; sources: memory, Slack threads; judgment: what context matters for this meeting)
7. Format and share private draft with CS lead (actor: Maya; destination: CS lead; constraint: private, not shared wider)

## Exception: renamed parent company

Salesforce showed the new name after an acquisition. Amplitude still had the old name. The automated match would have looked correct (high-confidence fuzzy match on a similar string) but would have merged two distinct accounts. Maya caught this because she remembered a Slack thread about the acquisition. The process itself had no safeguard for this error.

## Allocation

| Activity | Desired | Feasible | Reason |
|---|---|---|---|
| Export Salesforce CSV | AI autonomous | AI autonomous | Stable API, read-only, bounded output |
| Export Amplitude CSV | AI autonomous | AI autonomous | Stable API, read-only, bounded output |
| Match accounts | AI acts, human approves | AI acts, human approves | Uncertain matches must be held for review, not auto-resolved |
| Assess risk level | Human | Human | Judgment without objective ground truth; Maya's contextual knowledge |
| Add context notes | Human | Human | Relationship knowledge, meeting-specific relevance |
| Format and share draft | AI assists | AI assists | Maya reviews before sharing; private destination |

## Software-lever test (selected slice: source reconciliation)

1. **External state:** PASS — software creates a reconciled account table from two CSVs
2. **Proximate advancement:** PASS — matched table directly advances report preparation
3. **Causal relevance:** PASS — matching is the observed bottleneck (both time and error risk)
4. **Stable boundary:** PASS — two named CSV sources, one output table, one trigger
5. **Human authority:** PASS — risk judgment stays with Maya; uncertain matches held for review
6. **Failure safety:** PASS — uncertain matches (below confidence threshold) held in a needs-review section rather than auto-matched
7. **Permissions:** PASS — read-only access to existing exports; output is a private working document
8. **Transformation acceptance:** PASS — Maya can verify matches against known accounts; uncertain matches are visible, not hidden
9. **Workflow outcome:** PASS — baseline 45 min, expected ~10 min, measured over 4 Fridays, falsified if matching errors increase
10. **Proportional value:** PASS — weekly recurrence, 35-min expected savings, low upkeep (two stable sources)

## Selected slice

Source reconciliation: read both CSVs, match accounts, produce a private needs-review table. Uncertain matches (renamed entities, missing IDs, ambiguous fuzzy matches) are held in a separate needs-review section with the conflicting evidence shown, not auto-resolved.

## Human-retained

- Risk judgment: Maya decides which accounts are at-risk based on her knowledge
- Context notes: Maya adds meeting-specific context from memory and Slack
- What the CS lead sees: Maya reviews and approves the final document before sharing

## Outcome hypothesis

Preparation drops from 45 minutes to approximately 10 minutes (review + risk judgment + notes) over four consecutive Fridays. No increase in corrected matching errors compared to the prior four Fridays. Falsified if matching errors increase or if Maya spends more than 20 minutes on review because the needs-review section is too noisy.
