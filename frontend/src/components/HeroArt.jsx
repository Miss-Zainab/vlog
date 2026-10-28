export default function HeroArt() {
  const angles = [20, 70, 125, 175, 230, 280, 330];
  const nodes = angles.map((deg, i) => {
    const r = [215, 160, 110][i % 3];
    const rad = (deg * Math.PI) / 180;
    return { x: 250 + r * Math.cos(rad), y: 250 + r * Math.sin(rad), r };
  });

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
      role="img"
      aria-label="Abstract illustration of a glowing neural network orb in purple and cyan light"
    >
      <svg viewBox="0 0 500 500" className="h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="hero-orb" cx="50%" cy="45%" r="55%">
            <stop offset="0" stopColor="#22D3EE" stopOpacity="0.9" />
            <stop offset="0.45" stopColor="#8B5CF6" stopOpacity="0.8" />
            <stop offset="1" stopColor="#0B1020" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
          <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="#273449" strokeWidth="0.7" />
          </pattern>
          <clipPath id="hero-clip">
            <circle cx="250" cy="250" r="238" />
          </clipPath>
          <filter id="hero-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <rect width="500" height="500" fill="url(#hero-grid)" clipPath="url(#hero-clip)" opacity="0.6" />
        <circle cx="250" cy="250" r="150" fill="url(#hero-orb)" filter="url(#hero-blur)" />
        <circle cx="250" cy="250" r="125" fill="url(#hero-orb)" opacity="0.9" />

        <circle cx="250" cy="250" r="215" fill="none" stroke="url(#hero-ring)" strokeWidth="1.2" opacity="0.7" />
        <circle cx="250" cy="250" r="160" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="3 9" opacity="0.6" />
        <circle cx="250" cy="250" r="110" fill="none" stroke="#8B5CF6" strokeWidth="1.2" opacity="0.7" />

        {nodes.map((n, i) => (
          <line key={`l${i}`} x1="250" y1="250" x2={n.x} y2={n.y} stroke="url(#hero-ring)" strokeOpacity="0.25" />
        ))}
        {nodes.map((n, i) => (
          <g key={`n${i}`}>
            <circle cx={n.x} cy={n.y} r="11" fill={i % 2 ? "#8B5CF6" : "#22D3EE"} opacity="0.18" />
            <circle cx={n.x} cy={n.y} r="4.5" fill={i % 2 ? "#8B5CF6" : "#22D3EE"} />
          </g>
        ))}

        <circle cx="250" cy="250" r="38" fill="#0B1020" stroke="url(#hero-ring)" strokeWidth="2" />
        <text
          x="250"
          y="257"
          textAnchor="middle"
          fill="#F8FAFC"
          fontSize="22"
          fontWeight="600"
          fontFamily="'JetBrains Mono', ui-monospace, monospace"
        >
          AI
        </text>
      </svg>

      <div className="absolute bottom-2 left-0 w-[82%] rounded-xl border border-line bg-surface/90 p-4 font-mono text-xs leading-relaxed shadow-2xl shadow-brand/20 backdrop-blur sm:text-sm">
        <p className="text-muted">// build the future</p>
        <p>
          <span className="text-brand">const</span> idea ={" "}
          <span className="text-glow">await</span> ai.think();
        </p>
      </div>

      <div className="absolute right-2 top-6 rounded-full border border-line bg-surface/90 px-3 py-1 font-mono text-xs text-glow backdrop-blur">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-glow" />
        online
      </div>
    </div>
  );
}
