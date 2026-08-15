import Link from "next/link";
import { CampMascot } from "@/components/CampMascot";
import { GamePanel } from "@/components/GamePanel";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_20%_20%,rgba(240,180,41,0.15),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(63,143,74,0.2),transparent_30%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-14 px-4 py-12 sm:px-6 sm:py-20">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Clash of Clans community camp
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
              Builder<span className="text-ember">HQ</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Gather with other chiefs. Copy bases, share your layouts, and let
              the camp tell you what actually works.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/bases"
                className="cta-ember rounded-xl bg-ember px-5 py-3 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft"
              >
                Browse bases
              </Link>
              <Link
                href={user ? "/bases" : "/register"}
                className="rounded-xl border-2 border-gold/40 bg-surface px-5 py-3 text-sm font-semibold text-foreground transition hover:border-gold/70"
              >
                {user ? "Enter the bases" : "Join the camp"}
              </Link>
            </div>
          </div>

          <CampMascot
            character="barbarian"
            size="lg"
            line={
              user
                ? "Welcome back, Chief! Ready to build or copy something spicy?"
                : "Welcome to the camp! Come in, copy bases, and show us what you built."
            }
          />
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            {
              character: "goblin" as const,
              title: "Copy bases",
              body: "One tap into Clash with the official layout link.",
            },
            {
              character: "builder" as const,
              title: "Share yours",
              body: "Upload a screenshot and publish your layout for the camp.",
            },
            {
              character: "archer" as const,
              title: "Camp feedback",
              body: "Likes, dislikes, and comments — trust from real players.",
            },
          ].map((item) => (
            <GamePanel key={item.title}>
              <CampMascot character={item.character} line={item.body} />
              <h2 className="mt-3 font-display text-xl font-semibold text-gold">
                {item.title}
              </h2>
            </GamePanel>
          ))}
        </section>

        <GamePanel className="text-center">
          <p className="text-sm text-muted">
            Next up: publish bases, ratings, and comments — still with this camp
            energy.
          </p>
        </GamePanel>
      </div>
    </div>
  );
}
