"use client";

import * as React from "react";
import { toast } from "sonner";
import { Handshake, Loader2 } from "lucide-react";

import { uploadPartner } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearIfTooLarge,
  MAX_UPLOAD_LABEL,
  TOO_LARGE_MESSAGE,
} from "@/lib/upload-limit";
import { PROJECT_NAMES } from "@/lib/project-names";

const selectClass =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function PartnerUploadForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await uploadPartner(formData);
      if (result.error) {
        toast.error("Upload failed", { description: result.error });
        return;
      }
      toast.success("Partner added");
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="partner-project">Project</Label>
        <select id="partner-project" name="project" required className={selectClass}>
          {PROJECT_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="partner-csr">CSR partner</Label>
        <Input id="partner-csr" name="csr_partner" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="partner-file">Logo</Label>
        <Input
          id="partner-file"
          name="file"
          type="file"
          accept="image/*"
          required
          onChange={(e) => {
            if (clearIfTooLarge(e.currentTarget)) toast.error(TOO_LARGE_MESSAGE);
          }}
        />
        <p className="text-xs text-muted-foreground">Max file size {MAX_UPLOAD_LABEL}.</p>
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="gap-2 bg-emerald-ink text-parchment hover:bg-emerald-ink/90"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Handshake className="size-4" />
        )}
        Add partner
      </Button>
    </form>
  );
}
