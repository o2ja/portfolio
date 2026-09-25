/*
 * BlurText, from React Bits (https://reactbits.dev, BlurText-JS-CSS, MIT).
 * Adapted for this repo: imports framer-motion (already installed) instead of
 * motion/react, renders any tag via `as`, and skips the animation entirely
 * under prefers-reduced-motion.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

export default function BlurText({
  text = '',
  as: Tag = 'p',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  easing = (t) => t,
  stepDuration = 0.35,
}) {
  const reduce = useReducedMotion();
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const from = useMemo(
    () => ({ filter: 'blur(10px)', opacity: 0, y: direction === 'top' ? -50 : 50 }),
    [direction],
  );
  const to = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  );

  const stepCount = to.length + 1;
  const times = Array.from({ length: stepCount }, (_, i) => i / (stepCount - 1));
  const MotionTag = motion.span;

  return (
    <Tag ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => (
        <MotionTag
          key={index}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          initial={reduce ? false : from}
          animate={reduce || inView ? buildKeyframes(from, to) : from}
          transition={{ duration: stepDuration * (stepCount - 1), times, delay: (index * delay) / 1000, ease: easing }}
        >
          {segment === ' ' ? ' ' : segment}
          {animateBy === 'words' && index < elements.length - 1 && ' '}
        </MotionTag>
      ))}
    </Tag>
  );
}
