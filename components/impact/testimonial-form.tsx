"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { submitTestimonial } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TestimonialForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitTestimonial(formData);
      if (result.error) {
        toast.error("Couldn't submit", { description: result.error });
        return;
      }
      toast.success("Thanks! Your testimonial is in for review.");
      formRef.current?.reset();
    });
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="ruled-margin mx-auto mt-10 flex max-w-2xl flex-col gap-4 rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm"
    >
      <div>
        <h3 className="font-heading text-lg font-semibold text-emerald-deep">
          Share your experience
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Submitted testimonials are reviewed before they appear here.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="testimonial-name">Name</Label>
          <Input id="testimonial-name" name="name" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="testimonial-detail">Role / affiliation</Label>
          <Input
            id="testimonial-detail"
            name="detail"
            placeholder="e.g. Parent, Ganit Prabhutwa Pariksha"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="testimonial-quote">Your testimonial</Label>
        <Textarea id="testimonial-quote" name="quote" rows={4} required maxLength={1000} />
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className="gap-2 self-start bg-emerald-ink text-parchment hover:bg-emerald-ink/90"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Submit for review
      </Button>
    </form>
  );
}
