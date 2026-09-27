import { Suspense } from "react";

import { SiteHeader } from "@/components/site-header";
import { GpHero } from "@/components/ganit-prabhutwa/gp-hero";
import { GpFeatures } from "@/components/ganit-prabhutwa/gp-features";
import { GpTabs } from "@/components/ganit-prabhutwa/gp-tabs";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/lib/supabase/server";
import type { GpPaper } from "@/lib/supabase/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/ganit-prabhutwa-pariksha",
  "Ganit Prabhutwa Pariksha",
  "Exam information, old question papers, model answer sheets, reference books, and testimonials for the Ganit Prabhutwa Pariksha - Std. 5th & 8th, by Jnana Prabodhini's EARC.",
);

export default async function GanitPrabhutwaPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gp_papers")
    .select("*")
    .order("year", { ascending: false });
  const papers = (data as GpPaper[]) ?? [];

  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <GpHero />
        <GpFeatures />
        <section id="resource-hub" className="bg-parchment scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <Suspense>
              <GpTabs papers={papers} />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
