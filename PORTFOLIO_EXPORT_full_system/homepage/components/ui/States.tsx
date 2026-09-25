import type { ReactNode } from "react";

import { cx } from "@/lib/format";

/* ---------------------------------------------------------------------------
   Loading, empty and error states.
   Every list and async region in the app uses these three, so the same
   situation never looks different in two places.
   ------------------------------------------------------------------------ */

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cx("skeleton rounded-sm", className)} />;
}

/**
 * Announces a loading region to assistive tech without visual noise.
 * Pair with skeletons, which are aria-hidden.
 */
export function LoadingRegion({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-4/3 w-full" />
      <Skeleton className="h-4 w-3/5" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col items-center justify-center rounded-md border border-dashed border-line-strong",
        "bg-canvas px-6 py-14 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-4 text-ink-subtle">{icon}</div> : null}
      <p className="font-display text-xl text-ink">{title}</p>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We could not load this just now. Please try again in a moment.",
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cx(
        "rounded-md border border-critical/25 bg-critical-tint px-6 py-8 text-center",
        className,
      )}
    >
      <p className="font-display text-lg text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

/** Inline form-level error. `role="alert"` so submission failures are announced. */
export function FormError({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-sm border border-critical/25 bg-critical-tint px-3 py-2.5 text-sm text-critical"
    >
      {message}
    </p>
  );
}

export function SuccessNote({ children }: { children: ReactNode }) {
  return (
    <p
      role="status"
      className="rounded-sm border border-positive/25 bg-positive-tint px-3 py-2.5 text-sm text-positive"
    >
      {children}
    </p>
  );
}
