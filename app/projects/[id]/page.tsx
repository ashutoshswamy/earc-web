import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";

import { categories, projects, type ProjectCategory } from "@/lib/projects-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function categoryLabel(id: ProjectCategory) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — EARC`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-emerald-ink/10">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-ink hover:underline"
            >
              <ArrowLeft className="size-4" />
              Back to projects
            </Link>

            <div className="mt-6 flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-mist text-emerald-ink">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={56}
                    height={56}
                    className="size-full object-contain p-2"
                  />
                ) : (
                  <project.icon className="size-7" strokeWidth={1.75} />
                )}
              </span>
              <div>
                <Badge variant="secondary" className="bg-mist text-emerald-deep">
                  {categoryLabel(project.category)}
                </Badge>
                <h1 className="mt-1.5 font-heading text-3xl leading-tight font-semibold text-emerald-deep sm:text-4xl">
                  {project.title}
                </h1>
              </div>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-10">
            <div>
              <h2 className="font-heading text-xl font-semibold text-emerald-deep">
                Objectives
              </h2>
              <ul className="mt-3 space-y-2">
                {project.objectives.map((obj) => (
                  <li key={obj} className="flex gap-2.5 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-spark" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {project.structure && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-emerald-deep">
                  Project Structure
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {project.structure}
                </p>
              </div>
            )}

            {project.methodology && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-emerald-deep">
                  Methodology
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {project.methodology}
                </p>
              </div>
            )}

            {project.keyActivities && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-emerald-deep">
                  Key Activities
                </h2>
                <ul className="mt-3 space-y-2">
                  {project.keyActivities.map((activity) => (
                    <li key={activity} className="flex gap-2.5 text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-spark" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.implementationAreas && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-emerald-deep">
                  Implementation Areas
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {project.implementationAreas}
                </p>
              </div>
            )}

            {project.enrichmentOpportunities && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-emerald-deep">
                  Enrichment Opportunities
                </h2>
                {project.enrichmentIntro && (
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {project.enrichmentIntro}
                  </p>
                )}
                <ul className="mt-3 space-y-2">
                  {project.enrichmentOpportunities.map((item) => (
                    <li key={item} className="flex gap-2.5 text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-spark" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.opportunities && (
              <div>
                <h2 className="font-heading text-xl font-semibold text-emerald-deep">
                  Opportunities
                </h2>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {project.opportunities.map((o) => (
                    <div
                      key={o.audience}
                      className="rounded-xl border border-emerald-ink/10 bg-card p-4 shadow-sm"
                    >
                      <p className="font-heading text-sm font-semibold text-emerald-deep">
                        {o.audience}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {o.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-start gap-2.5 rounded-xl bg-mist p-4 text-sm text-emerald-deep">
              <MapPin className="mt-0.5 size-4 shrink-0 text-emerald-ink" />
              {project.reach}
            </div>

            <Button
              nativeButton={false}
              render={<Link href="/contact" />}
              className="w-full gap-2 bg-emerald-ink text-parchment hover:bg-emerald-ink/90 sm:w-auto"
            >
              Get involved / inquire
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
