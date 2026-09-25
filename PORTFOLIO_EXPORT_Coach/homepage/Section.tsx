import type { ReactNode } from "react";

/**
 * Editorial section frame: a hairline-ruled label in the left column, content on
 * the right. Every public section uses it, which is what keeps the page rhythm.
 */
export function Section({
  label,
  title,
  intro,
  aside,
  children,
  className = "",
  id,
}: {
  label?: string;
  title?: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`reveal shell py-16 md:py-24 ${className}`}>
      <div className="grid gap-x-12 gap-y-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <div className="md:sticky md:top-28 md:self-start">
          {label && <p className="rule-label">{label}</p>}
          {title && (
            <h2 className="mt-4 text-3xl text-ink md:text-[2.5rem] md:leading-[1.05]">{title}</h2>
          )}
          {aside && <div className="mt-6 hidden md:block">{aside}</div>}
        </div>
        <div>
          {intro && <div className="prose-body mb-10 text-lg text-ink-soft">{intro}</div>}
          {children}
        </div>
      </div>
    </section>
  );
}

/** Full-bleed section for content that should not sit in the two-column frame. */
export function PlainSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`reveal ${className}`}>
      {children}
    </section>
  );
}
