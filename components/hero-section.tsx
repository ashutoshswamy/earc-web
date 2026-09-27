"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-emerald-ink/10">
      <div className="ruled-paper-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl leading-[1.08] font-semibold text-emerald-deep sm:text-5xl lg:text-[2.6rem] xl:text-[3.4rem]">
            Jnana Prabodhini&rsquo;s Educational
            <br className="hidden sm:block" /> Activity Research Centre
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Man making for Nation Building - motivating and nurturing
            intelligence for social change, one classroom at a time.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/projects" />}
              className="h-11 gap-2 bg-emerald-ink px-5 text-parchment hover:bg-emerald-ink/90"
            >
              Explore Projects
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <Image
            src="/hero.png"
            alt="Illustrated study desk with a globe, open books, a magnifying glass, a model windmill, and a chalkboard of science and maths doodles, surrounded by leafy plants"
            width={1733}
            height={908}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
