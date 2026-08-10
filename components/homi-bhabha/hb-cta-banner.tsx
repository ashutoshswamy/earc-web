import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HbCtaBanner() {
  return (
    <section className="bg-amber-spark">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left lg:px-8">
        <div>
          <p className="font-heading text-xl font-semibold text-emerald-deep">
            Limited seats available
          </p>
          <p className="mt-1 text-sm text-emerald-deep/75">
            Reserve your spot before Phase 1 begins.
          </p>
        </div>
        <Button nativeButton={false}
          render={<Link href="#courses" />}
          className="bg-emerald-deep text-parchment hover:bg-emerald-deep/85"
        >
          View batches
        </Button>
      </div>
    </section>
  );
}
