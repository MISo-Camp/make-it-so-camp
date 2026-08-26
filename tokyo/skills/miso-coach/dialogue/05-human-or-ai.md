# 05 — Human or AI

## Purpose

Assign each activity deliberately, recheck the job against the full workflow, test whether a useful software lever exists, and select one bounded slice for the specification — or conclude that no new agent brief is warranted.

This is the evaluative heart of the session. Everything before it collected evidence; this question uses that evidence to make and test allocation decisions.

## Breadcrumb

**Label:** Human or AI
**Number:** 5

```
Question 5 of 6 · Human or AI
✓ Annoyance → ✓ Job → ✓ Subgoals → ✓ Activities → ● Human/AI → ○ Outcome
```

Follow-up probes retain this number and label.

## Method

### Step 1: Allocation per activity

For each consequential activity in the approved workflow, establish two separate judgments:

1. **Desired allocation:** how much the participant wants to retain this work. This is their preference — what they want to keep doing themselves, and what they would gladly hand off.
2. **Feasible allocation:** how much AI may safely and usefully own, given the available inputs, permissions, rules, exceptions, and acceptance evidence. This is the evidence-based assessment.

These are separate decisions. Wanting an activity gone does not make it safe or useful to automate. Preferring to keep an activity does not mean it cannot be automated.

Use the allocation vocabulary from `references/allocation-and-software-lever.md`:

| Level | Meaning | Required boundary |
|---|---|---|
| Human | A person performs it | Record why it should remain human |
| AI assists | AI prepares or drafts; a person finishes or decides | Name the handoff and the human judgment |
| AI acts, human approves | AI produces the result; a person approves every instance | Name approval evidence and prohibited pre-approval effects |
| AI acts, human samples | AI handles a bounded batch; a person reviews samples and exceptions | Name sampling, escalation, and rollback behavior |
| AI autonomous | AI handles the bounded activity without routine review | Require highly observable acceptance and safe failure behavior |

Record a reason for every boundary. Reasons for retaining human work include: consequence, judgment without objective ground truth, relationship, learning, legal or organizational authority, privacy, and unacceptable irreversibility. Habit alone is not sufficient, but do not pressure the participant upward when they simply choose to retain work.

Walk through the activities conversationally, not as a form. **Batch obviously-delegable activities** rather than asking about each one sequentially — the per-activity walkthrough should feel like a conversation, not a checklist.

When several activities are clearly mechanical (data exports, copy-paste assembly, format conversion), propose a batch allocation:

> "The [collection, export, and assembly] steps are pure data work — would you hand all of those off, or is there one you'd want to keep?"

Then focus per-activity depth only on activities where the human/AI boundary is genuinely ambiguous — where judgment, authority, relationship, or consequence is involved:

> "What part of this would you want to keep doing yourself, even if software could handle the mechanics?"

This batching reduces the sequential-question feel while still capturing granular preferences where they matter. If the participant disagrees with a batch ("actually, the assembly step has a judgment call in it"), split it out and discuss individually.

### Step 2: Job revisit

After the allocation is established, revisit the provisional job story using the workflow evidence and the activities the participant retains:

> "You came in wanting [provisional outcome]. Looking at what actually happened and what you want to keep, does that still name the progress you want?"

Revise only with the participant. Never claim the revision reveals a hidden true goal.

**If the revision changes the approved workflow boundary, required subgoals, activity relevance, or success evidence:** visibly return to the earliest invalidated macro-question and repair the map before continuing. Use the revisit breadcrumb format: `Question 3 of 6 · The subgoals · Revisiting`. Do not proceed to candidate selection from a stale goal tree or activity map.

If the revision is a wording clarification that leaves every existing traceability link true, continue directly.

Update the case card with `Goal status: revised` or `Goal status: approved` as appropriate.

### Step 3: Software-lever test

Apply the software-lever test to every plausible AI candidate — every activity where the desired or feasible allocation is anything other than fully human.

Each candidate must record a verdict for all 10 tests. A candidate passes only when every test records `PASS`. A test may record `N/A` only with an explicit reason showing that the candidate cannot exercise that concern. `N/A` is never allowed for External state, Causal relevance, Stable boundary, Transformation acceptance, Workflow outcome, or Proportional value.

The 10 tests, applied in order:

1. **External state** — Can software create, retrieve, transform, validate, route, or coordinate an inspectable work state? If it can only remind, motivate, persuade, reward, or monitor people, return no-code `non-causal`.

2. **Proximate advancement** — Does the state change make required work more complete, correct, available, validated, or delivered to an already-authorized resolver? A dashboard, alert, task, or status fails when its only value depends on changed attention or compliance.

3. **Causal relevance** — Does the state change address a bottleneck observed in the anchor occurrence through an explicit mechanism? If it only makes conflict more visible without advancing the work, reject it.

4. **Stable boundary** — Can trigger, inputs, sources, output, destination, owner, and system boundary be stated? Unknown boundary produces `needs-evidence`. Confirmed inherently unbounded candidate: narrow or no-code.

5. **Human authority** — Are decisions, approvals, relationships, and authority that remain human explicit? Unknown owner or decision right produces `needs-authority`. Confirmed boundary leaving no useful slice: no-code.

6. **Failure safety** — Does missing, conflicting, malformed, or uncertain input have explicit safe behavior? Unknown behavior produces `needs-evidence`. Confirmed unsafe boundary: narrow or reject.

7. **Permissions** — Are read/write scope, consent, retention, and prohibited effects known enough to specify? Unknown permission produces `needs-authority`. Confirmed unacceptable access or effect: reject.

8. **Transformation acceptance** — Can observable evidence establish whether the produced output or state is correct? Unknown evidence produces `needs-evidence`. Inherently unobservable quality: narrow to a reviewable aid or reject.

9. **Workflow outcome** — Can baseline, expected delta, causal mechanism, measurement window, and disconfirming result be stated? Unknown evidence produces `needs-evidence`. Evidence showing no plausible material improvement: no-code.

10. **Proportional value** — Do frequency, current cost, expected benefit, simpler alternatives, upkeep, and switching burden justify a new artifact? Unknown value evidence produces `needs-evidence`. Demonstrated simpler or disproportionate option: no-code `existing-or-simpler-solution` or `disproportionate-value`.

The formal boundary:

> Code is useful when it changes an inspectable external workflow state that directly advances the work or delivers it to an already-authorized resolver, lies on a defensible causal path to the participant's job, and does not depend solely on changing human compliance.

Unknown test evidence always produces the matching non-final state (`needs-evidence` or `needs-authority`). A confirmed failure produces the corresponding reason-coded no-code outcome only after narrowing has failed and no other useful candidate remains.

When the candidate requires system integrations (reading from databases, APIs, or third-party tools), probe for access authority:

> "Do you have the authority to grant read access to [these systems], or does IT or another team need to approve that?"

If the answer is unknown, the candidate may still pass the lever test but the spec should note access as an assumption requiring confirmation. If the answer is "no and I cannot get it," this may produce `needs-authority`.

Do not present the test names or formal language to the participant. Run the tests internally and surface findings in plain language:

> "The prep work — pulling numbers from Salesforce and formatting the table — that passes every check. The part where you decide which accounts need attention: that's pure judgment, no objective test for 'right.' I'd keep that human. Does that match how you see it?"

### Step 4: Slice selection

When several candidates pass the lever test, recommend one using the selection factors:

- Causal impact on the approved project goal
- Recurrence and present cost
- Participant desire to delegate
- Input accessibility and permission readiness
- Output observability and testability
- Exception and failure risk
- Reversibility
- Simplest viable boundary
- Expected maintenance burden

Explain the tradeoff in plain language. Do not present a fake-precision score. The participant chooses.

The selected slice must be:

- Independently useful — it changes a meaningful work state, not just a demo
- Independently testable
- Bounded by explicit inputs and outputs
- Expressible as one trigger-to-output contract

Never select a slice over the participant's chosen human boundary. If technically passing candidates exist but the participant retains all of them, the terminal reason is `human-retained` — do not falsely claim technical impossibility.

### Handling no-code conclusions

If no candidate passes the lever test, or all passing candidates are retained by the participant, this is the exit point for the no-code path. Classify the reason:

- `non-causal` — software can only remind, nudge, or monitor; it cannot change inspectable work state that advances the job
- `human-retained` — a technically viable slice exists, but the participant chooses to keep it
- `existing-or-simpler-solution` — an existing tool or simpler process change already provides the useful state
- `disproportionate-value` — the expected improvement does not justify the switching and upkeep burden
- `unsafe-or-unverifiable` — the only technically possible slice violates a safety, permission, reversibility, or observability boundary

State the reason plainly. Do not pad it with generic advice or consolation.

## Exit

The macro-question is complete when one of these is true:

1. **Agent-spec path:** One participant-selected, bounded AI-delegable slice exists with explicit human boundaries, an observable acceptance evidence, and all 10 lever tests passed. The approved job story (revised or confirmed) and allocation map are current.

2. **No-code path:** A defensible, reason-coded no-code conclusion is reached. The reason is one of the five listed above, supported by the workflow evidence.

3. **Non-final state:** A consequential fact remains unknown — `needs-evidence`, `needs-authority`, or `needs-case` — and the missing evidence is named with a resume phrase.

Update the case card with the desired allocation, feasible allocation, allocation reasons, candidate set, selected slice (or no-code reason), and revised or confirmed goal status. Deliver the momentum checkpoint per INTERVIEW.md.

Then advance to `dialogue/06-agent-spec.md`.
