(function () {
  function renderLogo(video) {
    const wrap = video.closest('.logo-video-wrap');
    const canvas = wrap && wrap.querySelector('.logo-canvas');
    if (!canvas || video.dataset.chromaStarted === '1') return;
    video.dataset.chromaStarted = '1';

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    function sizeCanvas() {
      if (!video.videoWidth || !video.videoHeight) return false;
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
      return true;
    }

    function draw() {
      if (sizeCanvas() && video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = frame.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          if (r > 230 && g > 230 && b > 230) data[i + 3] = 0;
        }
        ctx.putImageData(frame, 0, 0);
      }
      requestAnimationFrame(draw);
    }

    video.addEventListener('loadedmetadata', sizeCanvas, { once: true });
    video.play().catch(function () {});
    draw();
  }

  requestAnimationFrame(function () {
    document.querySelectorAll('.logo-video').forEach(renderLogo);
  });
})();
