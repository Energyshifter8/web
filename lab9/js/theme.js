// Харанхуй горим (лаб 6-аас). index.html, test.html хоёуланд хэрэглэнэ.
const root = document.documentElement;
const themeButton = document.querySelector(".theme-button");

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", theme === "dark");
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
} else {
  setTheme("light");
}

themeButton.addEventListener("click", function () {
  const newTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});
