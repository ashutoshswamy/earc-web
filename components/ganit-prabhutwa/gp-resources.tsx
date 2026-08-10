"use client";

import * as React from "react";
import Link from "next/link";
import { Download, Eye, FileX2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Resource = {
  year: string;
  std: "5th" | "8th";
  title: string;
  href?: string;
};

const years = ["all", "2025", "2024", "2023", "2022", "2021", "2020"] as const;
const stdOptions = ["all", "5th", "8th"] as const;

export function GpResources({ resources }: { resources: Resource[] }) {
  const [year, setYear] = React.useState<(typeof years)[number]>("all");
  const [std, setStd] = React.useState<(typeof stdOptions)[number]>("all");
  const [preview, setPreview] = React.useState<Resource | null>(null);

  const filtered = resources.filter(
    (r) => (year === "all" || r.year === year) && (std === "all" || r.std === std)
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Select value={year} onValueChange={(v) => setYear(v as typeof year)}>
          <SelectTrigger aria-label="Filter by year">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y === "all" ? "All years" : y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={std} onValueChange={(v) => setStd(v as typeof std)}>
          <SelectTrigger aria-label="Filter by standard">
            <SelectValue placeholder="Standard" />
          </SelectTrigger>
          <SelectContent>
            {stdOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s === "all" ? "All standards" : `Std. ${s}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-xl border border-dashed border-emerald-ink/20 py-12 text-center">
          <FileX2 className="size-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No papers match these filters yet. Try a different year or
            standard.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <li
              key={r.title}
              className="flex flex-col gap-3 rounded-xl border border-emerald-ink/10 bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-heading text-sm font-semibold text-emerald-deep">
                  {r.title}
                </p>
                <Badge variant="outline" className="shrink-0 border-emerald-ink/20 font-mono">
                  {r.year}
                </Badge>
              </div>
              <span className="text-xs text-muted-foreground">Std. {r.std}</span>

              <div className="mt-auto flex gap-2">
                {r.href ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPreview(r)}
                      aria-label={`Preview ${r.title}`}
                    >
                      <Eye className="size-3.5" />
                      Preview
                    </Button>
                    <Button
                      size="sm" nativeButton={false}
                      render={<a href={r.href} download />}
                      aria-label={`Download ${r.title}`}
                      className="bg-emerald-ink text-parchment hover:bg-emerald-ink/85"
                    >
                      <Download className="size-3.5" />
                      Download
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline" nativeButton={false}
                    render={<Link href="/contact" />}
                    className="w-full justify-center"
                  >
                    Request a copy
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={!!preview} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{preview?.title}</DialogTitle>
          </DialogHeader>
          {preview?.href && (
            <iframe
              src={preview.href}
              title={preview.title}
              className="h-[70vh] w-full rounded-lg border border-emerald-ink/10"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
