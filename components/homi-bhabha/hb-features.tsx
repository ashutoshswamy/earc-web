import { FlaskConical, ClipboardCheck, Microscope, BookOpen } from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    title: "Practical guidance",
    description:
      "Direct hands-on and virtual experiment guidance for Level 2 practicals.",
  },
  {
    icon: ClipboardCheck,
    title: "Mock test series",
    description:
      "Weekly and monthly tests with detailed answer keys and review sessions.",
  },
  {
    icon: Microscope,
    title: "Project guidance",
    description:
      "Mentorship for top performers who qualify for Level 3 projects.",
  },
  {
    icon: BookOpen,
    title: "Structured notes",
    description:
      "In-depth study material tailored to the exam's syllabus and pattern.",
  },
];

export function HbFeatures() {
  return (
    <section className="bg-mist/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-emerald-deep sm:text-3xl">
          What every batch includes
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
