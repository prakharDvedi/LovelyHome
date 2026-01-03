export default function initBackgrounds() {
  const buttons = document.querySelectorAll("[data-theme]");
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem("lovely_theme") || "bg-calm";
  setTheme(savedTheme);

  function setTheme(themeName) {
    // Reset all
    body.className = "";
    // Add new (and keep existing utility classes if we had any, but here we wipe for safety)
    body.classList.add(themeName);

    // Update buttons
    buttons.forEach((btn) => {
      if (btn.dataset.theme === themeName) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    // Save
    localStorage.setItem("lovely_theme", themeName);
  }

  // Events
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTheme(btn.dataset.theme);
    });
  });
}
