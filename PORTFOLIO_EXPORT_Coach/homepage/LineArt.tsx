/**
 * The site's fitness line-art: thin, low-contrast strokes that draw themselves once
 * and drift slowly with `--sy` (page scroll progress, published by MotionRoot).
 */

type Drawn = { delay?: number; className?: string };

function drawProps(delay = 0) {
  return {
    pathLength: 1,
    className: "draw-path",
    style: { animationDelay: `${delay}s` },
    vectorEffect: "non-scaling-stroke" as const,
  };
}

/** Hero mark: a full dumbbell drawn as one thin continuous outline. */
export function DumbbellLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 880 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M186 160h508" {...drawProps(0.1)} />
      <path d="M150 108h34a6 6 0 0 1 6 6v92a6 6 0 0 1-6 6h-34a6 6 0 0 1-6-6v-92a6 6 0 0 1 6-6Z" {...drawProps(0.35)} />
      <path d="M96 74h40a8 8 0 0 1 8 8v156a8 8 0 0 1-8 8H96a8 8 0 0 1-8-8V82a8 8 0 0 1 8-8Z" {...drawProps(0.55)} />
      <path d="M62 116h22a5 5 0 0 1 5 5v78a5 5 0 0 1-5 5H62a5 5 0 0 1-5-5v-78a5 5 0 0 1 5-5Z" {...drawProps(0.75)} />
      <path d="M696 108h34a6 6 0 0 1 6 6v92a6 6 0 0 1-6 6h-34a6 6 0 0 1-6-6v-92a6 6 0 0 1 6-6Z" {...drawProps(0.35)} />
      <path d="M744 74h40a8 8 0 0 1 8 8v156a8 8 0 0 1-8 8h-40a8 8 0 0 1-8-8V82a8 8 0 0 1 8-8Z" {...drawProps(0.55)} />
      <path d="M796 116h22a5 5 0 0 1 5 5v78a5 5 0 0 1-5 5h-22a5 5 0 0 1-5-5v-78a5 5 0 0 1 5-5Z" {...drawProps(0.75)} />
      <path d="M232 132h60M232 188h60M588 132h60M588 188h60" {...drawProps(1)} />
    </svg>
  );
}

/** Abstract training contours - used as a quiet backdrop behind sections. */
export function ContourLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={className}
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M-20 ${120 + i * 34} C 120 ${60 + i * 30}, 250 ${250 + i * 18}, 380 ${
            170 + i * 26
          } S 560 ${70 + i * 34}, 640 ${140 + i * 30}`}
          {...drawProps(0.1 * i)}
        />
      ))}
    </svg>
  );
}

/** Plate rings - concentric circles with a barbell sleeve through the middle. */
export function PlateRings({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
      className={className}
    >
      <circle cx="120" cy="120" r="102" {...drawProps(0.1)} />
      <circle cx="120" cy="120" r="76" {...drawProps(0.3)} />
      <circle cx="120" cy="120" r="34" {...drawProps(0.5)} />
      <path d="M120 18v34M120 188v34M18 120h34M188 120h34" {...drawProps(0.7)} />
    </svg>
  );
}

/** Kettlebell - small accent used beside section headings. */
export function KettlebellMark({ className = "", delay = 0 }: Drawn & { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 26a10 10 0 0 1 20 0" {...drawProps(delay)} />
      <path d="M18 26h28c6 6 10 15 10 24 0 11-9 18-24 18S8 61 8 50c0-9 4-18 10-24Z" {...drawProps(delay + 0.2)} />
    </svg>
  );
}

/**
 * Wraps line-art so it drifts and rotates gently with page scroll.
 * `strength` scales the movement; 0 pins it in place.
 */
export function Drift({
  y = 0,
  rotate = 0,
  className = "",
  children,
}: {
  y?: number;
  rotate?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      // `--sy` is only ever set when motion is allowed, so this is a no-op under
      // prefers-reduced-motion.
      style={{
        translate: `0 calc(var(--sy, 0) * ${y}px)`,
        rotate: `calc(var(--sy, 0) * ${rotate}deg)`,
        willChange: "translate, rotate",
      }}
    >
      {children}
    </div>
  );
}
