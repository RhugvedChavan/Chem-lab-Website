const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight || window.innerHeight;
}

resize();
window.addEventListener('resize', resize);
window.addEventListener('scroll', () => {
  canvas.height = document.body.scrollHeight;
});

const NODES = 60;
const nodes = [];

for (let i = 0; i < NODES; i++) {
  nodes.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * (document.body.scrollHeight || 3000),
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 3 + 2,
    type: Math.random() < 0.3 ? 'ring' : 'dot'
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const H = document.body.scrollHeight || window.innerHeight;
  if (canvas.height !== H) {
    canvas.height = H;
  }

  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > window.innerWidth) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;

    for (let j = i + 1; j < nodes.length; j++) {
      const m = nodes[j];
      const dx = n.x - m.x;
      const dy = n.y - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = `rgba(14, 116, 144, ${0.10 * (1 - dist / 130)})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
    }

    if (n.type === 'ring') {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 2, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(14, 116, 144, 0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(15, 76, 129, 0.18)';
      ctx.fill();
    }
  }
  requestAnimationFrame(draw);
}

draw();
