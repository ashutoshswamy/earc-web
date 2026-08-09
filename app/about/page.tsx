import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { AboutHero } from "@/components/about/about-hero";
import { LeadershipTributes } from "@/components/about/leadership-tributes";
import { TeamGrid } from "@/components/about/team-grid";
import { Testimonial } from "@/components/about/testimonial";
import { Partners } from "@/components/about/partners";
import { AboutCta } from "@/components/about/about-cta";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContact } from "@/components/floating-contact";

export const metadata: Metadata = {
  title: "About Us — EARC",
  description:
    "Jnana Prabodhini's Educational Activity Research Centre — our story, leadership, team, and partners.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <AboutHero />
        <LeadershipTributes />
        <TeamGrid />
        <Testimonial />
        <Partners />
        <AboutCta />
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
