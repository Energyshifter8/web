# Лаб 10. Функц, массив, объект, class: цомгийн өгөгдөл боловсруулах

Лаб 9-ийн зургийн цомгийг JavaScript өгөгдлөөс (`class Album`) үүсгэдэг болгосон.

```
lab10/
├── index.html          # цомог: шүүлтүүр, like, устгах, зураг нэмэх form
├── test.html           # бүх даалгаврын тест (87 шалгалт)
├── css/style.css       # лаб 9-ийн загвар + шүүлтүүр, карт
├── img/
└── js/
    ├── data.js         # анхны 6 зураг
    ├── utils.js        # даалгавар 1: 6 arrow функц
    ├── photoTools.js   # даалгавар 2: массивын 8 функц + groupByPlace
    ├── objectTools.js  # даалгавар 3: объектын 8 функц
    ├── album.js        # даалгавар 4: class Album, нэмэлт: class FeaturedAlbum
    ├── app.js          # даалгавар 4: currentList, like, шүүлтүүр, нэмэх form
    ├── bugs.js         # даалгавар 5: 3 алдаа, засвар
    ├── validators.js   # лаб 9-ийн validator + validateDate
    ├── theme.js        # харанхуй горим
    └── tests.js        # test.html-ийн шалгалтууд
```

## Даалгавар 1. utils.js

Бүгд arrow функц: `clamp`, `average(...nums)` (rest), `greet(name = 'Зочин')` (анхдагч утга),
`makeCounter(start = 0)` (closure), `applyN(fn, n, x)` (рекурс), `compose(f, g)`.

## Даалгавар 2. photoTools.js

`filterByPlace`, `searchByTitle`, `filterByTag`, `sortByLikes`, `sortByDate`, `topLiked`, `getTitles`, `uniqueTags`.
`for`, `while` хэрэглээгүй (`filter`, `map`, `flatMap`, `toSorted`, `slice`, `Set`).
`sort()` оролтын массивыг өөрчилдөг тул `toSorted()` хэрэглэсэн. Тест: оролтын массив өөрчлөгдөөгүй.

## Даалгавар 3. objectTools.js

`pick(obj, ...keys)`, `omit` (`const { [key]: _, ...rest } = obj`), `updatePhoto`, `likePhoto`,
`addTag`, `removeTag`, `describePhoto({ title, place = ..., ...rest })`, `withDefaults`.
Бүгд spread-ээр шинэ объект буцаана.

## Даалгавар 4. class Album

| Гишүүн | Тайлбар |
|---|---|
| `#photos` | private талбар. `album.#photos` гэж бичвэл SyntaxError |
| `size` | getter |
| `photos` | getter, `structuredClone` ГҮН хуулбар. Setter байхгүй тул `album.photos = []` нөлөөгүй |
| `find(id)` | хуулбар эсвэл `undefined` |
| `add(photo)` | id байхгүй бол хамгийн их id + 1, `likes = 0`, `tags = []`. Давхардсан id → алдаа |
| `remove(id)` | `true` / `false` |
| `like(id)` | шинэ like-ийн тоо, байхгүй id → `null` |
| `toJSON()` | `JSON.stringify(album)` автоматаар дуудна |
| `static from(json)` | JSON мөр эсвэл массиваас. `new this(...)` тул удамшсан класст ч ажиллана |

`app.js`: `currentList()` нь `album.photos` дээр газар → хайлт → эрэмбийг `compose`-оор хэрэглэнэ.
Like/устгах товчинд event delegation (жагсаалт дээр нэг listener + `closest()`).
Шүүлтүүрийн form-ын `input` event. `makeCard`, `renderCards` нь бэлэн функц.
Цомгийг `localStorage`-д JSON-оор хадгалж, `FeaturedAlbum.from()`-оор сэргээнэ.

## Даалгавар 5. bugs.js

| Функц | Шинж тэмдэг | Шалтгаан | Засвар |
|---|---|---|---|
| `sumLikes` | `"[object Object]185733925"` | `reduce`-д эхлэх утга алга → эхний объект `sum` болсон | `reduce(..., 0)` |
| `sortLikesDesc` | `[9, 5, 40, 120]` | `sort()` тоог мөрөөр харьцуулна (`'120' < '40' < '5'`) | `toSorted((a, b) => b - a)` |
| `countByPlace` | `{ Уул: NaN, ... }` | `undefined + 1 = NaN` | `(counts[place] ?? 0) + 1` |

`reduce`-ийн callback-д `console.log(sum, p)`, `sort()`-ийн дараа DevTools breakpoint тавьж олсон.
Анхны алдаатай хувилбар `buggy` объектод байгаа тул test.html дээр өмнө/дараах үр дүн харагдана.

## Нэмэлт даалгавар

- **FeaturedAlbum extends Album**: `super(photos)`, `super.add/remove/like`, `super.photos`.
  Өөрчлөлт бүрийн дараа like олон 3 зургийг (like > 0) онцлох болгоно. Картанд ★ тэмдэг.
  Album-ийн constructor `add()`-ийг дууддаггүй: дуудвал FeaturedAlbum-ийн `#featured` хараахан үүсээгүй байх тул алдаа гарна.
- **groupByPlace**: `Object.groupBy(photos, (p) => p.place)`, байхгүй хөтөчид `reduce`.
- **Зураг нэмэх form**: лаб 9-ийн `validateName` (нэр, газар) + шинэ `validateDate`, `album.add()`.
- **5 шинэ тест**: хоосон массив, хоосон цомог, давхардсан like, зөвхөн зай бүхий хайлт, олдохгүй хайлт.

### Хөтчийн дэмжлэг (caniuse.com)

| Функц | Chrome | Edge | Firefox | Safari | Node |
|---|---|---|---|---|---|
| `Object.groupBy()` | 117 | 117 | 119 | 17.4 | 21 |
| `Array.prototype.toSorted()` | 110 | 110 | 115 | 16 | 20 |
| `structuredClone()` | 98 | 98 | 94 | 15.4 | 17 |
| private `#field` | 74 | 79 | 90 | 14.1 | 12 |

`Object.groupBy` 2024 оны 3-р сараас бүх үндсэн хөтчид дэмжигдсэн (Baseline 2024), хуучин хөтчид
дэмжихгүй тул `typeof Object.groupBy === 'function'` шалгаад `reduce`-ээр орлуулсан.

## Шалгалт

`test.html`: 87 шалгалтаас 84 амжилттай. Үлдсэн 3 нь `bugs.js`-ийн засахаас өмнөх алдаатай
хувилбар тул санаатайгаар унана. Console (F12) дээр `console.table` гарна.
