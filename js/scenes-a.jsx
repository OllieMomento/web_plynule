// scenes-a.jsx — story beats 1–4. Each scene = a <g class="pl-scene"> on an 820×470 stage.
// Entrance/idle animation is gated by the player adding [data-active] to the active scene.

function Bubble({ x, y, text, w = 140, flip = false, delay = 0 }) {
  const h = 40;
  const tBase = flip ? w - 38 : 20;
  const tipX = flip ? w - 22 : 26;
  return (
    <g transform={`translate(${x} ${y})`} className="pl-bubble" style={{ '--d': `${delay}ms` }}>
      <rect x="0" y="0" width={w} height={h} rx="20" fill="#FFFDF6" stroke={PAL.ink} strokeWidth="3" />
      {/* tail: fill covers the bubble's bottom border, then only the two slanted sides are stroked */}
      <path d={`M${tBase} ${h - 4} L${tBase + 18} ${h - 4} L${tipX} ${h + 18} Z`} fill="#FFFDF6" />
      <path d={`M${tBase} ${h - 3} L${tipX} ${h + 18} M${tBase + 18} ${h - 3} L${tipX} ${h + 18}`}
            stroke={PAL.ink} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x={w / 2} y={h / 2 + 6.5} textAnchor="middle" fontSize="21"
            fontFamily="'Caveat',cursive" fontWeight="700" fill={PAL.ink}>{text}</text>
    </g>
  );
}

function Ground({ fill = PAL.leafD, y = 372, sky = PAL.sky }) {
  return (
    <g>
      <rect x="0" y="0" width="820" height="470" fill={sky} />
      <rect x="0" y={y} width="820" height={470 - y} fill={fill} />
      <rect x="0" y={y} width="820" height="10" fill="#FFFFFF" opacity="0.12" />
    </g>
  );
}

/* ---- Scene 1 — Cut the tree down ---- */
function SceneCut() {
  return (
    <g className="pl-scene">
      <Ground fill="#6E8C4E" />
      <circle cx="120" cy="92" r="38" fill="#FFE08A" className="pl-spin-slow" style={{ transformOrigin: '120px 92px' }} />
      {/* distant hills */}
      <ellipse cx="640" cy="392" rx="220" ry="70" fill="#5E7B42" />
      <ellipse cx="180" cy="400" rx="200" ry="60" fill="#5E7B42" opacity="0.7" />

      {/* the doomed tree */}
      <g className="pl-fall pl-fallgrp">
        <Tree x={600} y={372} scale={1.25} fall />
      </g>
      {/* falling leaves */}
      <g className="pl-leaffall"><Sparkle x={560} y={150} s={0} /></g>
      {[0, 1, 2].map(i => (
        <circle key={i} className={`pl-leaf pl-leaf${i}`} cx={520 + i * 40} cy={170} r="6" fill={PAL.leaf} />
      ))}

      {/* two friends with crosscut saw, on the stump side */}
      <g className="pl-rise" style={{ '--d': '120ms' }}>
        <g transform="translate(168 250) scale(1.35)"><Friend variant="A" pose="saw" /></g>
        <g transform="translate(360 250) scale(1.35)"><Friend variant="B" pose="saw" flip /></g>
        {/* saw blade between them */}
        <g className="pl-saw">
          <path d="M250 360 L470 360 L470 372 Q360 386 250 372 Z" fill="#C9CDD2" stroke={PAL.ink} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M255 372 q12 8 24 0 q12 8 24 0 q12 8 24 0 q12 8 24 0 q12 8 24 0 q12 8 24 0 q12 8 24 0"
                fill="none" stroke={PAL.ink} strokeWidth="2" />
          <rect x="232" y="352" width="16" height="26" rx="6" fill={PAL.woodD} />
          <rect x="472" y="352" width="16" height="26" rx="6" fill={PAL.woodD} />
        </g>
      </g>

      <Bubble x={150} y={186} w={150} text="It's the one." delay={500} />
    </g>
  );
}

/* ---- Scene 2 — Let it dry. For four years. ---- */
function SceneDry() {
  return (
    <g className="pl-scene">
      <rect x="0" y="0" width="820" height="470" fill="#E7D3AC" />
      <rect x="0" y="372" width="820" height="98" fill="#B98E55" />
      <rect x="0" y="372" width="820" height="8" fill="#8C5A2B" />
      {/* shed planks on wall */}
      {[40, 120, 200, 280].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="820" y2={y} stroke="#D8C194" strokeWidth="2" />
      ))}
      {/* window with light */}
      <rect x="600" y="60" width="150" height="120" rx="8" fill="#CFE0DA" stroke={PAL.woodD} strokeWidth="6" />
      <line x1="675" y1="60" x2="675" y2="180" stroke={PAL.woodD} strokeWidth="5" />
      <line x1="600" y1="120" x2="750" y2="120" stroke={PAL.woodD} strokeWidth="5" />

      {/* drying planks leaning, with cobweb + dust */}
      <g transform="translate(470 200) rotate(-8)"><Planks x={0} y={150} n={4} w={150} /></g>
      <path d="M620 198 q30 8 30 40 M650 238 q-22 6 -40 2 M650 238 l-6 26" stroke="#fff" strokeWidth="1.4" opacity="0.5" fill="none" />
      <circle cx="649" cy="238" r="3" fill="#3a3a3a" className="pl-spider" />

      {/* calendar with flipping years */}
      <g transform="translate(120 70)">
        <rect x="0" y="0" width="120" height="100" rx="10" fill="#FFFDF6" stroke={PAL.ink} strokeWidth="3" />
        <rect x="0" y="0" width="120" height="26" rx="10" fill={PAL.cap} />
        <rect x="0" y="16" width="120" height="12" fill={PAL.cap} />
        <text x="60" y="18" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff" fontFamily="'Bricolage Grotesque',sans-serif">DRYING</text>
        <text x="60" y="78" textAnchor="middle" className="pl-year" fontSize="46" fontWeight="800" fill={PAL.ink} fontFamily="'Bricolage Grotesque',sans-serif">4</text>
        <text x="60" y="95" textAnchor="middle" fontSize="11" fill="#9A8050" fontFamily="'Bricolage Grotesque',sans-serif">years left… ish</text>
      </g>

      {/* two friends sitting, waiting, growing beards */}
      <g className="pl-rise" style={{ '--d': '150ms' }}>
        <g transform="translate(150 270) scale(1.15)"><Friend variant="A" pose="think" beard={0.55} blink={false} /></g>
        <g transform="translate(300 270) scale(1.15)"><Friend variant="B" pose="idle" beard={0.7} flip blink={false} /></g>
      </g>

      {/* snail crossing very slowly */}
      <g className="pl-snail">
        <ellipse cx="0" cy="0" rx="12" ry="9" fill="#C98A40" />
        <ellipse cx="2" cy="0" rx="7" ry="5" fill={PAL.woodD} />
        <path d="M-12 4 q-8 1 -10 -6" stroke="#9A8050" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      <Bubble x={120} y={196} w={128} text="…ready yet?" delay={500} />
      <Bubble x={300} y={214} w={96} text="Nope." flip delay={1100} />
    </g>
  );
}

/* ---- Scene 3 — Make planks ---- */
function SceneMill() {
  return (
    <g className="pl-scene">
      <Ground fill="#7A6240" sky="#DCD2BD" y={372} />
      {/* saw bench */}
      <rect x="120" y="300" width="580" height="22" rx="8" fill={PAL.woodD} />
      <rect x="150" y="322" width="18" height="58" fill={PAL.woodDD} />
      <rect x="652" y="322" width="18" height="58" fill={PAL.woodDD} />

      {/* circular blade */}
      <g transform="translate(410 300)">
        <circle cx="0" cy="0" r="52" fill="#D6DADF" stroke={PAL.ink} strokeWidth="3" className="pl-spin-fast" style={{ transformOrigin: '410px 300px' }} />
        <g className="pl-spin-fast" style={{ transformOrigin: '410px 300px' }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <path key={i} d={`M${Math.cos(a) * 52} ${Math.sin(a) * 52} l${Math.cos(a + 0.2) * 10} ${Math.sin(a + 0.2) * 10}`} stroke={PAL.ink} strokeWidth="4" />;
          })}
          <circle cx="0" cy="0" r="9" fill={PAL.ink} />
        </g>
      </g>

      {/* log feeding in -> planks out */}
      <g className="pl-feed-machine"><Log x={500} y={290} w={210} scale={0.9} /></g>
      <g className="pl-rise" style={{ '--d': '120ms' }}>
        <Planks x={130} y={296} n={3} w={150} />
      </g>

      {/* sawdust burst */}
      <g className="pl-dust">
        {Array.from({ length: 9 }).map((_, i) => (
          <circle key={i} cx={410 + (i - 4) * 8} cy={300} r={2 + (i % 3)} fill="#EAD9B6" />
        ))}
      </g>

      {/* friend pushing the log */}
      <g className="pl-rise" style={{ '--d': '60ms' }}>
        <g transform="translate(600 200) scale(1.3)"><Friend variant="A" pose="point" /></g>
      </g>
      <Bubble x={460} y={150} w={190} text="Now we're cooking." flip delay={700} />
    </g>
  );
}

/* ---- Scene 4 — Create the design ---- */
function SceneDesign() {
  return (
    <g className="pl-scene">
      <rect x="0" y="0" width="820" height="470" fill="#E9DFC8" />
      <rect x="0" y="360" width="820" height="110" fill="#C98A40" />
      <rect x="0" y="360" width="820" height="8" fill={PAL.woodL} opacity="0.6" />

      {/* big blueprint pinned to wall with a chair sketch */}
      <g transform="translate(470 50)">
        <rect x="0" y="0" width="300" height="220" rx="8" fill="#2E5C77" />
        <rect x="0" y="0" width="300" height="220" rx="8" fill="#2E5C77" stroke="#1E3E52" strokeWidth="3" />
        <g stroke="#CFE6F2" strokeWidth="2.5" fill="none" className="pl-draw">
          <rect x="90" y="60" width="120" height="90" rx="4" />
          <path d="M90 60 l0 -44 l120 0 l0 44 M90 150 l-12 50 M210 150 l12 50 M120 150 l0 44 M180 150 l0 44" />
          <circle cx="150" cy="40" r="0" />
        </g>
        <text x="20" y="200" fontSize="14" fill="#CFE6F2" fontFamily="'Caveat',cursive">model nº1 — "the one"</text>
        {[ [10,10],[290,10],[10,210],[290,210] ].map((p,i)=>(<circle key={i} cx={p[0]} cy={p[1]} r="6" fill={PAL.cap}/>))}
      </g>

      {/* desk + sketching friend */}
      <rect x="60" y="300" width="300" height="20" rx="6" fill={PAL.woodD} />
      <rect x="80" y="320" width="16" height="56" fill={PAL.woodDD} />
      <rect x="324" y="320" width="16" height="56" fill={PAL.woodDD} />
      <g className="pl-rise" style={{ '--d': '120ms' }}>
        <g transform="translate(120 180) scale(1.25)">
          <Friend variant="B" pose="sketch" tool={
            <g transform="rotate(40)"><rect x="-2" y="0" width="4" height="26" rx="2" fill="#E0A93B" /><path d="M-2 26 l2 6 l2 -6 z" fill={PAL.ink} /></g>
          } />
        </g>
        <Bulb x={150} y={150} scale={1.1} />
      </g>

      {/* crumpled rejected ideas (gag) */}
      {[ [250,360,1],[300,372,0.8],[210,374,0.7],[360,366,0.9] ].map((c,i)=>(
        <g key={i} className="pl-crumple" style={{ '--d': `${300 + i*180}ms` }}>
          <circle cx={c[0]} cy={c[1]} r={10*c[2]} fill="#FFFDF6" stroke="#C9BE9C" strokeWidth="2" />
          <path d={`M${c[0]-5} ${c[1]-3} l4 4 M${c[0]+2} ${c[1]-4} l3 5 M${c[0]-2} ${c[1]+3} l5 -2`} stroke="#C9BE9C" strokeWidth="1.4" />
        </g>
      ))}

      <Bubble x={120} y={122} w={140} text="What if… legs?" delay={800} />
    </g>
  );
}

Object.assign(window, { Bubble, Ground, SceneCut, SceneDry, SceneMill, SceneDesign });
