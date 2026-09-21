document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const done = () => preloader && preloader.classList.add('hidden');
  window.addEventListener('load', () => setTimeout(done, 500));
  setTimeout(done, 2600);

  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const topbar = document.getElementById('topbar');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle('scrolled', y > 60);
    let current = '';
    sections.forEach(s => {
      if (y >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
    if (topbar) topbar.style.transform = y > 200 ? 'translateY(-100%)' : 'translateY(0)';
    if (topbar) topbar.style.transition = 'transform .35s cubic-bezier(.22,1,.36,1)';
  }, { passive: true });

  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
    });
    navLinks.forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    }));
  }

  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // stagger children if parent has grid
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 6, 4) * 0.06) + 's';
    io.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const t = document.querySelector(href);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });
});
