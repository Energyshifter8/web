// Даалгавар 3. Объектын найман функц.
// Spread (...obj), destructuring ({ a, b } = obj), rest (...rest) хэрэглэсэн.
// Оролтын объект, массивыг өөрчлөхгүй: үргэлж шинэ объект буцаана.

// Шинэ зурагт өгөх анхдагч утгууд.
const PHOTO_DEFAULTS = { title: 'Нэргүй', place: 'Тодорхойгүй', date: '', likes: 0, tags: [] };

// 1. Зөвхөн заасан түлхүүрүүдийг авна (rest параметр). pick(p, 'id', 'title')
const pick = (obj, ...keys) =>
  Object.fromEntries(keys.filter((key) => key in obj).map((key) => [key, obj[key]]));

// 2. Заасан түлхүүрүүдийг хасна. Тооцоолсон нэртэй destructuring + rest:
//    const { [key]: _, ...rest } = acc  -> rest-д key-ээс бусад бүх талбар үлдэнэ.
const omit = (obj, ...keys) =>
  keys.reduce((acc, key) => {
    const { [key]: _removed, ...rest } = acc;
    return rest;
  }, obj);

// 3. Зарим талбарыг шинэчилсэн хуулбар. Хойно бичсэн spread давуу эрхтэй.
const updatePhoto = (photo, changes) => ({ ...photo, ...changes });

// 4. Like нэгээр нэмэгдсэн хуулбар.
const likePhoto = (photo) => ({ ...photo, likes: photo.likes + 1 });

// 5. Шошго нэмнэ. Аль хэдийн байвал давхар нэмэхгүй. tags массивыг ч шинээр үүсгэнэ.
const addTag = (photo, tag) => ({
  ...photo,
  tags: photo.tags.includes(tag) ? [...photo.tags] : [...photo.tags, tag]
});

// 6. Шошго хасна.
const removeTag = (photo, tag) => ({ ...photo, tags: photo.tags.filter((t) => t !== tag) });

// 7. Параметрт destructuring + анхдагч утга. Үлдсэн талбарууд rest-д орно.
const describePhoto = ({ title, place = 'Тодорхойгүй', likes = 0, ...rest }) =>
  `${title} (${place}) — ${likes} like` + (rest.date ? `, ${rest.date}` : '');

// 8. Дутуу талбарыг анхдагч утгаар нөхнө. tags-ийг шинэ массив болгож хуулна.
const withDefaults = (photo) => {
  const { tags = [], ...rest } = photo;
  return { ...PHOTO_DEFAULTS, ...rest, tags: [...tags] };
};

if (typeof module !== 'undefined') {
  module.exports = {
    PHOTO_DEFAULTS, pick, omit, updatePhoto, likePhoto, addTag, removeTag, describePhoto, withDefaults
  };
}
