import { useProgress } from '../../state/progress.jsx';

export default function Profile() {
  const {
    name,
    xp,
    liveStreak,
    completedCount,
    totalLessons,
    examBest,
    setProfile,
    reset,
  } = useProgress();

  const level = Math.floor(xp / 100) + 1;
  const intoLevel = xp % 100;

  function onReset() {
    if (window.confirm('Reset all progress? This clears your XP, streak, and completed lessons.')) {
      reset();
    }
  }

  return (
    <div className="screen profile">
      <div className="profile__card">
        <div className="profile__avatar" aria-hidden="true">
          {(name || 'A').trim().charAt(0).toUpperCase()}
        </div>
        <input
          className="profile__name"
          value={name}
          placeholder="Future driver"
          aria-label="Your name"
          maxLength={24}
          onChange={(e) => setProfile(e.target.value)}
        />
        <div className="profile__level">
          <span>Level {level}</span>
          <div className="profile__track">
            <span style={{ width: `${intoLevel}%` }} />
          </div>
          <span className="profile__next">{100 - intoLevel} XP to level {level + 1}</span>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat">
          <span className="stat__num">🔥 {liveStreak}</span>
          <span className="stat__lbl">Day streak</span>
        </div>
        <div className="stat">
          <span className="stat__num">⭐ {xp}</span>
          <span className="stat__lbl">Total XP</span>
        </div>
        <div className="stat">
          <span className="stat__num">
            {completedCount}/{totalLessons}
          </span>
          <span className="stat__lbl">Lessons done</span>
        </div>
        <div className="stat">
          <span className="stat__num">{examBest != null ? `${examBest}%` : '—'}</span>
          <span className="stat__lbl">Best exam</span>
        </div>
      </div>

      <button className="btn btn--ghost btn--block" onClick={onReset}>
        Reset progress
      </button>

      <p className="profile__disclaimer">
        DriveAruba Learn is an independent study aid and is not affiliated with any
        Aruba government body. Always confirm rules against the official Aruba
        driving manual before your exam.
      </p>
    </div>
  );
}
