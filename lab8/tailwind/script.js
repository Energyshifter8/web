const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const menuButton = document.querySelector(".menu-button");
const menu = document.getElementById("main-nav");

// Dark mode: <html data-theme="dark|light"> -> @custom-variant dark
function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeButton.setAttribute("aria-pressed", theme === "dark");
  themeButton.textContent = theme === "dark" ? "Цайвар горим" : "Харанхуй горим";
}

setTheme(root.getAttribute("data-theme"));

themeButton.addEventListener("click", function () {
  const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  setTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// Гар утасны цэс
menuButton.addEventListener("click", function () {
  const open = menu.classList.toggle("hidden") === false;
  menu.classList.toggle("flex", open);
  menuButton.setAttribute("aria-expanded", open);
});

// Form validation: aria-invalid -> aria-invalid: / peer-aria-invalid: variant
document.querySelectorAll(".validate-form").forEach(function (form) {
  const success = form.querySelector(".form-success");
  const fields = form.querySelectorAll("input[required], select[required]");

  function check(field) {
    field.setAttribute("aria-invalid", !field.checkValidity());
  }

  fields.forEach(function (field) {
    field.addEventListener("input", function () {
      if (form.hasAttribute("data-submitted")) check(field);
    });
    field.addEventListener("change", function () {
      if (form.hasAttribute("data-submitted")) check(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    success.classList.add("hidden");
    form.setAttribute("data-submitted", "");
    fields.forEach(check);

    if (!form.checkValidity()) {
      form.querySelector(":invalid").focus();
      return;
    }

    form.reset();
    form.removeAttribute("data-submitted");
    fields.forEach(function (field) {
      field.removeAttribute("aria-invalid");
    });
    success.classList.remove("hidden");
  });
});
