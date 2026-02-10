const THEME_STORAGE_KEY = "ka-theme";

let userThemeOverride = null;

function readStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "dark" || storedTheme === "light" ? storedTheme : null;
  } catch (error) {
    return null;
  }
}

function persistTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    // Ignore persistence errors (private mode or storage restrictions).
  }
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", resolvedTheme);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute("content", resolvedTheme === "dark" ? "#080f1f" : "#205090");
  }

  document.querySelectorAll("#theme-toggle, #legal-theme-toggle").forEach((button) => {
    button.setAttribute("aria-pressed", resolvedTheme === "dark" ? "true" : "false");
  });
}

function setTheme(theme, options = {}) {
  const { manual = false, persist = manual } = options;
  const resolvedTheme = theme === "dark" ? "dark" : "light";

  if (manual) {
    userThemeOverride = resolvedTheme;
  }

  if (persist) {
    persistTheme(resolvedTheme);
  }

  applyTheme(resolvedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(nextTheme, { manual: true });
}

function initTheme() {
  const storedTheme = readStoredTheme();
  if (storedTheme) {
    userThemeOverride = storedTheme;
    applyTheme(storedTheme);
  } else {
    applyTheme(getSystemTheme());
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemThemeChange = (event) => {
    if (!userThemeOverride) {
      applyTheme(event.matches ? "dark" : "light");
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onSystemThemeChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(onSystemThemeChange);
  }
}

window.KATheme = {
  initTheme,
  toggleTheme,
  setTheme,
  getSystemTheme,
  readStoredTheme
};
