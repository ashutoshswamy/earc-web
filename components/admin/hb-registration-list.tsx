"use client";

import * as React from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, ExternalLink, Loader2, Trash2 } from "lucide-react";

import {
  deleteHbRegistration,
  getHbRegistrationScreenshotUrl,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import type { HbRegistration } from "@/lib/supabase/types";

const detailFields: [keyof HbRegistration, string][] = [
  ["student_name_mr_surname", "आडनाव (मराठी)"],
  ["student_name_mr_name", "नाव (मराठी)"],
  ["student_name_mr_father", "वडिलांचे नाव (मराठी)"],
  ["address", "Address"],
  ["village", "Village"],
  ["taluka", "Taluka"],
  ["district", "District"],
  ["parent_name", "Parent's name"],
  ["school_name", "School name"],
  ["medium_chosen", "Medium chosen"],
  ["school_address", "School address"],
  ["school_board", "School board"],
  ["school_timing_weekday", "School timing (Mon–Fri)"],
  ["school_timing_saturday", "School timing (Sat)"],
  ["preferred_slot", "Preferred slot"],
  ["heard_from", "Heard from"],
];

function RegistrationRow({ item }: { item: HbRegistration }) {
  const [expanded, setExpanded] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [screenshotLoading, setScreenshotLoading] = React.useState(false);

  const fullName = `${item.student_name_en_surname} ${item.student_name_en_name} ${item.student_name_en_middle}`.trim();

  async function handleDelete() {
    setPending(true);
    const result = await deleteHbRegistration(item.id, item.payment_screenshot_path);
    setPending(false);
    if (result.error) {
      toast.error("Couldn't delete", { description: result.error });
      return;
    }
    toast.success("Registration removed");
  }

  async function handleViewScreenshot() {
    setScreenshotLoading(true);
    const result = await getHbRegistrationScreenshotUrl(item.payment_screenshot_path);
    setScreenshotLoading(false);
    if (result.error || !result.url) {
      toast.error("Couldn't load screenshot", { description: result.error ?? undefined });
      return;
    }
    window.open(result.url, "_blank", "noopener,noreferrer");
  }

  return (
    <li className="rounded-xl border border-emerald-ink/10 bg-mist p-3">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-emerald-deep">{fullName}</p>
          <p className="text-xs text-muted-foreground">
            {item.course_id} · {item.whatsapp_no} · {item.email}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            disabled={screenshotLoading}
            onClick={handleViewScreenshot}
            title="View payment screenshot"
          >
            {screenshotLoading ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <ExternalLink className="size-3.5" />
            )}
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="destructive"
            disabled={pending}
            onClick={handleDelete}
          >
            {pending ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
          </Button>
        </div>
      </div>

      {expanded && (
        <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 border-t border-emerald-ink/10 pt-3 sm:grid-cols-2">
          {detailFields.map(([key, label]) => (
            <div key={key}>
              <dt className="text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                {label}
              </dt>
              <dd className="text-sm text-emerald-deep">{String(item[key])}</dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
}

export function HbRegistrationList({ items }: { items: HbRegistration[] }) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No registrations yet.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <RegistrationRow key={item.id} item={item} />
      ))}
    </ul>
  );
}
