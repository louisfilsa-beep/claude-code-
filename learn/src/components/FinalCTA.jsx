import WaitlistForm from './WaitlistForm.jsx';

export default function FinalCTA() {
  return (
    <section className="cta" id="join">
      <div className="cta__inner">
        <h2 className="cta__title">Be first in line when we launch</h2>
        <p className="cta__sub">
          Join the waitlist and we'll let you know the moment DriveAruba Learn
          goes live. No spam — just your ticket to a confident pass.
        </p>
        <WaitlistForm id="email-cta" variant="cta" />
      </div>
    </section>
  );
}
