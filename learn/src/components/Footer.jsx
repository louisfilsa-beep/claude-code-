import Logo from './Logo.jsx';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo />
          <p className="footer__tag">Learn. Practice. Pass.</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#topics">Topics</a>
          <a href="#join">Join waitlist</a>
        </nav>
        <p className="footer__note">
          © {year} DriveAruba Learn · An independent study aid, not affiliated
          with any Aruba government body.
        </p>
      </div>
    </footer>
  );
}
