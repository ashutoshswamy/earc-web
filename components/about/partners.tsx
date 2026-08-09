const partners = [
  {
    name: "Jnana Prabodhini",
    detail: "Parent institution",
  },
  {
    name: "Gyan-Setu",
    detail: "Digital learning wing",
  },
  {
    name: "Chatra Prabodhan",
    detail: "Student outreach wing",
  },
];

export function Partners() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Part of the Jnana Prabodhini family
          </h2>
          <p className="mt-2 text-muted-foreground">
            EARC works alongside these affiliated wings.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center rounded-2xl border border-emerald-ink/10 bg-card p-8 text-center shadow-sm"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-ink font-heading text-base font-semibold text-parchment">
                {partner.name
                  .split(/[\s-]/)
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <h3 className="mt-4 font-heading text-base font-semibold text-emerald-deep">
                {partner.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {partner.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
