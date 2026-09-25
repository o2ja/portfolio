import { useEffect, useRef } from 'react';
import { pauseScroll, resumeScroll } from './smoothScroll';

/**
 * Drives a native <dialog> from React state. The browser supplies the focus
 * trap, Escape and the backdrop; this adds smooth-scroll pausing and returns
 * focus to whatever opened the dialog (or to `fallback` when the opener has
 * since been unmounted, e.g. a button that swapped label while the dialog was open).
 */
export function useModal(open, fallback) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const opener = document.activeElement;
    dialog.showModal();
    pauseScroll();
    return () => {
      if (dialog.open) dialog.close();
      resumeScroll();
      const target = opener instanceof HTMLElement && opener.isConnected ? opener : fallback?.current;
      target?.focus({ preventScroll: true });
    };
  }, [open]);

  return ref;
}
