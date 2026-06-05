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

function Feed({ columns = 3 }) {
  return (
    <div className="pl-feed" style={{ '--cols': columns }}>
      {POSTS.map((p, i) => <Polaroid key={p.id} p={p} i={i} />)}
    </div>
  );
}

Object.assign(window, { POSTS, Feed, Polaroid });
