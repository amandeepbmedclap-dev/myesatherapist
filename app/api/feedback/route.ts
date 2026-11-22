import { NextResponse } from "next/server";

/**
 * "Was this article helpful?" votes from blog articles.
 * Forwarded to the same Google Apps Script web app as the exit popup (SHEET_WEBHOOK_URL),
 * with source "article-feedback" so the script can append them to an "Article feedback" tab.
 * Votes are also pushed to GTM's dataLayer on the client as `article_feedback`.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { slug?: string; vote?: string; reason?: string; path?: string } | null;
  const vote = body?.vote === "up" || body?.vote === "down" ? body.vote : null;
  if (!body || !vote) return NextResponse.json({ ok: false }, { status: 400 });
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.SHEET_WEBHOOK_SECRET ?? "",
      source: "article-feedback",
      article: String(body.slug ?? "").slice(0, 200),
      vote,
      reason: String(body.reason ?? "").slice(0, 120),
      page: String(body.path ?? "").slice(0, 300),
      at: new Date().toISOString(),
    }),
    redirect: "follow",
  }).catch(() => null);
  return NextResponse.json({ ok: !!res?.ok }, { status: res?.ok ? 200 : 502 });
}
