# Cold-Reader Specification Review

Reference for the specification review step before final participant approval. Never read to the participant.

## Fixed checklist

A fresh-context reviewer receives only `agent-spec.md` and must be able to state:

1. **The job and project goal** — what progress the participant is making and what observable workflow change this intervention targets.
2. **What one thing is being specified** — the selected slice, in one sentence.
3. **The exact trigger, inputs, behavior, outputs, and destination** — when it starts, what it reads, what it does, what it produces, and where the result goes.
4. **What people still decide or approve** — every human-retained judgment, approval, relationship action, and authority boundary.
5. **Prohibited effects** — what the specified behavior must not do, including pre-approval actions, scope expansion, and external mutations.
6. **Exception and failure behavior** — what happens when input is missing, conflicting, malformed, duplicate, late, unauthorized, or uncertain.
7. **How transformation success is judged** — the observable acceptance evidence for the produced output or state.
8. **How workflow improvement could be falsified** — the outcome hypothesis, measurement window, and disconfirming result.

If the reviewer cannot state any of these from the specification alone, that item is an ambiguity or gap.

## Reviewer scope

The reviewer returns **only**:

- Ambiguities (language that permits two readings)
- Contradictions (statements that conflict with each other)
- Invented-semantics risks (places where a building agent would need to guess product meaning)
- Missing information (items from the checklist that cannot be answered)

The reviewer does **not**:

- Choose technology, architecture, or implementation approach
- Create a plan, estimate, or task list
- Suggest features, scope expansion, or improvements
- Evaluate whether the specification is a good idea

## Fallback when independent agent is unavailable

When a separate fresh-context agent cannot be invoked, MISO applies the same fixed checklist itself and discloses that the review was not independent:

> "I applied the specification review checklist myself rather than sending it to a separate reviewer. The review was not independent -- I wrote both the specification and the review."

Independence is a quality enhancement, not a reason to bypass the review or skip the terminal boundary.

## Communicating results to the participant

When presenting review findings, briefly name the categories that were checked:

> "I verified the trigger, inputs, behavior, outputs, human boundary, prohibited effects, exception handling, acceptance criteria, and outcome hypothesis. Here's what I found..."

For detail-oriented participants, this enumeration builds confidence that the review was thorough. For others, a briefer version is fine ("I checked the specification against eight standard criteria").

## Review disposition

After the review produces findings:

- **Fix wording or internal contradictions directly** when the correction does not change participant meaning. These are mechanical fixes MISO can make without returning to the participant.
- **Return decisions about intent, scope, authority, privacy, failure behavior, and acceptance to the participant.** These require a human choice. Ask the participant.
- **Keep unresolved non-material technical facts visible** for the later building agent. These are things the building agent should investigate during technical discovery.
- **Set `review-blocked`** when a material semantic or safety decision remains and the participant has not yet resolved it. The specification cannot be finalized until the decision is made.
