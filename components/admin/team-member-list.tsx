"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, Loader2, Pencil, Trash2, Users, X } from "lucide-react";

import { deleteTeamMember, updateTeamMember } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PROJECT_NAMES } from "@/lib/project-names";
import type { TeamMember } from "@/lib/supabase/types";

const selectClass =
  "flex h-8 flex-1 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function TeamMemberList({ items }: { items: TeamMember[] }) {
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState({
    name: "",
    designation: "",
    project: "",
    centre: "",
  });

  async function handleDelete(item: TeamMember) {
    setPendingId(item.id);
    const result = await deleteTeamMember(item.id);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Team member removed");
  }

  function startEdit(item: TeamMember) {
    setEditingId(item.id);
    setDraft({
      name: item.name,
      designation: item.designation,
      project: item.project,
      centre: item.centre,
    });
  }

  async function saveEdit(item: TeamMember) {
    setPendingId(item.id);
    const result = await updateTeamMember(
      item.id,
      draft.name,
      draft.designation,
      draft.project,
      draft.centre,
    );
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't save", { description: result.error });
      return;
    }
    setEditingId(null);
    toast.success("Team member updated");
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No team members added yet.
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
          <Users className="size-5 shrink-0 text-emerald-ink" strokeWidth={1.75} />

          {editingId === item.id ? (
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              <Input
                autoFocus
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className="h-8 min-w-24 flex-1"
                placeholder="Name"
              />
              <Input
                value={draft.designation}
                onChange={(e) =>
                  setDraft({ ...draft, designation: e.target.value })
                }
                className="h-8 min-w-24 flex-1"
                placeholder="Designation"
              />
              <select
                value={draft.project}
                onChange={(e) =>
                  setDraft({ ...draft, project: e.target.value })
                }
                className={selectClass}
              >
                {PROJECT_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <Input
                value={draft.centre}
                onChange={(e) =>
                  setDraft({ ...draft, centre: e.target.value })
                }
                className="h-8 w-24"
                placeholder="Centre"
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
                  {item.name}
                  <span className="ml-1.5 font-normal text-muted-foreground">
                    - {item.designation}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.project} · {item.centre}
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
