import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import FilterTabs from '../components/FilterTabs';
import FeaturedProject from '../components/FeaturedProject';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { useMotionConfig } from '../hooks/useReducedMotion';

const EASE_OUT = [0.23, 1, 0.32, 1];

// Indices of 'other' projects that should be double-wide
const WIDE_INDICES = new Set([0, 3]); // first and fourth 'other' project

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { transition } = useMotionConfig();

  const featuredProjects = projects.filter((p) => p.type === 'featured');

  const otherProjects = projects.filter((p) => {
    if (p.type !== 'other') return false;
    if (activeFilter === 'All') return true;
    return p.category === activeFilter;
  });

  return (
    <section className="section" id="projects" aria-label="Selected projects">
      <div className="container">
        <SectionLabel label="/ 04 — projects" />

        <motion.h2
          className="text-display"
          style={{
            fontSize: 'var(--text-3xl)',
            color: 'var(--color-text)',
            marginBottom: 'var(--space-2xl)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={transition(0.7)}
        >
          Selected work.
        </motion.h2>

        {/* Featured projects — editorial layout */}
        <div className="projects__featured" aria-label="Featured projects">
          {featuredProjects.map((project, i) => (
            <FeaturedProject
              key={project.id}
              project={project}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>

        {/* Filter tabs */}
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        {/* Other projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="projects__grid"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            aria-live="polite"
            aria-label="Project grid"
          >
            {otherProjects.length === 0 ? (
              <motion.p
                style={{
                  gridColumn: '1 / -1',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: 'var(--space-2xl) 0',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                No projects in this category yet.
              </motion.p>
            ) : (
              otherProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  wide={WIDE_INDICES.has(i) && otherProjects.length > 2}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
