import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Session-gated: only shows once per session
    if (sessionStorage.getItem('oa-loaded')) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('oa-loaded', 'true');
      onComplete?.();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          aria-hidden="true"
        >
          <motion.div
            className="loading-monogram"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            OA
          </motion.div>

          <div className="loading-bar-track">
            <motion.div
              className="loading-bar-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 1.0,
                delay: 0.4,
                ease: [0.23, 1, 0.32, 1],
              }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
