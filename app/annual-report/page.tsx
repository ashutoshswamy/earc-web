import { Download, FileText, FileX2 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/lib/supabase/server";
import type { AnnualReport } from "@/lib/supabase/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/annual-report",
  "Annual Report",
  "EARC's published annual reports.",
);

export default async function AnnualReportPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("annual_reports")
    .select("*")
    .order("year", { ascending: false });

  const reports = (data as AnnualReport[]) ?? [];

  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-emerald-ink/10">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
            <h1 className="font-heading text-4xl leading-[1.1] font-semibold text-emerald-deep sm:text-5xl">
              Annual reports
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A year-by-year record of EARC&rsquo;s reach and activity.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          {reports.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-ink/20 py-20 text-center">
              <FileX2 className="size-8 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-muted-foreground">
                No reports published yet - check back soon.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {reports.map((report) => (
                <li key={report.id}>
                  <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-emerald-ink/10 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-ink/10"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mist text-emerald-ink">
                      <FileText className="size-5.5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-base font-semibold text-emerald-deep">
                        {report.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {report.year}
                      </p>
                    </div>
                    <Download className="size-4.5 shrink-0 text-muted-foreground transition-colors group-hover:text-amber-spark" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
