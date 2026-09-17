# No-Code Verdict

**Case:** {{slug}}
**Date:** {{date}}
**Revision:** {{revision}}

---

## Verdict

**Reason:** `{{reason}}`
<!-- One of: non-causal, human-retained, existing-or-simpler-solution, disproportionate-value, unsafe-or-unverifiable -->

---

## Participant's job

{{job_story}}

---

## Project goal

{{project_goal}}

---

## Anchor occurrence

{{anchor_occurrence}}

---

## Workflow-map boundary

**From:** {{boundary_start}}
**Through:** {{boundary_end}}

---

## Observed bottleneck

{{observed_bottleneck}}

---

## State code could create

{{state_code_could_create}}

<!-- What software is technically capable of producing in this workflow.
     Name the specific state change, artifact, or action that is
     technically possible — then the reason-specific section below
     explains why no agent brief is warranted despite that capability. -->

---

## Why no new agent brief is warranted

{{why_no_brief}}

---

## Reason-specific evidence

<!-- Include ONLY the block matching the verdict reason above. Delete the others when rendering. -->

### If reason is `non-causal`

**Software-created state:** {{noncausal_state}}

**Human or organizational dependency it cannot enforce:** {{noncausal_dependency}}

**Why the state would not cause the desired progress:** {{noncausal_explanation}}

**Default form:**

> "I could not find a useful software lever for this job. In the case we traced, {{noncausal_evidence}}. Code could {{noncausal_technical_capability}}, but that would {{noncausal_effect}} rather than {{noncausal_desired_progress}}."

---

### If reason is `human-retained`

**Passing technical candidate:** {{retained_candidate}}

**Participant's chosen human boundary:** {{retained_boundary}}

**Participant's reason:** {{retained_reason}}

**Explicit statement:** This is a preference or authority decision rather than technical impossibility.

**Default form:**

> "There is a technically viable AI slice here, but no agent brief is warranted under the boundary you chose. You want {{retained_activity}} to remain human because {{retained_participant_reason}}."

---

### If reason is `existing-or-simpler-solution`

**Existing tool, configuration, or process change:** {{existing_solution}}

**How it already provides the useful state:** {{existing_how}}

**Remaining gap (if any):** {{existing_gap}}

**Default form:**

> "A new AI build is not warranted for this job. {{existing_tool_or_change}} already creates the useful state with less cost or complexity."

---

### If reason is `disproportionate-value`

**Current frequency and cost:** {{disproportionate_frequency}}

**Expected benefit:** {{disproportionate_benefit}}

**Switching and upkeep burden:** {{disproportionate_burden}}

**Why a new build is not proportionate:** {{disproportionate_explanation}}

**Default form:**

> "A new AI build is not proportionate for this case. The expected improvement is {{disproportionate_expected_benefit}}, while the switching and upkeep burden is {{disproportionate_cost_or_risk}}."

---

### If reason is `unsafe-or-unverifiable`

**Technically possible state change:** {{unsafe_state_change}}

**Confirmed boundary it violates:** {{unsafe_boundary}}
<!-- One or more of: permission, reversibility, failure-safety, observability -->

**Why narrowing did not leave a useful safe slice:** {{unsafe_narrowing_explanation}}

**Default form:**

> "AI could technically perform {{unsafe_capability}}, but no agent brief is warranted because {{unsafe_confirmed_boundary}} cannot be satisfied without losing the useful part of the workflow."

---

## Participant response

**Agreement:** {{participant_agreement}}
<!-- One of: agrees, disagrees, uncertain -->

**Participant's stated reason (if disagrees or uncertain):** {{participant_disagreement_reason}}

<!-- Agreement with MISO's evaluative verdict is not required for an evidence-complete no-code result.
     A disagreement that supplies material new evidence reopens analysis (Q4 or Q5).
     A disagreement about preference or interpretation is recorded without forcing assent. -->

---

## Re-entry condition

{{reentry_condition}}

<!-- What evidence, permission, tool change, or circumstance shift would make
     this workflow worth testing again for a software lever.
     This is a factual condition, not advice or a recommended action. -->

---

## Companion artifacts

- Case card: `case-card.md` (revision {{card_revision}})
- Workflow blueprint: `workflow-blueprint.html` (revision {{blueprint_revision}})

---

<!-- This verdict contains no advice, checklist, action plan, coaching exercise,
     operating agreement, or generic recommendations. -->
