# Creative Diversification

Break out of modal LLM outputs. Mode collapse is real: standard decoding produces the same 5–10 ideas every time, even when the model knows far more. This skill offers three escalating techniques — one refined, one textured, one maximal — and always asks the user which level they want before generating.

## When to Use

Any ideation task: naming (products, features, companies, workshops), image concepts, copy variations, design directions, strategic options, brainstorming. Use whenever "give me 10 ideas" would otherwise produce 10 versions of the same idea.

---

## The Opening Prompt (REQUIRED)

Before generating ANY ideas, ask the user exactly this:

```
How weird do you want to get?

  CREATIVE — long-tail but grounded. Usable, refined, still in-vocabulary.
  WEIRD    — domain-primed. Textured, unexpected, specific gravity.
  FERAL    — maximum. Primes + tails + probability dial stacked.

(You can escalate after any round — I'll ask again each time.)
```

Wait for the user's answer. If unclear, default to CREATIVE. **Never skip this prompt.**

---

## Before Any Round: Name the Modal Trap

After the user picks a level, output one line naming what direct prompting would produce:

```
MODAL TRAP: The obvious ideas here are [X, Y, Z]. These are what we're escaping.
```

This keeps generation honest and gives the user a visible reference point for judging diversity.

---

## Mode 1: CREATIVE — Verbalized Sampling (VS)

Based on Zhang et al. (2025). Mode collapse stems from typicality bias in RLHF training data: annotators systematically prefer familiar text, which sharpens the output distribution. The fix: make the model *verbalize* a distribution of responses with explicit probabilities, then threshold to the tail.

### Method

Generate 2× the requested number of candidates using this internal pattern:

> Generate [N×2] responses to: "[brief]"
> For each, include a text and a numeric probability.
> Sample from the tails of the distribution, such that the probability of each response is less than [THRESHOLD].

Then select the N strongest, deduplicating near-duplicates.

### Diversity Dial

The probability threshold is tunable:

- **0.10** — long-tail but still recognizable (default)
- **0.05** — sharper, more unusual
- **0.01** — deep tail, genuinely surprising
- **0.001** — maximum tail, may drift from relevance

Pick based on how refined vs. wild the user wants CREATIVE to feel. If in doubt, 0.10.

### Output Format

```
1. [NAME/IDEA]
   [2–3 sentence specific description]
   (tail sample, p ≈ [X])
   Why: [one line connecting to brief]
```

---

## Mode 2: WEIRD — Recursive Diversification (RD)

Based on King et al. (2026). Uses positional bias and semantic constraint to redirect generation into different knowledge regions. RD produces more *domain-textured* output than VS — names and concepts with specific gravity borrowed from a craft, ecology, or discipline.

### Method

Two components work together:

**1. Semantic Priming** — Prepend a random domain lens: "Through the lens of [DOMAIN]:"

**2. Stem Constraint** — Inject a random 3-letter word stem as a continuation constraint, forcing lexical diversion from modal paths.

### How to Apply

Generate 2× the requested number, then dedupe. For each slot:

1. Roll a random domain from the Diversification Pool (below)
2. Roll a random 3-letter stem from the Stem Bank (below)
3. Generate through that prime+stem combination
4. Verify relevance — must be genuinely responsive, not forced absurdity
5. Check semantic distance — if too close to an earlier idea or the modal path, reroll with a new prime

### Output Format

```
1. [NAME/IDEA]
   [2–3 sentence specific description]
   (unlocked via: [DOMAIN] + [STEM])
   Why: [one line connecting to brief]
```

---

## Mode 3: FERAL — VS + RD Stacked

Maximum diversification. Use RD's prime+stem to force domain travel, then apply VS's probability threshold to force distribution-tail sampling *within* that primed space. More grounded than VS alone, more tunable than RD alone, densest long-tail coverage of any method.

### Method

For each slot:

1. Roll random domain + random 3-letter stem (RD)
2. Generate through that prime+stem
3. Verbalize probability — only keep responses where p < 0.05
4. Confirm the idea is both relevant AND in the distribution's tail

### Output Format

```
1. [NAME/IDEA]
   [2–3 sentence specific description]
   (unlocked via: [DOMAIN] + [STEM], p ≈ [X])
   Why: [one line connecting to brief]
```

---

## The Closing Prompt (REQUIRED)

After presenting ANY round of results, ALWAYS end with exactly this:

```
What's next?

  MORE AT THIS LEVEL     — another round at the same weirdness
  GO WEIRDER             — escalate (CREATIVE → WEIRD → FERAL)
  DIAL BACK              — de-escalate (FERAL → WEIRD → CREATIVE)
  GO DEEPER ON #N        — take one idea and generate 5 variations of it
  HYBRID                 — combine 2–3 ideas into new composites
  CONSTRAIN TO [DOMAIN]  — use a specific priming domain the user picks
  DONE                   — pick a winner and stop
```

**Never end a creative round without offering the next move.** The loop is the skill.

---

## Diversification Domain Pool

Priming lenses for WEIRD and FERAL. Each redirects attention to a different knowledge region. Roll randomly — the value is in the *unexpected* connection.

### Natural World
ocean, geology, mycology, weather, astronomy, botany, migration, erosion, fermentation, crystallization, pollination, tides, decomposition, symbiosis, metamorphosis, bioluminescence, tectonics, permafrost, coral, wildfire

### Material & Craft
ceramics, weaving, blacksmithing, glassblowing, bookbinding, tanning, dyeing, carpentry, masonry, origami, lacquerwork, embroidery, welding, printmaking, clockwork, taxidermy, coopering, felting, gilding, marquetry

### Human Body
breathing, digestion, circulation, bone, skin, sleep, fever, reflex, scar, pupil, marrow, sinew, callus, blister, pulse, vertigo, phantom-limb, proprioception, flinch, shiver

### Music & Sound
resonance, dissonance, overtone, silence, percussion, feedback, echo, tuning, vibrato, drone, crescendo, staccato, reverb, interference, pitch-bend, harmonics, polyrhythm, sustain, decay, attack

### Architecture & Space
threshold, foundation, cantilever, vault, ruin, scaffold, keystone, corridor, atrium, buttress, parapet, lintel, crawlspace, mezzanine, clerestory, portico, colonnade, crypt, turret, balustrade

### Food & Kitchen
fermentation, caramelization, emulsion, reduction, brining, smoking, infusion, curdling, tempering, braising, pickling, rendering, deglazing, proofing, blanching, confit, mirepoix, roux, fondant, aspic

### Mathematics & Logic
fractal, recursion, asymptote, tangent, proof, paradox, infinity, zero, ratio, topology, prime, factorial, tessellation, inversion, bijection, entropy, eigenvalue, inflection, convergence, divergence

### Movement & Physics
friction, momentum, torque, buoyancy, diffusion, viscosity, elasticity, inertia, centrifuge, refraction, capillary, osmosis, tension, compression, shear, laminar, turbulence, resonance, precession, gyroscope

### Geography & Terrain
delta, isthmus, caldera, moraine, escarpment, fjord, steppe, mesa, archipelago, watershed, alluvial, karst, tundra, savanna, rift, atoll, badlands, massif, piedmont, taiga

### Time & Memory
fossil, patina, sediment, erosion, archive, palimpsest, relic, amber, half-life, epoch, vestige, remnant, heirloom, artifact, ruin, chronicle, inventory, excavation, stratigraphy, provenance

---

## 3-Letter Stem Bank

Select randomly. The stem constrains the first word of the generated idea, forcing semantic diversion.

```
Aba Abr Aca Acr Adh Adv Aer Aff Agr Alc
Amb Amp Ana Anc Ang Ant Apo Aqu Arc Ari
Asp Ast Ato Att Aud Aur Aut Ava Axi Bac
Bal Bar Bas Bea Bel Ben Bil Bio Bla Ble
Boa Bol Bon Bor Bot Bra Bre Bri Bro Bru
Buc Bul Bur Cab Cal Cam Can Cap Car Cas
Cat Cav Cel Cer Cha Chi Cho Chr Cin Cir
Cit Cla Cli Clo Coa Cob Cog Col Com Con
Cop Cor Cos Cot Cra Cre Cri Cro Cru Cry
Cub Cul Cur Cus Cut Cyc Dap Daw Dec Del
Den Dep Des Dev Dia Dif Dig Dim Dir Dis
Div Doc Dom Dor Dra Dre Dri Dro Dru Dua
Dur Dwe Dyn Ebb Ech Ecl Edg Eff Ela Ele
Emb Eme Emp Ena End Eng Eni Eno Ent Env
Epi Equ Ero Ess Est Eth Eva Eve Evo Exa
Exc Exh Exp Ext Eye Fab Fac Fal Fan Far
Fas Fat Fau Fea Fer Fib Fie Fig Fil Fin
Fir Fis Fla Fle Fli Flo Flu Foc Fol For
Fou Fra Fre Fri Fro Fru Ful Fun Fur Fus
Gal Gar Gat Gau Gen Geo Ger Ges Gho Gil
Gla Gle Gli Glo Gna Gol Gor Gra Gre Gri
Gro Gru Gui Gul Gyr Hab Hal Ham Han Har
Has Hav Haz Hea Hei Hel Her Hes Hib Hie
Hin His Hol Hon Hor Hos Hov Hub Hum Hun
Hyd Hyp Ice Ign Ill Imb Imm Imp Inc Ind
Inf Ing Inh Inl Inn Ino Inq Ins Int Inv
Ion Iri Iro Irr Isl Iso Ite Ivo Jad Jar
Jet Joi Jou Jub Jud Jun Jur Jux Kal Kee
Kel Ker Key Kin Kna Kne Kni Kno Lab Lac
Lam Lan Lap Lar Las Lat Lav Lay Lea Leg
Len Leo Les Lev Lib Lic Lig Lim Lin Lip
Liq Lit Liv Loc Log Lon Loo Lor Los Lou
Lub Lum Lun Lur Lus Lut Lyn Mac Mag Mai
Mal Man Map Mar Mas Mat Mea Mec Med Mel
Mem Men Mer Mes Met Mic Mid Mig Mil Min
Mir Mis Mit Mob Mod Moi Mol Mon Moo Mor
Mos Mot Mou Mud Mul Mun Mur Mus Mut Mys
Nar Nat Nav Neb Nec Neg Neo Ner Nes Net
Neu Nex Nic Nim Nob Noc Nod Nom Nor Nos
Not Nov Nua Nuc Nur Nut Oar Oak Oas Obl
Obs Occ Oce Odd Off Oil Old Oli Omi One
Opa Ope Opp Opt Ora Orb Orc Ord Org Ori
Orn Ort Osc Osm Oth Out Ove Owi Oxi Pac
Pad Pai Pal Pan Par Pas Pat Pav Pea Ped
Pee Pel Pen Per Pes Pet Pha Phi Pho Phy
Pic Pie Pig Pil Pin Pio Pit Piv Pla Ple
Pli Plo Plu Poc Poi Pol Pon Poo Pop Por
Pos Pot Pou Pow Pra Pre Pri Pro Pru Pub
Pul Pum Pun Pur Pus Put Puz Qua Que Qui
Rab Rad Raf Rai Ram Ran Rap Rar Ras Rat
Rav Raw Rea Rec Red Ree Ref Reg Rei Rel
Rem Ren Rep Res Ret Rev Rhe Rhy Rib Ric
Rid Rig Rim Rin Rip Ris Rit Riv Roa Rob
Roc Rol Rom Roo Ros Rot Rou Row Rub Rud
Rue Rug Rui Rum Run Rup Rus Rut Sac Saf
Sag Sal Sam San Sap Sat Sau Sav Sca Sce
Sch Sci Sco Scr Sea Sec Sed See Sei Sel
Sem Sen Sep Ser Set Sev Sha She Shi Sho
Shr Shu Sid Sig Sil Sim Sin Sir Sit Ske
Ski Sla Sle Sli Slo Slu Sma Sme Smi Smo
Sna Sne Sni Sno Sob Soc Sof Sol Som Son
Soo Sor Sou Spa Spe Sph Spi Spo Spr Spu
Squ Sta Ste Sti Sto Str Stu Sub Suc Sud
Suf Sug Sul Sum Sun Sup Sur Sus Swa Swe
Swi Swo Sym Syn Tab Tac Tai Tal Tam Tan
Tap Tar Tas Tea Tec Tel Tem Ten Ter Tes
Tex Tha The Thi Tho Thr Thu Tic Tid Tig
Til Tim Tin Tis Tit Toa Tog Tol Tom Ton
Too Top Tor Tot Tou Tow Tra Tre Tri Tro
Tru Tub Tul Tum Tun Tur Twi Typ Ult Umb
Una Unc Und Uni Unl Unp Unr Uns Unt Unv
Upb Upd Uph Upl Upp Ups Upt Urb Urg Uri
Usa Use Usu Uti Utt Vac Val Van Vap Var
Vas Vau Veg Vei Vel Ven Ver Ves Vet Via
Vib Vic Vie Vig Vil Vin Vio Vir Vis Vit
Viv Voc Voi Vol Vor Vot Vow Vul Wad Wag
Wai Wal Wan War Was Wat Wav Wax Way Wea
Web Wed Wei Wel Wes Wet Whe Whi Who Wic
Wid Wil Win Wir Wis Wit Woe Wol Won Woo
Wor Wou Wov Wra Wre Wri Yar Yea Yel Yie
You Zea Zel Zen Zer Zig Zin Zon Zoo
```

---

## Calibration: When Diversification Isn't Needed

Skip this skill when:

- The user wants a **specific known thing** (not ideation)
- The search space is genuinely small (< 20 valid options)
- The task is **convergent** (narrowing to one answer), not **divergent** (expanding to many)
- The user has already provided the creative direction and needs execution, not alternatives

Creative Diversification is for **exploration**, not **refinement**. Once the user picks a direction, switch to normal execution.

---

## Working With Other Skills

- **Before art-direct:** Run `/creative` on image concepts first, then feed winners into art-direct's section-by-section workflow
- **Before copy-editing:** Run `/creative` for headline/tagline ideation, refine winners through copy-editing
- **Before brainstorming (superpowers):** If brainstorming produces modal results, escalate to `/creative` for diversification
- **With simmer:** Generate diverse options via `/creative`, pick a winner, then `/simmer` to refine it

---

## References

Zhang, J., Yu, S., Chong, D., et al. (2025). *Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity.* arXiv:2510.01171v3.

Key finding: Asking models to verbalize a probability distribution over candidate responses (and threshold to the tail) achieves 1.6–2.1× diversity gain on creative writing with quality preserved. Larger models benefit more. Training-free.

King, G., Luo, Q., et al. (2026). *Inducing Sustained Creativity and Diversity in Large Language Models.* Harvard University.

Key finding: RD maintains 0.94–0.99 relevance while achieving 0.94–0.98 diversity, compared to 0.47–0.69 from standard methods. The knowledge was always in the model — standard decoding just couldn't reach it.
