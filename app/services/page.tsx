import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { ServicesHero } from "@/components/services/services-hero";
import { TrainingPrograms } from "@/components/services/training-programs";
import { FeaturedWorkshops } from "@/components/services/featured-workshops";
import { ServicesCta } from "@/components/services/services-cta";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Services - EARC",
  description:
    "EARC's teacher training programmes, workshops, and school enrichment offerings.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <ServicesHero />
        <TrainingPrograms />
        <FeaturedWorkshops />
        <ServicesCta />
      </main>
      <SiteFooter />
    </div>
  );
}
