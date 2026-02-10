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

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + getHeaderOffset();
    let activeLink = null;

    // Keep nav inactive in the hero area before the first tracked section.
    if (scrollPosition >= sections[0].section.offsetTop) {
      for (const item of sections) {
        if (scrollPosition >= item.section.offsetTop) {
          activeLink = item.link;
        } else {
          break;
        }
      }
    }

    links.forEach((link) => {
      link.classList.toggle("active", link === activeLink);
    });
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
