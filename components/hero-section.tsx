"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const heroPhotos = [
  { src: "/hero1.png", alt: "A student and teacher looking at a tablet together during a Gyan Setu session" },
  { src: "/hero2.png", alt: "Students trying a hands-on Chhote Scientists experiment" },
  { src: "/hero3.png", alt: "Students holding up their own drawings during an activity workshop" },
  { src: "/hero4.png", alt: "A Gyan Setu school visit group photo, connecting through knowledge exchange" },
  { src: "/hero5.png", alt: "Students presenting handmade model houses from a classroom activity" },
];

export function HeroSection() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % heroPhotos.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-emerald-ink/10">
      <div className="ruled-paper-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl leading-[1.08] font-semibold text-emerald-deep sm:text-5xl lg:text-[3.4rem]">
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
          <div className="relative rounded-2xl border border-emerald-ink/10 bg-card p-2 shadow-xl shadow-emerald-ink/10">
            <div className="ruled-margin relative h-64 overflow-hidden rounded-xl bg-mist sm:h-80 lg:h-96">
              <AnimatePresence initial={false}>
                <motion.div
                  key={heroPhotos[active].src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroPhotos[active].src}
                    alt={heroPhotos[active].alt}
                    fill
                    priority={active === 0}
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1.5">
              {heroPhotos.map((photo, i) => (
                <button
                  key={photo.src}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-5 bg-amber-spark" : "w-1.5 bg-emerald-ink/15"
                  }`}
                />
              ))}
            </div>
            <div className="absolute -bottom-4 left-2 flex items-center gap-2.5 rounded-xl border border-emerald-ink/10 bg-card px-3 py-2.5 shadow-lg sm:-bottom-5 sm:-left-5 sm:gap-3 sm:px-4 sm:py-3">
              <span className="font-mono text-xl font-semibold text-amber-spark sm:text-2xl">
                211K+
              </span>
              <span className="text-[0.7rem] leading-tight text-muted-foreground sm:text-xs">
                students reached
                <br />
                across India
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
