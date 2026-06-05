// story.jsx — the hero player. Cross-fades 7 beats, autoplays, replays, scrubbable rail.

const STORY_BEATS = [
  { Comp: 'SceneCut',    n: '01', title: 'Cut the tree down',     sub: 'One tree. Chosen with great ceremony (and some arguing).', ms: 4400 },
  { Comp: 'SceneDry',    n: '02', title: 'Let it dry. 4 years.',  sub: 'Patience is a material. We happen to have a lot of it.',   ms: 5400 },
  { Comp: 'SceneMill',   n: '03', title: 'Mill it into planks',   sub: 'Through the saw it goes — one honest board at a time.',    ms: 4400 },
  { Comp: 'SceneDesign', n: '04', title: 'Draw up the design',    sub: 'Sketch. Crumple. Sketch again. Crumple again. Sketch.',    ms: 4800 },
  { Comp: 'SceneCraft',  n: '05', title: 'Do the woodwork',       sub: 'By hand, mostly. By stubbornness, entirely.',             ms: 4800 },
  { Comp: 'SceneOil',    n: '06', title: 'Finish with fine oils', sub: 'Three coats of something that smells faintly expensive.', ms: 4400 },
  { Comp: 'SceneSell',   n: '07', title: 'Sell it to friends',    sub: 'At mates\u2019 rates. Obviously. That was always the plan.',   ms: 5000 },
];

function Story({ pace = 1, accent = '#DD5A33' }) {
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const beat = STORY_BEATS[idx];
  const Scene = window[beat.Comp];
  const dur = Math.round(beat.ms * pace);

  React.useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIdx(i => (i + 1) % STORY_BEATS.length), dur);
    return () => clearTimeout(t);
  }, [idx, playing, dur]);

  const go = (i) => setIdx((i + STORY_BEATS.length) % STORY_BEATS.length);

  return (
    <div className="pl-story">
      <div className="pl-stage" style={{ '--accent': accent }}>
        <svg viewBox="0 0 820 470" className="pl-svg" preserveAspectRatio="xMidYMid slice">
          <g key={idx} className="pl-scene-anim">{Scene && <Scene />}</g>
        </svg>

        {/* tape-corner framing */}
        <span className="pl-tape pl-tape-tl"></span>
        <span className="pl-tape pl-tape-br"></span>

        {/* progress ticks */}
        <div className="pl-progress">
          {STORY_BEATS.map((b, i) => (
            <button key={i} className={'pl-tick' + (i === idx ? ' is-on' : '') + (i < idx ? ' is-done' : '')}
                    onClick={() => go(i)} aria-label={b.title}>
              <i style={i === idx && playing ? { animationDuration: dur + 'ms' } : {}}></i>
            </button>
          ))}
        </div>

        <button className="pl-playbtn" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'}>
          {playing
            ? <svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="5" width="4" height="14" rx="1.5" fill="currentColor"/><rect x="14" y="5" width="4" height="14" rx="1.5" fill="currentColor"/></svg>
            : <svg viewBox="0 0 24 24" width="20" height="20"><path d="M7 5 L19 12 L7 19 Z" fill="currentColor"/></svg>}
        </button>
      </div>

      <div className="pl-readout">
        <div className="pl-readout-text">
          <div className="pl-num">{beat.n} <span>/ 07</span></div>
          <h3 key={'h' + idx}>{beat.title}</h3>
          <p key={'p' + idx}>{beat.sub}</p>
        </div>
        <div className="pl-nav">
          <button onClick={() => { setPlaying(false); go(idx - 1); }} aria-label="Previous">
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M15 5 L8 12 L15 19" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => { setPlaying(false); go(idx + 1); }} aria-label="Next">
            <svg viewBox="0 0 24 24" width="22" height="22"><path d="M9 5 L16 12 L9 19" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { STORY_BEATS, Story });
