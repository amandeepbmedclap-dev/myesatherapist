// Normalizes a blog post's JSON-LD so it describes only the post itself.
// - Drops the blog hub and category nodes (Blog, CollectionPage) that some posts
//   carried, plus any references to them.
// - Adds a BreadcrumbList (Home > Blog > Category > Post) when a post has none.
// - Fills missing datePublished / dateModified from the live WordPress site.
// - Writes those dates as ISO 8601 datetimes with a timezone.
// - Drops paywall markup. These articles are public.
// Images are added by withFeatureImage before this runs.

const SITE = "https://myesatherapist.com";

// datePublished / dateModified as published on the live WordPress site (Nov 2026).
export const WP_POST_DATES: Record<string, { published: string; modified: string }> = {
  "are-online-esa-letters-legit": { published: "2026-11-27", modified: "2026-11-27" },
  "how-to-get-an-esa-letter-online": { published: "2026-11-27", modified: "2026-11-27" },
  "train-esa-around-guests-and-strangers": { published: "2026-11-27", modified: "2026-11-27" },
  "esa-vs-service-animal": { published: "2026-11-26", modified: "2026-11-26" },
  "esa-pet-rent-and-deposits": { published: "2026-11-26", modified: "2026-11-26" },
  "esa-letter-for-college-dorms": { published: "2026-11-26", modified: "2026-11-26" },
  "esa-for-adhd": { published: "2026-10-30", modified: "2026-11-16" },
  "who-can-write-an-esa-letter": { published: "2026-10-28", modified: "2026-10-28" },
  "esa-for-bipolar-disorder": { published: "2026-10-21", modified: "2026-10-21" },
  "esa-for-depression": { published: "2026-10-13", modified: "2026-10-16" },
  "esa-training-myths": { published: "2026-10-12", modified: "2026-10-16" },
  "prepare-esa-for-rental-housing": { published: "2026-10-05", modified: "2026-10-16" },
  "esa-for-ptsd": { published: "2026-09-30", modified: "2026-10-16" },
  "8-basic-obedience-commands-every-esa-should-know": { published: "2026-09-11", modified: "2026-10-16" },
  "esa-for-anxiety": { published: "2026-08-26", modified: "2026-10-16" },
  "esa-letter-sample": { published: "2026-07-29", modified: "2026-10-16" },
  "esa-for-children": { published: "2026-07-27", modified: "2026-10-16" },
  "is-esa-registration-legit": { published: "2026-07-21", modified: "2026-10-16" },
  "conditions-that-may-qualify-for-an-esa": { published: "2026-07-10", modified: "2026-10-30" },
  "how-to-verify-an-esa-letter": { published: "2026-06-19", modified: "2026-10-16" },
  "hud-guidance-for-emotional-support-animals": { published: "2026-06-09", modified: "2026-10-16" },
  "can-landlords-deny-emotional-support-animals": { published: "2026-05-27", modified: "2026-10-16" },
  "emotional-support-animal": { published: "2026-05-14", modified: "2026-10-16" },
};

const CATEGORY_LABELS: Record<string, string> = {
  "esa-guide": "ESA Guide",
  "esa-training": "ESA Training",
  "qualifying-conditions": "Qualifying Conditions",
};

type Node = Record<string, unknown>;
type PostInfo = { slug: string; categorySlug: string; title: string; canonicalUrl: string };

// People named in the post data are the ones the page can show.
const mentions = (post: unknown, name: string) => JSON.stringify(post).includes(name);

const typesOf = (n: Node): string[] => {
  const t = n["@type"];
  return Array.isArray(t) ? (t as string[]) : t ? [t as string] : [];
};

const PROFILE_URLS: Record<string, string> = {
  "Allyson Valley": `${SITE}/contributors/allyson-valley/`,
  "Max Phillips": `${SITE}/contributors/max-phillips/`,
  "Awais Arshad": `${SITE}/contributors/awais-arshad/`,
};

// Google's Article check expects a datetime with a timezone, not a bare date.
function toSchemaDate(value: unknown): unknown {
  if (typeof value !== "string") return value;
  let v = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}/.test(v)) {
    const t = Date.parse(`${v} 12:00 UTC`);
    if (Number.isNaN(t)) return value;
    v = new Date(t).toISOString().slice(0, 10);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return `${v}T00:00:00+00:00`;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(v)) return `${v}+00:00`;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(v)) return v.replace("Z", "+00:00");
  return v;
}

function ensurePersonUrl(person: unknown) {
  if (!person || typeof person !== "object" || Array.isArray(person)) return;
  const p = person as Node;
  const types = typesOf(p);
  if (!types.includes("Person") || typeof p.name !== "string" || p.url) return;
  const profile = PROFILE_URLS[p.name as string];
  if (profile) p.url = profile;
}

function isPaywallPart(part: unknown) {
  if (!part || typeof part !== "object" || Array.isArray(part)) return false;
  const p = part as Node;
  if (p.isAccessibleForFree === false) return true;
  const sel = p.cssSelector;
  const selectors = Array.isArray(sel) ? sel : sel ? [sel] : [];
  return selectors.some((s) => String(s).includes("paywall"));
}

export function cleanPostSchema(schema: unknown, post: PostInfo): unknown {
  const { schema: _ownSchema, ...postData } = post as PostInfo & { schema?: unknown };
  if (!schema || typeof schema !== "object") return schema;
  const root = schema as Node;
  const graph: Node[] = Array.isArray(root["@graph"]) ? (root["@graph"] as Node[]) : [root];

  const dropped = new Set<string>();
  const kept = graph.filter((n) => {
    const ts = typesOf(n);
    const isPostItself = ts.includes("BlogPosting") || ts.includes("Article");
    const notShown = ts.includes("Person") && typeof n.name === "string" && !mentions(postData, n.name as string);
    if (notShown || (!isPostItself && (ts.includes("Blog") || ts.includes("CollectionPage")))) {
      if (typeof n["@id"] === "string") dropped.add(n["@id"] as string);
      return false;
    }
    return true;
  });

  const stripRefs = (v: unknown): unknown => {
    if (Array.isArray(v)) {
      return v
        .filter((x) => !(x && typeof x === "object" && Object.keys(x as Node).length === 1 && dropped.has((x as Node)["@id"] as string)))
        .map(stripRefs);
    }
    if (v && typeof v === "object") {
      const out: Node = {};
      for (const [k, x] of Object.entries(v as Node)) {
        if (x && typeof x === "object" && !Array.isArray(x) && Object.keys(x as Node).length === 1 && dropped.has((x as Node)["@id"] as string)) continue;
        out[k] = stripRefs(x);
      }
      return out;
    }
    return v;
  };
  const nodes = kept.map((n) => stripRefs(n) as Node);

  const url = post.canonicalUrl || `${SITE}/blog/${post.categorySlug}/${post.slug}/`;
  const dates = WP_POST_DATES[post.slug];
  for (const n of nodes) {
    const ts = typesOf(n);
    const isArticle = ts.includes("BlogPosting") || ts.includes("Article");
    if (isArticle) {
      if (!n.datePublished && dates) n.datePublished = dates.published;
      if (!n.dateModified && dates) n.dateModified = dates.modified;
      delete n.isAccessibleForFree;
      if (Array.isArray(n.hasPart)) {
        const parts = (n.hasPart as unknown[]).filter((part) => !isPaywallPart(part));
        if (parts.length) n.hasPart = parts;
        else delete n.hasPart;
      }
      ensurePersonUrl(n.author);
      ensurePersonUrl(n.reviewedBy);
    }
    ensurePersonUrl(n);
    for (const key of ["datePublished", "dateModified", "lastReviewed"]) {
      if (key in n) n[key] = toSchemaDate(n[key]);
    }
  }

  if (!nodes.some((n) => typesOf(n).includes("BreadcrumbList"))) {
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog/` },
        {
          "@type": "ListItem",
          position: 3,
          name: CATEGORY_LABELS[post.categorySlug] || post.categorySlug,
          item: `${SITE}/blog/${post.categorySlug}/`,
        },
        { "@type": "ListItem", position: 4, name: post.title, item: url },
      ],
    });
  }

  if (Array.isArray(root["@graph"])) return { ...root, "@graph": nodes };
  return { "@context": root["@context"] || "https://schema.org", "@graph": nodes.map((n) => {
    const { ["@context"]: _c, ...rest } = n;
    return rest;
  }) };
}
