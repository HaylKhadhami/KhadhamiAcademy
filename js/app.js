const COOKIE_KEY = "ka-cookie-consent";

function initHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 16) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("open")) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

function initNavSpy() {
  const links = [...document.querySelectorAll(".nav-menu a[href^='#']")];
  if (!links.length) return;

  const entries = links
    .map((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return null;
      const section = document.querySelector(href);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!entries.length) return;

  const getMarkerOffset = () => {
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    return headerHeight + 24;
  };

  const setActive = (activeLink) => {
    links.forEach((link) => {
      link.classList.toggle("active", link === activeLink);
    });
  };

  const getBounds = () => entries.map(({ link, section }) => {
    const top = section.offsetTop;
    const bottom = top + Math.max(section.offsetHeight, 1);
    return { link, top, bottom };
  });

  const updateActive = () => {
    const markerY = window.scrollY + getMarkerOffset();
    const bounds = getBounds();
    if (!bounds.length) {
      setActive(null);
      return;
    }

    if (markerY < bounds[0].top) {
      setActive(null);
      return;
    }

    const active = bounds.find((entry) => markerY >= entry.top && markerY < entry.bottom);
    if (active) {
      setActive(active.link);
      return;
    }

    const atPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    setActive(atPageBottom ? bounds[bounds.length - 1].link : null);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateActive();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActive);
  window.addEventListener("hashchange", updateActive);
  window.addEventListener("load", updateActive);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      setActive(link);
      window.setTimeout(updateActive, 140);
    });
  });

  updateActive();
}

function initShowcaseMini() {
  const shell = document.querySelector("[data-showcase-mini]");
  if (!shell) return;

  const track = shell.querySelector("[data-showcase-track]");
  const previousButton = shell.querySelector("[data-showcase-prev]");
  const nextButton = shell.querySelector("[data-showcase-next]");
  const autoplayButton = shell.querySelector("[data-showcase-autoplay]");
  const slides = track ? [...track.querySelectorAll(".mini-shot")] : [];
  if (!track || !slides.length) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;
  let autoplayTimer = null;

  const normalizeIndex = (index) => (index + slides.length) % slides.length;

  const scrollToIndex = (index, behavior = "smooth") => {
    currentIndex = normalizeIndex(index);
    slides[currentIndex].scrollIntoView({
      behavior,
      block: "nearest",
      inline: "start"
    });
  };

  const updateCurrentIndexFromScroll = () => {
    const trackLeft = track.getBoundingClientRect().left;
    let bestIndex = currentIndex;
    let bestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    currentIndex = bestIndex;
  };

  let scrollTicking = false;
  track.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        updateCurrentIndexFromScroll();
        scrollTicking = false;
      });
    },
    { passive: true }
  );

  const stopAutoplay = () => {
    if (!autoplayTimer) return;
    clearInterval(autoplayTimer);
    autoplayTimer = null;
    if (autoplayButton) {
      autoplayButton.disabled = false;
      autoplayButton.removeAttribute("aria-busy");
    }
  };

  const startAutoplay = () => {
    if (!autoplayButton || autoplayTimer || reducedMotionQuery.matches) return;
    autoplayButton.disabled = true;
    autoplayButton.setAttribute("aria-busy", "true");

    let steps = 0;
    const maxSteps = Math.max(1, slides.length - 1);
    autoplayTimer = window.setInterval(() => {
      steps += 1;
      scrollToIndex(currentIndex + 1);
      if (steps >= maxSteps) {
        stopAutoplay();
      }
    }, 4200);
  };

  previousButton?.addEventListener("click", () => {
    stopAutoplay();
    scrollToIndex(currentIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    stopAutoplay();
    scrollToIndex(currentIndex + 1);
  });

  autoplayButton?.addEventListener("click", () => {
    stopAutoplay();
    startAutoplay();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
    }
  });

  window.addEventListener("resize", updateCurrentIndexFromScroll);
  document.addEventListener("ka:language-change", () => {
    window.setTimeout(updateCurrentIndexFromScroll, 60);
  });

  scrollToIndex(0, "auto");
}

function initCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("cookie-accept");
  const decline = document.getElementById("cookie-decline");
  if (!banner || !accept || !decline) return;

  const consent = localStorage.getItem(COOKIE_KEY);
  if (!consent) {
    banner.classList.add("show");
  }

  const close = (value) => {
    localStorage.setItem(COOKIE_KEY, value);
    banner.classList.remove("show");
  };

  accept.addEventListener("click", () => close("accepted"));
  decline.addEventListener("click", () => close("declined"));
}

function initControls() {
  const langButton = document.getElementById("lang-toggle");
  const themeButton = document.getElementById("theme-toggle");

  if (langButton) {
    langButton.addEventListener("click", () => {
      KAi18n.toggleLanguage();
    });
  }

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      KATheme.toggleTheme();
    });
  }

  [langButton, themeButton].forEach((button) => {
    if (!button) return;
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        button.click();
      }
    });
  });
}

function initFooterYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  KATheme.initTheme();
  KAi18n.initI18n();

  KAAnimations.initScrollReveal();
  KAAnimations.animateCounters();
  KAAnimations.initSmoothScroll();
  KAAnimations.initHeroParallax();

  initHeaderState();
  initMobileNav();
  initNavSpy();
  initShowcaseMini();
  initControls();
  initCookieBanner();
  initFooterYear();
});
