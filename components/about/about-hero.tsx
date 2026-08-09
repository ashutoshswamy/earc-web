"use client";

import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Sparkles, Users } from "lucide-react";

const domains = [
  {
    icon: Sparkles,
    title: "Nurturance of Intelligence",
    detail: "Grooming young talent and building competitive readiness through exams like Homi Bhabha and Ganit Prabhutwa.",
  },
  {
    icon: Users,
    title: "Teachers' Training",
    detail: "Pedagogical leadership and activity-based learning, taking educators from classroom practice to whole-school change.",
  },
  {
    icon: BookOpen,
    title: "Research & Resource Development",
    detail: "Curriculum design and educational tools grounded in Jnana Prabodhini's own classroom research.",
  },
];

export function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-emerald-ink/10">
      <div className="ruled-paper-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-spark/30 bg-amber-spark/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-deep uppercase">
            <GraduationCap className="size-3.5 text-amber-spark" />
            Established in 1993
          </span>

          <h1 className="mt-6 font-heading text-4xl leading-[1.1] font-semibold text-emerald-deep sm:text-5xl">
            Who we are
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Jnana Prabodhini has carried a 50-plus year legacy of &ldquo;man
            making&rdquo; education. In 1993, that legacy took a dedicated
            research arm — EARC was formed to study, refine, and spread this
            philosophy to schools and educators across the country.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {domains.map((domain, i) => (
            <motion.article
              key={domain.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-ink/10"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-emerald-ink">
                <domain.icon className="size-5.5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-emerald-deep">
                {domain.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {domain.detail}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
