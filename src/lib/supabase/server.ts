import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

function readPublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return { url, key };
}

export function hasSupabasePublicEnv() {
  const { url, key } = readPublicEnv();
  return Boolean(url && key);
}

export async function createClient() {
  // Touch cookies first so Next marks the route dynamic even if env is missing.
  // Otherwise `next build` tries to prerender and crashes before cookies() runs.
  const cookieStore = await cookies();

  const { url, key } = readPublicEnv();
  if (!url || !key) {
    throw new Error(
      "Missing Supabase public env vars on server (URL + publishable/anon key).",
    );
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component — middleware will refresh sessions.
        }
      },
    },
  });
}
