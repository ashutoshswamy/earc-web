import { Compass, Target } from "lucide-react";

export function MissionVision() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-emerald-ink/10 bg-emerald-ink p-8 text-parchment sm:p-10">
            <Target className="size-7 text-amber-spark" strokeWidth={1.5} />
            <h3 className="ruled-margin mt-6 font-heading text-2xl font-semibold">
              Mission
            </h3>
            <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-parchment/85">
              Man making for Nation Building — shaping capable, grounded
              individuals whose growth strengthens the communities and the
              country around them.
            </p>
          </article>

          <article className="rounded-2xl border border-emerald-ink/10 bg-card p-8 sm:p-10">
            <Compass className="size-7 text-amber-spark" strokeWidth={1.5} />
            <h3 className="ruled-margin mt-6 font-heading text-2xl font-semibold text-emerald-deep">
              Vision
            </h3>
            <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-muted-foreground">
              Motivating and nurturing intelligence for social change —
              turning every classroom into a starting point for wider
              impact.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
