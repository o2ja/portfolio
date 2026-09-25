import { motion } from 'framer-motion';
import { archive } from '../data/projects';
import { reveal } from '../lib/motion';

/** Earlier projects as a plain index. */
export default function Archive() {
  return (
    <section className="section archive" aria-labelledby="archive-title">
      <div className="shell">
        <motion.h2 id="archive-title" className="h2" {...reveal}>
          Earlier work
        </motion.h2>
        <ul className="archive__list">
          {archive.map((item) => (
            <li key={item.id} className="archive__row">
              <h3>{item.title}</h3>
              <p>{item.note}</p>
              <p className="archive__stack mono">{item.stack.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
