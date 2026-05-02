AOS.init({
  duration: 800,
  once: false,
  mirror: true,
  offset: 50
});

// Mobile-friendly dropdown — tap to toggle, tap outside to close
const menuBtn = document.getElementById('menuBtn');
const menuDropdown = document.getElementById('menuDropdown');

menuBtn.addEventListener('click', function (e) {
  e.stopPropagation();
  menuDropdown.classList.toggle('open');
});

document.addEventListener('click', function () {
  menuDropdown.classList.remove('open');
});

// Filter logic
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.filter;

    document.querySelectorAll('.facility-group').forEach(group => {
      if (f === 'all' || group.dataset.group === f) {
        group.classList.remove('hidden');
        group.style.animation = 'none';
        group.offsetHeight;
        group.style.animation = '';
      } else {
        group.classList.add('hidden');
      }
    });
  });
});

// Modal logic
const modal = document.getElementById('loginModal');
const closeBtn = document.getElementById('closeModalBtn');
const loginMsg = document.getElementById('loginMessage');

const closeModal = () => {
  modal.classList.remove('active');
  loginMsg.innerHTML = '';
  document.body.style.overflow = 'auto';
};

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

document.getElementById('submitLoginBtn').addEventListener('click', () => {
  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value.trim();

  if (!u || !p) {
    loginMsg.innerHTML = '<span style="color:#ef4444;">❌ Please fill in all credentials</span>';
  } else {
    loginMsg.innerHTML = '<span style="color:#10b981;">✅ Access Granted! Welcome to DigiChem Lab.</span>';

    setTimeout(() => {
      closeModal();
      showNotification('🔬 Welcome ' + u + '! Explore AI-driven research.');
    }, 800);
  }
});

function showNotification(msg) {
  const el = document.createElement('div');
  el.innerText = msg;

  el.style.cssText =
    'position:fixed;bottom:20px;right:20px;background:#0f172a;color:#10b981;padding:14px 28px;border-radius:40px;z-index:9999;font-weight:500;box-shadow:0 4px 15px rgba(0,0,0,0.2);border-left:4px solid #10b981;font-family:Inter,sans-serif;';

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 3000);
}
