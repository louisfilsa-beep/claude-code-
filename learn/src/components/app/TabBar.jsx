import { navigate } from '../../lib/router.js';

const TABS = [
  { path: '/learn', label: 'Learn', icon: '🛣️' },
  { path: '/practice', label: 'Exam', icon: '📝' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

export default function TabBar({ path }) {
  return (
    <nav className="tabbar" aria-label="Main">
      {TABS.map((t) => {
        const active = path === t.path;
        return (
          <button
            key={t.path}
            className={`tab ${active ? 'tab--active' : ''}`}
            aria-current={active ? 'page' : undefined}
            onClick={() => navigate(t.path)}
          >
            <span className="tab__icon" aria-hidden="true">{t.icon}</span>
            <span className="tab__label">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
