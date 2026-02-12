const COOKIE_KEY = "ka-cookie-consent";

/* ── Header scroll state ── */

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

/* ── Mobile navigation with focus trap + escape key ── */

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

    // Focus first link when opening
    if (isOpen) {
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on outside click
  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("open")) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  // Escape key to close
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // Focus trap within mobile nav
  menu.addEventListener("keydown", (event) => {
    if (event.key !== "Tab" || !menu.classList.contains("open")) return;

    const focusable = [...menu.querySelectorAll("a, button")];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });
}

/* ── Nav spy with aria-current ── */

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
      const isActive = link === activeLink;
      link.classList.toggle("active", isActive);
      // Accessibility: set aria-current on active nav item
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
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

/* ── Showcase carousel with touch/swipe + keyboard ── */

function initShowcaseMini() {
  const shell = document.querySelector("[data-showcase-mini]");
  if (!shell) return;

  const track = shell.querySelector("[data-showcase-track]");
  const viewport = shell.querySelector("[data-showcase-viewport]");
  const previousButton = shell.querySelector("[data-showcase-prev]");
  const nextButton = shell.querySelector("[data-showcase-next]");
  const autoplayButton = shell.querySelector("[data-showcase-autoplay]");
  const dotsNode = shell.querySelector("[data-showcase-dots]");
  const slides = track ? [...track.querySelectorAll(".mini-shot")] : [];
  if (!track || !viewport || !slides.length) return;

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;
  let perView = 1;
  let maxIndex = 0;
  let slideWidth = 0;
  let gapWidth = 0;
  let autoplayTimer = null;

  const readGapWidth = () => {
    const styles = window.getComputedStyle(track);
    const rawValue = styles.gap || styles.columnGap || "0";
    const parsed = Number.parseFloat(rawValue);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const getPerView = () => {
    const width = viewport.clientWidth;
    if (width >= 1120) return 3;
    if (width >= 720) return 2;
    return 1;
  };

  const updateDots = () => {
    if (!dotsNode) return;
    const steps = maxIndex + 1;
    if (steps <= 1) {
      dotsNode.innerHTML = "";
      return;
    }

    if (dotsNode.children.length !== steps) {
      dotsNode.innerHTML = Array.from({ length: steps }, () => '<span class="showcase-mini__dot"></span>').join("");
    }

    [...dotsNode.children].forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentIndex);
    });
  };

  const updateControls = () => {
    if (previousButton) {
      previousButton.disabled = currentIndex <= 0;
      previousButton.setAttribute("aria-disabled", previousButton.disabled ? "true" : "false");
    }
    if (nextButton) {
      nextButton.disabled = currentIndex >= maxIndex;
      nextButton.setAttribute("aria-disabled", nextButton.disabled ? "true" : "false");
    }
    if (autoplayButton && !autoplayTimer) {
      autoplayButton.disabled = maxIndex <= 0;
      autoplayButton.setAttribute("aria-disabled", autoplayButton.disabled ? "true" : "false");
    }
  };

  const renderTrack = (animate = true) => {
    const slide = slides[currentIndex];
    let offset = slide ? slide.offsetLeft : (slideWidth + gapWidth) * currentIndex;
    // When at the last scroll position, align the track so the very last
    // slide's trailing edge is flush with the viewport edge.
    if (currentIndex >= maxIndex && maxIndex > 0) {
      const lastSlide = slides[slides.length - 1];
      if (lastSlide) {
        const endOffset = lastSlide.offsetLeft + lastSlide.offsetWidth - viewport.clientWidth;
        if (endOffset > 0) {
          offset = endOffset;
        }
      }
    }
    if (!animate) {
      track.style.transitionDuration = "0ms";
    }
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    if (!animate) {
      requestAnimationFrame(() => {
        track.style.removeProperty("transition-duration");
      });
    }
    updateDots();
    updateControls();
  };

  const goToIndex = (nextIndex, options = {}) => {
    const { animate = true } = options;
    const boundedIndex = Math.max(0, Math.min(nextIndex, maxIndex));
    currentIndex = boundedIndex;
    renderTrack(animate);
  };

  const layout = (animate = false) => {
    gapWidth = readGapWidth();
    perView = Math.min(getPerView(), slides.length);
    const usableWidth = Math.max(viewport.clientWidth - gapWidth * (perView - 1), 0);
    slideWidth = usableWidth / perView;
    slides.forEach((slide) => {
      slide.style.flexBasis = `${slideWidth}px`;
      slide.style.width = `${slideWidth}px`;
    });
    maxIndex = Math.max(0, slides.length - perView);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    renderTrack(animate);
  };

  const stopAutoplay = () => {
    if (!autoplayTimer) return;
    clearInterval(autoplayTimer);
    autoplayTimer = null;
    if (autoplayButton) {
      autoplayButton.disabled = maxIndex <= 0;
      autoplayButton.removeAttribute("aria-busy");
    }
    updateControls();
  };

  const startAutoplay = () => {
    if (!autoplayButton || autoplayTimer || reducedMotionQuery.matches || maxIndex <= 0) return;

    goToIndex(0, { animate: false });
    autoplayButton.disabled = true;
    autoplayButton.removeAttribute("aria-disabled");
    autoplayButton.setAttribute("aria-busy", "true");

    const maxSteps = Math.max(1, maxIndex);
    let steps = 0;
    const stepInterval = Math.max(1800, Math.round(30000 / maxSteps));
    autoplayTimer = window.setInterval(() => {
      steps += 1;
      goToIndex(currentIndex + 1);
      if (steps >= maxSteps) {
        stopAutoplay();
      }
    }, stepInterval);
  };

  previousButton?.addEventListener("click", () => {
    stopAutoplay();
    goToIndex(currentIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    stopAutoplay();
    goToIndex(currentIndex + 1);
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

  // Touch/swipe support
  let touchStartX = 0;
  let touchDeltaX = 0;
  let isSwiping = false;

  viewport.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
    isSwiping = true;
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  viewport.addEventListener("touchend", () => {
    if (!isSwiping) return;
    isSwiping = false;
    const threshold = slideWidth * 0.2;
    if (Math.abs(touchDeltaX) > threshold) {
      if (touchDeltaX < 0) {
        goToIndex(currentIndex + 1);
      } else {
        goToIndex(currentIndex - 1);
      }
      stopAutoplay();
    }
  }, { passive: true });

  // Keyboard navigation
  shell.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      stopAutoplay();
      const isRTL = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight") {
        goToIndex(isRTL ? currentIndex - 1 : currentIndex + 1);
      } else {
        goToIndex(isRTL ? currentIndex + 1 : currentIndex - 1);
      }
    } else if (e.key === "Home") {
      e.preventDefault();
      goToIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToIndex(maxIndex);
    }
  });

  let resizeTicking = false;
  window.addEventListener("resize", () => {
    if (resizeTicking) return;
    resizeTicking = true;
    requestAnimationFrame(() => {
      layout(false);
      resizeTicking = false;
    });
  });

  document.addEventListener("ka:language-change", () => {
    window.setTimeout(() => layout(false), 60);
  });

  layout(false);
}

/* ── Cookie banner ── */

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

/* ── Controls (language & theme toggles) ── */

function initControls() {
  const langButton = document.getElementById("lang-toggle");
  const themeButton = document.getElementById("theme-toggle");

  if (langButton) {
    langButton.addEventListener("click", () => {
      KAi18n.toggleLanguage();
      // Announce language change via ARIA live region
      const liveRegion = document.getElementById("sr-live");
      if (liveRegion) {
        const lang = document.documentElement.lang;
        liveRegion.textContent = lang === "ar" ? "تم التبديل إلى العربية" : "Switched to English";
        setTimeout(() => { liveRegion.textContent = ""; }, 2000);
      }
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

/* ── Scroll-to-top button ── */

function initScrollTop() {
  const btn = document.getElementById("scroll-top");
  if (!btn) return;

  let ticking = false;
  const update = () => {
    const show = window.scrollY > 500;
    btn.classList.toggle("visible", show);
  };

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  update();
}

/* ── Footer year ── */

function initFooterYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

/* ── Init all ── */

document.addEventListener("DOMContentLoaded", () => {
  KATheme.initTheme();
  KAi18n.initI18n();

  KAAnimations.initScrollReveal();
  KAAnimations.animateCounters();
  KAAnimations.initSmoothScroll();
  KAAnimations.initHeroParallax();
  KAAnimations.initScrollProgress();
  KAAnimations.initHeroTilt();
  KAAnimations.initMagneticButtons();

  initHeaderState();
  initMobileNav();
  initNavSpy();
  initShowcaseMini();
  initControls();
  initCookieBanner();
  initScrollTop();
  initFooterYear();
});
