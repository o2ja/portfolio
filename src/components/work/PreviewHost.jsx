import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const TIMEOUT_MS = 12000;

/**
 * Renders a project's isolated homepage build in an iframe laid out at a real
 * device width (`width`) and scaled to fit its box, so the original desktop
 * composition survives inside the miniature. The iframe is sandboxed: scripts
 * run, but it cannot navigate the portfolio, open windows or submit forms.
 *
 * States: loading -> interactive, or loading -> error after TIMEOUT_MS.
 */
export default function PreviewHost({ project, width = 1440, onState, onBlocked, onEscape, className = '' }) {
  const box = useRef(null);
  const frame = useRef(null);
  const [state, setState] = useState('loading');

  useLayoutEffect(() => {
    const el = box.current;
    const fit = () => {
      el.style.setProperty('--s', String(el.clientWidth / width));
      el.style.setProperty('--vw', `${width}px`);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === 'preview:ready') setState('interactive');
      if (event.data?.type === 'preview:blocked') onBlocked?.(event.data.href);
      if (event.data?.type === 'preview:escape') onEscape?.();
    };
    window.addEventListener('message', onMessage);
    const timer = setTimeout(() => setState((s) => (s === 'loading' ? 'error' : s)), TIMEOUT_MS);
    return () => {
      window.removeEventListener('message', onMessage);
      clearTimeout(timer);
    };
  }, [onBlocked, onEscape]);

  useEffect(() => onState?.(state), [state, onState]);

  return (
    <div ref={box} className={`live ${className}`} data-state={state}>
      <iframe
        ref={frame}
        src={project.previewEntry}
        title={`${project.name} homepage, interactive preview`}
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
      />
      {state === 'loading' && <div className="live__loading" role="progressbar" aria-label="Loading preview" />}
      {state === 'error' && (
        <p className="live__error" role="alert">
          The live preview did not load. The screenshot shown here is the real homepage.
        </p>
      )}
    </div>
  );
}
