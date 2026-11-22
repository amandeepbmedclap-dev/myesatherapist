export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://myesatherapist.com"
).replace(/\/$/, "");

export function assetUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
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
