import { Quote } from "lucide-react";

export function Testimonial() {
  return (
    <section className="bg-emerald-ink">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <Quote className="mx-auto size-9 text-amber-spark" strokeWidth={1.5} />
        <blockquote className="mt-6 text-center font-heading text-2xl leading-snug font-medium text-parchment sm:text-3xl">
          &ldquo;You would agree that education can change the course of
          one&rsquo;s life and is the only thing that can change the
          world! Chhote Scientists is a step in that direction.&rdquo;
        </blockquote>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="text-center">
            <p className="font-heading text-sm font-semibold text-parchment">
              Raghunath Mashelkar
            </p>
            <p className="text-xs text-parchment/60">Padma Vibhushan</p>
          </div>
        </div>
      </div>
    </section>
  );
}
