import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteHeader } from "@/components/site-header";
import { GpHero } from "@/components/ganit-prabhutwa/gp-hero";
import { GpFeatures } from "@/components/ganit-prabhutwa/gp-features";
import { GpTabs } from "@/components/ganit-prabhutwa/gp-tabs";
import { GpCtaBanner } from "@/components/ganit-prabhutwa/gp-cta-banner";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContact } from "@/components/floating-contact";

export const metadata: Metadata = {
  title: "Ganit Prabhutwa Pariksha — EARC",
  description:
    "Exam information, old question papers, model answer sheets, online guidance sessions, reference books, and testimonials for the Ganit Prabhutwa Pariksha — Std. 5th & 8th, by Jnana Prabodhini's EARC.",
};

export default function GanitPrabhutwaPage() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <GpHero />
        <GpFeatures />
        <section id="resource-hub" className="bg-parchment scroll-mt-16">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <Suspense>
              <GpTabs />
            </Suspense>
          </div>
        </section>
        <GpCtaBanner />
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
