import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ImpactMetrics } from "@/components/impact-metrics";
import { FeaturedInitiatives } from "@/components/featured-initiatives";
import { MissionVision } from "@/components/mission-vision";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ImpactMetrics />
        <FeaturedInitiatives />
        <MissionVision />
      </main>
      <SiteFooter />
    </div>
  );
}
