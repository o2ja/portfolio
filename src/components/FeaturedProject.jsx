import { motion } from 'framer-motion';
import TechPill from './TechPill';
import { useMotionConfig } from '../hooks/useReducedMotion';

export default function FeaturedProject({ project, reversed }) {
  const { transition } = useMotionConfig();

  return (
    <motion.article
      className={`featured-project ${reversed ? 'featured-project--reversed' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={transition(0.8)}
    >
      {/* Image column */}
      <div className="featured-project__image-col">
        <div className="featured-project__image-wrap">
          <img
            src={project.image}
            alt={`${project.title} — ${project.subtitle}`}
            loading="lazy"
          />
        </div>
      </div>

      {/* Content column */}
      <div className="featured-project__content">
        <p className="featured-project__category">{project.category}</p>
        <h3 className="featured-project__title">{project.title}</h3>
        <p className="featured-project__subtitle">{project.subtitle}</p>
        <p className="featured-project__description">{project.description}</p>

        <div className="featured-project__pills">
          {project.stack.map((s) => (
            <TechPill key={s} name={s} />
          ))}
        </div>

        <div className="featured-project__links">
          <a
            href={project.github}
            className="featured-link link-underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub <span className="arrow">→</span>
          </a>
          <a
            href={project.demo}
            className="featured-link link-underline"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live`}
          >
            Live Demo <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
