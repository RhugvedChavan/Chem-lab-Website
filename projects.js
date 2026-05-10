const animEls = Array.from(document.querySelectorAll('[data-anim]'));

function checkVisibility() {
  const vh = window.innerHeight;

  animEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < vh * 0.88 && rect.bottom > vh * 0.08;

    if (inView) {
      el.classList.add('in-view');
    } else {
      el.classList.remove('in-view');
    }
  });
}

let rafPending = false;

window.addEventListener('scroll', () => {
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(() => {
      checkVisibility();
      rafPending = false;
    });
  }
}, { passive: true });

window.addEventListener('resize', checkVisibility, { passive: true });
window.addEventListener('load', checkVisibility);
document.addEventListener('DOMContentLoaded', checkVisibility);

function popBtn(el) {
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');

  el.addEventListener('animationend', () => el.classList.remove('pop'), { once: true });
}

function popCard(card, e) {
  const rect = card.getBoundingClientRect();
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');

  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

  card.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());

  card.classList.remove('popped');
  void card.offsetWidth;
  card.classList.add('popped');

  card.addEventListener('animationend', () => card.classList.remove('popped'), { once: true });

  card.style.boxShadow = '0 0 60px rgba(37,99,235,0.55), 0 0 120px rgba(37,99,235,0.22)';
  setTimeout(() => card.style.boxShadow = '', 700);
}

/* ══ SPECTRAL CANVAS ══ */
(function () {
  const canvas = document.getElementById("spectralCanvas");
  const ctx = canvas.getContext("2d");

  let w, h;

  function resize() {
    const s = canvas.parentElement;
    w = canvas.width = s.offsetWidth;
    h = canvas.height = s.offsetHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  const waves = [];

  for (let i = 0; i < 4; i++) {
    waves.push({
      amplitude: 40 + Math.random() * 30,
      frequency: 0.008 + Math.random() * 0.01,
      phase: Math.random() * Math.PI * 2,
      speed: 0.015 + Math.random() * 0.02,
      opacity: 0.2 + Math.random() * 0.3
    });
  }

  function draw() {
    ctx.fillStyle = "rgba(240,249,255,0.3)";
    ctx.fillRect(0, 0, w, h);

    waves.forEach(wave => {
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = `rgba(37,99,235,${wave.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      wave.phase += wave.speed;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();

/* ══ NEBULA CANVAS ══ */
(function () {
  const canvas = document.getElementById("nebulaCanvas");
  const ctx = canvas.getContext("2d");

  let w, h, nebulas = [];

  function resize() {
    const s = canvas.parentElement;
    w = canvas.width = s.offsetWidth;
    h = canvas.height = s.offsetHeight;

    nebulas = [];

    for (let i = 0; i < 5; i++) {
      nebulas.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 150 + Math.random() * 250,
        color: `rgba(${150 + Math.random() * 50}, ${200 + Math.random() * 40}, 255, 0.25)`
      });
    }
  }

  window.addEventListener("resize", resize);
  resize();

  const particles = [];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * (w || 1200),
      y: Math.random() * (h || 800),
      r: Math.random() * 2,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      opacity: 0.3 + Math.random() * 0.3
    });
  }

  const orbits = [];

  for (let i = 0; i < 4; i++) {
    orbits.push({
      radius: 70 + i * 50,
      angle: Math.random() * Math.PI * 2,
      speed: 0.006 + i * 0.003
    });
  }

  function drawNebula() {
    nebulas.forEach(n => {
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
      g.addColorStop(0, n.color);
      g.addColorStop(1, "rgba(240,249,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });
  }

  function draw() {
    ctx.fillStyle = "rgba(240,249,255,0.4)";
    ctx.fillRect(0, 0, w, h);

    drawNebula();

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(186,230,253,${p.opacity})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });

    orbits.forEach(o => {
      const cx = w / 2 + Math.cos(o.angle) * o.radius;
      const cy = h / 2 + Math.sin(o.angle) * o.radius;

      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#7dd3fc";
      ctx.fill();

      o.angle += o.speed;
    });

    requestAnimationFrame(draw);
  }

  draw();
})();
