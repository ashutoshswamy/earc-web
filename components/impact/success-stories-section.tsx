import { MessageSquareQuote } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import type { SuccessStory } from "@/lib/supabase/types";

export async function SuccessStoriesSection() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("success_stories")
    .select("*")
    .order("created_at", { ascending: false });
  const stories = (data as SuccessStory[]) ?? [];

  return (
    <section id="stories" className="scroll-mt-24 bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="ruled-margin max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-emerald-deep sm:text-4xl">
            Success stories
          </h2>
          <p className="mt-2 text-muted-foreground">
            Case studies from students, teachers, and schools EARC has
            worked with.
          </p>
        </div>

        {stories.length === 0 ? (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-ink/20 bg-card py-20 text-center">
            <MessageSquareQuote className="size-8 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-muted-foreground">
              Stories are being collected — check back soon.
            </p>
          </div>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <li
                key={s.id}
                className="ruled-margin flex flex-col rounded-2xl border border-emerald-ink/10 bg-card p-6 shadow-sm"
              >
                <h3 className="font-heading text-base font-semibold text-emerald-deep">
                  {s.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.story}
                </p>
                <p className="mt-4 text-xs font-medium text-emerald-ink">
                  {s.name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
