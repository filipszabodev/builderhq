import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-gold/25 bg-gradient-to-b from-[#0e1a12] to-[#0a120e]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-[1.2fr_0.8fr] sm:px-6 sm:py-12">
        <div>
          <p className="font-display text-2xl font-semibold text-foreground">
            Builder<span className="text-ember">HQ</span>
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            community camp
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            Where Clash builders gather — bases, feedback, and campfire energy.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link
              href="/bases"
              className="rounded-lg border border-border px-3 py-1.5 text-muted transition hover:border-gold/40 hover:text-foreground"
            >
              Browse bases
            </Link>
            <Link
              href="/upload"
              className="rounded-lg border border-border px-3 py-1.5 text-muted transition hover:border-gold/40 hover:text-foreground"
            >
              Upload a base
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-gold/20 bg-surface/40 p-4 sm:p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-gold">
            Fan content
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
            This material is unofficial and is not endorsed by Supercell. For
            more information see Supercell&apos;s Fan Content Policy:{" "}
            <a
              href="https://www.supercell.com/fan-content-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ember underline-offset-2 hover:underline"
            >
              supercell.com/fan-content-policy
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
