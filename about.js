const ns = document.querySelectorAll('.nav-scroll');

ns.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));

document.querySelectorAll('#about,#vm,#founder,#team').forEach(s =>
  new IntersectionObserver(entries => entries.forEach(x => {
    if (x.isIntersecting) ns.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + x.target.id));
  }), { threshold: .35 }).observe(s)
);

// ── Scroll reveal with direction awareness ──
const revealEls = document.querySelectorAll('.scroll-reveal');
let lastScrollY = window.scrollY;

const revealObserver = new IntersectionObserver((entries) => {
  const scrollingDown = window.scrollY >= lastScrollY;

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.classList.remove('exit-up', 'exit-down');
    } else {
      // Element just left viewport
      if (scrollingDown) {
        // scrolled past it going down → it exited top
        entry.target.classList.add('exit-up');
        entry.target.classList.remove('visible', 'exit-down');

        // reset to come-in-from-bottom for re-entry
        setTimeout(() => {
          if (!entry.target.classList.contains('visible')) {
            entry.target.classList.remove('exit-up');
          }
        }, 350);
      } else {
        // scrolled back up → it exited bottom, reset to slide-in state
        entry.target.classList.remove('visible', 'exit-up', 'exit-down');
      }
    }
  });

  lastScrollY = window.scrollY;
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

window.addEventListener('scroll', () => { lastScrollY = window.scrollY; }, { passive: true });

revealEls.forEach(el => revealObserver.observe(el));
