import Link from "next/link";

import { Container } from "@/components/ui/Section";
import type { StoreLocation, StoreStatusPublic } from "@/lib/types";

const COLUMNS = [
  {
    heading: "Order",
    links: [
      { href: "/menu", label: "Menu" },
      { href: "/cart", label: "Cart" },
      { href: "/location", label: "Find us" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/reviews", label: "Reviews" },
    ],
  },
  {
    heading: "Help",
    links: [{ href: "/contact", label: "Contact" }],
  },
] as const;

export function SiteFooter({
  store,
  location,
}: {
  store: StoreStatusPublic | null;
  location: StoreLocation | null;
}) {
  const year = new Date().getFullYear();
  const name = store?.store_name ?? "Bagel House";

  return (
    <footer className="border-t border-line bg-canvas">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <p className="font-display text-xl tracking-[-0.02em] text-ink">{name}</p>
            {store?.tagline ? (
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{store.tagline}</p>
            ) : null}

            {location?.address_line ? (
              <address className="mt-5 text-sm not-italic leading-relaxed text-ink-muted">
                {location.address_line}
                {location.city ? (
                  <>
                    <br />
                    {location.city}
                    {location.postal_code ? ` ${location.postal_code}` : ""}
                  </>
                ) : null}
              </address>
            ) : null}
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink-subtle">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-subtle">
            © {year} {name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-subtle">
            {location?.phone ? (
              <a href={`tel:${location.phone}`} className="transition-colors hover:text-ink">
                {location.phone}
              </a>
            ) : null}
            {location?.email ? (
              <a href={`mailto:${location.email}`} className="transition-colors hover:text-ink">
                {location.email}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  );
}
