import { NextResponse } from "next/server";

/**
 * Exit-popup signups for The Renter's ESA Kit.
 * Forwards to a Google Apps Script web app (docs/exit-popup-google-sheet.md)
 * that appends a row to a Google Sheet and emails the PDF.
 *   SHEET_WEBHOOK_URL     the Apps Script web app URL (ends in /exec)
 *   SHEET_WEBHOOK_SECRET  shared secret, also set in the script
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string; updates?: boolean; path?: string; hp?: string } | null;
  if (!body || body.hp) return NextResponse.json({ ok: true }); // honeypot: pretend success
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  }
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.SHEET_WEBHOOK_SECRET ?? "",
      email,
      updates: !!body.updates,
      page: String(body.path ?? "").slice(0, 300),
      source: "exit-popup",
      magnet: "renters-esa-kit-2026",
      at: new Date().toISOString(),
    }),
    redirect: "follow",
  }).catch(() => null);
  return NextResponse.json({ ok: !!res?.ok }, { status: res?.ok ? 200 : 502 });
}
