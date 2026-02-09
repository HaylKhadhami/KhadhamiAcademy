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

window.KAAnimations = {
  initScrollReveal,
  animateCounters,
  initSmoothScroll,
  initHeroParallax
};
