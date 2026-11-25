"use client";

import { BlogCtaBanner } from "@/components/blogs/BlogCtaBanner";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogArticle, BlogCalloutBox, BlogQuoteBox } from "@/data/blogsData";
import { BlogFaqSection } from "@/components/blogs/BlogFaqSection";
import { FaqRow } from "@/components/home/FaqSection";

interface BlogArticleContentProps {
  article: BlogArticle;
  /** "v2": redesigned article template (pilot). */
  variant?: "classic" | "v2";
}

export function BlogArticleContent({ article, variant = "classic" }: BlogArticleContentProps) {
  const v2 = variant === "v2";
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const renderFormattedText = (content: string): React.ReactNode => {
    if (!content) return content;

    const regex = /\[([^\]]+)\]\(([^)]+)\)|<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["'][^>]*>(.*?)<\/a>|\*\*([^*]+)\*\*|<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi;

    if (!regex.test(content)) {
      return content;
    }

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    regex.lastIndex = 0;

    while ((match = regex.exec(content)) !== null) {
      const fullMatch = match[0];
      const matchIndex = match.index;

      const linkText = match[1] || match[4];
      const linkUrl = match[2] || match[3];
      const boldText = match[5] || match[6];

      if (matchIndex > lastIndex) {
        parts.push(content.substring(lastIndex, matchIndex));
      }

      if (linkText && linkUrl) {
        parts.push(
          <Link
            key={`${matchIndex}-${linkUrl}`}
            href={linkUrl}
            className="text-[#8A6A0B] font-semibold hover:underline transition-colors"
          >
            {linkText}
          </Link>
        );
      } else if (boldText) {
        parts.push(
          <strong
            key={`${matchIndex}-bold`}
            className="font-bold text-primary"
          >
            {boldText}
          </strong>
        );
      }

      lastIndex = matchIndex + fullMatch.length;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts;
  };

  const renderQuoteBox = (quoteBox: BlogQuoteBox) => (
    <div className="w-full bg-accent/20 rounded-[15px] flex flex-row items-center overflow-hidden gap-3.5 sm:gap-[16px] pr-4 sm:pr-8 lg:pr-[67px] min-h-[69px] my-5">
      <div className="w-[14px] sm:w-[17px] self-stretch bg-accent rounded-l-[10px] shrink-0 min-h-[69px]" />
      <p className="body-text font-semibold text-body-text py-3 sm:py-3.5">
        {quoteBox.quote} {quoteBox.author && <>– {renderFormattedText(quoteBox.author)}</>}
      </p>
    </div>
  );

  const renderCalloutBox = (callout: BlogCalloutBox) => (
    <div className="w-full bg-[#FEF8EC] border-l-[5px] border-[#EFBF2F] rounded-[8px] p-4 sm:p-5 my-5">
      <p className="body-text text-body-text font-medium">
        {callout.prefix && <>{renderFormattedText(callout.prefix)} </>}
        {callout.linkText && callout.linkHref ? (
          <Link
            href={callout.linkHref}
            className="text-[#8A6A0B] font-semibold hover:underline transition-colors"
          >
            {callout.linkText}
          </Link>
        ) : null}
        {callout.suffix && <> {renderFormattedText(callout.suffix)}</>}
        {callout.text && renderFormattedText(callout.text)}
      </p>
    </div>
  );

  return (
    <div className={`w-full flex-1 ${v2 ? "article-v2 max-w-none space-y-10" : "max-w-[870px] space-y-10 lg:space-y-12"} text-body-text font-sans`}>
      
      {article.questionCallout && (
        <div
          id={article.questionCallout.id}
          className="w-full bg-[rgba(232,185,44,0.2)] rounded-[15px] flex flex-row items-stretch overflow-hidden gap-4 sm:gap-5 pr-5 sm:pr-8 lg:pr-10 min-h-[69px] my-6 sm:my-8"
        >
          <div className="w-[14px] sm:w-[17px] self-stretch bg-accent rounded-l-[15px] shrink-0" />
          <div className="py-5 sm:py-6 space-y-3 sm:space-y-3.5 flex-1 min-w-0">
            {v2 ? (
              <div className="font-sans text-base font-extrabold uppercase tracking-[0.16em] text-[#8A6A12]">Quick answer</div>
            ) : (
            <h2 className="heading-h2 text-primary">
              Quick Answer:
            </h2>
            )}
            <div className="space-y-2">
              {v2 ? (
                <div className="font-heading text-xl font-bold leading-[29px] text-primary">{article.questionCallout.question}</div>
              ) : (
              <h3 className="heading-h3 font-bold text-primary">
                {article.questionCallout.question}
              </h3>
              )}
              <p className="body-text text-body-text">
                {article.questionCallout.answer}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {article.introParagraphs.map((para, idx) => (
          <p
            key={idx}
            className="body-text"
          >
            {renderFormattedText(para)}
          </p>
        ))}
      </div>

      {article.introImage && (
        <div className={`w-full relative rounded-[20px] overflow-hidden shadow-md my-8 bg-white border border-[#DECDBB]/50 ${!article.introImage.fullWidth && (article.introImage.height ?? 550) > (article.introImage.width ?? 870) ? "max-w-[560px] mx-auto" : ""}`}>
          <Image
            quality={90}
            src={article.introImage.src}
            alt={article.introImage.alt}
            width={article.introImage.width ?? 870}
            height={article.introImage.height ?? 550}
            sizes="(max-width: 870px) 100vw, 870px"
            className="w-full h-auto object-contain rounded-[18px]"
          />
          {article.introImage.caption && (
            <div className="p-3 bg-white text-center border-t border-[#DECDBB]/30">
              <p className="body-small italic text-body-text">
                {article.introImage.caption}
              </p>
            </div>
          )}
        </div>
      )}

      {article.introQuoteBox && renderQuoteBox(article.introQuoteBox)}

      {article.sections.map((sec) => (
        <section key={sec.id} id={sec.id} className="space-y-5 scroll-mt-28">
          {sec.id.includes("doesnt") && (
            <div id={sec.id.replace("doesnt", "doesn't")} className="scroll-mt-28" />
          )}
          <h2 className="heading-h2 text-primary">
            {sec.title}
          </h2>

          {sec.statCards && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              {sec.statCards.map((card) => {
                const v = card.variant;
                return (
                  <div
                    key={card.value}
                    className={`no-measure flex h-full flex-col items-center justify-start gap-2.5 rounded-[20px] p-6 min-h-[168px] text-center sm:items-start sm:text-left ${
                      v === "white" ? "bg-white" : v === "gold" ? "bg-accent/20" : ""
                    }`}
                    style={v === "teal" ? { backgroundImage: "var(--color-gradient)" } : undefined}
                  >
                    <h2
 className={`heading-h2 m-0 ${
 v=== "teal" ? "text-background" : "text-body-text"
 }`}
>
                      {card.value}
                    </h2>
                    <div className="flex w-full flex-col gap-1">
                      <p className={`body-text text-balance ${v === "teal" ? "text-background" : "text-body-text"}`}>
                        {card.label}
                      </p>
                      <p className={`body whitespace-pre-line ${v === "teal" ? "text-background" : "text-body-text"}`}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {sec.paragraphs && (
            <div className="space-y-3">
              {sec.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="body-text"
                >
                  {renderFormattedText(p)}
                </p>
              ))}
            </div>
          )}

          {sec.quoteBox && (!sec.quoteBoxPosition || sec.quoteBoxPosition === "top") && renderQuoteBox(sec.quoteBox)}

          {sec.listItems && (
            <ul className="space-y-2.5 my-3 pl-1">
              {sec.listItems.map((item, liIdx) => {
                const isSubItem =
                  item.trim().startsWith("* ") ||
                  item.trim().startsWith("- ") ||
                  item.startsWith("  ") ||
                  item.startsWith("\t");
                const cleanText = isSubItem
                  ? item.replace(/^[\s*-]+/, "").trim()
                  : item;
                const numberedMatch = !isSubItem
                  ? item.match(/^(\d+)\.\s*(.*)$/)
                  : null;

                if (isSubItem) {
                  return (
                    <li
                      key={liIdx}
                      className="flex items-start gap-2.5 ml-6 sm:ml-8 body-text text-body-text"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D6E72] mt-2 shrink-0" />
                      <span>{renderFormattedText(cleanText)}</span>
                    </li>
                  );
                }

                if (numberedMatch) {
                  return (
                    <li
                      key={liIdx}
                      className="flex items-start gap-2.5 body-text text-body-text"
                    >
                      <span className="font-bold text-[#1D6E72] shrink-0 min-w-[18px]">
                        {numberedMatch[1]}.
                      </span>
                      <span>{renderFormattedText(numberedMatch[2])}</span>
                    </li>
                  );
                }
                return (
                  <li
                    key={liIdx}
                    className="flex items-start gap-2.5 body-text text-body-text"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D6E72] mt-2 shrink-0" />
                    <span>{renderFormattedText(item)}</span>
                  </li>
                );
              })}
            </ul>
          )}

          {sec.afterListParagraphs && (
            <div className="space-y-3">
              {sec.afterListParagraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="body-text"
                >
                  {renderFormattedText(p)}
                </p>
              ))}
            </div>
          )}

          {sec.bannerImage && (!sec.bannerPosition || sec.bannerPosition === "top") && (
            <div className={`w-full relative rounded-[20px] overflow-hidden shadow-md my-8 bg-white border border-[#DECDBB]/50 ${!sec.bannerImage.fullWidth && (sec.bannerImage.height ?? 550) > (sec.bannerImage.width ?? 870) ? "max-w-[560px] mx-auto" : ""}`}>
              {sec.bannerImage.mobileSrc && (
                <Image quality={90} src={sec.bannerImage.mobileSrc} alt={sec.bannerImage.alt}
                  width={sec.bannerImage.mobileWidth ?? 1120} height={sec.bannerImage.mobileHeight ?? 1600}
                  sizes="100vw" className="w-full h-auto object-contain rounded-[18px] sm:hidden" />
              )}
              <Image
            quality={90}
                src={sec.bannerImage.src}
                alt={sec.bannerImage.alt}
                width={sec.bannerImage.width ?? 870}
                height={sec.bannerImage.height ?? 550}
                sizes="(max-width: 870px) 100vw, 870px"
                className={`w-full h-auto object-contain rounded-[18px] ${sec.bannerImage.mobileSrc ? "hidden sm:block" : ""}`}
              />
              {sec.bannerImage.caption && (
                <div className="p-3 bg-white text-center border-t border-[#DECDBB]/30">
                  <p className="text-base italic text-body-text font-medium">
                    {sec.bannerImage.caption}
                  </p>
                </div>
              )}
            </div>
          )}

          {sec.id === "tenant-checklist" && !sec.bannerImage && (
            <div className="w-full relative rounded-[20px] overflow-hidden shadow-md my-8 bg-white border border-[#DECDBB]/50">
              <Image
            quality={90}
                src="/blogs/blogs-tentant-checklist.webp"
                alt="Tenant Checklist: How to Ensure Your ESA Letter Is Legitimate"
                width={870}
          sizes="870px"
                height={1300}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {sec.id === "landlord-checklist" && !sec.bannerImage && (
            <div className="w-full relative rounded-[20px] overflow-hidden shadow-md my-8 bg-white border border-[#DECDBB]/50">
              <Image
            quality={90}
                src="/blogs/blogs-landlord-checklist.webp"
                alt="Landlord Checklist: How to Verify an ESA Letter?"
                width={870}
          sizes="870px"
                height={1300}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {sec.sampleLetter && (
            <div className="w-full my-8 rounded-[20px] bg-white border border-[#DECDBB] shadow-[0px_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="bg-background border-b border-[#DECDBB] px-6 py-3.5 text-base sm:text-base font-sans font-semibold text-body-text">
                {sec.sampleLetter.disclaimer}
              </div>
              <div className="p-6 sm:p-10 font-sans text-base sm:text-base leading-relaxed text-body-text space-y-5">
                <div className="border-b border-[#EAE5DC] pb-4 font-bold text-base sm:text-lg text-[#1D6E72] tracking-wide">
                  {sec.sampleLetter.letterhead}
                </div>
                <div className="text-base sm:text-base text-body-text font-medium">
                  {sec.sampleLetter.date}
                </div>
                <div className="font-semibold text-primary">
                  {sec.sampleLetter.recipient}
                </div>
                <div className="space-y-4">
                  {sec.sampleLetter.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-[26px] sm:leading-[28px] text-body-text">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#EAE5DC] space-y-1">
                  <p className="font-semibold text-body-text">{sec.sampleLetter.closing}</p>
                  {sec.sampleLetter.signoff.map((s, sIdx) => (
                    <p key={sIdx} className="text-base sm:text-base text-body-text font-medium">
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {sec.checklist && (
            <div className="w-full my-8 rounded-[20px] bg-white border border-[#DECDBB] shadow-[0px_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="color-gradient px-6 sm:px-8 py-5 text-white">
                <h3 className="heading-h3 font-heading font-bold text-white">
                  {sec.checklist.title}
                </h3>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                {sec.checklist.items.map((item, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-3.5">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1D6E72]/10 font-bold text-base leading-none text-[#1D6E72] mt-0.5">
                      ✓
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="heading-h4 font-sans font-bold text-primary">
                        {item.title}
                      </h4>
                      <p className="text-base sm:text-base text-body-text font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
                {sec.checklist.footerNote && (
                  <div className="mt-6 pt-4 border-t border-[#EAE5DC] text-base sm:text-base font-medium text-body-text italic">
                    {sec.checklist.footerNote}
                  </div>
                )}
              </div>
            </div>
          )}

          {sec.comparisonTable && (
            <div className="w-full my-8 space-y-4">
              <div className="w-full max-w-[900px] overflow-x-auto rounded-[8px] border border-[#d7dfe2] shadow-[0px_4px_16px_rgba(0,0,0,0.04)] bg-white">
                <table className="w-full border-collapse font-sans text-left">
                  <thead>
                    <tr>
                      <th className="bg-[#134c5f] text-center px-4 sm:px-6 py-4 sm:py-5 border-r border-b border-white/15 w-1/2">
                        <h3 className="heading-h3 font-heading font-normal text-white m-0">
                          {sec.comparisonTable.col1Header}
                        </h3>
                        <span className="block w-9 h-[3px] bg-[#efbf2f] mx-auto mt-2 rounded-[2px]" />
                      </th>
                      <th className="bg-[#134c5f] text-center px-4 sm:px-6 py-4 sm:py-5 border-b border-white/15 w-1/2">
                        <h3 className="heading-h3 font-heading font-normal text-white m-0">
                          {sec.comparisonTable.col2Header}
                        </h3>
                        <span className="block w-9 h-[3px] bg-[#efbf2f] mx-auto mt-2 rounded-[2px]" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.comparisonTable.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 1 ? "bg-[#f5f9fa]" : "bg-white"}
                      >
                        <td className="relative px-4 sm:px-6 py-4 sm:py-[18px] text-base sm:text-base leading-[1.5] text-body-text border border-[#e3e9eb] align-top">
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#efbf2f]" />
                          {row.mayDeny}
                        </td>
                        <td className="px-4 sm:px-6 py-4 sm:py-[18px] text-base sm:text-base leading-[1.5] text-body-text border border-[#e3e9eb] align-top">
                          {row.cannotDeny}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {sec.comparisonTable.keyTakeaway && (
                <div className="p-4 sm:p-5 rounded-[16px] bg-background border border-[#DECDBB] text-base sm:text-base font-medium text-body-text leading-relaxed">
                  <strong className="text-primary">Key takeaway: </strong>
                  {sec.comparisonTable.keyTakeaway}
                </div>
              )}
            </div>
          )}

          {sec.subsections && (
            <div className="space-y-4 pt-2">
              {sec.subsections.map((sub, sIdx) => (
                <div key={sIdx} className="space-y-2">
                  {sub.image && sub.imagePosition === "top" && sub.title && sub.title.trim() ? (
                    <h3 className="flex items-center gap-2 heading-h3 text-primary">
                      <Image
                        quality={90}
                        src={sub.image.src}
                        alt={sub.image.alt}
                        width={sub.image.width || 24}
                        height={sub.image.height || 24}
                        sizes="24px"
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                      />
                      {sub.title}
                    </h3>
                  ) : sub.title && sub.title.trim() ? (
                    <h3 className="heading-h3 text-primary">
                      {sub.title}
                    </h3>
                  ) : null}
                  {sub.paragraphs && (
                    <div className="space-y-2">
                      {sub.paragraphs.map((subP, spIdx) => (
                        <p
                          key={spIdx}
                          className="body-text"
                        >
                          {renderFormattedText(subP)}
                        </p>
                      ))}
                    </div>
                  )}
                  {sub.listItems && (
                    <ul className="space-y-2 my-2.5 pl-1">
                      {sub.listItems.map((item, mIdx) => {
                        const isSubItem =
                          item.trim().startsWith("* ") ||
                          item.trim().startsWith("- ") ||
                          item.startsWith("  ") ||
                          item.startsWith("\t");
                        const cleanText = isSubItem
                          ? item.replace(/^[\s*-]+/, "").trim()
                          : item;
                        const numberedMatch = !isSubItem
                          ? item.match(/^(\d+)\.\s*(.*)$/)
                          : null;

                        if (isSubItem) {
                          return (
                            <li
                              key={mIdx}
                              className="flex items-start gap-2.5 ml-6 sm:ml-8 body-text text-body-text"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1D6E72] mt-2 shrink-0" />
                              <span>{renderFormattedText(cleanText)}</span>
                            </li>
                          );
                        }

                        if (numberedMatch) {
                          return (
                            <li
                              key={mIdx}
                              className="flex items-start gap-2.5 body-text text-body-text"
                            >
                              <span className="font-bold text-[#1D6E72] shrink-0 min-w-[18px]">
                                {numberedMatch[1]}.
                              </span>
                              <span>{renderFormattedText(numberedMatch[2])}</span>
                            </li>
                          );
                        }
                        return (
                          <li
                            key={mIdx}
                            className="flex items-start gap-2.5 body-text text-body-text"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1D6E72] mt-2 shrink-0" />
                            <span>{renderFormattedText(item)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {sub.afterListParagraphs && (
                    <div className="space-y-2">
                      {sub.afterListParagraphs.map((subP, spIdx) => (
                        <p
                          key={spIdx}
                          className="body-text"
                        >
                          {renderFormattedText(subP)}
                        </p>
                      ))}
                    </div>
                  )}
                  {sub.calloutBox && renderCalloutBox(sub.calloutBox)}
                  {sub.image && sub.imagePosition !== "top" && (
                    <div className="w-full relative rounded-[16px] overflow-hidden shadow-xs my-4 bg-white border border-[#DECDBB]/40">
                      <Image
                        quality={90}
                        src={sub.image.src}
                        alt={sub.image.alt}
                        width={870}
          sizes="870px"
                        height={500}
                        className="w-full h-auto object-contain rounded-[14px]"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {sec.afterSubsectionsParagraphs && (
            <div className="space-y-3">
              {sec.afterSubsectionsParagraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="body-text"
                >
                  {renderFormattedText(p)}
                </p>
              ))}
            </div>
          )}

          {sec.calloutBox && renderCalloutBox(sec.calloutBox)}

          {sec.ctaBox && (
            <BlogCtaBanner
              heading={sec.ctaBox.heading}
              description={sec.ctaBox.description}
              buttonText={sec.ctaBox.buttonText}
              buttonHref={sec.ctaBox.buttonHref}
            />
          )}

          {sec.bannerImage && sec.bannerPosition === "bottom" && (
            <div className={`w-full relative rounded-[20px] overflow-hidden shadow-md my-8 bg-white border border-[#DECDBB]/50 ${!sec.bannerImage.fullWidth && (sec.bannerImage.height ?? 550) > (sec.bannerImage.width ?? 870) ? "max-w-[560px] mx-auto" : ""}`}>
              {sec.bannerImage.mobileSrc && (
                <Image quality={90} src={sec.bannerImage.mobileSrc} alt={sec.bannerImage.alt}
                  width={sec.bannerImage.mobileWidth ?? 1120} height={sec.bannerImage.mobileHeight ?? 1600}
                  sizes="100vw" className="w-full h-auto object-contain rounded-[18px] sm:hidden" />
              )}
              <Image
                quality={90}
                src={sec.bannerImage.src}
                alt={sec.bannerImage.alt}
                width={870}
          sizes="870px"
                height={550}
                className={`w-full h-auto object-contain rounded-[18px] ${sec.bannerImage.mobileSrc ? "hidden sm:block" : ""}`}
              />
              {sec.bannerImage.caption && (
                <div className="p-3 bg-white text-center border-t border-[#DECDBB]/30">
                  <p className="body-small italic text-body-text">
                    {sec.bannerImage.caption}
                  </p>
                </div>
              )}
            </div>
          )}

          {sec.quoteBox && sec.quoteBoxPosition === "bottom" && renderQuoteBox(sec.quoteBox)}
        </section>
      ))}

      {article.cta && (
        <BlogCtaBanner
          id={article.cta.id || "request-housing-accommodation"}
          eyebrow="Ready when you are"
          heading={article.cta.heading}
          description={article.cta.description}
          buttonText={article.cta.buttonText}
          buttonHref={article.cta.buttonHref}
        />
      )}

      {article.finalThoughts && (
        <section
          id={article.finalThoughts.id || "final-thoughts"}
          className="space-y-4 scroll-mt-28"
        >
          <h2 className="heading-h2 text-primary">
            {article.finalThoughts.title}
          </h2>
          <div className="space-y-3">
            {article.finalThoughts.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="body-text"
              >
                {renderFormattedText(p)}
              </p>
            ))}
          </div>
        </section>
      )}

      {article.faqs && article.faqs.length > 0 && (
        <div id={article.faqSectionId || "faqs"} className="scroll-mt-28 space-y-6 sm:space-y-8">
          <div id="faq" className="scroll-mt-28" />
          <div id="frequently-asked-questions" className="scroll-mt-28" />
          {v2 ? (
            <div>
              <h2 className="heading-h2 text-primary">Frequently Asked Questions About This ESA Topic</h2>
              <p className="body-text mt-3 text-body-text">{article.faqSectionSubtitle || "Answers from this article about eligibility, housing, and the evaluation."}</p>
              <div className="mt-6 divide-y divide-primary/10 border-y border-primary/10">
                {article.faqs.map((f, i) => (
                  <FaqRow key={i} num={String(i + 1).padStart(2, "0")} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
                ))}
              </div>
            </div>
          ) : (
          <BlogFaqSection
            title="Frequently Asked Questions About This ESA Topic"
            subtitle={
              article.faqSectionSubtitle ||
              "Answers from this article about eligibility, housing, and the evaluation."
            }
            faqs={article.faqs}
          />
          )}
        </div>
      )}

      {article.disclaimer && (
        <section className="scroll-mt-28 rounded-[22px] border border-[#f0e3b8] border-l-[6px] border-l-[#efbf2f] bg-[#fdf6e3] px-6 py-7 sm:px-8 sm:py-8 text-[#134c5f]">
          {article.disclaimer.label && (
            <p className="body-small font-bold uppercase tracking-[1.5px] text-[#b8901a]">
              {article.disclaimer.label}
            </p>
          )}
          <h2 className="heading-h2 mt-1 text-[#082935]">{article.disclaimer.title}</h2>
          <p className="body-text mt-4 text-body-text">{article.disclaimer.intro}</p>
          <ul className="mt-4 space-y-3">
            {article.disclaimer.items.map((item) => (
              <li key={item.title} className="body-text">
                <strong className="font-bold text-[#082935]">{item.title}</strong> {item.text}
              </li>
            ))}
          </ul>
          <p className="body-text mt-5">{renderFormattedText(article.disclaimer.urgent)}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="tel:988" className="inline-flex items-center rounded-full border-2 border-[#efbf2f] bg-[#efbf2f] px-5 py-2 body-small font-bold text-[#134c5f]">
              Call 988
            </a>
            <a href="sms:988" className="inline-flex items-center rounded-full border-2 border-[#082935] px-5 py-2 body-small font-bold text-[#082935]">
              Text 988
            </a>
          </div>
          {article.disclaimer.footer && (
            <p className="body-small mt-4 text-body-text">{renderFormattedText(article.disclaimer.footer)}</p>
          )}
        </section>
      )}

    </div>
  );
}
