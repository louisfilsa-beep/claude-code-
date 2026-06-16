import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a className="nav__brand" href="#top" aria-label="DriveAruba Learn home">
        <Logo />
      </a>
      <a className="btn btn--sm btn--primary" href="#join">
        Join the waitlist
      </a>
    </nav>
  );
}
