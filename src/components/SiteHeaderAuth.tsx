"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type HeaderUser = {
  username: string | null;
};

export function SiteHeaderAuth() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<HeaderUser | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const supabase = createClient();
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          if (!cancelled) {
            setUser(null);
            setReady(true);
          }
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", authUser.id)
          .maybeSingle();

        if (!cancelled) {
          setUser({ username: profile?.username ?? null });
          setReady(true);
        }
      } catch (error) {
        console.error("SiteHeaderAuth error", error);
        if (!cancelled) {
          setUser(null);
          setReady(true);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-xl bg-surface/80" aria-hidden />
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-xl bg-ember px-3 py-2 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft"
      >
        Log in
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/upload"
        className="rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
      >
        Upload
      </Link>
      {user.username ? (
        <Link
          href={`/builder/${user.username}`}
          className="rounded-xl px-3 py-2 text-sm font-medium text-gold transition hover:bg-surface"
        >
          @{user.username}
        </Link>
      ) : (
        <Link
          href="/onboarding"
          className="rounded-xl px-3 py-2 text-sm font-semibold text-ember transition hover:bg-surface"
        >
          Finish setup
        </Link>
      )}
      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className="rounded-xl border border-border px-3 py-2 text-sm text-muted transition hover:bg-surface hover:text-foreground"
        >
          Log out
        </button>
      </form>
    </>
  );
}
