"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { categories, projects, type ProjectCategory } from "@/lib/projects-data";
import { Badge } from "@/components/ui/badge";
import { ProjectsFilter } from "@/components/projects/projects-filter";

function categoryLabel(id: ProjectCategory) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function ProjectsGrid() {
  const [active, setActive] = React.useState<ProjectCategory | "all">("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <ProjectsFilter active={active} onChange={setActive} />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              id={project.id}
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="scroll-mt-24"
            >
              <Link
                href={`/projects/${project.id}`}
                className="group flex h-full w-full flex-col rounded-2xl border border-emerald-ink/10 bg-card p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-ink/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-mist text-emerald-ink transition-colors duration-300 group-hover:bg-amber-spark/15">
                    {project.logo ? (
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        width={44}
                        height={44}
                        className="size-full object-contain p-1.5"
                      />
                    ) : (
                      <project.icon className="size-5.5" strokeWidth={1.75} />
                    )}
                  </span>
                  <Badge variant="secondary" className="bg-mist text-emerald-deep">
                    {categoryLabel(project.category)}
                  </Badge>
                </div>

                <h3 className="mt-5 font-heading text-lg font-semibold text-emerald-deep">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-ink">
                  Know more
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
