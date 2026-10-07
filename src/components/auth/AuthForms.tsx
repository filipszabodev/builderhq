"use client";

import { useState } from "react";
import Link from "next/link";
import { CampMascot } from "@/components/CampMascot";
import { DemoNotice } from "@/components/DemoNotice";
import { GamePanel } from "@/components/GamePanel";

export function SignInForm() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <AuthShell
      mascotLine="Back again, Chief? Log in and get to the bases."
      title="Log in"
      footer={
        <>
          No account?{" "}
          <Link href="/register" className="font-semibold text-ember hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setNotice("Portfolio demo — auth is UI-only.");
        }}
      >
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        {notice ? <DemoNotice /> : null}
        <button
          type="submit"
          className="cta-ember rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft"
        >
          Enter the camp
        </button>
      </form>
    </AuthShell>
  );
}

export function SignUpForm() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <AuthShell
      character="archer"
      mascotLine="New recruit? Create an account and pitch your tent in BuilderHQ."
      title="Join the camp"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-ember hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setNotice("Portfolio demo — auth is UI-only.");
        }}
      >
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        {notice ? <DemoNotice /> : null}
        <button
          type="submit"
          className="cta-ember rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft"
        >
          Create account
        </button>
      </form>
    </AuthShell>
  );
}

function AuthShell({
  title,
  footer,
  children,
  mascotLine,
  character = "barbarian",
}: {
  title: string;
  footer: React.ReactNode;
  children: React.ReactNode;
  mascotLine: string;
  character?: "barbarian" | "builder" | "archer" | "goblin";
}) {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-12 sm:px-6 sm:py-16">
      <CampMascot character={character} line={mascotLine} />
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-gold">
        {title}
      </h1>
      <GamePanel className="mt-5">{children}</GamePanel>
      <p className="mt-4 text-sm text-muted">{footer}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="rounded-xl border-2 border-border bg-background px-3 py-3 text-foreground outline-none ring-ember focus:ring-2"
      />
    </label>
  );
}
