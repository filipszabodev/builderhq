/** Shared labels for base type / tag filters. */

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
