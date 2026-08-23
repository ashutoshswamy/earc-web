import { Brain, Users2, Calculator, Layers, Eye, Video, School } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Concept-based assessment",
    description: "Goes beyond rote learning to test real understanding.",
  },
  {
    icon: Users2,
    title: "Std. 5th & 8th",
    description: "Std. 7th students can also appear for the Std. 8th exam.",
  },
  {
    icon: Calculator,
    title: "Std. 5–8 syllabus",
    description: "Mathematics content spanning Std. 5th to 8th.",
  },
  {
    icon: Layers,
    title: "Two-level structure",
    description: "A graded examination structure across both standards.",
  },
  {
    icon: Eye,
    title: "Conceptual representation",
    description: "Focus on understanding and representing ideas correctly.",
  },
  {
    icon: Video,
    title: "Online tutoring",
    description: "Guided tutoring sessions for participating students.",
  },
  {
    icon: School,
    title: "100+ schools",
    description: "Participation from 100+ schools across Pune.",
  },
];

export function GpFeatures() {
  return (
    <section className="bg-mist/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-emerald-deep sm:text-3xl">
          Key features
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="ruled-margin">
              <feature.icon className="size-6 text-emerald-ink" />
              <h3 className="mt-3 font-heading text-base font-semibold text-emerald-deep">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
