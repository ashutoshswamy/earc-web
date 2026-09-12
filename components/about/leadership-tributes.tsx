import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

const leaders = [
  { name: "Prashant Divekar", role: "Head of EARC" },
  { name: "Amar Paranjpe", role: "Deputy Head of EARC" },
];

export function LeadershipTributes() {
  return (
    <section id="leadership" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Leadership
          </h2>
          <p className="mt-2 text-muted-foreground">
            The people carrying EARC&rsquo;s work forward, and the one who
            shaped it.
          </p>
        </div>

        {/* Memorial tribute */}
        <article className="mt-10 flex flex-col items-center gap-5 rounded-2xl border-2 border-amber-spark/40 bg-card p-8 text-center shadow-sm sm:flex-row sm:text-left">
          <Avatar size="lg" className="size-20 shrink-0 ring-2 ring-amber-spark/50 ring-offset-2 ring-offset-card">
            <AvatarFallback className="bg-emerald-ink font-heading text-xl text-parchment">
              VP
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs font-semibold tracking-wide text-amber-spark uppercase">
              In memoriam
            </p>
            <h3 className="mt-1 font-heading text-xl font-semibold text-emerald-deep">
              Late Shri. Vivek Ponkshe
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Former Head of EARC &amp; Principal of JP School
            </p>
          </div>
        </article>

        {/* Current leadership */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="flex items-center gap-4 rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm"
            >
              <Avatar size="lg">
                <AvatarFallback className="bg-mist font-heading font-semibold text-emerald-ink">
                  {initials(leader.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-heading text-base font-semibold text-emerald-deep">
                  {leader.name}
                </h3>
                <p className="text-sm text-muted-foreground">{leader.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
