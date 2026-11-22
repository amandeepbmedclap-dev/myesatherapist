import type { ReactNode } from "react";
import { BLOG_POSTS } from "@/data/blogsData";
import { toPost } from "./BlogHub";
import { CategoryHubExplorer, type CategoryLink } from "./CategoryHubExplorer";

export const BLOG_CATEGORY_LINKS: CategoryLink[] = [
  { slug: "all", name: "All articles", href: "/blog/" },
  { slug: "esa-guide", name: "ESA Guide", href: "/blog/esa-guide/" },
  { slug: "qualifying-conditions", name: "Qualifying Conditions", href: "/blog/qualifying-conditions/" },
  { slug: "esa-training", name: "ESA Training", href: "/blog/esa-training/" },
];

/**
 * Hero, topic bar and article grid for a blog category page, in the same
 * style as the blog hub. The page keeps its own H1 and intro copy (passed in)
 * and its own content sections below.
 */
export function CategoryHub({
  slug,
  title,
  intro,
  aside,
  featuredSlug,
  gridTitle,
}: {
  slug: string;
  title: string;
  intro: ReactNode;
  aside?: ReactNode;
  featuredSlug?: string;
  gridTitle?: string;
}) {
  const all = BLOG_POSTS.map(toPost);
  const posts = all.filter((p) => p.categorySlug === slug).sort((a, b) => b.updatedTs - a.updatedTs);
  const counts = Object.fromEntries(
    BLOG_CATEGORY_LINKS.map((c) => [c.slug, c.slug === "all" ? all.length : all.filter((p) => p.categorySlug === c.slug).length]),
  );
  const featured = posts.find((p) => p.slug === featuredSlug) ?? posts[0];
  const name = BLOG_CATEGORY_LINKS.find((c) => c.slug === slug)?.name ?? "";
  return (
    <CategoryHubExplorer
      slug={slug}
      name={name}
      title={title}
      intro={intro}
      aside={aside}
      posts={posts}
      featured={featured}
      links={BLOG_CATEGORY_LINKS.map((c) => ({ ...c, count: counts[c.slug] }))}
      gridTitle={gridTitle ?? `All ${name} articles`}
    />
  );
}
