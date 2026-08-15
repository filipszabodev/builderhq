"use client";

import { useActionState, useState } from "react";
import {
  completeOnboardingAction,
  type AuthActionState,
} from "@/actions/auth";
import { CampMascot } from "@/components/CampMascot";
import { GamePanel } from "@/components/GamePanel";

const initialState: AuthActionState = {};

type Step = "username" | "displayName" | "bio";

const steps: Step[] = ["username", "displayName", "bio"];

const prompts: Record<Step, string> = {
  username: "Hey Chief! What username should the camp call you?",
  displayName: "Nice. Got a display name too? Totally optional.",
  bio: "Last one — anything you want on your builder profile? (optional)",
};

export function OnboardingForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [state, formAction, pending] = useActionState(
    completeOnboardingAction,
    initialState,
  );

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  function nextStep() {
    if (step === "username") {
      if (username.trim().length < 3) return;
    }
    if (!isLast) setStepIndex((i) => i + 1);
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-12 sm:px-6 sm:py-16">
      <CampMascot character="barbarian" line={prompts[step]} size="lg" />

      <GamePanel className="mt-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Step {stepIndex + 1} of {steps.length}
        </p>

        {/* Hidden fields always submitted on final step */}
        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="username" value={username} />
          <input type="hidden" name="displayName" value={displayName} />
          <input type="hidden" name="bio" value={bio} />

          {step === "username" ? (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted">Username</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={30}
                pattern="[A-Za-z0-9_]+"
                placeholder="example_builder"
                className="rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2"
                autoFocus
              />
            </label>
          ) : null}

          {step === "displayName" ? (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted">Display name (optional)</span>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={50}
                placeholder="Chief Filip"
                className="rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2"
                autoFocus
              />
            </label>
          ) : null}

          {step === "bio" ? (
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="text-muted">Bio (optional)</span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                rows={3}
                placeholder="TH17 war base builder…"
                className="rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2"
                autoFocus
              />
            </label>
          ) : null}

          {state.error ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {state.error}
            </p>
          ) : null}

          <div className="flex flex-wrap gap-3">
            {stepIndex > 0 ? (
              <button
                type="button"
                onClick={() => setStepIndex((i) => i - 1)}
                className="rounded-xl border-2 border-border px-4 py-2.5 text-sm font-semibold text-muted transition hover:bg-surface-2"
              >
                Back
              </button>
            ) : null}

            {!isLast ? (
              <button
                type="button"
                onClick={nextStep}
                className="cta-ember rounded-xl bg-ember px-5 py-2.5 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={pending || username.trim().length < 3}
                className="cta-ember rounded-xl bg-ember px-5 py-2.5 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft disabled:opacity-60"
              >
                {pending ? "Entering the camp…" : "Enter BuilderHQ"}
              </button>
            )}

            {step !== "username" && !isLast ? (
              <button
                type="button"
                onClick={nextStep}
                className="text-sm text-muted underline-offset-2 hover:underline"
              >
                Skip
              </button>
            ) : null}
          </div>
        </form>
      </GamePanel>
    </div>
  );
}
