import Image from "next/image";

import { createClient } from "@/lib/supabase/server";
import type { Partner } from "@/lib/supabase/types";

export async function Partners() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("partners")
    .select("*")
    .order("created_at", { ascending: false });
  const partners = (data as Partner[]) ?? [];

  return (
    <section id="partners" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Our Partners
          </h2>
          <p className="mt-2 text-muted-foreground">
            CSR and institutional collaborations behind EARC&rsquo;s projects.
          </p>
        </div>

        {partners.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            Partner details are being compiled - check back soon.
          </p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center rounded-2xl border border-emerald-ink/10 bg-card p-8 text-center shadow-sm"
              >
                <div className="relative h-20 w-full">
                  <Image
                    src={partner.url}
                    alt={partner.csr_partner}
                    fill
                    sizes="320px"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-emerald-deep">
                  {partner.csr_partner}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {partner.project}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
