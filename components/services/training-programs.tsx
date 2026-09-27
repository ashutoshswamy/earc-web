import Link from "next/link";
import { ArrowRight, BookOpenCheck, Compass, Lightbulb, Users } from "lucide-react";

const programs = [
  {
    icon: BookOpenCheck,
    title: "Content Enrichment",
    focus:
      "Introduction to new curricula across boards and state departments, paired with concept-formation teaching methodologies that go beyond rote coverage.",
    cta: "Inquire for training",
    href: "/services#contact",
  },
  {
    icon: Lightbulb,
    title: "Pedagogy & Skills",
    focus:
      "Activity-based, project-based, and experiential learning. Soft-skill modules for teachers - planning, communication, guidance - and student skill enrichment in self-study, reading, and creative thinking.",
    cta: "View modules",
    href: "/services#workshops",
  },
  {
    icon: Compass,
    title: "Pedagogical Leadership",
    focus:
      "Designing enrichment programmes around Jnana Prabodhini's innovative practices, and training teacher leaders to carry pedagogical leadership back into their schools.",
    cta: "Learn more",
    href: "/about",
  },
  {
    icon: Users,
    title: "Trainers' Training for Non-Formal Education",
    focus:
      "Building the field facilitators - Shikshandoots, Vidnyan Doots and Kendra Samanvayaks - who run EARC's non-formal programmes: content, activity-based pedagogy, session planning, mentoring and community engagement.",
    cta: "Inquire for training",
    href: "/contact",
  },
];

export function TrainingPrograms() {
  return (
    <section id="trainers-training" className="scroll-mt-20 bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Teachers&rsquo; &amp; trainers&rsquo; training programmes
          </h2>
          <p className="mt-2 text-muted-foreground">
            Tracks that take an educator from curriculum to classroom to
            school-wide leadership - plus training for non-formal education
            facilitators.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <article
              key={program.title}
              className="flex flex-col rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-ink/10 sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-emerald-ink">
                <program.icon className="size-5.5" strokeWidth={1.75} />
              </span>

              <h3 className="mt-5 font-heading text-xl font-semibold text-emerald-deep">
                {program.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {program.focus}
              </p>

              <Link
                href={program.href}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-ink"
              >
                {program.cta}
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
