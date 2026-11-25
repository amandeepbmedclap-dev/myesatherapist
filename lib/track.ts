/** Push a GA4-ready event to GTM's dataLayer. Never pass names, emails or phone numbers. */
export function track(event: string, params: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  (w.dataLayer ??= []).push({ event, page_path: window.location.pathname, ...params });
}
