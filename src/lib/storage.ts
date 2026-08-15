import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/admin";

export const BASE_IMAGES_BUCKET = "base-images";

export function getPublicImageUrl(key: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  return `${base}/storage/v1/object/public/${BASE_IMAGES_BUCKET}/${key}`;
}

export function isStorageConfigured() {
  // Uses existing Supabase project — no extra vendor required for MVP.
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

/**
 * Upload a WebP buffer to Supabase Storage (public bucket).
 * Uses service role on the server so RLS storage policies stay simple.
 */
export async function uploadBaseImage(input: {
  userId: string;
  kind: "full" | "thumbnail";
  body: Buffer;
  uploadId?: string;
}) {
  const uploadId = input.uploadId ?? randomUUID();
  const filename = input.kind === "thumbnail" ? "thumbnail.webp" : "full.webp";
  const key = `${input.userId}/${uploadId}/${filename}`;

  const supabase = createServiceClient();
  const { error } = await supabase.storage
    .from(BASE_IMAGES_BUCKET)
    .upload(key, input.body, {
      contentType: "image/webp",
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return {
    key,
    uploadId,
    publicUrl: getPublicImageUrl(key),
  };
}

/** Auth check helper for upload routes. */
export async function requireUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}
