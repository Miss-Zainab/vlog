import { hashString } from "../utils";

// small seeded random generator so each post gets its own (stable) artwork
const makeRng = (seed) => {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const PALETTES = [
  ["#8B5CF6", "#22D3EE"],
  ["#6366F1", "#22D3EE"],
  ["#A855F7", "#3B82F6"],
  ["#22D3EE", "#8B5CF6"],
];

/** Generated fallback cover: used when a post has no image or the image fails to load */
export default function CoverArt({ seed = "post", label = "Technology" }) {
  const h = hashString(String(seed));
  const rng = makeRng(h);
  const [c1, c2] = PALETTES[h % PALETTES.length];
  const id = `ca-${h}`;

  const nodes = Array.from({ length: 9 }, () => ({
    x: 60 + rng() * 520,
    y: 40 + rng() * 280,
    r: 3 + rng() * 5,
  }));

  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${label} article cover artwork`}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#151C30" />
          <stop offset="1" stopColor="#0B1020" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor={c1} stopOpacity="0.55" />
          <stop offset="1" stopColor={c1} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-glow2`}>
          <stop offset="0" stopColor={c2} stopOpacity="0.4" />
          <stop offset="1" stopColor={c2} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#273449" strokeWidth="0.7" />
        </pattern>
      </defs>

      <rect width="640" height="400" fill={`url(#${id}-bg)`} />
      <rect width="640" height="400" fill={`url(#${id}-grid)`} opacity="0.55" />
      <circle cx={120 + rng() * 120} cy={90 + rng() * 80} r="190" fill={`url(#${id}-glow)`} />
      <circle cx={400 + rng() * 140} cy={200 + rng() * 120} r="210" fill={`url(#${id}-glow2)`} />

      {nodes.slice(1).map((n, i) => (
        <line
          key={`l${i}`}
          x1={nodes[i].x}
          y1={nodes[i].y}
          x2={n.x}
          y2={n.y}
          stroke={i % 2 ? c1 : c2}
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r={n.r * 2.6} fill={i % 2 ? c1 : c2} opacity="0.15" />
          <circle cx={n.x} cy={n.y} r={n.r} fill={i % 2 ? c1 : c2} />
        </g>
      ))}

      <text
        x="28"
        y="372"
        fill="#94A3B8"
        fontSize="15"
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
      >
        {`// ${label.toLowerCase()}`}
      </text>
    </svg>
  );
}
