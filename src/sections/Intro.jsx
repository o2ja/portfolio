import { motion } from 'framer-motion';
import { reveal } from '../lib/motion';

const FACTS = [
  ['Based in', 'Amman, Jordan'],
  ['Shipped', '20+ web apps, 12 clients'],
  ['Studied', 'B.Sc. Computer Science'],
  ['Speaks', 'Arabic, English'],
];

export default function Intro() {
  return (
    <section className="section" aria-label="Introduction">
      <div className="shell">
        <motion.p className="intro__statement" {...reveal}>
          I design and build complete products for businesses, <em>from the schema and the API to the last
          detail of how a page moves.</em>
        </motion.p>
        <motion.dl className="intro__facts" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
          {FACTS.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
