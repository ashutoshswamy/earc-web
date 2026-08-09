"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FloatingContact() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="w-64 rounded-2xl border border-emerald-ink/10 bg-card p-4 shadow-xl"
          >
            <p className="font-heading text-sm font-semibold text-emerald-deep">
              Quick connect
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              We usually reply within a day.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/contact" />}
              size="sm"
              className="mt-3 w-full justify-center gap-1.5 bg-amber-spark text-emerald-deep hover:bg-amber-spark/85"
            >
              <Phone className="size-3.5" />
              Contact Us
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close quick connect" : "Open quick connect"}
        className="flex size-13 items-center justify-center rounded-full bg-emerald-ink text-parchment shadow-lg shadow-emerald-ink/30 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <MessageCircle className="size-5.5" />
        )}
      </button>
    </div>
  );
}
