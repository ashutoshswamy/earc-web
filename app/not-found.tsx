import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20">
        <div className="ruled-paper-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-lg text-center">
          <span className="ruled-margin inline-flex items-center gap-1.5 font-mono text-sm font-semibold tracking-wide text-amber-spark">
            <Compass className="size-4" />
            404
          </span>

          <h1 className="mt-5 font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            This page hasn&rsquo;t been written yet
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page you&rsquo;re looking for doesn&rsquo;t exist, or has
            moved. Let&rsquo;s get you back to something real.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/" />}
              className="h-11 gap-2 bg-emerald-ink px-6 text-parchment hover:bg-emerald-ink/90"
            >
              Back to home
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/contact" />}
              className="h-11 gap-2 border-emerald-ink/25 px-6 text-emerald-deep hover:bg-mist"
            >
              Contact us
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
