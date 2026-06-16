// A lightweight, pure-CSS/SVG preview of a lesson screen. Doubles as a sneak
// peek of the real app: a sign-recognition question with a progress bar,
// hearts, and a streak — the Duolingo-style loop in miniature.
export default function PhoneMockup() {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone__notch" />
      <div className="phone__screen">
        {/* Top status bar: progress, hearts, streak */}
        <div className="lesson__top">
          <div className="lesson__progress">
            <span style={{ width: '60%' }} />
          </div>
          <span className="lesson__hearts">❤️ 5</span>
        </div>

        <div className="lesson__streak">🔥 7-day streak · +20 XP</div>

        <p className="lesson__q">What does this sign mean?</p>

        {/* A "give way" / yield sign */}
        <div className="lesson__sign">
          <svg viewBox="0 0 100 100" width="92" height="92">
            <polygon
              points="50,8 92,82 8,82"
              fill="#fff"
              stroke="#E7332A"
              strokeWidth="9"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="lesson__options">
          <button className="opt">Stop completely</button>
          <button className="opt opt--correct">Give way to traffic ✓</button>
          <button className="opt">No entry</button>
        </div>

        <div className="lesson__check">CHECK</div>
      </div>
    </div>
  );
}
