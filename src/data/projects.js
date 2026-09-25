/**
 * Selected Work registry. The orbit, meta panel, preview host and case study
 * all render from these records, so adding a project means adding one entry
 * here plus its preview package in previews/<slug>/ (see docs/ADD_PROJECT.md).
 * Every fact below comes from the project's export package in PORTFOLIO_EXPORT_*.
 *
 * @typedef {'isolated-build' | 'iframe' | 'scoped-reconstruction'} PreviewStrategy
 * @typedef {'ready' | 'poster-only' | 'unavailable'} PreviewStatus
 *
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} kind           Short category line under the name
 * @property {string} summary        One or two sentences, factual
 * @property {string} role
 * @property {string[]} stack
 * @property {string} poster         1440x900 capture of the real homepage
 * @property {string} posterSmall    720x450 version for receding orbit cards
 * @property {string} posterAlt
 * @property {string} [liveUrl]      Only when a verified public URL exists
 * @property {string} [repoUrl]
 * @property {PreviewStrategy} previewStrategy
 * @property {string} [previewEntry] URL of the isolated homepage build
 * @property {PreviewStatus} previewStatus
 * @property {{ accent: string, surface: string }} theme  The project's own brand colours
 * @property {number} featuredOrder
 * @property {string} address        Label shown in the miniature browser bar
 * @property {string} demoNote       What in the preview is sample data
 * @property {{ overview: string, highlights: string[], challenges: {title: string, body: string}[], limitations: string[] }} caseStudy
 */

/** @type {Project[]} */
export const projects = [
  {
    id: 'obaidi-time',
    slug: 'obaidi-time',
    name: 'Vauclair',
    kind: 'Luxury pre-owned watch commerce',
    summary:
      'A storefront and admin platform for a pre-owned watch dealer. There is no checkout: every sale starts as a request, and the owner calls the buyer back.',
    role: 'Full-stack: design, frontend, API and admin',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'GSAP', 'Lenis', 'FastAPI', 'SQLAlchemy 2', 'PostgreSQL'],
    poster: '/posters/obaidi-time.webp',
    posterSmall: '/posters/obaidi-time-sm.webp',
    posterAlt: 'Vauclair homepage: the headline "Time, kept well" beside a large navy watch dial showing the current time.',
    previewStrategy: 'isolated-build',
    previewEntry: '/previews/obaidi-time/',
    previewStatus: 'ready',
    theme: { accent: '#1d3354', surface: '#e8edf5' },
    featuredOrder: 1,
    address: 'vauclair.example',
    demoNote: "The watches on the wrist are the owner's own photos, shown as price on request. Inquiries are switched off.",
    caseStudy: {
      overview:
        'Built for a dealer of authenticated pre-owned watches. The storefront is modelled on walking into a quiet boutique: navy on white, Bodoni Moda headlines, long decelerating motion. The admin dashboard covers products, inquiries, homepage content and site settings.',
      highlights: [
        'SVG dial hero that shows the visitor\'s local time, with a sunburst finish that follows the pointer',
        'Draggable watch-on-wrist carousel built from transparent cutouts and a custom SVG forearm',
        'Declarative scroll choreography: pages opt in with data attributes, one client component wires them all',
        'Inquiry-only commerce with a slide-in request sheet instead of a cart',
      ],
      challenges: [
        { title: 'A high-beat seconds hand', body: 'The seconds hand steps 8 times per second on gsap.ticker to read like a 28,800 vph movement.' },
        { title: 'A dial that catches light', body: 'A registered @property angle drives a conic-gradient, so the reflection rotates smoothly with the pointer.' },
        { title: 'Server components that still move', body: 'data-split, data-reveal, data-parallax and data-draw keep pages static while a single Motion component animates them.' },
        { title: 'Content that never blanks', body: 'Every CMS field has a fallback, so the homepage renders even when the API is down.' },
      ],
      limitations: [
        'Inquiry sheet, collection, product and admin pages are not part of the export, so links in the preview are disabled.',
        'Homepage CMS copy is not bundled; the preview shows the built-in fallback text, which the export documents as the default content.',
        'Fonts load from Google Fonts instead of next/font self-hosting.',
      ],
    },
  },
  {
    id: 'bagel-house',
    slug: 'bagel-house',
    name: 'Bagel House',
    kind: 'Bakery, coffee and ice cream ordering platform',
    summary:
      'Online ordering, live order tracking and a full back office for a bakery. The server is the only source of truth for prices, stock and totals.',
    role: 'Full-stack: storefront, ordering engine, admin and AI assistant',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'FastAPI', 'SQLAlchemy 2', 'PostgreSQL', 'Pydantic v2'],
    poster: '/posters/bagel-house.webp',
    posterSmall: '/posters/bagel-house-sm.webp',
    posterAlt: 'Bagel House homepage: the headline "Hand-rolled at dawn, served all day." beside photos of the bakery counter and a flat white.',
    previewStrategy: 'isolated-build',
    previewEntry: '/previews/bagel-house/',
    previewStatus: 'ready',
    theme: { accent: '#26699f', surface: '#eef5fb' },
    featuredOrder: 2,
    address: 'bagelhouse.example',
    demoNote: 'Store details, menu and reviews are the offline seed shipped with the export. Ordering is switched off.',
    caseStudy: {
      overview:
        'A storefront, ordering engine and admin dashboard for a bakery, espresso bar and ice cream kitchen. The frontend captures intent and renders what the server decides; it never adds up money itself.',
      highlights: [
        'Cart stores intent only; totals come from an authoritative quote endpoint',
        'Idempotent order placement so retries and double clicks cannot double-charge',
        'Order state machine where illegal transitions return 409, and recipe-based stock deduction on completion',
        'Guarded AI assistant limited to six typed, permission-checked analytics tools, with full audit logging',
      ],
      challenges: [
        { title: 'Money without floats', body: 'NUMERIC(12,2) columns travel as decimal strings straight into Intl.NumberFormat. No arithmetic on the client.' },
        { title: 'Outages degrade, not blank', body: 'A safe() wrapper lets each homepage section fall back to an empty state when the API is unreachable.' },
        { title: 'Motion without a library', body: 'A 30-line IntersectionObserver Reveal component replaces an animation dependency.' },
        { title: 'Frame security', body: 'Production sends X-Frame-Options: DENY, so this portfolio embeds a standalone build instead of the live site.' },
      ],
      limitations: [
        'Checkout, menu, tracking and admin routes are outside the export; links are disabled in the preview.',
        'The seed menu has one populated category, so the "Browse by counter" grid shows a single card.',
        'Fonts load from Google Fonts instead of next/font self-hosting.',
      ],
    },
  },
  {
    id: 'coach',
    slug: 'coach',
    name: 'Fitness Coach Platform',
    kind: 'Personal brand site and lead pipeline for a coach',
    summary:
      'A marketing site and private dashboard for a solo strength coach. Applications move through a validated workflow from first message to finished programme.',
    role: 'Full-stack: design, frontend, API, auth and analytics',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'FastAPI', 'SQLAlchemy 2', 'PostgreSQL', 'Argon2id'],
    poster: '/posters/coach.webp',
    posterSmall: '/posters/coach-sm.webp',
    posterAlt: 'Fitness coach homepage: the headline "Strength that fits the life you already have." with a lavender image panel and thin dumbbell line art.',
    previewStrategy: 'isolated-build',
    previewEntry: '/previews/coach/',
    previewStatus: 'ready',
    theme: { accent: '#6b4fa0', surface: '#f5f2fa' },
    featuredOrder: 3,
    address: 'coach.example',
    demoNote: 'Sarah Mitchell and all page content are the fictional demo seed from the export. Applications are switched off.',
    caseStudy: {
      overview:
        'Built for a single coach and a single admin: no marketplace, no tenants. The public site is editorial and quiet; the dashboard handles leads, posts, offers, results, services and analytics.',
      highlights: [
        'Lead workflow NEW, CONTACTED, ACCEPTED, IN_PROGRESS, COMPLETED, with rejection and archiving paths',
        'Argon2id passwords, HttpOnly session cookies, CSRF protection and rate-limited applications',
        'Analytics for applications over time, status distribution, coaching type and workflow timing',
        'Hand-drawn SVG line art that draws itself and drifts with scroll, with no animation library',
      ],
      challenges: [
        { title: 'Motion that respects SSR', body: 'Reveals only switch on after hydration via data-motion="on", so content is never hidden when JavaScript has not run.' },
        { title: 'One cold endpoint, one empty section', body: 'safeGet() returns a fallback per request, so a single failing API call cannot blank the homepage.' },
        { title: 'Variable type, tuned', body: 'Fraunces is set with SOFT, WONK and opsz axes for the headline and wordmark.' },
        { title: 'Cross-origin sessions', body: 'SameSite=Lax cookies require the frontend and API to share a registrable domain.' },
      ],
      limitations: [
        'Application form, admin dashboard and inner pages are not part of the export; links are disabled in the preview.',
        'No photography ships with the project, so the hero and cards show the designed line-art placeholders.',
        'Fonts load from Google Fonts instead of next/font self-hosting.',
      ],
    },
  },
].sort((a, b) => a.featuredOrder - b.featuredOrder);

/** Earlier work, shown as a compact text index below the orbit. */
export const archive = [
  { id: 'caffaine', title: 'CaffAIne', note: 'Graduation project: cafe ordering and back office with two AI assistants, one for guests and one for the owner. Stock deducts itself from recipes on every order', stack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'OpenAI API'] },
  { id: 'adibot', title: 'Scout', note: 'Shopping assistant that understands "something warm for a rainy trip" and finds it, using semantic search and a conversational agent', stack: ['Next.js 14', 'FastAPI', 'FAISS', 'GPT-4o'] },
  { id: 'car-dealership', title: 'Forecourt', note: 'Multi-tenant dealership OS: every lot gets its own inventory, lead pipeline and admin dashboard', stack: ['React', 'Node.js', 'MySQL'] },
  { id: 'ecommerce', title: 'Parcel', note: 'Storefront engine with cart, checkout, payments and an admin panel that runs the whole shop', stack: ['Next.js', 'NestJS', 'MySQL'] },
  { id: 'coffee-shop', title: 'Roastline', note: 'Menu, online ordering and directions for a neighbourhood coffee shop, built to get people from phone to counter', stack: ['React', 'Express'] },
  { id: 'artist-portfolio', title: 'Negative Space', note: 'Gallery for a visual artist where motion frames the work instead of competing with it', stack: ['React', 'Vite', 'Framer Motion'] },
];
