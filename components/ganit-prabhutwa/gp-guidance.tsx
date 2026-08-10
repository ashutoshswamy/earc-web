"use client";

import * as React from "react";
import { Play, Clock, Sparkles } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Session = {
  title: string;
  topics: string;
  duration: string;
  youtubeId?: string;
};

const sessions: Session[] = [
  {
    title: "Cracking Std. 5th number sense",
    topics: "Fractions, decimals & place value tricks",
    duration: "42 min",
  },
  {
    title: "Geometry foundations for Std. 8th",
    topics: "Constructions, angles & mensuration",
    duration: "55 min",
  },
  {
    title: "Logical reasoning workshop",
    topics: "Patterns, sequences & puzzle-solving speed",
    duration: "38 min",
  },
];

export function GpGuidance() {
  const [playing, setPlaying] = React.useState<Session | null>(null);

  return (
    <div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.map((s) => (
          <li
            key={s.title}
            className="overflow-hidden rounded-xl border border-emerald-ink/10 bg-card"
          >
            <button
              type="button"
              onClick={() => s.youtubeId && setPlaying(s)}
              disabled={!s.youtubeId}
              aria-label={
                s.youtubeId ? `Play ${s.title}` : `${s.title} — coming soon`
              }
              className="group flex aspect-video w-full items-center justify-center bg-emerald-deep disabled:cursor-not-allowed"
            >
              {s.youtubeId ? (
                <Play className="size-9 text-parchment transition-transform group-hover:scale-110" />
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-parchment/70">
                  <Sparkles className="size-3.5 text-amber-spark" />
                  Coming soon
                </span>
              )}
            </button>
            <div className="p-4">
              <p className="font-heading text-sm font-semibold text-emerald-deep">
                {s.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.topics}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {s.duration}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={!!playing} onOpenChange={(open) => !open && setPlaying(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{playing?.title}</DialogTitle>
          </DialogHeader>
          {playing?.youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${playing.youtubeId}`}
              title={playing.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-lg border border-emerald-ink/10"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
