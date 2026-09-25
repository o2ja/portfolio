import type { ReactNode } from "react";

import { cx } from "@/lib/format";

/* ---------------------------------------------------------------------------
   Page rhythm.
   One container width and one vertical rhythm across the whole site, so
   sections line up instead of each inventing their own margin.
   ------------------------------------------------------------------------ */

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  } as const;
  // px-5 is the 16px+ side gutter the layout keeps at phone width.
  return <div className={cx("mx-auto w-full px-5 sm:px-8", widths[size], className)}>{children}</div>;
}

export function Section({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "canvas" | "ink";
  id?: string;
}) {
  const tones = {
    paper: "bg-paper",
    canvas: "bg-canvas",
    ink: "bg-ink text-paper",
  } as const;
  return (
    <section id={id} className={cx("py-16 sm:py-20 lg:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}

/**
 * Section header: a small numbered eyebrow above a serif headline.
 * The numbering gives long pages an editorial spine rather than a stack of
 * interchangeable cards.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  action,
  invert,
}: {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  invert?: boolean;
}) {
  const centered = align === "center";
  return (
    <div
      className={cx(
        "flex flex-col gap-5",
        action && !centered ? "sm:flex-row sm:items-end sm:justify-between" : null,
      )}
    >
      <div className={cx("max-w-2xl", centered && "mx-auto text-center")}>
        {eyebrow ? (
          <p
            className={cx(
              "flex items-center gap-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em]",
              centered && "justify-center",
              invert ? "text-sky" : "text-ink-subtle",
            )}
          >
            {index ? (
              <span className={invert ? "text-paper/40" : "text-line-strong"}>{index}</span>
            ) : null}
            <span className={cx("h-px w-6", invert ? "bg-paper/25" : "bg-line-strong")} aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cx(
            "mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12]",
            invert ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cx(
              "mt-4 text-[0.9375rem] leading-relaxed",
              invert ? "text-paper/70" : "text-ink-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className={cx(centered && "mx-auto")}>{action}</div> : null}
    </div>
  );
}

/** Small uppercase label used for badges and metadata. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink-subtle",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "info" | "positive" | "caution" | "critical";
  className?: string;
}) {
  const tones = {
    neutral: "bg-sunken text-ink-muted",
    info: "bg-sky-tint text-sky-deep",
    positive: "bg-positive-tint text-positive",
    caution: "bg-caution-tint text-caution",
    critical: "bg-critical-tint text-critical",
  } as const;
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-xs px-2 py-0.5 text-[0.6875rem] font-medium tracking-[0.04em] uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
