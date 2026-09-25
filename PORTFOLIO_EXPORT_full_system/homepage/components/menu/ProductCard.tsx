import Link from "next/link";

import { ProductImage } from "@/components/ProductImage";
import { Badge } from "@/components/ui/Section";
import { cx, formatMoney } from "@/lib/format";
import type { ProductSummary } from "@/lib/types";

/**
 * Editorial product card.
 *
 * The name and price sit on one baseline joined by a dotted leader — the
 * printed-menu idiom. It is what stops a grid of these reading as generic
 * SaaS cards, and it scales down to one column cleanly.
 */
export function ProductCard({
  product,
  currency,
  priority,
  className,
}: {
  product: ProductSummary;
  currency: string;
  priority?: boolean;
  className?: string;
}) {
  const unavailable = !product.is_available;

  return (
    <article className={cx("group", className)}>
      <Link
        href={`/menu/${product.slug}`}
        className="block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky"
      >
        <div className="relative">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            seed={product.slug}
            priority={priority}
            className={cx("aspect-4/3 w-full", unavailable && "opacity-55")}
          />

          {product.is_featured && !unavailable ? (
            <div className="absolute left-3 top-3">
              <Badge tone="info">Featured</Badge>
            </div>
          ) : null}

          {unavailable ? (
            <div className="absolute inset-x-3 bottom-3">
              <Badge tone="neutral" className="bg-paper/95">
                Sold out
              </Badge>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <h3 className="font-display text-[1.0625rem] leading-snug tracking-[-0.01em] text-ink">
            {product.name}
          </h3>
          <span className="leader" aria-hidden />
          <span className="tnum shrink-0 text-[0.9375rem] text-ink">
            {formatMoney(product.price, currency)}
          </span>
        </div>

        {product.description ? (
          <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-muted">
            {product.description}
          </p>
        ) : null}
      </Link>
    </article>
  );
}

/** Compact row for dense lists (cart suggestions, related items). */
export function ProductRow({
  product,
  currency,
}: {
  product: ProductSummary;
  currency: string;
}) {
  return (
    <Link
      href={`/menu/${product.slug}`}
      className="group flex items-center gap-4 rounded-sm py-3 transition-colors hover:bg-canvas"
    >
      <ProductImage
        src={product.image_url}
        alt={product.name}
        seed={product.slug}
        sizes="80px"
        className="size-16 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[0.9375rem] text-ink">{product.name}</p>
        {product.description ? (
          <p className="truncate text-xs text-ink-muted">{product.description}</p>
        ) : null}
      </div>
      <span className="tnum shrink-0 text-sm text-ink">
        {formatMoney(product.price, currency)}
      </span>
    </Link>
  );
}
