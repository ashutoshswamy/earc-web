"use client";

import { useSearchParams } from "next/navigation";
import {
  ClipboardList,
  FileText,
  NotebookPen,
  BookOpen,
  MessageSquareQuote,
} from "lucide-react";

import type { GpPaper } from "@/lib/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GpExamInfo } from "@/components/ganit-prabhutwa/gp-exam-info";
import { GpResources, type Resource } from "@/components/ganit-prabhutwa/gp-resources";
import { GpBooks } from "@/components/ganit-prabhutwa/gp-books";
import { GpTestimonials } from "@/components/ganit-prabhutwa/gp-testimonials";

function toResource(p: GpPaper): Resource {
  return { year: String(p.year), std: p.standard, title: p.title, href: p.url };
}

const tabs = [
  { value: "exam-info", label: "Exam Information", icon: ClipboardList },
  { value: "papers", label: "Old Question Papers", icon: FileText },
  { value: "answers", label: "Model Answer Sheets", icon: NotebookPen },
  { value: "books", label: "Reference Books", icon: BookOpen },
  { value: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
] as const;

export function GpTabs({ papers = [] }: { papers?: GpPaper[] }) {
  const searchParams = useSearchParams();
  const requested = searchParams.get("tab");
  const initialTab = tabs.some((t) => t.value === requested)
    ? requested!
    : "exam-info";

  const questionPapers = papers
    .filter((p) => p.kind === "question-paper")
    .map(toResource);
  const answerSheets = papers
    .filter((p) => p.kind === "answer-sheet")
    .map(toResource);

  return (
    <Tabs key={initialTab} defaultValue={initialTab} className="gap-8">
      <div className="sticky top-20 z-30 -mx-4 overflow-x-auto border-b border-emerald-ink/10 bg-parchment/85 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-xl sm:border sm:px-3">
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
      <TabsContent value="books">
        <GpBooks />
      </TabsContent>
      <TabsContent value="testimonials">
        <GpTestimonials />
      </TabsContent>
    </Tabs>
  );
}
