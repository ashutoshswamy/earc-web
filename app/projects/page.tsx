import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { ProjectsHero } from "@/components/projects/projects-hero";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsCta } from "@/components/projects/projects-cta";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Projects - EARC",
  description:
    "EARC's educational initiatives - Anubhav Shala, Chhote Scientists, Gyan Setu, Pradnya Vikas, Vikas Mitra, Vivek Inspire, and Teachers' Training.",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <ProjectsHero />
        <section className="bg-parchment">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <ProjectsGrid />
          </div>
        </section>
        <ProjectsCta />
      </main>
      <SiteFooter />
    </div>
  );
}
