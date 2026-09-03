# 04 — The activities

## Purpose

Reconstruct how the anchor occurrence actually moved through the subgoals and surrounding systems. The participant described what had to become true; this question asks what they actually did to make it true — the real actions, decisions, handoffs, waits, rework, and exceptions in the specific case they described.

## Breadcrumb

**Label:** The activities
**Number:** 4

```
Question 4 of 6 · The activities
✓ Annoyance → ✓ Job → ✓ Subgoals → ● Activities → ○ Human/AI → ○ Outcome
```

Follow-up probes retain this number and label. When mapping activities for multiple subgoals, use nested position: `Question 4 of 6 · Activities · Subgoal 2 of 4`.

## Method

### Primary prompt

> "Let's replay that case from the trigger. What did you actually do first?"

Anchor the replay in the specific anchor occurrence approved in question 1, not a generic version of the process.

### What to capture per activity

For each consequential activity in the anchor occurrence, capture only what the case supports. Do not invent fields the participant has not mentioned. Find out (one question per turn, in the order the conversation naturally goes):

- **Trigger or preceding state:** what had to be true before this activity could start
- **Actor:** who performed it — the participant, a colleague, a system, an external party
- **Input and source:** what data, document, message, or state they started with, and where it came from
- **Action, transformation, or decision:** what they actually did with that input
- **Tool or system:** what they used to do it — application, spreadsheet, email, manual process
- **Output and destination:** what was produced and where it went
- **Handoff or receiver:** who or what got the output next
- **Rule, judgment, or approval:** any decision, matching, prioritization, or sign-off involved
- **Dependency or permission:** anything required before proceeding that someone else controls
- **Exception, rework, wait, or failure:** what went wrong, what had to be redone, where they got stuck
- **Observable quality evidence:** how they knew the output was correct or good enough

### The stranger test

Use this as the grain rule for when to split an activity further:

> Could a competent stranger perform this activity from the named inputs without needing hidden product decisions?

If not, ask what the stranger would get wrong, and split the activity at that point. Stop before decomposing into meaningless keystrokes. See `references/workflow-models.md` for the granularity stop rule and the five workflow views.

### Five workflow views

The workflow model covers these views as needed — not all are required for every workflow, but use whichever ones reveal the structure:

1. **Sequence:** the order things happened in the anchor case
2. **Flow between actors and systems:** who handed what to whom
3. **Artifacts and state changes:** what was created, modified, or consumed
4. **Decisions and authority:** who decided what, and under what rules or judgment
5. **Contextual policies, permissions, relationships, and constraints:** organizational or environmental factors that shaped the workflow

### Following surprises

Contradictions, exceptions, rework, waits, and authority boundaries outrank the next activity in the sequence. When the participant mentions something unexpected — "Actually, that's only half the time" or "Sometimes it comes back wrong" — follow it. These surprise paths often contain the causal bottleneck or the real human/AI boundary.

### Depth allocation

Depth is required for the selected slice, not for every corner of the workflow. Ask about an activity only when the answer could change the job, allocation, lever verdict, selected boundary, failure behavior, or acceptance criteria. When an activity is clearly peripheral, a one-line summary is enough.

### Map boundary readback

Before exiting, read back the workflow boundary as:

> "This workflow runs from [observable start state] through [observable end state]."

Use specific language from the participant's case, not abstract labels. Ask the participant to correct or approve that boundary. The boundary defines what appears in the workflow blueprint — activities outside it are intentionally omitted.

### Traceability check

Before exiting, verify (silently) that:

- Every activity supports a subgoal, or is explicitly marked as waste, wait, rework, or an external condition.
- Activities that do not trace to any subgoal are surfaced: "This step doesn't obviously connect to any of the outcomes we listed. Is it necessary, or is it overhead?"
- No subgoal is left without at least one supporting activity.

## Exit

The macro-question is complete when:

1. The workflow has a participant-approved start state and end state.
2. The activities within that boundary are detailed enough to locate causal bottlenecks, software boundaries, and acceptance evidence — but not an exhaustive inventory of the participant's entire job.
3. Each activity traces to a subgoal (or is marked waste/wait/rework/external condition).
4. Actors, systems, key inputs, outputs, handoffs, decisions, and material exceptions are captured for the activities that matter to the verdict.

Update the case card with the approved workflow, map boundary, activities, actors and systems, inputs and outputs, decisions and rules, and friction/exceptions. Deliver the momentum checkpoint per INTERVIEW.md.

Then advance to `dialogue/05-human-or-ai.md`.
