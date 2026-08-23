import { Compass, Target, Lightbulb } from "lucide-react";

const focusAreas = [
  "Talent Development & Nurturance of Intelligence",
  "Teacher Development & Training",
  "Research & Educational Resource Development",
];

export function EarcAbout() {
  return (
    <section id="earc" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Educational Activity Research Centre (EARC)
          </h2>
        </div>

        <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted-foreground">
          <p>
            Educational Activity Research Centre (EARC) is the educational
            extension of Jnana Prabodhini. Established in 1993, EARC was
            created to take JP&rsquo;s philosophy and practices of
            man-making education to a wider section of society.
          </p>
          <p>
            EARC develops, implements and researches experiential,
            activity-based and learner-centred educational programmes for
            students, teachers and schools across diverse communities. Its
            work focuses on three broad areas:
          </p>
        </div>

        <ul className="mt-6 space-y-2.5">
          {focusAreas.map((area) => (
            <li
              key={area}
              className="flex items-start gap-2.5 text-[1.05rem] font-medium text-emerald-deep"
            >
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber-spark" />
              {area}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[1.05rem] leading-relaxed text-muted-foreground">
          Through its programmes, EARC works to make meaningful learning
          opportunities accessible to students and educators across urban,
          rural and underserved communities.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <article className="rounded-2xl border border-emerald-ink/10 bg-emerald-ink p-6 text-parchment">
            <Target className="size-6 text-amber-spark" strokeWidth={1.5} />
            <h3 className="mt-4 font-heading text-lg font-semibold">
              Our Vision
            </h3>
            <p className="mt-1.5 text-sm font-semibold text-parchment/90">
              Motivating and Nurturing Intelligence for Social Change
            </p>
            <p className="mt-2 text-sm leading-relaxed text-parchment/75">
              We envision individuals who recognise their potential, develop
              their capabilities and use their knowledge and abilities to
              contribute meaningfully to society.
            </p>
          </article>

          <article className="rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm">
            <Compass className="size-6 text-amber-spark" strokeWidth={1.5} />
            <h3 className="mt-4 font-heading text-lg font-semibold text-emerald-deep">
              Our Mission
            </h3>
            <p className="mt-1.5 text-sm font-semibold text-emerald-deep">
              Man Making for Nation Building
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We strive to create educational experiences that develop the
              intellectual, emotional, social, physical and creative
              potential of individuals and nurture capable, confident and
              socially responsible citizens who contribute to nation
              building.
            </p>
          </article>

          <article className="rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm">
            <Lightbulb className="size-6 text-amber-spark" strokeWidth={1.5} />
            <h3 className="mt-4 font-heading text-lg font-semibold text-emerald-deep">
              Our Approach
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Education should go beyond the transmission of information.
              Our programmes provide opportunities to experience, explore,
              question, think, create, collaborate and apply learning.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
