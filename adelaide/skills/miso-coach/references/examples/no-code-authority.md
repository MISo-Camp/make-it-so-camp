# Example: No-Code Verdict — Jordan's Launch Commitments

Worked example showing the MISO flow for a case where no useful software lever exists. This is reference material for the AI interviewer, never read to the participant.

## Participant

Jordan, product manager on the Growth team at a mid-stage startup.

## The annoying task

The Growth team missed two launch commitments in the last quarter. Jordan tracks launch tasks in Linear with owners and dates, maintains a launch document in Notion with milestones and dependencies, and posts status updates in a dedicated Slack channel. Despite all of this, the lifecycle-email feature slipped by three weeks and the onboarding-flow update missed its window entirely.

## Anchor occurrence

Six weeks ago. Trigger: the lifecycle-email launch was due on a Friday. On Tuesday, the CEO asked the Growth team's senior engineer to investigate a production performance issue for an enterprise client. The engineer context-switched to the CEO's request. The lifecycle-email work stopped. Jordan saw the Linear task go stale on Wednesday but did not escalate because the CEO's request felt like it had implicit priority. By Friday, the launch date passed. Jordan updated the launch doc and posted in Slack that the date had moved. The VP of Product asked what happened in the Monday standup. The VP of Growth said the CEO's request was urgent. No one decided which priority should have lost.

## Pain evidence

- Two missed launch commitments in one quarter
- The information that the work had stopped was visible in Linear and Slack within 24 hours
- No one with authority made a trade-off decision between the competing priorities
- Jordan felt unable to escalate because the CEO's request carried implicit authority

## The job

> "When the Growth team has launch commitments and competing priorities, I need the right work to actually get done on time, so launches land when promised, while preserving the team's ability to respond to urgent executive requests."

## Project goal

Growth launch commitments land on time without ignoring legitimate urgent requests.

## Subgoals

1. Launch commitments are clear and owned [AND]
2. Competing priorities are identified before they displace committed work [AND]
3. When priorities conflict, an authorized person decides which work loses [AND]
4. The team executes on the resolved priority

## Activities (anchor occurrence)

1. Launch tasks tracked in Linear with owner and date (system: Linear; actor: Jordan)
2. Launch document maintained in Notion (system: Notion; actor: Jordan)
3. Status updates posted in Slack (system: Slack; actor: Jordan)
4. CEO requests engineer to investigate performance issue (actor: CEO; implicit authority)
5. Engineer context-switches to CEO request (actor: engineer; judgment: CEO request feels higher priority)
6. Linear task goes stale (observable state: no activity for 48+ hours)
7. Jordan notices stale task but does not escalate (actor: Jordan; judgment: CEO request feels like it has priority)
8. Launch date passes (observable state: missed commitment)
9. Jordan updates documents and posts in Slack (actor: Jordan; system: Linear, Notion, Slack)
10. VP of Product asks what happened (actor: VP Product; trigger: Monday standup)
11. No trade-off decision made (missing: neither VP resolves the competing priorities)

## Root issue

The problem is not an information gap. The information already exists:

- Linear shows the task is stale.
- Slack shows the CEO's request happened.
- The launch document shows the commitment.
- Jordan and both VPs know the facts.

The problem is an **authority and priority conflict**. The CEO's request displaced committed work, and no one with authority over both priorities (VP of Product and VP of Growth, or the CEO) made an explicit decision about which work should lose. The engineer and Jordan both deferred to implicit authority rather than escalating the conflict.

## What software could do

Software could:

- **Build a dashboard** showing launch-task status and competing requests in one view
- **Send automated reminders** when a task goes stale for 24+ hours
- **Create an escalation bot** that alerts a VP when a launch-critical task is blocked
- **Generate a priority-conflict report** when an engineer is assigned work from two teams

## Why no software lever exists (non-causal)

All four options fail the software-lever test:

**Test 1 — External state:** The state these tools would create (a dashboard, an alert, a report) already exists in Linear, Slack, and Notion. The information is already inspectable. A new tool would duplicate it in a different format.

**Test 2 — Proximate advancement:** A dashboard or alert does not make the launch work more complete or delivered. It makes the conflict harder to ignore. Its only value depends on someone (Jordan or a VP) seeing the alert and then choosing to act on it — which is exactly what did not happen with the existing tools.

**Test 3 — Causal relevance:** The bottleneck in the anchor case was not "Jordan didn't know the task was stale." Jordan knew on Wednesday. The bottleneck was "no one with authority decided which priority loses." Software cannot make that decision. It can only make the conflict more visible — and it was already visible.

The anti-dashboard/reminder rule applies: a task, status, dashboard, alert, ownership record, or escalation fails when its only value comes from somebody noticing, caring, trying harder, or complying.

## Verdict

> "I could not find a useful software lever for this job. In the case we traced, Growth missed lifecycle-email drafts because a CEO request displaced the work. Code could create a dashboard, reminder, or escalation, but that would make the conflict harder to ignore rather than resolve the competing priorities."

Reason: `non-causal`

## Participant response

Jordan agreed with the factual account. Jordan was uncertain about the verdict — "It feels like something should help" — but could not name what a tool would do that the existing Linear/Slack/Notion setup does not already do. Uncertainty recorded without forcing agreement.

## Re-entry condition

> "If the VPs establish a standing trade-off protocol that requires meaningful routing to an authorized resolver, a software lever that implements that routing may be worth testing."

This is a re-entry condition, not a recommendation. MISO does not tell Jordan to go create a trade-off protocol. If the organizational precondition is met in the future, the workflow can be re-examined for a causal software lever.
