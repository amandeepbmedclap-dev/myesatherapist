import React from "react";
import { BadgeCheck, Lock, Mail, Phone, Stethoscope } from "lucide-react";

/** Thin utility strip above the header (desktop only). */
export function TopBanner() {
  const items = [
    { icon: Lock, text: "HIPAA-compliant telehealth" },
    { icon: Stethoscope, text: "Licensed mental health professionals" },
    { icon: BadgeCheck, text: "100% money-back guarantee" },
  ];
  return (
    <div className="relative z-50 hidden h-9 w-full bg-[#1A3D4F] text-[14px]! text-white/85 lg:block">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-8 xl:px-[80px]">
        <ul className="flex items-center gap-6">
          {items.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-[14px]! leading-none">
              <Icon aria-hidden className="size-[15px] text-accent" />
              <span className="text-[14px]! text-white/85">{text}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          <a href="tel:+18884124041" className="flex items-center gap-2 text-[14px]! font-semibold hover:text-accent">
            <Phone aria-hidden className="size-[15px] text-accent" /> +1 (888) 412-4041
          </a>
          <a href="mailto:info@myesatherapist.com" className="hidden items-center gap-2 text-[14px]! font-semibold hover:text-accent xl:flex">
            <Mail aria-hidden className="size-[15px] text-accent" /> info@myesatherapist.com
          </a>
        </div>
      </div>
    </div>
  );
}
