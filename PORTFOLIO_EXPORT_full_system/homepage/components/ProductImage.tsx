import Image from "next/image";

import { cx, hueFromString } from "@/lib/format";

/**
 * Product imagery.
 *
 * When a product has no image yet, this renders a deliberate, deterministic
 * plate motif derived from the slug rather than a grey box or a stock photo —
 * an empty catalogue should look unfinished, not broken, and the site ships no
 * invented food photography.
 */
const PICS_MAP: Record<string, string> = {
  // Products by slug
  "chicken-bagel": "/pics/Chicken Bagel.jpeg",
  "everything-bagel": "/pics/Everything Bagel.jpeg",
  "smoked-salmon-bagel": "/pics/Smoked Salmon Bagel.jpeg",
  "cinnamon-raisin-bagel": "/pics/Cinnamon Raisin Bagel.jpeg",
  "flat-white": "/pics/Flat White.jpeg",
  "filter-coffee": "/pics/Filter Coffee.jpeg",
  "cold-brew": "/pics/Cold Brew.jpeg",
  "burnt-honey": "/pics/Burnt Honey.jpeg",
  "dark-chocolate-sorbet": "/pics/Dark Chocolate Sorbet.jpeg",
  "eggs-on-sourdough": "/pics/Eggs on Sourdough.jpeg",

  // Products by name
  "chicken bagel": "/pics/Chicken Bagel.jpeg",
  "everything bagel": "/pics/Everything Bagel.jpeg",
  "smoked salmon bagel": "/pics/Smoked Salmon Bagel.jpeg",
  "cinnamon raisin bagel": "/pics/Cinnamon Raisin Bagel.jpeg",
  "flat white": "/pics/Flat White.jpeg",
  "filter coffee": "/pics/Filter Coffee.jpeg",
  "cold brew": "/pics/Cold Brew.jpeg",
  "burnt honey": "/pics/Burnt Honey.jpeg",
  "dark chocolate sorbet": "/pics/Dark Chocolate Sorbet.jpeg",
  "eggs on sourdough": "/pics/Eggs on Sourdough.jpeg",

  // Home hero
  "hero-primary": "/pics/pics for the place.jpeg",
  "hero-secondary": "/pics/Flat White.jpeg",
  "fresh from the counter": "/pics/pics for the place.jpeg",
  "coffee, pulled to order": "/pics/Flat White.jpeg",

  // About page
  "about-one": "/pics/pics for the place 3.jpeg",
  "about-two": "/pics/pics for the place 2.jpeg",
  "the bagel wall": "/pics/pics for the place 3.jpeg",
  "on the counter": "/pics/pics for the place 2.jpeg",
};

export function ProductImage({
  src,
  alt,
  seed,
  priority,
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
  className,
  rounded = true,
}: {
  src: string | null;
  alt: string;
  seed: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: boolean;
}) {
  const shell = cx(
    "relative overflow-hidden bg-sunken",
    rounded && "rounded-md",
    className,
  );

  const resolvedSrc =
    src ||
    PICS_MAP[seed?.toLowerCase()] ||
    PICS_MAP[alt?.toLowerCase()] ||
    null;

  if (resolvedSrc) {
    return (
      <div className={shell}>
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  const hue = hueFromString(seed);

  return (
    <div className={shell}>
      <div
        // Decorative: the product name is already in the adjacent heading.
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `linear-gradient(158deg, hsl(${hue} 34% 96%) 0%, hsl(${hue} 26% 91%) 100%)`,
        }}
      >
        <svg
          viewBox="0 0 200 150"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle
            cx="100"
            cy="75"
            r="44"
            fill="none"
            stroke={`hsl(${hue} 30% 72%)`}
            strokeWidth="0.75"
          />
          <circle
            cx="100"
            cy="75"
            r="31"
            fill="none"
            stroke={`hsl(${hue} 30% 78%)`}
            strokeWidth="0.75"
          />
          <circle cx="100" cy="75" r="15" fill={`hsl(${hue} 28% 88%)`} />
        </svg>
      </div>
    </div>
  );
}
