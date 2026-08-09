"use client";

import * as React from "react";
import { toast } from "sonner";
import { FileUp, Loader2 } from "lucide-react";

import { uploadAnnualReport } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ReportUploadForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await uploadAnnualReport(formData);
      if (result.error) {
        toast.error("Upload failed", { description: result.error });
        return;
      }
      toast.success("Report published");
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="report-title">Title</Label>
        <Input id="report-title" name="title" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="report-year">Year</Label>
        <Input
          id="report-year"
          name="year"
          type="number"
          min={1990}
          max={2100}
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="report-file">PDF file</Label>
        <Input
          id="report-file"
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
        Publish report
      </Button>
    </form>
  );
}
