"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = { id: string; label: string };

function useActive(items: Item[]) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  useEffect(() => {
    const onScroll = () => {
      let current = items[0]?.id ?? "";
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.3) current = it.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40) current = items[items.length - 1]?.id ?? current;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);
  return active;
}

function go(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/** Desktop: sticky numbered outline with a progress rail. */
export function ArticleTocRail({ items }: { items: Item[] }) {
  const active = useActive(items);
  const idx = Math.max(0, items.findIndex((i) => i.id === active));
  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <div className="font-sans text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#8A6A12]">In this article</div>
      <div className="relative mt-5">
        <span aria-hidden className="absolute left-[11px] top-2 bottom-2 w-px bg-primary/12" />
        <span aria-hidden className="absolute left-[11px] top-2 w-px bg-accent transition-all duration-300" style={{ height: `calc(${(idx / Math.max(items.length - 1, 1)) * 100}% - 16px)` }} />
        <ol className="space-y-1">
          {items.map((it, i) => {
            const on = it.id === active;
            const passed = i < idx;
            return (
              <li key={it.id}>
                <a
                  href={`#${it.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(it.id);
                  }}
                  className={`group relative flex gap-3 rounded-[10px] py-2 pr-2 font-sans text-[14px] leading-[20px] transition-colors ${on ? "font-semibold text-primary" : "text-body-text hover:text-primary"}`}
                >
                  <span
                    className={`relative z-10 mt-[-1px] flex size-[23px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold tabular-nums transition-colors ${on ? "bg-accent text-primary" : passed ? "bg-primary text-white" : "bg-white text-primary/70 ring-1 ring-primary/15 group-hover:ring-primary/35"}`}
                  >
                    {i + 1}
                  </span>
                  <span>{it.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/** Mobile/tablet: collapsible "On this page" panel placed above the article body. */
export function ArticleTocInline({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[18px] bg-cream-100 ring-1 ring-line-200">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left">
        <span className="font-sans text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#8A6A12]">In this article · {items.length} sections</span>
        <ChevronDown aria-hidden className={`size-5 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ol className="space-y-1 px-5 pb-4">
          {items.map((it, i) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  go(it.id);
                }}
                className="flex gap-3 py-1.5 font-sans text-[15px] leading-[22px] text-primary"
              >
                <span className="w-5 shrink-0 font-bold text-gold-600 tabular-nums">{i + 1}</span>
                {it.label}
              </a>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
