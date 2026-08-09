"use client";

import * as React from "react";
import { toast } from "sonner";
import { FileText, Loader2, Trash2 } from "lucide-react";

import { deleteAnnualReport } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { AnnualReport } from "@/lib/supabase/types";

export function ReportList({ items }: { items: AnnualReport[] }) {
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  async function handleDelete(item: AnnualReport) {
    setPendingId(item.id);
    const result = await deleteAnnualReport(item.id, item.storage_path);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Report removed");
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No reports published yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-3 rounded-xl border border-emerald-ink/10 bg-mist p-3"
        >
          <FileText className="size-5 shrink-0 text-emerald-ink" strokeWidth={1.75} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-emerald-deep">
              {item.title}
            </p>
            <p className="text-xs text-muted-foreground">{item.year}</p>
          </div>
          <Button
            type="button"
            size="icon-sm"
            variant="destructive"
            disabled={pendingId === item.id}
            onClick={() => handleDelete(item)}
          >
            {pendingId === item.id ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
}
