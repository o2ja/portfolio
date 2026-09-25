import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { reveal } from '../lib/motion';

const EMAIL = 'omar1152003@gmail.com';

const LINKS = [
  { label: 'LinkedIn', value: 'linkedin.com/in/omar-ajarmeh-7b271b411', href: 'https://linkedin.com/in/omar-ajarmeh-7b271b411' },
  { label: 'GitHub', value: 'github.com/o2ja', href: 'https://github.com/o2ja' },
  { label: 'Phone', value: '+962 795 232 859', href: 'tel:+962795232859' },
];

/**
 * There is no form backend, so the form is honest about it: it composes an
 * email in the visitor's own mail app instead of pretending to send.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const next = {};
    if (!data.name.trim()) next.name = 'Add your name.';
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = 'Add an email address I can reply to.';
    if (!data.message.trim()) next.message = 'Tell me a little about the project or role.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = encodeURIComponent(`Hello from ${data.name.trim()}`);
    const body = encodeURIComponent(`${data.message.trim()}\n\n${data.name.trim()}\n${data.email.trim()}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const field = (name, label, props) => (
    <div className="field-group">
      <label htmlFor={`c-${name}`}>{label}</label>
      {props.rows ? (
        <textarea id={`c-${name}`} name={name} aria-invalid={!!errors[name]} aria-describedby={`c-${name}-err`} {...props} />
      ) : (
        <input id={`c-${name}`} name={name} aria-invalid={!!errors[name]} aria-describedby={`c-${name}-err`} {...props} />
      )}
      <p id={`c-${name}-err`} className="field-group__error" aria-live="polite">
        {errors[name]}
      </p>
    </div>
  );

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="shell">
        <motion.div {...reveal}>
          <h2 id="contact-title" className="h2">
            Let&apos;s build something.
          </h2>
          <p className="lede">
            Open to full-time roles, freelance projects and interesting collaborations, remotely or in Amman.
          </p>
          <div className="contact__email">
            <a href={`mailto:${EMAIL}`} className="text-link">
              {EMAIL}
            </a>
            <button type="button" className="btn btn--ghost" onClick={copy} aria-live="polite">
              {copied ? 'Copied' : 'Copy email'}
              <span className="btn__icon" aria-hidden="true">
                {copied ? <Check size={15} strokeWidth={1.75} /> : <Copy size={15} strokeWidth={1.75} />}
              </span>
            </button>
          </div>
        </motion.div>

        <div className="contact__grid">
          <ul className="contact__links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <span>{l.label}</span>
                <a
                  href={l.href}
                  className="text-link"
                  {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {l.value}
                </a>
              </li>
            ))}
          </ul>

          <form className="form" onSubmit={submit} noValidate aria-label="Write an email">
            <div className="form__row">
              {field('name', 'Name', { type: 'text', autoComplete: 'name' })}
              {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
            </div>
            {field('message', 'Message', { rows: 5 })}
            <div className="form__foot">
              <button type="submit" className="btn btn--solid">
                Write the email
                <span className="btn__icon" aria-hidden="true">
                  <ArrowUpRight size={16} strokeWidth={1.75} />
                </span>
              </button>
              <p className="form__hint">This opens your email app with the message filled in. Nothing is sent from this page.</p>
            </div>
          </form>
        </div>

        <footer className="footer">
          <p>Designed and built by Omar Al-Ajarmeh, {new Date().getFullYear()}.</p>
          <p>The project previews are compiled from each project&apos;s original homepage source.</p>
        </footer>
      </div>
    </section>
  );
}
