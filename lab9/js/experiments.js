// Даалгавар 1. Хувьсагч, төрөл, хөрвүүлэлтийн жижиг туршилт.
// Үр дүнг console.table-аар хэвлэж, test.html хуудсанд хүснэгтээр харуулна.

// --- Хувьсагч: let өөрчлөгдөнө, const өөрчлөгдөхгүй ---
let age = 20;
age = age + 1;
const studentName = "Тэмүүлэн";
const isStudent = true;
let notAssigned;
const empty = null;
const photo = { title: "Усан булан", likes: 12 };
const tags = ["уул", "ус", "ой"];
const big = 9007199254740993n;
const id = Symbol("id");
function greet() {
  return "Сайн уу";
}

// [илэрхийлэл, утга] хосууд
const typeRows = [
  ["age", age],
  ["studentName", studentName],
  ["isStudent", isStudent],
  ["notAssigned", notAssigned],
  ["empty (null)", empty],
  ["photo", photo],
  ["tags", tags],
  ["greet", greet],
  ["big", big],
  ["id", id],
  ["NaN", NaN]
];

const conversionRows = [
  ['"5" + 3', "5" + 3],
  ['"5" - 3', "5" - 3],
  ['"5" * "2"', "5" * "2"],
  ["true + 1", true + 1],
  ["null + 1", null + 1],
  ["undefined + 1", undefined + 1],
  ['Number("42")', Number("42")],
  ['Number("12px")', Number("12px")],
  ['parseInt("12px")', parseInt("12px", 10)],
  ['Number("")', Number("")],
  ["String(123)", String(123)],
  ['Boolean("0")', Boolean("0")],
  ['Boolean("")', Boolean("")],
  ["Boolean(0)", Boolean(0)],
  ['"5" == 5', "5" == 5],
  ['"5" === 5', "5" === 5],
  ["null == undefined", null == undefined],
  ["null === undefined", null === undefined]
];

const floatRows = [
  ["0.1 + 0.2", 0.1 + 0.2],
  ["0.1 + 0.2 === 0.3", 0.1 + 0.2 === 0.3],
  ["(0.1 + 0.2).toFixed(2)", (0.1 + 0.2).toFixed(2)],
  ["Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON", Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON],
  ["(0.1 * 10 + 0.2 * 10) / 10", (0.1 * 10 + 0.2 * 10) / 10]
];

// Утгыг уншигдахуйц текст болгоно ("53" мөрийг 53 тооноос ялгахын тулд хашилт нэмнэ)
function show(value) {
  if (typeof value === "string") return '"' + value + '"';
  if (typeof value === "bigint") return value + "n";
  if (typeof value === "symbol" || typeof value === "function") return value.toString();
  if (Array.isArray(value) || (value !== null && typeof value === "object")) return JSON.stringify(value);
  return String(value);
}

function toTableData(rows) {
  return rows.map(function (row) {
    return { "илэрхийлэл": row[0], "утга": show(row[1]), "typeof": typeof row[1] };
  });
}

console.log("Даалгавар 1: typeof");
console.table(toTableData(typeRows));
console.log("Даалгавар 1: төрөл хөрвүүлэлт");
console.table(toTableData(conversionRows));
console.log("Даалгавар 1: 0.1 + 0.2");
console.table(toTableData(floatRows));
