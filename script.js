/* =======================================
   PROPOSTA COMERCIAL — GELO AUGUSTA
   Animations, Interactions & Counters
   ======================================= */

document.addEventListener('DOMContentLoaded', () => {
    // === Preloader ===
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback
    setTimeout(() => {
        if (preloader) preloader.classList.add('hidden');
    }, 3000);

    // === Navbar Scroll ===
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
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

    // === Mobile Menu ===
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // === Scroll Animations ===
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // === Number Counter Animation ===
    const counterElements = document.querySelectorAll('.stat-number[data-count], .result-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                animateCounter(target, 0, count, 2000);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));

    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + range * easeOutQuart);

            if (end >= 1000) {
                element.textContent = current.toLocaleString('pt-PT');
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // === Impact Bars Animation ===
    const impactBars = document.querySelectorAll('.impact-fill');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    impactBars.forEach(bar => barObserver.observe(bar));

    // === Smooth Scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // === Parallax on Hero ===
    const heroBg = document.querySelector('.hero-bg-img');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(${1.05 + scrolled * 0.0003}) translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // === Card Hover Tilt Effect ===
    const tiltCards = document.querySelectorAll('.about-card, .strat-card, .result-card, .gmb-item');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // === Typing effect for badge ===
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        badge.style.opacity = '0';
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transition = 'opacity 0.5s';
        }, 500);
    }

    // === Stagger animation for lists ===
    const lists = document.querySelectorAll('.included-list');
    const listObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    item.style.transition = `opacity 0.5s ${index * 0.08}s, transform 0.5s ${index * 0.08}s`;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100);
                });
                listObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    lists.forEach(list => listObserver.observe(list));

    console.log('🚀 Proposta Comercial — Gelo Augusta carregada com sucesso!');
});
