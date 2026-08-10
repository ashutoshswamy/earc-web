import Link from "next/link";
import { Button } from "@/components/ui/button";

export function GpCtaBanner() {
  return (
    <section className="bg-emerald-deep">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <div>
          <p className="font-heading text-xl font-semibold text-parchment">
            Preparing for Ganit Prabhutwa Pariksha?
          </p>
          <p className="mt-1 text-sm text-parchment/70">
            Join our online guidance sessions and practice with the right
            material.
          </p>
        </div>
        <Button nativeButton={false}
          render={<Link href="?tab=guidance#resource-hub" />}
          className="bg-amber-spark text-emerald-deep hover:bg-amber-spark/85"
        >
          View guidance sessions
        </Button>
      </div>
    </section>
  );
}
