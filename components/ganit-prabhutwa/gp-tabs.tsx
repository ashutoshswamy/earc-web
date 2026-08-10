"use client";

import { useSearchParams } from "next/navigation";
import {
  ClipboardList,
  FileText,
  NotebookPen,
  Video,
  BookOpen,
  MessageSquareQuote,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GpExamInfo } from "@/components/ganit-prabhutwa/gp-exam-info";
import { GpResources, type Resource } from "@/components/ganit-prabhutwa/gp-resources";
import { GpGuidance } from "@/components/ganit-prabhutwa/gp-guidance";
import { GpBooks } from "@/components/ganit-prabhutwa/gp-books";
import { GpTestimonials } from "@/components/ganit-prabhutwa/gp-testimonials";

const questionPapers: Resource[] = [
  { year: "2025", std: "5th", title: "Std. 5th question paper" },
  { year: "2025", std: "8th", title: "Std. 8th question paper" },
  { year: "2024", std: "5th", title: "Std. 5th question paper" },
  { year: "2024", std: "8th", title: "Std. 8th question paper" },
  { year: "2023", std: "5th", title: "Std. 5th question paper" },
  { year: "2023", std: "8th", title: "Std. 8th question paper" },
];

const answerSheets: Resource[] = [
  { year: "2025", std: "5th", title: "Std. 5th model answers" },
  { year: "2025", std: "8th", title: "Std. 8th model answers" },
  { year: "2024", std: "5th", title: "Std. 5th model answers" },
  { year: "2024", std: "8th", title: "Std. 8th model answers" },
];

const tabs = [
  { value: "exam-info", label: "Exam Information", icon: ClipboardList },
  { value: "papers", label: "Old Question Papers", icon: FileText },
  { value: "answers", label: "Model Answer Sheets", icon: NotebookPen },
  { value: "guidance", label: "Online Guidance", icon: Video },
  { value: "books", label: "Reference Books", icon: BookOpen },
  { value: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
] as const;

export function GpTabs() {
  const searchParams = useSearchParams();
  const requested = searchParams.get("tab");
  const initialTab = tabs.some((t) => t.value === requested)
    ? requested!
    : "exam-info";

  return (
    <Tabs key={initialTab} defaultValue={initialTab} className="gap-8">
      <div className="sticky top-16 z-30 -mx-4 overflow-x-auto border-b border-emerald-ink/10 bg-parchment/85 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border sm:px-3">
        <TabsList variant="line" className="h-auto w-max gap-1 sm:w-full sm:justify-between">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="gap-1.5 px-3 py-1.5 text-emerald-deep/70 data-active:text-emerald-ink"
            >
              <tab.icon className="size-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="exam-info">
        <GpExamInfo />
      </TabsContent>
      <TabsContent value="papers">
        <GpResources resources={questionPapers} />
      </TabsContent>
      <TabsContent value="answers">
        <GpResources resources={answerSheets} />
      </TabsContent>
      <TabsContent value="guidance">
        <GpGuidance />
      </TabsContent>
      <TabsContent value="books">
        <GpBooks />
      </TabsContent>
      <TabsContent value="testimonials">
        <GpTestimonials />
      </TabsContent>
    </Tabs>
  );
}
