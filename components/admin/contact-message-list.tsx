"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, Mail, Trash2 } from "lucide-react";

import { deleteContactMessage } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { ContactSubmission } from "@/lib/supabase/types";

export function ContactMessageList({ items }: { items: ContactSubmission[] }) {
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  async function handleDelete(item: ContactSubmission) {
    setPendingId(item.id);
    const result = await deleteContactMessage(item.id);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Message removed");
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No messages yet.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-start gap-3 rounded-xl border border-emerald-ink/10 bg-mist p-3"
        >
          <Mail className="mt-0.5 size-5 shrink-0 text-emerald-ink" strokeWidth={1.75} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-emerald-deep">
              {item.first_name} {item.last_name}
              <span className="ml-1.5 font-normal text-muted-foreground">
                — {item.email}
              </span>
            </p>
            <p className="mt-0.5 text-xs font-semibold text-amber-spark uppercase tracking-wide">
              {item.subject}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
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
