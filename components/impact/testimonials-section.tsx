import { Quote } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/supabase/types";
import { TestimonialForm } from "@/components/impact/testimonial-form";

export async function TestimonialsSection() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  const testimonials = (data as Testimonial[]) ?? [];

  return (
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

        {testimonials.length > 0 && (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li
                key={t.id}
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
        )}

        <TestimonialForm />
      </div>
    </section>
  );
}
