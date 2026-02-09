let userThemeOverride = null;

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

  const button = document.getElementById("theme-toggle");
  if (button) {
    button.setAttribute("aria-pressed", resolvedTheme === "dark" ? "true" : "false");
  }
}

function setTheme(theme, options = {}) {
  const { manual = false } = options;
  if (manual) {
    userThemeOverride = theme;
  }
  applyTheme(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(nextTheme, { manual: true });
}

function initTheme() {
  applyTheme(getSystemTheme());

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", (event) => {
    if (!userThemeOverride) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
}

window.KATheme = {
  initTheme,
  toggleTheme,
  setTheme,
  getSystemTheme
};
