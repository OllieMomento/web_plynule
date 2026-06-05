// scenes-b.jsx — story beats 5–7. Uses window globals from props/characters/scenes-a.

/* ---- Scene 5 — Do the woodwork ---- */
function SceneCraft() {
  return (
    <g className="pl-scene">
      <rect x="0" y="0" width="820" height="470" fill="#E3D7BC" />
      <rect x="0" y="372" width="820" height="98" fill="#A87B45" />
      <rect x="0" y="372" width="820" height="8" fill={PAL.woodL} opacity="0.6" />
      {/* tool rack on wall */}
      <g transform="translate(540 60)" stroke={PAL.woodD} strokeWidth="3">
        <line x1="0" y1="0" x2="220" y2="0" />
        <g fill={PAL.ink}>
          <rect x="20" y="2" width="8" height="64" rx="3" />
          <rect x="60" y="2" width="6" height="74" rx="3" />
          <path d="M110 2 l0 50 l-14 0 l14 24 l14 -24 l-14 0 z" />
          <rect x="160" y="2" width="36" height="14" rx="3" />
          <rect x="172" y="16" width="10" height="40" rx="3" />
        </g>
      </g>

      {/* workbench */}
      <rect x="120" y="312" width="520" height="26" rx="8" fill={PAL.woodD} />
      <rect x="150" y="338" width="20" height="50" fill={PAL.woodDD} />
      <rect x="590" y="338" width="20" height="50" fill={PAL.woodDD} />
      {/* the piece under construction */}
      <g transform="translate(300 250) scale(0.62)"><Table glow={false} /></g>

      {/* friend planing — shavings curl off */}
      <g className="pl-rise" style={{ '--d': '120ms' }}>
        <g transform="translate(150 200) scale(1.3)">
          <Friend variant="A" pose="chisel" tool={
            <g><rect x="-4" y="-6" width="34" height="14" rx="4" fill={PAL.woodD} /><rect x="26" y="-2" width="14" height="6" fill="#C9CDD2" stroke={PAL.ink} strokeWidth="1.5" /></g>
          } />
        </g>
      </g>
      {/* wood shavings */}
      <g className="pl-shavings">
        {[0,1,2,3].map(i=>(
          <path key={i} d="M0 0 q10 -10 20 0 q-6 10 -20 0z" transform={`translate(${300+i*26} ${300-i*4})`} fill={PAL.woodL} stroke={PAL.woodD} strokeWidth="1.2" />
        ))}
      </g>

      {/* friend B sanding the other end */}
      <g className="pl-rise" style={{ '--d': '60ms' }}>
        <g transform="translate(500 210) scale(1.25)"><Friend variant="B" pose="brush" flip tool={
          <rect x="-4" y="-4" width="22" height="14" rx="3" fill={PAL.cap} />
        } /></g>
      </g>

      <Bubble x={130} y={120} w={150} text="Measure twice…" delay={500} />
      <Bubble x={440} y={132} w={162} text="…cut five times." flip delay={1200} />
    </g>
  );
}

/* ---- Scene 6 — Premium oils ---- */
function SceneOil() {
  return (
    <g className="pl-scene">
      <rect x="0" y="0" width="820" height="470" fill="#EADFC6" />
      <rect x="0" y="362" width="820" height="108" fill="#B5894E" />
      <rect x="0" y="362" width="820" height="8" fill={PAL.woodL} opacity="0.7" />
      {/* warm light wash */}
      <ellipse cx="430" cy="220" rx="320" ry="200" fill="#FFE9B0" opacity="0.35" className="pl-pulse" />

      {/* the stool being oiled — glows on as the brush passes */}
      <g transform="translate(410 288) scale(1.05)"><Table glow /></g>

      {/* friend brushing oil */}
      <g className="pl-rise" style={{ '--d': '120ms' }}>
        <g transform="translate(150 190) scale(1.35)">
          <Friend variant="A" pose="brush" tool={
            <g transform="rotate(20)"><rect x="-3" y="0" width="6" height="24" rx="2" fill={PAL.woodD} /><rect x="-6" y="22" width="12" height="10" rx="2" fill="#2D2A24" /></g>
          } />
        </g>
        <g transform="translate(78 320)"><OilCan scale={1.1} /></g>
      </g>
      {/* shimmer drifting across the top */}
      <g className="pl-shimmer">
        <Sparkle x={360} y={210} s={1.2} />
        <Sparkle x={470} y={222} s={0.8} />
        <Sparkle x={300} y={228} s={0.7} />
      </g>

      <Bubble x={138} y={112} w={166} text="Smells… expensive." delay={700} />
    </g>
  );
}

/* ---- Scene 7 — Sell it to friends ---- */
function SceneSell() {
  return (
    <g className="pl-scene">
      <Ground fill="#6E8C4E" sky="#CFE0DA" y={372} />
      <circle cx="690" cy="92" r="40" fill="#FFE08A" />
      <ellipse cx="200" cy="400" rx="240" ry="64" fill="#5E7B42" opacity="0.7" />

      {/* the finished piece, proudly centered with a price-of-friendship tag */}
      <g transform="translate(410 288) scale(1.05)"><Table glow /></g>
      <g className="pl-tag" transform="translate(452 276)">
        <path d="M0 0 l40 0 l18 18 l-18 18 l-40 0 z" fill="#FFFDF6" stroke={PAL.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="48" cy="18" r="3.5" fill="none" stroke={PAL.ink} strokeWidth="2" />
        <text x="8" y="14" fontSize="11" fontWeight="700" fill={PAL.ink} fontFamily="'Bricolage Grotesque',sans-serif">a fair</text>
        <text x="8" y="27" fontSize="11" fontWeight="700" fill={PAL.cap} fontFamily="'Bricolage Grotesque',sans-serif">price</text>
      </g>

      {/* maker friend + buyer friend shaking hands */}
      <g className="pl-rise" style={{ '--d': '120ms' }}>
        <g transform="translate(150 240) scale(1.3)"><Friend variant="A" pose="handshake" /></g>
        <g transform="translate(560 240) scale(1.3)"><Friend variant="B" pose="handshake" flip /></g>
      </g>

      {/* floating hearts */}
      {[0,1,2].map(i=>(
        <path key={i} className={`pl-heart pl-heart${i}`}
              d="M0 4 C-6 -4 -16 2 0 14 C16 2 6 -4 0 4 z"
              transform={`translate(${360 + i*44} 180)`} fill={PAL.cap} />
      ))}

      <Bubble x={118} y={132} w={140} text="Mates' rates?" delay={500} />
      <Bubble x={462} y={150} w={184} text="…fine. Mates' rates." flip delay={1200} />
    </g>
  );
}

Object.assign(window, { SceneCraft, SceneOil, SceneSell });
