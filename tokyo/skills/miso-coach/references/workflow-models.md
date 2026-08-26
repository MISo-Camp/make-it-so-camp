# Workflow Decomposition

Reference for MISO's workflow reconstruction and modeling. Never read to the participant.

## Five workflow views

The workflow model covers these views as needed. Not every view applies to every case. Use what the evidence requires.

1. **Sequence** — the order activities happened in the anchor occurrence.
2. **Flow between actors and systems** — who hands what to whom, through which tool or channel.
3. **Artifacts and state changes** — what objects (documents, records, messages, data) exist at each step and how they change.
4. **Decisions and authority** — where judgment, approval, matching, prioritization, or routing occurs and who has the right to decide.
5. **Contextual policies, permissions, relationships, and constraints** — organizational rules, access rights, relationship expectations, privacy, retention, and environmental conditions that shape what is possible or permitted.

## Traceability rules

- Every **subgoal** traces to the job or project goal.
- Every **activity** supports a subgoal, or is explicitly marked as waste, wait, rework, or external condition.
- Every **AI requirement** traces through an activity and subgoal to the project goal.
- Every **human or environment dependency** is marked as an assumption software cannot enforce.
- Every **selected-slice output** has a named consumer and acceptance evidence.

## Granularity stop rule: the stranger test

> Could a competent stranger perform this activity from the named inputs without needing hidden product decisions?

If **no**: ask what the stranger would get wrong, and split the activity at that hidden decision.

If **yes**: stop splitting. The activity is at the right grain.

Stop before decomposing into meaningless keystrokes. The goal is to expose hidden decisions, not to document mouse clicks.

When the participant wants to keep only one stage of an activity, split across **gather, analyze, decide, act**. The selected AI slice may contain a small linked pipeline, but it must be independently testable and must not absorb adjacent human-owned outcomes.

## No arbitrary quotas

The skill does not require:

- three to seven subgoals;
- two to six activities;
- a fixed number of WHY questions; or
- a predetermined number of exceptions.

Counts are driven by the case and the stop conditions.

## Map sufficiency

The workflow map is sufficient when it supports all five tests:

1. **Bottleneck test** — the map locates the causal bottleneck observed in the anchor occurrence.
2. **State-transition test** — at least one artifact or work state visibly changes between activities.
3. **Decision/authority boundary test** — the map shows where judgment, approval, or authority sits and who holds it.
4. **Central exception test** — the most consequential exception path (rework, failure, conflict, missing data) is visible.
5. **Software-lever test** — the map provides enough detail to apply the 10-gate software-lever test from the allocation reference.

If any test fails, the map needs more detail in the area that fails. It does not need more detail everywhere.

## Completeness boundary

The workflow boundary begins at the anchor occurrence's trigger and ends when the intended output or state reaches its real consumer.

**Expand** the boundary to include necessary pre-start work or a second ending (correction, approval, delivery, follow-up) only when omitting it would hide the bottleneck or human/AI boundary.

**Do not expand** to document the participant's entire job, team, or organization. Unrelated work outside the approved boundary is intentionally omitted.

Within the approved start and end, include every activity, wait, handoff, decision, external condition, and material exception needed to explain the job, the verdict, or the selected slice.
