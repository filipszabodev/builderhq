"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { buildBaseSlug } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";
import { publishBaseSchema } from "@/lib/validation/base";

export type PublishBaseState = {
  error?: string;
};

export async function publishBaseAction(
  _prev: PublishBaseState,
  formData: FormData,
): Promise<PublishBaseState> {
  const parsed = publishBaseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    layoutType: formData.get("layoutType") || "home_village",
    townHallLevel: formData.get("townHallLevel") || undefined,
    builderHallLevel: formData.get("builderHallLevel") || undefined,
    baseType: formData.get("baseType"),
    tags: formData.getAll("tags"),
    copyLink: formData.get("copyLink"),
    fullImageKey: formData.get("fullImageKey"),
    thumbnailImageKey: formData.get("thumbnailImageKey"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const data = parsed.data;

  if (data.layoutType === "home_village" && !data.townHallLevel) {
    return { error: "Town Hall level is required." };
  }
  if (data.layoutType === "builder_base" && !data.builderHallLevel) {
    return { error: "Builder Hall level is required." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.username) {
    return { error: "Finish your profile setup first." };
  }

  const slug = buildBaseSlug({
    title: data.title,
    townHallLevel: data.townHallLevel,
    builderHallLevel: data.builderHallLevel,
    category: data.baseType,
  });

  const { data: base, error } = await supabase
    .from("bases")
    .insert({
      creator_id: user.id,
      title: data.title,
      slug,
      description: data.description || null,
      layout_type: data.layoutType,
      town_hall_level: data.townHallLevel ?? null,
      builder_hall_level: data.builderHallLevel ?? null,
      base_type: data.baseType,
      tags: data.tags,
      copy_link: data.copyLink,
      full_image_key: data.fullImageKey,
      thumbnail_image_key: data.thumbnailImageKey,
      status: "published",
    })
    .select("slug")
    .single();

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  revalidatePath("/bases");
  revalidatePath(`/builder/${profile.username}`);
  redirect(`/base/${base.slug}`);
}
