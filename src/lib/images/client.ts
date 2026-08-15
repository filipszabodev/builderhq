/** Compress an image file to WebP in the browser (no server round-trip). */
export async function fileToWebpBlob(
  file: File,
  options: { maxWidth: number; quality: number },
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, options.maxWidth / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process image.");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), "image/webp", options.quality);
  });

  if (!blob) throw new Error("Could not create WebP image.");
  return blob;
}

export async function uploadWebpToSignedUrl(
  uploadUrl: string,
  blob: Blob,
): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "image/webp",
    },
    body: blob,
  });

  if (!res.ok) {
    throw new Error("Image upload failed. Please try again.");
  }
}
