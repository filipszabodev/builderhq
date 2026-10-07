import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CampMascot } from "@/components/CampMascot";
import { BaseVotePanel } from "@/components/bases/BaseVotePanel";
import { CopyBaseButton } from "@/components/bases/CopyBaseButton";
import { GamePanel } from "@/components/GamePanel";
import { BASES, getBaseBySlug } from "@/data/bases";
import {
  baseTagLabels,
  baseTypeLabels,
  type BaseTag,
  type BaseType,
} from "@/lib/taxonomy";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BASES.map((base) => ({ slug: base.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const base = getBaseBySlug(slug);
  if (!base) return { title: "Base" };
  return {
    title: base.title,
    description: base.description,
  };
}

export default async function BasePage({ params }: Props) {
  const { slug } = await params;
  const base = getBaseBySlug(slug);
  if (!base) notFound();

  const levelLabel =
    base.layoutType === "builder_base"
      ? `BH${base.builderHallLevel}`
      : `TH${base.townHallLevel}`;
  const typeLabel =
    baseTypeLabels[base.baseType as BaseType] ?? base.baseType;
  const tagLabels = base.tags.map((t) => baseTagLabels[t as BaseTag] ?? t);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <CampMascot
        character="goblin"
        line="Tap Copy Base to open the Clash layout link — then tell the camp if it holds."
      />

      <div className="mt-6 overflow-hidden rounded-2xl border-2 border-gold/40 bg-surface shadow-[0_12px_0_rgba(0,0,0,0.3)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={base.image}
          alt={base.title}
          className="max-h-[70vh] w-full object-contain bg-black/30"
        />
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
          <p className="mt-2 text-muted">
            by{" "}
            <Link
              href={`/builder/${base.creator.username}`}
              className="font-semibold text-ember hover:underline"
            >
              @{base.creator.username}
            </Link>
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/90">
            {base.description}
          </p>
        </div>

        <GamePanel>
          <CopyBaseButton copyLink={base.copyLink} />
          <BaseVotePanel
            initial={{
              likeCount: base.likeCount,
              dislikeCount: base.dislikeCount,
              ratingCount: base.ratingCount,
              averageRating: base.ratingPercent,
              myVote: null,
            }}
          />
          <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
            <Stat label="Copies" value={base.copyCount} />
            <Stat label="Views" value={base.viewCount} />
          </div>
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
