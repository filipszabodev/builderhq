"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isValidClashCopyLink } from "@/lib/validation/base";

export async function copyBaseAction(formData: FormData) {
  const baseId = String(formData.get("baseId") ?? "");
  const copyLink = String(formData.get("copyLink") ?? "").trim();

  if (!baseId || !isValidClashCopyLink(copyLink)) {
    redirect("/bases");
  }

  const supabase = await createClient();
  await supabase.rpc("increment_base_copy_count", { p_base_id: baseId });

  redirect(copyLink);
}
