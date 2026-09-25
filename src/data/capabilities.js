/**
 * Engineering capabilities, each backed by something that can be inspected in
 * the Selected Work previews or case studies. `project` must match an id in
 * projects.js; clicking the evidence turns the orbit to that project.
 */
export const capabilities = [
  {
    id: 'interface',
    title: 'Interfaces with a point of view',
    body: 'Editorial layouts, variable type and motion that explains rather than decorates.',
    tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    evidence: [
      { project: 'obaidi-time', text: 'Real-time SVG dial with a pointer-tracking sunburst' },
      { project: 'coach', text: 'Line art that draws itself, with zero animation libraries' },
    ],
  },
  {
    id: 'backend',
    title: 'APIs that hold the rules',
    body: 'The server owns money, stock and state. The client asks, the API decides.',
    tools: ['FastAPI', 'Django', 'Node.js', 'Express', 'NestJS', 'REST', 'GraphQL'],
    evidence: [
      { project: 'bagel-house', text: 'Order state machine with 409 on illegal transitions' },
      { project: 'coach', text: 'Lead workflow from NEW to COMPLETED, validated server-side' },
    ],
  },
  {
    id: 'data',
    title: 'Data modelled for correctness',
    body: 'Schemas and migrations that make the wrong thing hard to store.',
    tools: ['PostgreSQL', 'MySQL', 'SQLAlchemy 2', 'Alembic', 'Query optimisation'],
    evidence: [
      { project: 'bagel-house', text: 'NUMERIC money end to end, recipe-based stock ledger' },
    ],
  },
  {
    id: 'resilience',
    title: 'Failure handled on purpose',
    body: 'Pages that degrade section by section instead of going blank.',
    tools: ['ISR', 'Graceful fallbacks', 'Idempotency keys', 'Rate limiting'],
    evidence: [
      { project: 'bagel-house', text: 'safe() fallbacks and idempotent order placement' },
      { project: 'obaidi-time', text: 'Every CMS field ships with a working default' },
    ],
  },
  {
    id: 'security',
    title: 'Auth done properly',
    body: 'Session design, hashing and CSRF handled deliberately, not by default.',
    tools: ['Argon2id', 'HttpOnly sessions', 'CSRF tokens', 'SameSite cookies'],
    evidence: [
      { project: 'coach', text: 'Argon2id, HttpOnly session cookies and CSRF protection' },
    ],
  },
  {
    id: 'ai',
    title: 'AI with guardrails',
    body: 'LLM features scoped to typed tools, audited, and useful to the business.',
    tools: ['LLM integration', 'RAG pipelines', 'FAISS vector search', 'Agentic workflows'],
    evidence: [
      { project: 'bagel-house', text: 'Six permission-checked analytics tools, fully audit-logged' },
    ],
  },
];

/** Delivery tooling from the original stack list; shown once, without evidence claims. */
export const delivery = ['AWS', 'Docker', 'CI/CD', 'Git', 'Python', 'JavaScript', 'HTML', 'CSS', 'Claude Code', 'Codex', 'Agile/Scrum'];
