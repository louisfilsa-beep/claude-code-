// Wordmark + steering-wheel mark, reused in the nav and footer.
export default function Logo({ size = 28 }) {
  return (
    <span className="logo" aria-label="DriveAruba Learn">
      <svg
        className="logo__mark"
        width={size}
        height={size}
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#16A6E9" />
            <stop offset="1" stopColor="#0E72C8" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#logoG)" />
        <circle cx="32" cy="32" r="17" fill="none" stroke="#fff" strokeWidth="4" />
        <circle cx="32" cy="32" r="4.5" fill="#fff" />
        <path d="M32 36.5 V49" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M28 33 L17 39" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M36 33 L47 39" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M32 9 l1.6 3.4 3.7.4 -2.8 2.5 .8 3.6 -3.3 -1.9 -3.3 1.9 .8 -3.6 -2.8 -2.5 3.7 -.4z"
          fill="#FFC400"
        />
      </svg>
      <span className="logo__text">
        Drive<span className="logo__accent">Aruba</span>
      </span>
    </span>
  );
}
