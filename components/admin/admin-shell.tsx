"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type AdminSection = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  badge?: number;
  content: React.ReactNode;
};

export function AdminShell({ sections }: { sections: AdminSection[] }) {
  const [activeId, setActiveId] = React.useState(sections[0]?.id);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-start lg:gap-8 lg:px-8">
      {/* Mobile: horizontal scrollable tab strip */}
      <nav className="-mx-4 flex gap-1.5 overflow-x-auto border-b border-emerald-ink/10 px-4 pb-3 lg:hidden">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveId(s.id)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
              s.id === active?.id
                ? "border-emerald-ink bg-emerald-ink text-parchment"
                : "border-emerald-ink/15 bg-card text-muted-foreground hover:bg-mist",
            )}
          >
            {s.icon}
            {s.label}
            {!!s.badge && (
              <Badge
                variant={s.id === active?.id ? "secondary" : "default"}
                className={s.id === active?.id ? "bg-parchment/20 text-parchment" : "bg-amber-spark text-emerald-deep"}
              >
                {s.badge}
              </Badge>
            )}
          </button>
        ))}
      </nav>

      {/* Desktop: sidebar */}
      <nav className="hidden shrink-0 lg:sticky lg:top-20 lg:block lg:w-64">
        <ul className="flex flex-col gap-0.5">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActiveId(s.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                  s.id === active?.id
                    ? "bg-emerald-ink text-parchment"
                    : "text-emerald-deep hover:bg-mist",
                )}
              >
                {s.icon}
                <span className="flex-1 truncate">{s.label}</span>
                {!!s.badge && (
                  <Badge
                    className={
                      s.id === active?.id
                        ? "bg-parchment/20 text-parchment"
                        : "bg-amber-spark text-emerald-deep"
                    }
                  >
                    {s.badge}
                  </Badge>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {active && (
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="font-heading text-xl font-semibold text-emerald-deep">
                {active.label}
              </h2>
              {!!active.badge && (
                <Badge className="bg-amber-spark text-emerald-deep">
                  {active.badge}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {active.description}
            </p>
            <div className="mt-6">{active.content}</div>
          </div>
        )}
      </div>
    </div>
  );
}
