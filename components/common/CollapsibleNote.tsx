"use client";

import { useState } from "react";
import { Info } from "lucide-react";

/** "Important" callout used across state sections: full text in the DOM, long notes collapse to two lines. */
export function CollapsibleNote({ text, label = "Important", className = "", collapse = true }: { text: string; label?: string; className?: string; collapse?: boolean }) {
  const [open, setOpen] = useState(false);
  const body = text.replace(/^(important\s*note[:\s-]*|important[:\s-]*|note[:\s-]*)/i, "");
  const long = collapse && body.length > 200;

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-[#8A6A12]" />
      <div className="min-w-0 font-sans text-[14px] leading-[22px] text-body-text">
        <span className={open || !long ? "block" : "line-clamp-2"}>
          <span className="font-bold text-primary">{label}: </span>
          {body}
        </span>
        {long && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-1 cursor-pointer font-bold text-primary underline decoration-accent decoration-2 underline-offset-4"
          >
            {open ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
