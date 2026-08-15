"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { voteBaseAction, type VoteState } from "@/actions/votes";

type Props = {
  baseId: string;
  slug: string;
  initial: VoteState;
  canVote: boolean;
  isOwner: boolean;
  isLoggedIn: boolean;
};

export function BaseVotePanel({
  baseId,
  slug,
  initial,
  canVote,
  isOwner,
  isLoggedIn,
}: Props) {
  const [state, setState] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function cast(next: 1 | -1) {
    if (!canVote) return;
    const vote: 1 | -1 | 0 = state.myVote === next ? 0 : next;

    startTransition(async () => {
      setError(null);
      const result = await voteBaseAction(baseId, vote, slug);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setState(result.state);
    });
  }

  const scoreLabel =
    state.ratingCount === 0
      ? "No votes yet"
      : `${state.averageRating}% positive (${state.ratingCount} vote${state.ratingCount === 1 ? "" : "s"})`;

  return (
    <div className="mt-4">
      <p className="text-center text-sm font-semibold text-gold">{scoreLabel}</p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <VoteButton
          label="Like"
          count={state.likeCount}
          active={state.myVote === 1}
          disabled={!canVote || pending}
          onClick={() => cast(1)}
          tone="like"
        />
        <VoteButton
          label="Dislike"
          count={state.dislikeCount}
          active={state.myVote === -1}
          disabled={!canVote || pending}
          onClick={() => cast(-1)}
          tone="dislike"
        />
      </div>

      {!isLoggedIn ? (
        <p className="mt-3 text-center text-xs text-muted">
          <Link href="/login" className="font-semibold text-ember hover:underline">
            Log in
          </Link>{" "}
          to like or dislike this base.
        </p>
      ) : null}
      {isOwner ? (
        <p className="mt-3 text-center text-xs text-muted">
          Chiefs can&apos;t vote on their own layouts.
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-center text-xs font-semibold text-ember">{error}</p>
      ) : null}
    </div>
  );
}

function VoteButton({
  label,
  count,
  active,
  disabled,
  onClick,
  tone,
}: {
  label: string;
  count: number;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  tone: "like" | "dislike";
}) {
  const activeClass =
    tone === "like"
      ? "border-grass bg-grass/20 text-foreground"
      : "border-ember bg-ember/15 text-foreground";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? activeClass
          : "border-border bg-background/40 text-muted hover:border-gold/50 hover:text-foreground"
      }`}
    >
      <span className="block text-lg leading-none">{count}</span>
      <span className="mt-1 block text-[11px] uppercase tracking-wide">{label}</span>
    </button>
  );
}
