/* ==================== CURSOR ==================== */

const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity     = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity     = '1';
  cursorRing.style.opacity = '1';
});

/* ==================== NAV SCROLL BEHAVIOR ==================== */

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ==================== MOBILE MENU ==================== */

const hamburger  = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobile');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// Close mobile menu on outside click
document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

/* ==================== SCROLL REVEAL ==================== */

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));

/* ==================== COUNT UP ANIMATION ==================== */

function countUp(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const suffix = el.getAttribute('data-suffix') || '';

  if (isNaN(target)) return;

  let start     = 0;
  const duration = 1800;
  const step     = 16;
  const increment = target / (duration / step);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, step);
}

// Trigger count-up when stat numbers come into view
const statNums = document.querySelectorAll('[data-count]');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => countObserver.observe(el));

/* ==================== ACTIVE NAV LINK ==================== */

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `/#${current}`) {
      link.classList.add('active');
    }
  });
}, { passive: true });
