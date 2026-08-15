# BuilderHQ — MVP Plan (Track This)

> Solo free-time project.  
> Goal: ship a polished **base-sharing community**, nothing else.  
> Brand: **BuilderHQ** · Domain: **builder-hq.com**  
> Full vision lives in `PROJECT.md`. This file is the only source of truth for MVP execution.

---

## 1. MVP definition (one sentence)

A public website where anyone can browse and copy Clash of Clans bases, and logged-in users can post bases, like/dislike, comment, and build a simple creator profile.

---

## 2. Success = done when

At the end of this MVP, you can:

1. Open the site without an account
2. Browse bases and open a base page
3. Click **Copy Base** → official Clash link opens + copy is counted
4. Create an account / log in
5. Upload and publish your own base
6. Like / dislike a base
7. Leave comments
8. Open a creator profile and see:
   - bases they posted
   - how many bases they posted
   - their rating / community stats
9. On a base page see:
   - who posted it
   - likes + dislikes
   - displayed rating from community feedback
   - comments

If these work on mobile + desktop, MVP is complete enough to launch publicly.

---

## 3. In scope

### Public (no login)
- [ ] Homepage (simple discovery)
- [ ] Base listing / browse
- [ ] Filters: Town Hall + category (minimum)
- [ ] Sort: newest / most copied / highest rated (minimum 2 sorts)
- [ ] Base detail page
- [ ] Copy Base button
- [ ] View creator profile (public)
- [ ] Read comments, likes/dislikes counts, rating
- [ ] Basic SEO (title, description, OG image basics, sitemap later-ok)
- [ ] Fan-content disclaimer in footer

### Auth
- [ ] Sign up / login / logout
- [ ] Email auth (minimum)
- [ ] Google OAuth (if quick; else Phase 1.5)
- [ ] Profile onboarding (username required)

### Logged-in actions
- [ ] Upload base screenshot
- [ ] Publish base (title, TH, category, description, copy link)
- [ ] Edit / delete own base
- [ ] Like a base
- [ ] Dislike a base
- [ ] Comment on a base
- [ ] Edit / soft-delete own comment
- [ ] Report base / comment (simple)

### Profile
- [ ] Public profile page `/builder/[username]`
- [ ] Avatar + bio (simple)
- [ ] Bases posted list
- [ ] Base count
- [ ] Rating / likes received summary
- [ ] Join date (optional)

### Admin (minimum)
- [ ] Admin can hide/remove reported content
- [ ] Admin can suspend user (basic)

---

## 4. Out of scope (do NOT build in MVP)

- Attack strategies
- Clan Capital publishing
- Patch notes / updates CMS
- Follow system (optional later if time)
- Favorites/saved bases (optional later if time)
- Complex reputation algorithm
- Community Verified badges
- Mobile app
- Notifications / DMs / clans
- AI recommendations
- Elasticsearch
- Payments / premium

If it’s not in section 3, it waits.

---

## 5. Core user flows

### Flow A — Anonymous visitor
```text
Land on site
  → browse bases
  → open base
  → see creator, likes, dislikes, rating, comments
  → Copy Base
  → (optional) create account to comment / post
```

### Flow B — New creator
```text
Sign up
  → choose username
  → upload screenshot
  → fill title / TH / category / copy link
  → publish
  → base appears publicly
  → profile shows the base
```

### Flow C — Community feedback
```text
Logged-in user opens base
  → like or dislike (one active vote)
  → rating updates from votes
  → leave comment
  → creator sees engagement on profile/base
```

---

## 6. Pages to build

| Page | Auth | Purpose |
|---|---|---|
| `/` | Public | Discovery home |
| `/bases` | Public | Browse + filters |
| `/base/[slug]` | Public | Base detail + copy + feedback |
| `/builder/[username]` | Public | Creator profile |
| `/login` | Public | Login |
| `/register` | Public | Sign up |
| `/onboarding` | Auth | Username setup |
| `/upload` | Auth | Publish base |
| `/profile/edit` | Auth | Edit own profile |
| `/admin/reports` | Admin | Review reports |

Nice-to-have if time:
- `/favorites`
- SEO landings like `/th17/war-bases`

---

## 7. Base page must show

- Screenshot
- Title
- Town Hall + category
- Description
- Creator (link to profile)
- **Copy Base** button
- Likes count
- Dislikes count
- Rating (derived from likes/dislikes)
- Comments list + comment form (auth required to post)
- Published date
- Copy count + view count (simple)

### Rating rule (simple MVP)
Use likes/dislikes as the community score:

```text
rating_percent = likes / (likes + dislikes) * 100
```

Display example:
- `92% positive (128 votes)`
- or stars mapped from percent (optional)

Rules:
- one vote per user per base (like **or** dislike, switchable)
- not logged in → can see counts, cannot vote
- creator should not vote on own base

Star ratings (1–5) are **not required** for this MVP if likes/dislikes already power the score.

---

## 8. Profile page must show

- Username + avatar + bio
- Bases published (count + list)
- Total likes received (optional but useful)
- Average/positive rating across bases
- Total copies across bases (optional)
- Linkable list of their bases

---

## 9. Technical stack (locked for MVP)

- Next.js + TypeScript + Tailwind
- Supabase (Auth + Postgres + RLS)
- Cloudflare R2 (images)
- Zod validation
- Deploy: Vercel
- Domain: builder-hq.com

Do not change stack during MVP unless blocked.

---

## 10. Data needed (minimum tables)

- [ ] `profiles`
- [ ] `bases`
- [ ] `base_votes` (like / dislike) **or** `likes` + `dislikes` with exclusivity
- [ ] `comments`
- [ ] `base_copy_events` (or increment copy_count securely)
- [ ] `reports`

Optional later:
- favorites
- follows
- view_events aggregation

### Vote model recommendation
Single table is cleaner:

```text
base_votes
  user_id
  base_id
  vote smallint  -- 1 = like, -1 = dislike
  unique(user_id, base_id)
```

Derived on `bases`:
- `like_count`
- `dislike_count`
- `rating_percent` or compute on read

---

## 11. Solo free-time management plan

Work in **small milestones**.  
Each milestone should be shippable/testable in a weekend or a few evenings.

Suggested cadence:
- 3–6 focused hours / week minimum
- Finish one milestone before starting the next
- After each milestone: update checkboxes in this file

### Status legend
- `[ ]` not started
- `[~]` in progress
- `[x]` done

---

## Milestone 0 — Project foundation
**Goal:** empty app runs locally + docs aligned.

- [ ] Create Next.js app (TS + Tailwind + App Router)
- [ ] Git repo + GitHub remote
- [ ] `.env.example` ready
- [ ] Basic layout shell (nav, footer, disclaimer)
- [ ] Deploy empty site to Vercel
- [ ] Point domain DNS (can be later, but better early)

**Done when:** `builder-hq.com` (or Vercel URL) shows a branded empty shell.

---

## Milestone 1 — Auth + profiles
**Goal:** users can register and have a public username.

- [ ] Supabase project
- [ ] Email auth working
- [ ] `profiles` table + RLS
- [ ] Onboarding username flow
- [ ] Public profile page skeleton
- [ ] Edit profile (bio/avatar optional if avatar hard)

**Done when:** sign up → set username → open `/builder/username`.

---

## Milestone 2 — Upload + publish base
**Goal:** logged-in user can publish a base with image + copy link.

- [ ] Cloudflare R2 bucket + signed upload API
- [ ] Image optimize to thumbnail + full webp
- [ ] `bases` table + RLS
- [ ] Upload form (image, title, TH, category, description, copy link)
- [ ] Validate official Clash copy links
- [ ] Create slug
- [ ] Public base page (read-only first)
- [ ] Edit/delete own base

**Done when:** you publish a base and open it in an incognito window.

---

## Milestone 3 — Copy Base + browse
**Goal:** anonymous users can discover and copy.

- [ ] Copy Base button records copy + opens official link
- [ ] `/bases` listing with cards
- [ ] TH filter
- [ ] Category filter
- [ ] Sort newest / most copied
- [ ] Homepage sections (newest + popular minimum)
- [ ] Basic metadata for base pages

**Done when:** stranger can find a base and copy it without login.

---

## Milestone 4 — Community feedback
**Goal:** likes/dislikes + comments + visible rating.

- [ ] Like / dislike voting (auth only)
- [ ] Counts on base page
- [ ] Rating display from votes
- [ ] Comments create/read
- [ ] Soft-delete own comment
- [ ] Profile stats: base count, rating summary, bases list

**Done when:** a second account can vote + comment and it shows on base + profile.

---

## Milestone 5 — Moderation + polish + launch
**Goal:** safe enough to share publicly.

- [ ] Report base/comment
- [ ] Simple admin reports page
- [ ] Hide/remove content
- [ ] Basic rate limits on upload/comment
- [ ] Mobile polish
- [ ] Empty states / error messages
- [ ] Footer disclaimer
- [ ] Soft launch to friends / Discord / Reddit (careful with rules)
- [ ] Track first real users manually

**Done when:** you are comfortable sharing the link publicly.

---

## 12. Weekly tracking template

Copy this each week:

```text
## Week of YYYY-MM-DD
Focus milestone:
Hours available:
Planned tasks:
- 
-

Completed:
- 
-

Blocked:
- 

Next week:
- 
```

---

## 13. Priority rule (when stuck)

Ask:

```text
Does this help someone copy a base, post a base,
or give feedback on a base?
```

- Yes → do it  
- No → postpone  

---

## 14. Launch checklist

- [ ] At least 10–20 real bases uploaded (yours + friends)
- [ ] Copy links validated and working in-game
- [ ] Auth works on mobile
- [ ] No broken upload flow
- [ ] Reports path works
- [ ] Disclaimer visible
- [ ] Domain live on HTTPS
- [ ] One share post ready (what BuilderHQ is + link)

---

## 15. After MVP (do not start early)

Only after launch + real usage:

1. Favorites
2. Follow creators
3. Better search / SEO landings
4. Attack strategies
5. Clan Capital
6. Updates / patch explainers

---

## 16. Current status

**Current milestone:** Milestone 0 — Project foundation  
**Overall MVP progress:** ~40% of Milestone 0  
**Next action:** create GitHub repo + Vercel project; then Milestone 1 Supabase account

### Milestone 0 checklist progress
- [x] Create Next.js app (TS + Tailwind + App Router)
- [ ] Git repo + GitHub remote
- [x] `.env.example` ready
- [x] Basic layout shell (nav, footer, disclaimer)
- [ ] Deploy empty site to Vercel
- [ ] Point domain DNS (can be later)

Update this section every time you finish a milestone.
