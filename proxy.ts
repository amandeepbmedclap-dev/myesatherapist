import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import wpImageMap from "./data/wpImageMap.json";

const ALIASES: Record<string, string> = {
  "/home": "/",
  "/about": "/about-us/",
  "/contact": "/contact-us/",
  "/faq": "/frequently-asked-questions/",
  "/states": "/state/",
  "/esa-letter-by-state": "/state/",
  "/disclaimer-and-policies": "/disclaimer/",
  "/consent-for-telehealth": "/telehealth-consent/",
};

// Old WordPress URLs (from Search Console, GA4 landing pages, Semrush
// backlinks and the live WP site) mapped to their closest page here.
// Keys are lowercase with no trailing slash.
const LEGACY: Record<string, string> = {
  // Pages that moved or were renamed
  "/homepage": "/",
  "/landing-page": "/",
  "/landing-b": "/",
  "/about-us-new": "/about-us/",
  "/about-us-nes": "/about-us/",
  "/contact_us": "/contact-us/",
  "/contact/contactus": "/contact-us/",
  "/terms": "/terms-of-use/",
  "/terms-and-conditions": "/terms-of-use/",
  "/hippa-compliance": "/hipaa-compliance/",
  "/psychiatric-service": "/psd-letter/",
  "/demo-page": "/esa-doctors/",
  "/esa": "/esa-letter-online/",
  "/esa-letter": "/esa-letter-online/",
  "/esa-renewal": "/esa-letter-renewal/",
  "/housing-page": "/esa-letter-for-housing/",
  "/live-with-your-esa-2": "/esa-letter-for-housing/",
  "/medical-form": "https://survey.myesatherapist.com/v1",
  "/register": "https://survey.myesatherapist.com/v1",
  "/v1": "https://survey.myesatherapist.com/v1",
  "/esa-onboard": "https://survey.myesatherapist.com/v1",
  "/video-testimonial": "/video-testimonials/",
  "/video-testimonial-b": "/video-testimonials/",
  "/author/myesatherapist": "/esa-doctors/dr-robert-staaf/",
  "/author/sharma_prince": "/contributors/",
  "/author/taruns": "/contributors/",
  "/author-page": "/contributors/",

  // WordPress category archives now live under /blog
  "/category/blog": "/blog/",
  "/esa-guide": "/blog/esa-guide/",
  "/esa-training": "/blog/esa-training/",
  "/qualifying-conditions": "/blog/qualifying-conditions/",
  "/blog-post": "/blog/",

  // Old posts with a close equivalent on the new site
  "/emotional-support-animal": "/blog/esa-guide/emotional-support-animal/",
  "/difference-between-an-emotional-support-animal-and-a-service-dog": "/blog/esa-guide/emotional-support-animal/",
  "/how-to-know-if-your-esa-letter-is-a-fraud": "/blog/esa-guide/how-to-verify-an-esa-letter/",
  "/how-can-i-verify-an-esa-letter-landlord-rights-and-tenants": "/blog/esa-guide/how-to-verify-an-esa-letter/",
  "/esa-scammers-2": "/blog/esa-guide/how-to-verify-an-esa-letter/",
  "/verify": "/blog/esa-guide/how-to-verify-an-esa-letter/",
  "/esa-certification": "/blog/esa-guide/is-esa-registration-legit/",
  "/emotional-support-animal-certification-guide": "/blog/esa-guide/is-esa-registration-legit/",
  "/how-to-get-your-dog-certified-as-an-emotional-support-animal": "/blog/esa-guide/is-esa-registration-legit/",
  "/how-an-emotional-support-animal-help-with-ptsd": "/blog/qualifying-conditions/esa-for-ptsd/",
  "/who-qualifies-for-an-emotional-support-animal-letter": "/blog/qualifying-conditions/conditions-that-may-qualify-for-an-esa/",
  "/do-you-qualify-for-emotional-support-animal": "/blog/qualifying-conditions/conditions-that-may-qualify-for-an-esa/",
  "/esa-eligible": "/blog/qualifying-conditions/conditions-that-may-qualify-for-an-esa/",
  "/can-a-primary-care-physician-write-an-esa-letter": "/blog/esa-guide/who-can-write-an-esa-letter/",
  "/tips-for-finding-a-therapist-for-an-esa-letter": "/esa-doctors/",
  "/how-to-get-an-emotional-support-animal-letter": "/esa-letter-online/",
  "/here-is-what-a-sample-esa-letter-looks-like": "/blog/esa-guide/esa-letter-sample/",
  "/sample": "/blog/esa-guide/esa-letter-sample/",
  "/fair-housing-act": "/blog/esa-guide/hud-guidance-for-emotional-support-animals/",
  "/new-emotional-support-animal-law-in-california-2022": "/esa-letter-california/",
  "/new-emotional-support-animal-law-in-california-2023": "/esa-letter-california/",

  // Common mistyped URLs seen in Search Console / GA4
  "/bloh": "/blog/",
  "/californi": "/esa-letter-california/",
};

const STATES = new Set(
  "alabama alaska arizona arkansas california colorado connecticut delaware florida georgia hawaii idaho illinois indiana iowa kansas kentucky louisiana maine maryland massachusetts michigan minnesota mississippi missouri montana nebraska nevada new-hampshire new-jersey new-mexico new-york north-carolina north-dakota ohio oklahoma oregon pennsylvania rhode-island south-carolina south-dakota tennessee texas utah vermont virginia washington washington-dc west-virginia wisconsin wyoming puerto-rico virgin-islands".split(" "),
);

// Removed with no equivalent: 410 so search engines drop them quickly.
const GONE = new Set([
  "/esa-letter-guam",
  "/gone",
  "/state-page-copy",
  "/sample-page",
  "/figma-test",
  "/stuart-source-facebook",
  "/best-pet-insurance-in-california",
  "/best-fresh-food-for-dogs",
  "/best-emotional-support-dog-breeds",
  "/separation-anxiety-in-dogs-and-dog-owners-in-2021",
  "/separation-anxiety-in-dogs-and-dog-owners-in-2023",
  "/new-airline-rules-for-flying-with-emotional-support-animals",
  "/do-you-feel-stressed-discover-the-health-advantages-of-owning-a-pet",
  "/feed",
  "/comments/feed",
  "/wp-login.php",
  "/xmlrpc.php",
  "/wp-admin",
]);

const IMAGE_MAP = wpImageMap as Record<string, string>;
const STATE_SAMPLE = "/images/states/{s}-esa-letter-sample.webp";
const GENERIC_SAMPLE = "/images/blog/emotional-support-animal-letter-sample-image.webp";
const STATE_SAMPLES = new Set(
  Object.values(IMAGE_MAP)
    .map((p) => /^\/images\/states\/([a-z-]+)-esa-letter-sample\.webp$/.exec(p)?.[1])
    .filter(Boolean) as string[],
);

function stemOf(file: string) {
  return (file.split("/").pop() || "")
    .toLowerCase()
    .replace(/\.(webp|png|jpe?g|gif|svg|avif|mp4)$/, "")
    .replace(/\.(webp|png|jpe?g)$/, "")
    .replace(/-\d{2,4}x\d{2,4}$/, "")
    .replace(/-(scaled|min|rotated)$/, "")
    .replace(/-\d$/, "");
}

// Old /wp-content/uploads/ image → the same picture on this site.
function mapUpload(pathname: string): string | null {
  const stem = stemOf(pathname);
  if (IMAGE_MAP[stem]) return IMAGE_MAP[stem];
  const state =
    /^esa-letter-sample-([a-z-]+?)[-_]image/.exec(stem)?.[1] ??
    /^emotional-support-animal-letter-([a-z-]+?)-sample-image/.exec(stem)?.[1];
  if (state) return STATE_SAMPLES.has(state) ? STATE_SAMPLE.replace("{s}", state) : GENERIC_SAMPLE;
  if (/(esa|emotional-support).*(letter|housing).*sample|sample.*esa-letter/.test(stem)) return GENERIC_SAMPLE;
  return null;
}

function gone() {
  return new NextResponse("This page has been permanently removed.", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}

function redirectTo(request: NextRequest, target: string) {
  if (/^https?:\/\//.test(target)) return NextResponse.redirect(target, 301);
  const url = request.nextUrl.clone();
  url.pathname = target;
  url.search = "";
  return NextResponse.redirect(url, 301);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  const key = lower.replace(/\/+$/, "") || "/";

  // WordPress media and system paths
  if (key.startsWith("/wp-content/")) {
    const img = key.startsWith("/wp-content/uploads/") ? mapUpload(key) : null;
    return img ? redirectTo(request, img) : gone();
  }
  if (key.startsWith("/wp-includes/") || key.startsWith("/wp-json") || key.startsWith("/wp-admin/")) return gone();
  if (/\/feed$/.test(key) || key.startsWith("/tag/") || key.includes("/attachment/")) return gone();

  if (GONE.has(key)) return gone();

  // WordPress pagination: /page/2, /blog/page/2, /blog/esa-guide/page/2
  const paged = /^(.*)\/page\/\d+$/.exec(key);
  if (paged) return redirectTo(request, (paged[1].replace(/^\/category/, "") || "") + "/");

  // /category/blog/<cat> → /blog/<cat>
  const cat = /^\/category\/blog\/([a-z-]+)$/.exec(key);
  if (cat) return redirectTo(request, `/blog/${cat[1]}/`);

  // /emotional-support-animal-letter-<state> → /esa-letter-<state>
  const esaState = /^\/emotional-support-animal-letter-([a-z-]+)$/.exec(key);
  if (esaState) return redirectTo(request, `/esa-letter-${esaState[1]}/`);

  // Bare state URLs (/oregon, /florida): the old WordPress state page URLs,
  // still linked from off-page profiles. One hop to the state page.
  if (STATES.has(key.slice(1))) return redirectTo(request, `/esa-letter-${key.slice(1)}/`);

  // Mistyped state URLs: /mississippi-esa-letter, /esa-nit-south-dakota,
  // /esa-letter-arizona/opens
  const stateVariant =
    /^\/([a-z-]+?)-esa-letter(?:-[a-z-]+)?$/.exec(key)?.[1] ??
    /^\/esa-[a-z]{2,4}-([a-z-]+)$/.exec(key)?.[1] ??
    /^\/esa-letter-([a-z-]+)\/.+$/.exec(key)?.[1];
  if (stateVariant && STATES.has(stateVariant)) return redirectTo(request, `/esa-letter-${stateVariant}/`);

  // Junk appended after a blog post URL (e.g. a doubled link) → the post
  const post = /^\/blog\/(esa-guide|esa-training|qualifying-conditions)\/([a-z0-9-]+)\/.+$/.exec(key);
  if (post) return redirectTo(request, `/blog/${post[1]}/${post[2]}/`);

  // Old client video pages → testimonials hub
  if (/^\/video-testimonials\/[a-z0-9-]+$/.test(key)) return redirectTo(request, "/video-testimonials/");

  // Contributor page not built yet: temporary redirect so it can go live later.
  if (key === "/author/kiera-conrad") {
    const url = request.nextUrl.clone();
    url.pathname = "/contributors/";
    return NextResponse.redirect(url, 302);
  }

  const legacy = LEGACY[key] ?? ALIASES[key];
  if (legacy) return redirectTo(request, legacy);

  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api/|.*\\..*).*)",
    "/wp-content/:path*",
    "/blog/:path*",
    "/wp-includes/:path*",
    "/wp-login.php",
    "/xmlrpc.php",
  ],
};
