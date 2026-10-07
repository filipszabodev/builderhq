"use client";

import { useState } from "react";

type VoteState = {
  likeCount: number;
  dislikeCount: number;
  ratingCount: number;
  averageRating: number;
  myVote: 1 | -1 | null;
};

export function BaseVotePanel({ initial }: { initial: VoteState }) {
  const [state, setState] = useState(initial);

  function cast(next: 1 | -1) {
    setState((prev) => {
      let likeCount = prev.likeCount;
      let dislikeCount = prev.dislikeCount;
      let myVote: 1 | -1 | null = next;

      if (prev.myVote === 1) likeCount -= 1;
      if (prev.myVote === -1) dislikeCount -= 1;

      if (prev.myVote === next) {
        myVote = null;
      } else if (next === 1) {
        likeCount += 1;
      } else {
        dislikeCount += 1;
      }

      const ratingCount = likeCount + dislikeCount;
      const averageRating =
        ratingCount === 0
          ? 0
          : Math.round((likeCount / ratingCount) * 100);

      return { likeCount, dislikeCount, ratingCount, averageRating, myVote };
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
          onClick={() => cast(1)}
          tone="like"
        />
        <VoteButton
          label="Dislike"
          count={state.dislikeCount}
          active={state.myVote === -1}
          onClick={() => cast(-1)}
          tone="dislike"
        />
      </div>

      <p className="mt-3 text-center text-xs text-muted">
        Demo votes stay in this browser tab only.
      </p>
    </div>
  );
}

function VoteButton({
  label,
  count,
  active,
  onClick,
  tone,
}: {
  label: string;
  count: number;
  active: boolean;
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
      onClick={onClick}
      className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition ${
        active
          ? activeClass
          : "border-border bg-background/40 text-muted hover:border-gold/50 hover:text-foreground"
      }`}
    >
      <span className="block text-lg leading-none">{count}</span>
      <span className="mt-1 block text-[11px] uppercase tracking-wide">
        {label}
      </span>
    </button>
  );
}
