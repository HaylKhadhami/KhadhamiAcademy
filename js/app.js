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

function initShowcaseTabs() {
  const tabList = document.querySelector("[data-showcase-tabs]");
  if (!tabList) return;

  const tabs = [...tabList.querySelectorAll("[data-showcase-tab]")];
  const panels = [...document.querySelectorAll("[data-showcase-panel]")];
  if (!tabs.length || !panels.length) return;

  let activeIndex = 0;
  let autoRotateId = null;
  const showcaseSection = document.getElementById("showcase");
  const showcaseShell = tabList.closest(".showcase-shell");
  const interactionTarget = showcaseShell || tabList;
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let sectionInView = false;
  let isPausedByInteraction = false;

  const stopAutoRotate = () => {
    if (!autoRotateId) return;
    clearInterval(autoRotateId);
    autoRotateId = null;
  };

  const startAutoRotate = () => {
    if (autoRotateId || reducedMotionQuery.matches || !sectionInView || isPausedByInteraction) return;
    autoRotateId = setInterval(() => {
      const nextIndex = (activeIndex + 1) % tabs.length;
      activateTab(tabs[nextIndex]);
    }, 5500);
  };

  const activateTab = (targetTab, options = {}) => {
    const { focus = false } = options;
    const targetKey = targetTab.getAttribute("data-showcase-tab");
    activeIndex = tabs.indexOf(targetTab);

    tabs.forEach((tab) => {
      const isActive = tab === targetTab;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.getAttribute("data-showcase-panel") === targetKey;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });

    if (focus) {
      targetTab.focus();
    }
  };

  const moveFocus = (currentIndex, delta) => {
    const nextIndex = (currentIndex + delta + tabs.length) % tabs.length;
    activateTab(tabs[nextIndex], { focus: true });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      isPausedByInteraction = true;
      stopAutoRotate();
      activateTab(tab);
    });
    tab.addEventListener("keydown", (event) => {
      const isRtl = document.documentElement.dir === "rtl";
      const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";
      const previousKey = isRtl ? "ArrowRight" : "ArrowLeft";

      if (event.key === nextKey) {
        event.preventDefault();
        isPausedByInteraction = true;
        stopAutoRotate();
        moveFocus(index, 1);
      } else if (event.key === previousKey) {
        event.preventDefault();
        isPausedByInteraction = true;
        stopAutoRotate();
        moveFocus(index, -1);
      } else if (event.key === "Home") {
        event.preventDefault();
        isPausedByInteraction = true;
        stopAutoRotate();
        activateTab(tabs[0], { focus: true });
      } else if (event.key === "End") {
        event.preventDefault();
        isPausedByInteraction = true;
        stopAutoRotate();
        activateTab(tabs[tabs.length - 1], { focus: true });
      }
    });
  });

  const interactionStart = () => {
    isPausedByInteraction = true;
    stopAutoRotate();
  };

  const interactionEnd = () => {
    isPausedByInteraction = false;
    startAutoRotate();
  };

  interactionTarget.addEventListener("pointerenter", interactionStart);
  interactionTarget.addEventListener("pointerleave", interactionEnd);
  interactionTarget.addEventListener("focusin", interactionStart);
  interactionTarget.addEventListener("focusout", (event) => {
    if (interactionTarget.contains(event.relatedTarget)) return;
    interactionEnd();
  });

  if (showcaseSection) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          sectionInView = entry.isIntersecting;
          if (sectionInView) {
            startAutoRotate();
          } else {
            stopAutoRotate();
          }
        });
      },
      { threshold: 0.35 }
    );
    sectionObserver.observe(showcaseSection);
  } else {
    sectionInView = true;
    startAutoRotate();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoRotate();
      return;
    }
    startAutoRotate();
  });

  const initialTab = tabs.find((tab) => tab.classList.contains("active")) || tabs[0];
  activateTab(initialTab);
  startAutoRotate();
}

function initScreenshotLightbox() {
  const lightbox = document.getElementById("shot-lightbox");
  if (!lightbox) return;

  const imageNode = document.getElementById("shot-lightbox-image");
  const captionNode = document.getElementById("shot-lightbox-caption");
  const closeButtons = [...lightbox.querySelectorAll("[data-shot-lightbox-close]")];
  const previousButton = lightbox.querySelector("[data-shot-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-shot-lightbox-next]");
  const openableImages = [...document.querySelectorAll("img[data-shot-open='true']")];
  if (!imageNode || !captionNode || !openableImages.length) return;

  let activeIndex = -1;
  let previousBodyOverflow = "";

  const updateFromActive = () => {
    if (activeIndex < 0 || activeIndex >= openableImages.length) return;
    const sourceImage = openableImages[activeIndex];
    const figure = sourceImage.closest("figure");
    const sourceCaption = figure?.querySelector("figcaption")?.textContent?.trim();
    imageNode.src = sourceImage.currentSrc || sourceImage.src;
    imageNode.alt = sourceImage.alt || "";
    captionNode.textContent = sourceCaption || sourceImage.alt || "";
  };

  const openAt = (index) => {
    activeIndex = (index + openableImages.length) % openableImages.length;
    updateFromActive();
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    imageNode.removeAttribute("src");
    imageNode.alt = "";
    captionNode.textContent = "";
    document.body.style.overflow = previousBodyOverflow;
    activeIndex = -1;
  };

  const showPrevious = () => {
    if (activeIndex < 0) return;
    activeIndex = (activeIndex - 1 + openableImages.length) % openableImages.length;
    updateFromActive();
  };

  const showNext = () => {
    if (activeIndex < 0) return;
    activeIndex = (activeIndex + 1) % openableImages.length;
    updateFromActive();
  };

  openableImages.forEach((image, index) => {
    image.addEventListener("click", () => openAt(index));
    image.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openAt(index);
    });
    if (!image.hasAttribute("tabindex")) {
      image.tabIndex = 0;
    }
    if (!image.hasAttribute("role")) {
      image.setAttribute("role", "button");
    }
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeLightbox));
  if (previousButton) previousButton.addEventListener("click", showPrevious);
  if (nextButton) nextButton.addEventListener("click", showNext);

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    const isRtl = document.documentElement.dir === "rtl";
    const previousKey = isRtl ? "ArrowRight" : "ArrowLeft";
    const nextKey = isRtl ? "ArrowLeft" : "ArrowRight";

    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === previousKey) {
      event.preventDefault();
      showPrevious();
      return;
    }

    if (event.key === nextKey) {
      event.preventDefault();
      showNext();
    }
  });

  document.addEventListener("ka:language-change", () => {
    if (lightbox.hidden) return;
    updateFromActive();
  });
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
  initShowcaseTabs();
  initScreenshotLightbox();
  initControls();
  initCookieBanner();
  initFooterYear();
});
