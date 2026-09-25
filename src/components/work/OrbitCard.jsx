import { motion, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { offset } from '../../lib/orbit';
import PreviewHost from './PreviewHost';

/**
 * One project in the orbit: a double-bezel browser frame with the poster, and,
 * once the visitor asks for it, the live homepage in place of the poster.
 */
export default function OrbitCard({ project, index, count, rot, radius, active, live, onPick, onExplore, onState, onBlocked, onEscape }) {
  const d = useTransform(rot, (r) => offset(index, r, count));
  const transform = useTransform([d, radius], ([dist, [rx, rz]]) => {
    const angle = (dist * 2 * Math.PI) / count;
    const x = Math.sin(angle) * rx;
    const z = (Math.cos(angle) - 1) * rz;
    return `translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${(-dist * 22).toFixed(2)}deg)`;
  });
  const opacity = useTransform(d, (dist) => Math.min(1, Math.max(0, 1.9 - Math.abs(dist) * 0.8)));
  const shade = useTransform(d, (dist) => Math.min(1, Math.abs(dist)) * 0.5);

  return (
    <motion.div
      className={`orbit-card${active ? ' orbit-card--active' : ''}`}
      style={{ transform, opacity }}
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${count}: ${project.name}`}
      aria-hidden={!active || undefined}
    >
      <div className="frame">
        <div className="frame__window">
          <div className="frame__bar">
            <span className="frame__address">{project.address}</span>
            <span className="frame__status">{live ? 'Live preview' : ''}</span>
          </div>
          <div className="frame__viewport">
            <img
              src={active ? project.poster : project.posterSmall}
              alt={project.posterAlt}
              loading={active ? 'eager' : 'lazy'}
              decoding="async"
              draggable="false"
            />
            {active && live && <PreviewHost project={project} onState={onState} onBlocked={onBlocked} onEscape={onEscape} />}
            {active && !live && project.previewStatus === 'ready' && (
              <div className="poster-cta">
                <button type="button" className="btn btn--solid" onClick={onExplore}>
                  Explore live preview
                  <span className="btn__icon" aria-hidden="true">
                    <Play size={15} strokeWidth={1.75} />
                  </span>
                </button>
              </div>
            )}
            <motion.div className="frame__shade" style={{ opacity: shade }} aria-hidden="true" />
          </div>
        </div>
      </div>
      {!active && <button type="button" className="orbit-card__pick" tabIndex={-1} aria-hidden="true" onClick={onPick} />}
    </motion.div>
  );
}
