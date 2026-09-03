# Agent Specification — {{selected_slice_name}}

**Case:** {{slug}}
**Specification revision:** {{spec_revision}}
**Case-card revision:** {{card_revision}}
**Date:** {{date}}

---

## 1. Purpose and job

**Approved job story:**

> When {{job_situation}}, I need to {{job_progress}}, so I can {{job_outcome}}, while preserving {{job_quality}}.

**Project goal:** {{project_goal}}

**Why this slice serves them:** {{slice_purpose}}

<!-- Connect the selected slice to the job story and project goal.
     Explain the causal path: what workflow state does this slice change,
     and how does that state advance the project goal? -->

---

## 2. Anchor evidence

**Real occurrence:** {{anchor_occurrence}}

**Pain:** {{pain_evidence}}

**Bottleneck:** {{observed_bottleneck}}

**Representative evidence:** {{representative_evidence}}

<!-- The specific real case that grounds this specification.
     Include: date/period, trigger, what went wrong or was costly,
     and concrete artifacts or states that demonstrate the problem. -->

---

## 3. Selected scope

**Start:** {{scope_start}}

**End:** {{scope_end}}

**Actor/system boundary:** {{scope_actor_boundary}}

**Included behavior:** {{scope_included_behavior}}

<!-- The exact start state, end state, and boundary of what this agent does.
     Name the actors and systems that are inside and outside the boundary. -->

---

## 4. Non-goals

{{non_goals}}

<!-- Adjacent activities, future opportunities, and prohibited scope expansion.
     Include AI-suitable activities that were identified but not selected for this specification.
     Each non-goal should name what it is and why it is excluded. -->

---

## 5. Trigger and starting state

**Trigger:** {{trigger}}

**Starting state:** {{starting_state}}

**Preconditions:** {{preconditions}}

<!-- What initiates the behavior and what must already exist before the agent begins.
     Include: the event or condition that starts execution,
     the state of inputs and systems at that moment,
     and any preconditions that must be true. -->

---

## 6. Input contract

| Input | Source | Owner | Format/Fields | Access method | Freshness | Redaction |
|-------|--------|-------|---------------|---------------|-----------|-----------|
| {{input_name}} | {{input_source}} | {{input_owner}} | {{input_format}} | {{input_access}} | {{input_freshness}} | {{input_redaction}} |

**Representative examples:** {{input_examples}}

<!-- Every input the agent reads or receives.
     For each: who owns it, what it contains, how the agent accesses it,
     how fresh it must be, and what must be redacted.
     Include realistic representative examples the builder can use as test fixtures. -->

---

## 7. Required behavior

{{required_behavior}}

<!-- Transformations, rules, ordering, traceability, and observable state transitions.
     Describe what the agent does with the inputs to produce the outputs.
     Be specific about:
     - transformation logic and rules
     - ordering and sequencing requirements
     - traceability from input to output
     - observable intermediate states
     Use the participant's language for domain concepts. -->

---

## 8. Output contract

| Output | Destination | Consumer | Format | Provenance |
|--------|-------------|----------|--------|------------|
| {{output_name}} | {{output_destination}} | {{output_consumer}} | {{output_format}} | {{output_provenance}} |

**Acceptance evidence:** {{output_acceptance}}

<!-- Every artifact or state the agent produces.
     For each: where it goes, who uses it, what format it takes,
     and how its provenance is tracked.
     Include the observable evidence that the output is correct. -->

---

## 9. Human boundary

{{human_boundary}}

<!-- Retained decisions, judgment, approvals, communication, relationships, and external actions.
     For each human-retained activity:
     - what the human decides or does
     - why it remains human (consequence, judgment, authority, relationship, learning, privacy, preference)
     - the handoff point: where AI output ends and human action begins
     - what the human receives from the agent to support their decision -->

---

## 10. Exceptions and safe failure

| Exception | Condition | Safe behavior |
|-----------|-----------|---------------|
| {{exception_name}} | {{exception_condition}} | {{exception_behavior}} |

<!-- Missing, malformed, conflicting, duplicate, late, unauthorized, or uncertain inputs.
     For each: the specific condition, what the agent does (abort, escalate, retry, degrade),
     and how recovery works.
     Every exception must have explicit safe behavior — no silent failures. -->

---

## 11. Permissions and constraints

**Privacy:** {{privacy_constraints}}

**Retention:** {{retention_constraints}}

**Access scope:** {{access_scope}}

**Policy constraints:** {{policy_constraints}}

**Environment constraints:** {{environment_constraints}}

**Reversibility:** {{reversibility}}

**Prohibited effects:** {{prohibited_effects}}

<!-- What the agent may and may not do.
     Include: data it may and may not read/write/store,
     consent and retention requirements,
     environmental or organizational policies,
     whether its actions are reversible,
     and effects that are explicitly prohibited. -->

---

## 12. Acceptance criteria

{{acceptance_criteria}}

<!-- Observable transformation checks using participant language and representative fixtures.
     Each criterion should be:
     - stated in the participant's terms, not technical jargon
     - testable against a concrete input/output pair
     - traceable to a required behavior or output contract item
     Include representative test fixtures when available. -->

---

## 13. Workflow outcome hypothesis

**Baseline:** {{baseline}}

**Expected change:** {{expected_change}}

**Causal mechanism:** {{causal_mechanism}}

**Measurement window:** {{measurement_window}}

**Evaluator:** {{evaluator}}

**Disconfirming result:** {{disconfirming_result}}

<!-- How workflow improvement will be judged.
     The baseline is current measured or estimated performance.
     The expected change names a specific improvement and its mechanism.
     The disconfirming result names what evidence would show
     this intervention did not work. -->

---

## 14. Assumptions and unresolved questions

{{assumptions_and_unknowns}}

<!-- Unknowns that do not change approved semantics or safety.
     Material unknowns that would change intent, scope, safety,
     or product behavior block completion instead of appearing here.
     For each assumption: what is assumed, what evidence supports it,
     and what would invalidate it. -->

---

## 15. Approval and provenance

**Participant approval:** {{participant_approval}}

**Approval date:** {{approval_date}}

**Organizational authority confirmation:** {{org_authority}}

**Specification revision:** {{spec_revision}}

**Companion artifacts:**
- Case card: `case-card.md` (revision {{card_revision}})
- Workflow blueprint: `workflow-blueprint.html` (revision {{blueprint_revision}})

---

> "Use this as the approved product and workflow specification. Inspect the relevant technical environment, identify any technical unknowns, propose an implementation plan, and wait for approval before building. Do not reinterpret the job, broaden the selected slice, or move the human/AI boundary without returning those choices to the owner."
