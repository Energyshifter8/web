// Даалгавар 4. validators.js-ийн функцийг санал хүсэлтийн form-той холбоно.

const form = document.querySelector("#feedback-form");
const statusBox = document.querySelector("#form-status");
const messageInput = document.querySelector("#message");
const messageCounter = document.querySelector("#message-counter");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector(".password-toggle");

// Талбар бүрийн id -> шалгах функц
const validators = {
  name: validateName,
  email: validateEmail,
  password: validatePassword,
  message: validateMessage
};

// Нэг талбарыг шалгаад алдааг харуулна. Зөв бол true буцаана.
function checkField(input) {
  const validate = validators[input.id];
  const error = validate(input.value);
  const errorBox = document.querySelector("#" + input.id + "-error");

  errorBox.textContent = error;
  input.setAttribute("aria-invalid", error !== "");
  input.classList.toggle("is-valid", error === "");
  input.dataset.touched = "true";
  return error === "";
}

function clearField(input) {
  document.querySelector("#" + input.id + "-error").textContent = "";
  input.removeAttribute("aria-invalid");
  input.classList.remove("is-valid");
  delete input.dataset.touched;
}

function updateCounter() {
  const length = messageInput.value.trim().length;
  messageCounter.textContent = length + " / 500";
  messageCounter.classList.toggle("is-over", length > 500);
}

Object.keys(validators).forEach(function (id) {
  const input = document.querySelector("#" + id);

  // Талбараас гарахад шалгана
  input.addEventListener("blur", function () {
    if (input.value !== "" || input.dataset.touched) {
      checkField(input);
    }
  });

  // Нэг удаа шалгагдсан талбарыг бичих бүрт дахин шалгана
  input.addEventListener("input", function () {
    statusBox.textContent = "";
    statusBox.className = "form-status";
    if (input.dataset.touched) {
      checkField(input);
    }
  });
});

messageInput.addEventListener("input", updateCounter);

passwordToggle.addEventListener("click", function () {
  const show = passwordInput.type === "password";
  passwordInput.type = show ? "text" : "password";
  passwordToggle.textContent = show ? "Нуух" : "Харуулах";
  passwordToggle.setAttribute("aria-pressed", show);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let firstInvalid = null;
  let errorCount = 0;

  Object.keys(validators).forEach(function (id) {
    const input = document.querySelector("#" + id);
    if (!checkField(input)) {
      errorCount++;
      if (firstInvalid === null) {
        firstInvalid = input;
      }
    }
  });

  if (firstInvalid) {
    statusBox.className = "form-status is-error";
    statusBox.textContent = errorCount + " талбарт алдаа байна. Засаад дахин илгээнэ үү.";
    firstInvalid.focus();
    return;
  }

  const name = document.querySelector("#name").value.trim();
  statusBox.className = "form-status is-success";
  statusBox.textContent = "Баярлалаа, " + name + "! Таны санал хүсэлт амжилттай илгээгдлээ.";
  console.table({
    name: name,
    email: document.querySelector("#email").value,
    message: messageInput.value.trim()
  });

  form.reset();
  // reset() нь type-ийг сэргээдэггүй тул нууц үгийг дахин нууна
  passwordInput.type = "password";
  passwordToggle.textContent = "Харуулах";
  passwordToggle.setAttribute("aria-pressed", "false");
  Object.keys(validators).forEach(function (id) {
    clearField(document.querySelector("#" + id));
  });
  updateCounter();
});

updateCounter();
