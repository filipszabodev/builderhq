export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:px-6">
        <p className="font-display text-base text-foreground">
          Builder<span className="text-ember">HQ</span>
        </p>
        <p>Where Clash builders gather — bases, feedback, and community.</p>
        <p className="max-w-3xl leading-relaxed text-xs sm:text-sm">
          This material is unofficial and is not endorsed by Supercell. For more
          information see Supercell&apos;s Fan Content Policy:{" "}
          <a
            href="https://www.supercell.com/fan-content-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ember underline-offset-2 hover:underline"
          >
            www.supercell.com/fan-content-policy
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
