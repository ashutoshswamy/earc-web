import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role, created_at")
    .eq("id", user.id)
    .single();

  return profile as Profile | null;
}

export async function requireAdmin(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== "admin") {
    throw new Error("Not authorized");
  }
  return profile;
}
