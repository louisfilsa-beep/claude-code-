const FEATURES = [
  {
    icon: '🎮',
    title: 'Learning that feels like a game',
    body: 'Bite-sized lessons, instant feedback, and rewards keep you coming back — so studying never feels like a chore.',
  },
  {
    icon: '🚸',
    title: 'Every Aruba traffic sign',
    body: 'Warning, priority, prohibition, and mandatory signs — drilled until you recognise each one in a split second.',
  },
  {
    icon: '🔀',
    title: 'Right-of-way, made obvious',
    body: 'Intersections, roundabouts, and priority rules explained with clear visuals instead of dense legal text.',
  },
  {
    icon: '📝',
    title: 'Real exam practice',
    body: 'Timed mock exams that mirror the official Aruba theory test, so the real thing feels familiar.',
  },
  {
    icon: '📊',
    title: 'See your progress',
    body: 'Track mastery per topic and watch your weak spots turn green before exam day.',
  },
  {
    icon: '🤖',
    title: 'AI tutor (coming soon)',
    body: "Stuck on a question? Ask why an answer is right and get a plain-language explanation, any time.",
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="section__head">
        <p className="eyebrow">Why DriveAruba</p>
        <h2 className="section__title">Everything you need to pass — in one app</h2>
        <p className="section__sub">
          No more flipping through a PDF manual. Learn the way your brain
          actually remembers things: a little every day, with feedback that
          sticks.
        </p>
      </div>

      <div className="cards">
        {FEATURES.map((f) => (
          <article className="card" key={f.title}>
            <span className="card__icon" aria-hidden="true">{f.icon}</span>
            <h3 className="card__title">{f.title}</h3>
            <p className="card__body">{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
