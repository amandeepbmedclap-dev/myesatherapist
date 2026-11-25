import { Metadata } from "next";
import { serializeLd } from "@/lib/site";
import { cleanPostSchema } from "@/lib/blogSchema";
import { notFound } from "next/navigation";
import { TopBanner } from "@/components/layout/TopBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogMoreResources } from "@/components/blogs/BlogMoreResources";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ArticleLayoutV2 } from "@/components/blogs/v2/ArticleLayoutV2";
import { getBlogBySlug, getAllBlogs } from "@/data/blogsData";
import { socialImage, hasSocialImage, withFeatureImage } from "@/data/socialImages";
import { applySheetSeo } from "@/lib/seo";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs
    .filter((b) => b.categorySlug === "esa-guide")
    .map((b) => ({
      slug: b.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogBySlug(slug);

  if (!article || article.categorySlug !== "esa-guide") {
    return applySheetSeo({
      title: "Article Not Found | My ESA Therapist",
    });
  }

  const title = article.metaTitle || `${article.title} | My ESA Therapist`;
  const description = article.metaDescription || article.shortDescription;
  const imageKey = `blog-${article.slug}`;
  const image = hasSocialImage(imageKey) ? socialImage(imageKey, article.title) : null;
  const socialDescription = description;

  return applySheetSeo({
    title,
    description,
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    alternates: {
      canonical: article.canonicalUrl,
    },
    openGraph: {
      title,
      description: socialDescription,
      url: article.canonicalUrl,
      type: "article",
      siteName: "My ESA Therapist",
      locale: "en_US",
      images: image ? image.openGraph : [{ url: article.cardImage, alt: article.title }],
    },
    twitter: {
      card: "summary",
      title,
      description: socialDescription,
      site: "@MyESATherapist",
      creator: "@MyESATherapist",
      ...(image && { images: image.twitter }),
    },
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogBySlug(slug);

  if (!article || article.categorySlug !== "esa-guide") {
    notFound();
  }

  const articleSchema = article.schema || {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${article.canonicalUrl}#blogposting`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.canonicalUrl,
    },
    url: article.canonicalUrl,
    headline: article.title,
    description: article.shortDescription,
    articleSection: article.category,
    datePublished: article.publishDate,
    dateModified: article.lastUpdated,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.title,
    },
    reviewedBy: {
      "@type": "Person",
      name: article.reviewedBy.name,
      jobTitle: article.reviewedBy.credentials,
      url: article.reviewedBy.linkedin,
    },
    publisher: {
      "@type": "Organization",
      name: "My ESA Therapist",
      url: "https://myesatherapist.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://myesatherapist.com/common/myesa-logo.svg",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent/30 selection:text-current">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeLd(cleanPostSchema(withFeatureImage(articleSchema, `blog-${article.slug}`), article)) }}
      />

      <TopBanner />
      <Header />

      <main className="flex-1 bg-background">
        <ArticleLayoutV2 article={article} />
        <BlogMoreResources currentSlug={article.slug} categorySlug={article.categorySlug} bg="bg-background" />

        <CtaBanner
          title={article.bottomCta?.title || "Need help with an ESA letter?"}
          description={
            article.bottomCta?.description ||
            "Connect with a state-licensed mental health professional to discuss your needs and see if an emotional support animal letter may be right for you."
          }
          buttonText={article.bottomCta?.buttonText || "Start Your Evaluation"}
          buttonHref={article.bottomCta?.buttonHref || "#faq"}
          note={article.bottomCta?.note}
          bgColor="bg-white"
        />
      </main>

      <Footer />
    </div>
  );
}
