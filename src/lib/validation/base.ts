import { z } from "zod";

/** Official Clash of Clans layout share links only. */
const CLASH_LINK_PATTERNS = [
  /^https:\/\/link\.clashofclans\.com\/[a-z]{2}(?:-[a-z]{2})?\?.*action=OpenLayout.*$/i,
  /^https:\/\/link\.clashofclans\.com\/\?.*action=OpenLayout.*$/i,
];

export function isValidClashCopyLink(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== "https:") return false;
    if (parsed.hostname !== "link.clashofclans.com") return false;
    return CLASH_LINK_PATTERNS.some((re) => re.test(parsed.toString()));
  } catch {
    return false;
  }
}

/** Primary purpose of the base (like other CoC base sites). */
export const baseTypes = [
  "war",
  "farming",
  "defense",
  "trophy",
  "legend",
  "progress",
  "hybrid",
  "fun",
] as const;

export type BaseType = (typeof baseTypes)[number];

export const baseTypeLabels: Record<BaseType, string> = {
  war: "War",
  farming: "Farming",
  defense: "Defense",
  trophy: "Trophy",
  legend: "Legend",
  progress: "Progress",
  hybrid: "Hybrid",
  fun: "Fun / Troll",
};

/** Optional style tags — multi-select. */
export const baseTags = [
  "anti_2_star",
  "anti_3_star",
  "anti_air",
  "anti_ground",
  "anti_everything",
  "legend_league",
  "cwl",
  "ring",
  "island",
  "box",
  "diamond",
  "compact",
  "open",
] as const;

export type BaseTag = (typeof baseTags)[number];

export const baseTagLabels: Record<BaseTag, string> = {
  anti_2_star: "Anti 2-Star",
  anti_3_star: "Anti 3-Star",
  anti_air: "Anti Air",
  anti_ground: "Anti Ground",
  anti_everything: "Anti Everything",
  legend_league: "Legend League",
  cwl: "CWL",
  ring: "Ring",
  island: "Island",
  box: "Box",
  diamond: "Diamond",
  compact: "Compact",
  open: "Open",
};

export const publishBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title must be at most 80 characters"),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  layoutType: z.enum(["home_village", "builder_base"]).default("home_village"),
  townHallLevel: z.coerce.number().int().min(3).max(18).optional(),
  builderHallLevel: z.coerce.number().int().min(1).max(10).optional(),
  baseType: z.enum(baseTypes),
  tags: z.array(z.enum(baseTags)).max(8).default([]),
  copyLink: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .refine(isValidClashCopyLink, {
      message:
        "Copy link must be an official Clash of Clans layout link (link.clashofclans.com)",
    }),
  fullImageKey: z.string().min(1),
  thumbnailImageKey: z.string().min(1),
});
