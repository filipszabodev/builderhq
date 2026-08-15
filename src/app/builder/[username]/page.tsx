import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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
    .select("username, display_name, bio, created_at")
    .eq("username", username)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ember">
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

      <section className="mt-10 rounded-xl border border-dashed border-border bg-surface/30 p-6">
        <h2 className="font-display text-xl font-semibold">Published bases</h2>
        <p className="mt-2 text-sm text-muted">
          Bases will appear here after Milestone 2 (upload & publish).
        </p>
      </section>
    </div>
  );
}
