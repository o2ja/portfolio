const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#capabilities', label: 'Capabilities', optional: true },
  { href: '#about', label: 'About', optional: true },
];

export default function Nav() {
  return (
    <header className="nav">
      <div className="shell">
        <nav className="nav__bar" aria-label="Primary">
          <a href="#main" className="nav__mark">
            Omar Al-Ajarmeh
          </a>
          <ul className="nav__links">
            {LINKS.map((link) => (
              <li key={link.href} className={link.optional ? 'nav__optional' : undefined}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn--solid btn--plain">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
