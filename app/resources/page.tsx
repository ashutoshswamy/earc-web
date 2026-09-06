import type { Metadata } from "next";
import { BookOpen, FileStack } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContact } from "@/components/floating-contact";

export const metadata: Metadata = {
  title: "Resources — EARC",
  description: "Learning resources and project-wise reports from EARC.",
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-emerald-ink/10">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
            <h1 className="font-heading text-4xl leading-[1.1] font-semibold text-emerald-deep sm:text-5xl">
              Resources
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Learning materials and reports from across EARC&rsquo;s
              programmes.
            </p>
          </div>
        </section>

        <section
          id="learning-resources"
          className="scroll-mt-24 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="ruled-margin max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
              Learning resources
            </h2>
            <p className="mt-2 text-muted-foreground">
              Curated study material from EARC&rsquo;s programmes.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-ink/20 py-20 text-center">
            <BookOpen className="size-8 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-muted-foreground">
              Resource index is being assembled — check back soon.
            </p>
          </div>
        </section>

        <section
          id="reports"
          className="scroll-mt-24 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="ruled-margin max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
              Reports
            </h2>
            <p className="mt-2 text-muted-foreground">
              Project-wise reports from across EARC&rsquo;s programmes.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-ink/20 py-20 text-center">
            <FileStack className="size-8 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-muted-foreground">Coming soon.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
