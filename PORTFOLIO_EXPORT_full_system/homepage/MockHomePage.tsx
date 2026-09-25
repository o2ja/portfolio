"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Menu, ShoppingBag, Star, X } from "lucide-react";

import {
  mockStore,
  mockLocation,
  mockFeaturedProducts,
  mockMenuResponse,
  mockReviewsResponse,
  mockJobs,
} from "./mockData";
import { ProductCard } from "./components/menu/ProductCard";
import { ProductImage } from "./components/ProductImage";
import { ButtonLink } from "./components/ui/Button";
import { Reveal } from "./components/ui/Reveal";
import { Container, Eyebrow, Section, SectionHeading } from "./components/ui/Section";
import { StoreStatusBanner } from "./components/site/StoreStatusBanner";
import { SiteFooter } from "./components/site/SiteFooter";
import { formatMoney } from "./lib/format";
import { CartProvider, useCart } from "./lib/cart";

/**
 * Self-contained, client-ready Miniature Mock Homepage.
 *
 * Perfect for 3D portfolio carousels, embedded preview cards, or miniature iframes.
 * Pre-populated with the exact Bagel House mock fixtures so no database or
 * FastAPI server is needed.
 */

function MockHeader() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  const NAV = [
    { href: "#menu", label: "Menu" },
    { href: "#story", label: "About" },
    { href: "#reviews", label: "Reviews" },
    { href: "#careers", label: "Careers" },
    { href: "#location", label: "Location" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm border-b border-line transition-shadow duration-300">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <a href="#" className="group flex shrink-0 items-baseline gap-2">
            <span className="font-display text-[1.375rem] leading-none tracking-[-0.03em] text-ink">
              {mockStore.store_name}
            </span>
            <span
              aria-hidden
              className="hidden h-1.5 w-1.5 rounded-full bg-sky transition-colors duration-300 group-hover:bg-sky-deep sm:block"
            />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative rounded-xs px-3 py-2 text-sm text-ink-muted hover:text-ink transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="relative inline-flex h-10 items-center gap-2 rounded-sm px-3 text-sm text-ink transition-all duration-200 hover:bg-sunken cursor-pointer">
              <ShoppingBag size={18} strokeWidth={1.6} aria-hidden />
              <span className="hidden sm:inline">Cart</span>
              <span className="tnum inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-medium bg-ink text-paper">
                {itemCount}
              </span>
            </div>

            <a
              href="#menu"
              className="hidden h-10 items-center rounded-sm bg-ink px-5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-sky-deep sm:inline-flex"
            >
              Order now
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink transition-colors hover:bg-sunken lg:hidden"
            >
              <Menu size={20} strokeWidth={1.6} aria-hidden />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/35 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] animate-slide-in-right flex-col bg-paper shadow-overlay">
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <span className="font-display text-lg text-ink">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink hover:bg-sunken"
              >
                <X size={20} strokeWidth={1.6} aria-hidden />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-4">
              <ul>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-sm px-3 py-3 text-[0.9375rem] text-ink-muted hover:bg-sunken hover:text-ink transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function MockHomePageView() {
  const store = mockStore;
  const location = mockLocation;
  const showcase = mockFeaturedProducts;
  const menu = mockMenuResponse;
  const reviews = mockReviewsResponse;
  const jobs = mockJobs;
  const currency = store.currency;
  const name = store.store_name;

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-sky-tint selection:text-ink">
      <StoreStatusBanner store={store} />
      <MockHeader />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-line">
          <Container className="pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
              <div className="animate-rise-in">
                <Eyebrow className="flex items-center gap-2.5">
                  <span className="h-px w-8 bg-line-strong" aria-hidden />
                  Bagels · Coffee · Ice cream
                </Eyebrow>

                <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.25rem)] leading-[1.03] tracking-[-0.035em] text-ink font-display">
                  Hand-rolled at dawn,
                  <br />
                  <span className="italic text-sky-deep">served all day.</span>
                </h1>

                <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ink-muted">
                  {store.tagline}
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <ButtonLink href="#menu" size="lg">
                    See the menu
                    <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
                  </ButtonLink>
                  <ButtonLink href="#location" size="lg" variant="secondary">
                    Find us
                  </ButtonLink>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-6 text-[0.8125rem] text-ink-muted">
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden className="size-1.5 rounded-full bg-positive" />
                    Taking orders now
                  </span>
                  <span>Pickup</span>
                  <span>Delivery · {formatMoney(store.delivery_fee, currency)}</span>
                </div>
              </div>

              {/* Dual image composition */}
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
                        Average across {reviews.summary.total} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FEATURED SECTION */}
        <Section id="menu">
          <Container>
            <SectionHeading
              index="01"
              eyebrow="From the counter"
              title="What we are making today"
              description="A rotating handful of what the kitchen is proudest of this week."
              action={
                <a
                  href="#menu"
                  className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-sky-deep"
                >
                  Full menu
                  <ArrowRight
                    size={15}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
              }
            />

            <div className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {showcase.map((product, index) => (
                <Reveal key={product.id} delay={index * 70}>
                  <ProductCard product={product} currency={currency} priority={index < 2} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* BRAND STORY */}
        <Section id="story" tone="canvas">
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
                  <ButtonLink href="#story" variant="secondary">
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

        {/* CATEGORIES */}
        <Section>
          <Container>
            <SectionHeading
              index="03"
              eyebrow="The menu"
              title="Browse by counter"
              description="Everything is made in-house. Pick a counter to see what is on it."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {menu.sections.map((section, index) => (
                <Reveal key={section.category.id} delay={index * 60}>
                  <div className="group flex h-full flex-col justify-between rounded-md border border-line bg-paper p-6 transition-colors duration-300 hover:border-line-strong hover:bg-canvas">
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
                      <span className="tnum">{section.products.length}</span> items
                      <ArrowRight
                        size={14}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* EXPERIENCE IN THE ROOM */}
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

        {/* REVIEWS */}
        <Section id="reviews">
          <Container>
            <SectionHeading
              index="05"
              eyebrow="What people say"
              title="From our guests"
            />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {reviews.items.map((review, index) => (
                <Reveal key={review.id} delay={index * 70}>
                  <figure className="flex h-full flex-col rounded-md border border-line bg-paper p-6">
                    <div className="flex items-center gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={13}
                          strokeWidth={1.5}
                          className={i < review.rating ? "fill-sky text-sky" : "text-line-strong"}
                        />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 font-display text-[1.0625rem] leading-relaxed tracking-[-0.01em] text-ink">
                      “{review.review_text}”
                    </blockquote>
                    <figcaption className="mt-5 text-[0.8125rem] text-ink-subtle">
                      {review.customer_name}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* LOCATION & CAREERS */}
        <Section id="location" tone="canvas">
          <Container>
            <div className="grid gap-4 lg:grid-cols-2">
              <Reveal>
                <div className="flex h-full flex-col rounded-md border border-line bg-paper p-8">
                  <Eyebrow>Find us</Eyebrow>
                  <h3 className="mt-4 font-display text-2xl tracking-[-0.02em] text-ink">
                    {location.address_line}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-muted">
                    {location.city} {location.postal_code}
                  </p>

                  <dl className="mt-7 space-y-3 text-[0.8125rem] text-ink-muted">
                    <div className="flex gap-3">
                      <Clock size={15} strokeWidth={1.7} className="mt-0.5 shrink-0" aria-hidden />
                      <dd className="whitespace-pre-line leading-relaxed">{location.opening_hours}</dd>
                    </div>
                    <div className="flex gap-3">
                      <MapPin size={15} strokeWidth={1.7} className="mt-0.5 shrink-0" aria-hidden />
                      <dd>{location.phone}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div id="careers" className="flex h-full flex-col rounded-md border border-line bg-paper p-8">
                  <Eyebrow>Careers</Eyebrow>
                  <h3 className="mt-4 font-display text-2xl tracking-[-0.02em] text-ink">
                    {jobs.length} roles open
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
                    We hire for attitude and teach the rest. Early starts, good coffee, a real team.
                  </p>

                  <ul className="mt-6 space-y-px overflow-hidden rounded-sm border border-line">
                    {jobs.map((job) => (
                      <li key={job.id} className="flex items-center justify-between gap-3 bg-paper px-4 py-3 text-sm">
                        <span className="truncate text-ink">{job.title}</span>
                        <span className="shrink-0 text-xs text-ink-subtle">{job.location}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* FINAL CTA */}
        <Section id="contact" className="border-t border-line">
          <Container size="narrow">
            <Reveal className="text-center">
              <h2 className="text-[clamp(2rem,5vw,3rem)] leading-[1.08] tracking-[-0.03em] text-ink font-display">
                Come hungry.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
                Order ahead for pickup, or let us bring it over. Either way it leaves the kitchen
                the minute it is ready.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <ButtonLink href="#menu" size="lg">
                  Start an order
                  <ArrowRight size={16} strokeWidth={1.8} aria-hidden />
                </ButtonLink>
                <ButtonLink href="#contact" size="lg" variant="secondary">
                  Get in touch
                </ButtonLink>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>

      <SiteFooter store={store} location={location} />
    </div>
  );
}

export default function MockHomePage() {
  return (
    <CartProvider>
      <MockHomePageView />
    </CartProvider>
  );
}
