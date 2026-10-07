# BuilderHQ

Portfolio demo of a **Clash of Clans community camp** for browsing and sharing base layouts.

Unofficial fan concept. Not affiliated with or endorsed by Supercell.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## What it is

A front-end product concept for a CoC base hub:

- Browse bases with Town Hall / type / tag filters
- Base detail pages with copy link + like/dislike feedback
- Creator profiles
- Auth, onboarding, and upload flows as **UI demos** (no backend)

All data is static sample content — no database, no auth provider, no secrets.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** for a game-inspired camp UI
- Static content in `src/data/bases.ts`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

No `.env` required.

## Project structure

```text
src/
  app/                 # Routes (home, bases, base detail, profiles, auth UI, upload)
  components/          # Camp UI, base cards, auth/upload demos
  data/bases.ts        # Sample bases + creators
  lib/taxonomy.ts      # Filter labels (TH types, tags)
public/demo-bases/     # Sample layout images
DESIGN.md              # Visual / UX direction
BRAND.md               # Brand essentials
```

## Design notes

The UI follows `DESIGN.md`: Clash community camp energy (mascots, gold/ember panels, light motion) without pretending to be an official Supercell product. Fan-content disclaimer lives in the footer.

## License / fan content

This is a portfolio piece and fan concept. Clash of Clans and related assets belong to Supercell. See [Supercell Fan Content Policy](https://www.supercell.com/fan-content-policy).
