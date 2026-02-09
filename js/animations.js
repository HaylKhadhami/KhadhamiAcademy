/* ═══════════════════════════════════════
   Khadhami Academy — Animations
   ═══════════════════════════════════════ */

// ── Intersection Observer for scroll reveals ── 
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve — allow re-triggering is optional
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ── Animated Counters ──
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target = parseInt(entry.target.dataset.count);
                const suffix = entry.target.dataset.suffix || '';
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current).toLocaleString() + suffix;
                }, 16);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

// ── Parallax on hero particles ──
function initParallax() {
    const particles = document.querySelectorAll('.hero__particle');
    if (!particles.length) return;

    // Only on desktop
    if (window.innerWidth < 768) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                particles.forEach((p, i) => {
                    const speed = (i + 1) * 0.05;
                    p.style.transform = `translateY(${scrollY * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ── Typing Effect ──
function initTypingEffect() {
    const el = document.querySelector('.typing-text');
    if (!el) return;

    const texts = el.dataset.texts ? JSON.parse(el.dataset.texts) : [];
    if (!texts.length) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            el.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; type(); }, pauseTime);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    type();
}

// ── Smooth scroll for anchor links ──
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
                const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({ top: y, behavior: 'smooth' });

                // Close mobile nav if open
                document.querySelector('.nav__links')?.classList.remove('active');
                document.querySelector('.nav__toggle')?.classList.remove('active');
            }
        });
    });
}

// ── Export ──
window.KAAnimations = { initScrollReveal, animateCounters, initParallax, initTypingEffect, initSmoothScroll };
