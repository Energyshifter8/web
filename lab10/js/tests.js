// test.html: даалгавар 1–5 болон нэмэлт даалгаврын шалгалтууд.
// check(бүлэг, тайлбар, бодит, хүлээгдэж буй) — утгыг JSON.stringify-аар харьцуулна.

const results = [];

const show = (value) => {
  if (value === undefined) return 'undefined';
  if (typeof value === 'function') return 'function';
  // NaN-ийг JSON.stringify null болгодог тул 'NaN' гэж үлдээнэ.
  return JSON.stringify(value, (key, v) => (Number.isNaN(v) ? 'NaN' : v)).replaceAll('"NaN"', 'NaN');
};

const check = (group, label, actual, expected) => {
  results.push({ group, label, actual: show(actual), expected: show(expected), ok: show(actual) === show(expected) });
};

// fn алдаа шидэх ёстой.
const checkThrows = (group, label, fn) => {
  let thrown = 'алдаа гараагүй';
  try {
    fn();
  } catch (error) {
    thrown = error.name;
  }
  results.push({ group, label, actual: thrown, expected: 'алдаа', ok: thrown !== 'алдаа гараагүй' });
};

// Алдаа шидсэн бол нэрийг нь буцаана (алдаатай функцийн үр дүнг харуулахад).
const safely = (fn) => {
  try {
    return fn();
  } catch (error) {
    return `${error.name}: ${error.message}`;
  }
};

const photos = () => structuredClone(PHOTOS);
const ids = (list) => list.map((p) => p.id);

// ---------- Даалгавар 1. utils.js ----------
{
  const g = '1. utils.js';
  check(g, 'clamp(15, 0, 10)', clamp(15, 0, 10), 10);
  check(g, 'clamp(-3, 0, 10)', clamp(-3, 0, 10), 0);
  check(g, 'clamp(7, 0, 10)', clamp(7, 0, 10), 7);
  check(g, 'average(2, 4, 9)', average(2, 4, 9), 5);
  check(g, 'average() — аргументгүй', average(), 0);
  check(g, 'greet()', greet(), 'Сайн уу, Зочин!');
  check(g, "greet('Тэмүүлэн')", greet('Тэмүүлэн'), 'Сайн уу, Тэмүүлэн!');

  const counter = makeCounter(5);
  counter.increment();
  counter.increment();
  counter.decrement();
  check(g, 'makeCounter(5): +1 +1 -1', counter.value(), 6);
  const other = makeCounter();
  other.increment();
  check(g, 'хоёр тоолуур бие даасан (closure)', [counter.value(), other.value()], [6, 1]);

  check(g, 'applyN(x => x * 2, 3, 1)', applyN((x) => x * 2, 3, 1), 8);
  check(g, 'applyN(fn, 0, 7)', applyN((x) => x + 1, 0, 7), 7);
  const addOne = (x) => x + 1;
  const double = (x) => x * 2;
  check(g, 'compose(addOne, double)(5) = addOne(double(5))', compose(addOne, double)(5), 11);
  check(g, 'compose(double, addOne)(5) = double(addOne(5))', compose(double, addOne)(5), 12);
  check(g, 'бүгд arrow функц (prototype байхгүй)',
    [clamp, average, greet, makeCounter, applyN, compose].every((fn) => fn.prototype === undefined), true);
}

// ---------- Даалгавар 2. photoTools.js ----------
{
  const g = '2. photoTools.js';
  const input = photos();
  const snapshot = JSON.stringify(input);

  check(g, "filterByPlace(photos, 'Уул')", ids(filterByPlace(input, 'Уул')), [2, 3]);
  check(g, "filterByPlace(photos, 'all')", ids(filterByPlace(input, 'all')), [1, 2, 3, 4, 5, 6]);
  check(g, "searchByTitle(photos, '  УУЛ ')", ids(searchByTitle(input, '  УУЛ ')), [2, 3]);
  check(g, "filterByTag(photos, 'ус')", ids(filterByTag(input, 'ус')), [1, 4, 5]);
  check(g, 'sortByLikes(photos)', ids(sortByLikes(input)), [3, 1, 4, 6, 2, 5]);
  check(g, "sortByLikes(photos, 'asc')", ids(sortByLikes(input, 'asc')), [5, 2, 6, 4, 1, 3]);
  check(g, 'sortByDate(photos)', ids(sortByDate(input)), [3, 4, 1, 2, 6, 5]);
  check(g, 'topLiked(photos, 2)', ids(topLiked(input, 2)), [3, 1]);
  check(g, 'getTitles(photos).slice(0, 2)', getTitles(input).slice(0, 2), ['Усан булан', 'Уулын зам']);
  check(g, 'uniqueTags(photos).length', uniqueTags(input).length, 13);
  check(g, 'totalLikes(photos)', totalLikes(input), 184);
  check(g, 'оролтын массив өөрчлөгдөөгүй', JSON.stringify(input) === snapshot, true);
  check(g, 'шинэ массив буцаана (=== биш)', filterByPlace(input, 'all') !== input, true);
  check(g, 'for/while давталт хэрэглээгүй',
    [filterByPlace, searchByTitle, filterByTag, sortByLikes, sortByDate, topLiked, getTitles, uniqueTags]
      .some((fn) => /\b(for|while)\s*\(/.test(fn.toString())), false);
}

// ---------- Даалгавар 3. objectTools.js ----------
{
  const g = '3. objectTools.js';
  const photo = photos()[0];
  const snapshot = JSON.stringify(photo);

  check(g, "pick(photo, 'id', 'title')", pick(photo, 'id', 'title'), { id: 1, title: 'Усан булан' });
  check(g, "omit(photo, 'src', 'alt', 'credit', 'tags')", omit(photo, 'src', 'alt', 'credit', 'tags'),
    { id: 1, title: 'Усан булан', place: 'Далай', date: '2026-06-14', likes: 42 });
  check(g, 'updatePhoto(photo, { likes: 0 }).likes', updatePhoto(photo, { likes: 0 }).likes, 0);
  check(g, 'likePhoto(photo).likes', likePhoto(photo).likes, 43);
  check(g, "addTag(photo, 'шинэ').tags", addTag(photo, 'шинэ').tags, ['ус', 'хад', 'зун', 'шинэ']);
  check(g, "addTag(photo, 'ус') — давхар нэмэхгүй", addTag(photo, 'ус').tags, ['ус', 'хад', 'зун']);
  check(g, "removeTag(photo, 'хад').tags", removeTag(photo, 'хад').tags, ['ус', 'зун']);
  check(g, 'describePhoto(photo)', describePhoto(photo), 'Усан булан (Далай) — 42 like, 2026-06-14');
  check(g, "describePhoto({ title: 'Тест' }) — анхдагч утга", describePhoto({ title: 'Тест' }),
    'Тест (Тодорхойгүй) — 0 like');
  check(g, "withDefaults({ title: 'Шинэ' })", withDefaults({ title: 'Шинэ' }),
    { title: 'Шинэ', place: 'Тодорхойгүй', date: '', likes: 0, tags: [] });
  check(g, 'addTag-ийн tags шинэ массив', addTag(photo, 'шинэ').tags !== photo.tags, true);
  check(g, 'оролтын объект өөрчлөгдөөгүй', JSON.stringify(photo) === snapshot, true);
}

// ---------- Даалгавар 4. class Album ----------
{
  const g = '4. class Album';
  const album = new Album(photos());

  check(g, 'size', album.size, 6);
  check(g, 'find(3).title', album.find(3).title, 'Цастай уул');
  check(g, 'find(99)', album.find(99), undefined);

  const copy = album.photos;
  copy[0].title = 'Өөрчилсөн';
  copy[0].tags.push('хакер');
  copy.pop();
  check(g, 'photos нь ГҮН хуулбар (гаднаас өөрчлөгдөхгүй)',
    [album.size, album.find(1).title, album.find(1).tags.length], [6, 'Усан булан', 3]);
  const found = album.find(1);
  found.likes = 9999;
  check(g, 'find() ч хуулбар буцаана', album.find(1).likes, 42);
  check(g, 'Object.keys(album) — private талбар харагдахгүй', Object.keys(album), []);
  checkThrows(g, 'album.#photos гаднаас бичвэл SyntaxError', () => new Function('a', 'return a.#photos'));
  album.photos = [];
  check(g, 'album.photos = [] нөлөөгүй (setter байхгүй)', album.size, 6);

  const added = album.add({ title: 'Шинэ зураг', place: 'Тал', date: '2026-11-01' });
  check(g, 'add: id = хамгийн их id + 1', added.id, 7);
  check(g, 'add: likes = 0, tags = []', [added.likes, added.tags], [0, []]);
  check(g, 'add: өгсөн id хадгалагдана', album.add({ id: 20, title: 'Id-тай' }).id, 20);
  check(g, 'add: дараагийнх нь 21', album.add({ title: 'Дараагийнх' }).id, 21);
  checkThrows(g, 'add: давхардсан id алдаа шиднэ', () => album.add({ id: 1, title: 'Давхар' }));

  check(g, 'like(2) → шинэ тоо', album.like(2), 19);
  check(g, 'like(99) → null', album.like(99), null);
  check(g, 'remove(20)', album.remove(20), true);
  check(g, 'remove(20) дахин', album.remove(20), false);

  const json = JSON.stringify(album);
  const restored = Album.from(json);
  check(g, 'JSON.stringify(album) → Album.from(json)', [restored.size, restored.find(2).likes], [album.size, 19]);
  check(g, 'from(массив) ч ажиллана', Album.from(photos()).size, 6);
  checkThrows(g, "Album.from('{}') алдаа", () => Album.from('{}'));
}

// ---------- Даалгавар 5. bugs.js ----------
{
  const g = '5. bugs.js';
  const input = photos();
  const before = (fn) => safely(fn);

  check(g, 'sumLikes — засахаас өмнө', before(() => buggy.sumLikes(input)), 184);
  check(g, 'sumLikes — засварын дараа', sumLikes(input), 184);
  check(g, 'sumLikes([]) — засварын дараа', sumLikes([]), 0);

  check(g, 'sortLikesDesc — засахаас өмнө', before(() => buggy.sortLikesDesc([5, 40, 120, 9])), [120, 40, 9, 5]);
  check(g, 'sortLikesDesc — засварын дараа', sortLikesDesc([5, 40, 120, 9]), [120, 40, 9, 5]);

  check(g, 'countByPlace — засахаас өмнө', before(() => buggy.countByPlace(input)), { 'Далай': 2, 'Уул': 2, 'Ой': 2 });
  check(g, 'countByPlace — засварын дараа', countByPlace(input), { 'Далай': 2, 'Уул': 2, 'Ой': 2 });
}

// ---------- Нэмэлт: FeaturedAlbum, groupByPlace, validateDate ----------
{
  const g = '6. Нэмэлт даалгавар';
  const featured = new FeaturedAlbum(photos());

  check(g, 'FeaturedAlbum instanceof Album', featured instanceof Album, true);
  check(g, 'featured — like олон 3 зураг', featured.featured, [3, 1, 4]);
  check(g, 'photos-д featured талбар нэмэгдэнэ', featured.photos.filter((p) => p.featured).length, 3);

  Array.from({ length: 30 }).forEach(() => featured.like(5));
  check(g, 'like(5) × 30 → 5 онцлох болно', featured.featured, [3, 1, 5]);
  featured.remove(3);
  check(g, 'remove(3) → жагсаалт шинэчлэгдэнэ', featured.featured, [1, 5, 4]);
  check(g, 'FeaturedAlbum.from() → FeaturedAlbum', FeaturedAlbum.from(JSON.stringify(featured)) instanceof FeaturedAlbum, true);
  check(g, 'toJSON-д featured талбар орохгүй', JSON.stringify(featured).includes('featured'), false);
  check(g, 'like-гүй цомогт онцлох алга', new FeaturedAlbum([{ title: 'А' }, { title: 'Б' }]).featured, []);

  const groups = groupByPlace(photos());
  check(g, 'groupByPlace — бүлгийн нэрс', Object.keys(groups), ['Далай', 'Уул', 'Ой']);
  check(g, "groupByPlace — 'Ой' бүлэг", ids(groups['Ой']), [4, 5]);
  check(g, 'Object.groupBy хөтөчид байгаа эсэх', typeof Object.groupBy, 'function');

  const today = new Date(2026, 10, 12);
  check(g, "validateDate('2026-11-12')", validateDate('2026-11-12', today), '');
  check(g, "validateDate('') — хоосон", validateDate('', today) !== '', true);
  check(g, "validateDate('2026-11-13') — ирээдүй", validateDate('2026-11-13', today) !== '', true);
  check(g, "validateName('Уул 2') — лаб 9-ийн validator", validateName('Уул 2') !== '', true);
}

// ---------- Өөрийн 5 шинэ тест ----------
{
  const g = '7. Өөрийн 5 шинэ тест';

  // 1. Хоосон массив: функцууд алдаа шидэхгүй, хоосон/тэг утга буцаана.
  check(g, '1. Хоосон массив: sortByLikes, topLiked, uniqueTags, totalLikes, average',
    [sortByLikes([]), topLiked([]), uniqueTags([]), totalLikes([]), average(...[])], [[], [], [], 0, 0]);

  // 2. Хоосон цомог: эхний зураг id = 1 авна.
  const empty = new Album();
  check(g, '2. Хоосон цомог: size = 0, add → id = 1', [empty.size, empty.add({ title: 'Анхны' }).id], [0, 1]);

  // 3. Давхардсан like: нэг зурагт хоёр удаа like дарахад 2 нэмэгдэнэ, бусад нь өөрчлөгдөхгүй.
  const album = new Album(photos());
  album.like(4);
  album.like(4);
  check(g, '3. Давхардсан like: like(4) × 2 → 35, бусад хэвээр',
    [album.find(4).likes, totalLikes(album.photos)], [35, 186]);

  // 4. Зөвхөн зай бүхий хайлт: шүүлтгүй, бүх зураг.
  check(g, "4. Зөвхөн зай бүхий хайлт '   ' → бүх 6 зураг", searchByTitle(photos(), '   ').length, 6);

  // 5. Олдохгүй хайлт ба байхгүй газар: хоосон массив.
  check(g, "5. searchByTitle('xyz'), filterByPlace('Сар')",
    [searchByTitle(photos(), 'xyz'), filterByPlace(photos(), 'Сар')], [[], []]);
}

// ---------- Үр дүнг харуулах ----------

const output = document.querySelector('#test-results');
const groupNames = [...new Set(results.map((r) => r.group))];

groupNames.forEach((name) => {
  const rows = results.filter((r) => r.group === name);
  const passed = rows.filter((r) => r.ok).length;
  // Даалгавар 5-ын «засахаас өмнө» мөрүүд санаатайгаар унана.
  const expectedFails = rows.filter((r) => r.label.includes('засахаас өмнө')).length;

  const heading = document.createElement('h3');
  heading.className = 'test-group';
  heading.textContent = name;

  const summary = document.createElement('p');
  const allGood = passed + expectedFails === rows.length;
  summary.className = 'summary ' + (allGood ? 'pass' : 'fail');
  summary.textContent = `${passed} / ${rows.length} тест амжилттай` +
    (expectedFails ? ` (${expectedFails} нь засахаас өмнөх алдаатай хувилбар — санаатайгаар унана)` : '');

  const wrap = document.createElement('div');
  wrap.className = 'table-wrap';
  const table = document.createElement('table');
  table.className = 'result-table';
  table.innerHTML = '<thead><tr><th scope="col">Шалгалт</th><th scope="col">Үр дүн</th>' +
    '<th scope="col">Хүлээгдэж буй</th><th scope="col"></th></tr></thead>';
  const tbody = document.createElement('tbody');

  rows.forEach((row) => {
    const tr = document.createElement('tr');
    [row.label, row.actual, row.expected].forEach((text, i) => {
      const td = document.createElement('td');
      if (i === 0) {
        td.textContent = text;
      } else {
        const code = document.createElement('code');
        code.textContent = text.length > 80 ? text.slice(0, 77) + '…' : text;
        td.append(code);
      }
      tr.append(td);
    });
    const status = document.createElement('td');
    status.className = row.ok ? 'pass' : 'fail';
    status.textContent = row.ok ? '✓' : '✗';
    tr.append(status);
    tbody.append(tr);
  });

  table.append(tbody);
  wrap.append(table);
  output.append(heading, summary, wrap);
  console.log(name);
  console.table(rows.map(({ label, actual, ok }) => ({ label, actual, ok })));
});

const totalPassed = results.filter((r) => r.ok).length;
const intended = results.filter((r) => !r.ok && r.label.includes('засахаас өмнө')).length;
const totalBox = document.querySelector('#total-summary');
totalBox.className = 'summary ' + (totalPassed + intended === results.length ? 'pass' : 'fail');
totalBox.textContent = `Нийт: ${totalPassed} / ${results.length} тест амжилттай, ` +
  `${intended} нь засахаас өмнөх алдаатай хувилбар (санаатайгаар унасан).`;
