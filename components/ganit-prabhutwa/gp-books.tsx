import { BookOpen, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

const books = [
  {
    title: "Ganit Prabhutwa Sarav — Std. 5th",
    summary: "Chapter-wise practice sets aligned to the Std. 5th exam pattern.",
    price: "₹180",
  },
  {
    title: "Ganit Prabhutwa Sarav — Std. 8th",
    summary: "Algebra, geometry & reasoning workbook with solved examples.",
    price: "₹220",
  },
  {
    title: "Buddhimapan Kodi (Logic Puzzles)",
    summary: "A puzzle companion building the reasoning speed both exams test.",
    price: "₹150",
  },
];

export function GpBooks() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <li
          key={book.title}
          className="flex flex-col gap-3 rounded-xl border border-emerald-ink/10 bg-card p-5"
        >
          <div className="flex size-11 items-center justify-center rounded-lg bg-mist">
            <BookOpen className="size-5 text-emerald-ink" />
          </div>
          <p className="font-heading text-sm font-semibold text-emerald-deep">
            {book.title}
          </p>
          <p className="text-sm text-muted-foreground">{book.summary}</p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-mono text-sm font-semibold text-emerald-ink">
              {book.price}
            </span>
            <Button
              size="sm"
              variant="outline"
              nativeButton={false}
              render={<a href="tel:+919022476146" />}
            >
              <Phone className="size-3.5" />
              Inquire
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
