"use client";

import { useState } from "react";

type CampIconKind = "copy" | "hammer" | "shield";

/** Non-character Clash-flavored marks (Fan Kit PNGs optional in /public/icons). */
export function CampIcon({
  kind,
  className = "",
}: {
  kind: CampIconKind;
  className?: string;
}) {
  const [showImage, setShowImage] = useState(true);

  return (
    <div
      className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-gold/50 bg-gradient-to-b from-wood-light/40 to-wood/60 shadow-[0_6px_0_rgba(0,0,0,0.35)] ${className}`}
      aria-hidden
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/icons/${kind}.png`}
          alt=""
          className="absolute inset-0 z-10 h-full w-full object-contain p-2"
          onError={() => setShowImage(false)}
        />
      ) : null}
      <IconSvg kind={kind} />
    </div>
  );
}

function IconSvg({ kind }: { kind: CampIconKind }) {
  if (kind === "copy") {
    return (
      <svg viewBox="0 0 64 64" className="h-10 w-10 text-gold" fill="none">
        <rect
          x="18"
          y="14"
          width="28"
          height="36"
          rx="4"
          stroke="currentColor"
          strokeWidth="3"
          fill="rgba(255,215,106,0.15)"
        />
        <path
          d="M26 24h12M26 32h12M26 40h8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="44" cy="46" r="10" fill="#f0b429" />
        <path
          d="M40 46h8M44 42v8"
          stroke="#1a1208"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "hammer") {
    return (
      <svg viewBox="0 0 64 64" className="h-10 w-10 text-gold" fill="none">
        <path
          d="M14 28h24l4-8h8v16h-8l-4-8H14z"
          fill="rgba(255,215,106,0.25)"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <rect
          x="28"
          y="30"
          width="8"
          height="26"
          rx="2"
          fill="#7a5233"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10 text-gold" fill="none">
      <path
        d="M32 10l18 8v14c0 12-8 22-18 26-10-4-18-14-18-26V18l18-8z"
        fill="rgba(63,143,74,0.35)"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M24 32l6 6 12-14"
        stroke="#ffd76a"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
