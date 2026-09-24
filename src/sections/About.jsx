import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { useMotionConfig } from '../hooks/useReducedMotion';

const FACTS = [
  'Amman, Jordan',
  'B.Sc. Computer Science',
  'Arabic · English',
  'Open to work',
];

const EASE_OUT = [0.23, 1, 0.32, 1];

export default function About() {
  const { transition } = useMotionConfig();

  return (
    <section className="section section--surface" id="about" aria-label="About Omar">
      <div className="container">
        <SectionLabel label="/ 01 — about" />

        <div className="about__grid">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={transition(0.8)}
          >
            <h2 className="about__heading text-display">
              A builder at the intersection of engineering and craft.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={transition(0.8, 0.15)}
          >
            <p className="text-body" style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-m)' }}>
              Full Stack Web Developer and AI Engineer with a Computer Science background
              and hands-on experience shipping production web and AI applications end-to-end —
              from database design and REST/GraphQL APIs to responsive React interfaces,
              including RAG pipelines and LLM integrations for real clients.
            </p>

            <div
              className="about__facts"
              role="list"
              aria-label="Quick facts"
            >
              {FACTS.map((fact) => (
                <span
                  key={fact}
                  className="about__fact"
                  role="listitem"
                >
                  {fact}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-l)' }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-muted)',
                  marginBottom: '0.5rem',
                }}
              >
                Education
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 400, color: 'var(--color-text)' }}>
                B.Sc. Computer Science
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 300, color: 'var(--color-muted)' }}>
                Al-Balqa Applied University, Amman, Jordan · Sep 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
