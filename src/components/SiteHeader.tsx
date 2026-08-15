import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Builder<span className="text-ember">HQ</span>
          </span>
          <span className="hidden text-xs text-muted sm:inline">beta</span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/bases"
            className="rounded-md px-3 py-2 text-sm text-muted transition hover:bg-surface hover:text-foreground"
          >
            Bases
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-ember px-3 py-2 text-sm font-medium text-background transition hover:bg-ember-soft"
          >
            Log in
          </Link>
        </nav>
      </div>
    </header>
  );
}
