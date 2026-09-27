import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AboutCta() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
          Want to collaborate or learn more about our projects?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Whether you&rsquo;re a school, a teacher, or a well-wisher - there&rsquo;s
          a way to work with EARC.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/projects" />}
            className="h-11 gap-2 bg-emerald-ink px-6 text-parchment hover:bg-emerald-ink/90"
          >
            View projects
            <ArrowRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/contact" />}
            className="h-11 gap-2 border-emerald-ink/25 px-6 text-emerald-deep hover:bg-mist"
          >
            <MessageSquare className="size-4" />
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  );
}
