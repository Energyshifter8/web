// Даалгавар 2. Алгоритмын 8 функц.
// Бэлэн функц (Math.max, reverse, includes, toLowerCase, reduce ...) хэрэглээгүй,
// зөвхөн for давталт, if нөхцөл, оператор ашигласан.

// 1-ээс n хүртэлх бүхэл тоонуудын нийлбэр. sumTo(5) = 15
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// n! = 1 * 2 * ... * n. factorial(0) = 1, сөрөг тоонд NaN
function factorial(n) {
  if (n < 0) {
    return NaN;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Анхны тоо эсэх. 2-оос √n хүртэл хуваагч хайна.
function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

// 1..n тоонуудын массив: 3-т хуваагдвал "Fizz", 5-д "Buzz", 15-д "FizzBuzz"
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    let item;
    if (i % 15 === 0) {
      item = "FizzBuzz";
    } else if (i % 3 === 0) {
      item = "Fizz";
    } else if (i % 5 === 0) {
      item = "Buzz";
    } else {
      item = i;
    }
    result[result.length] = item;
  }
  return result;
}

// Эгшиг үсгийн тоо. Латин (aeiou) болон кирилл эгшгийг тоолно.
const VOWELS = "aeiouAEIOUаэиоуөүеёюяыАЭИОУӨҮЕЁЮЯЫ";

function isVowel(char) {
  for (let i = 0; i < VOWELS.length; i++) {
    if (VOWELS[i] === char) {
      return true;
    }
  }
  return false;
}

function countVowels(text) {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (isVowel(text[i])) {
      count++;
    }
  }
  return count;
}

// Нэг тэмдэгтийг жижиг үсэг болгоно (тэмдэгтийн кодоор).
function toLowerChar(char) {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) { // A-Z
    return String.fromCharCode(code + 32);
  }
  if (code >= 1040 && code <= 1071) { // А-Я
    return String.fromCharCode(code + 32);
  }
  if (char === "Ё") return "ё";
  if (char === "Ө") return "ө";
  if (char === "Ү") return "ү";
  return char;
}

// Үсэг эсвэл тоо мөн эсэх (зай, цэг таслал зэргийг алгасахад хэрэгтэй).
function isLetterOrDigit(char) {
  const lower = toLowerChar(char);
  return (lower >= "a" && lower <= "z") ||
    (lower >= "а" && lower <= "я") ||
    lower === "ё" || lower === "ө" || lower === "ү" ||
    (char >= "0" && char <= "9");
}

// Урдаас болон хойноос уншихад ижил эсэх. Том/жижиг үсэг, зай, тэмдэгтийг үл тооно.
// isPalindrome("Abba") = true, isPalindrome("A man, a plan, a canal: Panama") = true
function isPalindrome(text) {
  let left = 0;
  let right = text.length - 1;
  while (left < right) {
    if (!isLetterOrDigit(text[left])) {
      left++;
    } else if (!isLetterOrDigit(text[right])) {
      right--;
    } else {
      if (toLowerChar(text[left]) !== toLowerChar(text[right])) {
        return false;
      }
      left++;
      right--;
    }
  }
  return true;
}

// Массивын хамгийн их утга. Хоосон массивт undefined.
function maxOf(numbers) {
  if (numbers.length === 0) {
    return undefined;
  }
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

// Тооны цифрүүдийн нийлбэр. digitSum(1234) = 10, сөрөг тоонд хасах тэмдгийг үл тооно.
function digitSum(n) {
  if (n < 0) {
    n = -n;
  }
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit;
    n = (n - digit) / 10;
  }
  return sum;
}

// Node.js дээр шалгахад (browser-т нөлөөгүй)
if (typeof module !== "undefined") {
  module.exports = { sumTo, factorial, isPrime, fizzBuzz, countVowels, isPalindrome, maxOf, digitSum };
}
