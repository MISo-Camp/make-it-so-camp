# 03 — The subgoals

## Purpose

Identify what had to become true for the anchor occurrence to achieve the job. The participant has a provisional job and project goal. This question maps the intermediate outcomes — the things that had to be accomplished along the way — as an outcome tree the participant recognizes.

## Breadcrumb

**Label:** The subgoals
**Number:** 3

```
Question 3 of 6 · The subgoals
✓ Annoyance → ✓ Job → ● Subgoals → ○ Activities → ○ Human/AI → ○ Outcome
```

Follow-up probes retain this number and label.

## Method

### Primary prompt

> "For that result to be true, what had to become true along the way?"

Anchor "that result" in the approved provisional job story or project goal by name, using the participant's words.

**When the participant's earlier answers already contained subgoal-like outcomes** (things that had to become true), draft the tree immediately from that material rather than prompting from scratch. Acknowledge the supplied structure:

> "You already described several things that had to be true. Let me organize what I heard — tell me what's wrong or missing."

This avoids re-eliciting material that was already provided, which feels like a form rather than a conversation.

### Drafting the outcome tree

From participant-supplied evidence, draft a small outcome tree and present it for correction. Subgoals describe achieved states — things that are true when the work is done — not software components, departments, or vague responsibilities.

Use the participant's language. Label the draft as an inference:

> "Based on what you described, here's what had to be true for [project goal]. What's wrong or missing?"

### Tree structure

Distinguish three kinds of refinement:

- **AND refinement:** every child outcome is necessary for the parent to be true. Mark these `[AND]`.
- **OR refinement:** children are alternative ways to achieve the same parent outcome. Mark these `[OR]`.
- **External condition:** a dependency the participant or proposed software cannot enforce — it must be true, but no one in this workflow controls it. Mark these `[external condition]`.

Present the tree as an indented list. Example:

```
Project goal: [goal in participant's words]
  [AND] Subgoal A: [achieved state]
  [AND] Subgoal B: [achieved state]
    [OR] Subgoal B1: [one way to achieve B]
    [OR] Subgoal B2: [alternative way to achieve B]
  [external condition] Subgoal C: [dependency outside anyone's control here]
```

### Probes for subgoals

Use the probe ladder from INTERVIEW.md. Useful prompts for this stage:

- "What had to happen before you could even start [the main task]?"
- "You mentioned [step]. What had to be true for that to work?"
- "Was there anything that had to be resolved before you could move on?"
- "What could have gone wrong between [subgoal A] and [subgoal B]?"
- "Is there anything here that depends on something outside your control?"

### No arbitrary quotas

Do not require a fixed number of subgoals. Use as many as explain the real workflow and no more. Three subgoals for a simple workflow and eight for a complex one are both fine if the participant recognizes the tree. See `references/workflow-models.md` for the no-quota principle.

### External conditions

When a subgoal depends on something no one in this workflow can enforce — a market condition, a third party's timeline, a regulation — mark it as an external condition rather than treating it as a software requirement. This distinction matters in question 5 when testing whether software can causally advance the work.

### Readback

Before exiting, present the complete outcome tree and ask for correction:

> "Here's what I have. Each of these had to be true for [project goal]. What's wrong or missing?"

The participant approves as "true enough to continue."

## Exit

The macro-question is complete when:

1. Each subgoal traces to the job or project goal — there are no orphan outcomes.
2. The participant recognizes the tree as a fair account of what had to become true.
3. External conditions are not misrepresented as things software could enforce.

Update the case card with the approved subgoal tree. Deliver the momentum checkpoint per INTERVIEW.md.

Then advance to `dialogue/04-activities.md`.
