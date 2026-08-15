"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type VoteState = {
  likeCount: number;
  dislikeCount: number;
  ratingCount: number;
  averageRating: number;
  myVote: 1 | -1 | null;
};

export type VoteActionResult =
  | { ok: true; state: VoteState }
  | { ok: false; error: string };

function parseVotePayload(data: unknown): VoteState | null {
  if (!data || typeof data !== "object") return null;
  const row = data as Record<string, unknown>;
  const myVoteRaw = row.my_vote;
  const myVote =
    myVoteRaw === 1 || myVoteRaw === -1
      ? myVoteRaw
      : myVoteRaw === "1"
        ? 1
        : myVoteRaw === "-1"
          ? -1
          : null;

  return {
    likeCount: Number(row.like_count ?? 0),
    dislikeCount: Number(row.dislike_count ?? 0),
    ratingCount: Number(row.rating_count ?? 0),
    averageRating: Number(row.average_rating ?? 0),
    myVote,
  };
}

/**
 * Cast or clear a vote.
 * `vote`: 1 like, -1 dislike, 0 clear.
 * Clicking the same active vote again clears it.
 */
export async function voteBaseAction(
  baseId: string,
  vote: 1 | -1 | 0,
  slug?: string,
): Promise<VoteActionResult> {
  if (!baseId) {
    return { ok: false, error: "Missing base." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "Log in to vote." };
  }

  const { data, error } = await supabase.rpc("cast_base_vote", {
    p_base_id: baseId,
    p_vote: vote,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const state = parseVotePayload(data);
  if (!state) {
    return { ok: false, error: "Could not read vote result." };
  }

  if (slug) {
    revalidatePath(`/base/${slug}`);
  }
  revalidatePath("/bases");

  return { ok: true, state };
}
