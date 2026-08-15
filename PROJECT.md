# Clash of Clans Community Hub — Project Specification

## 1. Project Overview

This project is a **community hub for Clash of Clans players** — a place where someone can find most of the useful player-facing information they need in one platform.

The final product is broader than a base-sharing website. It is centered around:

- useful player-generated content;
- creator identity and reputation;
- discussion and community signals;
- discovery through search, SEO, and social sharing.

The long-term content pillars are:

1. **Base layouts** — Home Village, Builder Base, and related categories;
2. **Attack strategies and tutorials** — text and video guides;
3. **Clan Capital layouts** — Capital Peak and other districts;
4. **Game updates / patch notes** — explained simply for normal players.

The first public release is intentionally smaller: a **polished base-sharing MVP** used to validate whether Clash of Clans players will use and contribute to a trusted community platform.

The first version is a **web application**. A mobile application will be created later using **React Native / Expo**, and it must reuse the same backend.

---

# 2. Product Vision

## Final product

Become the community place where a player can answer:

```text
Where can I find a good base for my Town Hall?
Who built it, and can I trust them?
What attack strategy works at my level?
What Clan Capital layout should my clan use?
What did the latest update actually change?
What does the community think?
```

The strongest long-term asset should be:

```text
useful content
+
creator identity
+
community feedback
+
reputation
+
discovery
```

## What this is not

This is not:

- another random screenshot directory;
- an unofficial game client or layout generator;
- an SEO farm of thin pages;
- a feature-complete social network on day one.

## Validation-first rule

Whenever deciding whether a feature belongs in the first launch, ask:

```text
Does this help us validate whether players want a trusted,
community-driven place to discover and share Clash of Clans bases?
```

If yes, prioritize it.

If not, it can wait.

The first public release should feel **small but polished**, not broad but unfinished.

---

# 3. Core Product Idea

Typical existing flow:

```text
Google Search
    ↓
Random Clash website
    ↓
Screenshot or copied patch notes
    ↓
No reliable creator
No trustworthy community signal
No reason to return
```

Desired loop:

```text
User discovers content through Google / social media
        ↓
Reads strategy or copies base
        ↓
Finds useful creator
        ↓
Creates account
        ↓
Likes / rates / comments / follows
        ↓
Returns
        ↓
Eventually publishes own content
        ↓
Other users discover it
```

The platform should create a reputation and trust layer around Clash of Clans content creators.

---

# 4. Product Pillars

## 4.1 Base layouts

Players browse and copy Clash of Clans layouts.

Examples:

- Home Village bases;
- War bases;
- Trophy bases;
- Farming bases;
- Legend League bases;
- Anti 3-Star bases;
- Builder Base layouts where supported;
- other relevant categories.

Each published base has a dedicated page with:

- screenshot;
- official Clash of Clans copy link;
- creator and creator profile;
- Town Hall / Builder Hall;
- category;
- description;
- rating;
- likes;
- favorites;
- comments;
- copy count;
- views;
- community feedback;
- publishing date.

The purpose of these details is to let users decide whether a base is worth copying, instead of blindly trusting labels like "Anti 3-Star".

## 4.2 Attack strategies

Users publish and discover attack strategies / tutorials.

A strategy can contain:

- title;
- description;
- Town Hall level;
- army composition;
- spells;
- heroes;
- equipment where relevant;
- Clan Castle troops;
- when to use the strategy;
- step-by-step attack instructions;
- screenshots / diagrams;
- tutorial video;
- YouTube embed/link;
- tips;
- weaknesses;
- relevant base types;
- creator information.

Example:

```text
TH17 Root Rider + Valkyrie Strategy

Army:
...

Spells:
...

Step 1:
Create funnel...

Step 2:
Deploy...

Video Tutorial:
...

Rating: 4.8
Likes: 1.2K
Comments: 83
```

Attack strategies use the same community philosophy as bases:

- identifiable creator;
- creator reputation;
- ratings;
- comments;
- likes;
- saves/favorites;
- views;
- optional later "worked for me" score.

Support both **text-based** and **video-based** tutorials.

Attack strategy publishing is **Post-MVP**, but the architecture must leave room for it.

## 4.3 Clan Capital layouts

Support Clan Capital content, including:

- Capital Peak;
- Barbarian Camp;
- Wizard Valley;
- Balloon Lagoon;
- Builder's Workshop;
- Dragon Cliffs;
- Golem Quarry;
- Skeleton Park;
- Goblin Mines;
- other current/future districts.

Layouts should be organized by district and district level where applicable.

Do **not** assume every layout belongs to a normal Town Hall.

Do **not** force Clan Capital data into Home Village-only fields if a cleaner model exists.

Clan Capital publishing is **Post-MVP**, but schema design should anticipate it.

## 4.4 Game updates / patch notes

A content section for Clash of Clans updates, explained clearly for normal players — not a raw dump of official notes.

Example topics:

```text
New Town Hall
Balance changes
New troop
New Hero Equipment
New defense
Clan Capital changes
Event changes
Quality-of-life changes
New features
```

An update article can contain:

- title;
- summary;
- publication date;
- official update date;
- images;
- sections;
- explanations;
- important changes;
- links to official sources;
- related strategies/layouts where useful.

Examples of SEO/social angles:

```text
What changed in the August update?
New troop explained
Best equipment after the new balance changes
What the new patch means for TH17 attacks
```

Initially, update articles may be created only by **admins/editors**, not normal users.

Permissions must support that restriction.

Update articles are **Post-MVP**.

---

# 5. Main Differentiator

The key competitive advantage is **trust and community validation**.

Content should not only display media and labels. It should expose evidence:

```text
Rating: 4.8 / 5
Copies: 18,420
Views: 62,190
Favorites: 2,140
Comments: 93

Community performance:
82% of players say this base performed well.
```

Creators should also have reputation:

```text
Builder: ExampleBuilder

Followers: 8,420
Average rating: 4.74
Bases published: 38
Strategies published: 12
Verified bases: 12
Total copies: 482,000
```

Avoid unsupported platform claims such as:

```text
Guaranteed Anti 3-Star
Best Strategy
Impossible to Triple
```

Expose useful evidence and let the community determine quality.

---

# 6. Public-First Access

**Users must not need an account just to consume content.**

Anonymous visitors can:

- browse bases;
- open base pages;
- copy base layouts;
- read attack strategies (when available);
- watch tutorial videos;
- read patch notes (when available);
- browse Clan Capital layouts (when available);
- search;
- use filters;
- view creator profiles;
- see ratings, comments, likes, copy/view counts.

Public usefulness without registration matters for SEO, conversion, and UX.

Do **not** put unnecessary login walls in front of public content.

---

# 7. When Authentication Is Required

Authentication is required to **participate**, not to browse.

Required for:

- uploading a base;
- publishing an attack strategy;
- commenting;
- rating;
- liking;
- adding to favorites;
- following creators;
- editing own content;
- reporting content where appropriate;
- building a creator profile.

Copying a base via the official Clash of Clans link should remain available to anonymous visitors. Copy events may still be recorded anonymously or with optional user attribution when logged in.

---

# 8. Technology Stack

## Frontend

Use:

- Next.js
- TypeScript
- React
- Tailwind CSS

Prefer the modern Next.js App Router.

The UI should be responsive and mobile-first because Clash of Clans users are primarily mobile users.

---

## Backend

Use **Supabase**.

Supabase will be responsible for:

- PostgreSQL database;
- authentication;
- authorization;
- row-level security;
- database functions where useful;
- real-time features later if needed;
- server-side data access.

Do not build a separate traditional Node.js backend unless there is a concrete reason.

Next.js server actions / route handlers can be used for application-specific server logic.

---

## Image Storage

Use **Cloudflare R2** for uploaded images (base screenshots, strategy images, article images later).

Do NOT store image binaries inside PostgreSQL.

Do NOT rely on storing all images permanently in Supabase Storage unless there is a strong reason to change this architecture later.

Architecture:

```text
Browser
  ↓
Request authenticated upload permission
  ↓
Next.js server
  ↓
Generate signed upload URL
  ↓
Browser uploads directly to Cloudflare R2
```

The image should not normally pass through the Next.js server.

Store only the R2 object key inside PostgreSQL.

Example:

```text
bases/4e88276b-.../full.webp
bases/4e88276b-.../thumbnail.webp
strategies/8a1c.../diagram-1.webp
articles/22f0.../hero.webp
```

---

## Mobile App Later

The mobile application will likely use:

- React Native
- Expo
- TypeScript

It must reuse:

- the same Supabase project;
- the same PostgreSQL database;
- the same authentication system;
- the same Cloudflare R2 images;
- the same business rules;
- the same API/backend functions.

Do not design backend logic that unnecessarily depends on the web frontend.

Do not create the mobile app during the initial web MVP unless requested.

---

# 9. Authentication

Use Supabase Auth.

Initial supported methods:

- Email authentication
- Google OAuth
- Discord OAuth

Potential later methods:

- Apple
- other social login providers

Do not implement custom password storage.

Each authenticated Supabase user should have a corresponding public profile.

---

# 10. User Roles

Initial roles:

```text
user
moderator
admin
```

Potential future roles:

```text
editor              -- can publish update articles
verified_builder
```

Do not hardcode permissions only in the frontend.

Critical permissions must be enforced server-side and/or with Supabase Row Level Security.

Update articles should be restricted to admin/editor roles from the start of that feature.

---

# 11. Content Architecture Decision

## Prefer clear domain tables

Do **not** force bases, strategies, and articles into one huge generic `content` table unless there is a strong technical reason.

Preferred content tables:

```text
profiles
bases
attack_strategies          -- Post-MVP
update_articles            -- Post-MVP
```

Clan Capital may either:

1. live in `bases` with a clearer layout-type model and nullable district fields; or
2. become a dedicated `clan_capital_layouts` table later if Home Village and Capital diverge too much.

**Recommendation for now:** keep one `bases` table for layout content, with an explicit layout type and nullable Town Hall / Builder Hall / district fields. Add `attack_strategies` and `update_articles` as separate domain tables when those phases begin.

This avoids a premature generic CMS while still supporting the four pillars without a rewrite.

## Engagement tables: polymorphic vs separate

Tradeoff:

| Approach | Pros | Cons |
|---|---|---|
| Separate tables per content type (`base_comments`, `strategy_comments`, ...) | Strong foreign keys; simple RLS per table | Table explosion as content types grow; duplicated logic |
| Polymorphic (`target_type` + `target_id`) | One pattern for all content; matches `reports`; easier shared UI/API | Weaker DB-level FKs; RLS/validation must check target type carefully |

**Recommendation:**

- MVP may start with **base-specific** engagement tables (`ratings`, `comments`, `likes`, `favorites` referencing `bases`) for speed and strong foreign keys.
- Design application types/APIs so a later move to polymorphic engagement is straightforward.
- When the second user-generated content type (attack strategies) ships, prefer migrating shared engagement to:

```text
target_type text   -- base | strategy | article | ...
target_id uuid
```

with uniqueness like `unique(target_type, target_id, user_id)` where appropriate.

- `reports` should remain polymorphic from the beginning.

Do not over-engineer a full polymorphic CMS on day one. Do leave a clean path for strategies and articles.

---

# 12. Main Entities

Core entities for the full product:

```text
profiles
bases
base_images                 -- optional if keys live on bases
attack_strategies           -- Post-MVP
strategy_media              -- Post-MVP
update_articles             -- Post-MVP
ratings
comments
favorites
likes
follows
base_copy_events
base_view_events
reports
notifications               -- later
```

Optional future entities:

```text
builder_badges
base_verifications
collections
clans
subscriptions
moderation_actions
strategy_performance_reports
```

---

# 13. Database Schema

The exact implementation may evolve, but use the following model as the starting point.

---

## profiles

Public profile associated with a Supabase auth user.

Suggested fields:

```sql
id uuid primary key
username text unique not null
display_name text
avatar_key text
bio text
role text default 'user'
reputation_score numeric default 0
is_verified boolean default false
created_at timestamptz default now()
updated_at timestamptz default now()
```

`id` should normally match `auth.users.id`.

Username requirements should be enforced.

Example:

```text
3–30 characters
letters
numbers
underscore
```

Reserve usernames used by the platform.

Creator profiles must eventually support multiple content types:

```text
Bases
Attack Strategies
Clan Capital
Saved / other appropriate sections
```

MVP can show Bases + Saved. Keep the profile page structure ready for tabs.

---

## bases

Suggested table:

```sql
bases

id uuid primary key
creator_id uuid references profiles(id)

title text not null
slug text unique not null
description text

layout_type text not null
-- home_village | builder_base | clan_capital

village_type text
-- optional legacy/alias field if useful; prefer layout_type going forward

town_hall_level integer
builder_hall_level integer

-- Clan Capital fields (nullable; used when layout_type = clan_capital)
district text
district_level integer

category text
copy_link text not null

full_image_key text
thumbnail_image_key text

status text default 'published'

average_rating numeric default 0
rating_count integer default 0

like_count integer default 0
favorite_count integer default 0
comment_count integer default 0
copy_count bigint default 0
view_count bigint default 0

community_success_rate numeric

created_at timestamptz default now()
updated_at timestamptz default now()
```

Possible `layout_type` values:

```text
home_village
builder_base
clan_capital
```

Possible `category` values for Home Village:

```text
war
anti_3_star
trophy
legend
farming
hybrid
progress
fun
other
```

These values may evolve.

Do not assume that all categories apply to all layout types.

MVP focuses on `home_village` (and optionally `builder_base` if easy). Clan Capital fields can exist as nullable columns early, or be added in a migration when Phase 3 begins. Prefer adding nullable columns when the cost is low rather than boxing the schema into Town Hall-only assumptions.

---

## attack_strategies (Post-MVP)

Suggested future table:

```sql
attack_strategies

id uuid primary key
creator_id uuid references profiles(id)

title text not null
slug text unique not null
description text

town_hall_level integer not null

army_composition jsonb
spells jsonb
heroes jsonb
equipment jsonb
clan_castle_troops jsonb

when_to_use text
steps jsonb
tips text
weaknesses text
relevant_base_types text[]

video_url text
youtube_url text

status text default 'published'

average_rating numeric default 0
rating_count integer default 0
like_count integer default 0
favorite_count integer default 0
comment_count integer default 0
view_count bigint default 0
community_success_rate numeric

created_at timestamptz default now()
updated_at timestamptz default now()
```

Do not create this table in the first MVP migration unless scaffolding it empty is intentionally desired. Prefer adding it in Phase 2 with a proper migration.

---

## update_articles (Post-MVP)

Suggested future table:

```sql
update_articles

id uuid primary key
author_id uuid references profiles(id)

title text not null
slug text unique not null
summary text
body jsonb

official_update_date date
published_at timestamptz
status text default 'draft'

hero_image_key text
official_source_urls text[]

created_at timestamptz default now()
updated_at timestamptz default now()
```

Writing restricted to admin/editor roles.

---

# 14. Base Page

Example URL:

```text
/base/th17-anti-3-star-example-name
```

A base page should eventually display:

- base screenshot;
- creator;
- Town Hall;
- category;
- description;
- Copy Base button;
- rating;
- rating count;
- like count;
- favorite count;
- copy count;
- view count;
- comments;
- community performance;
- created date;
- related bases;
- other bases from the creator.

Possible layout:

```text
[Base screenshot]

TH17 Anti 3-Star War Base

by ExampleBuilder

⭐ 4.8 (372 ratings)
❤️ 2.1K
📋 18.4K copies
👁 62K views

[ COPY BASE ]

Community feedback
82% said the base performed well

Comments
...
```

---

# 15. Copy Base Functionality

Each base stores the official Clash of Clans layout sharing link supplied by the creator.

The application does NOT generate unofficial game modifications.

When the user clicks:

```text
Copy Base
```

the application should:

1. register a copy event;
2. increment or asynchronously aggregate the copy count;
3. redirect/open the official Clash of Clans layout URL.

Anonymous users can copy bases.

Avoid calling this "download" internally.

Preferred terminology:

```text
copy
copy count
copy event
```

---

# 16. Ratings

Users should be able to rate content.

Initial rating system:

```text
1–5 stars
```

Rules:

- only logged-in users can rate;
- one active rating per user per target;
- users can change their rating;
- content creator may be prevented from rating their own content;
- rating average must be derived safely;
- do not trust values submitted directly by the client.

MVP suggested table (base-specific):

```sql
ratings

id uuid primary key
base_id uuid references bases(id)
user_id uuid references profiles(id)
rating smallint check (rating between 1 and 5)
created_at timestamptz default now()
updated_at timestamptz default now()

unique(base_id, user_id)
```

Later, generalize for strategies/articles if polymorphic engagement is adopted.

---

# 17. Community Performance Feedback

A star rating alone is not enough.

Users should eventually be able to answer:

```text
Did this base perform well for you?

Yes
No
```

Possible future improvements:

```text
How many stars did the attacker get?

0
1
2
3
```

Possible dimensions:

```text
Anti 3-star
Air defense
Ground defense
Legend League performance
War performance
```

Do not overcomplicate this in the first MVP.

Initial MVP can support:

```text
worked_for_me = true / false
```

From this compute a success percentage.

Example:

```text
84% positive
based on 183 reports
```

If this delays launch, ship without it and add shortly after ratings/comments are stable.

Attack strategies can later use a similar "worked for me" signal.

---

# 18. Comments

MVP suggested schema:

```sql
comments

id uuid primary key
base_id uuid references bases(id)
user_id uuid references profiles(id)

parent_comment_id uuid nullable references comments(id)

content text not null
is_edited boolean default false
is_deleted boolean default false

created_at timestamptz default now()
updated_at timestamptz default now()
```

Support:

- comments;
- replies;
- editing own comment;
- soft deletion;
- reporting.

Do not permanently erase discussion context when a normal user deletes a comment.

A deleted comment can display:

```text
Comment deleted
```

Anonymous visitors can **read** comments. Only authenticated users can create them.

---

# 19. Favorites

Users can save a base for later.

Suggested schema:

```sql
favorites

user_id uuid references profiles(id)
base_id uuid references bases(id)
created_at timestamptz default now()

primary key(user_id, base_id)
```

Profile section:

```text
Saved Bases
```

Later: saved strategies and other content types.

---

# 20. Likes

Likes are optional but useful because they represent lightweight engagement, while ratings represent quality.

Suggested table:

```sql
likes

user_id uuid references profiles(id)
base_id uuid references bases(id)
created_at timestamptz default now()

primary key(user_id, base_id)
```

Do not confuse likes with ratings.

---

# 21. Following Creators

Users should be able to follow creators.

Suggested schema:

```sql
follows

follower_id uuid references profiles(id)
following_id uuid references profiles(id)
created_at timestamptz default now()

primary key(follower_id, following_id)
```

Prevent:

```text
user following themselves
```

Include follow in MVP **if it does not significantly delay launch**. Otherwise ship immediately after the core base + rating/comment loop.

Eventually this can power a personalized feed.

---

# 22. Creator Profiles

Example URL:

```text
/builder/examplebuilder
```

Display:

```text
Avatar
Username
Bio
Verified status

Followers
Following

Average Rating
Total Posts
Bases Published
Strategies Published   -- later
Total Likes
Total Copies
Total Views
Community Reputation
```

Then content tabs:

```text
Published Bases
Attack Strategies      -- later
Clan Capital           -- later
Saved                  -- own profile / relevant views
```

with filtering/sorting.

Possible future sections:

```text
Top Bases
Newest Bases
War Bases
Legend Bases
Top Strategies
```

Creator reputation is a core trust signal. If a creator consistently uploads high-quality content, users should recognize and follow them.

---

# 23. Creator Reputation

The platform should eventually calculate reputation.

Possible signals:

```text
average rating
number of ratings
copy count
favorite count
community success rate
number of verified bases
account age
reports / moderation history
strategy performance
```

Do not initially expose a complicated reputation algorithm.

Start simple and leave room for evolution.

Avoid reputation systems that can easily be manipulated by creating fake accounts.

Complex reputation algorithms are **not** MVP.

---

# 24. Community Verified Bases

This is a key future differentiator.

A base can become:

```text
Community Verified
```

when it passes minimum thresholds.

Example concept only:

```text
minimum ratings: 20
average rating: >= 4.3
minimum performance reports: 20
positive performance: >= 75%
```

Do not hardcode these thresholds permanently.

Store verification rules or make them configurable later.

Potential badges:

```text
Community Verified
Top Rated
Trending
Popular
Proven
```

Avoid misleading claims.

Not required for MVP launch.

---

# 25. Image Upload Rules

Users will upload screenshots and related images.

Allowed formats:

```text
JPEG
PNG
WebP
```

Potential input limit:

```text
10 MB original upload
```

However, the application should process images before permanent storage.

Generate at least:

```text
thumbnail.webp
full.webp
```

Suggested approximate targets:

```text
thumbnail:
small resolution
~30–100 KB

full:
reasonable screenshot resolution
~150–500 KB
```

Exact sizes can be tuned later.

Prefer:

```text
WebP
```

Potentially support:

```text
AVIF
```

later.

Do not retain huge originals unless there is a clear product reason.

---

# 26. R2 Upload Security

Never expose Cloudflare R2 secret credentials in the browser.

Upload flow:

```text
Client
  ↓
POST /api/uploads/base-image
  ↓
Server verifies authentication
  ↓
Server validates upload request
  ↓
Server generates presigned upload URL
  ↓
Client uploads directly to R2
```

Apply:

```text
file type checks
file size checks
rate limits
authenticated upload only
random object keys
```

Do not trust filename extensions alone.

---

# 27. Upload Abuse Prevention

Because this is a user-generated-content platform, prevent users from treating storage as free file hosting.

Possible limits:

```text
new account:
10–20 base uploads per day

trusted account:
higher limits
```

Add rate limits.

Do not expose predictable upload keys.

Implement report and deletion capability.

---

# 28. Views and Analytics

Do NOT design the final scalable solution around:

```sql
UPDATE bases
SET view_count = view_count + 1
```

on every request forever.

For the first MVP, a simple implementation is acceptable.

At higher traffic, event aggregation should be introduced.

Potential future architecture:

```text
view event
    ↓
queue / analytics store / Redis / Cloudflare service
    ↓
periodic aggregate
    ↓
PostgreSQL counters
```

Avoid counting obvious bots where practical.

Copy clicks matter more than raw page views.

---

# 29. Search

Initial MVP search should support:

```text
creator username
base title
Town Hall
category
```

Use PostgreSQL search capabilities first.

Do NOT introduce Elasticsearch / OpenSearch for the MVP.

Potential filters:

```text
TH17
War
Anti 3-Star
Highest Rated
Most Copied
Newest
Trending
```

Example route:

```text
/bases?townHall=17&category=war&sort=rating
```

Later search expands to strategies, Clan Capital, and updates.

SEO-friendly landing pages should also exist.

---

# 30. SEO and Social Sharing

SEO and sharing are **real MVP requirements**, not an afterthought.

The MVP is intended to be publicly launched and promoted.

Use server-rendered/indexable public pages where appropriate.

Important MVP page types:

```text
/th17/war-bases
/th17/anti-3-star-bases
/th17/legend-bases

/base/[slug]

/builder/[username]
```

Later:

```text
/strategies/th17
/strategies/[slug]

/clan-capital/capital-peak
/updates/[slug]
```

Each public content page should have unique useful content.

Do NOT generate thousands of thin pages with almost no unique value.

Base metadata can include:

```text
title
description
creator
town hall
category
rating
copy count
community feedback
```

Implement for MVP:

```text
metadata
Open Graph
canonical URLs
sitemap
robots.txt
structured data where appropriate
fast image loading
mobile-first performance
```

Avoid keyword stuffing.

---

# 31. Moderation

User-generated content requires moderation tools.

Minimum MVP capabilities:

```text
Report Base
Report Comment
Report User
Delete Own Base
Delete Own Comment
Block / Suspend User
Admin Review Queue
```

Suggested `reports` table:

```sql
reports

id uuid primary key
reporter_id uuid references profiles(id)

target_type text
target_id uuid

reason text
details text

status text default 'open'
created_at timestamptz default now()
reviewed_at timestamptz
reviewed_by uuid
```

Target types:

```text
base
comment
user
strategy     -- later
article      -- later
```

---

# 32. Admin Dashboard

Create an internal admin area.

Example:

```text
/admin
/admin/reports
/admin/users
/admin/bases
```

Later:

```text
/admin/articles
/admin/strategies
```

Admin functionality:

```text
review reports
hide base
remove image
delete comments
suspend user
ban user
restore content
```

Every critical admin action must be authenticated and authorized server-side.

---

# 33. Row Level Security

Use Supabase Row Level Security.

General rules:

Public / anonymous:

```text
read published bases
read public profiles
read public comments
read aggregate ratings
read published strategies/articles when those exist
```

Logged-in user:

```text
create base
edit own base
delete own base
rate content
favorite content
like content
comment
follow users
report content
```

Users must NOT be able to:

```text
edit another user's profile
edit another user's base
change copy counters manually
change rating aggregates manually
give themselves admin role
change reputation directly
publish update articles unless editor/admin
```

Never rely only on frontend checks.

---

# 34. Derived Counters

Fields such as:

```text
rating_count
average_rating
comment_count
like_count
favorite_count
copy_count
view_count
```

must not be directly writable by normal clients.

Use:

- database triggers;
- PostgreSQL functions;
- secure server endpoints;
- background aggregation;

depending on the metric.

Favor correctness over premature optimization.

---

# 35. Slugs

Public content pages should use readable slugs.

Example:

```text
th17-anti-3-star-diamond-base
```

Slug must be unique within its content type.

Possible implementation:

```text
/base/th17-anti-3-star-diamond-base
```

If duplicates exist, append short unique suffix.

Example:

```text
th17-anti-3-star-diamond-base-a7f2
```

Do not use only sequential numeric IDs in public URLs.

---

# 36. Security Principles

Follow these rules throughout the project:

1. Never expose service-role keys in the client.
2. Never expose R2 secrets in the client.
3. Validate all user input server-side.
4. Use RLS.
5. Rate-limit sensitive endpoints.
6. Sanitize user-generated text.
7. Protect against spam.
8. Protect upload endpoints.
9. Validate external Clash of Clans copy links.
10. Use UUIDs instead of predictable IDs for sensitive objects.
11. Never trust client-supplied counters or ownership.
12. Keep dependencies updated.

---

# 37. Clash of Clans Links

Users provide official Clash of Clans layout links.

Before saving a base, validate that the URL matches accepted official Clash of Clans / Supercell link formats.

Do not allow arbitrary redirect URLs through the Copy Base button.

This is important to prevent phishing.

Keep the validation logic centralized so supported official URL patterns can be updated later.

For strategy videos, validate allowed hosts (for example YouTube) rather than accepting arbitrary redirects.

---

# 38. Legal / Fan Content Considerations

This is an unofficial community fan project.

The site must make it clear that it is not officially endorsed by Supercell.

Do not use a domain name containing protected Supercell game trademarks unless explicit permission exists.

Use a unique independent brand.

Include an appropriate fan-content disclaimer in the footer.

Do not design the site to appear like an official Supercell product.

The project should use official game sharing links and should not modify the game client.

Before production launch, re-check the current Supercell Fan Content Policy.

---

# 39. Scope Separation

## MVP

Focused base-sharing community launch.

## Post-MVP

Attack strategies, then Clan Capital, then updates/patch notes, then deeper community/discovery.

## Long-term

Mobile app, richer reputation, collections, feeds, monetization experiments, advanced discovery.

Do not blur these layers during implementation.

---

# 40. Pages

## MVP public

```text
/
/bases
/base/[slug]
/builder/[username]
/login
/register
SEO landing pages such as /th17/war-bases
```

## MVP authenticated

```text
/upload
/profile
/profile/edit
/favorites
```

## MVP admin

```text
/admin
/admin/reports
```

## Post-MVP / later

```text
/strategies
/strategies/[slug]
/strategies/new
/clan-capital/...
/updates
/updates/[slug]
/following
/notifications
```

---

# 41. Home Page

The homepage should focus on discovery for the current product stage.

It must follow `DESIGN.md`: camp/hero atmosphere, mascot presence, game-style panels — not a text-only landing page.

MVP potential sections:

```text
Mascot welcome + brand hero

Search

Trending Bases

Top Rated Bases

Most Copied

Newest Bases

Popular Creators

Town Hall shortcuts
```

Town Hall shortcuts:

```text
TH17
TH16
TH15
...
```

Do not overload the first version with unfinished future pillars.

Later the homepage can surface strategies, Capital layouts, and latest update explainers.

---

# 42. Base Listing Card

Reusable component.

Should show approximately:

```text
thumbnail

TH17
War
Anti 3-Star

Base title

Creator avatar + username

⭐ 4.8
📋 12.4K
❤️ 820
```

Keep cards visually scannable.

Later, strategy cards and article cards can follow the same visual language without being forced into one component abstraction too early.

---

# 43. Base Upload Flow

Possible flow:

```text
Step 1
Upload screenshot

Step 2
Select:
- layout type / village type
- town hall
- category

Step 3
Enter:
- title
- description
- official copy link

Step 4
Preview

Step 5
Publish
```

Validate all steps server-side at final submission.

Possible later feature:

```text
draft bases
```

---

# 44. Profile Creation

After first login:

If user has no public profile, redirect to onboarding.

Ask for:

```text
username
display name optional
avatar optional
bio optional
```

Do not require unnecessary personal information.

---

# 45. Notifications

Not required for MVP.

Architecture should allow later notifications such as:

```text
Someone replied to your comment
Someone followed you
Someone liked your base
Your base became Community Verified
A creator you follow posted a new base
A creator you follow posted a new strategy
```

Use a `notifications` table later if needed.

Do not build a complex notification infrastructure initially.

---

# 46. Feed

Later feature.

Possible personalized feed:

```text
content from followed creators
trending bases
trending strategies
recommended content
```

Not required in MVP.

---

# 47. Collections

Future feature.

Users could create collections such as:

```text
My TH17 War Bases
Legend League Bases
Bases To Test
Clan War League
Strategies To Try
```

Not required initially.

---

# 48. Mobile Architecture Requirement

All critical operations must be reusable from mobile.

Avoid writing important business logic exclusively inside React components.

Preferred:

```text
shared validation
shared TypeScript types
database functions
server/API contracts
```

Possible monorepo later:

```text
apps/
  web/
  mobile/

packages/
  types/
  validation/
  api/
  ui-shared/
```

Do not create the mobile app during the initial web MVP unless requested.

---

# 49. Suggested Project Structure

Example:

```text
src/
  app/
    (public)/
    (auth)/
    admin/
    api/

  components/
    bases/
    profiles/
    comments/
    strategies/      -- later
    articles/        -- later
    common/

  lib/
    supabase/
    r2/
    auth/
    validation/
    permissions/
    clash-links/

  actions/

  types/

  utils/
```

Database:

```text
supabase/
  migrations/
  seed.sql
```

---

# 50. Environment Variables

Expected variables may include:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME
R2_PUBLIC_BASE_URL
```

Rules:

`SUPABASE_SERVICE_ROLE_KEY` must NEVER be exposed to the browser.

R2 secret keys must NEVER be exposed to the browser.

Keep `.env.local` outside version control.

Provide `.env.example`.

---

# 51. Validation

Use a validation library such as:

```text
Zod
```

Create shared schemas for:

```text
profile input
base submission
comments
ratings
reports
upload metadata
```

Later:

```text
strategy submission
article submission
```

Do not repeat validation rules across unrelated files.

---

# 52. Error Handling

User-facing errors should be understandable.

Example:

Bad:

```text
PostgrestError PGRST116
```

Good:

```text
This username is already taken.
```

Log internal error context server-side where appropriate without leaking secrets.

---

# 53. Performance

Initial performance goals:

- optimized images;
- lazy loading;
- responsive image sizes;
- database indexes;
- pagination;
- avoid N+1 queries;
- avoid loading all comments at once;
- avoid loading all bases at once.

Use cursor-based or page-based pagination initially.

Indexes should exist for frequently queried fields such as:

```text
bases.creator_id
bases.created_at
bases.layout_type
bases.town_hall_level
bases.category
bases.average_rating
bases.copy_count
comments.base_id
ratings.base_id
follows.following_id
```

Use composite indexes where real query patterns justify them.

---

# 54. Caching

Do not introduce complicated caching too early.

Next.js caching may be used carefully for public data.

Pages such as:

```text
top bases
popular creators
category landing pages
update articles
```

can eventually be cached.

Personalized pages must not leak user-specific data between users.

---

# 55. Image CDN

Serve R2 images through an appropriate public/custom domain and Cloudflare caching.

Example:

```text
images.example.com/bases/.../thumbnail.webp
```

Do not expose internal secrets or signed private URLs when the image is intended to be public.

Images belonging to unpublished/draft content may require different treatment later.

---

# 56. Cost Philosophy

The MVP should be designed to run at very low cost.

Initial infrastructure:

```text
Supabase Free
Cloudflare R2 Free Tier
Vercel / Cloudflare hosting free tier where appropriate
```

The system must be able to scale without requiring an immediate rewrite.

Avoid architecture that creates expensive bandwidth or database operations unnecessarily.

Most heavy static traffic should be image/CDN traffic, not database traffic.

---

# 57. Monetization — Future

Do not prioritize monetization before product validation.

Possible future models:

```text
advertising
donations
builder coaching
premium creator tools
approved marketplace-related functionality
```

Any monetization involving Clash of Clans must continue to comply with Supercell's current Fan Content Policy.

Do not implement paid functionality without reviewing current policy first.

---

# 58. Analytics

Track product events.

Important MVP events:

```text
base_viewed
copy_clicked
base_liked
base_favorited
rating_submitted
comment_created
creator_followed
base_uploaded
registration_completed
```

Later:

```text
strategy_viewed
strategy_saved
article_viewed
```

Do not include sensitive user information unnecessarily.

Potential analytics providers can be decided later.

---

# 59. MVP Scope

The initial MVP should include:

## Public content

- homepage;
- base discovery;
- base detail pages;
- creator profiles;
- basic search/filtering;
- Town Hall filtering;
- category filtering;
- Copy Base functionality;
- SEO metadata / Open Graph / sitemap / canonical URLs.

Anonymous users can fully consume the above.

## Authentication

- signup/login;
- logout;
- profile creation;
- public username;
- avatar;
- bio;
- edit profile.

## User-generated bases

Authenticated users can:

- upload a screenshot;
- enter title;
- select Town Hall;
- select base category;
- enter description;
- provide official copy link;
- publish;
- edit/delete their own base.

## Community features

- ratings;
- likes;
- comments;
- favorites;
- creator follow system if it does not significantly delay MVP.

## Statistics

Show:

- views;
- copy clicks;
- ratings;
- likes;
- comment count;
- favorite count where available.

## Basic moderation

- report base;
- report comment;
- admin removal;
- user suspension/ban basics.

Do NOT put every future pillar into the first milestone.

---

# 60. Features That Must Not Block First Launch

Do not require these before MVP launch:

```text
mobile app
advanced attack strategy publishing
complex Clan Capital publishing
automated patch-note ingestion
update article CMS for all users
private messaging
clans
marketplace
premium subscriptions
AI recommendations
advanced badges
complex creator reputation algorithms
real-time notifications
personalized recommendation feed
advanced analytics dashboard
complicated gamification
Elasticsearch
microservices
Kubernetes
Redis
```

Keep architecture compatible with future additions.

---

# 61. Roadmap

## Phase 1 — Base MVP (first public launch)

1. Next.js + TypeScript + Tailwind foundation.
2. Supabase auth + profiles + RLS.
3. Cloudflare R2 signed uploads + image optimization.
4. Base publish / edit / delete.
5. Public base page + Copy Base.
6. Discovery: listings, TH filters, category filters, sorting, search.
7. Community: ratings, likes, comments, favorites (+ follow if cheap).
8. Creator profiles.
9. Basic reports + admin review.
10. SEO/social sharing polish.
11. Public launch and validation.

## Phase 2 — Attack Strategies

1. `attack_strategies` table + media support.
2. Strategy publish/edit flow.
3. Text + video tutorials.
4. Strategy pages, listings, SEO routes.
5. Shared or generalized engagement (ratings/comments/likes/favorites).
6. Creator profile tab for strategies.

## Phase 3 — Clan Capital Layouts

1. Enable `layout_type = clan_capital` cleanly.
2. District + district_level fields and validation.
3. Capital discovery pages and filters.
4. Creator profile Capital tab.

## Phase 4 — Updates / Patch Notes

1. `update_articles` table.
2. Admin/editor publishing permissions.
3. Article pages and SEO/social formats.
4. Optional links from updates to related bases/strategies.

## Phase 5 — Deeper community and discovery

1. Stronger reputation signals.
2. Community verification / badges.
3. Following feed.
4. Collections.
5. Notifications.
6. Better recommendations.

## Phase 6 — Mobile

1. Expo / React Native app.
2. Reuse Supabase + R2 + shared validation/types.

---

# 62. Coding Principles for Cursor

When implementing this project:

1. Prefer simple solutions over clever abstractions.
2. Avoid premature microservices.
3. Keep database migrations version-controlled.
4. Use TypeScript strict mode.
5. Never use `any` without a strong reason.
6. Keep business logic outside UI components where possible.
7. Use server-side authorization for sensitive actions.
8. Use Supabase RLS.
9. Validate all inputs.
10. Reuse schemas and types.
11. Create small reusable components.
12. Keep API contracts usable by a future mobile client.
13. Do not introduce a dependency without explaining why it is needed.
14. Do not rewrite working architecture unnecessarily.
15. Optimize for maintainability by one developer first.
16. Add comments for non-obvious security/business logic, not obvious code.
17. Prefer PostgreSQL capabilities before adding another data service.
18. Do not implement features outside the current milestone unless requested.
19. Keep the product public-first: no login wall for reading/copying.
20. When a feature is not needed to validate the base MVP, defer it.
21. Follow `DESIGN.md` for all UI: Clash community vibe, mascots, game panels, light motion, mobile-fast.
22. Prefer CSS/SVG/optimized PNGs for characters; add Three.js only for a deliberate hero later if performance stays good.
23. Prefer Supercell Fan Kit character art over random scraped assets.

---

# 63. Important Rule for Cursor

Before implementing a major feature:

1. inspect the existing codebase;
2. understand the current schema;
3. identify reusable code;
4. explain proposed file/database changes;
5. then implement.

Do not blindly regenerate existing architecture.

When database schema changes are required:

- create a migration;
- do not manually assume production schema;
- include indexes;
- include RLS policy updates where needed.

---

# 64. First Milestone

The first meaningful end-to-end milestone should be:

```text
User signs up
    ↓
creates profile
    ↓
uploads a base screenshot
    ↓
image is stored in R2
    ↓
base metadata is stored in Supabase
    ↓
public base page is created
    ↓
anonymous visitor sees the base
    ↓
clicks Copy Base
    ↓
official Clash of Clans link opens
```

Once this works correctly, add community features, then launch the base MVP publicly.

Only after validation should Attack Strategies become the next major build.

---

# 65. Product Vision Summary

The long-term goal is not to become the website with the largest number of random Clash of Clans screenshots.

The goal is to become the community hub where players can find trusted bases, strategies, Clan Capital help, and understandable update explainers — with creator identity and community evidence behind the content.

If the platform succeeds, its strongest asset should be the combination of:

```text
quality layouts and guides
+
creator identity
+
community feedback
+
reputation
+
discovery
```

That is the product.

The first release proves one slice of that vision: **trusted base discovery and sharing**.

---

# 66. Initial Technical Decision Summary

Use this unless there is a strong reason to change it:

```text
Web
Next.js + TypeScript + Tailwind

Backend
Supabase PostgreSQL

Authentication
Supabase Auth

Authorization
Supabase RLS + server-side checks

Image Storage
Cloudflare R2

Image Delivery
Cloudflare CDN/custom image domain

Validation
Zod

Deployment
Vercel or Cloudflare

Future Mobile
React Native + Expo

Shared Backend
Supabase + R2

Content model
Separate domain tables:
  bases
  attack_strategies (later)
  update_articles (later)

Layout model
bases.layout_type =
  home_village | builder_base | clan_capital
with nullable TH / BH / district fields

Engagement model
Base-specific tables for MVP;
polymorphic path ready when strategies ship

Access model
Public-first read/copy;
auth required for contribution
```

This architecture should remain simple enough for a solo developer while still supporting significant future growth.
