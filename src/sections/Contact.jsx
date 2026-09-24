import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import { useMotionConfig } from '../hooks/useReducedMotion';

const EASE_OUT = [0.23, 1, 0.32, 1];

export default function Contact() {
  const { transition } = useMotionConfig();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, connect to your preferred form backend
    setSubmitted(true);
  };

  return (
    <section className="section section--surface-2" id="contact" aria-label="Contact Omar">
      <div className="container">
        <SectionLabel label="/ 06 — contact" />

        <motion.h2
          className="contact__heading text-display"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={transition(0.8)}
        >
          Let's build something.
        </motion.h2>

        <motion.p
          className="contact__subtext"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={transition(0.7, 0.1)}
        >
          Open to full-time roles, freelance projects, and interesting collaborations.
        </motion.p>

        <motion.p
          className="contact__location"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={transition(0.6, 0.2)}
        >
          Based in Amman, Jordan · Available remotely
        </motion.p>

        <div className="contact__rule" aria-hidden="true" />

        <motion.div
          className="contact__grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={transition(0.7, 0.15)}
        >
          {/* Links column */}
          <div className="contact__links-col">
            <p className="contact__link-label">Reach out</p>

            <a
              href="mailto:omar1152003@gmail.com"
              className="contact__link link-underline"
              aria-label="Send Omar an email"
            >
              omar1152003@gmail.com
            </a>

            <a
              href="https://linkedin.com/in/omar-ajarmeh"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link link-underline"
              aria-label="Omar's LinkedIn profile"
            >
              linkedin.com/in/omar-ajarmeh
            </a>

            <a
              href="https://github.com/o2ja"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__link link-underline"
              aria-label="Omar's GitHub profile"
            >
              github.com/o2ja
            </a>

            <a
              href="tel:+962795232859"
              className="contact__link link-underline"
              aria-label="Call Omar"
              style={{ marginTop: 'var(--space-xs)' }}
            >
              +962 795 232 859
            </a>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                style={{ paddingTop: 'var(--space-l)' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    color: 'var(--color-text)',
                    marginBottom: 'var(--space-s)',
                  }}
                >
                  Message received.
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 300,
                    color: 'var(--color-muted)',
                  }}
                >
                  I'll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <form
                className="contact__form"
                onSubmit={handleSubmit}
                aria-label="Contact form"
                noValidate
              >
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity…"
                    required
                    aria-required="true"
                    rows={5}
                  />
                </div>

                <div className="contact__form-submit">
                  <button type="submit" className="btn-primary">
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
