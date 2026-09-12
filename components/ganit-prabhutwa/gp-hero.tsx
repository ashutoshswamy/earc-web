"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sigma, CalendarDays, Download, BookOpen } from "lucide-react";

const quickActions = [
  { label: "Exam schedule", href: "?tab=exam-info#resource-hub", icon: CalendarDays },
  { label: "Download sample papers", href: "?tab=papers#resource-hub", icon: Download },
  { label: "Reference books", href: "?tab=books#resource-hub", icon: BookOpen },
];

export function GpHero() {
  return (
    <section className="relative overflow-hidden border-b border-emerald-ink/10 bg-parchment">
      <div className="grid-paper-bg pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-ink/20 bg-emerald-ink/5 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-ink uppercase">
            <Sigma className="size-3.5" />
            Std. 5th &amp; 8th
          </span>

          <h1 className="mt-6 font-heading text-4xl leading-[1.1] font-semibold text-emerald-deep sm:text-5xl">
            Ganit Prabhutwa Pariksha
            <span className="mt-1.5 block text-2xl font-normal text-emerald-ink/70 sm:text-3xl">
              गणित प्रभुत्व परीक्षा
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            JPEARC, in collaboration with the Pune Jilha Ganit Adhyapak
            Mandal, conducts Ganit Prabhutwa — a mathematics proficiency
            examination assessing conceptual understanding, mathematical
            thinking and the ability to represent mathematical ideas beyond
            rote learning. It encourages students to approach mathematics
            through inquisitiveness, experimentation and practical
            application, with a focus on depth of understanding rather than
            speed and memorisation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="mt-9 flex flex-wrap items-center justify-center gap-2.5"
        >
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-ink/15 bg-card px-4 py-2 text-sm font-medium text-emerald-deep shadow-sm transition-colors hover:border-amber-spark/40 hover:bg-amber-spark/10"
            >
              <action.icon className="size-4 text-amber-spark" />
              {action.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
