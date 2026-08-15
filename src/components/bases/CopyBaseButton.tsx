import { copyBaseAction } from "@/actions/engagement";

export function CopyBaseButton({
  baseId,
  copyLink,
}: {
  baseId: string;
  copyLink: string;
}) {
  return (
    <form action={copyBaseAction}>
      <input type="hidden" name="baseId" value={baseId} />
      <input type="hidden" name="copyLink" value={copyLink} />
      <button
        type="submit"
        className="cta-ember flex w-full items-center justify-center rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208]"
      >
        Copy Base
      </button>
    </form>
  );
}
