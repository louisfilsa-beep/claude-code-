// Renders an Aruba/international-style traffic sign as inline SVG.
// Usage: <Sign sign="giveWay" /> or <Sign sign="speed" value={60} />
export default function Sign({ sign, value, size = 120 }) {
  const common = { width: size, height: size, viewBox: '0 0 100 100', role: 'img' };

  switch (sign) {
    case 'stop':
      return (
        <svg {...common} aria-label="Stop sign">
          <polygon
            points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30"
            fill="#D32D27"
            stroke="#fff"
            strokeWidth="4"
          />
          <text
            x="50"
            y="60"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="26"
            fill="#fff"
          >
            STOP
          </text>
        </svg>
      );

    case 'giveWay':
      return (
        <svg {...common} aria-label="Give way sign">
          <polygon
            points="50,8 92,82 8,82"
            fill="#fff"
            stroke="#D32D27"
            strokeWidth="9"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'noEntry':
      return (
        <svg {...common} aria-label="No entry sign">
          <circle cx="50" cy="50" r="42" fill="#D32D27" stroke="#fff" strokeWidth="4" />
          <rect x="24" y="43" width="52" height="14" rx="2" fill="#fff" />
        </svg>
      );

    case 'priority':
      return (
        <svg {...common} aria-label="Priority road sign">
          <rect
            x="50"
            y="6"
            width="44"
            height="44"
            rx="6"
            transform="rotate(45 50 28)"
            fill="#FFD21E"
            stroke="#1c1c1c"
            strokeWidth="3"
          />
          <rect
            x="50"
            y="14"
            width="28"
            height="28"
            rx="3"
            transform="rotate(45 50 28)"
            fill="#fff"
          />
        </svg>
      );

    case 'roundabout':
      return (
        <svg {...common} aria-label="Roundabout sign">
          <circle cx="50" cy="50" r="42" fill="#0E72C8" stroke="#fff" strokeWidth="4" />
          <g fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round">
            <path d="M50 30 a20 20 0 0 1 17 30" />
            <path d="M64 64 a20 20 0 0 1-34-4" />
            <path d="M33 38 a20 20 0 0 1 17-8" />
          </g>
          <g fill="#fff">
            <path d="M64 24 l8 8 -10 4 z" />
            <path d="M70 70 l-2 11 -9 -7 z" />
            <path d="M25 44 l-3 -11 11 2 z" />
          </g>
        </svg>
      );

    case 'speed':
      return (
        <svg {...common} aria-label={`Speed limit ${value}`}>
          <circle cx="50" cy="50" r="42" fill="#fff" stroke="#D32D27" strokeWidth="10" />
          <text
            x="50"
            y="64"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="40"
            fill="#1c1c1c"
          >
            {value ?? 60}
          </text>
        </svg>
      );

    case 'noParking':
      return (
        <svg {...common} aria-label="No parking sign">
          <circle cx="50" cy="50" r="42" fill="#0E72C8" stroke="#D32D27" strokeWidth="8" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="#D32D27" strokeWidth="8" />
          <text
            x="50"
            y="62"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontWeight="800"
            fontSize="34"
            fill="#fff"
          >
            P
          </text>
        </svg>
      );

    case 'noOvertaking':
      return (
        <svg {...common} aria-label="No overtaking sign">
          <circle cx="50" cy="50" r="42" fill="#fff" stroke="#D32D27" strokeWidth="8" />
          <rect x="28" y="42" width="20" height="24" rx="3" fill="#1c1c1c" />
          <rect x="52" y="42" width="20" height="24" rx="3" fill="#D32D27" />
        </svg>
      );

    case 'pedestrian':
      return (
        <svg {...common} aria-label="Pedestrian crossing sign">
          <rect x="10" y="10" width="80" height="80" rx="8" fill="#0E72C8" />
          <circle cx="50" cy="30" r="6" fill="#fff" />
          <path
            d="M50 38 l-8 16 m8 -16 l8 16 m-8 -12 v18 m0 0 l-7 10 m7 -10 l7 10"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'children':
      return (
        <svg {...common} aria-label="Children crossing warning">
          <polygon
            points="50,8 92,82 8,82"
            fill="#fff"
            stroke="#D32D27"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <circle cx="44" cy="44" r="4" fill="#1c1c1c" />
          <circle cx="60" cy="48" r="4" fill="#1c1c1c" />
          <path
            d="M44 49 v12 m-5 -8 l10 2 m-5 6 l-5 8 m5 -8 l4 8 M60 53 v11 m-5 -7 l10 1 m-5 6 l-4 7 m4 -7 l4 7"
            stroke="#1c1c1c"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'oneway':
      return (
        <svg {...common} aria-label="One way sign">
          <rect x="14" y="34" width="72" height="32" rx="4" fill="#0E72C8" />
          <path d="M30 50 h32 m0 0 l-8 -7 m8 7 l-8 7" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return (
        <svg {...common} aria-label="Traffic sign">
          <circle cx="50" cy="50" r="42" fill="#e2eef6" stroke="#9bb3c2" strokeWidth="4" />
          <text x="50" y="58" textAnchor="middle" fontSize="34" fill="#5b7a8c">?</text>
        </svg>
      );
  }
}
