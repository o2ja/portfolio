"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

import { useCart } from "@/lib/cart";
import { cx } from "@/lib/format";
import type { StoreStatusPublic } from "@/lib/types";
import { Container } from "@/components/ui/Section";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/careers", label: "Careers" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ store }: { store: StoreStatusPublic | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, addPulse } = useCart();
  const [bump, setBump] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // A hairline appears only once the page has moved, so the header sits flat
  // against the hero at rest.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation, and nudge the cart when a line is added.
  // Both adjust state during render on a changed value rather than in an
  // effect, which is React's documented pattern and avoids a cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  const [lastPulse, setLastPulse] = useState(addPulse);
  if (addPulse !== lastPulse) {
    setLastPulse(addPulse);
    setBump(true);
  }

  // Only the timer lives in an effect; setState inside a timeout is fine.
  useEffect(() => {
    if (!bump) return;
    const timer = setTimeout(() => setBump(false), 420);
    return () => clearTimeout(timer);
  }, [bump]);

  // Drawer: lock scroll, trap Escape, and move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    // Captured now: by cleanup time the ref may point elsewhere, and focus
    // must return to the button that opened the drawer.
    const opener = toggleRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cx(
          "sticky top-0 z-40 bg-paper/90 backdrop-blur-sm transition-shadow duration-300",
          scrolled && "shadow-[0_1px_0_0_var(--color-line)]",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
            <Link
              href="/"
              className="group flex shrink-0 items-baseline gap-2"
              aria-label={`${store?.store_name ?? "Home"} — home`}
            >
              <span className="font-display text-[1.375rem] leading-none tracking-[-0.03em] text-ink">
                {store?.store_name ?? "Bagel House"}
              </span>
              <span
                aria-hidden
                className="hidden h-1.5 w-1.5 rounded-full bg-sky transition-colors duration-300 group-hover:bg-sky-deep sm:block"
              />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cx(
                        "relative rounded-xs px-3 py-2 text-sm transition-colors duration-200",
                        isActive(item.href)
                          ? "text-ink"
                          : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cx(
                          "absolute inset-x-3 -bottom-px h-px origin-left bg-ink transition-transform duration-300 ease-out-soft",
                          isActive(item.href) ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/cart"
                className={cx(
                  "relative inline-flex h-10 items-center gap-2 rounded-sm px-3 text-sm text-ink transition-all duration-200 hover:bg-sunken",
                  bump && "scale-105",
                )}
              >
                <ShoppingBag size={18} strokeWidth={1.6} aria-hidden />
                <span className="hidden sm:inline">Cart</span>
                <span
                  className={cx(
                    "tnum inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-medium transition-colors",
                    itemCount > 0 ? "bg-ink text-paper" : "bg-sunken text-ink-subtle",
                  )}
                >
                  {itemCount}
                </span>
                <span className="sr-only">
                  {itemCount === 1 ? "1 item in cart" : `${itemCount} items in cart`}
                </span>
              </Link>

              <Link
                href="/menu"
                className="hidden h-10 items-center rounded-sm bg-ink px-5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-sky-deep sm:inline-flex"
              >
                Order now
              </Link>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink transition-colors hover:bg-sunken lg:hidden"
              >
                <Menu size={20} strokeWidth={1.6} aria-hidden />
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 animate-fade-in bg-ink/35"
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] animate-slide-in-right flex-col bg-paper shadow-overlay"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-5">
              <span className="font-display text-lg text-ink">Menu</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink hover:bg-sunken"
              >
                <X size={20} strokeWidth={1.6} aria-hidden />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-4">
              <ul>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cx(
                        "flex items-center justify-between rounded-sm px-3 py-3 text-[0.9375rem] transition-colors",
                        isActive(item.href)
                          ? "bg-sunken font-medium text-ink"
                          : "text-ink-muted hover:bg-sunken hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-line p-5">
              <Link
                href="/menu"
                className="flex h-12 w-full items-center justify-center rounded-sm bg-ink text-sm font-medium text-paper"
              >
                Order now
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
