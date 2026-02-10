const LEGAL_LANGUAGE_STORAGE_KEY = "ka-language";

function readStoredLegalLanguage() {
  try {
    const language = localStorage.getItem(LEGAL_LANGUAGE_STORAGE_KEY);
    return language === "ar" || language === "en" ? language : null;
  } catch (error) {
    return null;
  }
}

function persistLegalLanguage(language) {
  try {
    localStorage.setItem(LEGAL_LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Ignore persistence errors (private mode or storage restrictions).
  }
}

function detectLegalLanguage() {
  const storedLanguage = readStoredLegalLanguage();
  if (storedLanguage) {
    return storedLanguage;
  }

  const language = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  return language.startsWith("ar") ? "ar" : "en";
}

let currentLegalLanguage = detectLegalLanguage();

function setLegalLanguage(language, options = {}) {
  const { persist = true } = options;
  currentLegalLanguage = language === "ar" ? "ar" : "en";

  if (persist) {
    persistLegalLanguage(currentLegalLanguage);
  }

  document.documentElement.lang = currentLegalLanguage;
  document.documentElement.dir = currentLegalLanguage === "ar" ? "rtl" : "ltr";

  document.querySelectorAll(".locale-block").forEach((block) => {
    const blockLanguage = block.getAttribute("data-locale");
    block.hidden = blockLanguage !== currentLegalLanguage;
  });

  const toggle = document.getElementById("legal-lang-toggle");
  if (toggle) {
    toggle.textContent = currentLegalLanguage === "ar" ? "English" : "العربية";
    toggle.setAttribute(
      "aria-label",
      currentLegalLanguage === "ar" ? "Switch to English" : "التبديل إلى العربية"
    );
  }

  const homeLink = document.querySelector(".legal-home-link");
  if (homeLink) {
    homeLink.textContent = currentLegalLanguage === "ar" ? "الرئيسية" : "Home";
  }

  const eyebrow = document.querySelector(".legal-eyebrow");
  if (eyebrow) {
    eyebrow.textContent = currentLegalLanguage === "ar" ? "المركز القانوني" : "Legal Center";
  }

  const copyright = document.querySelector(".legal-copyright");
  if (copyright) {
    copyright.textContent =
      currentLegalLanguage === "ar"
        ? `جميع الحقوق محفوظة لاكاديمية الخضمي ${new Date().getFullYear()}`
        : `Copyright ${new Date().getFullYear()} Khadhami Academy. All rights reserved.`;
  }
}

function toggleLegalLanguage() {
  setLegalLanguage(currentLegalLanguage === "ar" ? "en" : "ar");
}

function initLegalPage() {
  KATheme.initTheme();
  setLegalLanguage(detectLegalLanguage(), { persist: false });

  const langToggle = document.getElementById("legal-lang-toggle");
  const themeToggle = document.getElementById("legal-theme-toggle");

  if (langToggle) {
    langToggle.addEventListener("click", toggleLegalLanguage);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => KATheme.toggleTheme());
  }
}

document.addEventListener("DOMContentLoaded", initLegalPage);
