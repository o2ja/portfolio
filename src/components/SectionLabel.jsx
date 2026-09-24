import { motion } from 'framer-motion';
import { useMotionConfig } from '../hooks/useReducedMotion';

export default function SectionLabel({ label }) {
  const { transition } = useMotionConfig();

  return (
    <motion.p
      className="text-mono"
      style={{ marginBottom: 'var(--space-m)' }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={transition(0.6)}
    >
      {label}
    </motion.p>
  );
}
