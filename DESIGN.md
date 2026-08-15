# BuilderHQ — Design & Experience Direction

This file is the source of truth for **how BuilderHQ should look and feel** for the entire project (MVP → long-term).

Every new page and feature must follow this direction.

---

## 1. Core feeling

BuilderHQ must feel like a **Clash of Clans community camp**, not a generic SaaS dashboard.

Players should instantly think:

```text
This is made for Clash players.
It's fun.
It's a community.
I know where to click.
```

Keywords:

- community campfire
- game UI energy
- friendly mascots (Barbarian, Archer, Builder…)
- gold / wood / stone / grass Clash-inspired palette
- interactive, not wall-of-text
- fast and obvious on mobile

---

## 2. Brand vs official game

We want strong Clash vibe **without** looking like an official Supercell product.

Do:

- use camp / HQ / builder community framing
- use Fan Kit characters as mascots and decoration
- use game-like panels, gold accents, playful motion
- keep BuilderHQ as the hero brand name

Do not:

- copy official Clash client UI 1:1
- use “Official” in branding
- imply Supercell endorsement
- overload the first screen with clutter

Always keep the fan-content disclaimer in the footer.

---

## 3. Visual language

### Palette (Clash-inspired)

```text
--sky / deep night camp background
--grass green accents
--wood panel surfaces
--stone borders
--gold / ember CTAs and highlights
--soft parchment text on dark panels
```

Current CSS variables live in `src/app/globals.css` and may evolve, but stay in this family.

### Typography

- Display font for brand + section titles (expressive)
- Clean sans for UI text / forms
- Never default Inter/Roboto/Arial as the main identity

### Surfaces

Prefer:

- wood/stone game panels
- soft glow around CTAs
- illustrated character spots
- subtle animated background atmosphere (clouds, ember particles, grass horizon)

Avoid:

- flat empty white pages
- dense card grids with no personality
- purple AI-default gradients

---

## 4. Characters & mascots (required forever)

The site should regularly feature Clash-style characters as guides and personality.

Primary cast ideas:

| Character | Role on BuilderHQ |
|---|---|
| **Barbarian** | Loud greeter / asks onboarding questions / hype |
| **Archer** | Tips, precision, “check this base” |
| **Builder** | Upload / create / “build your profile” |
| **Goblin** | Copy link / loot / quick actions (playful) |
| **Warden** (later) | Strategies guide |

### Asset rules

1. Prefer **official Supercell Fan Kit** assets: https://fankit.supercell.com/
2. Store downloaded PNGs in:

```text
public/characters/
  barbarian.png
  archer.png
  builder.png
  goblin.png
```

3. Until Fan Kit files are added, use the built-in stylized placeholder mascots (SVG/CSS) so the UI never feels empty.
4. Do **not** scrape random unpaid asset dumps with unclear licenses if Fan Kit covers the need.
5. Characters are decoration + guides — never block core actions.

### Component pattern

Reuse a shared mascot component (speech bubble + character) for:

- homepage welcome
- onboarding questions
- empty states (“No bases yet”)
- errors (friendly, not scary)
- upload coaching (Milestone 2+)

---

## 5. Interaction principles

### Interactive, but simple

Good:

- Barbarian asks: “What should we call you, Chief?”
- step-by-step onboarding chat
- hover/press feedback on buttons
- light character idle animations (bob, blink, sway)
- confetti/ember burst on successful publish (later)

Bad:

- long forms that feel like banking apps
- 3D scenes that slow phones
- autoplaying loud effects
- interactions that hide the main CTA

### Performance rule

```text
Looks gamey ≠ must be heavy.
```

Priority order:

1. CSS / SVG / optimized PNG sprites
2. lightweight canvas if needed
3. **Three.js only** for a deliberate hero moment later, and only if mobile FPS stays good

Do not add Three.js to every page.

---

## 6. Motion budget

Every major surface should have **2–3 intentional motions**, not noise.

Examples:

- mascot idle bob
- speech bubble fade/slide in
- CTA ember glow pulse (subtle)
- page section reveal on scroll (subtle)
- base card hover lift (later)

Respect `prefers-reduced-motion`.

---

## 7. Page personality map

| Page | Visual idea |
|---|---|
| Home | Camp hero + mascot welcome + clear CTAs |
| Bases | Illustrated filters / game panel listing |
| Base detail | Screenshot hero + character reactions near rating |
| Login / Register | Mascot greets at the gate of the camp |
| Onboarding | Character asks questions one-by-one |
| Profile | Builder’s tent / personal camp wall |
| Upload (later) | Builder coaches the publish steps |
| Empty states | Character explains what to do next |

---

## 8. Onboarding UX (locked idea)

Do not use a cold bureaucratic form as the main feeling.

Preferred flow:

```text
Barbarian appears
  → “Hey Chief! What username do you want?”
  → user answers
  → “Got a display name? (optional)”
  → “Anything about you in a short bio?”
  → “Perfect — welcome to BuilderHQ!”
```

Still validate everything server-side.
Keep it fast: 2–3 short steps max for MVP.

---

## 9. Content & copy tone

Voice:

- friendly Clash player
- short sentences
- playful, not childish
- clear CTAs

Examples:

- “Browse bases”
- “Copy into Clash”
- “Ask the camp what they think”
- “Publish your layout”

Avoid corporate filler (“leverage”, “synergy”, “solutions platform”).

---

## 10. Implementation checklist for Cursor / future work

Before shipping any UI change, check:

- [ ] Does this feel Clash/community, not generic SaaS?
- [ ] Is there at least one visual anchor (character, panel, illustrated empty state)?
- [ ] Is the main action obvious in <3 seconds on mobile?
- [ ] Are animations lightweight?
- [ ] Is Fan Kit / disclaimer still respected?
- [ ] Would removing all characters make the page feel empty? If yes, add a mascot/empty-state.

---

## 11. Near-term asset task (for Filip)

1. Download Clash of Clans assets from Supercell Fan Kit
2. Export transparent PNGs for Barbarian / Archer / Builder
3. Drop them into `public/characters/` with the filenames above
4. Tell Cursor — placeholders will be replaced automatically by the mascot component

---

## 12. Non-goals

- Full 3D Clash village simulator in MVP
- Heavy WebGL on listing pages
- Pixel-perfect clone of the mobile game HUD
- Character interactions that replace accessibility (inputs must remain real form fields)
