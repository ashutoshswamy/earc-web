"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, Loader2, Pencil, Trash2, X } from "lucide-react";

import { deleteSuccessStory, updateSuccessStory } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SuccessStory } from "@/lib/supabase/types";

export function SuccessStoryList({ items }: { items: SuccessStory[] }) {
  const [pendingId, setPendingId] = React.useState<string | null>(null);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState({ title: "", name: "", story: "" });

  async function handleDelete(item: SuccessStory) {
    setPendingId(item.id);
    const result = await deleteSuccessStory(item.id);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Story removed");
  }

  function startEdit(item: SuccessStory) {
    setEditingId(item.id);
    setDraft({ title: item.title, name: item.name, story: item.story });
  }

  async function saveEdit(item: SuccessStory) {
    setPendingId(item.id);
    const result = await updateSuccessStory(
      item.id,
      draft.title,
      draft.name,
      draft.story,
    );
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't save", { description: result.error });
      return;
    }
    setEditingId(null);
    toast.success("Story updated");
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No stories added yet.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) =>
        editingId === item.id ? (
          <li
            key={item.id}
            className="flex flex-col gap-2 rounded-xl border border-emerald-ink/10 bg-mist p-3"
          >
            <Input
              autoFocus
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="Title"
              className="h-8"
            />
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Name"
              className="h-8"
            />
            <Textarea
              rows={3}
              value={draft.story}
              onChange={(e) => setDraft({ ...draft, story: e.target.value })}
            />
            <div className="flex justify-end gap-2">
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
          </li>
        ) : (
          <li
            key={item.id}
            className="flex items-start gap-3 rounded-xl border border-emerald-ink/10 bg-mist p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-emerald-deep">
                {item.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.name}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
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
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
