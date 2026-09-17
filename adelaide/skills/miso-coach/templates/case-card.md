# MISO Case Card

<!-- Canonical resumable case — all artifacts render from this card -->
<!-- Two layers: Working Evidence (persisted after each probe) and Approved Model (after readback) -->

**Session ID:** {{session_id}}
**Slug:** {{slug}}
**Created:** {{created_date}}
**Last updated:** {{last_updated}}
**Revision:** {{revision_number}}

---

## Status

**Current stage:** {{current_macro_question}} of 6 — {{stage_label}}
**Terminal state:** {{terminal_state}}
<!-- One of: in-progress, spec-ready, no-code, out-of-scope, needs-case, needs-authority, needs-evidence, review-blocked -->

**Resume phrase:** {{resume_phrase}}
<!-- Precise phrase the participant can use to resume; blank when complete -->

### Stage progress

| Stage | Label | Status |
|-------|-------|--------|
| 1 | The annoying task | {{stage_1_status}} |
| 2 | The job | {{stage_2_status}} |
| 3 | The subgoals | {{stage_3_status}} |
| 4 | The activities | {{stage_4_status}} |
| 5 | Human or AI | {{stage_5_status}} |
| 6 | {{stage_6_label}} | {{stage_6_status}} |

<!-- Stage status values: not-started, in-progress, approved, revisiting -->
<!-- Stage 6 label: "Agent specification" or "Outcome" depending on path -->

---

## Approval records

| What | Approved by | Date | Notes |
|------|-------------|------|-------|
| {{approval_item}} | {{approver}} | {{approval_date}} | {{approval_notes}} |

<!-- Add rows as approvals occur. Key approval gates:
     - Provisional job story (Q2 exit)
     - Project goal (Q2 exit)
     - Subgoal tree (Q3 exit)
     - Workflow-map boundary (Q4 exit)
     - Allocation map (Q5 exit)
     - Selected slice (Q5 exit)
     - Final specification or verdict (Q6 exit)
     - Organizational authority (when required)
-->

---

## 1. Scope

### Working evidence
{{scope_working}} `[{{scope_working_provenance}}]`

### Approved model
{{scope_approved}} `[{{scope_approved_provenance}}]`

<!-- Why this qualifies as a work/project workflow -->

---

## 2. Participant language

### Working evidence
{{participant_language_working}} `[verbatim]`

### Approved model
{{participant_language_approved}} `[verbatim]`

<!-- Important nouns, verbs, metaphors, and quality terms to preserve in all artifacts -->

---

## 3. Annoying task

### Working evidence
{{annoying_task_working}} `[{{annoying_task_working_provenance}}]`

### Approved model
{{annoying_task_approved}} `[{{annoying_task_approved_provenance}}]`

<!-- The current task or workaround as experienced by the participant -->

---

## 4. Anchor occurrence

### Working evidence
{{anchor_occurrence_working}} `[{{anchor_occurrence_working_provenance}}]`

- **Date or period:** {{anchor_date}} `[{{anchor_date_provenance}}]`
- **Trigger:** {{anchor_trigger}} `[{{anchor_trigger_provenance}}]`
- **Starting state:** {{anchor_starting_state}} `[{{anchor_starting_state_provenance}}]`
- **Perceived end:** {{anchor_perceived_end}} `[{{anchor_perceived_end_provenance}}]`
- **Actual end:** {{anchor_actual_end}} `[{{anchor_actual_end_provenance}}]`

### Approved model
{{anchor_occurrence_approved}} `[{{anchor_occurrence_approved_provenance}}]`

---

## 5. Workflow-map boundary

### Working evidence
{{workflow_boundary_working}} `[{{workflow_boundary_working_provenance}}]`

- **Start state:** {{boundary_start}} `[{{boundary_start_provenance}}]`
- **End state:** {{boundary_end}} `[{{boundary_end_provenance}}]`

### Approved model
{{workflow_boundary_approved}} `[{{workflow_boundary_approved_provenance}}]`

<!-- Participant-approved start and end states for the relevant workflow shown in the blueprint -->

---

## 6. Pain evidence

### Working evidence
{{pain_evidence_working}} `[{{pain_evidence_working_provenance}}]`

### Approved model
{{pain_evidence_approved}} `[{{pain_evidence_approved_provenance}}]`

<!-- Time, delay, rework, error, risk, missed outcome, or other observable gap -->

---

## 7. Provisional job story

### Working evidence
{{job_story_working}} `[{{job_story_working_provenance}}]`

> When {{job_situation}}, I need to {{job_progress}}, so I can {{job_outcome}}, while preserving {{job_quality}}.

### Approved model
{{job_story_approved}} `[{{job_story_approved_provenance}}]`

**Formulation pass:** {{job_pass}}
<!-- "provisional (Q2)" or "revised (Q5)" -->

---

## 8. Project goal

### Working evidence
{{project_goal_working}} `[{{project_goal_working_provenance}}]`

### Approved model
{{project_goal_approved}} `[{{project_goal_approved_provenance}}]`

<!-- The observable workflow change sought in this intervention -->

---

## 9. Goal status

**Status:** {{goal_status}}
<!-- One of: provisional, revised, approved -->

---

## 10. Subgoal tree

### Working evidence

{{subgoal_tree_working}} `[{{subgoal_tree_working_provenance}}]`

<!-- Use indented list with [AND], [OR], or [external condition] markers:
- Subgoal A [AND]
  - Subgoal A.1 [AND]
  - Subgoal A.2 [OR]
    - Subgoal A.2a
    - Subgoal A.2b
  - Subgoal A.3 [external condition]
- Subgoal B [AND]
-->

### Approved model

{{subgoal_tree_approved}} `[{{subgoal_tree_approved_provenance}}]`

---

## 11. Activities

### Working evidence

{{activities_working}} `[{{activities_working_provenance}}]`

<!-- Per activity, record as available:
| # | Activity | Trigger | Actor | Input/Source | Action | Tool/System | Output/Destination | Handoff | Rule/Judgment | Dependency | Exception | Quality evidence |
-->

### Approved model

{{activities_approved}} `[{{activities_approved_provenance}}]`

---

## 12. Actors and systems

### Working evidence
{{actors_systems_working}} `[{{actors_systems_working_provenance}}]`

### Approved model
{{actors_systems_approved}} `[{{actors_systems_approved_provenance}}]`

<!-- People, tools, sources, destinations, owners, and authority -->

---

## 13. Inputs and outputs

### Working evidence
{{inputs_outputs_working}} `[{{inputs_outputs_working_provenance}}]`

### Approved model
{{inputs_outputs_approved}} `[{{inputs_outputs_approved_provenance}}]`

<!-- Inspectable objects, data, records, messages, or states -->

---

## 14. Decisions and rules

### Working evidence
{{decisions_rules_working}} `[{{decisions_rules_working_provenance}}]`

### Approved model
{{decisions_rules_approved}} `[{{decisions_rules_approved_provenance}}]`

<!-- Judgment, approval, matching, prioritization, and authority boundaries -->

---

## 15. Friction and exceptions

### Working evidence
{{friction_exceptions_working}} `[{{friction_exceptions_working_provenance}}]`

### Approved model
{{friction_exceptions_approved}} `[{{friction_exceptions_approved_provenance}}]`

<!-- Waits, chases, rework, missing data, conflicts, alternate paths, and failures -->

---

## 16. Desired allocation

### Working evidence

{{desired_allocation_working}} `[{{desired_allocation_working_provenance}}]`

<!-- Per activity: how much the participant wants to keep
| Activity | Desired level | Reason |
-->

### Approved model

{{desired_allocation_approved}} `[{{desired_allocation_approved_provenance}}]`

---

## 17. Feasible allocation

### Working evidence

{{feasible_allocation_working}} `[{{feasible_allocation_working_provenance}}]`

<!-- Per activity: how much AI may safely and usefully own
| Activity | Feasible level | Boundary | Evidence |
-->

### Approved model

{{feasible_allocation_approved}} `[{{feasible_allocation_approved_provenance}}]`

---

## 18. Allocation reason

### Working evidence
{{allocation_reason_working}} `[{{allocation_reason_working_provenance}}]`

### Approved model
{{allocation_reason_approved}} `[{{allocation_reason_approved_provenance}}]`

<!-- Why each activity remains human, becomes assisted, or is delegated -->

---

## 19. Candidate set

### Working evidence
{{candidate_set_working}} `[{{candidate_set_working_provenance}}]`

### Approved model
{{candidate_set_approved}} `[{{candidate_set_approved_provenance}}]`

<!-- Bounded AI-suitable slices considered, with lever-test results -->

---

## 20. Selected slice

### Working evidence
{{selected_slice_working}} `[{{selected_slice_working_provenance}}]`

### Approved model
{{selected_slice_approved}} `[{{selected_slice_approved_provenance}}]`

<!-- The one activity or stage selected for the specification -->

---

## 21. Model layers

### Working evidence

- **Current-state (observed):** {{current_state_working}} `[{{current_state_working_provenance}}]`
- **Proposed allocation:** {{proposed_allocation_working}} `[{{proposed_allocation_working_provenance}}]`

### Approved model

- **Current-state (observed):** {{current_state_approved}} `[{{current_state_approved_provenance}}]`
- **Proposed allocation:** {{proposed_allocation_approved}} `[{{proposed_allocation_approved_provenance}}]`

<!-- Observed current-state facts versus proposed future allocation -->

---

## 22. Transformation acceptance

### Working evidence
{{transformation_acceptance_working}} `[{{transformation_acceptance_working_provenance}}]`

### Approved model
{{transformation_acceptance_approved}} `[{{transformation_acceptance_approved_provenance}}]`

<!-- Evidence that the proposed output or state is correct -->

---

## 23. Workflow baseline

### Working evidence
{{workflow_baseline_working}} `[{{workflow_baseline_working_provenance}}]`

### Approved model
{{workflow_baseline_approved}} `[{{workflow_baseline_approved_provenance}}]`

<!-- Current frequency, time, delay, error, rework, risk, or cost -->

---

## 24. Outcome hypothesis

### Working evidence
{{outcome_hypothesis_working}} `[{{outcome_hypothesis_working_provenance}}]`

- **Expected change:** {{expected_change}} `[{{expected_change_provenance}}]`
- **Mechanism:** {{mechanism}} `[{{mechanism_provenance}}]`
- **Measurement window:** {{measurement_window}} `[{{measurement_window_provenance}}]`
- **Disconfirming result:** {{disconfirming_result}} `[{{disconfirming_result_provenance}}]`

### Approved model
{{outcome_hypothesis_approved}} `[{{outcome_hypothesis_approved_provenance}}]`

---

## 25. Non-goals

### Working evidence
{{non_goals_working}} `[{{non_goals_working_provenance}}]`

### Approved model
{{non_goals_approved}} `[{{non_goals_approved_provenance}}]`

<!-- Adjacent capabilities deliberately excluded -->

---

## 26. Open uncertainty

### Working evidence
{{open_uncertainty_working}} `[{{open_uncertainty_working_provenance}}]`

### Approved model
{{open_uncertainty_approved}} `[{{open_uncertainty_approved_provenance}}]`

<!-- Facts that could change intent, scope, safety, authority, or the verdict -->

---

## Provenance key

| Marker | Meaning |
|--------|---------|
| `[verbatim]` | Participant's exact words |
| `[approved paraphrase]` | MISO paraphrase, participant approved |
| `[hypothesis]` | MISO hypothesis, not yet approved |
| `[unresolved]` | Unknown or conflicting — requires resolution |

---

## Artifact references

| Artifact | Revision | Hash/ID |
|----------|----------|---------|
| case-card.md | {{card_revision}} | {{card_hash}} |
| workflow-blueprint.html | {{blueprint_revision}} | {{blueprint_hash}} |
| {{spec_or_verdict_filename}} | {{spec_revision}} | {{spec_hash}} |
