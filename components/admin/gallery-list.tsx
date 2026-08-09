"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Trash2, Video } from "lucide-react";

import { deleteGalleryItem } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { GalleryItem } from "@/lib/supabase/types";

export function GalleryList({ items }: { items: GalleryItem[] }) {
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  async function handleDelete(item: GalleryItem) {
    setPendingId(item.id);
    const result = await deleteGalleryItem(item.id, item.storage_path);
    setPendingId(null);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Removed from gallery");
  }

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nothing uploaded yet — add a photo or video above.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="group relative aspect-square overflow-hidden rounded-xl bg-mist"
        >
          {item.media_type === "photo" ? (
            <Image
              src={item.url}
              alt={item.title}
              fill
              sizes="200px"
              className="object-cover"
            />
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-1.5 bg-emerald-ink/5 text-emerald-ink">
              <Video className="size-6" strokeWidth={1.5} />
              <span className="px-2 text-center text-xs font-medium line-clamp-2">
                {item.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <p className="line-clamp-1 text-xs font-medium text-white">
              {item.title}
            </p>
          </div>
          <Button
            type="button"
            size="icon-sm"
            variant="destructive"
            disabled={pendingId === item.id}
            onClick={() => handleDelete(item)}
            className="absolute top-1.5 right-1.5 bg-card/90 backdrop-blur"
          >
            {pendingId === item.id ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
          </Button>
        </li>
      ))}
    </ul>
  );
}
