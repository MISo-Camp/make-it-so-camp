---
name: art-direct
description: Art direction for any content — reads text, PDF, Word, HTML, PPT, then proposes 2-3 creative directions with photography style, mood, and visual language. After selection, generates AI image prompts and visual briefs section-by-section. Use when the user shares content and needs visual direction, image sourcing, or creative direction for any material.
---

# Art Direct

Turn content into visual direction. Point this at anything — a deck, a document, an essay, a brief, a webpage — and get back a creative direction you can actually execute.

## When to Use

- User shares a file (any format) and needs visuals for it
- Developing visual identity for content before building/designing
- Translating written material into photography/illustration direction
- Creating image prompts for AI generation tools
- Art directing a presentation, document, report, or website
- Reviewing existing visuals against content intent (critique mode)

## Supported Inputs

Read content from whatever the user provides:

| Format | How to read |
|--------|-------------|
| `.txt`, `.md` | Read tool directly |
| `.html` | Read tool, strip tags to extract text + structure |
| `.pdf` | Read tool with pages parameter |
| `.docx` | Extract via `python3 -c "import docx; ..."` or `textutil -convert txt` on macOS |
| `.pptx` | Extract via `python3 -c "from pptx import Presentation; ..."` |
| `.rtf` | `textutil -convert txt` on macOS |
| URL | WebFetch tool |

If a format doesn't extract cleanly, ask the user to paste the text.

## The Workflow

```
INGEST CONTENT → ANALYSE → PROPOSE 2-3 DIRECTIONS → USER SELECTS → VISUAL BRIEF + PROMPTS
```

---

## Stage 1: Content Ingestion & Analysis

Read the full content. Extract:

1. **Structure** — What are the units? (slides, sections, chapters, paragraphs, pages)
2. **Core themes** — The 2-3 big ideas the content is actually about
3. **Narrative arc** — Does it build? Contrast? Layer? List?
4. **Audience** — Who receives this? What do they expect to see?
5. **Tone** — Authoritative? Inspirational? Intimate? Provocative? Technical?
6. **Key moments** — Which sections carry the most weight, demand the strongest visuals?
7. **Existing visual language** — If the content already has images, assess what's working and what isn't

**Output a brief content summary** before proceeding. Keep it tight — this is for alignment, not a book report.

---

## Stage 2: Creative Direction Proposals

**If house style template provided** (`--style <name>`):
- Validate content fits the style
- Note any tensions and how to bridge them
- Skip to Stage 3 with adapted style guide

**If no house style:**

Propose **2-3 distinct visual directions**. Each must be genuinely different — not three shades of the same idea. For each:

```
DIRECTION: [Name — a short handle like "Archival Authority" or "Warm Machinery"]

MOOD
What it feels like: [emotional quality in 2-3 words]
Energy: [calm / dynamic / tense / contemplative / electric]

PHOTOGRAPHY STYLE
Type: [documentary / editorial / conceptual / abstract / archival / illustrative]
Subjects: [what appears in the images]
Lighting: [quality of light]
Color treatment: [warm/cool shift, saturation, film stock reference]
Composition: [framing approach]

REFERENCE TOUCHSTONES
"Think [X] meets [Y]" — cite real publications, campaigns, photographers, or brands

WHAT THIS DIRECTION AVOIDS
[Specific clichés and visual tropes this direction rejects]

WHY THIS FITS THE CONTENT
[1-2 sentences connecting direction to content themes]
```

Present all directions. User picks one (or asks for a hybrid). Lock the choice.

---

## Stage 3: Visual Style Guide

Once direction is selected, output the working style guide:

```
VISUAL STYLE GUIDE: [Content Title]
Direction: [Chosen direction]

PHOTOGRAPHY STYLE
─────────────────
Type: [Documentary / Editorial / Conceptual / Abstract / Archival]
Subjects: [What to feature — specific, not generic]
Composition: [Framing rules]
Lighting: [Light quality]
Color treatment: [Color approach, film stock if relevant]

MOOD & TONE
───────────
Primary emotion: [e.g., quiet confidence]
Supporting emotions: [e.g., warmth, precision]
Energy level: [Calm / Dynamic / Tense / Contemplative]

CONSISTENCY RULES
─────────────────
• [Shared quality all images must have]
• [Human subject guidelines]
• [Color palette anchors — hex codes]
• [Aspect ratio defaults]

CLICHÉ BLACKLIST
────────────────
• [Content-specific images to reject]
• [Generic tropes to avoid]
• [Overused metaphors for these themes]

AI GENERATION DEFAULTS
──────────────────────
Photography suffix: [standard prompt additions for photo-style generation]
Illustration suffix: [standard prompt additions for illustration-style generation]
```

---

## Stage 4: Section-by-Section Execution

Work through the content in its natural units (slides, sections, chapters, key passages). For each:

### Step 1: Interpret the section's job
What must the visual communicate? What's the emotional beat?

### Step 2: Apply the Five-Lens Framework

Generate options through five lenses:

| Lens | What it shows | When to use |
|------|---------------|-------------|
| **Literal** | The thing itself, shot with intention | Content is already specific |
| **Human** | People experiencing or doing it | Need emotional connection |
| **Environmental** | Setting, atmosphere, texture | Setting mood, transitions |
| **Metaphorical** | Concrete visual analogy | Making abstract tangible |
| **Oblique** | Abstract, unexpected angle | Provoking thought, standing out |

### Step 3: Output the Visual Brief

For the **recommended lens** (guided by the style guide's lens preferences), output:

```
SECTION: "[Section title or key line]"
VISUAL JOB: [What this image must do]
LENS: [Which lens and why]

CONCEPT
[2-3 sentence description of the exact image — specific enough
that a photographer could shoot it or a designer could find it]

AI GENERATION PROMPTS
─────────────────────
MIDJOURNEY:
[Full prompt with style suffixes, --ar, --v, --style flags]

DALL-E / GPT IMAGE:
[Natural language prompt optimized for DALL-E]

GEMINI:
[Prompt formatted for Gemini image generation]

IDEOGRAM:
[Prompt formatted for Ideogram, especially for any text-in-image needs]

SOURCING GUIDANCE
─────────────────
If searching (not generating):
  Search: [2-3 specific, refined search queries]
  Where: [Specific sources — see Source Guide below]
  Avoid: [What will come up that you should skip]

ALTERNATIVES
────────────
[1-2 other lens options briefly described, in case the primary doesn't land]
```

### Step 4: For content with many sections

Don't generate all sections unprompted. Output:
1. The first 2-3 sections as examples
2. A summary table of all remaining sections with recommended lens and one-line concept
3. Ask which sections to develop fully

---

## The Five-Lens Framework (Detail)

For any concept, five ways to see it:

| Lens | "Digital transformation" | "Supply chain resilience" |
|------|--------------------------|--------------------------|
| **Literal** | Server room corridor, blinking LEDs | Cargo ship cutting through rough seas |
| **Human** | Developer's face lit by dual monitors at 2am | Dockworker's hands checking manifest in rain |
| **Environmental** | Empty office at dawn, single laptop glowing | Fog lifting off container yard at sunrise |
| **Metaphorical** | Old film projector casting light on blank wall | Spider web holding dew drops — tension + beauty |
| **Oblique** | Child's hand drawing a robot | Dominos frozen mid-fall, one glowing |

**The oblique lens is the hardest and the most valuable.** It's the image that makes someone stop and think. Use it for hero images and opening sections.

---

## Source Guide

**Do not default to stock photo sites.** Stock search produces generic results regardless of how specific your terms are. Instead:

### Primary: AI Generation
The best match for precise creative vision. Generate exactly what the concept describes.
- **Midjourney** — Best for photographic realism and cinematic quality
- **DALL-E / GPT Image** — Best for conceptual and illustrative work
- **Gemini** — Good for diagrams, text-in-image, data visualization
- **Ideogram** — Best when image includes readable text or typography

#### Invokable via fal.ai (EMIR server — the Design tab generates these directly)

When running on the EMIR server (not just writing prompts for external tools), these
four models are callable through `src/emir/services/fal_images.py` and exposed in the
Design-tab model dropdown. **Recraft v4 Pro is the default.** Verify endpoints + prices
against fal's live catalog before relying on the numbers (they move):

| Model | fal endpoint | Request param | Best for | ~Price/image |
|---|---|---|---|---|
| **Recraft v4 Pro** *(default)* | `fal-ai/recraft/v4/pro/text-to-image` | `image_size` | Editorial realism, brand-consistent sets, reliable | ~$0.25 |
| **Nano Banana Pro** | `fal-ai/nano-banana-pro` | `aspect_ratio` + `resolution` | Conceptual/illustrative, fast iteration | ~$0.15 |
| **Seedream v5 Pro** | `bytedance/seedream/v5/pro/text-to-image` | `image_size` | Cinematic, atmospheric, high aesthetic | ~$0.07+ (output-area tiered) |
| **Flux Pro v1.1 Ultra** | `fal-ai/flux-pro/v1.1-ultra` | `aspect_ratio` (enum only) | Photoreal detail, large format | ~$0.06/MP |

- **Flat-per-image billing only for a hard cost cap.** Seedream (output-area) and Flux
  (per-megapixel) are billed variably — pin a fixed request size so the per-call cost is
  bounded, and set any spend ceiling **above** the live price at that pinned size.
- Flux accepts only specific `aspect_ratio` enum values (e.g. `21:9 16:9 4:3 3:2 1:1 2:3 3:4 9:16 9:21`) — snap to the nearest supported ratio.
- Nano Banana Pro uses `aspect_ratio` + `resolution` (NOT `image_size`).

### Secondary: Editorial & Archival Sources
When you need *real* photography (historical, documentary, journalistic):
- **Getty Editorial** — Photojournalism, historical archives
- **Magnum Photos** — Documentary photography
- **Library of Congress** — US historical archives, public domain
- **NASA Image Gallery** — Space, earth science, technology
- **Wikimedia Commons** — Public domain, historical
- **British Museum / Smithsonian** — Historical objects and documents
- **Internet Archive** — Historical documents, publications, ephemera
- **Google Arts & Culture** — Museum collections, artworks

### Tertiary: Curated Stock (when you must)
- **Unsplash** — Best for environmental/atmospheric shots, not people
- **Pexels** — Acceptable for textures, backgrounds, abstract
- **Avoid for**: People, business scenarios, technology in use, anything conceptual

### For Specific Needs
| Need | Best source |
|------|-------------|
| Historical technology | Smithsonian, Computer History Museum, Science Museum UK |
| Architecture | ArchDaily, Dezeen photography |
| Scientific | Nature journal imagery, NOAA, ESA/Hubble |
| Cultural | British Library, NYPL Digital Collections |
| Texture/material | Generate via AI — more control |

---

## Anti-Cliché Guide

### Universal Blacklist
These images are invisible — viewers have seen them thousands of times:
- Handshakes (any kind)
- Lightbulb = idea
- Puzzle pieces connecting
- Person on mountain summit
- Hands holding globe
- Diverse team pointing at whiteboard
- Plant sprouting = growth
- Rocket = launch/speed
- Chess = strategy
- Maze = complexity
- Road diverging in forest = choice
- Iceberg = hidden depth
- Bridge = connection

### The Reframing Technique
When you catch yourself reaching for a cliché:

1. **Name the cliché** — "I'm about to search for a lightbulb"
2. **Ask: What does this concept *feel* like?** — Not look like. Feel like.
3. **Ask: What moment captures this for a real person?** — Specificity kills cliché
4. **Generate that instead**

Example: "Innovation"
- Cliché: Lightbulb, circuit board, rocket
- Feels like: The moment before you know if it works
- Real moment: Engineer's hand hovering over a switch, not yet thrown
- That's the image

---

## Critique Mode

When pointed at content that already has images (existing deck, webpage, document):

### Step 1: Ingest & View Everything

Read all content. View every image. Do the work before speaking.

### Step 2: Overall Visual Language Summary

Open with a top-level assessment of the visual language across the entire piece. Cover:

- **What register are the images in?** (archival, editorial, stock, mixed — name it)
- **Is there a unified visual language?** If not, how many competing registers are present?
- **What's the gap between content intent and visual execution?** The content is trying to say X; the images are saying Y.
- **What's working and what isn't** — broad strokes, not image-by-image yet

Keep this to a short, direct paragraph or two. This is the headline diagnosis.

### Step 3: Section-by-Section Summary

For each section/slide/chapter, give a **high-level summary** — not an image-by-image table. For each section:

```
SECTION: [Title or key line]
CONTENT INTENT: [What this section is trying to communicate]
VISUAL EXECUTION: [What the images are actually doing — 1-2 sentences]
VERDICT: [Working / Partially working / Not working — and why in one line]
STRONGEST IMAGE: [Which one and why, if any]
WEAKEST IMAGE: [Which one and why — name the specific problem]
```

Only go image-by-image if the user asks to drill into a specific section.

### Step 4: Recommendations

End with **specific, opinionated recommendations** — not open-ended observations. The format:

```
RECOMMENDED DIRECTION
─────────────────────
Register: [The specific visual register I recommend — e.g., "archival-documentary
          with warm color treatment" not just "pick a register"]
Why: [1-2 sentences connecting this to the content's actual themes and audience]
Reference: [Think X meets Y — cite real touchstones]

WHAT TO KEEP
────────────
• [Specific images that already work, and why they're the standard]

WHAT TO REMOVE IMMEDIATELY
──────────────────────────
• [Images that actively damage the piece — stock, wrong brand, wrong tone]

WHAT TO REPLACE
───────────────
• [Images that are weak/generic — with one-line replacement concepts]

CONSISTENCY RULE
────────────────
[The single unifying quality all images should share — stated as a rule
that can be applied as a yes/no test to any candidate image]
```

**Be specific. Be opinionated.** Don't say "commit to one register" — say "I recommend archival-documentary with warm tungsten color treatment, because this content is about heritage and the images need to feel like they were pulled from a real company archive. Think Bell Labs photography meets Kinfolk's material warmth."

Then ask: **"Does this direction feel right? If so, I'll generate replacement briefs with AI prompts for every image that needs to change."**

### Step 5: Replacement Briefs (after user confirms)

Once the user agrees to the recommended direction, generate replacement visual briefs for every image flagged for removal or replacement. Use the full Stage 4 section-by-section format:

- Lock the recommended direction as the working style guide
- For each image to replace, output the full visual brief with:
  - Concept (specific enough to shoot or generate)
  - AI generation prompts (Midjourney, DALL-E, Gemini, Ideogram)
  - Sourcing guidance (where to find real alternatives if not generating)
  - One alternative lens option
- For sections that need additional images (currently too few), recommend how many and provide briefs

**Output format:** Generate all replacement briefs at once, numbered to match the original image positions. Export to a text file on the user's Desktop for easy reference and handoff.

### Step 6: Handoff

After replacement briefs are generated, offer next steps:

- **"Generate now"** — Generate images via fal.ai (Flux 2 Pro) directly from the briefs
- **"Export briefs"** — Save all prompts and guidance to a file for use in Midjourney/DALL-E/external tools
- **"Rebuild the deck"** — Feed the style guide and replacement images into keynote-slides-skill to produce a revised version
- **"Save as house style"** — Lock the recommended direction as a reusable YAML template for future work with this brand

---

## Image Generation via fal.ai

**Requirements:** `$FAL_API_KEY` environment variable must be set.

### Default Model: Recraft V4 Pro

**Always use Recraft V4 Pro (`fal-ai/recraft/v4/pro/text-to-image`) as the default and only model** unless the user explicitly requests other models or a multi-model shootout/comparison.

Recraft produces the most photorealistic, editorially refined results with the best color accuracy and composition. It outputs high-resolution WebP files that need conversion to JPG and resizing for web use.

Only use other models (Flux Pro, Nano Banana, etc.) when:
- The user explicitly asks for a comparison across models
- The user names a specific model to use
- Recraft is unavailable or returning errors

### How to generate

Use the **synchronous** endpoint (`fal.run`, NOT `queue.fal.run`):

```bash
curl -s "https://fal.run/fal-ai/recraft/v4/pro/text-to-image" \
  -H "Authorization: Key $FAL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "<PROMPT FROM THE VISUAL BRIEF>",
    "image_size": {"width": 1024, "height": 768},
    "num_images": 1
  }'
```

The response contains `images[0].url` directly. Download it:

```bash
curl -sL "<IMAGE_URL>" -o "<OUTPUT_PATH>"
```

### Recraft V4 Pro specifics

- **Size format**: Must use `{"width": N, "height": N}` dict, NOT string presets
- **No `style` param**: Recraft V4 Pro does not accept a `style` parameter (V3 did)
- **No `safety_tolerance` param**: Not supported
- **Output format**: Returns WebP files regardless of output filename — always convert to JPG after download
- **Resolution**: Generates at high resolution (1792x2432 portrait, 3072x1536 landscape) — resize to target dimensions after download

### Post-processing (required)

Recraft outputs are WebP and oversized. Always convert and resize after download:

```python
from PIL import Image
img = Image.open("output.webp")
img = img.convert("RGB")
img = img.resize((TARGET_W, TARGET_H), Image.LANCZOS)
img.save("output.jpg", "JPEG", quality=85)
```

### Common size presets

| Use case | `image_size` value | Resize target |
|----------|-------------------|---------------|
| Landscape hero / slide | `{"width": 1365, "height": 768}` | 1024x768 |
| Portrait hero | `{"width": 768, "height": 1024}` | 768x1024 |
| Square | `{"width": 1024, "height": 1024}` | 1024x1024 |

### Alternative models (for shootouts only)

| Model | Endpoint | Size format | Notes |
|-------|----------|-------------|-------|
| Flux Pro v1.1 | `fal-ai/flux-pro/v1.1` | String: `"landscape_16_9"` | Good dark backgrounds, add `"safety_tolerance": "5"` |
| Nano Banana 2 | `fal-ai/nano-banana-2` | String: `"landscape_16_9"` | Google's model, very high res output |
| Recraft V4 Pro | `fal-ai/recraft/v4/pro/text-to-image` | Dict: `{"width": N, "height": N}` | **DEFAULT** — best photorealism |

### Generation workflow

1. Create output directory: `art-direction/generated/` in the project (NOT hidden `.art-direction/`)
2. Generate via Recraft V4 Pro synchronous endpoint
3. Convert WebP → JPG and resize to target dimensions
4. Display for review using the Read tool
5. User can approve, request regeneration with adjusted prompts, or switch to a different lens

### Cost

Recraft V4 Pro via fal.ai is pay-per-image. Typical cost is ~$0.05-0.10 per image. A full set of 7-10 images runs about $0.50-1.00.

### Fallback

If `$FAL_API_KEY` is not set or the API is unavailable:
- Export briefs to file instead
- Note that the user can paste prompts into Midjourney, ChatGPT image gen, or other tools manually

---

## House Style Templates

Reusable visual directions stored in `~/.claude/skills/art-direct/styles/` as YAML.

```yaml
name: "Style Name"
description: "One-line description with reference touchstones"

photography:
  style: documentary | editorial | conceptual | abstract | archival
  subjects:
    preferred: [list of subject types]
    avoid: [list of subject types to reject]
  lighting:
    preferred: [light quality description]
    avoid: [light quality to reject]
  composition: [framing rules]
  color:
    treatment: [color approach]
    palette_anchors: [hex codes]

mood:
  primary: [one emotional quality]
  supporting: [list of supporting emotions]
  energy: [calm | dynamic | tense | contemplative]

lens_preferences:
  default_order: [ordered list of five lenses]
  weight_toward: [primary lens]
  notes: "Usage guidance"

cliche_blacklist:
  universal: [standard clichés]
  brand_specific: [context-specific clichés]

ai_prompt_suffixes:
  photography: "prompt suffix for photo-style generation"
  illustration: "prompt suffix for illustration-style generation"

reference_touchstones:
  - "Reference 1"
  - "Reference 2"
```

---

## Quick Reference

| Invocation | Purpose |
|------------|---------|
| `art-direct` | Full workflow — ingest content, propose directions, generate briefs |
| `art-direct --style <name>` | Apply existing house style template |
| `art-direct --critique` | Review existing visuals against content intent |
| `art-direct --section "concept"` | Quick single-section visual brief |
| `art-direct --from-frontend <project>` | Derive style from frontend-design project |

## Integration

Outputs can feed into:
- **keynote-slides-skill** — Visual briefs → slide imagery via Gemini generation
- **branded-pptx-converter** — Visual briefs → PowerPoint image slots
- **frontend-design** — Style guide → web design visual language
