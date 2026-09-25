import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { MotionRoot } from "@/components/site/motion";
import { publicApi } from "@/lib/api";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [profile, socialLinks] = await Promise.all([
    publicApi.profile(),
    publicApi.socialLinks(),
  ]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xs focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <MotionRoot />
      <Header profile={profile} socialLinks={socialLinks} />
      <main id="main">{children}</main>
      <Footer profile={profile} socialLinks={socialLinks} />
    </>
  );
}
