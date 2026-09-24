import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

export function useMotionConfig() {
  const reduced = useReducedMotion();

  return {
    duration: reduced ? 0.01 : undefined,
    stagger: reduced ? 0 : undefined,
    transition: (dur = 0.8, delay = 0) =>
      reduced
        ? { duration: 0.01 }
        : { duration: dur, delay, ease: [0.23, 1, 0.32, 1] },
  };
}
