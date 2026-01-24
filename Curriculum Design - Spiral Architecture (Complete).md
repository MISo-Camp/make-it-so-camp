---
type: curriculum-design
scope: internal
project: Internal_Make It So Camp
created: 2026-01-24
updated: 2026-01-24
---

# Make It So Camp: Spiral Curriculum Architecture

## Core Insight

**Make It So Camp = Mindset shift revealed through tool building**

Not a hackathon (ship products). A path participants start walking.

They leave with:
1. New tools they built (proof the mindset works)
2. Ability to articulate why this way of working matters
3. Pattern to continue evolving their practice

---

## Curriculum Architecture

**Structure:** Three recursive loops that deepen participants' ability to recognize and articulate implicit patterns

- **Loop 1: Discovery** - Experience pattern recognition through building at minimal scale
- **Loop 2: Application** - Apply pattern articulation systematically to build working solutions
- **Loop 3: Integration** - Extend pattern articulation to collaborative contexts

Each loop introduces mental models → applies them through building → documents patterns through structured reflection.

**Pattern-Keeping Mechanisms** (integrated throughout):
1. Structured reflection checkpoints
2. Peer pattern reviews
3. Pattern-first briefs

---

## Loop 1: Discovery

**Outcome**: Participants experience the pattern recognition → articulation → building cycle at minimal scale

**Complete when:**
- One working tiny tool built
- One pattern documented (what had to become explicit to build it)
- Experience of "articulation reveals your method"

### 1.1 Mental Model Input: "Your Method is Invisible"

**Outcome:** Participants understand that articulation is the bottleneck (not technical skill) and experience discovering their own implicit patterns

**Core concepts to cover:**
- Why articulation is the bottleneck (not technical skill)
- "My method was partly invisible even to me" (Strategy essay)
- The shift from "user" to "captain"
- Vague vs. articulated requests (concrete examples)

**Example approach: Surfacing Implicit Patterns**

Individual reflection:
- Prompt: "Describe how you currently solve one recurring work problem"
- Observe: What's easy to describe? What's hard to put into words?

Peer pattern identification:
- Share description with partner
- Partner identifies implicit patterns they hear
- Compare: What patterns were invisible to you?

Group debrief:
- What patterns emerged across participants?
- What was hardest to articulate?
- Why does this matter for working with AI?

**Introduce: Pattern-First Brief**
"Before we build, we articulate what we're testing"

---

### 1.2 Tiny Tool Build

**Outcome:** Participants build simplest possible tool while discovering what they must articulate to direct AI

**Pattern-First Brief:**
- "What takes you 10 clicks that shouldn't?"
- Write one sentence: "I want to test if I can articulate [X pattern]"
- Example: "I want to test if I can articulate how I decide which files to rename"

**Environment Setup:**
Participants install Claude Code and run first command. Checkpoint: They've seen Claude respond to a request.

**Build Phase (with peer observation):**
- Pair structure: Builder + Observer
- Builder's job: Make simplest possible version work
- Observer's job: Note what builder has to explain to Claude
- Key question: "What are you having to articulate?"

**Iterate to Working:**
- Test with real input
- Iterate once if it fails
- Observer notes: "What pattern did you refine?"

---

### 1.3 Pattern Reflection

**Outcome:** Participants document what became explicit during building

**Structured documentation (template provided):**
1. What did you have to explain to Claude that surprised you?
2. What was harder to articulate than expected?
3. One pattern you discovered about your own decision-making

**Peer Pattern Review:**
- Observer shares: "Here's the pattern I saw you use"
- Builder reflects: "Did I know I was doing that?"
- Compare notes

**Group synthesis:**
- Volunteers share one discovered pattern
- Connect patterns to mental models theme

---

## Loop 2: Application

**Outcome**: Participants apply pattern articulation systematically to build a working micro-project with documented protocol

**Complete when:**
- One working micro-project built and published
- One protocol documented ("How I [decide/build/evaluate] this type of thing")
- Experience of "structure doesn't constrain, it enables"

### 2.1 Mental Model Input: "Articulation as Design"

**Outcome:** Participants understand articulation as design work (not just documentation)

**Core concepts to cover:**
- Articulation ≠ documentation (design vs. recording)
- "What is the mental model of this list?" (EPA example)
- POV-driven iteration: "THIS not THAT" (Noah WhatsApp)
- When to make things explicit vs. let them stay tacit

**Example approach: Three Ways to Articulate**

Take Loop 1 pattern and articulate it three different ways:
1. As a rule: "Always do X when Y"
2. As a question: "How do I know when Z?"
3. As a trade-off: "I accept A to get B"

Pair discussion: Which articulation is most useful? Why?

**Introduce: Pattern-First Brief Template**

Structure for articulating BEFORE building:
- Goal: What I'm building
- Success criteria: What "good enough" means TO ME
- Out of scope: What I'm NOT doing
- Pattern hypothesis: What pattern am I testing/documenting?

Example walkthrough by facilitator

---

### 2.2 Micro-Project Build

**Outcome:** Participants build a complete micro-project following the pattern-first methodology

**Project Selection (Module 3):**
Criteria: Solves real annoyance, completable in focused session, tangible artifact

Key addition: "What recurring pattern does this solve?"

Brainstorm 3 candidates, pick one
Peer review checkpoint: Does this solve a real pattern?

**Pattern-First Brief (Module 4):**
Write brief using template from 2.1

Critical element: Articulate YOUR success criteria (not generic "good")
Question: "What does 'good enough' mean for this specific thing?"

Peer review: "Does this brief pass clarity test?"

**Brainstorming WITH Claude (Module 5):**
How to brainstorm WITH Claude, not ask it to brainstorm FOR you
- "Yes, and" vs. "no, instead"
- Meta-question: "How do I brainstorm? What's my pattern?"
- Ruthless scoping: essential vs. nice-to-have

**Planning (Module 6):**
Create micro-scale plan (simple numbered list)
Claude helps sequence steps
Checkpoint: 5-10 step plan

**Executing First Pass (Module 7):**
- Hand Claude the plan + brief together
- Peer observation resumes: Observer notes articulation moments
- Watch it work: what to pay attention to
- Basic git: commit = snapshot
- Checkpoint: First draft exists

**Reviewing and Refining (Module 8):**
- Evaluate: does it do what you asked?
- Targeted feedback: "this works, this doesn't, here's what I expected"
- Pattern checkpoint: "What pattern am I refining right now?"
- Observer feedback: "Here's what I saw you articulate"
- Checkpoint: Working version

**Testing and Evaluating (Module 9):**
- Test with real inputs
- "Works" vs. "works well"
- When is it done? (good enough vs. gold-plating)
- Document: "How did I decide it was done?" (capture decision pattern)

**Publishing + Pattern Reflection (Module 10):**
- Put on GitHub (step-by-step)
- Write README

Structured Pattern Documentation:
- What pattern did you discover while building?
- What had to become explicit that was previously implicit?
- If you built this again, what would you document for reuse?
- Create first draft "protocol": "How I build [this type of thing]"

---

### 2.3 Protocol Creation

**Outcome:** Participants transform discovered patterns into reusable protocols

**Structured Protocol Template:**
"How I [decide/build/evaluate] [thing]"

Sections:
1. When I use this pattern
2. My decision criteria (what makes it "good enough")
3. Trade-offs I accept
4. How I know I'm done

**Peer Protocol Review:**
- Exchange protocols with partner
- Test: Can they apply your protocol without you?
- Refine based on feedback
- Key insight: "Structure doesn't constrain, it enables"

---

## Loop 3: Integration

**Outcome**: Participants extend pattern articulation to collaborative contexts and launch small project

**Complete when:**
- One collaborative protocol co-created (with 3-4 peers)
- Small project launched (core feature working)
- Pattern stack begun (connecting personal protocols)
- Understanding of transparency-creativity loop at team scale

### 3.1 Mental Model Input: "The Transparency-Creativity Loop"

**Outcome:** Participants understand how explicit frameworks enable (not constrain) creativity in collaborative contexts

**Core concepts to cover:**
- Strategy-as-Protocol: transparency → creativity → better strategy
- The Fela Kuti groove metaphor (tight structure + internalization = improvisation)
- Psychological safety: explicit = challengeable (Argyris, Edmondson)
- Team of Teams: shared consciousness through explicit frameworks

**Example approach: Load-Bearing vs. Paint**

Review protocols from Loop 1 & 2:
- Identify: Which parts are "structural" (can't change without breaking pattern)?
- Which parts are "paint" (could be done differently)?
- Pair discussion: Where can we improvise within the structure?

**From Personal to Collaborative Protocols:**
- AI-readable, human-editable documentation (Noah insight)
- Example: Design system in markdown vs. Figma
- "THIS not THAT" at team scale
- Exercise: Take one protocol - rewrite for a team

Key question: What needs to be explicit for the team vs. individual?

---

### 3.2 Collaborative Protocol Design

**Outcome:** Participants co-create a protocol that works for multiple people

**Example approach: Co-Create a Team Protocol**

Small groups (3-4 participants):
- Pick one common work pattern (e.g., "How we decide a brief is ready")
- Each person shares their individual pattern
- Group identifies: What's shared? What's different?
- Co-create one protocol that works for everyone
- Test: Can someone outside the group apply it?

**Peer Protocol Challenge:**
- Groups exchange protocols
- Each group tries to find: What's ambiguous? What assumptions are hidden?
- Feedback loop: Refine based on challenges
- Key insight: "Explicit = challengeable = improvable"

**Teaching Patterns to Others:**
- How to onboard someone to your protocol
- Documentation that transfers knowledge (not cargo cult)
- The articulation-creativity loop at team scale

---

### 3.3 Small Project Scoping & Launch

**Outcome:** Participants launch a small project using full pattern stack

**Pattern-First Brief for Small Project:**

Selection criteria (Module 11):
- Scope: Multiple features, browser-based
- Pattern focus: "What problem do I solve manually that has a reusable pattern?"
- Reusability: "Who else would use this pattern?"

Brief structure (Module 12):
- Full brief template (from Loop 2)
- New addition: "What implicit knowledge am I testing?"
- Peer or AI review for clarity

Planning (Module 13):
- Core feature vs. nice-to-haves
- Sequencing: dependencies
- Risks: what might go wrong?
- Pattern stack: "What patterns am I using?" (brief + build + evaluate)

**Project Launch:**
Scaffolding (Module 14):
- Start from template
- Tour what Claude built: frontend, backend, connections
- Checkpoint: Running skeleton
- Begin core feature implementation (Module 15)

---

### 3.4 Building Support + Pattern Documentation

**Outcome:** Participants make progress on small project while documenting emergent patterns

**Facilitated building time:**
- Work on Module 15-16 (core feature + debugging)
- Peer observation (informal, rotates)
- Pattern checkpoints: "What are you learning about your pattern?"

**Mid-build pattern reflection:**
- Pause building periodically
- Document: "Pattern I'm using right now"
- Share with peer: "Can you see the pattern I'm applying?"

### 3.5 Path Forward

**Outcome:** Participants understand how to continue evolving their practice

**Async completion guidance:**
Complete remaining modules at own pace:
- Module 17: Complete all features
- Module 18: User testing
- Module 19: Refine based on feedback
- Module 20: Deploy + PATTERN STACK documentation

**Pattern Stack Documentation:**
When deploying, document the full pattern stack:
1. Patterns used from Loop 1 & 2
2. New patterns discovered
3. "How I build [this category of tool]" protocol
This becomes "Programming OS" starting point

**Continuing practice:**
- Building protocols over time
- From tool builder → organizational designer
- Resources for further learning
- Community connections

**Final Reflection:**
Individual reflection:
- What pattern will you document first when you get back?
- How will you explain this way of working to your team?
- What's one mental model shift you'll keep?

Group share: Volunteers share insights

---

## Design Principles

### Critical Success Factors

**1. Pattern Focus Over Tool Excitement**
Risk: Participants get excited about tools and forget pattern reflection
Mitigation: Structured checkpoints are mandatory deliverables, not optional extras
Facilitator stance: "What pattern are you discovering right now?"

**2. Active Peer Observation**
Observer role must be active, not passive watching
Provide observers with specific prompts: "Note when they have to explain something"
Rotate observers so everyone experiences both roles

**3. Connect Technical Problems to Articulation**
Participants will get stuck on technical problems
Resist pure troubleshooting - connect it back to articulation
Reframe: "What would you need to document to prevent this next time?"

**4. Pattern Documentation as Design Work**
Participants may want to skip documentation ("I'll do it later")
Reframe: "This isn't homework, it's designing your operating system"
Value proposition: "This protocol saves you time forever"

**5. Explicit Frameworks in Collaboration**
Groups will struggle with "whose pattern is right?"
This is the point - negotiating explicit frameworks together
Facilitator reframe: "There's no right pattern, just explicit vs. implicit"

---

## Participant Outcomes

**Loop 1 Complete:**
- One working tiny tool
- One documented pattern (rough notes)
- Experience of "articulation reveals your method"

**Loop 2 Complete:**
- One working micro-project (published on GitHub)
- One documented protocol ("How I [do X]")
- Experience of "structure doesn't constrain, it enables"

**Loop 3 Complete:**
- One collaborative protocol (co-created with 3-4 peers)
- Small project launched (core feature working)
- Pattern stack begun
- Understanding of transparency-creativity loop at team scale

**Full Camp Complete:**
- 3 working tools (tiny tool, micro-project, small project deployed)
- 3-5 documented protocols (personal + collaborative)
- Pattern stack foundation ("Programming OS")
- Ability to articulate and teach this approach to others

**Key Capability Developed:**
Not just technical skills, but metacognitive ability to recognize implicit patterns and make them explicit - for yourself and for teams.

---

## Supporting Materials

### Pre-Camp Setup
- Claude Code installation guide (step-by-step for non-technical)
- GitHub account setup instructions
- Example patterns (3-5 well-documented protocols)
- Template library access

### Templates & Frameworks
**Loop 1 Templates:**
- Pattern discovery template (fillable)
- Observer prompts (what to watch for)

**Loop 2 Templates:**
- Pattern-first brief template
- Protocol creation template

**Loop 3 Templates:**
- Collaborative protocol template
- Protocol challenge prompts
- Pattern stack documentation template

### Example Resources
- Pattern library (shared repository of examples)
- Sample projects with documented patterns
- Video walkthrough: "How I use my protocols"

---

## How This Addresses the Original Gap

### The Gap Identified
> "Figuring out what is worth articulating in what detail - not just tools or documentation, but the metacognitive skill of recognizing your own implicit patterns."

### How the Spiral Curriculum Addresses It

**1. Discovery Through Building (Not Lecture)**
- Don't teach "pattern recognition" abstractly
- Surface patterns by forcing articulation to Claude
- "Your method is invisible even to you" becomes experiential truth

**2. Articulation as Design (Not Documentation)**
- Pattern-first briefs: articulate BEFORE building
- Protocol creation: design reusable frameworks
- Not recording what happened, but designing what's reusable

**3. Three Mechanisms Working Together**
- Structured checkpoints: Can't skip pattern reflection
- Peer observation: External view surfaces blind spots
- Pattern-first briefs: Forces explicit thinking upfront

**4. Recursive Deepening**
- Loop 1: Discover one pattern (experience)
- Loop 2: Document one protocol (structure)
- Loop 3: Co-create one framework (collaboration)
- Each builds on previous, none skippable

**5. From Personal to Collaborative**
- Starts with individual pattern discovery
- Moves to personal protocols
- Ends with collaborative frameworks
- Full journey: implicit → explicit → shared

### What Participants Leave With

**Not just:**
- Tools they built ✓
- Technical skills ✓

**But also:**
- Documented protocols (3-5 reusable patterns)
- Metacognitive skill (recognizing what needs articulation)
- Collaborative practice (co-creating explicit frameworks)
- Language to explain this to others

**Most importantly:**
- Experience of the transparency-creativity loop
- Pattern to continue evolving their practice
- Foundation of their "Programming OS"

---

## Next Steps for Implementation

### Phase 1: Validate Design (Week 1)
- [ ] Review full curriculum with Noah/partners
- [ ] Test: Does this balance tool-building + pattern recognition?
- [ ] Identify: What needs prototyping before full delivery?

### Phase 2: Develop Materials (Weeks 2-3)
- [ ] Create all templates (briefs, protocols, documentation)
- [ ] Write facilitator guide with timing + prompts
- [ ] Develop example patterns library
- [ ] Record setup videos (Claude Code installation, etc.)

### Phase 3: Pilot (Week 4)
- [ ] Run Loop 1 with small test group (3-4 people)
- [ ] Validate: Do pattern mechanisms work?
- [ ] Refine: Timing, prompts, templates
- [ ] Document: What needs adjustment?

### Phase 4: Full Delivery Prep (Week 5)
- [ ] Finalize all materials based on pilot
- [ ] Prep facilitators (if multiple)
- [ ] Set up infrastructure (repos, shared docs)
- [ ] Create participant pre-work package

### Phase 5: First Full Delivery (Week 6)
- [ ] Run 2-day intensive with full cohort
- [ ] Document learnings in real-time
- [ ] Capture participant protocols for library
- [ ] Gather feedback for iteration

### Phase 6: Iteration (Ongoing)
- [ ] Refine based on first delivery
- [ ] Build pattern library from participant work
- [ ] Create alumni community/support
- [ ] Evolve curriculum as tools/practices evolve

---

## Open Questions for Refinement

1. **Group Size**: What's optimal? (Recommend: 8-12 participants)
2. **Async Support**: How much facilitation during the week? (Office hours? Slack?)
3. **Assessment**: How do we evaluate success beyond deliverables?
4. **Alumni Path**: What happens after camp? (Community? Advanced modules?)
5. **Adaptation**: Can Loop 1 work as standalone workshop for non-technical audiences?

---

## Appendix: Comparison to Original Module Structure

### What Changed

**Original Module 0:**
- Conceptual introduction to articulation
- Examples of vague vs. clear requests
- Mindset shift: user → captain

**New Loop 1:**
- Same concepts BUT experienced through building
- Pattern discovery through forced articulation
- Mindset shift proven by seeing your own implicit method

**Original Modules 1-10:**
- Technical focus: learn tools → build project
- Methodology: brief → plan → execute → reflect

**New Loops 2-3:**
- Same technical content + pattern mechanisms
- Methodology PLUS metacognition: "What pattern am I using?"
- Each checkpoint asks: "What became explicit?"

**What Was Added:**
- Pattern-first briefs (articulate before building)
- Peer observation (external view on patterns)
- Structured protocol documentation (design, not recording)
- Collaborative protocol co-creation (team scale)
- Pattern stack (reusable "Programming OS")

**What Was Preserved:**
- Micro → small project progression
- Full build cycle experience
- Deployed artifacts
- Reflection practice

**Net Result:**
- Same tangible outputs (tools built)
- + Documented patterns/protocols (3-5)
- + Metacognitive skill (pattern recognition)
- + Collaborative practice (explicit frameworks)

---

# Summary: Spiral Curriculum for Make It So Camp

**Core Innovation**: Mental model shift revealed through tool building

**Architecture**: Three recursive loops (Discovery → Application → Integration)

**Pattern Mechanisms**: Checkpoints + Peer observation + Pattern-first briefs

**Duration**: 2 days intensive + async week

**Deliverables**:
- 3 working tools
- 3-5 documented protocols
- Pattern stack foundation
- Ability to teach this approach to others

**Key Insight**: Articulation isn't just for AI - it's how you discover your own method
