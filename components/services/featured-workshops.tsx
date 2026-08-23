import {
  BarChart3,
  BookMarked,
  Brain,
  CheckCircle2,
  ClipboardList,
  ListChecks,
  School,
  Smartphone,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const studySkillsFeatures = [
  "6-day structured workshop",
  "Self-awareness & goal setting",
  "Study planning and time management",
  "Reading speed & comprehension",
  "Note-making, summarisation & concept mapping",
  "Information processing techniques",
  "Memory enhancement strategies",
  "Revision & examination techniques",
  "Career awareness and guidance",
];

const studySkillsStats = [
  { label: "Target group", value: "Std. 10 students" },
  { label: "Geographical spread", value: "Pune & Raigad" },
  { label: "Expected reach", value: "1,000+ students" },
];

const cpwFeatures = [
  { icon: ListChecks, label: "Chapterwise tests" },
  { icon: ClipboardList, label: "Mock tests" },
  { icon: CheckCircle2, label: "Answer hints" },
  { icon: BarChart3, label: "Automated performance analysis" },
];

export function FeaturedWorkshops() {
  return (
    <section id="workshops" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Featured workshops
          </h2>
          <p className="mt-2 text-muted-foreground">
            Two flagship programmes, built for how students actually study
            and compete.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {/* Self-Study Skill Workshop */}
          <article className="rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-emerald-ink">
                <Brain className="size-5.5" strokeWidth={1.75} />
              </span>
              <Badge className="bg-amber-spark/15 text-emerald-deep">
                Offline & Online Blended
              </Badge>
            </div>

            <h3 className="mt-5 font-heading text-xl font-semibold text-emerald-deep">
              Study Skills — Self-Study Skills Development
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A structured workshop-based programme for Std. 10 students,
              developing effective and independent learning habits — study
              planning, reading and comprehension, information processing,
              memory, revision and exam preparation — combining
              activity-based learning, practice and reflection so students
              can apply these strategies in their regular academic routine.
            </p>

            <ul className="mt-6 space-y-2">
              {studySkillsFeatures.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-spark" />
                  {item}
                </li>
              ))}
            </ul>

            <dl className="mt-6 grid grid-cols-1 gap-2.5 border-t border-emerald-ink/10 pt-4 sm:grid-cols-3">
              {studySkillsStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                    {stat.label}
                  </dt>
                  <dd className="text-sm font-semibold text-emerald-deep">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          {/* Compete Prabodhini Way */}
          <article className="rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-mist text-emerald-ink">
                <Target className="size-5.5" strokeWidth={1.75} />
              </span>
              <Badge className="gap-1 bg-amber-spark/15 text-emerald-deep">
                <Smartphone className="size-3" />
                Mobile & Web App Integrated
              </Badge>
            </div>

            <h3 className="mt-5 font-heading text-xl font-semibold text-emerald-deep">
              Compete Prabodhini Way
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Blended guidance for competitive exams — Homi Bhabha, NMMS,
              Primary and Pre-Secondary Scholarships, and NTSE — through an
              app-integrated practice cycle.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {cpwFeatures.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2.5 rounded-xl bg-mist p-3.5"
                >
                  <f.icon className="size-4.5 shrink-0 text-emerald-ink" strokeWidth={1.75} />
                  <span className="text-sm font-medium text-emerald-deep">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* School Enrichment Program — full-width banner */}
        <div className="mt-5 flex flex-col items-start gap-5 rounded-2xl bg-emerald-ink p-8 text-parchment sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-parchment/10">
              <School className="size-5.5" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="font-heading text-xl font-semibold">
                School Enrichment Programme
              </h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-parchment/75">
                Improving teaching-learning efficiency school-wide, by
                adopting Jnana Prabodhini&rsquo;s innovative practices across
                the whole institution — not just individual classrooms.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-amber-spark px-5 py-2.5 text-sm font-semibold text-emerald-deep transition-colors hover:bg-amber-spark/85"
          >
            <BookMarked className="size-4" />
            Bring it to your school
          </a>
        </div>
      </div>
    </section>
  );
}
