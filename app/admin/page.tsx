import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { GalleryUploadForm } from "@/components/admin/gallery-upload-form";
import { GalleryList } from "@/components/admin/gallery-list";
import { ReportUploadForm } from "@/components/admin/report-upload-form";
import { ReportList } from "@/components/admin/report-list";
import type { AnnualReport, GalleryItem } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Admin — EARC",
};

export default async function AdminPage() {
  const supabase = await createClient();

  const [{ data: galleryItems }, { data: reports }] = await Promise.all([
    supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("annual_reports")
      .select("*")
      .order("year", { ascending: false }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-heading text-2xl font-semibold text-emerald-deep">
        Admin dashboard
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload photos and videos to the gallery, and publish annual reports.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-heading text-lg font-semibold text-emerald-deep">
            Gallery
          </h2>
          <div className="mt-4 rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm">
            <GalleryUploadForm />
          </div>
          <div className="mt-5">
            <GalleryList items={(galleryItems as GalleryItem[]) ?? []} />
          </div>
        </section>

        <section>
          <h2 className="font-heading text-lg font-semibold text-emerald-deep">
            Annual reports
          </h2>
          <div className="mt-4 rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm">
            <ReportUploadForm />
          </div>
          <div className="mt-5">
            <ReportList items={(reports as AnnualReport[]) ?? []} />
          </div>
        </section>
      </div>
    </div>
  );
}
