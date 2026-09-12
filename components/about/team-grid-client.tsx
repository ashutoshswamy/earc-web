"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TeamMember } from "@/lib/supabase/types";

export function TeamGridClient({ members }: { members: TeamMember[] }) {
  const projects = React.useMemo(
    () => ["all", ...Array.from(new Set(members.map((m) => m.project)))],
    [members],
  );
  const [project, setProject] = React.useState("all");

  const rows =
    project === "all" ? members : members.filter((m) => m.project === project);

  return (
    <section id="team" className="scroll-mt-24 bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Team
          </h2>
          <p className="mt-2 text-muted-foreground">
            The coordinators and facilitators running EARC&rsquo;s projects on
            the ground.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Select value={project} onValueChange={(v) => setProject(v ?? "all")}>
            <SelectTrigger aria-label="Filter team by project" className="w-64">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p} value={p}>
                  {p === "all" ? "All projects" : p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-emerald-ink/10 bg-card shadow-sm">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-emerald-ink/10 text-xs tracking-wide text-muted-foreground uppercase">
                <th className="px-4 py-3 font-semibold">Sr. No.</th>
                <th className="px-4 py-3 font-semibold">Project</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Centre</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-muted-foreground"
                  >
                    No team members for this project yet.
                  </td>
                </tr>
              ) : (
                rows.map((m, i) => (
                  <tr
                    key={m.id}
                    className="border-b border-emerald-ink/5 last:border-0"
                  >
                    <td className="px-4 py-3 font-mono text-muted-foreground">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {m.project}
                    </td>
                    <td className="px-4 py-3 font-medium text-emerald-deep">
                      {m.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {m.centre}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
