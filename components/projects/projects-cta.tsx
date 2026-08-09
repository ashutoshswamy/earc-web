import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ProjectsCta() {
  return (
    <section className="bg-emerald-ink">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-heading text-3xl font-semibold text-parchment sm:text-4xl">
          Interested in bringing these projects to your school or community?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-parchment/70">
          Every initiative here started as a conversation with one school.
          Yours could be next.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/contact" />}
            className="h-11 gap-2 bg-amber-spark px-6 text-emerald-deep hover:bg-amber-spark/85"
          >
            Contact us
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/contact" />}
            className="h-11 gap-2 border-parchment/30 bg-transparent text-parchment hover:bg-parchment/10"
          >
            <Handshake className="size-4" />
            Partner with us
          </Button>
        </div>
      </div>
    </section>
  );
}
