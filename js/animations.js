/* ── Scroll reveal ── */

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((element) => observer.observe(element));
}

/* ── Animated counters ── */

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const node = entry.target;
        const targetValue = Number(node.getAttribute("data-count") || 0);
        const suffix = node.getAttribute("data-suffix") || "";
        const durationMs = 1400;
        const start = performance.now();

        const formatter = new Intl.NumberFormat(document.documentElement.lang || "en");

        function tick(timestamp) {
          const progress = Math.min((timestamp - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(targetValue * eased);
          node.textContent = `${formatter.format(value)}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        }

        requestAnimationFrame(tick);
        currentObserver.unobserve(node);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ── Smooth scroll for anchor links ── */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const navHeight = document.querySelector(".site-header")?.offsetHeight || 0;
      const offset = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top: offset, behavior: "smooth" });
    });
  });
}

/* ── Hero parallax with floating glows ── */

function initHeroParallax() {
  const glowOne = document.querySelector(".hero-glow--one");
  const glowTwo = document.querySelector(".hero-glow--two");
  if (!glowOne || !glowTwo) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const depth = Math.min(window.scrollY, 420);
        glowOne.style.transform = `translate3d(0, ${depth * 0.12}px, 0)`;
        glowTwo.style.transform = `translate3d(0, ${depth * -0.08}px, 0)`;
        ticking = false;
      });
    },
    { passive: true }
  );
}

/* ── Scroll progress indicator ── */

function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }, { passive: true });

  update();
}

/* ── 3D tilt effect on hero preview card ── */

function initHeroTilt() {
  const card = document.querySelector(".preview-card");
  if (!card) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const parent = card.parentElement;

  parent.addEventListener("mousemove", (e) => {
    const rect = parent.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1)`;
  });

  parent.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(800px) rotateY(0) rotateX(0) scale3d(1, 1, 1)";
  });

  card.style.transition = "transform 200ms ease";
}

/* ── Magnetic hover on CTA buttons ── */

function initMagneticButtons() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const buttons = document.querySelectorAll(".hero-cta .btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

window.KAAnimations = {
  initScrollReveal,
  animateCounters,
  initSmoothScroll,
  initHeroParallax,
  initScrollProgress,
  initHeroTilt,
  initMagneticButtons
};
