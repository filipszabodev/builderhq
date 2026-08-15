import Link from "next/link";
import { signOutAction } from "@/actions/auth";
import { createClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();
    username = profile?.username ?? null;
  }

  return (
    <header className="border-b-2 border-gold/25 bg-[#102018]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Builder<span className="text-ember">HQ</span>
          </span>
          <span className="hidden rounded-full border border-gold/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold sm:inline">
            camp
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/bases"
            className="rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
          >
            Bases
          </Link>

          {user ? (
            <>
              {username ? (
                <Link
                  href={`/builder/${username}`}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-gold transition hover:bg-surface"
                >
                  @{username}
                </Link>
              ) : (
                <Link
                  href="/onboarding"
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-ember transition hover:bg-surface"
                >
                  Finish setup
                </Link>
              )}
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-xl border border-border px-3 py-2 text-sm text-muted transition hover:bg-surface hover:text-foreground"
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-ember px-3 py-2 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft"
            >
              Log in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
