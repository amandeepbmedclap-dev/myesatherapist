"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { isEvaluationCtaLabel, openStateSelectModal, type StateModalLetter } from "@/components/common/evaluationCta";
import { playCtaClick } from "@/components/common/ctaMotion";
import { ArrowRight } from "lucide-react";
import { ctaLabel } from "@/components/common/ctaCopy";

export function SendIcon({ className = "w-[22px] h-[22px]" }: { className?: string }) {
  return (
    <Image quality={90}
      src="/common/send-icon.svg"
      alt=""
      width={22}
          sizes="22px"
      height={22}
      unoptimized
      className={`object-contain ${className}`}
    />
  );
}

const SUPPORTING = /^(view profile|view source|see more reviews|learn about esa|about esa therapist|read the guide|view all 50 states|check your state law|back to home)$/i;

export interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  wrap?: boolean;
  centerLabel?: boolean;
  variant?: "primary" | "secondary" | "accent";
  stateModal?: boolean;
  forceStateModal?: boolean;
  letter?: StateModalLetter;
}

export function CtaButton({
  href,
  target,
  rel,
  children = "Get Started",
  className = "",
  iconClassName = "",
  showIcon,
  wrap = false,
  centerLabel = false,
  variant,
  stateModal,
  forceStateModal = false,
  letter,
  onClick,
  disabled,
  type = "button",
  ...rest
}: CtaButtonProps) {
  const label = typeof children === "string" ? children : "";
  const opensModal =
    forceStateModal ||
    stateModal === true ||
    (stateModal !== false && type !== "submit" && isEvaluationCtaLabel(label));
  const resolvedHref = opensModal ? undefined : href;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    playCtaClick(event);
    if (opensModal) {
      event.preventDefault();
      openStateSelectModal(letter, { force: forceStateModal });
    }
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
  };
  // Only conversion actions get the gold button; supporting links (View Profile,
  // See More Reviews, Read the Guide) use the quieter outline style.
  const shownText = typeof children === "string" ? ctaLabel(children, letter) : "";
  const supporting = !opensModal && SUPPORTING.test(shownText.trim());
  const resolvedVariant = variant === "secondary" || variant === "primary" ? variant : supporting ? "secondary" : "accent";
  const isSecondary = resolvedVariant === "secondary";
  const shouldShowIcon = showIcon !== undefined ? showIcon : !isSecondary;
  const tone = isSecondary ? "cta3d--outline" : resolvedVariant === "primary" ? "cta3d--teal" : "cta3d--gold";

  // Fixed pixel widths from older layouts are dropped so the button fits its label.
  className = className.replace(/(^|\s)!?(?:[a-z0-9]+:)*w-\[\d+px\]/g, " ");
  const hasExplicitWidth = /\bw-\[\S+\]|\bw-full|\bw-auto|\bw-fit\b|\bmin-w-\[\S+\]/.test(className);
  const defaultWidthClass = hasExplicitWidth ? "" : "w-auto";
  const heightClass = wrap ? "h-auto min-h-[54px] py-2" : "h-[54px]";
  const baseClasses = `cta3d ${tone} inline-flex items-center justify-center ${heightClass} px-6 xl:px-7 gap-2.5 text-[16px] leading-tight cursor-pointer select-none shrink-0 ${defaultWidthClass} ${className}`;

  const shown = typeof children === "string" ? ctaLabel(children, letter) : children;
  const trackLabel = typeof shown === "string" ? shown : undefined;

  const content = (
    <>
      <span className={wrap ? "min-w-0 whitespace-normal text-center text-inherit" : "whitespace-nowrap text-inherit"}>{shown}</span>
      {shouldShowIcon && (
        <span className="cta-icon flex shrink-0 items-center justify-center">
          <ArrowRight aria-hidden strokeWidth={2.5} className={`cta-arrow size-[18px] ${iconClassName}`} />
        </span>
      )}
    </>
  );

  if (resolvedHref) {
    const isInternal = resolvedHref.startsWith("/") || resolvedHref.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={resolvedHref}
          target={target}
          rel={rel}
          className={baseClasses}
          data-event="cta_click"
          data-event-label={trackLabel}
          onClick={handleClick as any}
        >
          {content}
        </Link>
      );
    }
    return (
      <a
        href={resolvedHref}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={baseClasses}
        data-event="cta_click"
        data-event-label={trackLabel}
        onClick={handleClick as any}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      data-event="cta_click"
      data-event-label={trackLabel}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
}
