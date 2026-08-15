function runtimeEnv(name: string): string | undefined {
  // Avoid static Next inlining so Vercel Sensitive secrets work at runtime.
  const key = name as keyof NodeJS.ProcessEnv;
  return process.env[key] ?? undefined;
}

export function getSupabaseUrl() {
  const url = runtimeEnv("NEXT_PUBLIC_SUPABASE_URL");
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  return url;
}

/** Browser-safe key (publishable or legacy anon). */
export function getSupabasePublishableKey() {
  const key =
    runtimeEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ??
    runtimeEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)",
    );
  }

  return key;
}

/** Server-only key (secret or legacy service_role). Never expose to the browser. */
export function getSupabaseSecretKey() {
  const key =
    runtimeEnv("SUPABASE_SECRET_KEY") ??
    runtimeEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!key) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)",
    );
  }

  return key;
}
