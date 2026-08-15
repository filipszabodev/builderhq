import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 4);

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function buildBaseSlug(input: {
  title: string;
  townHallLevel?: number | null;
  builderHallLevel?: number | null;
  category: string;
}): string {
  const th =
    input.townHallLevel != null
      ? `th${input.townHallLevel}`
      : input.builderHallLevel != null
        ? `bh${input.builderHallLevel}`
        : "base";

  const category = input.category.replaceAll("_", "-");
  const titlePart = slugifyTitle(input.title) || "layout";
  return `${th}-${category}-${titlePart}-${nanoid()}`;
}
