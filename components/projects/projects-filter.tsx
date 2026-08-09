"use client";

import { motion } from "framer-motion";

import { categories, type ProjectCategory } from "@/lib/projects-data";
import { cn } from "@/lib/utils";

export function ProjectsFilter({
  active,
  onChange,
}: {
  active: ProjectCategory | "all";
  onChange: (category: ProjectCategory | "all") => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap justify-center gap-2"
    >
      {categories.map((category) => {
        const isActive = active === category.id;
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category.id)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-ink",
              isActive
                ? "text-parchment"
                : "text-emerald-deep hover:bg-mist"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="active-category-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 rounded-full bg-emerald-ink"
              />
            )}
            <span className="relative">{category.label}</span>
          </button>
        );
      })}
    </div>
  );
}
