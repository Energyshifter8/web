// Даалгавар 3. Form-ын 4 validation функц.
// Функц бүр алдааны мессеж буцаана. Хоосон мөр ("") буцаавал утга зөв.

// Хоёр захын зайг хасна. Хоосон биш, 2–50 тэмдэгт, тоо агуулахгүй.
function validateName(value) {
  const name = value.trim();
  if (name === "") {
    return "Нэрээ оруулна уу.";
  }
  if (name.length < 2 || name.length > 50) {
    return "Нэр 2–50 тэмдэгт байх ёстой.";
  }
  if (/\d/.test(name)) {
    return "Нэрэнд тоо орох ёсгүй.";
  }
  return "";
}

// Хоосон биш; «нэр@домэйн.өргөтгөл» хэлбэр; зай агуулахгүй.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateEmail(value) {
  if (value === "") {
    return "И-мэйл хаягаа оруулна уу.";
  }
  if (/\s/.test(value)) {
    return "И-мэйл хаягт зай орох ёсгүй.";
  }
  if (!EMAIL_PATTERN.test(value)) {
    return "И-мэйл нэр@домэйн.өргөтгөл хэлбэртэй байна (жишээ: bat@mail.mn).";
  }
  return "";
}

// Дор хаяж 8 тэмдэгт; хоосон зайгүй; үсэг (кирилл эсвэл латин) ба тоо агуулна.
function validatePassword(value) {
  if (value.length < 8) {
    return "Нууц үг дор хаяж 8 тэмдэгт байна.";
  }
  if (/\s/.test(value)) {
    return "Нууц үгэнд зай орох ёсгүй.";
  }
  if (!/[a-zA-Zа-яА-ЯёЁөӨүҮ]/.test(value)) {
    return "Нууц үгэнд дор хаяж нэг үсэг (кирилл эсвэл латин) орно.";
  }
  if (!/\d/.test(value)) {
    return "Нууц үгэнд дор хаяж нэг тоо орно.";
  }
  return "";
}

// Хоёр захын зайг хасна. 10–500 тэмдэгт.
function validateMessage(value) {
  const message = value.trim();
  if (message.length < 10) {
    return "Санал хүсэлт дор хаяж 10 тэмдэгт байна.";
  }
  if (message.length > 500) {
    return "Санал хүсэлт 500 тэмдэгтээс хэтрэхгүй.";
  }
  return "";
}

if (typeof module !== "undefined") {
  module.exports = { validateName, validateEmail, validatePassword, validateMessage };
}
