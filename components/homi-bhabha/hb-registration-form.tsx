"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

import { submitHbRegistration } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const selectClass =
  "flex h-9 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const schoolBoards = [
  { value: "ssc-marathi", label: "SSC (मराठी माध्यमासाठी)" },
  { value: "ssc-english", label: "SSC (इंग्रजी माध्यमासाठी)" },
  { value: "cbse", label: "CBSE" },
  { value: "icse", label: "ICSE" },
  { value: "home-schooling", label: "Home Schooling" },
  { value: "other", label: "Other" },
];

const preferredSlots = [
  { value: "morning-marathi", label: "सकाळी ९ ते १०.३० (मराठी माध्यमासाठी)" },
  { value: "evening-marathi", label: "संध्याकाळी ५.३० ते ७.०० (मराठी माध्यमासाठी)" },
  { value: "evening-english", label: "संध्याकाळी ४.३० ते ६.०० (इंग्रजी माध्यमासाठी)" },
];

const heardFromOptions = [
  { value: "person", label: "व्यक्ती (Person)" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "teacher-school", label: "शिक्षक/शाळा (Teacher/School)" },
  { value: "other", label: "इतर (Other)" },
];

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function HbRegistrationForm({
  courseId,
  medium,
  onDone,
}: {
  courseId: string;
  medium: "English" | "Marathi";
  onDone: () => void;
}) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await submitHbRegistration(formData);
      if (result.error) {
        toast.error("Couldn't submit", { description: result.error });
        return;
      }
      toast.success("Registration submitted");
      formRef.current?.reset();
      onDone();
    });
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex max-h-[70vh] flex-col gap-5 overflow-y-auto pr-1"
    >
      <input type="hidden" name="course_id" value={courseId} />

      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="आडनाव (Surname) — मराठी">
          <Input name="student_name_mr_surname" required />
        </Field>
        <Field label="विद्यार्थ्याचे नाव (Name) — मराठी">
          <Input name="student_name_mr_name" required />
        </Field>
        <Field label="वडिलांचे नाव (Father's name) — मराठी">
          <Input name="student_name_mr_father" required />
        </Field>
      </div>
      <p className="-mt-3 text-xs text-muted-foreground">
        1. विद्यार्थ्याचे पूर्ण नाव मराठीमध्ये (Student&rsquo;s full name in Marathi)
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Surname — English (Capitals)">
          <Input
            name="student_name_en_surname"
            required
            className="uppercase"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.toUpperCase();
            }}
          />
        </Field>
        <Field label="Name — English (Capitals)">
          <Input
            name="student_name_en_name"
            required
            className="uppercase"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.toUpperCase();
            }}
          />
        </Field>
        <Field label="Middle Name — English (Capitals)">
          <Input
            name="student_name_en_middle"
            className="uppercase"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.toUpperCase();
            }}
          />
        </Field>
      </div>
      <p className="-mt-3 text-xs text-muted-foreground">
        2. विद्यार्थ्याचे पूर्ण नाव इंग्रजी मध्ये Capital letters (Student&rsquo;s full name)
      </p>

      <Field label="3. Upload payment screenshot">
        <Input
          name="payment_screenshot"
          type="file"
          accept="image/*"
          required
        />
      </Field>

      <Field label="4. राहत्या घराचा पत्ता (Address)">
        <Input name="address" required />
      </Field>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="5. गावाचे नाव (Village)">
          <Input name="village" required />
        </Field>
        <Field label="6. तालुका (Taluka)">
          <Input name="taluka" required />
        </Field>
        <Field label="7. जिल्ह्याचे नाव (District)">
          <Input name="district" required />
        </Field>
      </div>

      <Field label="8. पालकांचे (आई/वडील) पूर्ण नाव (Parent's name)">
        <Input name="parent_name" required />
        <p className="text-xs text-muted-foreground">
          पालकांपैकी शक्यतो एका पालकाची सलग माहिती भरावी.
        </p>
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="9. WhatsApp / Contact no. (गटात समावेश करण्यासाठी)">
          <Input name="whatsapp_no" type="tel" required />
        </Field>
        <Field label="10. Email ID (आई किंवा वडिलांचा Gmail)">
          <Input name="email" type="email" required />
        </Field>
      </div>

      <Field label="11. विद्यार्थ्याच्या शाळेचे नाव (School name)">
        <Input name="school_name" required />
      </Field>

      <Field label="12. पाल्याने ह्या तासासाठी निवडलेले माध्यम (Medium chosen)">
        <select
          name="medium_chosen"
          required
          defaultValue={medium.toLowerCase()}
          className={selectClass}
        >
          <option value="english">a. इंग्रजी (English)</option>
          <option value="marathi">b. मराठी (Marathi)</option>
        </select>
      </Field>

      <Field label="13. विद्यार्थ्याच्या शाळेचे पत्ता (School address)">
        <Input name="school_address" required />
      </Field>

      <Field label="14. विद्यार्थ्याच्या शाळेचे बोर्ड (School board)">
        <select name="school_board" required defaultValue="" className={selectClass}>
          <option value="" disabled>
            Choose one
          </option>
          {schoolBoards.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="15. शाळेची वेळ — सोमवार ते शुक्रवार (School timing, Mon–Fri)">
          <Input name="school_timing_weekday" required />
        </Field>
        <Field label="16. शाळेची वेळ — शनिवारी (School timing, Saturday)">
          <Input name="school_timing_saturday" required />
        </Field>
      </div>

      <Field label="17. पाल्यास तासाची कोणती वेळ सोयीची आहे? (Preferred class timing)">
        <select name="preferred_slot" required defaultValue="" className={selectClass}>
          <option value="" disabled>
            Choose one
          </option>
          {preferredSlots.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="18. ह्या मार्गदर्शन तासाबद्दल कोठून कळले? (How did you hear about this)">
        <select name="heard_from" required defaultValue="" className={selectClass}>
          <option value="" disabled>
            Choose one
          </option>
          {heardFromOptions.map((h) => (
            <option key={h.value} value={h.value}>
              {h.label}
            </option>
          ))}
        </select>
      </Field>

      <Button
        type="submit"
        disabled={isPending}
        className="sticky bottom-0 gap-2 bg-emerald-ink text-parchment hover:bg-emerald-ink/90"
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Submit registration
      </Button>
    </form>
  );
}
