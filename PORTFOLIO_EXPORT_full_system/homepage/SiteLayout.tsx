import { api, safe } from "@/lib/api";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StoreStatusBanner } from "@/components/site/StoreStatusBanner";

/**
 * Chrome for every public page.
 *
 * Store status and location are fetched once here and passed down, so the
 * header, banner and footer do not each make their own request. `safe()` means
 * a backend outage degrades the chrome to sensible defaults instead of
 * blanking the site.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [store, location] = await Promise.all([
    safe(api.store.status(), null),
    safe(api.store.location(), null),
  ]);

  return (
    <div className="flex min-h-dvh flex-col">
      <StoreStatusBanner store={store} />
      <SiteHeader store={store} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter store={store} location={location} />
    </div>
  );
}
