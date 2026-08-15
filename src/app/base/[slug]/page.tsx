import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CampMascot } from "@/components/CampMascot";
import { CopyBaseButton } from "@/components/bases/CopyBaseButton";
import { GamePanel } from "@/components/GamePanel";
import { getPublicImageUrl, isStorageConfigured } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";
import {
  baseTagLabels,
  baseTypeLabels,
  type BaseTag,
  type BaseType,
} from "@/lib/validation/base";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("bases")
    .select("title, description, town_hall_level, base_type")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) return { title: "Base" };

  return {
    title: data.title,
    description:
      data.description ||
      `TH${data.town_hall_level ?? "?"} ${data.base_type} base on BuilderHQ`,
  };
}

export default async function BasePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: base } = await supabase
    .from("bases")
    .select(
      `
      id,
      title,
      slug,
      description,
      layout_type,
      town_hall_level,
      builder_hall_level,
      base_type,
      tags,
      copy_link,
      full_image_key,
      thumbnail_image_key,
      like_count,
      dislike_count,
      copy_count,
      view_count,
      created_at,
      creator:profiles!bases_creator_id_fkey (
        username,
        display_name
      )
    `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!base) notFound();

  await supabase.rpc("increment_base_view_count", { p_base_id: base.id });

  const creator = Array.isArray(base.creator) ? base.creator[0] : base.creator;
  const imageUrl = isStorageConfigured()
    ? getPublicImageUrl(base.full_image_key)
    : null;

  const levelLabel =
    base.layout_type === "builder_base"
      ? `BH${base.builder_hall_level}`
      : `TH${base.town_hall_level}`;

  const typeLabel =
    baseTypeLabels[base.base_type as BaseType] ?? base.base_type;
  const tagLabels = ((base.tags as string[]) ?? []).map(
    (t) => baseTagLabels[t as BaseTag] ?? t,
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CampMascot
        character="goblin"
        line="Tap Copy Base to pull this layout straight into Clash."
      />

      <div className="mt-6 overflow-hidden rounded-2xl border-2 border-gold/40 bg-surface shadow-[0_12px_0_rgba(0,0,0,0.3)]">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={base.title}
            className="max-h-[70vh] w-full object-contain bg-black/30"
          />
        ) : (
          <div className="flex h-64 items-center justify-center bg-black/20 text-sm text-muted">
            Image storage not configured yet
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">
            {levelLabel} · {typeLabel}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {base.title}
          </h1>
          {tagLabels.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tagLabels.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
          {creator ? (
            <p className="mt-2 text-muted">
              by{" "}
              <Link
                href={`/builder/${creator.username}`}
                className="font-semibold text-ember hover:underline"
              >
                @{creator.username}
              </Link>
            </p>
          ) : null}
          {base.description ? (
            <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">
              {base.description}
            </p>
          ) : null}
        </div>

        <GamePanel>
          <CopyBaseButton baseId={base.id} copyLink={base.copy_link} />
          <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
            <Stat label="Likes" value={base.like_count} />
            <Stat label="Dislikes" value={base.dislike_count} />
            <Stat label="Copies" value={base.copy_count} />
            <Stat label="Views" value={base.view_count + 1} />
          </div>
          <p className="mt-4 text-xs text-muted">
            Ratings & comments arrive in the next community milestone.
          </p>
        </GamePanel>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 px-2 py-3">
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
