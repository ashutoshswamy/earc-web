"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ponytail: seed roster — client to supply real Role / Centre / Project per
// member (first names are all that was provided). Add or edit rows here; the
// project dropdown is built from the distinct `project` values below.
type Member = {
  name: string;
  role: string;
  centre: string;
  project: string;
};

const members: Member[] = [
  { name: "Amar Paranjpe", role: "Projects Head", centre: "—", project: "All Projects" },
  { name: "Purva", role: "—", centre: "—", project: "Project 1 (rename)" },
  { name: "Shubhankar", role: "—", centre: "—", project: "Project 1 (rename)" },
  { name: "Swapnil", role: "—", centre: "—", project: "Project 1 (rename)" },
  { name: "Rutuja", role: "—", centre: "—", project: "Project 1 (rename)" },
  { name: "Omkar", role: "—", centre: "—", project: "Project 2 (rename)" },
  { name: "Prakash", role: "—", centre: "—", project: "Project 2 (rename)" },
  { name: "Surekha", role: "—", centre: "—", project: "Project 3 (rename)" },
  { name: "Sayali", role: "—", centre: "—", project: "Project 3 (rename)" },
  { name: "Anjali", role: "—", centre: "—", project: "Project 3 (rename)" },
];

const projects = ["all", ...Array.from(new Set(members.map((m) => m.project)))];

export function TeamGrid() {
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
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Centre</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m, i) => (
                <tr
                  key={m.name}
                  className="border-b border-emerald-ink/5 last:border-0"
                >
                  <td className="px-4 py-3 font-mono text-muted-foreground">
                    {i + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-emerald-deep">
                    {m.name}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{m.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.centre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
