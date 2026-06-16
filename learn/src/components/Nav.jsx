import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { navigate } from '../lib/router.js';

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
      <button className="btn btn--sm btn--primary" onClick={() => navigate('/learn')}>
        Start learning
      </button>
    </nav>
  );
}
