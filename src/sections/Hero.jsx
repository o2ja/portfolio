import { useLayoutEffect, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import BlurText from '../components/BlurText';
import { projects } from '../data/projects';
import { ease } from '../lib/motion';

const PERIOD_MS = 64000; // one lap of the name
const TILT = (-5 * Math.PI) / 180;

/**
 * Signature moment: the three Selected Work projects orbit the name, passing in
 * front of the letters on the near side of the ellipse and behind them on the
 * far side. Each body is a real control that turns the Work orbit to its project.
 */
export default function Hero({ onShowProject }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lift = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div className="shell hero__inner" style={reduce ? undefined : { y: lift, opacity: fade }}>
        <motion.p
          className="hero__status"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          Available for full-time roles and freelance work
        </motion.p>
        <div className="hero__name">
          <OrbitField onShowProject={onShowProject} />
          <BlurText as="h1" text="Omar AlAjarmeh" className="hero__title" delay={140} direction="bottom" />
        </div>
        <motion.p
          className="hero__sub"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease }}
        >
          Full-stack developer and AI engineer in Amman. I build the database, the API and the interface.
        </motion.p>
        <motion.div
          className="hero__ctas"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          <a href="#work" className="btn btn--solid">
            See the work
            <span className="btn__icon" aria-hidden="true">
              <ArrowDownRight size={18} strokeWidth={1.75} />
            </span>
          </a>
          <a href="#contact" className="text-link">
            Contact
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function OrbitField({ onShowProject }) {
  const box = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(box);
  const hovering = useRef(false);
  const time = useMotionValue(0);
  const size = useMotionValue([0, 0]);

  useLayoutEffect(() => {
    const el = box.current;
    const measure = () => size.set([el.clientWidth, el.clientHeight]);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [size]);

  // the clock only advances while the hero is visible, motion is allowed and nobody is aiming at a body
  useAnimationFrame((_, delta) => {
    if (!reduce && inView && !hovering.current) time.set(time.get() + Math.min(delta, 64));
  });

  return (
    <div
      ref={box}
      className="orbit-field"
      onPointerOver={() => (hovering.current = true)}
      onPointerOut={() => (hovering.current = false)}
      onFocus={() => (hovering.current = true)}
      onBlur={() => (hovering.current = false)}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="50" cy="50" rx="49.5" ry="49.5" transform="rotate(-5 50 50)" />
        <ellipse cx="50" cy="50" rx="44" ry="40" transform="rotate(-5 50 50)" />
      </svg>
      {projects.map((project, i) => (
        <Body
          key={project.id}
          project={project}
          phase={(i / projects.length) * Math.PI * 2 + 0.6}
          time={time}
          size={size}
          onClick={() => onShowProject(project.id)}
        />
      ))}
    </div>
  );
}

function Body({ project, phase, time, size, onClick }) {
  const angle = useTransform(time, (t) => phase + (t / PERIOD_MS) * Math.PI * 2);
  const point = useTransform([angle, size], ([a, [w, h]]) => {
    const ex = Math.cos(a) * (w / 2) * 0.99;
    const ey = Math.sin(a) * (h / 2) * 0.99;
    return [w / 2 + ex * Math.cos(TILT) - ey * Math.sin(TILT), h / 2 + ex * Math.sin(TILT) + ey * Math.cos(TILT)];
  });
  const x = useTransform(point, (p) => p[0]);
  const y = useTransform(point, (p) => p[1]);
  const near = useTransform(angle, (a) => Math.sin(a)); // 1 = closest to the viewer
  const scale = useTransform(near, (s) => 0.8 + (s + 1) * 0.14);
  const zIndex = useTransform(near, (s) => (s > 0 ? 2 : 0));

  return (
    <motion.button
      type="button"
      className="orbit-body"
      style={{ x, y, scale, zIndex, '--c': project.theme.accent }}
      onClick={onClick}
      aria-label={`Show ${project.name} in Selected work`}
    >
      <span className="orbit-body__dot" aria-hidden="true" />
      <span className="orbit-body__label" aria-hidden="true">
        {project.name}
      </span>
    </motion.button>
  );
}
