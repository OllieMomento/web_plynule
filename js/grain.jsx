// grain.jsx — vector wood-grain backdrop from the offline version.
const { useRef, useState, useLayoutEffect } = React;

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildContours(W, H) {
  const rnd = mulberry32(20260606);
  const step = 8;
  const cols = Math.ceil(W / step) + 1;
  const rows = Math.ceil(H / step) + 1;
  const bumps = [];

  for (let i = 0, nb = Math.max(4, Math.round((W * H) / 240000)); i < nb; i++) {
    const sx = 42 + rnd() * 30;
    bumps.push({
      cx: rnd() * W,
      cy: rnd() * H,
      amp: (rnd() < 0.5 ? -1 : 1) * (1.0 + rnd() * 1.1),
      sx,
      sy: sx * (2.4 + rnd() * 1.6),
    });
  }

  const field = (x, y) => {
    let v = x * 0.020
      + 0.34 * Math.sin(y * 0.0090 + x * 0.0034)
      + 0.15 * Math.sin(y * 0.0200 + 1.3)
      + 0.06 * Math.sin(y * 0.0380 + x * 0.0080);
    for (const b of bumps) {
      const dx = (x - b.cx) / b.sx;
      const dy = (y - b.cy) / b.sy;
      v += b.amp * Math.exp(-(dx * dx + dy * dy));
    }
    return v;
  };

  const g = new Float32Array(cols * rows);
  let mn = Infinity;
  let mx = -Infinity;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const v = field(i * step, j * step);
      g[j * cols + i] = v;
      if (v < mn) mn = v;
      if (v > mx) mx = v;
    }
  }

  const iv = 0.82;
  let d = '';
  const seg = (x1, y1, x2, y2) => {
    d += `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };

  for (let L = Math.ceil(mn / iv) * iv; L < mx; L += iv) {
    for (let j = 0; j < rows - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const a = g[j * cols + i];
        const b = g[j * cols + i + 1];
        const c = g[(j + 1) * cols + i + 1];
        const dd = g[(j + 1) * cols + i];
        let idx = 0;
        if (a > L) idx |= 8;
        if (b > L) idx |= 4;
        if (c > L) idx |= 2;
        if (dd > L) idx |= 1;
        if (idx === 0 || idx === 15) continue;

        const x = i * step;
        const y = j * step;
        const tT = (L - a) / (b - a), Tx = x + step * tT, Ty = y;
        const tR = (L - b) / (c - b), Rx = x + step, Ry = y + step * tR;
        const tB = (L - dd) / (c - dd), Bx = x + step * tB, By = y + step;
        const tL = (L - a) / (dd - a), Lx = x, Ly = y + step * tL;
        switch (idx) {
          case 1: case 14: seg(Lx, Ly, Bx, By); break;
          case 2: case 13: seg(Bx, By, Rx, Ry); break;
          case 3: case 12: seg(Lx, Ly, Rx, Ry); break;
          case 4: case 11: seg(Tx, Ty, Rx, Ry); break;
          case 6: case 9: seg(Tx, Ty, Bx, By); break;
          case 7: case 8: seg(Tx, Ty, Lx, Ly); break;
          case 5: seg(Tx, Ty, Lx, Ly); seg(Bx, By, Rx, Ry); break;
          case 10: seg(Tx, Ty, Rx, Ry); seg(Bx, By, Lx, Ly); break;
        }
      }
    }
  }
  return d;
}

function GrainBackdrop() {
  const ref = useRef(null);
  const [dim, setDim] = useState(null);

  useLayoutEffect(() => {
    const host = ref.current && ref.current.parentElement;
    if (!host) return;
    let raf = 0;
    const measure = () => {
      const w = host.clientWidth;
      const h = host.scrollHeight;
      setDim((p) => (p && p.w === w && Math.abs(p.h - h) < 40 ? p : { w, h }));
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(host);
    window.addEventListener('resize', schedule);
    const t1 = setTimeout(measure, 600);
    const t2 = setTimeout(measure, 1800);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', schedule);
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
    };
  }, []);

  let svg = null;
  if (dim && dim.w > 0 && dim.h > 0) {
    const d = buildContours(dim.w, dim.h);
    svg = (
      <svg width={dim.w} height={dim.h} viewBox={`0 0 ${dim.w} ${dim.h}`} preserveAspectRatio="none">
        <path
          d={d}
          fill="none"
          stroke="#9A9A9A"
          strokeWidth="1"
          strokeOpacity="0.28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <div className="grain-backdrop" aria-hidden="true" ref={ref}>{svg}</div>;
}

Object.assign(window, { GrainBackdrop });
