export function DemoNotice({ className = "" }: { className?: string }) {
  return (
    <p
      className={`rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-center text-xs font-semibold text-gold ${className}`}
    >
      Portfolio demo — UI only, no live accounts or database.
    </p>
  );
}
