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

  const sections = links
    .map((link) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return null;
      const section = document.querySelector(id);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const getHeaderOffset = () =>
    (document.querySelector(".site-header")?.offsetHeight || 0) + 24;

  const setActive = (activeLink) => {
    links.forEach((link) => {
      link.classList.toggle("active", link === activeLink);
    });
  };

  const updateActiveLink = () => {
    const marker = getHeaderOffset();
    const sectionRects = sections.map((item) => ({
      ...item,
      rect: item.section.getBoundingClientRect()
    }));
    const firstSectionTop = sectionRects[0].rect.top + window.scrollY;

    // Keep nav inactive in hero area before the first tracked section.
    if (window.scrollY + marker < firstSectionTop) {
      setActive(null);
      return;
    }

    // Primary match: header marker line is inside the section.
    let activeEntry = sectionRects.find((entry) => (
      entry.rect.top <= marker && entry.rect.bottom > marker
    ));

    // Secondary match: use the most visible section in the viewport.
    if (!activeEntry) {
      let bestVisible = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const entry of sectionRects) {
        const visibleTop = Math.max(entry.rect.top, marker);
        const visibleBottom = Math.min(entry.rect.bottom, window.innerHeight);
        const visible = Math.max(0, visibleBottom - visibleTop);
        if (visible <= 0) continue;

        const distance = Math.abs(entry.rect.top - marker);
        if (visible > bestVisible || (visible === bestVisible && distance < bestDistance)) {
          bestVisible = visible;
          bestDistance = distance;
          activeEntry = entry;
        }
      }
    }

    // Final fallback: last section whose top passed the marker.
    if (!activeEntry) {
      for (const entry of sectionRects) {
        if (entry.rect.top <= marker) {
          activeEntry = entry;
        }
      }
    }

    setActive(activeEntry ? activeEntry.link : null);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateActiveLink();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActiveLink);
  window.addEventListener("hashchange", updateActiveLink);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      // Immediate visual feedback, then correct state after scroll settles.
      setActive(link);
      requestAnimationFrame(updateActiveLink);
    });
  });

  updateActiveLink();
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
  initControls();
  initCookieBanner();
  initFooterYear();
});
