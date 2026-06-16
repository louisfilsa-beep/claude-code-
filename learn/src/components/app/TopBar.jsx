import { useProgress } from '../../state/progress.jsx';

export default function TopBar() {
  const { liveStreak, xp } = useProgress();
  const level = Math.floor(xp / 100) + 1;

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo" aria-hidden="true">🚗</span>
        <span className="topbar__name">DriveAruba</span>
      </div>
      <div className="topbar__stats">
        <span className="chip chip--streak" title="Daily streak">🔥 {liveStreak}</span>
        <span className="chip chip--xp" title="Total XP">⭐ {xp}</span>
        <span className="chip chip--lvl" title="Level">Lv {level}</span>
      </div>
    </header>
  );
}
