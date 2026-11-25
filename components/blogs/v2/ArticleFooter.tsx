import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogArticle } from "@/data/blogsData";
import { AUTHORS } from "@/data/contributorsData";
import { nextStepLinks } from "@/components/blogs/BlogNextStep";

/** End-of-article block: author card and "Your next step" links, inside the article column. */
export function ArticleFooter({ article }: { article: BlogArticle }) {
  const a = article.aboutAuthor;
  const fallback = AUTHORS.find((x) => x.name === (a?.name ?? article.author.name));
  const name = a?.name ?? article.author.name;
  const title = a?.title ?? fallback?.title ?? "";
  const bio = a?.bio ?? (article.author as { bio?: string }).bio ?? "";
  const image = a?.image ?? article.author.image;
  const href = a?.bioHref ?? fallback?.href;
  const links = nextStepLinks(article.slug, article.categorySlug);

  return (
    <div className="mt-14 space-y-6">
      <section id="about-the-author" aria-labelledby="about-author-h" className="scroll-mt-28 rounded-[24px] bg-background p-6 ring-1 ring-line-200 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="relative size-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-[0_8px_20px_-10px_rgba(26,61,79,0.5)]">
            {image ? <Image src={image} alt={name} fill sizes="80px" className="object-cover" /> : null}
          </span>
          <div className="min-w-0">
            <div className="font-sans text-base font-extrabold uppercase tracking-[0.16em] text-[#8A6A12]">About the author</div>
            <h2 id="about-author-h" className="heading-h2 mt-1 font-heading font-bold text-primary">{name}</h2>
            {title ? <div className="font-sans text-base text-body-text">{title}</div> : null}
            {bio ? <p className="mt-3 font-sans text-[16px] leading-[27px] text-body-text">{bio}</p> : null}
            {href ? (
              <Link href={href} className="mt-3 inline-flex items-center gap-1.5 font-sans text-base font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-[#1D6E72]">
                See full bio <ArrowRight aria-hidden className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="blog-next-step" className="rounded-[24px] bg-white p-6 ring-1 ring-line-200 sm:p-8">
        <h2 id="blog-next-step" className="heading-h2 font-heading font-bold text-primary">Your Next Step</h2>
        <p className="mt-2 font-sans text-[16px] leading-[27px] text-body-text">
          ESA documentation is issued only after an evaluation by a licensed professional. These pages explain the process and requirements.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                prefetch={false}
                className="group flex h-full flex-col justify-between gap-4 rounded-[16px] bg-background p-4 font-sans text-base font-semibold leading-[22px] text-primary ring-1 ring-line-200 transition-shadow hover:shadow-[0_14px_30px_-20px_rgba(26,61,79,0.6)]"
              >
                {l.label}
                <ArrowRight aria-hidden className="size-4 text-gold-600 transition-transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
