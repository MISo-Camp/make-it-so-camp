# Example: Mixed Workflow with Human Judgment — Priya's Renewal Proposal

Worked example showing the MISO flow for a partial automation case where human judgment is central. This is reference material for the AI interviewer, never read to the participant.

## Participant

Priya, consulting lead at a professional-services firm.

## The annoying task

Priya prepares renewal proposals for existing clients. Each proposal must reflect the correct contract terms, current usage, pricing, and legal language. She pulls information from four sources, resolves conflicts between them, drafts the proposal, gets internal approval, and sends it to the client's procurement team. The process takes 2-3 hours per proposal, and she handles 4-6 per month. At least once a month, a proposal goes out with a stale fact that procurement catches, requiring a correction loop that delays the deal by 3-5 days.

## Anchor occurrence

Two weeks ago. Trigger: client's procurement contact emailed asking for a renewal quote. Priya opened the Salesforce opportunity (contract terms, renewal date, current pricing tier), the Finance team's pricing sheet (approved discount schedule and current rates), the current proposal template (standard language and structure), and the prior proposal for this client (custom terms and relationship context).

She found three conflicts:

1. **Discount mismatch:** Salesforce showed a 15% discount; Finance's sheet showed 12% as the current approved rate for this tier. The 15% was a one-time concession from the prior year that had not been updated in Salesforce.
2. **Stale user count:** The prior proposal listed 200 seats; Salesforce showed 340 current seats. The pricing tier threshold was at 300, changing the rate.
3. **Old legal language:** The template had a data-processing clause that Legal had updated two months ago, but the template had not been refreshed.

Priya resolved the discount by calling the account executive. She updated the seat count from Salesforce. She found the current legal language by searching her email for the Legal team's announcement. The proposal took 2.5 hours. After internal approval, procurement flagged that the payment terms referenced a subsidiary that had been merged. Another correction loop, another 4-day delay.

## Pain evidence

- 2-3 hours per proposal, 4-6 times per month
- At least one stale-fact correction loop per month, adding 3-5 days delay
- Conflicts between sources are invisible until Priya manually compares them
- Errors that survive to procurement damage credibility and delay deals

## The job

> "When procurement needs a renewal quote, I need wrong facts to stop reaching approval, so proposals go out correct the first time, while preserving commercial judgment, legal risk assessment, and client relationship."

## Project goal

No stale values at final review and at most one owner-resolution loop over five consecutive proposals.

## Subgoals

1. All four sources are current and accessible [AND]
2. Conflicts between sources are identified before drafting begins [AND]
3. Each conflict is resolved by its owner (pricing by account exec, legal by Legal, usage by system of record) [AND]
4. The proposal reflects resolved, consistent facts [AND]
5. Internal approval confirms accuracy [AND]
6. The sent proposal survives procurement review without correction

## Activities (anchor occurrence)

1. Receive renewal request from procurement (trigger: email; actor: procurement)
2. Open Salesforce opportunity (actor: Priya; system: Salesforce; output: contract terms, pricing, seats)
3. Open Finance pricing sheet (actor: Priya; system: shared spreadsheet; output: approved rates and discounts)
4. Open proposal template (actor: Priya; system: document store; output: standard language)
5. Open prior proposal for this client (actor: Priya; system: document store; output: custom terms and history)
6. Compare facts across four sources (actor: Priya; judgment: identifying which values conflict)
7. Resolve discount conflict (actor: Priya + account executive; judgment: commercial decision on which rate applies)
8. Update seat count from system of record (actor: Priya; source: Salesforce; judgment: confirming tier change)
9. Find current legal language (actor: Priya; source: email search; judgment: confirming which version is current)
10. Draft proposal with resolved facts (actor: Priya; judgment: commercial framing, client relationship, wording)
11. Submit for internal approval (actor: Priya; destination: approver; judgment: approver checks accuracy)
12. Send to procurement (actor: Priya; destination: client procurement; constraint: must survive review)

## Key conflicts found

| Conflict | Source A | Source B | Owner | Resolution |
|---|---|---|---|---|
| Discount rate | Salesforce: 15% | Finance sheet: 12% | Account executive | One-time concession expired; 12% is current |
| Seat count | Prior proposal: 200 | Salesforce: 340 | System of record (Salesforce) | 340 is current; triggers tier change |
| Legal clause | Template: old DPA | Legal announcement: updated DPA | Legal team | Updated language from email |
| Payment terms | Prior proposal: subsidiary name | (discovered by procurement) | Unknown at draft time | Missed -- caused correction loop |

## Allocation

| Activity | Desired | Feasible | Reason |
|---|---|---|---|
| Read four sources | AI autonomous | AI autonomous | Read-only access, structured data |
| Compare facts across sources | AI acts, human approves | AI acts, human approves | Comparison is mechanical; Priya approves the conflict list |
| Flag conflicts with owners | AI acts, human approves | AI acts, human approves | Routing is rule-based; Priya confirms each flag |
| Resolve pricing conflicts | Human | Human | Commercial judgment, relationship with account exec |
| Resolve legal conflicts | Human | Human | Legal risk assessment, organizational authority |
| Draft proposal | Human | Human | Commercial framing, client relationship, wording |
| Internal approval | Human | Human | Organizational authority |
| Send to procurement | Human | Human | Relationship, irreversible external action |

## Software-lever test (selected slice: proposal preflight)

1. **External state:** PASS — software creates a conflict report comparing four named sources
2. **Proximate advancement:** PASS — surfacing conflicts before drafting directly prevents stale facts in the proposal
3. **Causal relevance:** PASS — undetected conflicts are the observed bottleneck causing correction loops
4. **Stable boundary:** PASS — four named sources, one conflict report output, triggered by renewal request
5. **Human authority:** PASS — all resolution decisions stay with their owners; pricing with AE, legal with Legal, drafting and sending with Priya
6. **Failure safety:** PASS — if a source is inaccessible or a field is ambiguous, the preflight flags it as unresolved rather than silently skipping it
7. **Permissions:** PASS — read-only access to four existing sources; output is an internal working document
8. **Transformation acceptance:** PASS — Priya can verify each flagged conflict against the sources; false positives are low-cost (extra check), false negatives are visible when she drafts
9. **Workflow outcome:** PASS — baseline: 1+ correction loop per month; expected: 0 stale values at final review; measured over 5 proposals; falsified if correction loops do not decrease
10. **Proportional value:** PASS — 4-6 proposals/month, each saving conflict-resolution discovery time and preventing 3-5 day delays; four stable sources

## Selected slice

Read-only proposal preflight: read the four sources (Salesforce opportunity, Finance pricing sheet, current template, prior proposal), compare key fields (pricing, discount, seat count, legal clauses, entity names, payment terms), and produce a conflict report showing each mismatch with the conflicting values and their source owners.

The preflight is read-only. It does not modify any source, draft the proposal, resolve conflicts, or send anything externally.

## Human-retained

- **Pricing concessions:** commercial judgment on which discount applies
- **Legal risk:** assessing which legal language is appropriate
- **Client wording:** relationship-sensitive framing and proposal drafting
- **Approval:** internal sign-off on accuracy
- **Sending:** irreversible external action to procurement

## Outcome hypothesis

No stale values present at final review, and at most one owner-resolution loop (where the preflight identifies a conflict whose owner must be consulted), over five consecutive proposals. Falsified if procurement catches a stale fact that was present in at least two sources and should have been flagged by the preflight.
