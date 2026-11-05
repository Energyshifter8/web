const root = document.documentElement;
const themeButton = document.querySelector(".theme-button");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", theme === "dark");
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  setTheme(savedTheme);
} else if (prefersDark) {
  setTheme("dark");
} else {
  setTheme("light");
}

themeButton.addEventListener("click", function () {
  let newTheme = "dark";
  if (root.dataset.theme === "dark") {
    newTheme = "light";
  }
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});
