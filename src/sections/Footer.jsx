export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          Designed &amp; built by Omar Al-Ajarmeh · {year}
        </div>
      </div>
    </footer>
  );
}
