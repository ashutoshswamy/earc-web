"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, Trash2, UserPlus, UserRound } from "lucide-react";

import { addLeader, deleteLeader } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROJECT_NAMES } from "@/lib/project-names";
import type { Leader } from "@/lib/supabase/types";

const selectClass =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const tierLabels: Record<Leader["tier"], string> = {
  memoriam: "In memoriam (top card)",
  head: "Head (middle card)",
  team: "Team (grid)",
};

export function LeaderAdmin({ items }: { items: Leader[] }) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await addLeader(formData);
      if (result.error) {
        toast.error("Couldn't add", { description: result.error });
        return;
      }
      toast.success("Leader added");
      formRef.current?.reset();
    });
  }

  async function handleDelete(item: Leader) {
    if (!window.confirm(`Remove ${item.name} from Leadership?`)) return;
    setPendingId(item.id);
    const result = await deleteLeader(item.id);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Leader removed");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm">
        <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ld-name">Name</Label>
              <Input id="ld-name" name="name" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ld-role">Role (optional)</Label>
              <Input id="ld-role" name="role" placeholder="Project Head" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ld-project">Project (optional)</Label>
              <select id="ld-project" name="project" defaultValue="" className={selectClass}>
                <option value="">-</option>
                {PROJECT_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ld-tier">Placement</Label>
              <select id="ld-tier" name="tier" defaultValue="team" className={selectClass}>
                {Object.entries(tierLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="gap-2 bg-emerald-ink text-parchment hover:bg-emerald-ink/90"
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <UserPlus className="size-4" />
            )}
            Add leader
          </Button>
        </form>
      </div>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-xl border border-emerald-ink/10 bg-mist p-3"
          >
            <UserRound className="size-5 shrink-0 text-emerald-ink" strokeWidth={1.75} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-emerald-deep">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {tierLabels[item.tier]}
                {[item.role, item.project].filter(Boolean).length > 0 &&
                  ` · ${[item.role, item.project].filter(Boolean).join(" - ")}`}
              </p>
            </div>
            <Button
              type="button"
              size="icon-sm"
              variant="destructive"
              aria-label={`Remove ${item.name}`}
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
    </div>
  );
}
