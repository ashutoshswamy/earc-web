import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ServicesCta() {
  return (
    <section id="contact" className="bg-parchment">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
          Ready to transform your educational institution?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Tell us about your school or teacher group, and we&rsquo;ll help
          you find the right programme to start with.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/contact" />}
          className="mt-7 h-11 gap-2 bg-emerald-ink px-6 text-parchment hover:bg-emerald-ink/90"
        >
          Get in touch
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
