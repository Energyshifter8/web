// Даалгавар 4. Цомгийн хуудас: currentList(), like, шүүлтүүр, нэмэх form.
// data.js, utils.js, photoTools.js, objectTools.js, album.js, validators.js-ийн дараа ачаална.

const STORAGE_KEY = 'lab10-album';

const gallery = document.querySelector('#gallery-list');
const filtersForm = document.querySelector('#filters');
const placeSelect = document.querySelector('#filter-place');
const statsBox = document.querySelector('#stats');
const groupsBox = document.querySelector('#groups');
const addForm = document.querySelector('#add-form');
const addStatus = document.querySelector('#add-status');
const placeOptions = document.querySelector('#place-options');
const resetButton = document.querySelector('#reset-album');

// ---------- Бэлэн функцууд (өөрчлөхгүй) ----------

// Нэг зургийн карт. Хэрэглэгчийн оруулсан текстийг textContent-оор тавина (HTML биш).
function makeCard(photo) {
  const item = document.createElement('li');
  item.className = 'gallery-item';

  const card = document.createElement('figure');
  card.className = 'gallery-card' + (photo.featured ? ' is-featured' : '');

  if (photo.src) {
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt || photo.title;
    img.width = 800;
    img.height = 600;
    img.loading = 'lazy';
    card.append(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'photo-placeholder';
    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.textContent = photo.title.charAt(0);
    card.append(placeholder);
  }

  if (photo.featured) {
    const badge = document.createElement('span');
    badge.className = 'featured-badge';
    badge.textContent = '★ Онцлох';
    card.append(badge);
  }

  const caption = document.createElement('figcaption');
  caption.className = 'gallery-caption';

  const title = document.createElement('strong');
  title.textContent = photo.title;

  const meta = document.createElement('span');
  meta.className = 'credit';
  meta.textContent = `${photo.place} · ${photo.date}` + (photo.credit ? ` · Зураг: ${photo.credit}` : '');

  const tags = document.createElement('ul');
  tags.className = 'tag-list';
  photo.tags.forEach((tag) => {
    const li = document.createElement('li');
    li.className = 'tag';
    li.textContent = '#' + tag;
    tags.append(li);
  });

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const likeButton = document.createElement('button');
  likeButton.type = 'button';
  likeButton.className = 'like-button';
  likeButton.dataset.id = photo.id;
  likeButton.setAttribute('aria-label', `«${photo.title}» зурагт like дарах, одоо ${photo.likes}`);
  likeButton.textContent = `♥ ${photo.likes}`;

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-button';
  removeButton.dataset.id = photo.id;
  removeButton.setAttribute('aria-label', `«${photo.title}» зургийг устгах`);
  removeButton.textContent = 'Устгах';

  actions.append(likeButton, removeButton);
  caption.append(title, meta, tags, actions);
  card.append(caption);
  item.append(card);
  return item;
}

function renderCards(list) {
  gallery.replaceChildren(...list.map(makeCard));
  if (list.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'gallery-empty';
    empty.textContent = 'Шүүлтүүрт тохирох зураг алга.';
    gallery.append(empty);
  }
}

// ---------- Цомог ----------

// localStorage-д хадгалсан цомгийг (JSON) уншина, байхгүй бол анхны өгөгдөл.
const loadAlbum = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return FeaturedAlbum.from(saved);
    }
  } catch (error) {
    console.warn('Хадгалсан цомгийг уншиж чадсангүй:', error);
  }
  return new FeaturedAlbum(PHOTOS);
};

let album = loadAlbum();

// JSON.stringify нь album.toJSON()-ийг дуудна.
const saveAlbum = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(album));
  } catch (error) {
    console.warn('Цомгийг хадгалж чадсангүй:', error);
  }
};

// ---------- currentList ----------

const SORTERS = {
  'likes-desc': (list) => sortByLikes(list, 'desc'),
  'likes-asc': (list) => sortByLikes(list, 'asc'),
  'date-desc': (list) => sortByDate(list, 'desc'),
  'date-asc': (list) => sortByDate(list, 'asc'),
  featured: (list) => sortByLikes(list.filter((p) => p.featured))
};

// Form-оос шүүлтүүрийн утгуудыг destructuring-ээр авна.
const readFilters = () => {
  const { search, place, sort } = Object.fromEntries(new FormData(filtersForm));
  return { search, place, sort };
};

// Цомгийн хуулбар дээр газар → хайлт → эрэмбэ гэсэн дарааллаар хэрэглэнэ.
const currentList = () => {
  const { search, place, sort } = readFilters();
  const filter = compose(
    (list) => searchByTitle(list, search),
    (list) => filterByPlace(list, place)
  );
  const sorter = SORTERS[sort] ?? ((list) => list);
  return sorter(filter(album.photos));
};

// ---------- Дэлгэцэнд гаргах ----------

const renderPlaceOptions = () => {
  const places = uniquePlaces(album.photos);
  const selected = placeSelect.value;

  const options = places.map((place) => new Option(place, place));
  placeSelect.replaceChildren(new Option('Бүх газар', 'all'), ...options);
  placeSelect.value = places.includes(selected) ? selected : 'all';

  placeOptions.replaceChildren(...places.map((place) => new Option(place)));
};

const renderStats = (list) => {
  const all = album.photos;
  statsBox.textContent =
    `${list.length} / ${album.size} зураг · нийт ${totalLikes(all)} like · ` +
    `дундаж ${average(...all.map((p) => p.likes)).toFixed(1)}`;

  const groups = groupByPlace(all);
  groupsBox.textContent = Object.entries(groups)
    .map(([place, photos]) => `${place}: ${photos.length}`)
    .join(' · ');
};

const render = () => {
  const list = currentList();
  renderCards(list);
  renderStats(list);
};

// ---------- Listener-ууд ----------

// Шүүлтүүр: бичих, сонгох бүрт дахин зурна.
filtersForm.addEventListener('input', render);
filtersForm.addEventListener('submit', (event) => event.preventDefault());

// Like ба устгах товч. Картууд дахин дахин үүсдэг тул listener-ийг жагсаалт дээр
// нэг удаа тавьж (event delegation), дарсан товчийг closest()-оор олно.
gallery.addEventListener('click', (event) => {
  const likeButton = event.target.closest('.like-button');
  const removeButton = event.target.closest('.remove-button');

  if (likeButton) {
    const id = Number(likeButton.dataset.id);
    album.like(id);
    saveAlbum();
    render();
    // Дахин зурсны дараа focus алдагдахгүй байлгах
    gallery.querySelector(`.like-button[data-id="${id}"]`)?.focus();
  } else if (removeButton) {
    album.remove(Number(removeButton.dataset.id));
    saveAlbum();
    renderPlaceOptions();
    render();
  }
});

resetButton.addEventListener('click', () => {
  album = new FeaturedAlbum(PHOTOS);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // хадгалах сан хаалттай байж болно
  }
  filtersForm.reset();
  renderPlaceOptions();
  render();
});

// ---------- Нэмэлт даалгавар: зураг нэмэх form (лаб 9-ийн validator) ----------

const validatePlace = (value) =>
  validateName(value) === '' ? '' : 'Газрын нэрийг 2–50 тэмдэгтээр, тоогүй бичнэ үү.';

const addValidators = {
  'photo-title': validateName,
  'photo-place': validatePlace,
  'photo-date': validateDate
};

const checkField = (input) => {
  const error = addValidators[input.id](input.value);
  document.querySelector(`#${input.id}-error`).textContent = error;
  input.setAttribute('aria-invalid', error !== '');
  input.classList.toggle('is-valid', error === '');
  input.dataset.touched = 'true';
  return error === '';
};

const clearField = (input) => {
  document.querySelector(`#${input.id}-error`).textContent = '';
  input.removeAttribute('aria-invalid');
  input.classList.remove('is-valid');
  delete input.dataset.touched;
};

const addInputs = Object.keys(addValidators).map((id) => document.querySelector(`#${id}`));

addInputs.forEach((input) => {
  input.addEventListener('blur', () => {
    if (input.value !== '' || input.dataset.touched) {
      checkField(input);
    }
  });
  input.addEventListener('input', () => {
    addStatus.textContent = '';
    addStatus.className = 'form-status';
    if (input.dataset.touched) {
      checkField(input);
    }
  });
});

addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const invalid = addInputs.filter((input) => !checkField(input));
  if (invalid.length > 0) {
    addStatus.className = 'form-status is-error';
    addStatus.textContent = `${invalid.length} талбарт алдаа байна.`;
    invalid[0].focus();
    return;
  }

  const [title, place, date] = addInputs.map((input) => input.value.trim());
  const added = album.add({ title, place, date });
  saveAlbum();

  addForm.reset();
  addInputs.forEach(clearField);
  renderPlaceOptions();
  render();

  addStatus.className = 'form-status is-success';
  addStatus.textContent = `«${added.title}» нэмэгдлээ (id = ${added.id}).`;
  console.table(album.photos.map((p) => pick(p, 'id', 'title', 'place', 'date', 'likes')));
});

// Огнооны сонголтыг өнөөдрөөр (орон нутгийн цагаар) хязгаарлана.
const now = new Date();
document.querySelector('#photo-date').max =
  new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

renderPlaceOptions();
render();
