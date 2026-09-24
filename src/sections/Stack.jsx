import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import TechPill from '../components/TechPill';
import { stack } from '../data/stack';
import { useMotionConfig } from '../hooks/useReducedMotion';

const EASE_OUT = [0.23, 1, 0.32, 1];

export default function Stack() {
  const { transition } = useMotionConfig();

  return (
    <section className="section" id="stack" aria-label="Technical stack">
      <div className="container">
        <SectionLabel label="/ 02 — stack" />

        <div className="stack__rows">
          {stack.map((group, gi) => (
            <motion.div
              key={group.category}
              className="stack__row"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={transition(0.6, gi * 0.08)}
            >
              <p className="stack__category">{group.category}</p>
              <div className="stack__pills" role="list" aria-label={`${group.category} technologies`}>
                {group.items.map((item) => (
                  <span key={item.name} role="listitem">
                    <TechPill name={item.name} />
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
