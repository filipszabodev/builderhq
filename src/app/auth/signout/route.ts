import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error("signOut error", error);
  }

  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
