"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, FileText, Loader2, Pencil, Trash2, X } from "lucide-react";

import { deleteGpPaper, updateGpPaper } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GpPaper } from "@/lib/supabase/types";

const kindLabel: Record<GpPaper["kind"], string> = {
  "question-paper": "Question paper",
  "answer-sheet": "Model answers",
};

export function GpPaperList({ items }: { items: GpPaper[] }) {
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draftTitle, setDraftTitle] = React.useState("");
  const [draftYear, setDraftYear] = React.useState("");

  async function handleDelete(item: GpPaper) {
    setPendingId(item.id);
    const result = await deleteGpPaper(item.id, item.storage_path);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Paper removed");
  }

  function startEdit(item: GpPaper) {
    setEditingId(item.id);
    setDraftTitle(item.title);
    setDraftYear(String(item.year));
  }

  async function saveEdit(item: GpPaper) {
    setPendingId(item.id);
    const result = await updateGpPaper(item.id, draftTitle, Number(draftYear));
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't save", { description: result.error });
      return;
    }
    setEditingId(null);
    toast.success("Paper updated");
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No papers published yet.</p>
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

          {editingId === item.id ? (
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Input
                autoFocus
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="h-8 flex-1"
              />
              <Input
                type="number"
                min={1990}
                max={2100}
                value={draftYear}
                onChange={(e) => setDraftYear(e.target.value)}
                className="h-8 w-20"
              />
              <Button
                type="button"
                size="icon-sm"
                disabled={pendingId === item.id}
                onClick={() => saveEdit(item)}
                className="bg-emerald-ink text-parchment hover:bg-emerald-ink/85"
              >
                {pendingId === item.id ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Check className="size-3.5" />
                )}
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                onClick={() => setEditingId(null)}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          ) : (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-emerald-deep">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.year} · Std. {item.standard} · {kindLabel[item.kind]}
                </p>
              </div>
              <Button
                type="button"
                size="icon-sm"
                variant="outline"
                onClick={() => startEdit(item)}
              >
                <Pencil className="size-3.5" />
              </Button>
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
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
