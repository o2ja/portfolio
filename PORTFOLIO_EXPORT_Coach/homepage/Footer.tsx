import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import type { CoachProfile, SocialLink } from "@/lib/types";

import { KettlebellMark } from "./LineArt";
import { SocialLinks } from "./SocialLinks";

export function Footer({
  profile,
  socialLinks,
}: {
  profile: CoachProfile | null;
  socialLinks: SocialLink[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-haze/60">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <p className="font-display text-2xl text-ink">{profile?.name || "Coach"}</p>
          {profile?.cta_text && <p className="mt-3 text-ink-soft">{profile.cta_text}</p>}
          <ButtonLink href="/apply" variant="iris" className="mt-6">
            {profile?.cta_label || "Start coaching"}
          </ButtonLink>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-medium text-ink">Site</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-ink-soft">
            {[
              ["/about", "About"],
              ["/services", "Coaching"],
              ["/results", "Results"],
              ["/posts", "Journal"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-iris">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-medium text-ink">Get in touch</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-ink-soft">
            {profile?.email && (
              <li>
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-iris">
                  {profile.email}
                </a>
              </li>
            )}
            {profile?.phone && (
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-iris"
                >
                  {profile.phone}
                </a>
              </li>
            )}
            {profile?.location && <li>{profile.location}</li>}
          </ul>
          <SocialLinks links={socialLinks} className="mt-5" />
        </div>
      </div>

      <div className="shell flex flex-col-reverse items-start justify-between gap-4 border-t border-line py-6 text-sm text-ink-faint sm:flex-row sm:items-center">
        <p>
          © {year} {profile?.name || "Coach"}. All rights reserved.
        </p>
        <KettlebellMark className="h-8 w-auto text-iris-soft" />
      </div>
    </footer>
  );
}
