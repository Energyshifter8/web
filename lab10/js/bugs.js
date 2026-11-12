// Даалгавар 5. Алдаа олох.
// Гурван функц тус бүр нэг алдаатай байсан. Анхны (алдаатай) хувилбарыг buggy объектод
// үлдээсэн тул test.html дээр засахаас өмнө/дараах үр дүнг харьцуулж харна.
// Алдааг console.log болон DevTools (Sources → breakpoint) ашиглан олсон.

const buggy = {
  // Алдаа 1: reduce-д эхлэх утга өгөөгүй.
  sumLikes: (photos) => photos.reduce((sum, p) => sum + p.likes),

  // Алдаа 2: sort()-д харьцуулах функц өгөөгүй.
  sortLikesDesc: (likes) => [...likes].sort().reverse(),

  // Алдаа 3: counts[place] эхлээд undefined.
  countByPlace: (photos) =>
    photos.reduce((counts, p) => {
      counts[p.place]++;
      return counts;
    }, {})
};

// 1. Нийт like.
//    Шинж тэмдэг: sumLikes(photos) → "[object Object]1530..." гэсэн мөр гарсан.
//    Олсон нь: reduce-ийн callback дотор console.log(sum, p) → эхний дуудлагад sum нь
//    тоо биш, массивын эхний ОБЪЕКТ байв. Эхлэх утгагүй үед reduce нь эхний элементийг
//    sum болгож авдаг, объект + тоо → мөр нийлүүлэлт. Хоосон массив дээр TypeError шиддэг.
//    Засвар: эхлэх утга 0 өгөх.
const sumLikes = (photos) => photos.reduce((sum, p) => sum + p.likes, 0);

// 2. Like-ийн тоог ихээс бага руу эрэмбэлэх.
//    Шинж тэмдэг: [5, 40, 120, 9] → [9, 5, 40, 120] гэж гарсан.
//    Олсон нь: sort()-ийн дараа breakpoint тавьж харахад [120, 40, 5, 9] —
//    тоонуудыг МӨР болгож ('120' < '40' < '5' < '9') харьцуулж байв.
//    Засвар: (a, b) => b - a харьцуулах функц, мөн оролтыг өөрчлөхгүй toSorted.
const sortLikesDesc = (likes) => likes.toSorted((a, b) => b - a);

// 3. Газар бүрт хэдэн зураг байгааг тоолох.
//    Шинж тэмдэг: { 'Уул': NaN, 'Далай': NaN }.
//    Олсон нь: console.log(counts[p.place]) → эхний удаа undefined. undefined + 1 = NaN,
//    NaN + 1 = NaN хэвээр.
//    Засвар: ?? 0-ээр эхлүүлэх; мөн spread-ээр шинэ объект буцаах.
const countByPlace = (photos) =>
  photos.reduce((counts, p) => ({ ...counts, [p.place]: (counts[p.place] ?? 0) + 1 }), {});

if (typeof module !== 'undefined') {
  module.exports = { buggy, sumLikes, sortLikesDesc, countByPlace };
}
