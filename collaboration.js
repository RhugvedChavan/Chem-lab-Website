
(function generateParticles() {
  const container = document.getElementById('particles');
  const count = 14;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 10 + 4; // 4px – 14px

    particle.style.cssText = `
      width:            ${size}px;
      height:           ${size}px;
      left:             ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 14 + 10}s;
      animation-delay:  ${Math.random() * 12}s;
      opacity:          ${Math.random() * 0.4 + 0.1};
    `;

    container.appendChild(particle);
  }
})();


/**
 * Triggers a ripple animation on a card element.
 * Called via onclick="ripple(this)" in the HTML.
 * @param {HTMLElement} el - The card element that was clicked.
 */
function ripple(el) {
  el.classList.remove('ripple');
  void el.offsetWidth;            // force reflow to allow re-trigger
  el.classList.add('ripple');
  setTimeout(() => el.classList.remove('ripple'), 700);
}


(function initTilt() {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {

    /* Apply tilt based on cursor position within card */
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();

      // Normalised position: -0.5 (left/top) to +0.5 (right/bottom)
      const x = (e.clientX - rect.left)  / rect.width  - 0.5;
      const y = (e.clientY - rect.top)   / rect.height - 0.5;

      card.style.transform = `
        translateY(-10px)
        scale(1.02)
        rotateY(${x * 8}deg)
        rotateX(${-y * 6}deg)
      `;
    });

    /* Reset transform when cursor leaves the card */
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

  });
})();