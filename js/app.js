/* ═══════════════════════════════════════
   Khadhami Academy — Main App
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ── Initialize modules ──
    KATheme.initTheme();
    KAi18n.initI18n();
    KAAnimations.initScrollReveal();
    KAAnimations.animateCounters();
    KAAnimations.initParallax();
    KAAnimations.initSmoothScroll();

    // ── Nav scroll state ──
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });

    // ── Mobile nav toggle ──
    const navToggle = document.querySelector('.nav__toggle');
    const navLinks = document.querySelector('.nav__links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // ── Theme toggle ──
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', KATheme.toggleTheme);
    }

    // ── Language toggle ──
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            KAi18n.toggleLanguage();
        });
    }

    // ── Close mobile nav on link click ──
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ── Keyboard accessibility for theme/lang ──
    [themeBtn, langBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        }
    });
});
