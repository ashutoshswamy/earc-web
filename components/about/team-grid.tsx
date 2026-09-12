import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/supabase/types";

import { TeamGridClient } from "@/components/about/team-grid-client";

export async function TeamGrid() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .order("project", { ascending: true })
    .order("name", { ascending: true });

  return <TeamGridClient members={(data as TeamMember[]) ?? []} />;
}
