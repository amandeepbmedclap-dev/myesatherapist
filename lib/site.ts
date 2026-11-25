export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://myesatherapist.com"
).replace(/\/$/, "");

// Absolute base for files served by this deployment (share images, etc.). Until the
// custom domain points here, SITE_URL still serves the old site, so image URLs must use
// the Vercel production host. Once the domain is attached Vercel reports it here instead.
const VERCEL_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const ASSET_URL = (
  process.env.NEXT_PUBLIC_ASSET_URL || (VERCEL_HOST ? `https://${VERCEL_HOST}` : SITE_URL)
).replace(/\/$/, "");

export function assetUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${ASSET_URL}${normalized}`;
}

import { sanitizeSchema } from "@/lib/schema";

export function serializeLd(schema: unknown, opts: { faq?: boolean } = {}) {
  return JSON.stringify(sanitizeSchema(schema, opts))
    .replaceAll(
      "https://myesatherapist.com/images/logo/my-esa-therapist-logo.webp",
      `${SITE_URL}/common/myesa-logo.svg`,
    )
    .replaceAll(
      "https://myesatherapist.com/images/",
      `${SITE_URL}/images/`,
    );
}
