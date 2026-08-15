import { redirect } from "next/navigation";
import { UploadBaseForm } from "@/components/bases/UploadBaseForm";
import { createClient, hasSupabasePublicEnv } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Upload base",
};

export default async function UploadPage() {
  if (!hasSupabasePublicEnv()) {
    redirect("/");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.username) {
    redirect("/onboarding");
  }

  return <UploadBaseForm />;
}
