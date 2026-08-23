import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileStack } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContact } from "@/components/floating-contact";
import { Button } from "@/components/ui/button";

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
              Project-wise reports are published alongside EARC&rsquo;s
              annual reports.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-emerald-ink/10 bg-card p-10 text-center shadow-sm">
            <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-emerald-ink">
              <FileStack className="size-5.5" strokeWidth={1.75} />
            </span>
            <p className="max-w-md text-muted-foreground">
              Browse EARC&rsquo;s published, downloadable reports.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/annual-report" />}
              className="bg-emerald-ink text-parchment hover:bg-emerald-ink/90"
            >
              View annual reports
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
