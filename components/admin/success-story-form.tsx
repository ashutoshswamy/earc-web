"use client";

import * as React from "react";
import { toast } from "sonner";
import { BookHeart, Loader2 } from "lucide-react";

import { addSuccessStory } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function SuccessStoryForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await addSuccessStory(formData);
      if (result.error) {
        toast.error("Couldn't add", { description: result.error });
        return;
      }
      toast.success("Success story added");
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="story-title">Title</Label>
        <Input id="story-title" name="title" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="story-name">Name</Label>
        <Input id="story-name" name="name" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="story-text">Story</Label>
        <Textarea id="story-text" name="story" rows={4} required />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="gap-2 bg-emerald-ink text-parchment hover:bg-emerald-ink/90"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <BookHeart className="size-4" />
        )}
        Add success story
      </Button>
    </form>
  );
}
