import Link from "next/link";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";

import { ProductCard } from "@/components/menu/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/States";
import { api, safe } from "@/lib/api";
import { formatMoney } from "@/lib/format";

export const revalidate = 60;

export default async function HomePage() {
  // One parallel fetch pass; each result degrades on its own if the API is down.
  const [store, location, featured, menu, reviews, jobs] = await Promise.all([
    safe(api.store.status(), null),
    safe(api.store.location(), null),
    safe(api.menu.products({ featured: true, limit: 4 }), []),
    safe(api.menu.full(), { sections: [] }),
    safe(api.reviews.list(3), { items: [], total: 0, summary: { total: 0, average: null, distribution: {} } }),
    safe(api.careers.list(), []),
  ]);

  const currency = store?.currency ?? "USD";
  const name = store?.store_name ?? "Bagel House";
  // Fall back to the first products on the menu if nothing is flagged featured.
  const showcase = featured.length ? featured : menu.sections[0]?.products.slice(0, 4) ?? [];

  return (
    <>
      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <Container className="pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="animate-rise-in">
              <Eyebrow className="flex items-center gap-2.5">
                <span className="h-px w-8 bg-line-strong" aria-hidden />
                Bagels · Coffee · Ice cream
              </Eyebrow>

              <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.25rem)] leading-[1.03] tracking-[-0.035em] text-ink">
                Hand-rolled at dawn,
                <br />
                <span className="italic text-sky-deep">served all day.</span>
              </h1>

              <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ink-muted">
                {store?.tagline ??
                  "A small kitchen with a long proof. We bake bagels each morning, pull coffee to order, and churn ice cream in batches small enough to get right."}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink href="/menu" size="lg">
                  See the menu
                  <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
                </ButtonLink>
                <ButtonLink href="/location" size="lg" variant="secondary">
                  Find us
                </ButtonLink>
              </div>

              {store ? (
                <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-6 text-[0.8125rem] text-ink-muted">
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className={
                        store.accepts_orders
                          ? "size-1.5 rounded-full bg-positive"
                          : "size-1.5 rounded-full bg-caution"
                      }
                    />
                    {store.accepts_orders ? "Taking orders now" : "Not taking orders"}
                  </span>
                  {store.pickup_enabled ? <span>Pickup</span> : null}
                  {store.delivery_enabled ? (
                    <span>
                      Delivery
                      {Number(store.delivery_fee) > 0
                        ? ` · ${formatMoney(store.delivery_fee, currency)}`
                        : " · free"}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </div>

            {/* Asymmetric image composition: one tall plate, one offset square. */}
            <div className="relative hidden lg:block">
              <div className="grid grid-cols-5 gap-4">
                <ProductImage
                  src="/pics/pics for the place.jpeg"
                  alt="Fresh from the counter"
                  seed="hero-primary"
                  priority
                  sizes="420px"
                  className="col-span-3 aspect-3/4"
                />
                <div className="col-span-2 flex flex-col gap-4 pt-12">
                  <ProductImage
                    src="/pics/Flat White.jpeg"
                    alt="Coffee, pulled to order"
                    seed="hero-secondary"
                    sizes="240px"
                    className="aspect-square"
                  />
                  <div className="rounded-md border border-line bg-canvas p-5">
                    <p className="font-display text-3xl leading-none tracking-[-0.02em] text-ink">
                      {reviews.summary.average ? reviews.summary.average.toFixed(1) : "—"}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      {reviews.summary.total > 0
                        ? `Average across ${reviews.summary.total} ${
                            reviews.summary.total === 1 ? "review" : "reviews"
                          }`
                        : "No reviews yet"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ FEATURED */}
      <Section>
        <Container>
          <SectionHeading
            index="01"
            eyebrow="From the counter"
            title="What we are making today"
            description="A rotating handful of what the kitchen is proudest of this week."
            action={
              <Link
                href="/menu"
                className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-sky-deep"
              >
                Full menu
                <ArrowRight
                  size={15}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            }
          />

          <div className="mt-12">
            {showcase.length ? (
              <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {showcase.map((product, index) => (
                  <Reveal key={product.id} delay={index * 70}>
                    <ProductCard product={product} currency={currency} priority={index < 2} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyState
                title="The menu is being written"
                description="Our team is adding dishes right now. Check back shortly."
              />
            )}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- BRAND STORY */}
      <Section tone="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                index="02"
                eyebrow="Our story"
                title={
                  <>
                    Slow dough,
                    <br />
                    small batches
                  </>
                }
              />
              <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                <p>
                  {name} began with one stockpot and a stubborn idea: that a bagel deserves a long,
                  cold proof, and that coffee should be ground the minute it is ordered.
                </p>
                <p>
                  We still work that way. Dough rests overnight. Ice cream is churned in batches
                  small enough that a bad one never leaves the kitchen. Nothing is held over.
                </p>
              </div>
              <div className="mt-8">
                <ButtonLink href="/about" variant="secondary">
                  More about us
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
                {[
                  { term: "Proof time", detail: "18 hours, cold" },
                  { term: "Baked", detail: "Every morning" },
                  { term: "Coffee", detail: "Ground to order" },
                  { term: "Ice cream", detail: "Small batch" },
                ].map((item) => (
                  <div key={item.term} className="bg-paper p-7">
                    <dt className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink-subtle">
                      {item.term}
                    </dt>
                    <dd className="mt-2.5 font-display text-xl tracking-[-0.02em] text-ink">
                      {item.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ CATEGORIES */}
      {menu.sections.length ? (
        <Section>
          <Container>
            <SectionHeading
              index="03"
              eyebrow="The menu"
              title="Browse by counter"
              description="Everything is made in-house. Pick a counter to see what is on it."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {menu.sections.map((section, index) => (
                <Reveal key={section.category.id} delay={index * 60}>
                  <Link
                    href={`/menu?category=${section.category.slug}`}
                    className="group flex h-full flex-col justify-between rounded-md border border-line bg-paper p-6 transition-colors duration-300 hover:border-line-strong hover:bg-canvas"
                  >
                    <div>
                      <h3 className="font-display text-xl tracking-[-0.02em] text-ink">
                        {section.category.name}
                      </h3>
                      {section.category.description ? (
                        <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-ink-muted">
                          {section.category.description}
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-8 inline-flex items-center gap-2 text-[0.8125rem] text-ink-muted">
                      <span className="tnum">{section.products.length}</span>
                      {section.products.length === 1 ? "item" : "items"}
                      <ArrowRight
                        size={14}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------------------------------------------ EXPERIENCE */}
      <Section tone="ink">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="In the room"
            title="A counter worth sitting at"
            description="Marble tops, a long window, and the smell of the morning bake. Come early — the corner table goes fast."
            invert
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Open early", body: "The first tray comes out before most places unlock." },
              { title: "Made to order", body: "Nothing sits under a lamp waiting for you." },
              { title: "Room to stay", body: "Power at every seat, and no one rushing your cup." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="h-full border-t border-paper/15 pt-6">
                  <h3 className="font-display text-lg text-paper">{item.title}</h3>
                  <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-paper/60">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------------- REVIEWS */}
      <Section>
        <Container>
          <SectionHeading
            index="05"
            eyebrow="What people say"
            title="From our guests"
            action={
              reviews.items.length ? (
                <Link
                  href="/reviews"
                  className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-sky-deep"
                >
                  All reviews
                  <ArrowRight
                    size={15}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              ) : undefined
            }
          />

          <div className="mt-12">
            {reviews.items.length ? (
              <div className="grid gap-4 md:grid-cols-3">
                {reviews.items.map((review, index) => (
                  <Reveal key={review.id} delay={index * 70}>
                    <figure className="flex h-full flex-col rounded-md border border-line bg-paper p-6">
                      <div className="flex items-center gap-0.5" aria-hidden>
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={13}
                            strokeWidth={1.5}
                            className={
                              i < review.rating ? "fill-sky text-sky" : "text-line-strong"
                            }
                          />
                        ))}
                      </div>
                      <span className="sr-only">{review.rating} out of 5</span>
                      {review.review_text ? (
                        <blockquote className="mt-4 flex-1 font-display text-[1.0625rem] leading-relaxed tracking-[-0.01em] text-ink">
                          “{review.review_text}”
                        </blockquote>
                      ) : null}
                      <figcaption className="mt-5 text-[0.8125rem] text-ink-subtle">
                        {review.customer_name}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No reviews yet"
                description="Once guests start sharing their visits, their words will appear here."
                action={
                  <ButtonLink href="/reviews" variant="secondary" size="sm">
                    Write the first one
                  </ButtonLink>
                }
              />
            )}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ LOCATION + JOBS */}
      <Section tone="canvas">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-md border border-line bg-paper p-8">
                <Eyebrow>Find us</Eyebrow>
                <h3 className="mt-4 font-display text-2xl tracking-[-0.02em] text-ink">
                  {location?.address_line ?? "Our counter"}
                </h3>
                {location?.city ? (
                  <p className="mt-1.5 text-sm text-ink-muted">
                    {location.city}
                    {location.postal_code ? ` ${location.postal_code}` : ""}
                  </p>
                ) : null}

                <dl className="mt-7 space-y-3 text-[0.8125rem] text-ink-muted">
                  {location?.opening_hours ? (
                    <div className="flex gap-3">
                      <dt className="sr-only">Opening hours</dt>
                      <Clock size={15} strokeWidth={1.7} className="mt-0.5 shrink-0" aria-hidden />
                      <dd className="whitespace-pre-line leading-relaxed">
                        {location.opening_hours}
                      </dd>
                    </div>
                  ) : null}
                  {location?.phone ? (
                    <div className="flex gap-3">
                      <dt className="sr-only">Phone</dt>
                      <MapPin size={15} strokeWidth={1.7} className="mt-0.5 shrink-0" aria-hidden />
                      <dd>
                        <a href={`tel:${location.phone}`} className="hover:text-ink">
                          {location.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-auto pt-8">
                  <ButtonLink href="/location" variant="secondary" size="sm">
                    Directions and hours
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex h-full flex-col rounded-md border border-line bg-paper p-8">
                <Eyebrow>Careers</Eyebrow>
                <h3 className="mt-4 font-display text-2xl tracking-[-0.02em] text-ink">
                  {jobs.length
                    ? `${jobs.length} ${jobs.length === 1 ? "role" : "roles"} open`
                    : "Work with us"}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                  {jobs.length
                    ? "We hire for attitude and teach the rest. Early starts, good coffee, a real team."
                    : "Nothing open right now, but we always want to hear from good people."}
                </p>

                {jobs.length ? (
                  <ul className="mt-6 space-y-px overflow-hidden rounded-sm border border-line">
                    {jobs.slice(0, 3).map((job) => (
                      <li key={job.id}>
                        <Link
                          href={`/careers/${job.slug}`}
                          className="flex items-center justify-between gap-3 bg-paper px-4 py-3 text-sm transition-colors hover:bg-canvas"
                        >
                          <span className="truncate text-ink">{job.title}</span>
                          <span className="shrink-0 text-xs text-ink-subtle">
                            {job.location ?? "On site"}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-auto pt-8">
                  <ButtonLink href="/careers" variant="secondary" size="sm">
                    {jobs.length ? "See all openings" : "Careers"}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ FINAL CTA */}
      <Section className="border-t border-line">
        <Container size="narrow">
          <Reveal className="text-center">
            <h2 className="text-[clamp(2rem,5vw,3rem)] leading-[1.08] tracking-[-0.03em] text-ink">
              Come hungry.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
              Order ahead for pickup, or let us bring it over. Either way it leaves the kitchen
              the minute it is ready.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/menu" size="lg">
                Start an order
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="secondary">
                Get in touch
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
