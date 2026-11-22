import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALIASES: Record<string, string> = {
  "/home": "/",
  "/home/": "/",
  "/about": "/about-us/",
  "/about/": "/about-us/",
  "/contact": "/contact-us/",
  "/contact/": "/contact-us/",
  "/faq": "/frequently-asked-questions/",
  "/faq/": "/frequently-asked-questions/",
  "/states": "/state/",
  "/states/": "/state/",
  "/esa-letter-by-state": "/state/",
  "/esa-letter-by-state/": "/state/",
  "/disclaimer-and-policies": "/disclaimer/",
  "/disclaimer-and-policies/": "/disclaimer/",
  "/consent-for-telehealth": "/telehealth-consent/",
  "/consent-for-telehealth/": "/telehealth-consent/",
};

// Pages permanently removed from the site: answer 410 Gone so search
// engines drop them quickly instead of retrying a 404.
const GONE = new Set(["/esa-letter-guam", "/esa-letter-guam/"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (GONE.has(pathname.toLowerCase())) {
    return new NextResponse("This page has been permanently removed.", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }
  const lower = pathname.toLowerCase();
  const target = ALIASES[lower] ?? (lower !== pathname ? lower : null);
  if (!target || target === pathname) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/|.*\\..*).*)"],
};
