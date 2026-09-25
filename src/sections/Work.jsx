import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Maximize2, Play, X } from 'lucide-react';
import { projects } from '../data/projects';
import { dur, ease, reveal } from '../lib/motion';
import ProjectOrbit from '../components/work/ProjectOrbit';
import PreviewOverlay from '../components/work/PreviewOverlay';
import CaseStudy from '../components/work/CaseStudy';

const BLOCKED = 'Only the homepage is part of this preview, so links and forms are switched off.';

export default function Work({ activeId, onActiveChange }) {
  const activeIndex = Math.max(0, projects.findIndex((p) => p.id === activeId));
  const project = projects[activeIndex];
  const [live, setLive] = useState(false);
  const [previewState, setPreviewState] = useState('poster');
  const [expanded, setExpanded] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const caseButton = useRef(null);

  // a preview belongs to the card in front; turning the orbit returns it to its poster
  useEffect(() => {
    setLive(false);
    setPreviewState('poster');
  }, [activeId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  const select = useCallback((i) => onActiveChange(projects[i].id), [onActiveChange]);
  const onBlocked = useCallback(() => setToast(BLOCKED), []);
  const closeLive = useCallback(() => setLive(false), []);
  const closeExpanded = useCallback(() => setExpanded(false), []);

  // touch and small screens go straight to the full-size view: a 0.25x page is not tappable
  const explore = () => {
    setCaseOpen(false);
    if (window.matchMedia('(hover: none), (max-width: 767px)').matches) setExpanded(true);
    else setLive(true);
  };
  const expand = () => {
    setLive(false);
    setExpanded(true);
  };

  return (
    <section
      id="work"
      className="work"
      aria-labelledby="work-title"
      style={{ '--theme-surface': project.theme.surface }}
      onKeyDown={(e) => e.key === 'Escape' && live && closeLive()}
    >
      <div className="shell">
        <motion.div className="work__head" {...reveal}>
          <h2 id="work-title" className="h2">
            Selected work
          </h2>
          <p className="lede">
            Three recent builds. Each preview runs the project&apos;s original homepage code, so you can scroll it,
            hover it and try its interactions.
          </p>
        </motion.div>

        <ProjectOrbit
          projects={projects}
          activeIndex={activeIndex}
          onSelect={select}
          live={live}
          onExplore={explore}
          onState={setPreviewState}
          onBlocked={onBlocked}
          onEscape={closeLive}
        />

        <div className="work__controls">
          <ul className="work__tabs" aria-label="Projects">
            {projects.map((p, i) => (
              <li key={p.id}>
                <button type="button" aria-current={i === activeIndex ? 'true' : undefined} onClick={() => select(i)}>
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="work__arrows">
            <button
              type="button"
              className="icon-btn"
              aria-label="Previous project"
              onClick={() => select((activeIndex - 1 + projects.length) % projects.length)}
            >
              <ArrowLeft size={18} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-label="Next project"
              onClick={() => select((activeIndex + 1) % projects.length)}
            >
              <ArrowRight size={18} strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="meta">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: dur.base, ease }}
            >
              <p className="meta__kind">{project.kind}</p>
              <h3 className="meta__name" aria-live="polite">
                {project.name}
              </h3>
              <p className="meta__summary">{project.summary}</p>
              <div className="meta__actions">
                {live ? (
                  <>
                    <button type="button" className="btn btn--solid" onClick={expand}>
                      Open full size
                      <span className="btn__icon" aria-hidden="true">
                        <Maximize2 size={15} strokeWidth={1.75} />
                      </span>
                    </button>
                    <button type="button" className="btn btn--ghost" onClick={() => setLive(false)}>
                      Close preview
                      <span className="btn__icon" aria-hidden="true">
                        <X size={15} strokeWidth={1.75} />
                      </span>
                    </button>
                  </>
                ) : (
                  project.previewStatus === 'ready' && (
                    <button type="button" className="btn btn--solid" onClick={explore}>
                      Explore live preview
                      <span className="btn__icon" aria-hidden="true">
                        <Play size={15} strokeWidth={1.75} />
                      </span>
                    </button>
                  )
                )}
                <button ref={caseButton} type="button" className="btn btn--ghost" onClick={() => setCaseOpen(true)}>
                  Case study
                  <span className="btn__icon" aria-hidden="true">
                    <BookOpen size={15} strokeWidth={1.75} />
                  </span>
                </button>
              </div>
              {live && (
                <p className="mono muted meta__hint">
                  {previewState === 'interactive'
                    ? 'Scroll and click inside the frame. Arrow keys and the buttons still turn the orbit.'
                    : 'Loading the homepage build.'}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
          <dl>
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>
                <ul className="pills">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>In the preview</dt>
              <dd className="muted">{project.demoNote}</dd>
            </div>
          </dl>
        </div>
      </div>

      <PreviewOverlay
        project={project}
        open={expanded}
        onClose={closeExpanded}
        onBlocked={onBlocked}
        notice={toast}
        returnFocus={caseButton}
      />
      <CaseStudy
        returnFocus={caseButton}
        project={project}
        open={caseOpen}
        onClose={() => setCaseOpen(false)}
        onExplore={() => {
          setCaseOpen(false);
          setExpanded(true);
        }}
      />

      <AnimatePresence>
        {toast && !expanded && (
          <motion.p
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: dur.base, ease }}
          >
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
