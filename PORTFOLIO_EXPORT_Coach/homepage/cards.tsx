import Link from "next/link";

import { coachingTypeLabel, formatDate, goalLabel, postTypeLabel } from "@/lib/labels";
import type { Offer, Post, Result, Service } from "@/lib/types";

/** Shared image slot: uses a real image when the coach has uploaded one, line-art when not. */
function ImageSlot({
  src,
  alt,
  ratio = "aspect-[4/3]",
  children,
}: {
  src?: string;
  alt: string;
  ratio?: string;
  children?: React.ReactNode;
}) {
  if (src) {
    return (
      <div className={`${ratio} overflow-hidden bg-haze`}>
        {/* Admin-supplied URLs from any host: plain <img> avoids a remotePatterns allowlist. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`${ratio} flex items-center justify-center overflow-hidden bg-haze`}>
      {children}
    </div>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper p-7 transition-colors hover:border-iris-soft">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl text-ink">{service.title}</h3>
        {service.featured && (
          <span className="mt-1 flex-none bg-butter px-2 py-0.5 text-xs text-ink">
            Most popular
          </span>
        )}
      </div>
      <p className="mt-3 text-ink-soft">{service.short_description}</p>

      {service.features.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2.5 text-[0.95rem] text-ink-soft">
          {service.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 h-px w-4 flex-none bg-iris-soft" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-5 text-sm">
        {service.duration && (
          <div>
            <dt className="text-ink-faint">Format</dt>
            <dd className="mt-0.5 text-ink">{service.duration}</dd>
          </div>
        )}
        <div>
          <dt className="text-ink-faint">Price</dt>
          <dd className="mt-0.5 text-ink">{service.price || "Contact for pricing"}</dd>
        </div>
      </dl>

      <Link
        href={`/services/${service.slug}`}
        className="mt-6 self-start border-b border-iris/40 pb-0.5 text-[0.95rem] font-medium text-iris transition-colors hover:border-iris"
      >
        Read what is included
      </Link>
    </article>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/posts/${post.slug}`} className="focus-visible:outline-offset-4">
        <ImageSlot src={post.cover_image_url} alt="" ratio="aspect-[16/10]">
          <svg viewBox="0 0 120 80" className="h-16 text-iris-soft" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M10 40h100M22 26h12v28H22zM86 26h12v28H86zM4 33h10v14H4zM106 33h10v14h-10z" />
          </svg>
        </ImageSlot>
        <div className="mt-5 flex items-center gap-3 text-sm text-ink-faint">
          <span className="text-iris">{postTypeLabel[post.type]}</span>
          <span aria-hidden="true" className="h-px w-4 bg-line" />
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
        </div>
        <h3 className="mt-2 text-xl text-ink transition-colors group-hover:text-iris">
          {post.title}
        </h3>
      </Link>
      {post.excerpt && <p className="mt-2 text-ink-soft">{post.excerpt}</p>}
    </article>
  );
}

export function ResultCard({ result }: { result: Result }) {
  const hasImages = Boolean(result.before_image_url || result.after_image_url);
  return (
    <article className="flex flex-col border border-line bg-paper">
      {hasImages ? (
        <div className="grid grid-cols-2">
          <figure className="relative">
            <ImageSlot src={result.before_image_url} alt={`${result.title}, before`} />
            <figcaption className="absolute bottom-2 left-2 bg-paper/90 px-2 py-0.5 text-xs text-ink">
              Before
            </figcaption>
          </figure>
          <figure className="relative border-l border-line">
            <ImageSlot src={result.after_image_url} alt={`${result.title}, after`} />
            <figcaption className="absolute bottom-2 left-2 bg-paper/90 px-2 py-0.5 text-xs text-ink">
              After
            </figcaption>
          </figure>
        </div>
      ) : (
        <ImageSlot alt="" ratio="aspect-[2/1]">
          <svg viewBox="0 0 200 100" className="h-20 text-iris-soft" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M20 70c25-40 45 10 70-25s45 15 70-20" />
            <circle cx="20" cy="70" r="3" />
            <circle cx="160" cy="25" r="3" />
          </svg>
        </ImageSlot>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
          {result.goal && <span className="text-iris">{goalLabel[result.goal]}</span>}
          {result.goal && result.duration && (
            <span aria-hidden="true" className="h-px w-4 bg-line" />
          )}
          {result.duration && <span>{result.duration}</span>}
        </div>
        <h3 className="mt-2 text-xl text-ink">{result.title}</h3>
        {result.story && (
          <p className="prose-body mt-3 whitespace-pre-line text-ink-soft">{result.story}</p>
        )}
      </div>
    </article>
  );
}

export function OfferCard({ offer, compact = false }: { offer: Offer; compact?: boolean }) {
  return (
    <article
      className={`flex flex-col justify-between gap-6 border border-butter bg-butter-soft p-7 ${
        compact ? "" : "md:flex-row md:items-center md:gap-10 md:p-9"
      }`}
    >
      <div>
        {offer.discount_label && (
          <p className="mb-2 inline-block bg-butter px-2 py-0.5 text-sm text-ink">
            {offer.discount_label}
          </p>
        )}
        <h3 className="text-2xl text-ink">{offer.title}</h3>
        {offer.description && <p className="mt-2 max-w-prose text-ink-soft">{offer.description}</p>}
        {offer.ends_at && (
          <p className="mt-3 text-sm text-ink-faint">Open until {formatDate(offer.ends_at)}</p>
        )}
      </div>
      <Link
        href={offer.cta_url || "/apply"}
        className="inline-flex h-11 flex-none items-center justify-center rounded-xs bg-ink px-5 text-[0.95rem] font-medium text-paper transition-colors hover:bg-iris-deep"
      >
        {offer.cta_label || "Apply now"}
      </Link>
    </article>
  );
}

export function ServiceTypeTag({ type }: { type: Service["coaching_type"] }) {
  if (!type) return null;
  return <span className="text-sm text-iris">{coachingTypeLabel[type]}</span>;
}
