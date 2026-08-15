export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-gold/20 bg-[#0c1610]/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:px-6">
        <p className="font-display text-base text-foreground">
          Builder<span className="text-ember">HQ</span>
          <span className="ml-2 text-xs font-bold uppercase tracking-wider text-gold">
            community camp
          </span>
        </p>
        <p>Where Clash builders gather — bases, feedback, and campfire energy.</p>
        <p className="max-w-3xl text-xs leading-relaxed sm:text-sm">
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
