// Normalizes a blog post's JSON-LD so it describes only the post itself.
// - Drops the blog hub and category nodes (Blog, CollectionPage) that some posts
//   carried, plus any references to them.
// - Adds a BreadcrumbList (Home > Blog > Category > Post) when a post has none.
// - Fills missing datePublished / dateModified from the live WordPress site.
// Images are intentionally not added here.

const SITE = "https://myesatherapist.com";

// datePublished / dateModified as published on the live WordPress site (Nov 2026).
export const WP_POST_DATES: Record<string, { published: string; modified: string }> = {
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
    if (ts.includes("BlogPosting") || ts.includes("Article")) {
      if (!n.datePublished && dates) n.datePublished = dates.published;
      if (!n.dateModified && dates) n.dateModified = dates.modified;
      // Schema dates must be ISO 8601 ("October 30, 2026" -> "2026-10-30").
      for (const key of ["datePublished", "dateModified"]) {
        const v = n[key];
        if (typeof v === "string" && !/^\d{4}-\d{2}-\d{2}/.test(v)) {
          const t = Date.parse(`${v} 12:00 UTC`);
          if (!Number.isNaN(t)) n[key] = new Date(t).toISOString().slice(0, 10);
        }
      }
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
