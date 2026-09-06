"use client";

import * as React from "react";
import { toast } from "sonner";
import { FileUp, Loader2 } from "lucide-react";

import { uploadGpPaper } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const selectClass =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function GpPaperUploadForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await uploadGpPaper(formData);
      if (result.error) {
        toast.error("Upload failed", { description: result.error });
        return;
      }
      toast.success("Paper published");
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="gp-title">Title</Label>
        <Input id="gp-title" name="title" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gp-year">Year</Label>
          <Input
            id="gp-year"
            name="year"
            type="number"
            min={1990}
            max={2100}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gp-standard">Standard</Label>
          <select id="gp-standard" name="standard" required className={selectClass}>
            <option value="5th">Std. 5th</option>
            <option value="8th">Std. 8th</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="gp-kind">Type</Label>
        <select id="gp-kind" name="kind" required className={selectClass}>
          <option value="question-paper">Question paper</option>
          <option value="answer-sheet">Model answer sheet</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="gp-file">PDF file</Label>
        <Input
          id="gp-file"
          name="file"
          type="file"
          accept="application/pdf"
          required
        />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="gap-2 bg-emerald-ink text-parchment hover:bg-emerald-ink/90"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <FileUp className="size-4" />
        )}
        Publish paper
      </Button>
    </form>
  );
}
