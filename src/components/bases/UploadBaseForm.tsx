"use client";

import { useActionState, useMemo, useState } from "react";
import { publishBaseAction, type PublishBaseState } from "@/actions/bases";
import { CampMascot } from "@/components/CampMascot";
import { GamePanel } from "@/components/GamePanel";
import { fileToWebpBlob } from "@/lib/images/client";
import {
  baseTagLabels,
  baseTags,
  baseTypeLabels,
  baseTypes,
  type BaseTag,
  type BaseType,
} from "@/lib/validation/base";

const initialState: PublishBaseState = {};
type Step = "image" | "details" | "link" | "review";

export function UploadBaseForm() {
  const [step, setStep] = useState<Step>("image");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fullImageKey, setFullImageKey] = useState("");
  const [thumbnailImageKey, setThumbnailImageKey] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [layoutType, setLayoutType] = useState<"home_village" | "builder_base">(
    "home_village",
  );
  const [townHallLevel, setTownHallLevel] = useState("17");
  const [builderHallLevel, setBuilderHallLevel] = useState("10");
  const [baseType, setBaseType] = useState<BaseType>("war");
  const [selectedTags, setSelectedTags] = useState<BaseTag[]>([]);
  const [copyLink, setCopyLink] = useState("");

  const [state, formAction, pending] = useActionState(
    publishBaseAction,
    initialState,
  );

  const mascotLine = useMemo(() => {
    if (step === "image") return "Drop a clear screenshot of your base, Chief!";
    if (step === "details")
      return "Pick Town Hall, base type, and tags so chiefs can find it.";
    if (step === "link")
      return "Paste the official Clash copy link — no random URLs.";
    return "Looks solid. Ready to publish to the camp?";
  }, [step]);

  function toggleTag(tag: BaseTag) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : prev.length >= 8
          ? prev
          : [...prev, tag],
    );
  }

  async function uploadOne(kind: "full" | "thumbnail", blob: Blob, uploadId?: string) {
    const body = new FormData();
    body.set("kind", kind);
    if (uploadId) body.set("uploadId", uploadId);
    body.set("file", new File([blob], `${kind}.webp`, { type: "image/webp" }));

    const res = await fetch("/api/uploads/base-image", {
      method: "POST",
      body,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Upload failed");
    return json as { key: string; uploadId: string };
  }

  async function handleImageContinue() {
    if (!file) {
      setUploadError("Choose a screenshot first.");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const [fullBlob, thumbBlob] = await Promise.all([
        fileToWebpBlob(file, { maxWidth: 1600, quality: 0.82 }),
        fileToWebpBlob(file, { maxWidth: 480, quality: 0.75 }),
      ]);

      const full = await uploadOne("full", fullBlob);
      const thumb = await uploadOne("thumbnail", thumbBlob, full.uploadId);

      setFullImageKey(full.key);
      setThumbnailImageKey(thumb.key);
      setStep("details");
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Upload failed. Try again.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      <CampMascot character="builder" line={mascotLine} size="lg" />

      <GamePanel className="mt-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Publish base · {step}
        </p>

        {step === "image" ? (
          <div className="flex flex-col gap-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gold/40 bg-background/50 px-4 py-10 text-center transition hover:border-gold/70">
              <span className="text-sm font-semibold text-foreground">
                Tap to choose screenshot
              </span>
              <span className="mt-1 text-xs text-muted">
                JPEG / PNG / WebP · max ~10MB
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => {
                  const next = e.target.files?.[0] ?? null;
                  setFile(next);
                  setPreviewUrl(next ? URL.createObjectURL(next) : null);
                }}
              />
            </label>

            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Base preview"
                className="max-h-72 w-full rounded-xl border border-border object-contain"
              />
            ) : null}

            {uploadError ? <ErrorText text={uploadError} /> : null}

            <button
              type="button"
              disabled={uploading || !file}
              onClick={handleImageContinue}
              className="cta-ember rounded-xl bg-ember px-5 py-3 text-sm font-bold text-[#1a1208] disabled:opacity-60"
            >
              {uploading ? "Uploading…" : "Continue"}
            </button>
          </div>
        ) : null}

        {step === "details" ? (
          <div className="flex flex-col gap-4">
            <Field label="Title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                maxLength={80}
                placeholder="TH17 Anti 3-Star War Base"
              />
            </Field>

            <Field label="Village">
              <select
                value={layoutType}
                onChange={(e) =>
                  setLayoutType(e.target.value as "home_village" | "builder_base")
                }
                className={inputClass}
              >
                <option value="home_village">Home Village</option>
                <option value="builder_base">Builder Base</option>
              </select>
            </Field>

            {layoutType === "home_village" ? (
              <Field label="Town Hall (TH3–TH18)">
                <select
                  value={townHallLevel}
                  onChange={(e) => setTownHallLevel(e.target.value)}
                  className={inputClass}
                >
                  {Array.from({ length: 16 }, (_, i) => 18 - i).map((lvl) => (
                    <option key={lvl} value={lvl}>
                      TH{lvl}
                    </option>
                  ))}
                </select>
              </Field>
            ) : (
              <Field label="Builder Hall">
                <select
                  value={builderHallLevel}
                  onChange={(e) => setBuilderHallLevel(e.target.value)}
                  className={inputClass}
                >
                  {Array.from({ length: 10 }, (_, i) => 10 - i).map((lvl) => (
                    <option key={lvl} value={lvl}>
                      BH{lvl}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Field label="Base type">
              <select
                value={baseType}
                onChange={(e) => setBaseType(e.target.value as BaseType)}
                className={inputClass}
              >
                {baseTypes.map((t) => (
                  <option key={t} value={t}>
                    {baseTypeLabels[t]}
                  </option>
                ))}
              </select>
            </Field>

            <div>
              <p className="mb-2 text-sm text-muted">Tags (optional, max 8)</p>
              <div className="flex flex-wrap gap-2">
                {baseTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        active
                          ? "border-ember bg-ember text-[#1a1208]"
                          : "border-border bg-background text-muted hover:border-gold/50"
                      }`}
                    >
                      {baseTagLabels[tag]}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field label="Description (optional)">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={inputClass}
                rows={3}
                maxLength={2000}
              />
            </Field>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("image")}
                className="rounded-xl border border-border px-4 py-2.5 text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (title.trim().length < 3) return;
                  setStep("link");
                }}
                className="cta-ember rounded-xl bg-ember px-5 py-2.5 text-sm font-bold text-[#1a1208]"
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {step === "link" ? (
          <div className="flex flex-col gap-4">
            <Field label="Official Clash copy link">
              <input
                value={copyLink}
                onChange={(e) => setCopyLink(e.target.value)}
                className={inputClass}
                placeholder="https://link.clashofclans.com/..."
              />
            </Field>
            <p className="text-xs text-muted">
              In Clash: share layout → copy link. Must be link.clashofclans.com
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="rounded-xl border border-border px-4 py-2.5 text-sm"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!copyLink.trim()) return;
                  setStep("review");
                }}
                className="cta-ember rounded-xl bg-ember px-5 py-2.5 text-sm font-bold text-[#1a1208]"
              >
                Review
              </button>
            </div>
          </div>
        ) : null}

        {step === "review" ? (
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="description" value={description} />
            <input type="hidden" name="layoutType" value={layoutType} />
            <input type="hidden" name="townHallLevel" value={townHallLevel} />
            <input
              type="hidden"
              name="builderHallLevel"
              value={builderHallLevel}
            />
            <input type="hidden" name="baseType" value={baseType} />
            {selectedTags.map((tag) => (
              <input key={tag} type="hidden" name="tags" value={tag} />
            ))}
            <input type="hidden" name="copyLink" value={copyLink} />
            <input type="hidden" name="fullImageKey" value={fullImageKey} />
            <input
              type="hidden"
              name="thumbnailImageKey"
              value={thumbnailImageKey}
            />

            <div className="rounded-xl border border-border bg-background/40 p-4 text-sm">
              <p className="font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-muted">
                {layoutType === "home_village"
                  ? `TH${townHallLevel}`
                  : `BH${builderHallLevel}`}{" "}
                · {baseTypeLabels[baseType]}
              </p>
              {selectedTags.length ? (
                <p className="mt-2 text-xs text-gold">
                  {selectedTags.map((t) => baseTagLabels[t]).join(" · ")}
                </p>
              ) : null}
              <p className="mt-2 break-all text-xs text-muted">{copyLink}</p>
            </div>

            {state.error ? <ErrorText text={state.error} /> : null}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("link")}
                className="rounded-xl border border-border px-4 py-2.5 text-sm"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={pending || !fullImageKey}
                className="cta-ember rounded-xl bg-ember px-5 py-2.5 text-sm font-bold text-[#1a1208] disabled:opacity-60"
              >
                {pending ? "Publishing…" : "Publish base"}
              </button>
            </div>
          </form>
        ) : null}
      </GamePanel>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
      {text}
    </p>
  );
}
