function readEnv(name: string) {
  // Bracket access keeps Vercel "Sensitive" secrets available at runtime.
  // Dot access (process.env.FOO) can be inlined as empty at build time.
  return process.env[name];
}

export function getSupabaseUrl() {
  const url = readEnv("NEXT_PUBLIC_SUPABASE_URL");
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }
  return url;
}

/** Browser-safe key (publishable or legacy anon). */
export function getSupabasePublishableKey() {
  const key =
    readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ??
    readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

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
    readEnv("SUPABASE_SECRET_KEY") ?? readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!key) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)",
    );
  }

  return key;
}
