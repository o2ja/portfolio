"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

import { cx } from "@/lib/format";

/**
 * Scroll-reveal without an animation library.
 *
 * Deliberately no Framer Motion: everything the design calls for — section
 * reveals, hovers, the drawer, the cart — is a CSS transition, and a ~50KB
 * dependency for that would cost more than it returns.
 *
 * Content is only hidden once this component has mounted and confirmed the
 * viewer has not asked for reduced motion, so the page is readable with JS
 * disabled and never traps content in an invisible state.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.style.setProperty("--reveal-delay", `${delay}ms`);
    node.dataset.reveal = "";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Staggers its children's reveal by a fixed step. */
export function RevealGroup({
  children,
  step = 70,
  className,
}: {
  children: ReactNode[];
  step?: number;
  className?: string;
}) {
  return (
    <div className={cx(className)}>
      {children.map((child, index) => (
        <Reveal key={index} delay={index * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
