"use client";

import { useState } from "react";

export type MascotKind = "barbarian" | "archer" | "builder" | "goblin";

const labels: Record<MascotKind, string> = {
  barbarian: "Barbarian",
  archer: "Archer",
  builder: "Builder",
  goblin: "Goblin",
};

type Props = {
  character?: MascotKind;
  line: string;
  size?: "md" | "lg";
  className?: string;
};

/**
 * Shared camp guide. Prefers Fan Kit PNGs in /public/characters/{name}.png
 * and falls back to stylized placeholders so UI never feels empty.
 */
export function CampMascot({
  character = "barbarian",
  line,
  size = "md",
  className = "",
}: Props) {
  const px = size === "lg" ? 140 : 104;
  const [showImage, setShowImage] = useState(true);

  return (
    <div className={`flex items-end gap-3 sm:gap-4 ${className}`}>
      <div className="mascot-bob relative shrink-0">
        <div
          className="relative overflow-hidden rounded-2xl border-2 border-gold/60 bg-gradient-to-b from-grass/40 to-grass-deep/80 shadow-[0_10px_0_rgba(0,0,0,0.35)]"
          style={{ width: px, height: px }}
        >
          {showImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/characters/${character}.png`}
              alt=""
              width={px}
              height={px}
              className="absolute inset-0 z-10 h-full w-full object-contain p-1"
              onError={() => setShowImage(false)}
            />
          ) : null}
          <PlaceholderSvg character={character} />
        </div>
      </div>
      <div className="bubble-in relative mb-6 max-w-md rounded-2xl rounded-bl-sm border-2 border-gold/70 bg-[#fff8e8] px-4 py-3 text-[#2a2118] shadow-[0_8px_0_rgba(0,0,0,0.25)]">
        <p className="text-sm font-semibold leading-relaxed sm:text-base">
          {line}
        </p>
        <span className="absolute -left-2 bottom-3 h-3 w-3 rotate-45 border-b-2 border-l-2 border-gold/70 bg-[#fff8e8]" />
        <span className="mt-2 block text-[10px] font-bold uppercase tracking-wider text-[#8a7048]">
          {labels[character]}
        </span>
      </div>
    </div>
  );
}

function PlaceholderSvg({ character }: { character: MascotKind }) {
  if (character === "archer") {
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full p-2" aria-hidden>
        <circle cx="60" cy="42" r="18" fill="#f0c7a0" />
        <rect x="42" y="58" width="36" height="40" rx="10" fill="#3d6b3f" />
        <path d="M78 48 L98 40 L78 56 Z" fill="#c4a574" />
        <circle cx="54" cy="40" r="2" fill="#2a2118" />
        <circle cx="66" cy="40" r="2" fill="#2a2118" />
        <path
          d="M52 48 Q60 54 68 48"
          stroke="#2a2118"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  }

  if (character === "builder") {
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full p-2" aria-hidden>
        <circle cx="60" cy="44" r="18" fill="#e8b896" />
        <rect x="40" y="60" width="40" height="38" rx="8" fill="#5c3b24" />
        <rect x="48" y="28" width="24" height="10" rx="2" fill="#f0b429" />
        <rect x="78" y="70" width="18" height="8" rx="2" fill="#9aa0a6" />
        <circle cx="54" cy="42" r="2" fill="#2a2118" />
        <circle cx="66" cy="42" r="2" fill="#2a2118" />
      </svg>
    );
  }

  if (character === "goblin") {
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full p-2" aria-hidden>
        <ellipse cx="60" cy="58" rx="28" ry="32" fill="#5fbf4a" />
        <circle cx="50" cy="52" r="4" fill="#1a1a1a" />
        <circle cx="70" cy="52" r="4" fill="#1a1a1a" />
        <ellipse cx="60" cy="68" rx="8" ry="5" fill="#2a2118" />
        <path d="M40 40 L48 28 L56 40" fill="#5fbf4a" />
        <path d="M64 40 L72 28 L80 40" fill="#5fbf4a" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full p-2" aria-hidden>
      <circle cx="60" cy="40" r="20" fill="#e8b896" />
      <path d="M35 30 Q60 8 85 30 L78 42 Q60 28 42 42 Z" fill="#f3d27a" />
      <rect x="38" y="58" width="44" height="42" rx="12" fill="#b4452d" />
      <rect x="86" y="62" width="10" height="36" rx="3" fill="#c4a574" />
      <circle cx="52" cy="38" r="2.5" fill="#2a2118" />
      <circle cx="68" cy="38" r="2.5" fill="#2a2118" />
      <path
        d="M50 48 Q60 56 70 48"
        stroke="#2a2118"
        strokeWidth="2.5"
        fill="none"
      />
      <path d="M44 34 L40 22" stroke="#f3d27a" strokeWidth="3" />
      <path d="M76 34 L80 22" stroke="#f3d27a" strokeWidth="3" />
    </svg>
  );
}
