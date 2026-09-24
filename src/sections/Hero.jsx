import { motion } from 'framer-motion';
import { useMotionConfig } from '../hooks/useReducedMotion';

const HERO_STACK_TAGS = [
  'Full Stack',
  'AI Engineer',
  'React',
  'Python',
  'FastAPI',
  'RAG',
  'Cloud',
];

const EASE_OUT = [0.23, 1, 0.32, 1];

const nameWords = ['Omar', 'Al-Ajarmeh'];

export default function Hero() {
  const { transition } = useMotionConfig();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE_OUT },
  });

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="container">
        <div className="hero__grid">

          {/* LEFT: Text content */}
          <div>
            <motion.p
              className="hero__eyebrow"
              {...fadeUp(0.1)}
            >
              / Full Stack Developer &amp; AI Engineer
            </motion.p>

            <motion.h1
              className="hero__name"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              aria-label="Omar Al-Ajarmeh"
            >
              {nameWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  style={{ display: 'block' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="hero__tagline"
              {...fadeUp(0.55)}
            >
              Building elegant systems, end to end.
            </motion.p>

            <motion.div {...fadeUp(0.65)}>
              <div className="hero__status" role="status" aria-label="Availability status">
                <span className="hero__status-dot" aria-hidden="true" />
                Available for opportunities
              </div>
            </motion.div>

            <motion.div
              className="hero__ctas"
              {...fadeUp(0.75)}
            >
              <a
                href="#projects"
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
              </a>
              <a
                href="/cv.pdf"
                className="btn-secondary"
                aria-label="Download CV (PDF)"
                download
              >
                Download CV
                <span className="arrow" aria-hidden="true">→</span>
              </a>
            </motion.div>

            <motion.div
              className="hero__scroll"
              {...fadeUp(1.0)}
              aria-hidden="true"
            >
              <span className="hero__scroll-label">scroll</span>
              <div className="hero__scroll-arrow" />
            </motion.div>
          </div>

          {/* RIGHT: Editorial stack rail */}
          <div className="hero__visual" aria-hidden="true">
            <div className="hero__stack-rail">
              <motion.div
                className="hero__rail-line"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.0, delay: 0.3, ease: EASE_OUT }}
                style={{ transformOrigin: 'top' }}
              />
              <div className="hero__rail-labels">
                {HERO_STACK_TAGS.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="hero__rail-tag"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + i * 0.07,
                      ease: EASE_OUT,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
