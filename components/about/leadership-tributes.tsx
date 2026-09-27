import * as React from "react";
import { ArrowDown } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { Leader } from "@/lib/supabase/types";

// Role + project, skipping whichever is empty ("Project Head - Gyan Setu", "HOD", or nothing).
function subtitle(role: string, project: string) {
  return [role, project].filter(Boolean).join(" - ");
}

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
  const leaders = error ? [] : ((data as Leader[]) ?? []);
  if (leaders.length === 0) return null;

  const memoriam = leaders.filter((l) => l.tier === "memoriam");
  const heads = leaders.filter((l) => l.tier === "head");
  const team = leaders.filter((l) => l.tier === "team");
  // Only draw a connector between tiers that actually have people.
  const tiers = [memoriam, heads, team].filter((t) => t.length > 0);

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

        {tiers.map((tier, i) => (
          <React.Fragment key={tier[0].tier}>
            {i > 0 ? <Connector /> : <div className="mt-10" />}
            {tier[0].tier === "memoriam" &&
              tier.map((leader) => (
                <article
                  key={leader.id}
                  className="mx-auto max-w-xl rounded-2xl border-2 border-amber-spark/40 bg-card p-8 text-center shadow-sm [&+&]:mt-5"
                >
                  <p className="text-xs font-semibold tracking-wide text-amber-spark uppercase">
                    In memoriam
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-semibold text-emerald-deep">
                    {leader.name}
                  </h3>
                  {subtitle(leader.role, leader.project) && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {subtitle(leader.role, leader.project)}
                    </p>
                  )}
                </article>
              ))}
            {tier[0].tier === "head" &&
              tier.map((leader) => (
                <article
                  key={leader.id}
                  className="mx-auto max-w-sm rounded-2xl border border-emerald-ink/10 bg-card p-6 text-center shadow-sm [&+&]:mt-5"
                >
                  <h3 className="font-heading text-base font-semibold text-emerald-deep">
                    {leader.name}
                  </h3>
                  {subtitle(leader.role, leader.project) && (
                    <p className="text-sm text-muted-foreground">
                      {subtitle(leader.role, leader.project)}
                    </p>
                  )}
                </article>
              ))}
            {tier[0].tier === "team" && (
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tier.map((leader) => {
                  const sub = subtitle(leader.role, leader.project);
                  return (
                    <li
                      key={leader.id}
                      className="rounded-2xl border border-emerald-ink/10 bg-card p-5 text-center shadow-sm transition-shadow duration-300 hover:shadow-md"
                    >
                      <h3 className="font-heading text-base font-semibold text-emerald-deep">
                        {leader.name}
                      </h3>
                      {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
                    </li>
                  );
                })}
              </ul>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
