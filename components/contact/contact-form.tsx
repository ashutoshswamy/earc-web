"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { submitContactMessage } from "@/app/admin/actions";
import { projects } from "@/lib/projects-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const subjects = [
  { value: "teacher-training", label: "Teacher training" },
  { value: "homi-bhabha", label: "Homi Bhabha" },
  { value: "ganit-prabhutwa", label: "Ganit Prabhutwa Pariksha" },
  { value: "school-enrichment", label: "School enrichment programme" },
  ...projects.map((p) => ({ value: p.id, label: p.title })),
  { value: "other", label: "Something else" },
];

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.email("Enter a valid email address"),
  subject: z.string().min(1, "Choose a subject"),
  message: z.string().trim().min(10, "Message should be at least 10 characters"),
});

type ContactValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactValues) {
    const formData = new FormData();
    formData.set("firstName", values.firstName);
    formData.set("lastName", values.lastName);
    formData.set("email", values.email);
    const subjectLabel =
      subjects.find((s) => s.value === values.subject)?.label ?? values.subject;
    formData.set("subject", subjectLabel);
    formData.set("message", values.message);

    const result = await submitContactMessage(formData);
    if (result.error) {
      toast.error("Couldn't send", { description: result.error });
      return;
    }
    toast.success("Message sent", {
      description: "We'll get back to you within a day.",
    });
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="subject" aria-invalid={!!errors.subject} className="w-full">
                <SelectValue placeholder="What's this about?" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.subject && (
          <p className="text-xs text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        size="lg"
        className="mt-6 h-11 w-full gap-2 bg-emerald-ink text-parchment hover:bg-emerald-ink/90 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending&hellip;
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}
