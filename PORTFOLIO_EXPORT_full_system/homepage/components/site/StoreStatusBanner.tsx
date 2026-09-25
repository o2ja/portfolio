import { Info } from "lucide-react";

import { Container } from "@/components/ui/Section";
import type { StoreStatusPublic } from "@/lib/types";

/**
 * Shown site-wide whenever the backend reports the store is not taking orders.
 *
 * This is a notice, not a gate: browsing stays open, and the backend is what
 * actually refuses an order. The banner exists so the refusal is never a
 * surprise at the end of checkout.
 */
export function StoreStatusBanner({ store }: { store: StoreStatusPublic | null }) {
  if (!store || store.accepts_orders) return null;

  const headline =
    store.status === "TEMPORARILY_PAUSED"
      ? "We have paused new orders for a moment"
      : "We are closed right now";

  return (
    <div role="status" className="border-b border-caution/25 bg-caution-tint">
      <Container>
        <div className="flex items-start gap-3 py-2.5 sm:items-center">
          <Info size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-caution sm:mt-0" aria-hidden />
          <p className="text-[0.8125rem] leading-relaxed text-caution">
            <span className="font-medium">{headline}.</span>{" "}
            {store.reopening_message
              ? store.reopening_message
              : "You can still browse the menu — ordering will reopen shortly."}
          </p>
        </div>
      </Container>
    </div>
  );
}
