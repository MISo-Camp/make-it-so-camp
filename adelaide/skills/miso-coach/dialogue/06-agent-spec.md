# 06 — Agent specification or Outcome

## Purpose

Render the whole-workflow blueprint and produce one deeply specific handoff — or explain why no handoff is warranted. This is the final macro-question. It turns approved evidence into finished artifacts, reviews them with the participant, and stops.

## Breadcrumb

**Label:** depends on the path determined in question 5.

On the agent-spec path:
```
Question 6 of 6 · Agent specification
✓ Annoyance → ✓ Job → ✓ Subgoals → ✓ Activities → ✓ Human/AI → ● Outcome
```

On the no-code path:
```
Question 6 of 6 · Outcome
✓ Annoyance → ✓ Job → ✓ Subgoals → ✓ Activities → ✓ Human/AI → ● Outcome
```

Note: the second-row trail always ends in `Outcome` regardless of path. The path-specific label appears only in the first row.

---

## Agent-spec path

Follow this path when question 5 produced a participant-selected, bounded AI-delegable slice with all 10 lever tests passed.

### Step 1: Freeze the selected slice

The selected slice from question 5 is the scope of the specification. Adjacent opportunities become context or non-goals. They may appear in the workflow blueprint as `future opportunity` but they do not enter the specification except as excluded context or non-goals.

### Step 2: Render the workflow blueprint

Generate `workflow-blueprint.html` in `miso-output/<slug>/` using the template at `templates/workflow-blueprint.html` and the approved case card.

The blueprint shows the whole relevant workflow — not just the selected slice. It must contain:

1. A path-neutral top strip showing `Annoying task > Job > Subgoals > Activities > Human/AI > Outcome`, plus an outcome badge reading `AGENT SPECIFICATION`
2. The approved job story and project goal
3. The whole-workflow view grouped by subgoal
4. Actors, systems, key inputs, outputs, handoffs, and exceptions
5. Allocation labels for every relevant activity
6. The exact proposed allocation level for every activity, plus its approval, sampling, or escalation boundary
7. An explicit distinction between observed current-state facts and proposed future allocation
8. `SPECIFIED NOW` emphasis on the selected slice
9. A legend that does not rely on color alone
10. A visible filename for the accompanying specification

Run the containment precheck before writing.

### Step 3: Draft the agent specification

Generate `agent-spec.md` in `miso-output/<slug>/` using the template at `templates/agent-spec.md` and the approved case card.

The specification describes exactly one selected slice and contains these 15 sections:

1. **Purpose and job** — approved job story, project goal, and why this slice serves them
2. **Anchor evidence** — the real occurrence, pain, bottleneck, and representative evidence
3. **Selected scope** — exact start, end, actor/system boundary, and included behavior
4. **Non-goals** — adjacent activities, future opportunities, and prohibited scope expansion
5. **Trigger and starting state** — what initiates the behavior and what must already exist
6. **Input contract** — sources, owners, fields or formats, access, redaction, freshness, and representative examples
7. **Required behavior** — transformations, rules, ordering, traceability, and observable state transitions
8. **Output contract** — produced artifact or state, destination, consumer, format, and provenance
9. **Human boundary** — retained decisions, judgment, approvals, communication, relationships, and external actions
10. **Exceptions and safe failure** — missing, malformed, conflicting, duplicate, late, unauthorized, or uncertain inputs; abort, escalation, and recovery behavior
11. **Permissions and constraints** — privacy, retention, access, policy, environment, reversibility, and prohibited effects
12. **Acceptance criteria** — observable transformation checks using participant language and representative fixtures
13. **Workflow outcome hypothesis** — baseline, expected delta, mechanism, measurement window, evaluator, and disconfirming result
14. **Assumptions and unresolved questions** — unknowns that do not change approved semantics or safety; material unknowns block completion instead
15. **Approval and provenance** — participant approval, specification revision, and relationship to `case-card.md` and `workflow-blueprint.html`

The specification contains no implementation plan, architecture recommendation, file or module breakdown, task list, milestone, estimate, command, code, deployment step, or authorization to build.

It ends with this handoff instruction (verbatim):

> "Use this as the approved product and workflow specification. Inspect the relevant technical environment, identify any technical unknowns, propose an implementation plan, and wait for approval before building. Do not reinterpret the job, broaden the selected slice, or move the human/AI boundary without returning those choices to the owner."

Run the containment precheck before writing.

### Step 4: Cold-reader review

Before showing the specification to the participant for final approval, run the cold-reader review. See `references/cold-reader-checklist.md` for the full checklist.

A fresh-context reviewer receiving only `agent-spec.md` must be able to state:

- The job and project goal
- What one thing is being specified
- The exact trigger, inputs, behavior, outputs, and destination
- What people still decide or approve
- Prohibited effects
- Exception and failure behavior
- How transformation success is judged
- How workflow improvement could be falsified

The reviewer returns only ambiguities, contradictions, invented-semantics risks, and missing information. It does not choose technology or create a plan.

When a separate fresh-context agent is unavailable, apply this same fixed checklist yourself and disclose to the participant that the review was not independent. Independence is a quality enhancement, not a reason to bypass the review.

Fix wording or internal contradictions directly when the correction does not change participant meaning. Return decisions about intent, scope, authority, privacy, failure behavior, and acceptance to the participant. Keep unresolved non-material technical facts visible for the later building agent. Set `review-blocked` when a material semantic or safety decision remains open.

### Step 5: Participant semantic review

Ask the participant only for decisions required to close material semantic, authority, safety, or acceptance gaps found in the cold-reader review.

Then read back the final specification in plain language:

- The approved job and project goal
- The selected slice: what it does, from what trigger through what output
- The human boundary: what people still decide, approve, or do
- Prohibited behavior: what the software must never do
- Exceptions: what happens when inputs are missing, wrong, or conflicting
- Acceptance criteria: how they will know the output is correct

Ask exactly this question:

> "What is wrong, missing, or assigned to the wrong actor?"

Do not ask merely whether it "looks good."

**Authority boundary:** The participant is the authority on their meaning, preferences, desired progress, and personal willingness to delegate. They are not automatically the authority for organizational permissions, other people's responsibilities, regulated decisions, or consequential system effects. Those boundaries require confirmation from the appropriate owner. If organizational authority is unconfirmed and would change whether the specification is legitimate, the case stays `needs-authority` rather than proceeding to approval.

### Step 6: Final approval

After corrections are resolved, obtain explicit participant approval for meaning and product intent, plus any separately required owner confirmation for organizational authority.

If approval is given, mark the case `spec-ready` in the case card.

### Step 7: Completion

Deliver the completion sentence (exact wording):

> "Your workflow map and agent specification are ready. This skill has not made an implementation plan or built anything. When you're ready, give `agent-spec.md` to your building agent in a separate task."

Stop. Do not invoke `do-it`, write code, create a plan, suggest next steps, or take any external action.

---

## No-code path

Follow this path when question 5 concluded that no new agent brief is warranted, with a classified reason.

### Step 1: Classify the reason

Use the reason determined in question 5. It must be one of:

- `non-causal` — software can only remind, nudge, or monitor; no inspectable work state advances the job
- `human-retained` — a technically viable slice exists, but the participant chose to keep it
- `existing-or-simpler-solution` — an existing tool or simpler process change already provides the useful state
- `disproportionate-value` — the expected improvement does not justify the switching and upkeep burden
- `unsafe-or-unverifiable` — the only technically possible slice violates a safety, permission, reversibility, or observability boundary

### Step 2: Render the workflow blueprint

Generate `workflow-blueprint.html` in `miso-output/<slug>/` using the template at `templates/workflow-blueprint.html` and the approved case card.

The blueprint for a no-code outcome must:

- Show the whole relevant workflow with observed current-state facts separate from proposed allocation
- Use a reason-specific outcome badge: `NO AGENT BRIEF`
- Apply reason-specific emphasis:
  - `non-causal`: highlight the broken causal link — the state software could create and why it does not advance the job
  - `human-retained`: highlight the retained human boundary
  - `existing-or-simpler-solution`: highlight the already-served step
  - `disproportionate-value`: highlight the candidate and value/cost mismatch
  - `unsafe-or-unverifiable`: highlight the violated safety, permission, reversibility, or observability boundary

Run the containment precheck before writing.

### Step 3: Draft the no-code verdict

Generate `no-code-verdict.md` in `miso-output/<slug>/` using the template at `templates/no-code-verdict.md` and the approved case card.

The verdict records:

- Reason code (one of the five above)
- Participant's approved job and project goal
- Anchor occurrence and approved workflow-map boundary
- Observed bottleneck and relevant current-state evidence
- State code could technically create
- Why no new agent brief is warranted under this reason
- (To be filled after participant review) Participant agreement, disagreement, or uncertainty
- Re-entry condition that could make a future software test legitimate

Use the reason-specific default forms from the design spec. See `templates/no-code-verdict.md` for the full structure and reason-specific evidence requirements.

State the verdict in the first sentence. Cite the anchor-case evidence.

Do not append a checklist, habit plan, coaching exercise, operating agreement, or generic recommendations.

Run the containment precheck before writing.

### Step 4: Participant review

Read back the factual workflow map and the causal or allocation reasoning for correction. **Present findings one at a time** — state one conclusion, let the participant react, then present the next. Do not deliver the entire verdict as a monologue. Dense explanation blocks lose participants and feel like lectures rather than conversations.

Ask what evidence is wrong or missing. If the answer supplies material new evidence, reopen question 4 or 5 rather than defending the verdict. Return to the appropriate macro-question with the revisit breadcrumb.

### Step 5: Record participant stance

Record whether the participant agrees, disagrees, or remains uncertain about the evaluation. Agreement with MISO's evaluation is not required for an evidence-complete no-code result. A disagreement that supplies new evidence reopens the analysis. A disagreement about preference or interpretation is recorded without forcing assent.

### Step 6: Re-entry condition

Give only a re-entry condition — what would need to change before this workflow is worth testing for a software lever again. Do not give a human action plan, coaching advice, or generic recommendations.

Mark the case `no-code` in the case card.

### Step 7: Completion

Deliver the completion sentence (exact wording):

> "Your workflow map and no-code verdict are ready. I have not created an agent brief, implementation plan, or human action plan. The verdict records the evidence, its reason, and what would need to change before this workflow is worth testing again."

Stop. Do not invoke `do-it`, write code, create a plan, suggest next steps, or take any external action.

---

## Shared rules for both paths

- All file writes go to `miso-output/<slug>/` only. Run the containment precheck for every write.
- The blueprint and specification (or verdict) are generated from the canonical case card. They cannot silently diverge.
- Update the case card with the final status, artifact hashes or revision identifiers, and approval records.
- The blueprint is a self-contained, accessible, printable static HTML/CSS infographic with no JavaScript and no external network dependency.
- Never invoke `do-it`, produce an implementation plan, choose a technical architecture, write code, or take an external action. The participant may give the finished specification to a building agent in a separate task.

## Exit

The appropriate artifact set exists, agrees internally, and the skill has stopped without planning or execution:

- **Agent-spec exit:** `case-card.md`, `workflow-blueprint.html`, and `agent-spec.md` exist under `miso-output/<slug>/`, agree with the approved case card, pass the cold-reader review, and are explicitly approved by the participant. Case status is `spec-ready`.
- **No-code exit:** `case-card.md`, `workflow-blueprint.html`, and `no-code-verdict.md` exist under `miso-output/<slug>/`, agree with the approved case card, the factual account has been read back for correction, and participant agreement or dissent is recorded. Case status is `no-code`.

In either case, MISO has stopped. It has not planned, built, deployed, or taken any external action.
