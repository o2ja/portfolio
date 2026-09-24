import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { experience } from '../data/experience';
import { useMotionConfig } from '../hooks/useReducedMotion';

const EASE_OUT = [0.23, 1, 0.32, 1];

export default function Experience() {
  const { transition } = useMotionConfig();

  return (
    <section className="section section--surface" id="experience" aria-label="Work experience">
      <div className="container">
        <SectionLabel label="/ 03 — experience" />

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
          Where I've worked.
        </motion.h2>

        <div className="timeline" role="list">
          {experience.map((job, i) => (
            <div key={i} className="timeline-item" role="listitem">
              <motion.div
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: 0.1, ease: EASE_OUT }}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={transition(0.6, i * 0.1)}
              >
                <div style={{ marginBottom: 'var(--space-xs)' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {job.role}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-muted)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {job.company} · {job.type} · {job.location} · {job.period}
                  </p>
                </div>

                <ul
                  style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}
                  aria-label={`Responsibilities at ${job.company}`}
                >
                  {job.bullets.map((bullet, bi) => (
                    <li
                      key={bi}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 300,
                        color: 'var(--color-muted)',
                        maxWidth: '56ch',
                        lineHeight: 1.65,
                        paddingLeft: '1.25rem',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.65em',
                          width: '5px',
                          height: '1px',
                          background: 'var(--color-border)',
                          display: 'block',
                        }}
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
