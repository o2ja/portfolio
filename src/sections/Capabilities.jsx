import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { capabilities, delivery } from '../data/capabilities';
import { projects } from '../data/projects';
import { reveal } from '../lib/motion';

const byId = Object.fromEntries(projects.map((p) => [p.id, p]));

/** Capabilities as claims with receipts: each evidence item turns the orbit to the project that proves it. */
export default function Capabilities({ onShowProject }) {
  return (
    <section id="capabilities" className="section" aria-labelledby="caps-title">
      <div className="shell caps">
        <motion.div className="caps__intro" {...reveal}>
          <h2 id="caps-title" className="h2">
            What I can show you
          </h2>
          <p className="lede">
            Every claim here points to code you can open above.
          </p>
          <div className="caps__delivery">
            <p className="caps__delivery-label">
              Also in daily use
            </p>
            <ul className="pills">
              {delivery.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        <ul className="caps__list">
          {capabilities.map((cap) => (
            <motion.li key={cap.id} className="cap" {...reveal}>
              <div>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
                <ul className="pills">
                  {cap.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <ul className="evidence" aria-label={`Evidence for ${cap.title}`}>
                {cap.evidence.map((ev) => {
                  const project = byId[ev.project];
                  return (
                    <li key={ev.text}>
                      <button type="button" onClick={() => onShowProject(project.id)} style={{ '--c': project.theme.accent }}>
                        <span className="evidence__dot" aria-hidden="true" />
                        <span className="evidence__text">
                          {ev.text}
                          <small>{project.name}</small>
                        </span>
                        <ArrowUpRight className="evidence__go" size={16} strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
