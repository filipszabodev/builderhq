import Link from "next/link";
import { notFound } from "next/navigation";
import { CampMascot } from "@/components/CampMascot";
import { GamePanel } from "@/components/GamePanel";
import { getPublicImageUrl, isStorageConfigured } from "@/lib/storage";
import { createClient } from "@/lib/supabase/server";
import {
  baseTypeLabels,
  type BaseType,
} from "@/lib/validation/base";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  return {
    title: `${username} — Builder`,
  };
}

export default async function BuilderProfilePage({ params }: Props) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, created_at")
    .eq("username", username)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  const { data: bases } = await supabase
    .from("bases")
    .select(
      `
      title,
      slug,
      town_hall_level,
      builder_hall_level,
      layout_type,
      base_type,
      thumbnail_image_key,
      like_count,
      copy_count,
      view_count,
      average_rating,
      rating_count
    `,
    )
    .eq("creator_id", profile.id)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const totalCopies =
    bases?.reduce((sum, b) => sum + Number(b.copy_count || 0), 0) ?? 0;
  const totalViews =
    bases?.reduce((sum, b) => sum + Number(b.view_count || 0), 0) ?? 0;
  const totalLikes =
    bases?.reduce((sum, b) => sum + Number(b.like_count || 0), 0) ?? 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
        Builder profile
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
        {profile.display_name || profile.username}
      </h1>
      <p className="mt-1 text-muted">@{profile.username}</p>
      {profile.bio ? (
        <p className="mt-4 max-w-2xl text-foreground/90">{profile.bio}</p>
      ) : (
        <p className="mt-4 text-muted">No bio yet.</p>
      )}

      <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Bases" value={bases?.length ?? 0} />
        <StatCard label="Likes" value={totalLikes} />
        <StatCard label="Copies" value={totalCopies} />
        <StatCard label="Views" value={totalViews} />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-gold">
          Published bases
        </h2>

        {!bases?.length ? (
          <div className="mt-6">
            <CampMascot
              character="builder"
              line="This builder has not published a base yet."
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bases.map((base) => {
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
                      ) : null}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gold">
                      {level} · {typeLabel}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold">
                      {base.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      👁 {base.view_count} ·{" "}
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
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 px-3 py-3 text-center">
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}
