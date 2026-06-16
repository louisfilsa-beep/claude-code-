import { useRef, useState } from 'react';
import { joinWaitlist } from '../api/waitlist.js';

const STORAGE_KEY = 'drivearuba_waitlist';

function loadEmails() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Reusable email-capture form. `variant` only affects layout/styling so the
 * same component works in the hero and in the final CTA banner.
 */
export default function WaitlistForm({ id, variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const seen = useRef(loadEmails());

  const remember = (value) => {
    seen.current.add(value);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...seen.current]));
    } catch {
      /* private mode / storage full — non-fatal */
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    const value = email.trim().toLowerCase();

    if (!EMAIL_RE.test(value)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    if (seen.current.has(value)) {
      setStatus('success');
      setMessage("You're already on the list — we'll be in touch! 🎉");
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      await joinWaitlist(value);
      remember(value);
      setStatus('success');
      setMessage("You're on the list! We'll email you when we launch. 🎉");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  const done = status === 'success';

  return (
    <form
      className={`waitlist waitlist--${variant}`}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="waitlist__row">
        <input
          id={id}
          className="waitlist__input"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || done}
          required
        />
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === 'loading' || done}
        >
          {status === 'loading' ? 'Joining…' : done ? "You're in! ✓" : 'Get early access'}
        </button>
      </div>
      <p
        className={`waitlist__msg waitlist__msg--${status}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
