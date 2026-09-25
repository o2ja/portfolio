import { motion } from 'framer-motion';
import { certs } from '../data/certs';
import { experience } from '../data/experience';
import { reveal } from '../lib/motion';

export default function Background() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="shell bg">
        <motion.div {...reveal}>
          <h2 id="about-title" className="h2">
            About
          </h2>
          <p className="bg__bio">
            I&apos;m a full-stack web developer and AI engineer with a Computer Science background. I ship production
            web and AI applications end to end: database design, REST and GraphQL APIs, responsive React interfaces,
            and RAG pipelines and LLM integrations for real clients.
          </p>
          <p className="bg__bio">B.Sc. Computer Science, Al-Balqa Applied University, Amman. Class of 2026.</p>
        </motion.div>

        <div>
          <ol className="timeline">
            {experience.map((job) => (
              <motion.li key={job.company + job.role} className="job" {...reveal}>
                <div className="job__head">
                  <h3>{job.role}</h3>
                  <span className="mono muted">{job.period}</span>
                </div>
                <p className="job__where">
                  {job.company}, {job.location}
                </p>
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>
          <div className="creds">
            {certs.map((c) => (
              <motion.div key={c.title} className="cred" {...reveal}>
                <p>{c.title}</p>
                <span>
                  {c.issuer}, {c.date}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
