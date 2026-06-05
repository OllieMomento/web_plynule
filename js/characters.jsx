// characters.jsx — Ollie & Filip, redrawn from the reference photo. Flat cut-paper style.
// variant 'A' = Ollie (spiky hair, blue striped shirt, navy jeans)
// variant 'B' = Filip (blue cap, dark tee, cream trousers). Both wear shades.

const PAL = {
  ink:   '#241F18',
  paper: '#F2E9D7',
  skin:  '#E8B98F',
  skinSh:'#D69B6C',
  // legacy accent keys still used by scene props:
  beanie:'#E0A93B',   // oil-can label
  cap:   '#DD5A33',   // scene accent (calendar header, blueprint pins, tag, hearts)
  swA:   '#3E7C77',
  swB:   '#E4CC97',
  // wood
  woodL: '#E7BE7E', wood:'#C98A40', woodD:'#8C5A2B', woodDD:'#6B4220', bark:'#6B4A2E',
  // foliage
  leaf:'#7C9A52', leafD:'#54713C', sky:'#CFE0DA',
  // --- character wardrobe (from photo) ---
  hair:    '#A37C4C',
  hairSh:  '#866134',
  tee:     '#F2F0E9',     // Ollie white tee
  shirt:   '#AEC9E6',     // Ollie light-blue shirt
  shirtSt: '#7FA7D2',     // shirt stripes
  jeans:   '#2C3B5C',     // Ollie navy jeans
  jeansSh: '#223049',
  belt:    '#211C16',
  flTee:   '#33333B',     // Filip dark tee
  flTeeSh: '#26262D',
  flCap:   '#7E5BC4',     // Filip purple cap
  flCapSh: '#5E3FA0',
  chino:   '#E3D7BB',     // Filip cream trousers
  chinoSh: '#CFC09B',
  shade:   '#1B1B20',     // sunglasses lens
  shadeRim:'#3A3A42',
  sneak:   '#CDD1D6',     // grey sneakers
  sneakSh: '#9DA2A8',
  sole:    '#6E7278',
};

const POSES = {
  idle:[16,-16], wave:[20,-150], saw:[-40,-64], carryHi:[-120,-120],
  sketch:[10,-58], chisel:[-30,-70], brush:[12,-66], think:[18,-120],
  handshake:[8,-78], cheer:[-150,-150], point:[16,-88],
};

// internal coords ~64 wide x 124 tall, feet at y≈122
function Friend({ variant='A', pose='idle', flip=false, beard=0,
                 lArm, rArm, tool=null, blink=true, style }) {
  const A = variant === 'A';                 // Ollie
  const pants  = A ? PAL.jeans : PAL.chino;
  const pantsSh= A ? PAL.jeansSh : PAL.chinoSh;
  const torso  = A ? PAL.tee : PAL.flTee;
  const torsoSh= A ? '#E1DECF' : PAL.flTeeSh;
  const sleeve = A ? PAL.shirt : PAL.flTee;
  const iris = A ? '#3D6FB0' : '#8AA0B8';   // Ollie blue, Filip grey-blue
  const [pl,pr] = POSES[pose] || POSES.idle;
  const la = lArm == null ? pl : lArm;
  const ra = rArm == null ? pr : rArm;

  // a short-sleeve bare arm (skin) that rotates around a shoulder
  const Arm = ({ ang, sx, hx, withTool }) => (
    <g transform={`rotate(${ang} ${sx} 56)`}>
      <rect x={sx-5.5} y="52" width="11" height="34" rx="5.5" fill={PAL.skin} />
      <circle cx={hx} cy="86" r="6" fill={PAL.skin} />
      {withTool && tool && <g transform={`translate(${hx} 86)`}>{tool}</g>}
    </g>
  );

  return (
    <g transform={flip ? 'scale(-1,1) translate(-64,0)' : ''} style={style}>
      {/* legs / trousers */}
      <rect x="21" y="92" width="11" height="30" rx="3" fill={pantsSh} />
      <rect x="33" y="92" width="11" height="30" rx="3" fill={pants} />
      {A && <rect x="21" y="92" width="23" height="30" rx="3" fill={pants} opacity="0" />}
      {/* grey sneakers */}
      {[26.5,38.5].map((cx,i)=>(
        <g key={i}>
          <ellipse cx={cx} cy="122" rx="9" ry="4" fill={PAL.sole} />
          <path d={`M${cx-8} 121 q0 -8 8 -8 q8 0 8 8 z`} fill={i?PAL.sneak:PAL.sneakSh} />
          <path d={`M${cx-8} 120 l16 0`} stroke={PAL.sole} strokeWidth="1" opacity="0.5" />
        </g>
      ))}

      {/* back arm */}
      <Arm ang={la} sx={20} hx={18.5} />

      {/* sleeve cap (short sleeve) behind torso, left */}
      <path d="M13 54 q7 -6 14 2 l-1 12 q-7 4 -14 0 z" fill={sleeve} />

      {/* TORSO */}
      <path d={A
        ? 'M16 58 q16 -10 32 0 l1 34 q-17 7 -34 0 z'
        : 'M13 58 q19 -12 38 0 l2 36 q-21 8 -42 0 z'} fill={torso} />
      <path d="M16 58 q16 -9 32 0 l0 6 q-16 -7 -32 0 z" fill={torsoSh} opacity="0.5" />

      {A && (
        <g>
          {/* open striped shirt panels over the white tee */}
          <path d="M16 58 q7 -3 9 -1 l-1 35 q-6 1 -9 -1 z" fill={PAL.shirt} />
          <path d="M48 58 q-7 -3 -9 -1 l1 35 q6 1 9 -1 z" fill={PAL.shirt} />
          {[18,21].map((x,i)=>(<line key={'l'+i} x1={x} y1="59" x2={x-1} y2="92" stroke={PAL.shirtSt} strokeWidth="1.4"/>))}
          {[43,46].map((x,i)=>(<line key={'r'+i} x1={x} y1="59" x2={x+1} y2="92" stroke={PAL.shirtSt} strokeWidth="1.4"/>))}
          {/* belt */}
          <rect x="22" y="89" width="20" height="5" rx="1" fill={PAL.belt} />
          <rect x="30" y="89.5" width="4" height="4" rx="1" fill="#5a5043" />
        </g>
      )}

      {/* sleeve cap right (front) */}
      <path d="M51 54 q-7 -6 -14 2 l1 12 q7 4 14 0 z" fill={sleeve} />

      {/* HEAD */}
      <circle cx="32" cy="34" r="20" fill={PAL.skin} />
      <path d="M12 38 a20 20 0 0 0 40 0 q-20 9 -40 0 z" fill={PAL.skinSh} opacity="0.22" />
      <circle cx="12" cy="36" r="3.5" fill={PAL.skin} />
      <circle cx="52" cy="36" r="3.5" fill={PAL.skin} />

      {/* eyes */}
      <g className={blink ? 'pl-blink' : ''}>
        <ellipse cx="26" cy="33" rx="3.6" ry="4.1" fill="#fff" stroke={PAL.ink} strokeWidth="1" />
        <ellipse cx="40" cy="33" rx="3.6" ry="4.1" fill="#fff" stroke={PAL.ink} strokeWidth="1" />
        <circle cx="26.7" cy="33.4" r="2.2" fill={iris} />
        <circle cx="40.7" cy="33.4" r="2.2" fill={iris} />
        <circle cx="26.7" cy="33.4" r="1" fill="#15110B" />
        <circle cx="40.7" cy="33.4" r="1" fill="#15110B" />
        <circle cx="27.5" cy="32.5" r="0.6" fill="#fff" />
        <circle cx="41.5" cy="32.5" r="0.6" fill="#fff" />
      </g>
      {/* nose + mouth */}
      <path d="M32 35 q1.5 3 -1 4.4" stroke={PAL.skinSh} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M28 44 q4 3.5 8 0" stroke={PAL.ink} strokeWidth="1.8" fill="none" strokeLinecap="round" />

      {/* HAIR / CAP */}
      {A ? (
        <path d="M13 30 q-2 -16 12 -19 q4 -4 8 -1 q5 -3 9 1 q9 3 9 18
                 q-3 -7 -7 -6 l-2 -6 l-3 6 l-3 -8 l-3 8 l-4 -6 l-2 7 l-4 -5 l-3 8 q-5 -2 -7 5 z"
              fill={PAL.hair} />
      ) : (
        <g>
          <path d="M14 30 a18 15 0 0 1 36 -1 q-18 -7 -36 1 z" fill={PAL.flCap} />
          <path d="M14 30 a18 15 0 0 1 36 -1 q-9 -4 -18 -4 q-9 0 -18 5 z" fill={PAL.flCapSh} opacity="0.5" />
          <path d="M48 29 q13 0 14 6 q-10 2 -15 -2 z" fill={PAL.flCapSh} />
          <circle cx="32" cy="15" r="2" fill={PAL.flCapSh} />
        </g>
      )}

      {/* front arm + tool */}
      <Arm ang={ra} sx={44} hx={45.5} withTool />
    </g>
  );
}

Object.assign(window, { PAL, POSES, Friend });
