import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * One Lenis instance for the page. Skipped under reduced motion, where native
 * scrolling is used instead. Dialogs pause it; the preview iframes are separate
 * documents, so wheel input over them never reaches Lenis.
 */
let lenis = null;

export function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ autoRaf: true, anchors: { offset: -88 } });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

export const pauseScroll = () => lenis?.stop();
export const resumeScroll = () => lenis?.start();

export function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { offset: -88 });
  else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
