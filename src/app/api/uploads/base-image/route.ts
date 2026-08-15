import { NextResponse } from "next/server";
import { z } from "zod";
import {
  isStorageConfigured,
  requireUserId,
  uploadBaseImage,
} from "@/lib/storage";

const metaSchema = z.object({
  kind: z.enum(["full", "thumbnail"]),
  uploadId: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  if (!isStorageConfigured()) {
    return NextResponse.json(
      { error: "Storage is not configured." },
      { status: 503 },
    );
  }

  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "You must be logged in." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload form." }, { status: 400 });
  }

  const parsed = metaSchema.safeParse({
    kind: form.get("kind"),
    uploadId: form.get("uploadId") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid upload metadata." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing image file." }, { status: 400 });
  }

  if (file.type !== "image/webp") {
    return NextResponse.json({ error: "Only WebP uploads are accepted." }, { status: 400 });
  }

  if (file.size > 3 * 1024 * 1024) {
    return NextResponse.json({ error: "Image is too large." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await uploadBaseImage({
      userId,
      kind: parsed.data.kind,
      body: buffer,
      uploadId: parsed.data.uploadId,
    });

    return NextResponse.json({
      key: uploaded.key,
      publicUrl: uploaded.publicUrl,
      uploadId: uploaded.uploadId,
    });
  } catch (error) {
    console.error("Storage upload failed", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not upload image to storage.",
      },
      { status: 500 },
    );
  }
}
