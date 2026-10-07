"use client";

import { useMemo, useState } from "react";
import { CampMascot } from "@/components/CampMascot";
import { DemoNotice } from "@/components/DemoNotice";
import { GamePanel } from "@/components/GamePanel";
import {
  baseTagLabels,
  baseTags,
  baseTypeLabels,
  baseTypes,
  type BaseTag,
  type BaseType,
} from "@/lib/taxonomy";

type Step = "image" | "details" | "link" | "review";

export function UploadBaseForm() {
  const [step, setStep] = useState<Step>("image");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
  const [published, setPublished] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  function onPickFile(next: File | null) {
    setFile(next);
    setError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(next ? URL.createObjectURL(next) : null);
  }

  function goDetails() {
    if (!file) {
      setError("Choose a screenshot first.");
      return;
    }
    setStep("details");
  }

  function goLink() {
    if (title.trim().length < 3) {
      setError("Title needs at least 3 characters.");
      return;
    }
    setError(null);
    setStep("link");
  }

  function goReview() {
    if (!copyLink.trim()) {
      setError("Paste a Clash layout link.");
      return;
    }
    setError(null);
    setStep("review");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <CampMascot character="builder" line={mascotLine} />
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-gold">
        Upload a base
      </h1>

      <GamePanel className="mt-5 space-y-4">
        {published ? (
          <DemoNotice />
        ) : (
          <>
            {step === "image" ? (
              <div className="space-y-4">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/40 px-4 py-10 text-center transition hover:border-gold/50">
                  <span className="text-sm font-semibold text-foreground">
                    {file ? file.name : "Choose base screenshot"}
                  </span>
                  <span className="mt-1 text-xs text-muted">PNG or JPG</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                  />
                </label>
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 w-full rounded-xl object-contain bg-black/20"
                  />
                ) : null}
                <button
                  type="button"
                  onClick={goDetails}
                  className="cta-ember w-full rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208]"
                >
                  Continue
                </button>
              </div>
            ) : null}

            {step === "details" ? (
              <div className="space-y-4">
                <Field
                  label="Title"
                  value={title}
                  onChange={setTitle}
                  placeholder="Anti-3 Ring Fortress"
                />
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="text-muted">Description</span>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="text-muted">Layout</span>
                  <select
                    value={layoutType}
                    onChange={(e) =>
                      setLayoutType(
                        e.target.value as "home_village" | "builder_base",
                      )
                    }
                    className="rounded-xl border-2 border-border bg-background px-3 py-3"
                  >
                    <option value="home_village">Home Village</option>
                    <option value="builder_base">Builder Base</option>
                  </select>
                </label>
                {layoutType === "home_village" ? (
                  <Field
                    label="Town Hall"
                    value={townHallLevel}
                    onChange={setTownHallLevel}
                  />
                ) : (
                  <Field
                    label="Builder Hall"
                    value={builderHallLevel}
                    onChange={setBuilderHallLevel}
                  />
                )}
                <label className="flex flex-col gap-1.5 text-sm">
                  <span className="text-muted">Type</span>
                  <select
                    value={baseType}
                    onChange={(e) => setBaseType(e.target.value as BaseType)}
                    className="rounded-xl border-2 border-border bg-background px-3 py-3"
                  >
                    {baseTypes.map((t) => (
                      <option key={t} value={t}>
                        {baseTypeLabels[t]}
                      </option>
                    ))}
                  </select>
                </label>
                <div>
                  <p className="mb-2 text-sm text-muted">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {baseTags.map((tag) => {
                      const active = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            active
                              ? "border-ember bg-ember text-[#1a1208]"
                              : "border-border text-muted"
                          }`}
                        >
                          {baseTagLabels[tag]}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("image")}
                    className="rounded-xl border border-border px-4 py-3 text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goLink}
                    className="cta-ember flex-1 rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208]"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : null}

            {step === "link" ? (
              <div className="space-y-4">
                <Field
                  label="Clash copy link"
                  value={copyLink}
                  onChange={setCopyLink}
                  placeholder="https://link.clashofclans.com/..."
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="rounded-xl border border-border px-4 py-3 text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goReview}
                    className="cta-ember flex-1 rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208]"
                  >
                    Review
                  </button>
                </div>
              </div>
            ) : null}

            {step === "review" ? (
              <div className="space-y-4">
                <p className="text-sm text-muted">
                  <span className="font-semibold text-foreground">{title}</span>
                  {" · "}
                  {layoutType === "home_village"
                    ? `TH${townHallLevel}`
                    : `BH${builderHallLevel}`}
                  {" · "}
                  {baseTypeLabels[baseType]}
                </p>
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt=""
                    className="max-h-48 w-full rounded-xl object-contain bg-black/20"
                  />
                ) : null}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep("link")}
                    className="rounded-xl border border-border px-4 py-3 text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setPublished(true)}
                    className="cta-ember flex-1 rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208]"
                  >
                    Publish
                  </button>
                </div>
              </div>
            ) : null}

            {error ? (
              <p className="text-sm font-semibold text-ember">{error}</p>
            ) : null}
          </>
        )}
      </GamePanel>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2"
      />
    </label>
  );
}
