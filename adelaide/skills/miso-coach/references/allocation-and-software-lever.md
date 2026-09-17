# Allocation, Software-Lever Test, and Slice Selection

Reference for MISO's human/AI allocation decisions. Never read to the participant.

## Five allocation levels

| Level | Participant-facing meaning | Required boundary |
|---|---|---|
| **Human** | A person performs it | Record why it should remain human |
| **AI assists** | AI prepares or drafts; a person finishes or decides | Name the handoff point and the human judgment that completes the work |
| **AI acts, human approves** | AI produces the result; a person approves every consequential instance | Name the approval evidence and prohibited pre-approval effects (what the AI must not do before approval) |
| **AI acts, human samples** | AI handles a bounded batch; a person reviews samples and exceptions | Name the sampling method, escalation trigger, and rollback behavior |
| **AI autonomous** | AI handles the bounded activity without routine review | Require highly observable acceptance criteria and safe failure behavior |

## Reasons for retaining human work

Any of these is sufficient to keep an activity human:

- **Consequence** — the outcome is high-stakes and errors are costly or irreversible.
- **Judgment without objective ground truth** — the decision requires taste, relationship awareness, or domain intuition that cannot be reliably verified by output inspection alone.
- **Relationship** — the activity's value depends on a human connection (trust, rapport, negotiation, empathy).
- **Learning** — the participant gains important knowledge or skill by performing the work.
- **Legal or organizational authority** — a regulation, policy, or role requires a specific person to act.
- **Privacy** — the data or context involved should not be exposed to additional systems.
- **Unacceptable irreversibility** — the action cannot be undone and the cost of an error is disproportionate.

**Habit alone is not sufficient** reason to retain work ("we've always done it this way"). But MISO does not pressure the participant upward when they simply choose to retain work. If the participant wants to keep an activity human, record their reason and respect the boundary.

## Software-lever test

A candidate passes only when every test below records **PASS**. A test may record **N/A** only with an explicit reason showing the candidate cannot exercise that concern. N/A is **never allowed** for External state, Causal relevance, Stable boundary, Transformation acceptance, Workflow outcome, or Proportional value.

| # | Test | Pass condition | Failure implication |
|---|---|---|---|
| 1 | **External state** | Software can create, retrieve, transform, validate, route, or coordinate an inspectable work state | If it can only remind, motivate, persuade, reward, or monitor people, return no-code |
| 2 | **Proximate advancement** | The state change makes required work more complete, correct, available, validated, or delivered to an already-authorized resolver | A dashboard, alert, task, or status fails when its only value depends on changed attention or compliance |
| 3 | **Causal relevance** | The state change addresses a bottleneck observed in the anchor occurrence through an explicit mechanism | If it only makes conflict more visible without advancing the work, reject it |
| 4 | **Stable boundary** | Trigger, inputs, sources, output, destination, owner, and system boundary can be stated | Unknown boundary produces `needs-evidence`; confirmed inherently unbounded candidate should be narrowed or returned no-code |
| 5 | **Human authority** | Decisions, approvals, relationships, and authority that remain human are explicit | Unknown owner or decision right produces `needs-authority`; confirmed boundary leaving no useful slice produces no-code |
| 6 | **Failure safety** | Missing, conflicting, malformed, or uncertain input has explicit safe behavior | Unknown behavior produces `needs-evidence`; confirmed unsafe boundary should be narrowed or rejected |
| 7 | **Permissions** | Read/write scope, consent, retention, and prohibited effects are known enough to specify | Unknown permission produces `needs-authority`; confirmed unacceptable access or effect is rejected |
| 8 | **Transformation acceptance** | Observable evidence can establish whether the produced output or state is correct | Unknown evidence produces `needs-evidence`; inherently unobservable quality should be narrowed to a reviewable aid or rejected |
| 9 | **Workflow outcome** | Baseline, expected delta, causal mechanism, measurement window, and disconfirming result can be stated | Unknown evidence produces `needs-evidence`; evidence showing no plausible material improvement produces no-code |
| 10 | **Proportional value** | Frequency, current cost, expected benefit, simpler alternatives, upkeep, and switching burden justify a new artifact | Unknown value evidence produces `needs-evidence`; demonstrated simpler or disproportionate option produces no-code |

Unknown test evidence always produces the matching non-final state. A confirmed failure produces the corresponding reason-coded no-code outcome only after narrowing has failed and no other useful candidate remains.

### Formal boundary statement

> Code is useful when it changes an inspectable external workflow state that directly advances the work or delivers it to an already-authorized resolver, lies on a defensible causal path to the participant's job, and does not depend solely on changing human compliance.

### The anti-dashboard/reminder rule

> A task, status, dashboard, alert, ownership record, or escalation fails when its only value comes from somebody noticing, caring, trying harder, or complying.

This is the practical application of tests 1-3. If the only mechanism by which the software improves the workflow is "someone sees it and acts differently," the software is not advancing the work -- it is hoping someone else will.

## Slice selection factors

When several candidates pass the lever test, compare them on:

1. **Causal impact** on the approved project goal
2. **Recurrence and present cost** of the activity
3. **Participant desire** to delegate
4. **Input accessibility** and permission readiness
5. **Output observability** and testability
6. **Exception and failure risk**
7. **Reversibility**
8. **Simplest viable boundary**
9. **Expected maintenance burden**

MISO recommends the strongest candidate and explains the tradeoff in plain language without a fake-precision score. The participant chooses.

MISO never selects a slice over the participant's chosen human boundary. If technically passing candidates exist but the participant retains all of them, the terminal reason is `human-retained`. MISO does not falsely claim technical impossibility.

## Selected slice requirements

The selected slice must be:

- **Independently useful** — it delivers value on its own, not only as part of a larger system.
- **Independently testable** — its correctness can be checked without building adjacent slices.
- **Bounded by explicit inputs and outputs** — the trigger, sources, destination, and consumer are named.
- **One trigger-to-output contract** — expressible as a single independently valuable transformation from trigger to delivered output.
- **Deep enough to change meaningful work state** — it produces a real change in the workflow, not merely a demo or proof-of-concept.
