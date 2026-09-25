/* Motion tokens. CSS mirrors these as --ease-out / --dur-* in index.css. */
export const ease = [0.16, 1, 0.3, 1];
export const dur = { fast: 0.18, base: 0.42, slow: 0.8 };
/** Orbit rotation: settles without overshooting past the next card. */
export const orbitSpring = { type: 'spring', stiffness: 150, damping: 24, mass: 1 };

/** Fade-up used for section entrances. */
export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-12% 0px' },
  transition: { duration: dur.slow, ease },
};
