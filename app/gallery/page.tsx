import Image from "next/image";
import { ImageOff, Video } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/lib/supabase/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/gallery",
  "Gallery",
  "Photos and videos from EARC's programmes and workshops.",
);

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  const items = (data as GalleryItem[]) ?? [];

  return (
    <div className="flex flex-1 flex-col bg-parchment">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-emerald-ink/10">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
            <h1 className="font-heading text-4xl leading-[1.1] font-semibold text-emerald-deep sm:text-5xl">
              Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Moments from EARC&rsquo;s classrooms, workshops, and
              examinations.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-emerald-ink/20 py-20 text-center">
              <ImageOff className="size-8 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-muted-foreground">
                Nothing here yet - check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <figure
                  key={item.id}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-emerald-ink/10 bg-mist shadow-sm"
                >
                  {item.media_type === "photo" ? (
                    <Image
                      src={item.url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      src={item.url}
                      controls
                      preload="metadata"
                      className="size-full object-cover"
                    />
                  )}
                  {item.media_type === "video" && (
                    <span className="pointer-events-none absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[0.65rem] font-medium text-white">
                      <Video className="size-3" />
                      Video
                    </span>
                  )}
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {item.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
