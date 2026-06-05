// props.jsx — reusable SVG props for the story scenes. Small, flat shapes.

// A friendly tree (sway animated via CSS class on the crown)
function Tree({ x = 0, y = 0, scale = 1, fall = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-9" y="-70" width="18" height="80" rx="6" fill={PAL.bark} />
      <rect x="-9" y="-70" width="6" height="80" rx="3" fill="#5A3D24" opacity="0.6" />
      <g className={fall ? '' : 'pl-sway'}>
        <circle cx="0" cy="-96" r="42" fill={PAL.leaf} />
        <circle cx="-30" cy="-78" r="30" fill={PAL.leafD} />
        <circle cx="30" cy="-80" r="28" fill={PAL.leafD} />
        <circle cx="-6" cy="-118" r="28" fill={PAL.leaf} />
        <circle cx="20" cy="-104" r="24" fill={PAL.leaf} />
      </g>
    </g>
  );
}

// A stump left behind
function Stump({ x = 0, y = 0 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="20" ry="8" fill={PAL.woodD} />
      <ellipse cx="0" cy="-3" rx="20" ry="8" fill={PAL.wood} />
      <ellipse cx="0" cy="-3" rx="12" ry="5" fill={PAL.woodL} />
      <ellipse cx="0" cy="-3" rx="6" ry="2.5" fill={PAL.woodD} />
    </g>
  );
}

// A log with end-grain rings
function Log({ x = 0, y = 0, w = 150, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="-18" width={w} height="36" rx="18" fill={PAL.wood} />
      <rect x="0" y="-18" width={w} height="10" rx="5" fill={PAL.woodL} opacity="0.7" />
      <ellipse cx="0" cy="0" rx="9" ry="18" fill={PAL.woodL} />
      <ellipse cx="0" cy="0" rx="5.5" ry="11" fill={PAL.woodD} />
      <ellipse cx="0" cy="0" rx="2.5" ry="5" fill={PAL.woodL} />
      <ellipse cx={w} cy="0" rx="9" ry="18" fill={PAL.bark} />
    </g>
  );
}

// A stack of planks
function Planks({ x = 0, y = 0, n = 4, w = 150 }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <rect x="0" y={-i * 16} width={w} height="13" rx="3"
                fill={i % 2 ? PAL.wood : PAL.woodL} />
          <rect x="6" y={-i * 16 + 4} width={w - 18} height="2" rx="1"
                fill={PAL.woodD} opacity="0.35" />
        </g>
      ))}
    </g>
  );
}

// The finished hero object: a tall organic wavy stool (from the reference)
function Table({ x = 0, y = 0, scale = 1, glow = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {glow && <ellipse cx="0" cy="-20" rx="62" ry="66" fill="#fff" opacity="0.18" className="pl-pulse" />}
      <ellipse cx="2" cy="68" rx="52" ry="10" fill={PAL.woodDD} opacity="0.22" />

      {/* tall splayed wavy legs */}
      <path d="M-22 4 L-44 64 L-34 64 Q-26 52 -30 42 Q-35 33 -27 27 Q-20 20 -25 14 Q-28 8 -14 4 Z" fill={PAL.wood} />
      <path d="M22 4 L44 64 L34 64 Q26 52 30 42 Q35 33 27 27 Q20 20 25 14 Q28 8 14 4 Z" fill={PAL.woodD} />
      <path d="M-18 7 L-39 62" stroke={PAL.woodD} strokeWidth="2" opacity="0.4" fill="none" />
      <path d="M18 7 L39 62" stroke={PAL.woodDD} strokeWidth="2" opacity="0.4" fill="none" />

      {/* sculptural cross-foot */}
      <path d="M-20 60 Q-5 53 1 60 Q8 67 22 62 Q12 71 1 69 Q-9 68 -20 69 Z" fill={PAL.woodD} />
      <path d="M-3 61 q5 -5 10 0 q-5 6 -10 0 z" fill={PAL.woodDD} />

      {/* round organic seat */}
      <ellipse cx="0" cy="3" rx="50" ry="12" fill={PAL.woodD} />
      <ellipse cx="0" cy="-5" rx="50" ry="12" fill={PAL.wood} />
      <ellipse cx="-4" cy="-7" rx="40" ry="8" fill={PAL.woodL} opacity="0.55" />
      <path d="M-34 -10 q12 -4 22 1" stroke={PAL.woodL} strokeWidth="2.5" opacity="0.4" fill="none" strokeLinecap="round" />

      {glow && (
        <g className="pl-sparkle">
          <Sparkle x={36} y={-8} s={1.1} />
          <Sparkle x={-30} y={-12} s={0.8} />
          <Sparkle x={4} y={-13} s={0.6} />
        </g>
      )}
    </g>
  );
}

// Four-point sparkle
function Sparkle({ x = 0, y = 0, s = 1, fill = '#FFF4D6' }) {
  return (
    <path transform={`translate(${x} ${y}) scale(${s})`}
          d="M0 -9 Q1.6 -1.6 9 0 Q1.6 1.6 0 9 Q-1.6 1.6 -9 0 Q-1.6 -1.6 0 -9 z"
          fill={fill} />
  );
}

// Premium oil can / bottle
function OilCan({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="-16" y="-30" width="32" height="44" rx="6" fill="#2D2A24" />
      <rect x="-12" y="-22" width="24" height="26" rx="3" fill={PAL.beanie} />
      <rect x="-7" y="-38" width="14" height="10" rx="2" fill="#46423A" />
      <path d="M7 -34 q16 -2 18 -16" stroke="#46423A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <text x="0" y="-6" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2D2A24"
            fontFamily="'Bricolage Grotesque',sans-serif">OIL</text>
    </g>
  );
}

// Lightbulb idea
function Bulb({ x = 0, y = 0, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="pl-pop">
      <circle cx="0" cy="0" r="16" fill="#FFE08A" />
      <circle cx="0" cy="0" r="16" fill="none" stroke="#E0A93B" strokeWidth="2.5" />
      <rect x="-6" y="14" width="12" height="8" rx="2" fill="#9A8050" />
      <path d="M-3 -4 q3 5 6 0" stroke="#B5862A" strokeWidth="2" fill="none" strokeLinecap="round" />
      {[-28, -10, 8, 26].map((a, i) => (
        <line key={i} x1={Math.cos((a - 90) * Math.PI / 180) * 22} y1={Math.sin((a - 90) * Math.PI / 180) * 22}
              x2={Math.cos((a - 90) * Math.PI / 180) * 30} y2={Math.sin((a - 90) * Math.PI / 180) * 30}
              stroke="#E0A93B" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </g>
  );
}

Object.assign(window, { Tree, Stump, Log, Planks, Table, Sparkle, OilCan, Bulb });
