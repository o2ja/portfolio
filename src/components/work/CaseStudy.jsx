import { Play, X } from 'lucide-react';
import { useModal } from '../../lib/useModal';

const STRATEGY = {
  'isolated-build': 'Isolated build of the original homepage source, served on its own page and framed',
  iframe: 'The deployed homepage, framed directly',
  'scoped-reconstruction': 'A reconstruction using the original styles and assets',
};

export default function CaseStudy({ project, open, onClose, onExplore, returnFocus }) {
  const ref = useModal(open, returnFocus);
  const { caseStudy } = project;

  return (
    <dialog ref={ref} className="dialog case" aria-labelledby="case-title" onClose={onClose} data-lenis-prevent>
      {open && (
        <>
          <div className="dialog__head">
            <p className="dialog__title">Case study</p>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close case study">
              <X size={18} strokeWidth={1.75} />
            </button>
          </div>
          <article className="case__body">
            <header>
              <p className="muted">{project.kind}</p>
              <h2 id="case-title">
                {project.name}
              </h2>
              <p className="lede">
                {caseStudy.overview}
              </p>
            </header>

            <img className="case__poster" src={project.poster} alt={project.posterAlt} loading="lazy" />

            <section>
              <h3>What it does</h3>
              <ul className="case__list">
                {caseStudy.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Engineering problems worth reading</h3>
              <div className="case__challenges">
                {caseStudy.challenges.map((c) => (
                  <div key={c.title}>
                    <h4>{c.title}</h4>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3>Stack</h3>
              <ul className="pills">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>About the live preview</h3>
              <p className="muted case__strategy">
                {STRATEGY[project.previewStrategy]}.
              </p>
              <ul className="case__list">
                {caseStudy.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="case__note">
                {project.demoNote}
              </p>
            </section>

            {project.previewStatus === 'ready' && (
              <div>
                <button type="button" className="btn btn--solid" onClick={onExplore}>
                  Explore live preview
                  <span className="btn__icon" aria-hidden="true">
                    <Play size={15} strokeWidth={1.75} />
                  </span>
                </button>
              </div>
            )}
          </article>
        </>
      )}
    </dialog>
  );
}
