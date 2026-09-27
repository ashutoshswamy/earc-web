import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The weekly practice sets made word problems click for my daughter - she went from dreading maths to asking for extra sheets.",
    name: "Parent, Std. 5th student",
  },
  {
    quote:
      "The reasoning sessions taught me shortcuts no school class ever covered. I finished the paper with fifteen minutes to spare.",
    name: "Std. 8th student, 2024 batch",
  },
  {
    quote:
      "What stood out was the feedback on mistakes, not just the right answer. That's what actually improved my son's speed.",
    name: "Parent, Std. 8th student",
  },
];

export function GpTestimonials() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => (
        <li
          key={t.name}
          className="ruled-margin rounded-xl border border-emerald-ink/10 bg-card p-5"
        >
          <Quote className="size-5 text-amber-spark" />
          <p className="mt-3 text-sm leading-relaxed text-emerald-deep">
            &ldquo;{t.quote}&rdquo;
          </p>
          <p className="mt-4 text-xs font-medium text-muted-foreground">
            {t.name}
          </p>
        </li>
      ))}
    </ul>
  );
}
