"use client";

import * as React from "react";
import { toast } from "sonner";
import { Check, Loader2, Pencil, Trash2, ThumbsUp, X } from "lucide-react";

import {
  approveTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Testimonial } from "@/lib/supabase/types";

function TestimonialRow({ item }: { item: Testimonial }) {
  const [pending, setPending] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState({
    quote: item.quote,
    name: item.name,
    detail: item.detail,
  });

  async function handleApprove() {
    setPending(true);
    const result = await approveTestimonial(item.id);
    setPending(false);
    if (result.error) {
      toast.error("Couldn't approve", { description: result.error });
      return;
    }
    toast.success("Testimonial approved");
  }

  async function handleDelete() {
    setPending(true);
    const result = await deleteTestimonial(item.id);
    setPending(false);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Testimonial removed");
  }

  async function saveEdit() {
    setPending(true);
    const result = await updateTestimonial(
      item.id,
      draft.quote,
      draft.name,
      draft.detail,
    );
    setPending(false);
    if (result.error) {
      toast.error("Couldn't save", { description: result.error });
      return;
    }
    setEditing(false);
    toast.success("Testimonial updated");
  }

  if (editing) {
    return (
      <li className="flex flex-col gap-2 rounded-xl border border-emerald-ink/10 bg-mist p-3">
        <Textarea
          autoFocus
          rows={3}
          value={draft.quote}
          onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
        />
        <div className="flex gap-2">
          <Input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="h-8 flex-1"
            placeholder="Name"
          />
          <Input
            value={draft.detail}
            onChange={(e) => setDraft({ ...draft, detail: e.target.value })}
            className="h-8 flex-1"
            placeholder="Role / affiliation"
          />
          <Button
            type="button"
            size="icon-sm"
            disabled={pending}
            onClick={saveEdit}
            className="bg-emerald-ink text-parchment hover:bg-emerald-ink/85"
          >
            {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
          </Button>
          <Button type="button" size="icon-sm" variant="outline" onClick={() => setEditing(false)}>
            <X className="size-3.5" />
          </Button>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-emerald-ink/10 bg-mist p-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-emerald-deep">&ldquo;{item.quote}&rdquo;</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {item.name} — {item.detail}
        </p>
      </div>
      <div className="flex shrink-0 gap-1">
        {item.status === "pending" && (
          <Button
            type="button"
            size="icon-sm"
            disabled={pending}
            onClick={handleApprove}
            className="bg-emerald-ink text-parchment hover:bg-emerald-ink/85"
          >
            {pending ? <Loader2 className="size-3.5 animate-spin" /> : <ThumbsUp className="size-3.5" />}
          </Button>
        )}
        <Button type="button" size="icon-sm" variant="outline" onClick={() => setEditing(true)}>
          <Pencil className="size-3.5" />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="destructive"
          disabled={pending}
          onClick={handleDelete}
        >
          {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
        </Button>
      </div>
    </li>
  );
}

export function TestimonialList({ items }: { items: Testimonial[] }) {
  const pendingItems = items.filter((t) => t.status === "pending");
  const approvedItems = items.filter((t) => t.status === "approved");

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No testimonials submitted yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-xs font-semibold tracking-wide text-amber-spark uppercase">
          Pending review ({pendingItems.length})
        </h3>
        <ul className="mt-2 flex flex-col gap-2">
          {pendingItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing waiting.</p>
          ) : (
            pendingItems.map((item) => <TestimonialRow key={item.id} item={item} />)
          )}
        </ul>
      </div>
      <div>
        <h3 className="text-xs font-semibold tracking-wide text-amber-spark uppercase">
          Approved ({approvedItems.length})
        </h3>
        <ul className="mt-2 flex flex-col gap-2">
          {approvedItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">None yet.</p>
          ) : (
            approvedItems.map((item) => <TestimonialRow key={item.id} item={item} />)
          )}
        </ul>
      </div>
    </div>
  );
}
