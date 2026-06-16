import { useEffect, useState } from 'react';

// A tiny hash-based router. Hash routing means every URL still loads index.html,
// so deep links and page refreshes work on static GitHub Pages without any
// server rewrite rules.
//
// Routes used by the app:
//   #/            -> landing page
//   #/learn       -> skill-tree home
//   #/lesson/:id  -> lesson player
//   #/practice    -> mock exam
//   #/profile     -> stats & settings

export function getPath() {
  const raw = window.location.hash.replace(/^#/, '');
  return raw || '/';
}

export function navigate(to) {
  const target = to.startsWith('#') ? to : `#${to}`;
  if (window.location.hash !== target) {
    window.location.hash = target;
  } else {
    // Same route requested — still scroll to top for screen changes.
    window.scrollTo(0, 0);
  }
}

export function useHashRoute() {
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const onChange = () => {
      setPath(getPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return path;
}
