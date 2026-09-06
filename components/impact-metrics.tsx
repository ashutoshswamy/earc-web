"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { GraduationCap, MapPin, School, Users } from "lucide-react";

const metrics = [
  { icon: MapPin, value: 13, suffix: "+", label: "States reached" },
  { icon: School, value: 6400, suffix: "+", label: "Schools" },
  { icon: Users, value: 21000, suffix: "+", label: "Teachers" },
  { icon: GraduationCap, value: 211000, suffix: "+", label: "Students" },
];

// ponytail: Indian short form — "6.4K", "21K", "2.11L". Want words
// ("Lakh")? swap the "L"/"K" literals below.
function formatIndian(n: number) {
  if (n < 1000) return String(n);
  if (n < 100000) {
    const k = n / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)}K`;
  }
  const l = n / 100000;
  return `${Number.isInteger(l) ? l : l.toFixed(l < 10 ? 2 : 1)}L`;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  React.useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(formatIndian(Math.round(latest)));
    });
  }, [spring]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function ImpactMetrics() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Reach, measured
          </h2>
          <p className="mt-2 text-muted-foreground">
            Two decades of examinations, teacher training, and classroom
            research across the country.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl border border-emerald-ink/10 bg-card p-5 shadow-sm sm:p-6"
            >
              <metric.icon className="size-5 text-amber-spark" strokeWidth={1.75} />
              <dd className="mt-4 font-mono text-3xl font-semibold text-emerald-deep sm:text-4xl">
                <Counter value={metric.value} suffix={metric.suffix} />
              </dd>
              <dt className="mt-1 text-sm text-muted-foreground">
                {metric.label}
              </dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
