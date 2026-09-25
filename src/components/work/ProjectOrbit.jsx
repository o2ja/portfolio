import { useEffect, useLayoutEffect, useRef } from 'react';
import { animate, useMotionValue, useReducedMotion } from 'framer-motion';
import { orbitSpring } from '../../lib/motion';
import { offset } from '../../lib/orbit';
import OrbitCard from './OrbitCard';

/**
 * CSS-3D orbit of project frames. `rot` is a continuous, unbounded position in
 * card units; every card derives its transform from it, so rotation never
 * re-renders React. Arrows, keys, trackpad swipes and drags all move a single
 * integer target and spring toward it, so rapid input accumulates and any
 * gesture can interrupt the one before it.
 */
export default function ProjectOrbit({ projects, activeIndex, onSelect, live, onExplore, onState, onBlocked, onEscape }) {
  const n = projects.length;
  const reduce = useReducedMotion();
  const stage = useRef(null);
  const rot = useMotionValue(activeIndex);
  const radius = useMotionValue([320, 420]);
  const target = useRef(activeIndex);
  const perCard = useRef(600);
  const drag = useRef(null);
  const wheelLock = useRef(0);

  const wrap = (v) => ((Math.round(v) % n) + n) % n;

  const settle = (t) => {
    target.current = t;
    animate(rot, t, reduce ? { duration: 0 } : orbitSpring);
  };
  const step = (dir) => {
    settle(target.current + dir);
    onSelect(wrap(target.current));
  };

  // external selection (tabs, hero bodies, capability evidence): take the short way round
  useEffect(() => {
    const current = wrap(target.current);
    if (current !== activeIndex) settle(target.current + Math.round(offset(activeIndex, current, n)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, n]);

  useLayoutEffect(() => {
    const el = stage.current;
    const measure = () => {
      const card = el.querySelector('.orbit-card');
      const w = card?.offsetWidth ?? 600;
      const W = el.offsetWidth;
      perCard.current = w * 0.9;
      radius.set([W >= 900 ? W * 0.52 : w * 0.7, w * 0.6]);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [radius]);

  const onPointerDown = (e) => {
    if (e.button !== 0 || e.target.closest('.live, .poster-cta')) return;
    rot.stop();
    const now = performance.now();
    drag.current = { id: e.pointerId, x: e.clientX, r: rot.get(), lastX: e.clientX, lastT: now, v: 0, moved: false };
  };
  const onPointerMove = (e) => {
    const s = drag.current;
    if (!s || s.id !== e.pointerId) return;
    const dx = e.clientX - s.x;
    if (!s.moved && Math.abs(dx) > 6) {
      s.moved = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId); // keep the drag if the pointer leaves the stage
      } catch {
        /* pointer already released */
      }
    }
    if (!s.moved) return;
    const now = performance.now();
    s.v = (e.clientX - s.lastX) / Math.max(1, now - s.lastT); // px per ms
    s.lastX = e.clientX;
    s.lastT = now;
    rot.set(s.r - dx / perCard.current);
  };
  const onPointerUp = (e) => {
    const s = drag.current;
    drag.current = null;
    if (!s || !s.moved) return;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const fling = (-s.v * 180) / perCard.current; // a quick flick carries on for about one card
    settle(Math.round(rot.get() + Math.max(-1, Math.min(1, fling))));
    onSelect(wrap(target.current));
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else return;
    e.preventDefault();
  };

  // horizontal trackpad swipe: one card per gesture
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) < 24 || Math.abs(e.deltaX) < Math.abs(e.deltaY) || e.target.closest('.live')) return;
    const now = performance.now();
    if (now < wheelLock.current) return;
    wheelLock.current = now + 550;
    step(Math.sign(e.deltaX));
  };

  return (
    <div
      ref={stage}
      className="orbit"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      aria-describedby="orbit-hint"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
    >
      <p id="orbit-hint" className="sr-only">
        Use the left and right arrow keys to move between projects.
      </p>
      <div className="orbit__floor" aria-hidden="true" />
      <div className="orbit__stage">
        {projects.map((project, i) => (
          <OrbitCard
            key={project.id}
            project={project}
            index={i}
            count={n}
            rot={rot}
            radius={radius}
            active={i === activeIndex}
            live={i === activeIndex && live}
            onPick={() => onSelect(i)}
            onExplore={onExplore}
            onState={onState}
            onBlocked={onBlocked}
            onEscape={onEscape}
          />
        ))}
      </div>
    </div>
  );
}

