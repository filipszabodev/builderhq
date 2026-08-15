import Link from "next/link";
import { CampMascot } from "@/components/CampMascot";
import { GamePanel } from "@/components/GamePanel";
import { getPublicImageUrl, isStorageConfigured } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";
import {
  baseTagLabels,
  baseTags,
  baseTypeLabels,
  baseTypes,
  type BaseTag,
  type BaseType,
} from "@/lib/validation/base";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bases",
};

type SearchParams = Promise<{
  th?: string;
  type?: string;
  tag?: string;
  sort?: string;
}>;

export default async function BasesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const th = params.th ? Number(params.th) : undefined;
  const type = baseTypes.includes(params.type as BaseType)
    ? (params.type as BaseType)
    : undefined;
  const tag = baseTags.includes(params.tag as BaseTag)
    ? (params.tag as BaseTag)
    : undefined;
  const sort = params.sort ?? "newest";

  const supabase = await createClient();
  let query = supabase
    .from("bases")
    .select(
      `
      title,
      slug,
      town_hall_level,
      builder_hall_level,
      layout_type,
      base_type,
      tags,
      thumbnail_image_key,
      like_count,
      copy_count,
      view_count,
      average_rating,
      rating_count,
      created_at,
      creator:profiles!bases_creator_id_fkey (username)
    `,
    )
    .eq("status", "published");

  if (th && th >= 3 && th <= 18) {
    query = query.eq("town_hall_level", th);
  }
  if (type) {
    query = query.eq("base_type", type);
  }
  if (tag) {
    query = query.contains("tags", [tag]);
  }

  if (sort === "oldest") {
    query = query.order("created_at", { ascending: true });
  } else if (sort === "views") {
    query = query.order("view_count", { ascending: false });
  } else if (sort === "rating") {
    query = query.order("average_rating", { ascending: false });
  } else if (sort === "copies") {
    query = query.order("copy_count", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data: bases } = await query.limit(48);

  function hrefFor(next: Record<string, string | undefined>) {
    const sp = new URLSearchParams();
    const merged = {
      th: params.th,
      type: params.type,
      tag: params.tag,
      sort: params.sort,
      ...next,
    };
    Object.entries(merged).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    const q = sp.toString();
    return q ? `/bases?${q}` : "/bases";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-gold sm:text-4xl">
            Bases
          </h1>
          <p className="mt-2 max-w-xl text-muted">
            Filter by Town Hall, type, and tags — like the big CoC base sites.
          </p>
        </div>
        <Link
          href="/upload"
          className="cta-ember inline-flex rounded-xl bg-ember px-4 py-2.5 text-sm font-bold text-[#1a1208]"
        >
          Upload base
        </Link>
      </div>

      <div className="mt-6">
        <CampMascot
          character="archer"
          line="Scout the walls, Chief. Filter by Town Hall, type, and tags — then copy what holds."
        />
      </div>

      <GamePanel className="mt-8 space-y-4">
        <FilterRow label="Town Hall">
          <Chip href={hrefFor({ th: undefined })} active={!th}>
            All
          </Chip>
          {Array.from({ length: 16 }, (_, i) => 18 - i).map((lvl) => (
            <Chip
              key={lvl}
              href={hrefFor({ th: String(lvl) })}
              active={th === lvl}
            >
              TH{lvl}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Type">
          <Chip href={hrefFor({ type: undefined })} active={!type}>
            All
          </Chip>
          {baseTypes.map((t) => (
            <Chip
              key={t}
              href={hrefFor({ type: t })}
              active={type === t}
            >
              {baseTypeLabels[t]}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Tags">
          <Chip href={hrefFor({ tag: undefined })} active={!tag}>
            All
          </Chip>
          {baseTags.map((t) => (
            <Chip key={t} href={hrefFor({ tag: t })} active={tag === t}>
              {baseTagLabels[t]}
            </Chip>
          ))}
        </FilterRow>

        <FilterRow label="Sort">
          {[
            ["newest", "Newest"],
            ["oldest", "Oldest"],
            ["views", "Most views"],
            ["rating", "Top rated"],
            ["copies", "Most copied"],
          ].map(([value, label]) => (
            <Chip
              key={value}
              href={hrefFor({ sort: value })}
              active={(sort || "newest") === value}
            >
              {label}
            </Chip>
          ))}
        </FilterRow>
      </GamePanel>

      {!bases?.length ? (
        <div className="mt-10">
          <CampMascot
            character="archer"
            line="No bases match these filters yet. Try another Town Hall — or come back after the next raid of uploads."
          />
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bases.map((base) => {
            const creator = Array.isArray(base.creator)
              ? base.creator[0]
              : base.creator;
            const thumb =
              isStorageConfigured() && base.thumbnail_image_key
                ? getPublicImageUrl(base.thumbnail_image_key)
                : null;
            const level =
              base.layout_type === "builder_base"
                ? `BH${base.builder_hall_level}`
                : `TH${base.town_hall_level}`;
            const typeLabel =
              baseTypeLabels[base.base_type as BaseType] ?? base.base_type;

            return (
              <Link key={base.slug} href={`/base/${base.slug}`}>
                <GamePanel className="h-full transition hover:border-gold/70">
                  <div className="mb-3 aspect-video overflow-hidden rounded-xl border border-border bg-black/20">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumb}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted">
                        No image
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gold">
                    {level} · {typeLabel}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-foreground">
                    {base.title}
                  </h2>
                  {base.tags?.length ? (
                    <p className="mt-1 text-[11px] text-muted">
                      {(base.tags as string[])
                        .slice(0, 3)
                        .map((t) => baseTagLabels[t as BaseTag] ?? t)
                        .join(" · ")}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm text-muted">
                    @{creator?.username ?? "unknown"} · 👁 {base.view_count} ·{" "}
                    {base.rating_count > 0
                      ? `${Number(base.average_rating).toFixed(0)}%`
                      : "No score"}{" "}
                    · 📋 {base.copy_count}
                  </p>
                </GamePanel>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
        active
          ? "border-ember bg-ember text-[#1a1208]"
          : "border-border bg-background text-muted hover:border-gold/50"
      }`}
    >
      {children}
    </Link>
  );
}
