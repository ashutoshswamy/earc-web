import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ImpactMetrics } from "@/components/impact-metrics";
import { TestimonialsSection } from "@/components/impact/testimonials-section";
import { SuccessStoriesSection } from "@/components/impact/success-stories-section";

export const metadata: Metadata = {
  title: "Impact - EARC",
  description: "EARC's reach, outcomes, testimonials, and success stories.",
};

export default function ImpactPage() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-emerald-ink/10">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
            <h1 className="font-heading text-4xl leading-[1.1] font-semibold text-emerald-deep sm:text-5xl">
              Impact
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              What two decades of EARC&rsquo;s work adds up to.
            </p>
          </div>
        </section>

        <div id="dashboard" className="scroll-mt-24">
          <ImpactMetrics />
        </div>

        <TestimonialsSection />
        <SuccessStoriesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
