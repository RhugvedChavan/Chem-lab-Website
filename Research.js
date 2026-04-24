const sections = ['compchem', 'aichem', 'spectral', 'automation'];
const navBtns = document.querySelectorAll('.nav-btn');

function scrollToSection(id) {
  const el = document.getElementById(id);
  const top = el.getBoundingClientRect().top + window.pageYOffset - 66;
  window.scrollTo({ top, behavior: 'smooth' });
}

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    } else {
      entry.target.classList.remove('revealed');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-reveal').forEach(el => revealObs.observe(el));

const sectionEls = sections.map(id => document.getElementById(id));

function updateActiveNav() {
  const scrollMid = window.pageYOffset + window.innerHeight * 0.4;
  let activeIdx = 0;

  sectionEls.forEach((el, i) => {
    if (el.offsetTop <= scrollMid) activeIdx = i;
  });

  navBtns.forEach((b, i) => b.classList.toggle('active', i === activeIdx));
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ===== BG 1: Floating dots ===== */
(function () {
  const canvas = document.getElementById("chemBg");
  const ctx = canvas.getContext("2d");
  let w, h;

  const dots = Array.from({ length: 15 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - .5) * .3,
    vy: (Math.random() - .5) * .3,
    r: 2 + Math.random() * 2
  }));

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  (function loop() {
    resize();
    ctx.clearRect(0, 0, w, h);

    dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;

      if (d.x < 0 || d.x > w) d.vx *= -1;
      if (d.y < 0 || d.y > h) d.vy *= -1;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56,189,248,0.5)";
      ctx.fill();
    });

    requestAnimationFrame(loop);
  })();
})();

/* ===== BG 2: Sweeping glow line ===== */
(function () {
  const canvas = document.getElementById("aiBg");
  const ctx = canvas.getContext("2d");
  let w, h, x = 0;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  (function loop() {
    resize();
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createLinearGradient(x - 50, 0, x + 50, 0);
    g.addColorStop(0, "transparent");
    g.addColorStop(.5, "rgba(37,99,235,0.25)");
    g.addColorStop(1, "transparent");

    ctx.fillStyle = g;
    ctx.fillRect(x - 50, 0, 100, h);

    x += 1;
    if (x > w + 50) x = -50;

    requestAnimationFrame(loop);
  })();
})();

/* ===== BG 3: Spectral waves ===== */
(function () {
  const canvas = document.getElementById("specBg");
  const ctx = canvas.getContext("2d");
  let w, h, time = 0;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  (function animate() {
    resize();
    ctx.clearRect(0, 0, w, h);

    time += 0.01;

    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      let baseY = h * (0.3 + i * 0.15);

      for (let x = 0; x < w; x += 5) {
        let y = baseY +
          Math.sin(x * 0.01 + time + i) * 10 +
          Math.sin(x * 0.02 + time * 0.5) * 20;

        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "rgba(37,99,235," + (0.2 + i * 0.1) + ")";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  })();
})();

/* ===== BG 4: Node path animation ===== */
(function () {
  const canvas = document.getElementById("autoBg");
  const ctx = canvas.getContext("2d");
  let w, h;
  let steps = [];
  let dot = { index: 0, progress: 0 };

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;

    steps = [
      { x: w * 0.2, y: h * 0.5 },
      { x: w * 0.4, y: h * 0.3 },
      { x: w * 0.6, y: h * 0.6 },
      { x: w * 0.8, y: h * 0.4 }
    ];
  }

  resize();
  window.addEventListener("resize", resize);

  (function animate() {
    resize();
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(37,99,235,0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(steps[0].x, steps[0].y);

    steps.forEach(s => ctx.lineTo(s.x, s.y));
    ctx.stroke();

    steps.forEach((s, i) => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = i === dot.index
        ? "rgba(37,99,235,0.6)"
        : "rgba(37,99,235,0.2)";
      ctx.fill();
    });

    let current = steps[dot.index];
    let next = steps[(dot.index + 1) % steps.length];

    dot.progress += 0.01;

    let x = current.x + (next.x - current.x) * dot.progress;
    let y = current.y + (next.y - current.y) * dot.progress;

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(37,99,235,0.8)";
    ctx.fill();

    if (dot.progress >= 1) {
      dot.progress = 0;
      dot.index = (dot.index + 1) % steps.length;
    }

    requestAnimationFrame(animate);
  })();
})();
