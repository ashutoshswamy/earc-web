import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
import { LocationMap } from "@/components/contact/location-map";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContact } from "@/components/floating-contact";

export const metadata: Metadata = {
  title: "Contact Us — EARC",
  description:
    "Reach EARC for questions about programmes, teacher training, or initiatives.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <ContactHero />

        <section className="bg-parchment">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:px-8">
            <ContactInfo />
            <ContactForm />
          </div>
        </section>

        <LocationMap />
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
