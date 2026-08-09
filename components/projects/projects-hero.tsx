"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function ProjectsHero() {
  return (
    <section className="relative overflow-hidden border-b border-emerald-ink/10">
      <div className="ruled-paper-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-spark/30 bg-amber-spark/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-emerald-deep uppercase">
            <Sparkles className="size-3.5 text-amber-spark" />
            Man making Education
          </span>

          <h1 className="mt-6 font-heading text-4xl leading-[1.1] font-semibold text-emerald-deep sm:text-5xl">
            Our projects &amp; initiatives
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            EARC works as an educational extension of Jnana Prabodhini,
            documenting, enhancing, spreading, and advocating its
            educational philosophy across diverse domains. Each project
            below is an expression of &ldquo;man making&rdquo; education.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
