import { env } from "node:process";
import { NextResponse } from "next/server";

function hasEnv(name: keyof typeof env) {
  return Boolean(env[name]);
}

/** Safe env presence check — never returns secret values. */
export async function GET() {
  const flags = {
    NEXT_PUBLIC_SUPABASE_URL: hasEnv("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: hasEnv(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    ),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: hasEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_SECRET_KEY: hasEnv("SUPABASE_SECRET_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: hasEnv("SUPABASE_SERVICE_ROLE_KEY"),
    NEXT_PUBLIC_SITE_URL: hasEnv("NEXT_PUBLIC_SITE_URL"),
    hasPublicKey:
      hasEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ||
      hasEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    hasSecretKey:
      hasEnv("SUPABASE_SECRET_KEY") || hasEnv("SUPABASE_SERVICE_ROLE_KEY"),
  };

  return NextResponse.json({
    ok: flags.NEXT_PUBLIC_SUPABASE_URL && flags.hasPublicKey,
    flags,
    siteUrl: env.NEXT_PUBLIC_SITE_URL ?? null,
  });
}
