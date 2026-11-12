// Даалгавар 2. Массивын аргууд.
// for, while давталт хэрэглээгүй: filter, map, flatMap, reduce, toSorted, slice.
// Функц бүр оролтын массивыг өөрчлөхгүй, ШИНЭ массив буцаана.
// (sort() оролтын массивыг өөрчилдөг тул оронд нь toSorted() хэрэглэсэн.)

// Зургийн бүтэц: { id, title, place, date: 'YYYY-MM-DD', likes, tags: [], src, alt, credit }

// 1. Газраар шүүнэ. place хоосон эсвэл 'all' бол бүх зургийн шинэ массив.
const filterByPlace = (photos, place) =>
  !place || place === 'all' ? [...photos] : photos.filter((p) => p.place === place);

// 2. Нэрээр хайна. Том/жижиг үсэг ялгахгүй, хоёр захын зайг хасна.
//    Хоосон эсвэл зөвхөн зай бүхий хайлт бүх зургийг буцаана.
const searchByTitle = (photos, query = '') => {
  const q = query.trim().toLowerCase();
  return q === '' ? [...photos] : photos.filter((p) => p.title.toLowerCase().includes(q));
};

// 3. Шошгоор шүүнэ.
const filterByTag = (photos, tag) => photos.filter((p) => p.tags.includes(tag));

// 4. Like-ийн тоогоор эрэмбэлнэ. Тэнцүү бол id-аар.
const sortByLikes = (photos, order = 'desc') =>
  photos.toSorted((a, b) => (order === 'asc' ? a.likes - b.likes : b.likes - a.likes) || a.id - b.id);

// 5. Огноогоор эрэмбэлнэ. 'YYYY-MM-DD' мөрийг шууд харьцуулж болно.
const sortByDate = (photos, order = 'asc') =>
  photos.toSorted((a, b) =>
    order === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
  );

// 6. Хамгийн их like-тай n зураг.
const topLiked = (photos, n = 3) => sortByLikes(photos).slice(0, n);

// 7. Зөвхөн нэрсийн массив.
const getTitles = (photos) => photos.map((p) => p.title);

// 8. Бүх шошгыг давхардалгүй, цагаан толгойн дарааллаар.
const uniqueTags = (photos) =>
  [...new Set(photos.flatMap((p) => p.tags))].toSorted((a, b) => a.localeCompare(b));

// ---- Туслах функцууд ----

// Нийт like (массив биш, тоо буцаана).
const totalLikes = (photos) => photos.reduce((sum, p) => sum + p.likes, 0);

// Давхардаагүй газрын нэрс (шүүлтүүрийн select-д).
const uniquePlaces = (photos) => [...new Set(photos.map((p) => p.place))];

// Нэмэлт даалгавар: газраар бүлэглэх. { 'Уул': [...], 'Далай': [...] }
// Object.groupBy нь шинэ (2024) функц тул байхгүй хөтөч дээр reduce-ээр орлуулна.
const groupByPlace = (photos) =>
  typeof Object.groupBy === 'function'
    ? Object.groupBy(photos, (p) => p.place)
    : photos.reduce((groups, p) => ({ ...groups, [p.place]: [...(groups[p.place] ?? []), p] }), {});

if (typeof module !== 'undefined') {
  module.exports = {
    filterByPlace, searchByTitle, filterByTag, sortByLikes, sortByDate, topLiked, getTitles,
    uniqueTags, totalLikes, uniquePlaces, groupByPlace
  };
}
