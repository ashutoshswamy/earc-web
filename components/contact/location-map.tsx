import { Navigation } from "lucide-react";

const address = "510, Sadashiv Peth, Pune, Maharashtra 411030";
const mapQuery = encodeURIComponent(address);

export function LocationMap() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
              Find us
            </h2>
            <p className="mt-2 text-muted-foreground">{address}</p>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-spark px-4 py-2 text-sm font-semibold text-emerald-deep transition-colors hover:bg-amber-spark/85"
          >
            <Navigation className="size-3.5" />
            Get directions
          </a>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-ink/10 shadow-lg">
          <iframe
            title="EARC location map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-80 w-full sm:h-[26rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
