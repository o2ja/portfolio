"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/Button";
import type { CoachProfile, SocialLink } from "@/lib/types";

import { SocialLinks } from "./SocialLinks";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Coaching" },
  { href: "/results", label: "Results" },
  { href: "/posts", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  profile,
  socialLinks,
}: {
  profile: CoachProfile | null;
  socialLinks: SocialLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const name = profile?.name || "Coach";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink md:text-2xl"
          style={{ fontVariationSettings: '"SOFT" 30, "WONK" 1' }}
        >
          {name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-[0.95rem] transition-colors ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-iris" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <SocialLinks links={socialLinks} className="hidden xl:flex" iconClass="size-[18px]" />
          <ButtonLink href="/apply" size="sm" className="hidden sm:inline-flex">
            {profile?.cta_label || "Start coaching"}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex size-10 items-center justify-center text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="border-t border-line bg-paper lg:hidden"
        >
          <nav aria-label="Main" className="shell flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/70 py-3.5 text-lg text-ink last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="shell flex flex-wrap items-center justify-between gap-4 pb-6 pt-2">
            <ButtonLink href="/apply" size="md">
              {profile?.cta_label || "Start coaching"}
            </ButtonLink>
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      )}
    </header>
  );
}
