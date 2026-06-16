import { navigate } from '../lib/router.js';

export default function FinalCTA() {
  return (
    <section className="cta" id="join">
      <div className="cta__inner">
        <h2 className="cta__title">Ready to hit the road?</h2>
        <p className="cta__sub">
          Jump into your first lesson now — it's free, there's no sign-up, and
          your streak starts today.
        </p>
        <button className="btn btn--primary btn--lg" onClick={() => navigate('/learn')}>
          Start learning
        </button>
      </div>
    </section>
  );
}
