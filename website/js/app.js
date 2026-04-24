/* ══════════════════════════════════════════════
   APP.JS — Nav, Loader, AOS, Forms, Misc
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Page Loader ── */
  const loader = document.getElementById('pageLoader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 800);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 2800);
  }

  /* ── Mobile Nav Toggle ── */
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  toggle && toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ── Scroll-aware Nav ── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(7,4,15,0.98)'
      : 'rgba(7,4,15,0.82)';
  }, { passive: true });

  /* ── AOS (Animate on Scroll) ── */
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('aos-visible');
        aosObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-aos]').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    aosObserver.observe(el);
  });

  /* ── Active Nav Link on Scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAs.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));

  /* ── Consultation Form ── */
  const consultForm = document.getElementById('consultForm');
  consultForm && consultForm.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✅ 諮詢申請已送出！我們將在 48 小時內回覆您。');
    consultForm.reset();
  });

  /* ── Sanskrit Hero Glow ── */
  const sanskrit = document.querySelector('.hero-sanskrit');
  if (sanskrit) {
    setInterval(() => {
      const r = 8 + Math.random() * 16;
      sanskrit.style.textShadow = `0 0 ${r}px rgba(201,168,76,0.7)`;
    }, 1400);
  }

  /* ── Parallax Hero Rings ── */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const rings = document.querySelectorAll('.mandala-ring');
    rings.forEach((ring, i) => {
      ring.style.transform = `translate(-50%,-50%) translateY(${scrollY * (0.05 + i * 0.03)}px)`;
    });
  }, { passive: true });

  /* ── Smooth scroll for nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        window.scrollTo({
          top: target.offsetTop - navH,
          behavior: 'smooth',
        });
      }
    });
  });

  /* ── Hero Stats counter animation ── */
  const heroStats = document.querySelectorAll('.hero-stat-num');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el   = e.target;
        const target = parseInt(el.textContent.replace(/\D/g, ''));
        const suffix = el.textContent.replace(/[0-9]/g, '');
        let cur  = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur + suffix;
          if (cur >= target) clearInterval(timer);
        }, 30);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });
  heroStats.forEach(el => statsObserver.observe(el));

});

/* ── Toast ── */
function showToast(msg, duration = 4000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── Cursor sparkle effect ── */
(function () {
  const particles = [];
  let mouseX = 0, mouseY = 0;
  let frame = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    frame++;
    if (frame % 5 !== 0) return; // throttle

    const p = document.createElement('div');
    p.style.cssText = `
      position:fixed;
      left:${mouseX}px;top:${mouseY}px;
      width:4px;height:4px;
      border-radius:50%;
      background:rgba(201,168,76,0.7);
      pointer-events:none;
      z-index:9998;
      transform:translate(-50%,-50%);
      animation:sparkle 0.8s ease forwards;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  });

  // Inject sparkle keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkle {
      0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
      100% { opacity:0; transform:translate(-50%,-50%) scale(0) translateY(-20px); }
    }
  `;
  document.head.appendChild(style);
})();
