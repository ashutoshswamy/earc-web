"use client";

import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";

const stats = [
  { label: "Levels", value: "1 & 2" },
  { label: "Standards", value: "6th · 9th" },
  { label: "Medium", value: "Eng · Mar" },
  { label: "Mode", value: "Online" },
];

export function HbHero() {
  return (
    <section className="relative overflow-hidden border-b border-emerald-ink/10 bg-emerald-deep">
      <div className="ruled-paper-bg pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-spark/30 bg-amber-spark/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-amber-spark uppercase">
            <FlaskConical className="size-3.5" />
            Balvaidnyanik Spardha Guidance
          </span>

          <h1 className="mt-6 font-heading text-4xl leading-[1.1] font-semibold text-parchment sm:text-5xl">
            Dr. Homi Bhabha Balvaidnyanik Competition
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-parchment/70">
            JPEARC provides structured online and practical guidance for the
            Dr. Homi Bhabha Balvaidnyanik Spardha, helping students build
            strong conceptual understanding, intensive practice and
            confidence for the competition. The programme combines theory,
            problem-solving and hands-on practical learning, covering
            concepts from the SSC, CBSE and ICSE syllabi — with practical
            kits, guided experiments, test-series practice recordings,
            notes and personalised mentoring for every level of the exam.
          </p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl bg-parchment/10 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-emerald-deep px-3 py-4">
              <dd className="font-mono text-lg font-semibold text-amber-spark">
                {stat.value}
              </dd>
              <dt className="mt-0.5 text-[0.7rem] tracking-wide text-parchment/55 uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
