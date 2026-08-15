import Link from "next/link";
import { CampIcon } from "@/components/CampIcon";
import { CampMascot } from "@/components/CampMascot";
import { GamePanel } from "@/components/GamePanel";
import { createClient, hasSupabasePublicEnv } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let loggedIn = false;
  let username: string | null = null;

  if (hasSupabasePublicEnv()) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      loggedIn = Boolean(user);
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .maybeSingle();
        username = profile?.username ?? null;
      }
    } catch (error) {
      console.error("HomePage auth error", error);
    }
  }

  let secondaryLabel = "Join the camp";
  let secondaryTo = "/register";
  if (loggedIn && username) {
    secondaryLabel = "View profile";
    secondaryTo = `/builder/${username}`;
  } else if (loggedIn) {
    secondaryLabel = "Finish setup";
    secondaryTo = "/onboarding";
  }

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="camp-hero-glow pointer-events-none absolute inset-x-0 top-0 h-[min(92vh,720px)]"
      />
      <div
        aria-hidden
        className="camp-grid pointer-events-none absolute inset-0 opacity-[0.07]"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
        <section className="grid min-h-[min(72vh,560px)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl">
              Builder<span className="text-ember">HQ</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">
              Where Clash builders gather — copy layouts, share yours, and let
              the camp vote on what holds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/bases"
                className="cta-ember rounded-xl bg-ember px-5 py-3 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft"
              >
                Browse bases
              </Link>
              <Link
                href={secondaryTo}
                className="rounded-xl border-2 border-gold/40 bg-surface/80 px-5 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:border-gold/70"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>

          <CampMascot
            character="builder"
            size="lg"
            className="justify-self-start lg:justify-self-end"
            line="Hammers up, Chief. This camp is for builders who ship layouts — and vote on the ones that work."
          />
        </section>

        <section className="mt-6 grid gap-4 sm:mt-4 sm:grid-cols-3">
          {[
            {
              icon: "copy" as const,
              title: "Copy bases",
              body: "One tap into Clash with the official layout link.",
            },
            {
              icon: "hammer" as const,
              title: "Share yours",
              body: "Upload a screenshot and publish your layout for the camp.",
            },
            {
              icon: "shield" as const,
              title: "Camp feedback",
              body: "Likes and dislikes from real players — not empty hype.",
            },
          ].map((item) => (
            <GamePanel key={item.title} className="flex flex-col gap-3">
              <CampIcon kind={item.icon} />
              <h2 className="font-display text-xl font-semibold text-gold">
                {item.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </GamePanel>
          ))}
        </section>
      </div>
    </div>
  );
}
