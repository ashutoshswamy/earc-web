import Link from "next/link";
import { ArrowUpRight, Atom, Calculator, FlaskConical } from "lucide-react";

const initiatives = [
  {
    icon: Atom,
    title: "Homi Bhabha",
    subtitle: "Balvaidnyanik Spardha",
    description:
      "One of India's longest-running science talent searches, identifying and nurturing scientific aptitude in students.",
    href: "/homi-bhabha",
  },
  {
    icon: Calculator,
    title: "Ganit Prabhutwa Pariksha",
    subtitle: "Mathematics aptitude exam",
    description:
      "A rigorous test of mathematical reasoning that builds problem-solving confidence from the middle-school years.",
    href: "/ganit-prabhutwa-pariksha",
  },
  {
    icon: FlaskConical,
    title: "Chhote Scientists",
    subtitle: "Little scientists programme",
    description:
      "Hands-on inquiry and experimentation for young learners, turning curiosity into the habit of scientific thinking.",
    href: "/projects",
  },
];

export function FeaturedInitiatives() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Featured initiatives
          </h2>
          <p className="mt-2 text-muted-foreground">
            The examinations and programmes at the centre of EARC&rsquo;s
            work with schools.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative flex flex-col rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-spark/40 hover:shadow-lg hover:shadow-emerald-ink/10"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-emerald-ink transition-colors duration-300 group-hover:bg-amber-spark/15">
                  <item.icon className="size-5.5" strokeWidth={1.75} />
                </span>
                <ArrowUpRight className="size-4.5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-spark" />
              </div>

              <h3 className="mt-5 font-heading text-xl font-semibold text-emerald-deep">
                {item.title}
              </h3>
              <p className="text-xs font-medium tracking-wide text-amber-spark uppercase">
                {item.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
