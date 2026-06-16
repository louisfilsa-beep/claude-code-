import WaitlistForm from './WaitlistForm.jsx';
import PhoneMockup from './PhoneMockup.jsx';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="badge">🇦🇼 Built for Aruba · Now in early access</span>
          <h1 className="hero__title">
            Pass your Aruba driving<br />
            theory exam — <span className="hl">the fun way</span>
          </h1>
          <p className="hero__sub">
            DriveAruba Learn turns the driving manual into bite-sized, gamified
            lessons. Master traffic signs, right-of-way, and the road rules of
            Aruba — then walk into the exam ready.
          </p>

          <WaitlistForm id="email-hero" variant="hero" />

          <p className="hero__proof">
            <strong>Learn. Practice. Pass.</strong> &nbsp;Be among the first
            future drivers to try it — free at launch.
          </p>
        </div>

        <div className="hero__art">
          <PhoneMockup />
        </div>
      </div>
    </header>
  );
}
