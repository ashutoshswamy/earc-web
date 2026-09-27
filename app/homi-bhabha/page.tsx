
import { SiteHeader } from "@/components/site-header";
import { HbHero } from "@/components/homi-bhabha/hb-hero";
import { HbCourses } from "@/components/homi-bhabha/hb-courses";
import { HbFeatures } from "@/components/homi-bhabha/hb-features";
import { HbFaq } from "@/components/homi-bhabha/hb-faq";
import { SiteFooter } from "@/components/site-footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/homi-bhabha",
  "Homi Bhabha Balvaidnyanik Spardha Guidance",
  "Level 1 & 2 guidance classes for the Dr. Homi Bhabha Balvaidnyanik Competition - Std. 6th & 9th, English and Marathi medium, online batches by Jnana Prabodhini's EARC.",
);

export default function HomiBhabhaPage() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <HbHero />
        <HbCourses />
        <HbFeatures />
        <HbFaq />
      </main>
      <SiteFooter />
    </div>
  );
}
