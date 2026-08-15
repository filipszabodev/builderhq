"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  signInAction,
  signUpAction,
  type AuthActionState,
} from "@/actions/auth";
import { CampMascot } from "@/components/CampMascot";
import { GamePanel } from "@/components/GamePanel";

const initialState: AuthActionState = {};

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

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
      <form action={formAction} className="flex flex-col gap-4">
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        {state.error ? <ErrorText text={state.error} /> : null}
        <SubmitButton pending={pending} label="Enter the camp" />
      </form>
    </AuthShell>
  );
}

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState);

  return (
    <AuthShell
      character="builder"
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
      <form action={formAction} className="flex flex-col gap-4">
        <Field label="Email" name="email" type="email" autoComplete="email" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        {state.error ? <ErrorText text={state.error} /> : null}
        {state.success ? (
          <p className="rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-muted">
            {state.success}
          </p>
        ) : null}
        <SubmitButton pending={pending} label="Create account" />
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
  character?: "barbarian" | "builder";
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

function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="cta-ember rounded-xl bg-ember px-4 py-3 text-sm font-bold text-[#1a1208] transition hover:bg-ember-soft disabled:opacity-60"
    >
      {pending ? "Please wait…" : label}
    </button>
  );
}

function ErrorText({ text }: { text: string }) {
  return (
    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
      {text}
    </p>
  );
}
