import type { BlogArticle } from "@/data/blogsData";
import { BlogArticleContent } from "@/components/blogs/BlogArticleContent";
import { ArticleHero } from "./ArticleHero";
import { ArticleTocInline, ArticleTocRail } from "./ArticleToc";
import { ArticleFeedback, ArticleShare, PreferredSource } from "./ArticleEngagement";
import { ArticleCtaCard } from "./ArticleCtaCard";
import { ReadingProgress } from "./ReadingProgress";
import { ArticleFooter } from "./ArticleFooter";

/** Articles using the redesigned template (pilot). */
export const ARTICLE_V2 = new Set(["who-can-write-an-esa-letter"]);

const CATEGORY_HREF: Record<string, string> = {
  "esa-guide": "/blog/esa-guide/",
  "esa-training": "/blog/esa-training/",
  "qualifying-conditions": "/blog/qualifying-conditions/",
};

function readMinutes(article: BlogArticle) {
  const words = JSON.stringify(article).replace(/"[a-zA-Z]+":/g, " ").split(/\s+/).length;
  return Math.max(3, Math.round(words / 230));
}

export function ArticleLayoutV2({ article }: { article: BlogArticle }) {
  const toc = article.tocItems ?? [];
  return (
    <>
      <ReadingProgress />
      <ArticleHero
        title={article.title}
        subtitle={article.shortDescription}
        category={article.category}
        categoryHref={CATEGORY_HREF[article.categorySlug] ?? "/blog/"}
        readMinutes={readMinutes(article)}
        author={{ name: article.author.name, image: article.author.image, credentials: article.author.credentials }}
        reviewer={{ name: article.reviewedBy.name, image: article.reviewedBy.image, credentials: article.reviewedBy.credentials }}
        updated={article.lastUpdated}
        highlights={article.keyHighlights}
      />

      <div id="article-body" className="bg-white px-4 pb-14 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[230px_minmax(0,720px)_300px] xl:justify-between">
          <div className="hidden lg:block">{toc.length ? <ArticleTocRail items={toc} /> : null}</div>

          <article className="min-w-0">
            {toc.length ? (
              <div className="mb-8 lg:hidden">
                <ArticleTocInline items={toc} />
              </div>
            ) : null}
            <BlogArticleContent article={article} variant="v2" />
            <ArticleFooter article={article} />

            {/* Below xl the sidebar moves under the article. */}
            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:hidden">
              <ArticleFeedback slug={article.slug} />
              <div className="space-y-5 rounded-[20px] bg-white p-5 ring-1 ring-line-200">
                <ArticleShare title={article.title} url={article.canonicalUrl} />
                <PreferredSource />
              </div>
              <ArticleCtaCard className="sm:col-span-2" />
            </div>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-28 space-y-5">
              <ArticleCtaCard />
              <div className="space-y-5 rounded-[22px] bg-background p-5 ring-1 ring-line-200">
                <ArticleFeedback slug={article.slug} compact />
                <div className="border-t border-primary/10 pt-5">
                  <ArticleShare title={article.title} url={article.canonicalUrl} />
                </div>
              </div>
              <PreferredSource />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
