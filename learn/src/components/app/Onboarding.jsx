import { useState } from 'react';
import { useProgress } from '../../state/progress.jsx';

// Shown once, the first time someone enters the app.
export default function Onboarding() {
  const { setProfile } = useProgress();
  const [name, setName] = useState('');

  return (
    <div className="onboard">
      <div className="onboard__card">
        <div className="onboard__emoji" aria-hidden="true">🚗💨</div>
        <h1 className="onboard__title">Welcome to DriveAruba Learn</h1>
        <p className="onboard__sub">
          Bite-sized lessons, real exam practice, and a streak to keep you going.
          What should we call you?
        </p>
        <input
          className="onboard__input"
          value={name}
          placeholder="Your name (optional)"
          aria-label="Your name"
          maxLength={24}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setProfile(name)}
        />
        <button className="btn btn--primary btn--block" onClick={() => setProfile(name)}>
          Start learning
        </button>
      </div>
    </div>
  );
}
