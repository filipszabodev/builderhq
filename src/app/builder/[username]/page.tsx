import Link from "next/link";
import { notFound } from "next/navigation";
import { CampMascot } from "@/components/CampMascot";
import { GamePanel } from "@/components/GamePanel";
import {
  CREATORS,
  getBasesByUsername,
  getCreator,
} from "@/data/bases";
import { baseTypeLabels, type BaseType } from "@/lib/taxonomy";

type Props = {
  params: Promise<{ username: string }>;
};

export function generateStaticParams() {
  return CREATORS.map((c) => ({ username: c.username }));
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  return { title: `${username} — Builder` };
}

export default async function BuilderProfilePage({ params }: Props) {
  const { username } = await params;
  const profile = getCreator(username);
  if (!profile) notFound();

  const bases = getBasesByUsername(username);
  const totalCopies = bases.reduce((sum, b) => sum + b.copyCount, 0);
  const totalViews = bases.reduce((sum, b) => sum + b.viewCount, 0);
  const totalLikes = bases.reduce((sum, b) => sum + b.likeCount, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
        Builder profile
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
        {profile.displayName}
      </h1>
      <p className="mt-1 text-muted">@{profile.username}</p>
      <p className="mt-4 max-w-2xl text-foreground/90">{profile.bio}</p>

      <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Bases" value={bases.length} />
        <StatCard label="Likes" value={totalLikes} />
        <StatCard label="Copies" value={totalCopies} />
        <StatCard label="Views" value={totalViews} />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-gold">
          Published bases
        </h2>

        {!bases.length ? (
          <div className="mt-6">
            <CampMascot
              character="builder"
              line="This builder has not published a base yet."
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bases.map((base) => {
              const level =
                base.layoutType === "builder_base"
                  ? `BH${base.builderHallLevel}`
                  : `TH${base.townHallLevel}`;
              const typeLabel =
                baseTypeLabels[base.baseType as BaseType] ?? base.baseType;

              return (
                <Link key={base.slug} href={`/base/${base.slug}`}>
                  <GamePanel className="h-full transition hover:border-gold/70">
                    <div className="mb-3 aspect-video overflow-hidden rounded-xl border border-border bg-black/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={base.thumbnail}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gold">
                      {level} · {typeLabel}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold">
                      {base.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {base.viewCount} views · {base.ratingPercent}% ·{" "}
                      {base.copyCount} copies
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
