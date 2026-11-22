import { BLOG_POSTS, type BlogArticle } from "@/data/blogsData";
import { BlogHubExplorer, type HubCategory, type HubPost } from "./BlogHubExplorer";

/** Category copy for the blog hub, in display order. */
const CATEGORIES: Omit<HubCategory, "count">[] = [
  {
    slug: "esa-guide",
    name: "ESA Guide",
    href: "/blog/esa-guide/",
    blurb:
      "Our ESA Guide category provides detailed information for both new and existing ESA owners. Explore blogs on housing rights, the evaluation process, federal and state laws, emotional support animal letters, common misconceptions, and other important subjects.",
  },
  {
    slug: "qualifying-conditions",
    name: "Qualifying Conditions",
    href: "/blog/qualifying-conditions/",
    blurb:
      "Many people wonder whether their mental or emotional health condition may qualify them for an emotional support animal. In this category, you'll find educational articles discussing mental health conditions that may be evaluated by licensed mental health professionals when determining whether an ESA is clinically appropriate.",
  },
  {
    slug: "esa-training",
    name: "ESA Training",
    href: "/blog/esa-training/",
    blurb:
      "A well-behaved emotional support animal can make everyday life more comfortable for both you and those around you. This category covers training tips, behavior management, socialization, and practical advice to help your ESA become a calm and well-mannered companion.",
  },
];

/** Reading order for someone new to ESAs. */
const START_HERE = ["emotional-support-animal", "conditions-that-may-qualify-for-an-esa", "who-can-write-an-esa-letter", "esa-letter-sample"];
const FEATURED = "hud-guidance-for-emotional-support-animals";

function words(value: unknown): number {
  if (typeof value === "string") return value.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((n: number, v) => n + words(v), 0);
  if (value && typeof value === "object") {
    return Object.entries(value).reduce((n, [k, v]) => (k === "schema" || k.endsWith("Image") || k === "image" ? n : n + words(v)), 0);
  }
  return 0;
}

export function toPost(a: BlogArticle): HubPost {
  const body = { intro: a.introParagraphs, sections: a.sections, faqs: a.faqs, finalThoughts: a.finalThoughts };
  const author = a.author?.name ? a.author.name.replace(/,\s*(Ph\.?D\.?|LPC|MSW|LCSW|LMFT|MD).*/i, "") : "";
  return {
    slug: a.slug,
    url: a.url,
    title: a.cardTitle || a.title,
    excerpt: a.shortDescription,
    category: a.category,
    categorySlug: a.categorySlug,
    image: a.cardImage || "/blogs/blog-cards.webp",
    updated: a.lastUpdated || a.publishDate,
    updatedTs: Date.parse(a.lastUpdated || a.publishDate) || 0,
    minutes: Math.max(3, Math.round(words(body) / 230)),
    author,
  };
}

export function BlogHub() {
  const posts = BLOG_POSTS.map(toPost).sort((a, b) => b.updatedTs - a.updatedTs);
  const categories: HubCategory[] = CATEGORIES.map((c) => ({ ...c, count: posts.filter((p) => p.categorySlug === c.slug).length }));
  const start = START_HERE.map((s) => posts.find((p) => p.slug === s)).filter((p): p is HubPost => !!p);
  const featured = posts.find((p) => p.slug === FEATURED) ?? posts[0];
  return <BlogHubExplorer posts={posts} categories={categories} startHere={start} featured={featured} />;
}
