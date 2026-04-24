/* ── Animated Mandala Background ── */
(function () {
  const canvas = document.getElementById('mandalaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function drawPetal(cx, cy, angle, r, color) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.5, r * 0.18, r * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function drawMandala(cx, cy, radius, time, alpha) {
    const PETALS = 8;
    const layers = [
      { r: radius * 0.18, petals: 6,  color: `rgba(201,168,76,${alpha * 0.6})` },
      { r: radius * 0.35, petals: 8,  color: `rgba(180,130,60,${alpha * 0.4})` },
      { r: radius * 0.52, petals: 12, color: `rgba(201,168,76,${alpha * 0.25})` },
      { r: radius * 0.70, petals: 16, color: `rgba(160,100,40,${alpha * 0.15})` },
    ];

    ctx.save();
    ctx.translate(cx, cy);

    layers.forEach((layer, li) => {
      const rot = time * (li % 2 === 0 ? 0.12 : -0.09) + li * 0.4;
      for (let p = 0; p < layer.petals; p++) {
        const angle = (p / layer.petals) * Math.PI * 2 + rot;
        drawPetal(0, 0, angle, layer.r, layer.color);
      }
    });

    // Centre circle
    const pulse = 1 + 0.08 * Math.sin(time * 1.5);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.12 * pulse);
    grad.addColorStop(0, `rgba(201,168,76,${alpha * 0.7})`);
    grad.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.12 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Spoke lines
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time * 0.05;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * radius * 0.7, Math.sin(angle) * radius * 0.7);
      ctx.strokeStyle = `rgba(201,168,76,${alpha * 0.08})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Outer ring dots
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 + time * -0.06;
      const x = Math.cos(angle) * radius * 0.88;
      const y = Math.sin(angle) * radius * 0.88;
      const dotR = 1.5 + Math.sin(time * 2 + i) * 0.8;
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${alpha * 0.4})`;
      ctx.fill();
    }

    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;

    // Main central mandala
    drawMandala(W * 0.5, H * 0.5, Math.min(W, H) * 0.38, t, 0.55);

    // Smaller corner mandalas (fade with time)
    const cornerAlpha = 0.18;
    const cornerR = Math.min(W, H) * 0.14;
    drawMandala(W * 0.1,  H * 0.1,  cornerR, t * 0.7, cornerAlpha);
    drawMandala(W * 0.9,  H * 0.1,  cornerR, t * 0.7, cornerAlpha);
    drawMandala(W * 0.1,  H * 0.9,  cornerR, t * 0.7, cornerAlpha);
    drawMandala(W * 0.9,  H * 0.9,  cornerR, t * 0.7, cornerAlpha);

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();
