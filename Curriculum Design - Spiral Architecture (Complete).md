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

## Loop 2: Application (Day 1, 1:30-6:00)

**Goal**: Apply pattern articulation systematically to build a working micro-project

**Duration**: 4.5 hours

### 2.1 Mental Model Input: "Articulation as Design" (1 hour)

**Concept Introduction (20 min):**
- Articulation ≠ documentation (design vs. recording)
- "What is the mental model of this list?" (EPA example)
- POV-driven iteration: "THIS not THAT" (Noah WhatsApp)
- When to make things explicit vs. let them stay tacit

**Exercise: Three Ways to Articulate (20 min):**
- Take your Loop 1 pattern
- Articulate it three different ways:
  1. As a rule ("Always do X when Y")
  2. As a question ("How do I know when Z?")
  3. As a trade-off ("I accept A to get B")
- Pair share: Which articulation is most useful?

**Pattern-First Brief Template (20 min):**
Introduction to structured briefs:
- Goal: What I'm building
- Success criteria: What "good enough" means TO ME
- Out of scope: What I'm NOT doing
- Pattern hypothesis: What pattern am I testing/documenting?

**Example walkthrough**: Facilitator demonstrates writing a pattern-first brief

---

### 2.2 Micro-Project Build (3 hours)

**Following the existing Modules 3-10 structure, but with pattern mechanisms integrated:**

**Module 3: Picking Your Micro-Project (20 min)**
- Criteria: Solves real annoyance, completable in 2-4 hours, tangible artifact
- NEW: Pattern question: "What recurring pattern does this solve?"
- Exercise: Brainstorm 3 candidates, pick one
- Peer review: Does this solve a real pattern?

**Module 4: Pattern-First Brief (20 min)**
- Write brief using template from 2.1
- NEW: Explicit articulation of YOUR success criteria
- NEW: "What does 'good enough' mean for this specific thing?"
- Peer review checkpoint: "Does this brief pass clarity test?"

**Module 5: Brainstorming WITH Claude (20 min)**
- How to brainstorm WITH Claude, not ask it to brainstorm FOR you
- "Yes, and" vs. "no, instead"
- NEW: "How do I brainstorm? What's my pattern?" (meta-question)
- Ruthless scoping: essential vs. nice-to-have

**Module 6: Making a Plan (15 min)**
- Micro-scale plan: simple numbered list
- Claude helps sequence steps
- Checkpoint: 5-10 step plan

**Module 7: Executing (First Pass) (40 min)**
- Hand Claude the plan + brief together
- Peer observation resumes: Observer notes articulation moments
- Watch it work: what to pay attention to
- Basic git: commit = snapshot
- Checkpoint: First draft exists

**Module 8: Reviewing and Refining (30 min)**
- Evaluate: does it do what you asked?
- Targeted feedback: "this works, this doesn't, here's what I expected"
- NEW Pattern checkpoint: "What pattern am I refining right now?"
- Observer feedback: "Here's what I saw you articulate"
- Checkpoint: Working version

**Module 9: Testing and Evaluating (20 min)**
- Test with real inputs
- "Works" vs. "works well"
- When is it done? (good enough vs. gold-plating)
- NEW: "How did I decide it was done?" (capture decision pattern)

**Module 10: Publishing + PATTERN REFLECTION (35 min)**
- Put on GitHub (step-by-step)
- Write README
- NEW: Structured Pattern Documentation (20 min):
  - What pattern did you discover while building?
  - What had to become explicit that was previously implicit?
  - If you built this again, what would you document for reuse?
  - Create first draft "protocol": "How I build [this type of thing]"

---

### 2.3 Pattern Documentation (30 min)

**Structured Protocol Creation:**
- Template: "How I [decide/build/evaluate] [thing]"
- Sections:
  1. When I use this pattern
  2. My decision criteria (what makes it "good enough")
  3. Trade-offs I accept
  4. How I know I'm done

**Peer Protocol Review:**
- Exchange protocols with partner
- Test: Can they apply your protocol without you?
- Refine based on feedback

**Checkpoint:**
- One working micro-project
- One documented protocol
- Experience of "structure doesn't constrain, it enables"

---

## Loop 3: Integration (Day 2, 9:00-5:00)

**Goal**: Apply pattern articulation to collaborative contexts and launch small project

**Duration**: Full day (8 hours with breaks)

### 3.1 Mental Model Input: "The Transparency-Creativity Loop" (1.5 hours, 9:00-10:30)

**Concept Introduction (30 min):**
- Strategy-as-Protocol: transparency → creativity → better strategy
- The Fela Kuti groove metaphor (tight structure + internalization = improvisation)
- Psychological safety: explicit = challengeable (Argyris, Edmondson)
- Team of Teams: shared consciousness through explicit frameworks

**Exercise: Load-Bearing vs. Paint (20 min):**
- Review your protocols from Loop 1 & 2
- Identify: Which parts are "structural" (can't change without breaking pattern)?
- Which parts are "paint" (could be done differently)?
- Pair discussion: Where can we improvise within the structure?

**From Personal to Collaborative Protocols (40 min):**
- AI-readable, human-editable documentation (Noah insight)
- Example: Design system in markdown vs. Figma
- "THIS not THAT" at team scale
- Exercise: Take one protocol - rewrite for a team

**Pattern-First Brief for Collaboration:**
- How do we articulate shared patterns?
- What needs to be explicit for the team vs. individual?

---

### 3.2 Collaborative Protocol Design (1.5 hours, 10:30-12:00)

**Exercise: Co-Create a Team Protocol (60 min):**
- Groups of 3-4
- Pick one common work pattern (e.g., "How we decide a brief is ready")
- Each person shares their individual pattern
- Group identifies: What's shared? What's different?
- Co-create one protocol that works for everyone
- Test: Can someone outside the group apply it?

**Peer Protocol Challenge (20 min):**
- Groups exchange protocols
- Each group tries to find: What's ambiguous? What assumptions are hidden?
- Feedback loop: Refine based on challenges
- Debrief: "Explicit = challengeable = improvable"

**Teaching Patterns to Others (10 min):**
- How to onboard someone to your protocol
- Documentation that transfers knowledge (not cargo cult)
- The articulation-creativity loop at team scale

---

### 3.3 Small Project Scoping & Launch (1.5 hours, 1:00-2:30)

**Pattern-First Brief for Small Project (30 min):**
Following Module 11-13 structure with pattern enhancements:

**Module 11: Selecting a Small Project**
- Criteria: 1-2 days work, multiple features, browser-based
- NEW: "What problem do I solve manually that has a reusable pattern?"
- NEW: "What pattern will this project help me document?"
- Peer review: Is the pattern worth documenting?

**Module 12: Writing the Pattern-First Brief**
- Full brief structure (from Loop 2)
- NEW addition: "Who else would use this pattern?"
- NEW: "What implicit knowledge am I testing?"
- Peer or AI review: Clarity test

**Module 13: Brainstorming and Planning**
- Core feature vs. nice-to-haves
- Sequencing: dependencies
- Risks: what might go wrong?
- NEW: "What pattern stack am I using?" (brief + build + evaluate patterns)

**Project Launch (60 min):**
- Module 14: Scaffolding (start from template)
- Tour what Claude built: frontend, backend, connections
- Checkpoint: Running skeleton
- Begin Module 15: Core feature implementation

---

### 3.4 Building Support + Pattern Documentation (1.5 hours, 2:30-4:00)

**Facilitated Building Time:**
- Participants work on Module 15-16 (core feature + debugging)
- Peer observation continues (informal, rotates)
- Facilitators circulate
- Pattern checkpoints every 30 min:
  - "What are you learning about your pattern?"
  - "What's becoming explicit?"

**Mid-Build Pattern Documentation (20 min at 3:30):**
- Pause building
- Document: "Pattern I'm using right now"
- Share with one peer: "Can you see the pattern I'm applying?"

---

### 3.5 Path Forward & Closing (1 hour, 4:00-5:30)

**Async Week Orientation (20 min):**
- Complete Modules 17-20 at your own pace:
  - Module 17: Complete all features
  - Module 18: User testing
  - Module 19: Refine based on feedback
  - Module 20: Deploy + PATTERN STACK documentation

**Final Pattern Stack Documentation (explained):**
- When you deploy, document the full pattern stack:
  1. Patterns you used from Loop 1 & 2
  2. New patterns you discovered
  3. "How I build [this category of tool]" protocol
- This becomes your "Programming OS" starting point

**Continuing to Evolve Your Practice (20 min):**
- Building your protocols over time
- From tool builder → organizational designer
- Resources: Where to go next
- Community: How to stay connected

**Final Reflection (20 min):**
- Individual writing (10 min):
  - What pattern will you document first when you get back?
  - How will you explain this way of working to your team?
  - What's one mental model shift you'll keep?
- Group share (10 min): Volunteers share insights

---

## Pattern-Keeping Mechanisms (Integrated Throughout)

### 1. Structured Reflection Checkpoints
- Loop 1: Pattern discovery template
- Loop 2: Protocol creation template
- Loop 3: Pattern stack documentation template
- Not optional - mandatory deliverables at each loop

### 2. Peer Pattern Reviews
- Loop 1: Observer notes patterns during building
- Loop 2: Peer tests if protocol is usable
- Loop 3: Cross-group protocol challenges
- Continuous observation, not one-time

### 3. Pattern-First Briefs
- Introduced in Loop 1
- Formalized in Loop 2
- Applied collaboratively in Loop 3
- Forces articulation BEFORE building

---

## Deliverables

**End of Day 1:**
- One tiny tool (Loop 1)
- One micro-project (Loop 2)
- Two documented patterns/protocols
- Experience of full mental model → build → reflect cycle

**End of Day 2:**
- One collaborative protocol (co-created)
- Small project in progress (core feature working)
- Pattern stack begun

**End of Async Week:**
- One deployed small project
- Complete pattern stack documentation
- "Programming OS" foundation: 3-5 documented protocols
- Ability to articulate this approach to others

---

## Facilitation Notes

### Critical Success Factors

**1. Hold the Pattern Focus**
- Biggest risk: Participants get excited about tools and forget pattern reflection
- Mitigation: Structured checkpoints are mandatory, not optional
- Facilitator role: "What pattern are you discovering right now?"

**2. Peer Observation Quality**
- Observer role must be active, not passive watching
- Provide observer with specific prompts: "Note when they have to explain something"
- Rotate observers so everyone experiences both roles

**3. Avoid Pure Tech Support Mode**
- Participants will get stuck on technical problems
- Resist pure troubleshooting - connect it back to articulation
- "What would you need to document to prevent this next time?"

**4. Pattern Documentation is Design Work**
- Participants will want to skip documentation ("I'll do it later")
- Reframe: "This isn't homework, it's designing your operating system"
- Make it valuable: "This protocol saves you time forever"

**5. Co-Creation in Loop 3**
- Groups will struggle with "whose pattern is right?"
- This is the point - negotiating explicit frameworks
- Facilitator reframe: "There's no right pattern, just explicit vs. implicit"

### Pacing Adjustments

**If Running Behind:**
- Loop 1 tiny tool can be even tinier (15-minute build)
- Loop 2 can spill into early Day 2 if needed
- Loop 3 collaborative exercise can be homework

**If Running Ahead:**
- Add more peer review rounds
- Deeper pattern reflection exercises
- Start small project earlier

### Differentiating for Experience Levels

**For Complete Beginners:**
- Loop 1 may need slower setup (extra 15 min)
- Provide more examples of patterns
- Pair with experienced participants

**For Experienced Developers:**
- Challenge: "You already know how to build - what's your implicit method?"
- Skip basic Claude Code setup
- Deeper focus on articulation as discovery

---

## Materials Needed

### Pre-Camp Setup
- [ ] Claude Code installation guide (step-by-step for non-technical)
- [ ] GitHub account setup instructions
- [ ] Example patterns (3-5 well-documented protocols)
- [ ] Template library: briefs, pattern documentation, protocol structure

### Day 1 Materials
- [ ] Loop 1: Pattern discovery template (fillable)
- [ ] Loop 2: Pattern-first brief template
- [ ] Loop 2: Protocol creation template
- [ ] Observer prompts (printable cards/digital)

### Day 2 Materials
- [ ] Loop 3: Collaborative protocol template
- [ ] Loop 3: Protocol challenge prompts
- [ ] Pattern stack documentation template
- [ ] Async week guide

### Optional Enhancements
- [ ] Pattern library (shared repository)
- [ ] Sample projects with documented patterns
- [ ] Video walkthrough: "How I use my protocols"

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
