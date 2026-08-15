import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Wood/gold game-style panel used across BuilderHQ. */
export function GamePanel({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl border-2 border-gold/40 bg-gradient-to-b from-surface-2/95 to-surface/95 p-5 shadow-[0_10px_0_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,215,106,0.12)] ${className}`}
    >
      {children}
    </div>
  );
}
