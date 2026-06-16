const STEPS = [
  {
    n: 1,
    title: 'Learn',
    body: 'Short, visual lessons walk you through one concept at a time — signs, rules, and real road scenarios in Aruba.',
  },
  {
    n: 2,
    title: 'Practice',
    body: 'Quizzes and timed mock exams lock it in. Earn XP, keep your streak, and watch each topic turn green.',
  },
  {
    n: 3,
    title: 'Pass',
    body: 'Walk into the official theory exam knowing exactly what to expect — and get your licence.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="section__head">
        <p className="eyebrow eyebrow--light">How it works</p>
        <h2 className="section__title">Three steps to your licence</h2>
      </div>

      <div className="steps">
        {STEPS.map((s) => (
          <div className="step" key={s.n}>
            <div className="step__num">{s.n}</div>
            <h3 className="step__title">{s.title}</h3>
            <p className="step__body">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
