import { ArrowDown } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { Leader } from "@/lib/supabase/types";

// Role + project, skipping whichever is empty ("Project Head - Gyan Setu", "HOD", or nothing).
function subtitle(role: string, project: string) {
  return [role, project].filter(Boolean).join(" - ");
}

// Shown until the `leaders` table exists (scripts/supabase-schema.sql); after that admin manages them.
const defaultLeaders: Pick<Leader, "id" | "name" | "role" | "project">[] = [
  ["Purva Dixit-Dhokte", "Project Head", "Chhote Scientists"],
  ["Swapnil Indapurkar", "Project Head", "Gyan Setu"],
  ["Shubhankar Kelkar", "", ""],
  ["Rutuja Deshmukh", "", ""],
  ["Omkar Banait", "", ""],
  ["Prakash Rananware", "", ""],
].map(([name, role, project]) => ({ id: name, name, role, project }));

function Connector() {
  return (
    <ArrowDown
      aria-hidden
      className="mx-auto my-3 size-5 text-emerald-ink/40"
      strokeWidth={1.75}
    />
  );
}

export async function LeadershipTributes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leaders")
    .select("*")
    .order("created_at", { ascending: true });
  const leaders = error ? defaultLeaders : ((data as Leader[]) ?? []);

  return (
    <section id="leadership" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Leadership
          </h2>
          <p className="mt-2 text-muted-foreground">
            The people carrying EARC&rsquo;s work forward, and the one who
            shaped it.
          </p>
        </div>

        {/* ponytail: fixed top two live here, not in the DB, so admin can't delete them */}
        <article className="mx-auto mt-10 max-w-xl rounded-2xl border-2 border-amber-spark/40 bg-card p-8 text-center shadow-sm">
          <div>
            <p className="text-xs font-semibold tracking-wide text-amber-spark uppercase">
              In memoriam
            </p>
            <h3 className="mt-1 font-heading text-xl font-semibold text-emerald-deep">
              Late Shri. Vivek Ponkshe
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Former Head of EARC &amp; Principal of JP School
            </p>
          </div>
        </article>

        <Connector />

        <article className="mx-auto max-w-sm rounded-2xl border border-emerald-ink/10 bg-card p-6 text-center shadow-sm">
          <div>
            <h3 className="font-heading text-base font-semibold text-emerald-deep">
              Amar Paranjpe
            </h3>
            <p className="text-sm text-muted-foreground">HOD</p>
          </div>
        </article>

        {leaders.length > 0 && (
          <>
            <Connector />
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {leaders.map((leader) => {
                const sub = subtitle(leader.role, leader.project);
                return (
                  <li
                    key={leader.id}
                    className="rounded-2xl border border-emerald-ink/10 bg-card p-5 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    <div>
                      <h3 className="font-heading text-base font-semibold text-emerald-deep">
                        {leader.name}
                      </h3>
                      {sub && (
                        <p className="text-sm text-muted-foreground">{sub}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
