// feed.jsx — artsy, swappable Instagram feed (polaroids dropped onto a workshop pinboard).

const POSTS = [
  { id: 'ig1', cap: 'Oak. Finally dry.',        likes: 218, h: 300, tag: '#fouryearswait' },
  { id: 'ig2', cap: 'First cut of the day',     likes: 142, h: 224, tag: '#sawdust' },
  { id: 'ig3', cap: 'No screws. Just joinery.', likes: 311, h: 268, tag: '#joinery' },
  { id: 'ig4', cap: 'Coat nº 3 going on',       likes: 176, h: 320, tag: '#fineoils' },
  { id: 'ig5', cap: 'Sunday at the bench',      likes: 204, h: 232, tag: '#workshoplife' },
  { id: 'ig6', cap: 'Detail: the chamfer',      likes: 268, h: 288, tag: '#handmade' },
  { id: 'ig7', cap: 'She\u2019s done.',          likes: 402, h: 312, tag: '#oneofone' },
  { id: 'ig8', cap: 'Off to a good home',       likes: 233, h: 236, tag: '#matesrates' },
  { id: 'ig9', cap: 'Shavings everywhere',      likes: 158, h: 276, tag: '#planing' },
];

function Heart() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path d="M12 20S4 14.5 4 8.8C4 6 6 4 8.4 4c1.6 0 3 .9 3.6 2.2C12.6 4.9 14 4 15.6 4 18 4 20 6 20 8.8 20 14.5 12 20 12 20z"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function Polaroid({ p, i }) {
  const rot = (i % 3 === 0 ? -2 : i % 3 === 1 ? 1.4 : -0.8);
  return (
    <figure className="pl-post" style={{ '--rot': rot + 'deg' }}>
      <span className="pl-pin"></span>
      <div className="pl-post-img">
        <image-slot id={p.id} radius="3" placeholder={'Drop: ' + p.cap} src={'assets/feed/' + p.id + '.jpg'}
                    style={{ width: '100%', height: p.h + 'px', display: 'block' }}></image-slot>
      </div>
      <figcaption>
        <p className="pl-post-cap">{p.cap}</p>
        <div className="pl-post-meta">
          <span className="pl-likes"><Heart /> {p.likes}</span>
          <span className="pl-tag">{p.tag}</span>
        </div>
      </figcaption>
    </figure>
  );
}

const STRIP_CARDS = [
  { id: 'polaroid-4', src: 'assets/feed/polaroid-4.png', cap: 'Cut by us. Sustainably.', rot: -18, dx: '-125%', dxTablet: '-92%', dxMobile: '-10%', dy: '24px' },
  { id: 'polaroid-5', src: 'assets/feed/polaroid-5.png', cap: 'Milled into planks.', rot: 11, dx: '-75%', dxTablet: '-54%', dxMobile: '10%', dy: '-16px' },
  { id: 'polaroid-3', src: 'assets/feed/polaroid-3.png', cap: 'Four years drying.', rot: -5, dx: '-25%', dxTablet: '-18%', dxMobile: '-8%', dy: '18px' },
  { id: 'polaroid-6', src: 'assets/feed/polaroid-6.png', cap: 'Furniture takes shape.', rot: 7, dx: '25%', dxTablet: '18%', dxMobile: '8%', dy: '-18px' },
  { id: 'polaroid-1', src: 'assets/feed/polaroid-1.png', cap: 'Top coat of oil.', rot: -10, dx: '75%', dxTablet: '54%', dxMobile: '-6%', dy: '20px' },
  { id: 'polaroid-2', src: 'assets/feed/polaroid-2.png', cap: 'Done. Ready to buy.', rot: 16, dx: '125%', dxTablet: '92%', dxMobile: '6%', dy: '26px' },
];

function PolaroidStrip() {
  return (
    <div className="pstrip" aria-label="Workshop polaroid cards">
      {STRIP_CARDS.map((p, i) => (
        <figure
          className="pstrip-card"
          key={p.id}
          style={{
            '--i': i,
            '--rot': p.rot + 'deg',
            '--dx': p.dx,
            '--dy': p.dy,
            '--dx-tablet': p.dxTablet || p.dx,
            '--dx-mobile': p.dxMobile || p.dxTablet || p.dx,
          }}
        >
          <image-slot
            id={'strip-' + p.id}
            radius="2"
            placeholder={'Drop: ' + p.cap}
            src={p.src}
            style={{ width: '100%', height: 'clamp(210px, 27vw, 360px)', display: 'block' }}
          ></image-slot>
          <figcaption className="pstrip-cap">{p.cap}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Feed({ columns = 3 }) {
  return (
    <div className="pl-feed" style={{ '--cols': columns }}>
      {POSTS.map((p, i) => <Polaroid key={p.id} p={p} i={i} />)}
    </div>
  );
}

Object.assign(window, { POSTS, Feed, Polaroid, PolaroidStrip });
