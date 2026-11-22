import React from "react";
import { BLOG_POSTS } from "@/data/blogsData";
import { BlogCard } from "@/components/blogs/BlogCard";

interface BlogMoreResourcesProps {
  currentSlug?: string;
  categorySlug?: string;
}

export function BlogMoreResources({ currentSlug, categorySlug }: BlogMoreResourcesProps = {}) {
  // Same-category posts first keeps each topic silo tightly linked.
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== currentSlug).sort(
    (a, b) => Number(b.categorySlug === categorySlug) - Number(a.categorySlug === categorySlug),
  );
  const displayPosts = otherPosts.length > 0 ? otherPosts : BLOG_POSTS;

  return (
    <section className="w-full bg-background py-14 sm:py-20 lg:py-24">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center gap-10 sm:gap-14 lg:gap-16">
        
        <div className="flex flex-col items-center gap-4 text-center max-w-[978px] mx-auto">
          <h2 className="heading-h2 text-primary text-center">
            More ESA Resources to Help You Understand Your Rights
          </h2>
          <p className="body-large text-body-text text-center max-w-[978px]">
            Guides on ESA letters, housing rights, qualifying conditions, and training.
          </p>
        </div>

        <div className="w-full max-w-[1283px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
          {displayPosts.slice(0, 3).map((item, i) => (
            <BlogCard key={item.id} article={item} priority={i === 0} />
          ))}
        </div>

      </div>
    </section>
  );
}
