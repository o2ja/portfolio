import Link from "next/link";
import type { Metadata } from "next";

import { DumbbellLine, Drift, PlateRings } from "@/components/site/LineArt";
import { OfferCard, PostCard, ResultCard, ServiceCard } from "@/components/site/cards";
import { PlainSection, Section } from "@/components/site/Section";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/states";
import { publicApi } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await publicApi.profile();
  return {
    title: profile ? `${profile.name} — strength coaching` : "Strength coaching",
    description: profile?.subheadline || profile?.headline,
    alternates: { canonical: "/" },
  };
}

const STEPS = [
  { title: "Tell me your goals", body: "A short application: what you want, where you train, what your week looks like." },
  { title: "I read every application", body: "No automated funnel. I read it myself and check whether I can genuinely help." },
  { title: "We talk", body: "A call or a message, whichever you prefer, to fill in the gaps and answer your questions." },
  { title: "Choose your format", body: "Online programming or in-person sessions, whichever fits your life right now." },
  { title: "Start training", body: "Your first block lands, and we adjust it together from week one." },
];

export default async function HomePage() {
  const [profile, services, results, posts, offers] = await Promise.all([
    publicApi.profile(),
    publicApi.services(),
    publicApi.results(3),
    publicApi.posts({ limit: 3 }),
    publicApi.offers(),
  ]);

  const featuredOffer = offers.find((o) => o.featured) ?? offers[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <Drift
          y={70}
          rotate={4}
          className="absolute inset-x-0 bottom-[-3rem] -z-10 flex justify-center overflow-hidden"
        >
          <DumbbellLine className="w-[150%] min-w-[64rem] max-w-none text-iris-soft/55" />
        </Drift>

        <div className="shell grid items-end gap-12 pb-16 pt-10 md:grid-cols-[1.15fr_0.85fr] md:pb-24 md:pt-16">
          <div>
            <p className="rule-label">{profile?.location || "Coaching, online and in person"}</p>
            <h1
              className="mt-6 text-[clamp(2.6rem,7vw,5rem)] text-ink"
              style={{ fontVariationSettings: '"SOFT" 24, "WONK" 1, "opsz" 120' }}
            >
              {profile?.headline || "Strength that fits the life you already have."}
            </h1>
            {profile?.subheadline && (
              <p className="mt-7 max-w-[46ch] text-lg text-ink-soft md:text-xl">
                {profile.subheadline}
              </p>
            )}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href="/apply" size="lg">
                {profile?.cta_label || "Start coaching"}
              </ButtonLink>
              <ButtonLink href="/services" variant="outline" size="lg">
                See how coaching works
              </ButtonLink>
            </div>
          </div>

          <figure className="relative">
            {profile?.hero_image_url || profile?.profile_image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.hero_image_url || profile.profile_image_url}
                alt={profile.name}
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center border border-line bg-haze">
                <PlateRings className="w-1/2 text-iris-soft" />
              </div>
            )}
            {profile?.name && (
              <figcaption className="mt-3 text-sm text-ink-faint">
                {profile.name}
                {profile.location ? `, ${profile.location}` : ""}
              </figcaption>
            )}
          </figure>
        </div>
      </section>

      {/* Offer */}
      {featuredOffer && (
        <PlainSection className="shell pt-14 md:pt-20">
          <OfferCard offer={featuredOffer} />
        </PlainSection>
      )}

      {/* Coach intro */}
      <Section
        label="The coach"
        title={profile?.name || "About"}
        aside={
          profile?.credentials?.length ? (
            <ul className="flex flex-col gap-2 text-sm text-ink-soft">
              {profile.credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 h-px w-4 flex-none bg-iris-soft" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          ) : null
        }
      >
        <div className="prose-body text-lg text-ink-soft">
          {(profile?.bio || "").split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {profile?.philosophy && (
          <blockquote className="mt-10 border-l-2 border-iris pl-6 font-display text-2xl leading-snug text-ink md:text-[1.75rem]">
            {profile.philosophy}
          </blockquote>
        )}
        <Link
          href="/about"
          className="mt-8 inline-block border-b border-iris/40 pb-0.5 font-medium text-iris transition-colors hover:border-iris"
        >
          More about how I coach
        </Link>
      </Section>

      {/* Services */}
      <Section
        label="Coaching"
        title="Two ways to work together"
        className="border-y border-line bg-haze/40"
      >
        {services.length === 0 ? (
          <EmptyState
            title="Coaching options are being updated"
            body="Get in touch and I will tell you what is available right now."
            action={<ButtonLink href="/contact" variant="outline" size="sm">Contact me</ButtonLink>}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {services.slice(0, 2).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </Section>

      {/* How it works - a genuine sequence, so it is numbered */}
      <Section label="How it works" title="From application to first session">
        <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col bg-paper p-6">
              <span className="font-display text-3xl text-iris-soft">{i + 1}</span>
              <h3 className="mt-3 text-lg text-ink">{step.title}</h3>
              <p className="mt-1.5 text-[0.95rem] text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Results */}
      {results.length > 0 && (
        <Section
          label="Results"
          title="What training consistently looks like"
          intro="Every story here belongs to someone who trained through a real, busy year."
          className="border-y border-line bg-haze/40"
        >
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {results.map((result) => (
              <ResultCard key={result.id} result={result} />
            ))}
          </div>
          <Link
            href="/results"
            className="mt-8 inline-block border-b border-iris/40 pb-0.5 font-medium text-iris transition-colors hover:border-iris"
          >
            See all results
          </Link>
        </Section>
      )}

      {/* Journal */}
      {posts.length > 0 && (
        <Section label="Journal" title="Training notes">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Link
            href="/posts"
            className="mt-10 inline-block border-b border-iris/40 pb-0.5 font-medium text-iris transition-colors hover:border-iris"
          >
            Read the journal
          </Link>
        </Section>
      )}

      {/* Closing CTA */}
      <PlainSection className="border-t border-line bg-ink text-paper">
        <div className="shell grid gap-8 py-20 md:grid-cols-[1fr_auto] md:items-center md:py-28">
          <div>
            <h2 className="max-w-[18ch] text-[clamp(2rem,4.5vw,3.25rem)] text-paper">
              Ready to train with a plan behind it?
            </h2>
            {profile?.cta_text && (
              <p className="mt-5 max-w-prose text-paper/70">{profile.cta_text}</p>
            )}
          </div>
          <Link
            href="/apply"
            className="inline-flex h-14 items-center justify-center rounded-xs bg-butter px-8 text-lg font-medium text-ink transition-colors hover:bg-paper"
          >
            {profile?.cta_label || "Start coaching"}
          </Link>
        </div>
      </PlainSection>
    </>
  );
}
