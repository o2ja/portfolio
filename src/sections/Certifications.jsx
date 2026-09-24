import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { certs } from '../data/certs';
import { useMotionConfig } from '../hooks/useReducedMotion';

export default function Certifications() {
  const { transition } = useMotionConfig();

  return (
    <section className="section section--surface" id="certifications" aria-label="Certifications">
      <div className="container">
        <SectionLabel label="/ 05 — certifications" />

        <dl role="list" aria-label="List of certifications">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              className="cert-item"
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={transition(0.55, i * 0.1)}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 'var(--space-l)',
                  alignItems: 'baseline',
                }}
              >
                <div>
                  <dt
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-muted)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {cert.issuer}
                  </dt>
                  <dd
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      color: 'var(--color-text)',
                    }}
                  >
                    {cert.title}
                  </dd>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-muted)',
                    letterSpacing: '0.06em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cert.date}
                </span>
              </div>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
