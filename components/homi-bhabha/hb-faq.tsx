import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why does the course start so early?",
    answer:
      "Level 1 covers three years of syllabus. Starting in April gives students a full run through the fundamentals before the exam-technique phase begins in June.",
  },
  {
    question: "When and where will the orientation session be conducted?",
    answer:
      "An online orientation is held before Phase 1 begins. Registered students receive the date, time, and joining link on their registered phone number.",
  },
  {
    question: "Should the full fee be paid at once? Is any discount available?",
    answer:
      "The fee can be paid in full at registration, or in two instalments across the phases. Sibling and early-bird discounts are available - ask the batch contact when you call.",
  },
  {
    question: "Will session recordings be available?",
    answer:
      "Yes. Every live session is recorded and shared with enrolled students so missed classes can be caught up.",
  },
  {
    question: "How many test papers will be solved?",
    answer:
      "Students solve a weekly test through both phases, plus full-length mock papers modelled on the previous years' Level 1 and Level 2 patterns.",
  },
  {
    question: "Will experiments be conducted again during Level 2?",
    answer:
      "Yes. Level 2 practicals guidance repeats the core experiment set with a focus on the viva and written-report format examiners expect.",
  },
];

export function HbFaq() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <h2 className="font-heading text-2xl font-semibold text-emerald-deep sm:text-3xl">
          Frequently asked questions
        </h2>

        <Accordion className="mt-8">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="font-heading text-emerald-deep">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
