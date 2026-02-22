/* ─────────────────────────────── script.js */

// ── NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

// ── FLOATING PARTICLES
(function createParticles() {
    const container = document.getElementById('particles');
    const count = 30;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const x = Math.random() * 100;
        const dur = (Math.random() * 10 + 7).toFixed(1);
        const del = (Math.random() * 8).toFixed(1);
        const dx = ((Math.random() - 0.5) * 100).toFixed(0);
        p.style.cssText = `--x:${x}%;--dur:${dur}s;--delay:${del}s;--dx:${dx}px`;
        container.appendChild(p);
    }
})();

// ── SCROLL REVEAL
const revealEls = document.querySelectorAll(
    '.about-grid, .music-card, .gal-item, .contact-grid, .section-title, .section-label'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── COUNTER ANIMATION
function animateCount(el, target) {
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
        }
    }, 30);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-num').forEach(el => {
                animateCount(el, +el.dataset.target);
            });
            statObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) statObserver.observe(statsSection);

// ── GALLERY LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gal-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (!img || !img.src || img.style.display === 'none') return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});
function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

// ── CONTACT FORM
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const note = document.getElementById('formNote');
    const btn = document.getElementById('btn-enviar');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    // Simula envío (conectar con Formspree, EmailJS, etc.)
    setTimeout(() => {
        note.textContent = '✓ Mensaje enviado. ¡Gracias por escribir!';
        note.style.color = '#4ade80';
        this.reset();
        btn.disabled = false;
        btn.textContent = 'Enviar mensaje';
    }, 1500);
});

// ── ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
    });
}, { passive: true });

// ── SMOOTH SCROLL para todos los anchor
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
