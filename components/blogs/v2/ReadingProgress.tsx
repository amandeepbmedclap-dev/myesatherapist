"use client";

import { useEffect, useState } from "react";

/** Thin gold bar at the very top of the viewport that fills as the article is read. */
export function ReadingProgress({ targetId = "article-body" }: { targetId?: string }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-r.top + window.innerHeight * 0.2, 0), total);
      setPct(total > 0 ? Math.round((done / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
      <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${pct}%` }} />
    </div>
  );
}
