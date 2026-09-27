"use client";

import * as React from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2 } from "lucide-react";

import { uploadGalleryItem } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearIfTooLarge,
  MAX_UPLOAD_LABEL,
  TOO_LARGE_MESSAGE,
} from "@/lib/upload-limit";

export function GalleryUploadForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await uploadGalleryItem(formData);
      if (result.error) {
        toast.error("Upload failed", { description: result.error });
        return;
      }
      toast.success("Added to gallery");
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="gallery-title">Title</Label>
        <Input id="gallery-title" name="title" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="gallery-file">Photo or video</Label>
        <Input
          id="gallery-file"
          name="file"
          type="file"
          accept="image/*,video/*"
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
          <ImagePlus className="size-4" />
        )}
        Upload to gallery
      </Button>
    </form>
  );
}
