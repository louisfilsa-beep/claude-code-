import PhoneMockup from './PhoneMockup.jsx';
import { navigate } from '../lib/router.js';
import { useProgress } from '../state/progress.jsx';

export default function Hero() {
  const { completedCount } = useProgress();
  const returning = completedCount > 0;

  return (
    <header className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="badge">🇦🇼 Built for Aruba · Free to play</span>
          <h1 className="hero__title">
            Pass your Aruba driving<br />
            theory exam — <span className="hl">the fun way</span>
          </h1>
          <p className="hero__sub">
            DriveAruba Learn turns the driving manual into bite-sized, gamified
            lessons. Master traffic signs, right-of-way, and the road rules of
            Aruba — then ace the exam.
          </p>

          <div className="hero__cta">
            <button className="btn btn--primary btn--lg" onClick={() => navigate('/learn')}>
              {returning ? 'Continue learning' : 'Start learning — free'}
            </button>
            <span className="hero__nosignup">No sign-up · progress saves automatically</span>
          </div>

          <p className="hero__proof">
            <strong>Learn. Practice. Pass.</strong>
          </p>
        </div>

        <div className="hero__art">
          <PhoneMockup />
        </div>
      </div>
    </header>
  );
}
