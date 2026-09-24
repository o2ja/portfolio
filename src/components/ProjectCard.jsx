import { motion } from 'framer-motion';
import TechPill from './TechPill';
import { useMotionConfig } from '../hooks/useReducedMotion';

export default function ProjectCard({ project, wide }) {
  const { transition } = useMotionConfig();

  return (
    <motion.article
      className={`project-card ${wide ? 'projects__grid-item--wide' : ''}`}
      whileHover={{ y: -6 }}
      transition={transition(0.4)}
      aria-label={project.title}
    >
      <div className="project-card__image-wrap">
        <img
          src={project.image}
          alt={`${project.title} — ${project.subtitle}`}
          loading="lazy"
        />
      </div>
      <div className="project-card__body">
        <p className="project-card__category">{project.category}</p>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
        <p className="project-card__description">{project.description}</p>
        <div className="project-card__pills">
          {project.stack.map((s) => (
            <TechPill key={s} name={s} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-m)', alignItems: 'center' }}>
          {project.github !== '#' && (
            <a
              href={project.github}
              className="project-card__cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              GitHub
              <span className="project-card__cta-arrow">→</span>
            </a>
          )}
          {project.demo !== '#' && (
            <a
              href={project.demo}
              className="project-card__cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
            >
              View Project
              <span className="project-card__cta-arrow">→</span>
            </a>
          )}
          {project.github === '#' && project.demo === '#' && (
            <span className="project-card__cta" style={{ opacity: 1, color: 'var(--color-muted)' }}>
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
