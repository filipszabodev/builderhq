import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-gold/25 bg-[#0e1a12]/85 backdrop-blur-md">
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
          <Link
            href="/upload"
            className="hidden rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground sm:inline"
          >
            Upload
          </Link>
          <Link
            href="/login"
            className="rounded-xl bg-ember px-3 py-2 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft"
          >
            Log in
          </Link>
        </nav>
      </div>
    </header>
  );
}
