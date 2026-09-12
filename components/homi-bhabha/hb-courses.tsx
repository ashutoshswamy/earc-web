"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HbRegistrationForm } from "@/components/homi-bhabha/hb-registration-form";

type Phase = {
  label: string;
  window: string;
  timing: string;
};

type Course = {
  id: string;
  std: "6" | "9";
  medium: "English" | "Marathi";
  mode: string;
  phases: Phase[];
  fee?: string;
  highlights: string[];
  contact: { name: string; phone?: string };
};

const courses: Course[] = [
  {
    id: "std6-english",
    std: "6",
    medium: "English",
    mode: "Online — Level 1 & 2",
    phases: [
      { label: "Phase 1", window: "13 Apr – end May", timing: "Daily, 4:30–6:00 PM" },
      { label: "Phase 2", window: "June onwards", timing: "Wed & Fri, 4:30–6:00 PM" },
    ],
    fee: "₹14,160 (incl. GST)",
    highlights: [
      "Lesson notes & practice question sets",
      "Science sub-topic guidance",
      "Weekly test series",
      "Practicals guidance",
      "Project guidance for selected students",
    ],
    contact: { name: "Pradnya Lohagaonkar", phone: "8421040373" },
  },
  {
    id: "std9-english",
    std: "9",
    medium: "English",
    mode: "Online — Level 1 & 2",
    phases: [
      { label: "Phase 1", window: "20 Apr – 30 May", timing: "Daily" },
      { label: "Phase 2", window: "June – October", timing: "Mon, Wed & Fri" },
    ],
    fee: "₹12,980 (incl. GST)",
    highlights: [
      "Comprehensive sub-topic guidance",
      "Monthly tests & revision",
      "Weekly test series",
      "Practicals guidance",
    ],
    contact: { name: "Rutuja Deshmukh" },
  },
  {
    id: "std6-marathi",
    std: "6",
    medium: "Marathi",
    mode: "Online — Level 1 & 2",
    phases: [
      { label: "Phase 1", window: "13 Apr – end May", timing: "Daily, 4:30–6:00 PM" },
      { label: "Phase 2", window: "June onwards", timing: "Wed & Fri, 4:30–6:00 PM" },
    ],
    fee: "₹14,160 (incl. GST)",
    highlights: [
      "Lesson notes & practice question sets",
      "Science sub-topic guidance",
      "Weekly test series",
      "Practicals guidance",
      "Project guidance for selected students",
    ],
    contact: { name: "EARC Office" },
  },
];

const stdFilters = [
  { value: "all", label: "All" },
  { value: "6", label: "Std. 6th" },
  { value: "9", label: "Std. 9th" },
] as const;

export function HbCourses() {
  const [std, setStd] = React.useState<(typeof stdFilters)[number]["value"]>("all");
  const [active, setActive] = React.useState<Course | null>(null);

  const filtered = courses.filter((c) => std === "all" || c.std === std);

  return (
    <section id="courses" className="bg-parchment">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-emerald-deep sm:text-3xl">
              Batches on offer
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Every batch runs in two phases so students build fundamentals
              first, then sharpen exam technique.
            </p>
          </div>

          <Tabs value={std} onValueChange={(v) => setStd(v as typeof std)}>
            <TabsList>
              {stdFilters.map((f) => (
                <TabsTrigger key={f.value} value={f.value}>
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <Card key={course.id} className="ring-emerald-ink/10">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge className="bg-emerald-ink px-3 py-1 text-sm font-bold text-parchment">
                    Std. {course.std}th
                  </Badge>
                  <Badge className="bg-amber-spark px-3 py-1 text-sm font-bold text-emerald-deep">
                    {course.medium} Medium
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-lg">{course.mode}</CardTitle>
                {course.fee && (
                  <CardDescription className="font-mono text-base font-semibold text-emerald-ink">
                    {course.fee}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-5">
                <dl className="space-y-2 border-y border-emerald-ink/10 py-4 font-mono text-xs">
                  {course.phases.map((phase) => (
                    <div key={phase.label} className="flex flex-col gap-0.5">
                      <dt className="font-semibold text-emerald-deep">
                        {phase.label} · {phase.window}
                      </dt>
                      <dd className="text-muted-foreground">{phase.timing}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  {course.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-amber-spark" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-muted-foreground">
                    {course.contact.name}
                  </span>
                  <Button
                    onClick={() => setActive(course)}
                    className="bg-amber-spark text-emerald-deep hover:bg-amber-spark/85"
                  >
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Register — Std. {active?.std}th {active?.medium} Medium
            </DialogTitle>
            <DialogDescription>
              नोंदणी फॉर्म (Registration form) — payment आधी पूर्ण करून खालील
              माहिती भरा.
            </DialogDescription>
          </DialogHeader>
          {active && (
            <HbRegistrationForm
              courseId={active.id}
              medium={active.medium}
              onDone={() => setActive(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
