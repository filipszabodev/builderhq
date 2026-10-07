"use client";

export function CopyBaseButton({ copyLink }: { copyLink: string }) {
  return (
    <a
      href={copyLink}
      target="_blank"
      rel="noopener noreferrer"
      className="cta-ember flex w-full items-center justify-center rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208]"
    >
      Copy Base
    </a>
  );
}
