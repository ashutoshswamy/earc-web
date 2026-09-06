import type { Metadata } from "next";
import { MessageSquareQuote, Quote, TrendingUp } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingContact } from "@/components/floating-contact";
import { ImpactMetrics } from "@/components/impact-metrics";

export const metadata: Metadata = {
  title: "Impact — EARC",
  description: "EARC's reach, outcomes, testimonials, and success stories.",
};

// ponytail: swap in real testimonials — client to supply quote + attribution.
const testimonials = [
  {
    quote:
      "You would agree that education can change the course of one's life and is the only thing that can change the world. Chhote Scientists is a step in that direction.",
    name: "Dr. Raghunath Mashelkar",
    detail: "Padma Vibhushan",
  },
  {
    quote:
      "The activity-based sessions changed how our teachers plan a class — students now ask questions instead of copying notes.",
    name: "Headmaster",
    detail: "Partner school, Raigad",
  },
  {
    quote:
      "My daughter went from dreading maths to asking for extra practice sheets after joining the guidance sessions.",
    name: "Parent",
    detail: "Ganit Prabhutwa Pariksha, Std. 5th",
  },
];

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

        <section id="reach-outcomes" className="scroll-mt-24 bg-parchment">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="ruled-margin max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
                Reach &amp; outcomes
              </h2>
              <p className="mt-2 text-muted-foreground">
                Where EARC&rsquo;s programmes run and what they change for
                students and teachers.
              </p>
            </div>
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-emerald-ink/10 bg-card p-8 shadow-sm">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mist text-emerald-ink">
                <TrendingUp className="size-5.5" strokeWidth={1.75} />
              </span>
              <p className="text-muted-foreground">
                Detailed outcome breakdowns by programme are being compiled —
                check back soon.
              </p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="scroll-mt-24 bg-parchment">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="ruled-margin max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
                Testimonials
              </h2>
              <p className="mt-2 text-muted-foreground">
                In the words of the students, parents, teachers, and schools
                EARC works with.
              </p>
            </div>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li
                  key={t.name + t.detail}
                  className="ruled-margin flex flex-col rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm"
                >
                  <Quote className="size-6 text-amber-spark" strokeWidth={1.5} />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-emerald-deep">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4">
                    <p className="font-heading text-sm font-semibold text-emerald-deep">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="stories" className="scroll-mt-24 bg-mist">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
            <div className="ruled-margin max-w-2xl">
              <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
                Success stories
              </h2>
              <p className="mt-2 text-muted-foreground">
                Case studies from students, teachers, and schools EARC has
                worked with.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-ink/20 bg-card py-20 text-center">
              <MessageSquareQuote className="size-8 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-muted-foreground">
                Stories are being collected — check back soon.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
