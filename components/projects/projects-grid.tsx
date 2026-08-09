"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

import { categories, projects, type ProjectCategory } from "@/lib/projects-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
              key={project.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <Dialog>
                <DialogTrigger
                  render={
                    <button
                      type="button"
                      className="group flex h-full w-full flex-col rounded-2xl border border-emerald-ink/10 bg-card p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-ink/10"
                    />
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-emerald-ink transition-colors duration-300 group-hover:bg-amber-spark/15">
                      <project.icon className="size-5.5" strokeWidth={1.75} />
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
                    Learn more
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-emerald-ink">
                      <project.icon className="size-5.5" strokeWidth={1.75} />
                    </span>
                    <DialogTitle className="mt-2 text-emerald-deep">
                      {project.title}
                    </DialogTitle>
                    <Badge variant="secondary" className="w-fit bg-mist text-emerald-deep">
                      {categoryLabel(project.category)}
                    </Badge>
                  </DialogHeader>

                  <DialogDescription className="text-foreground">
                    {project.summary}
                  </DialogDescription>

                  <div>
                    <p className="text-xs font-semibold tracking-wide text-amber-spark uppercase">
                      Objectives
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {project.objectives.map((obj) => (
                        <li
                          key={obj}
                          className="flex gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 size-1 shrink-0 rounded-full bg-amber-spark" />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-start gap-2 rounded-xl bg-mist p-3 text-sm text-emerald-deep">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-ink" />
                    {project.reach}
                  </div>

                  <Button
                    nativeButton={false}
                    render={<Link href="/contact" />}
                    className="mt-1 w-full gap-2 bg-emerald-ink text-parchment hover:bg-emerald-ink/90"
                  >
                    Get involved / inquire
                  </Button>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
