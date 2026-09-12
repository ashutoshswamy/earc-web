"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Check, Loader2, Pencil, Trash2, X } from "lucide-react";

import { deletePartner, updatePartner } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROJECT_NAMES } from "@/lib/project-names";
import type { Partner } from "@/lib/supabase/types";

const selectClass =
  "flex h-8 flex-1 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function PartnerList({ items }: { items: Partner[] }) {
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState({ project: "", csrPartner: "" });

  async function handleDelete(item: Partner) {
    setPendingId(item.id);
    const result = await deletePartner(item.id, item.storage_path);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Partner removed");
  }

  function startEdit(item: Partner) {
    setEditingId(item.id);
    setDraft({ project: item.project, csrPartner: item.csr_partner });
  }

  async function saveEdit(item: Partner) {
    setPendingId(item.id);
    const result = await updatePartner(item.id, draft.project, draft.csrPartner);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't save", { description: result.error });
      return;
    }
    setEditingId(null);
    toast.success("Partner updated");
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No partners added yet.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-3 rounded-xl border border-emerald-ink/10 bg-mist p-3"
        >
          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-card">
            <Image src={item.url} alt={item.csr_partner} fill className="object-contain" sizes="40px" />
          </div>

          {editingId === item.id ? (
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              <select
                value={draft.project}
                onChange={(e) => setDraft({ ...draft, project: e.target.value })}
                className={selectClass}
              >
                {PROJECT_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <Input
                autoFocus
                value={draft.csrPartner}
                onChange={(e) =>
                  setDraft({ ...draft, csrPartner: e.target.value })
                }
                className="h-8 min-w-24 flex-1"
                placeholder="CSR partner"
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
                  {item.csr_partner}
                </p>
                <p className="text-xs text-muted-foreground">{item.project}</p>
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
