// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 50
});

// Cursor Glow Effect
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Login Modal Logic
const modal = document.getElementById('loginModal');
const openBtn = document.getElementById('openLoginBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitLogin = document.getElementById('submitLoginBtn');
const loginMsg = document.getElementById('loginMessage');

function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    modal.classList.remove('active');
    loginMsg.innerHTML = '';
    document.body.style.overflow = 'auto';
}

openBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModalFunc);

//Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFunc();
});

// Handle login submission
submitLogin.addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    
    if (username === "" || password === "") {
        loginMsg.innerHTML = '<span style="color:#ef4444;">❌ Please fill in all credentials</span>';
    } else {
        loginMsg.innerHTML = '<span style="color:#10b981;">✅ Access Granted! Welcome to Digital Chemistry Lab.</span>';
        
        setTimeout(() => {
            closeModalFunc();
            // Show success notification
            showNotification('🔬 Welcome ' + username + '! Explore spectral intelligence and AI-driven research.');
        }, 800);
    }
});

// Function to show floating notification
function showNotification(message) {
    const notif = document.createElement('div');
    notif.innerText = message;
    notif.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0f172a;
        color: #10b981;
        padding: 14px 28px;
        border-radius: 40px;
        z-index: 9999;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
        border-left: 4px solid #10b981;
        font-family: 'Inter', sans-serif;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notif.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle button clicks for section navigation
document.querySelectorAll('.explore-btn, .projects-btn, .collaborate-btn, .team-view-btn, #collabModalBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        let targetId = '';
        
        if (btn.classList.contains('explore-btn')) {
            targetId = '#research';
        } else if (btn.classList.contains('projects-btn')) {
            targetId = '#innovation';
        } else if (btn.classList.contains('collaborate-btn')) {
            targetId = '#leadership';
        } else if (btn.classList.contains('team-view-btn')) {
            targetId = '#leadership';
            showNotification('👥 Full team directory coming soon! Stay tuned.');
        } else if (btn.id === 'collabModalBtn') {
            targetId = '#leadership';
            showNotification('📧 Collaboration inquiry form will open soon. Email: lab@digitalchemistry.edu');
        }
        
        if (targetId) {
            e.preventDefault();
            const element = document.querySelector(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Add scroll-spy active class to nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add hover effect for cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add animation to top bar on load
window.addEventListener('load', () => {
    const topBar = document.querySelector('.top-bar p');
    if (topBar) {
        topBar.style.animation = 'marquee 15s linear infinite';
    }
    
    // Add entrance animation for elements
    const elements = document.querySelectorAll('.card, .innovation-list li, .impact-list li');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.5s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Prevent form submission on Enter key in modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && modal.classList.contains('active')) {
        e.preventDefault();
        submitLogin.click();
    }
    
    // Close modal with Escape key
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModalFunc();
    }
});

// Add loading animation for images (if any)
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Interactive cursor effect for buttons
const allButtons = document.querySelectorAll('button, .login-btn, .nav-links a');
allButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
        cursorGlow.style.opacity = '0.8';
    });
    button.addEventListener('mouseleave', () => {
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.opacity = '0.5';
    });
});

// Add floating animation to icons
const icons = document.querySelectorAll('.card i, .leadership-card i');
icons.forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// Add float keyframes dynamically
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(floatStyle);



