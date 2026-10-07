/** Static sample content for the portfolio demo. */

export type CampBase = {
  title: string;
  slug: string;
  description: string;
  layoutType: "home_village" | "builder_base";
  townHallLevel: number | null;
  builderHallLevel: number | null;
  baseType: string;
  tags: string[];
  copyLink: string;
  image: string;
  thumbnail: string;
  likeCount: number;
  dislikeCount: number;
  copyCount: number;
  viewCount: number;
  ratingPercent: number;
  ratingCount: number;
  createdAt: string;
  creator: { username: string };
};

export const CREATORS = [
  {
    username: "WallBreaker",
    displayName: "Wall Breaker",
    bio: "War layouts that refuse to die. TH15–17 specialist.",
  },
  {
    username: "ElixirGoblin",
    displayName: "Elixir Goblin",
    bio: "Farming bases so greedy even the Goblins tip their hats.",
  },
] as const;

export const BASES: CampBase[] = [
  {
    title: "Anti-3 Ring Fortress",
    slug: "th17-anti-3-ring-fortress",
    description:
      "Compartmentalized TH17 war base — scattershot pockets and a nasty core that punishes funnel mistakes.",
    layoutType: "home_village",
    townHallLevel: 17,
    builderHallLevel: null,
    baseType: "war",
    tags: ["anti_3_star", "island", "cwl"],
    copyLink: "https://link.clashofclans.com/en?action=OpenLayout&id=TH17%3AWar%3A0",
    image: "/demo-bases/seed-base-th17-war-full.webp",
    thumbnail: "/demo-bases/seed-base-th17-war-thumb.webp",
    likeCount: 128,
    dislikeCount: 9,
    copyCount: 1840,
    viewCount: 9200,
    ratingPercent: 93,
    ratingCount: 137,
    createdAt: "2026-03-01T12:00:00.000Z",
    creator: { username: "WallBreaker" },
  },
  {
    title: "Legend Ladder Lock",
    slug: "th16-legend-ladder-lock",
    description:
      "Tight TH16 for Legend climb — eagle and infernos cover the town hall path.",
    layoutType: "home_village",
    townHallLevel: 16,
    builderHallLevel: null,
    baseType: "legend",
    tags: ["anti_2_star", "ring", "legend_league"],
    copyLink: "https://link.clashofclans.com/en?action=OpenLayout&id=TH16%3AWar%3A0",
    image: "/demo-bases/seed-base-th16-war-full.webp",
    thumbnail: "/demo-bases/seed-base-th16-war-thumb.webp",
    likeCount: 96,
    dislikeCount: 11,
    copyCount: 1320,
    viewCount: 7100,
    ratingPercent: 90,
    ratingCount: 107,
    createdAt: "2026-03-02T15:30:00.000Z",
    creator: { username: "WallBreaker" },
  },
  {
    title: "Trophy Push Core",
    slug: "th15-trophy-push-core",
    description:
      "Centralized TH15 trophy layout — forces attackers through high-DPS compartments.",
    layoutType: "home_village",
    townHallLevel: 15,
    builderHallLevel: null,
    baseType: "trophy",
    tags: ["anti_3_star", "box", "compact"],
    copyLink: "https://link.clashofclans.com/en?action=OpenLayout&id=TH15%3AWar%3A0",
    image: "/demo-bases/seed-base-th15-trophy-full.webp",
    thumbnail: "/demo-bases/seed-base-th15-trophy-thumb.webp",
    likeCount: 74,
    dislikeCount: 6,
    copyCount: 980,
    viewCount: 5400,
    ratingPercent: 92,
    ratingCount: 80,
    createdAt: "2026-03-03T09:00:00.000Z",
    creator: { username: "WallBreaker" },
  },
  {
    title: "Deadeye Farm Ring",
    slug: "th14-deadeye-farm-ring",
    description:
      "TH14 farming ring — storages split, collectors outside, keep the loot annoying to snipe.",
    layoutType: "home_village",
    townHallLevel: 14,
    builderHallLevel: null,
    baseType: "farming",
    tags: ["ring", "anti_ground"],
    copyLink: "https://link.clashofclans.com/en?action=OpenLayout&id=TH14%3AFarm%3A0",
    image: "/demo-bases/seed-base-th14-farm-full.webp",
    thumbnail: "/demo-bases/seed-base-th14-farm-thumb.webp",
    likeCount: 61,
    dislikeCount: 14,
    copyCount: 2100,
    viewCount: 8800,
    ratingPercent: 81,
    ratingCount: 75,
    createdAt: "2026-03-04T18:20:00.000Z",
    creator: { username: "ElixirGoblin" },
  },
  {
    title: "Hybrid Progress Hub",
    slug: "th13-hybrid-progress-hub",
    description:
      "TH13 hybrid for builders still upgrading — protects the lab path and key defenses.",
    layoutType: "home_village",
    townHallLevel: 13,
    builderHallLevel: null,
    baseType: "hybrid",
    tags: ["compact", "box"],
    copyLink: "https://link.clashofclans.com/en?action=OpenLayout&id=TH13%3AFarm%3A0",
    image: "/demo-bases/seed-base-th13-hybrid-full.webp",
    thumbnail: "/demo-bases/seed-base-th13-hybrid-thumb.webp",
    likeCount: 48,
    dislikeCount: 5,
    copyCount: 640,
    viewCount: 3100,
    ratingPercent: 91,
    ratingCount: 53,
    createdAt: "2026-03-05T11:10:00.000Z",
    creator: { username: "ElixirGoblin" },
  },
  {
    title: "Builder Outpost BH10",
    slug: "bh10-builder-outpost",
    description:
      "BH10 defense layout — Battle Machine bait and layered walls for versus battles.",
    layoutType: "builder_base",
    townHallLevel: null,
    builderHallLevel: 10,
    baseType: "defense",
    tags: ["island", "anti_air"],
    copyLink: "https://link.clashofclans.com/en?action=OpenLayout&id=BH10%3AWar%3A0",
    image: "/demo-bases/seed-base-bh10-full.webp",
    thumbnail: "/demo-bases/seed-base-bh10-thumb.webp",
    likeCount: 39,
    dislikeCount: 3,
    copyCount: 420,
    viewCount: 1900,
    ratingPercent: 93,
    ratingCount: 42,
    createdAt: "2026-03-06T08:45:00.000Z",
    creator: { username: "ElixirGoblin" },
  },
];

export function listBases(filters?: {
  th?: number;
  type?: string;
  tag?: string;
  sort?: string;
}) {
  let list = [...BASES];
  if (filters?.th) list = list.filter((b) => b.townHallLevel === filters.th);
  if (filters?.type) list = list.filter((b) => b.baseType === filters.type);
  if (filters?.tag) list = list.filter((b) => b.tags.includes(filters.tag!));

  const sort = filters?.sort ?? "newest";
  if (sort === "oldest") list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  else if (sort === "views") list.sort((a, b) => b.viewCount - a.viewCount);
  else if (sort === "rating") list.sort((a, b) => b.ratingPercent - a.ratingPercent);
  else if (sort === "copies") list.sort((a, b) => b.copyCount - a.copyCount);
  else list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return list;
}

export function getBaseBySlug(slug: string) {
  return BASES.find((b) => b.slug === slug) ?? null;
}

export function getBasesByUsername(username: string) {
  return BASES.filter(
    (b) => b.creator.username.toLowerCase() === username.toLowerCase(),
  );
}

export function getCreator(username: string) {
  return (
    CREATORS.find((c) => c.username.toLowerCase() === username.toLowerCase()) ??
    null
  );
}
