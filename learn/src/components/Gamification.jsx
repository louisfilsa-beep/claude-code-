const STATS = [
  { icon: '🔥', label: 'Daily streaks', body: 'Show up every day and build a streak that keeps you motivated.' },
  { icon: '⭐', label: 'XP & levels', body: 'Earn experience for every lesson and level up as you go.' },
  { icon: '❤️', label: 'Hearts', body: 'Mistakes cost hearts — just like the real pressure of the exam.' },
  { icon: '🏆', label: 'Leaderboards', body: 'Climb the ranks against other future drivers across Aruba.' },
];

export default function Gamification() {
  return (
    <section className="game" id="gamified">
      <div className="game__inner">
        <div className="game__copy">
          <p className="eyebrow eyebrow--light">Built to keep you going</p>
          <h2 className="section__title">Studying you'll actually look forward to</h2>
          <p className="game__sub">
            DriveAruba borrows what makes apps like Duolingo addictive — streaks,
            XP, hearts, and friendly competition — and points all of it at one
            goal: passing your theory exam.
          </p>
        </div>

        <div className="game__grid">
          {STATS.map((s) => (
            <div className="game__card" key={s.label}>
              <span className="game__icon" aria-hidden="true">{s.icon}</span>
              <h3 className="game__label">{s.label}</h3>
              <p className="game__body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
