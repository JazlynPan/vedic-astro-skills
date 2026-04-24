/* ── Animated Star Field ── */
(function () {
  const canvas = document.getElementById('starCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], shootingStars = [], W, H;
  const COUNT = 280;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < COUNT; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.2,
        a: Math.random(),
        speed: Math.random() * 0.005 + 0.001,
        phase: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.12,   // some gold stars
      });
    }
  }

  function spawnShootingStar() {
    shootingStars.push({
      x: Math.random() * W * 0.7,
      y: Math.random() * H * 0.3,
      len: 120 + Math.random() * 180,
      speed: 8 + Math.random() * 12,
      angle: Math.PI * 0.18 + Math.random() * 0.2,
      life: 1,
      decay: 0.018 + Math.random() * 0.012,
    });
  }

  // Shoot a star every 4-8 seconds
  function scheduleShooting() {
    setTimeout(() => {
      spawnShootingStar();
      scheduleShooting();
    }, 4000 + Math.random() * 4000);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const now = Date.now() * 0.001;

    // Stars
    stars.forEach(s => {
      const alpha = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(now * s.speed * 10 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (s.gold) {
        ctx.fillStyle = `rgba(240,210,120,${alpha * s.a * 0.8})`;
      } else {
        ctx.fillStyle = `rgba(230,220,200,${alpha * s.a * 0.65})`;
      }
      ctx.fill();
    });

    // Shooting stars
    shootingStars = shootingStars.filter(ss => ss.life > 0);
    shootingStars.forEach(ss => {
      const tx = ss.x + Math.cos(ss.angle) * ss.len;
      const ty = ss.y + Math.sin(ss.angle) * ss.len;
      const grad = ctx.createLinearGradient(ss.x, ss.y, tx, ty);
      grad.addColorStop(0, `rgba(255,240,200,0)`);
      grad.addColorStop(0.6, `rgba(255,240,200,${ss.life * 0.9})`);
      grad.addColorStop(1, `rgba(255,240,200,0)`);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5 * ss.life;
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(tx, ty, 2 * ss.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,240,200,${ss.life * 0.8})`;
      ctx.fill();
      ctx.restore();

      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.life -= ss.decay;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
  scheduleShooting();
})();
