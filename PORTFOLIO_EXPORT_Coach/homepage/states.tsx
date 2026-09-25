import type { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2 border border-dashed border-line bg-haze/50 px-6 py-10">
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="max-w-prose text-ink-soft">{body}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 border border-red-200 bg-red-50/70 px-6 py-8"
    >
      <p className="font-display text-xl text-ink">That did not load</p>
      <p className="max-w-prose text-ink-soft">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm font-medium text-iris underline underline-offset-4 hover:text-iris-deep"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xs bg-haze-deep ${className}`} aria-hidden="true" />;
}

export function SkeletonRows({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}

export function LoadingLabel({ label = "Loading" }: { label?: string }) {
  return (
    <p className="py-8 text-sm text-ink-faint" role="status">
      {label}…
    </p>
  );
}
