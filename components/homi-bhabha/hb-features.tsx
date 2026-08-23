import {
  Video,
  Languages,
  FlaskConical,
  Microscope,
  ClipboardCheck,
  UserCheck,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Online conceptual guidance",
    description: "Live sessions led by subject experts.",
  },
  {
    icon: Languages,
    title: "English & Marathi mediums",
    description: "Guidance available in both mediums of instruction.",
  },
  {
    icon: FlaskConical,
    title: "Hands-on practical sessions",
    description: "Direct practical guidance for Level 2 experiments.",
  },
  {
    icon: Microscope,
    title: "Practical kits",
    description: "Science experiments and take-home practical kits.",
  },
  {
    icon: ClipboardCheck,
    title: "Test series",
    description: "Monthly tests and mock papers to track readiness.",
  },
  {
    icon: UserCheck,
    title: "Personalised mentoring",
    description: "One-on-one guidance through the preparation journey.",
  },
  {
    icon: Target,
    title: "Exam-oriented preparation",
    description: "Practice and pacing built around the exam pattern.",
  },
];

export function HbFeatures() {
  return (
    <section className="bg-mist/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-emerald-deep sm:text-3xl">
          What every batch includes
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
