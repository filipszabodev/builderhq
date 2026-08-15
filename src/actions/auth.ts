"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  onboardingSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/validation/auth";

export type AuthActionState = {
  error?: string;
  success?: string;
};

export async function signUpAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/onboarding`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is disabled, session exists → go onboard.
  if (data.session) {
    redirect("/onboarding");
  }

  return {
    success: "Check your email to confirm your account, then log in.",
  };
}

export async function signInAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Could not load user after login." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  redirect(profile?.username ? "/" : "/onboarding");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function completeOnboardingAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = onboardingSchema.safeParse({
    username: formData.get("username"),
    displayName: formData.get("displayName"),
    bio: formData.get("bio"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  const displayName = parsed.data.displayName || null;

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    username: parsed.data.username,
    display_name: displayName,
    bio: parsed.data.bio || null,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "This username is already taken." };
    }
    return { error: error.message };
  }

  // Optional: also store in Auth metadata so Supabase Auth → Users can show it.
  await supabase.auth.updateUser({
    data: {
      display_name: displayName,
      username: parsed.data.username,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath(`/builder/${parsed.data.username}`);
  redirect(`/builder/${parsed.data.username}`);
}
