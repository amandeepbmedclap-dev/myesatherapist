"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Mail, ThumbsDown, ThumbsUp } from "lucide-react";

type Vote = "up" | "down";
const REASONS = ["Didn't answer my question", "Hard to understand", "Out of date", "Not accurate", "Something else"];

function push(event: string, extra: Record<string, unknown>) {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  (w.dataLayer ??= []).push({ event, ...extra });
}

function send(slug: string, vote: Vote, reason?: string) {
  push("article_feedback", { article: slug, vote, reason: reason ?? "" });
  fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug, vote, reason, path: location.pathname }),
    keepalive: true,
  }).catch(() => {});
}

/** "Was this article helpful?" with like/dislike, one vote per browser per article. */
export function ArticleFeedback({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const key = `met-feedback-${slug}`;
  const [vote, setVote] = useState<Vote | null>(null);
  const [askReason, setAskReason] = useState(false);
  const [thanks, setThanks] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(key) as Vote | null;
      if (v) {
        setVote(v);
        setThanks(true);
      }
    } catch {}
  }, [key]);

  const choose = (v: Vote) => {
    if (vote) return;
    setVote(v);
    try {
      localStorage.setItem(key, v);
    } catch {}
    if (v === "up") {
      send(slug, v);
      setThanks(true);
    } else setAskReason(true);
  };

  const pickReason = (r: string) => {
    send(slug, "down", r);
    setAskReason(false);
    setThanks(true);
  };

  const btn = (v: Vote) =>
    `flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 font-sans text-base font-semibold ring-1 transition-colors ${
      vote === v ? "bg-primary text-white ring-primary" : vote ? "text-body-text/50 ring-line-200" : "bg-white text-primary ring-primary/20 hover:ring-primary/50"
    }`;

  return (
    <div className={compact ? "" : "rounded-[20px] bg-white p-5 ring-1 ring-line-200"}>
      <div className="font-heading text-[18px] font-bold leading-[26px] text-primary">Was this article helpful?</div>
      <div className="mt-3 flex gap-2.5">
        <button type="button" className={btn("up")} onClick={() => choose("up")} aria-pressed={vote === "up"} disabled={!!vote}>
          <ThumbsUp aria-hidden className="size-4" /> Yes
        </button>
        <button type="button" className={btn("down")} onClick={() => choose("down")} aria-pressed={vote === "down"} disabled={!!vote}>
          <ThumbsDown aria-hidden className="size-4" /> No
        </button>
      </div>
      {askReason && (
        <div className="mt-4">
          <div className="font-sans text-base font-semibold text-primary">What was missing?</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {REASONS.map((r) => (
              <button key={r} type="button" onClick={() => pickReason(r)} className="rounded-full bg-cream-100 px-3 py-1.5 font-sans text-base text-primary ring-1 ring-line-200 hover:ring-primary/40">
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
      {thanks && (
        <p className="mt-3 flex items-center gap-2 font-sans text-base text-body-text">
          <Check aria-hidden className="size-4 text-[#1D6E72]" /> Thanks, your feedback helps us improve this guide.
        </p>
      )}
    </div>
  );
}

const shareIcon = "flex size-10 items-center justify-center rounded-full bg-white text-primary ring-1 ring-primary/15 transition-colors hover:bg-primary hover:!text-white hover:ring-primary [&_svg]:text-current";

/** Share row: copy link, X, Facebook, LinkedIn, WhatsApp, email. */
export function ArticleShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const open = (network: string, href: string) => {
    push("article_share", { network, article: url });
    window.open(href, "_blank", "noopener,noreferrer,width=640,height=560");
  };
  return (
    <div>
      <div className="font-sans text-base font-extrabold uppercase tracking-[0.16em] text-[#8A6A12]">Share this guide</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          aria-label="Copy link"
          className={shareIcon}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              push("article_share", { network: "copy", article: url });
              setTimeout(() => setCopied(false), 2000);
            } catch {}
          }}
        >
          {copied ? <Check aria-hidden className="size-4" /> : <Link2 aria-hidden className="size-4" />}
        </button>
        <button type="button" aria-label="Share on X" className={shareIcon} onClick={() => open("x", `https://twitter.com/intent/tweet?url=${u}&text=${t}`)}>
          <svg aria-hidden viewBox="0 0 24 24" className="size-[15px]" fill="currentColor"><path d="M18.9 2H22l-7.5 8.6L23.3 22h-6.9l-5.4-7-6.2 7H1.7l8-9.2L1.3 2h7l4.9 6.4L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20Z" /></svg>
        </button>
        <button type="button" aria-label="Share on Facebook" className={shareIcon} onClick={() => open("facebook", `https://www.facebook.com/sharer/sharer.php?u=${u}`)}>
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" /></svg>
        </button>
        <button type="button" aria-label="Share on LinkedIn" className={shareIcon} onClick={() => open("linkedin", `https://www.linkedin.com/sharing/share-offsite/?url=${u}`)}>
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor"><circle cx="4.98" cy="4.98" r="2.4" /><rect x="2.8" y="9.5" width="4.4" height="12.5" rx="0.5" /><path d="M10.5 9.5h4.2v1.8c.6-1.1 2-2.1 4.1-2.1 4.4 0 5.2 2.9 5.2 6.6v6.2h-4.4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6h-4.4V9.5z" /></svg>
        </button>
        <button type="button" aria-label="Share on WhatsApp" className={shareIcon} onClick={() => open("whatsapp", `https://wa.me/?text=${t}%20${u}`)}>
          <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 3.9 3.5 1.5.6 2 .7 2.7.6.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z" /></svg>
        </button>
        <a aria-label="Share by email" className={shareIcon} href={`mailto:?subject=${t}&body=${u}`} onClick={() => push("article_share", { network: "email", article: url })}>
          <Mail aria-hidden className="size-4" />
        </a>
      </div>
      {copied && <p className="mt-2 font-sans text-base text-[#1D6E72]">Link copied</p>}
    </div>
  );
}

/** Google "preferred source" button. */
export function PreferredSource() {
  return (
    <a
      href="https://www.google.com/preferences/source?q=myesatherapist.com"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => push("preferred_source_click", {})}
      className="group flex items-center gap-3 rounded-[16px] bg-white px-4 py-3.5 ring-1 ring-line-200 transition-shadow hover:shadow-[0_10px_24px_-16px_rgba(26,61,79,0.6)]"
    >
      <svg aria-hidden viewBox="0 0 48 48" className="size-8 shrink-0">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
        <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A11.9 11.9 0 0 1 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
      </svg>
      <span className="min-w-0 font-sans">
        <span className="block text-base font-semibold leading-[20px] text-primary">Add as a preferred source</span>
        <span className="block text-base leading-snug text-body-text">See My ESA Therapist first in Google</span>
      </span>
    </a>
  );
}
