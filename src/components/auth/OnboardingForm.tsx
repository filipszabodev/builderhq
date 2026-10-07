"use client";

import { useState } from "react";
import { CampMascot } from "@/components/CampMascot";
import { DemoNotice } from "@/components/DemoNotice";
import { GamePanel } from "@/components/GamePanel";

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
  const [done, setDone] = useState(false);

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  function nextStep() {
    if (step === "username" && username.trim().length < 3) return;
    if (!isLast) {
      setStepIndex((i) => i + 1);
      return;
    }
    setDone(true);
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-12 sm:px-6 sm:py-16">
      <CampMascot character="barbarian" line={prompts[step]} size="lg" />

      <GamePanel className="mt-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">
          Step {stepIndex + 1} of {steps.length}
        </p>

        {done ? (
          <DemoNotice />
        ) : (
          <div className="flex flex-col gap-4">
            {step === "username" ? (
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted">Username</span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2"
                  placeholder="WallBreaker"
                />
              </label>
            ) : null}

            {step === "displayName" ? (
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted">Display name</span>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2"
                  placeholder="Wall Breaker"
                />
              </label>
            ) : null}

            {step === "bio" ? (
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted">Bio</span>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="rounded-xl border-2 border-border bg-background px-3 py-3 outline-none ring-ember focus:ring-2"
                  placeholder="War bases & CWL specialist"
                />
              </label>
            ) : null}

            <button
              type="button"
              onClick={nextStep}
              className="cta-ember rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208]"
            >
              {isLast ? "Finish setup" : "Continue"}
            </button>
          </div>
        )}
      </GamePanel>
    </div>
  );
}
