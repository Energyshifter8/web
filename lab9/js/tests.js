// test.html: даалгавар 1-ийн хүснэгт, даалгавар 2, 3-ын функцуудын шалгалт.

// Хүснэгтэд нэг мөр нэмнэ. cells: [{ text, className, code }]
function addRow(tbody, cells) {
  const tr = document.createElement("tr");
  cells.forEach(function (cell) {
    const td = document.createElement("td");
    if (cell.code) {
      const code = document.createElement("code");
      code.textContent = cell.text;
      td.appendChild(code);
    } else {
      td.textContent = cell.text;
    }
    if (cell.className) td.className = cell.className;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
}

// ---------- Даалгавар 1 ----------
function renderExperiment(tableId, rows) {
  const tbody = document.querySelector(tableId + " tbody");
  rows.forEach(function (row) {
    addRow(tbody, [
      { text: row[0], code: true },
      { text: show(row[1]), code: true },
      { text: typeof row[1] }
    ]);
  });
}

renderExperiment("#types-table", typeRows);
renderExperiment("#conversion-table", conversionRows);
renderExperiment("#float-table", floatRows);

// ---------- Даалгавар 2 ----------
// [функцийн нэр, аргумент, хүлээгдэж буй үр дүн]
const algorithmCases = [
  ["sumTo", [5], 15],
  ["sumTo", [100], 5050],
  ["sumTo", [0], 0],
  ["factorial", [0], 1],
  ["factorial", [5], 120],
  ["factorial", [10], 3628800],
  ["isPrime", [1], false],
  ["isPrime", [2], true],
  ["isPrime", [17], true],
  ["isPrime", [21], false],
  ["isPrime", [97], true],
  ["fizzBuzz", [15], [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]],
  ["countVowels", ["JavaScript"], 3],
  ["countVowels", ["Зургийн цомог"], 4],
  ["countVowels", ["xyz"], 0],
  ["isPalindrome", ["Abba"], true],
  ["isPalindrome", ["A man, a plan, a canal: Panama"], true],
  ["isPalindrome", ["Ава"], true],
  ["isPalindrome", ["hello"], false],
  ["maxOf", [[3, 9, -2, 7]], 9],
  ["maxOf", [[-5, -1, -8]], -1],
  ["maxOf", [[]], undefined],
  ["digitSum", [1234], 10],
  ["digitSum", [-907], 16],
  ["digitSum", [0], 0]
];

const algorithmFunctions = { sumTo, factorial, isPrime, fizzBuzz, countVowels, isPalindrome, maxOf, digitSum };

function sameValue(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function argsText(args) {
  return args.map(show).join(", ");
}

function renderSummary(id, passed, total) {
  const box = document.querySelector(id);
  box.textContent = passed + " / " + total + " тест амжилттай.";
  box.className = "summary " + (passed === total ? "pass" : "fail");
}

let algoPassed = 0;
const algoTbody = document.querySelector("#algorithms-table tbody");
const algoLog = [];

algorithmCases.forEach(function (testCase) {
  const name = testCase[0];
  const args = testCase[1];
  const expected = testCase[2];
  const actual = algorithmFunctions[name].apply(null, args);
  const ok = sameValue(actual, expected);
  if (ok) algoPassed++;

  addRow(algoTbody, [
    { text: name + "(" + argsText(args) + ")", code: true },
    { text: show(actual), code: true },
    { text: show(expected), code: true },
    { text: ok ? "✓" : "✗", className: ok ? "pass" : "fail" }
  ]);
  algoLog.push({ "дуудлага": name + "(" + argsText(args) + ")", "үр дүн": show(actual), "зөв": ok });
});

renderSummary("#algorithms-summary", algoPassed, algorithmCases.length);
console.log("Даалгавар 2: algorithms.js");
console.table(algoLog);

// ---------- Даалгавар 3 ----------
// [функц, оролт, зөв байх ёстой эсэх]
const validatorCases = [
  ["validateName", "  Тэмүүлэн  ", true],
  ["validateName", "Bold Temuulen", true],
  ["validateName", "", false],
  ["validateName", "   ", false],
  ["validateName", "Б", false],
  ["validateName", "Бат2", false],
  ["validateName", "А".repeat(51), false],
  ["validateEmail", "bat@mail.mn", true],
  ["validateEmail", "b241910044@must.edu.mn", true],
  ["validateEmail", "", false],
  ["validateEmail", "bat mail@mail.mn", false],
  ["validateEmail", "batmail.mn", false],
  ["validateEmail", "bat@mail", false],
  ["validateEmail", "bat@@mail.mn", false],
  ["validatePassword", "photo2026", true],
  ["validatePassword", "цомог2026", true],
  ["validatePassword", "abc12", false],
  ["validatePassword", "photo 2026", false],
  ["validatePassword", "12345678", false],
  ["validatePassword", "abcdefgh", false],
  ["validateMessage", "Зургууд маш гоё байна.", true],
  ["validateMessage", "   Сайн уу   ", false],
  ["validateMessage", "Гоё", false],
  ["validateMessage", "а".repeat(501), false],
  ["validateMessage", "а".repeat(500), true]
];

const validatorFunctions = { validateName, validateEmail, validatePassword, validateMessage };

// Урт мөрийг хүснэгтэд товчилж харуулна
function shortText(value) {
  if (value.length > 30) {
    return show(value.slice(0, 12) + "…") + " (" + value.length + " тэмдэгт)";
  }
  return show(value);
}

let validPassed = 0;
const validTbody = document.querySelector("#validators-table tbody");

validatorCases.forEach(function (testCase) {
  const name = testCase[0];
  const input = testCase[1];
  const shouldPass = testCase[2];
  const error = validatorFunctions[name](input);
  const ok = (error === "") === shouldPass;
  if (ok) validPassed++;

  addRow(validTbody, [
    { text: name, code: true },
    { text: shortText(input), code: true },
    { text: error === "" ? "зөв" : error },
    { text: ok ? "✓" : "✗", className: ok ? "pass" : "fail" }
  ]);
});

renderSummary("#validators-summary", validPassed, validatorCases.length);
