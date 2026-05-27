/* ============================================
   SONU CHAUDHARY PORTFOLIO — script.js
   ============================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  highlightActiveNavLink();
}, { passive: true });

// ---- Back to top ----
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ---- Active nav link on scroll ----
function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ---- AOS (Animate On Scroll) — custom lightweight impl ----
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ---- Typed text effect in hero ----
function initTyped() {
  const titleEl = document.querySelector('.hero-title');
  if (!titleEl) return;

  const texts = [
    'Full Stack Developer · 3+ Years',
    'PHP · Laravel · React.js · Node.js',
    'Insurance-Tech · Fintech · Gaming',
    'Anthropic Claude AI Integrations',
  ];

  let currentIndex = 0;
  let currentChar = 0;
  let isDeleting = false;

  titleEl.textContent = '';

  function type() {
    const current = texts[currentIndex];

    if (isDeleting) {
      titleEl.textContent = current.substring(0, currentChar - 1);
      currentChar--;
    } else {
      titleEl.textContent = current.substring(0, currentChar + 1);
      currentChar++;
    }

    let delay = isDeleting ? 40 : 70;

    if (!isDeleting && currentChar === current.length) {
      delay = 2400;
      isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % texts.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

// ---- Skill tags hover glow ----
function initSkillHover() {
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transition = 'all 0.2s ease';
    });
  });
}

// ---- Contact form ----
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        style="animation: spin 1s linear infinite">
        <path d="M21 12a9 9 0 11-6.219-8.56"/>
      </svg>
      Sending...
    `;
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Message Sent!
      `;
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  });
}

// ---- Smooth parallax on hero glows (subtle) ----
function initParallax() {
  const glow1 = document.querySelector('.hero-glow-1');
  const glow2 = document.querySelector('.hero-glow-2');

  if (!glow1 || !glow2) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    glow1.style.transform = `translateX(calc(-50% + ${x * 20}px)) translateY(${y * 20}px)`;
    glow2.style.transform = `translateX(${x * -15}px) translateY(${y * -15}px)`;
  }, { passive: true });
}

// ---- Nav toggle active state ----
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .nav-toggle.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .nav-toggle.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
`;
document.head.appendChild(styleEl);

// ---- Number counter animation ----
function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const rawText = el.textContent;
      const hasPlus = rawText.includes('+');
      const target = parseInt(rawText.replace('+', ''));

      let current = 0;
      const duration = 1200;
      const steps = 40;
      const increment = target / steps;
      const interval = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + (hasPlus ? '+' : '');
      }, interval);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
}

// ---- Project card tilt effect ----
function initTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ---- Init all ----
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initTyped();
  initSkillHover();
  initContactForm();
  initParallax();
  initCounters();
  initTilt();
  highlightActiveNavLink();
});
