"use client";

import { useEffect } from "react";

/**
 * Two jobs, one mount, one listener each:
 *  - publishes page scroll progress as `--sy` (0..1) for the line-art drift
 *  - reveals `.reveal` sections once, as they enter the viewport
 *
 * Both are skipped entirely when the visitor prefers reduced motion.
 */
export function MotionRoot() {
  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    if (!motionOk) {
      document.querySelectorAll(".reveal").forEach((el) => el.setAttribute("data-shown", "true"));
      return;
    }

    const root = document.documentElement;
    root.dataset.motion = "on"; // lets the reveal styles apply now that JS is running
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--sy", max > 0 ? (window.scrollY / max).toFixed(4) : "0");
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const watch = () =>
      document
        .querySelectorAll(".reveal:not([data-shown])")
        .forEach((el) => observer.observe(el));
    watch();

    // re-observe after client-side navigation swaps the page content
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      mutations.disconnect();
      if (frame) cancelAnimationFrame(frame);
      delete root.dataset.motion;
    };
  }, []);

  return null;
}
