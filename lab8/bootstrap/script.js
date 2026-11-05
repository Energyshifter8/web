const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");

// Dark mode: <html data-bs-theme="dark|light">
function setTheme(theme) {
  root.setAttribute("data-bs-theme", theme);
  themeButton.setAttribute("aria-pressed", theme === "dark");
  themeButton.textContent = theme === "dark" ? "Цайвар горим" : "Харанхуй горим";
}

setTheme(root.getAttribute("data-bs-theme"));

themeButton.addEventListener("click", function () {
  const newTheme = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// Form validation: Bootstrap-ын .was-validated загвар
document.querySelectorAll(".needs-validation").forEach(function (form) {
  const success = form.querySelector(".form-success");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    success.classList.add("d-none");

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      form.querySelector(":invalid").focus();
      return;
    }

    form.reset();
    form.classList.remove("was-validated");
    success.classList.remove("d-none");
  });
});
