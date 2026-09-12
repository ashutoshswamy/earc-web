"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";

import { addTeamMember } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROJECT_NAMES } from "@/lib/project-names";

const selectClass =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function TeamMemberForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await addTeamMember(formData);
      if (result.error) {
        toast.error("Couldn't add", { description: result.error });
        return;
      }
      toast.success("Team member added");
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tm-name">Name</Label>
          <Input id="tm-name" name="name" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tm-designation">Designation</Label>
          <Input id="tm-designation" name="designation" required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tm-project">Project</Label>
          <select id="tm-project" name="project" required className={selectClass}>
            {PROJECT_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tm-centre">Centre</Label>
          <Input id="tm-centre" name="centre" placeholder="—" />
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
        Add team member
      </Button>
    </form>
  );
}
