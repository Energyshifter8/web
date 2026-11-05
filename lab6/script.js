const root = document.documentElement;
const themeButton = document.querySelector(".theme-button");
const flipCards = document.querySelectorAll(".flip-card");

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

// Карт дээр дарахад эргэнэ
function flipCard(card) {
  const isFlipped = card.classList.toggle("is-flipped");
  card.setAttribute("aria-pressed", isFlipped);
}

flipCards.forEach(function (card) {
  card.addEventListener("click", function () {
    flipCard(card);
  });

  // Гарнаас Enter эсвэл Space дарахад эргэнэ
  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      flipCard(card);
    }
  });
});
