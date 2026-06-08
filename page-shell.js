(function () {
  const IG = 'https://www.instagram.com/plynule/';
  const IG_DM = 'https://ig.me/m/plynule';
  const LINKEDIN = 'https://www.linkedin.com/company/plynule/';

  const logo = (height) => `
    <span class="logo-video-wrap" style="--logo-h:${height}px">
      <canvas class="logo-canvas" aria-hidden="true"></canvas>
      <video class="logo-video" autoplay loop muted playsinline preload="auto" aria-hidden="true">
        <source src="assets/logo.webm" type="video/webm" />
      </video>
    </span>`;

  const igIcon = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"></rect><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="17.5" cy="6.5" r="1.4" fill="currentColor"></circle></svg>';
  const dmIcon = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M3 20L21 4l-5.2 16-4.3-6.8L3 20Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M11.5 13.2L21 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>';
  const emailIcon = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  const linkedinIcon = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5.2 9.4h3.2V19H5.2V9.4Zm1.6-4.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM11 9.4h3.1v1.4c.5-.8 1.5-1.6 3.1-1.6 3.3 0 3.9 2.2 3.9 5V19h-3.2v-4.3c0-1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3V19H11V9.4Z" fill="currentColor"></path></svg>';

  const header = `
    <nav class="nav">
      <a href="index.html" class="nav-logo" aria-label="Plynule home">${logo(52)}</a>
      <button class="doorbtn" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-pressed="false">
        <span class="door-scene">
          <span class="door-panel"><span class="door-x"></span></span>
          <span class="door-leaf"><span class="door-dot"></span></span>
        </span>
      </button>
    </nav>
    <div class="menu-panel" aria-hidden="true">
      <div class="menu-panel-inner">
        <div class="menu-grid">
          <div class="menu-brand">${logo(88)}</div>
          <div class="menu-links-light">
            <a href="index.html">home</a>
            <a href="gallery.html">photo gallery</a>
            <a href="about.html">about us</a>
          </div>
        </div>
        <div class="menu-bottom">
          <div class="menu-contact-links" aria-label="Contact links">
            <a href="${IG_DM}" target="_blank" rel="noopener">${dmIcon}<span>instagram dm</span></a>
            <a href="${IG}" target="_blank" rel="noopener">${igIcon}<span>instagram</span></a>
            <a href="mailto:hello@plynule.com">${emailIcon}<span>email</span></a>
            <a href="${LINKEDIN}" target="_blank" rel="noopener">${linkedinIcon}<span>linked in</span></a>
          </div>
        </div>
      </div>
    </div>`;

  const footer = `
    <footer class="foot">
      <div class="foot-grid">
        <a class="foot-logo" href="index.html" aria-label="Plynule home">${logo(50)}</a>
        <div class="foot-actions" aria-label="Contact links">
          <a href="${IG_DM}" target="_blank" rel="noopener">${dmIcon}<span>instagram dm</span></a>
          <a href="${IG}" target="_blank" rel="noopener">${igIcon}<span>instagram</span></a>
          <a href="mailto:hello@plynule.com">${emailIcon}<span>email</span></a>
          <a href="${LINKEDIN}" target="_blank" rel="noopener">${linkedinIcon}<span>linked in</span></a>
        </div>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  function wrapBrandLetters(root) {
    const brandLetters = /[plynule]/i;
    root.querySelectorAll('h1, h2, h3, .page-title, .menu-links-light a').forEach(function (el) {
      if (el.dataset.brandWrapped === '1') return;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
        acceptNode: function (node) {
          const parent = node.parentNode;
          if (parent && parent.classList && parent.classList.contains('brand-letter')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) nodes.push(node);
      nodes.forEach(function (textNode) {
        const text = textNode.nodeValue;
        if (!brandLetters.test(text)) return;
        const frag = document.createDocumentFragment();
        for (const ch of text) {
          if (brandLetters.test(ch)) {
            const span = document.createElement('span');
            span.className = 'brand-letter';
            span.textContent = ch;
            frag.appendChild(span);
          } else {
            frag.appendChild(document.createTextNode(ch));
          }
        }
        textNode.parentNode.replaceChild(frag, textNode);
      });
      el.dataset.brandWrapped = '1';
    });
  }

  wrapBrandLetters(document);

  const button = document.querySelector('.doorbtn');
  const panel = document.querySelector('.menu-panel');

  function setMenu(open) {
    button.classList.toggle('is-open', open);
    panel.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-pressed', String(open));
    panel.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  button.addEventListener('click', function () {
    setMenu(!panel.classList.contains('is-open'));
  });

  panel.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });
})();
