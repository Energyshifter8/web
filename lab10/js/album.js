// Даалгавар 4. class Album.
// Зургууд #photos private талбарт хадгалагдана: album.#photos гэж гаднаас хандвал
// SyntaxError гарна. Гадагш үргэлж ГҮН хуулбар (structuredClone) өгдөг тул
// буцаасан объектыг өөрчилсөн ч цомгийн доторх өгөгдөл өөрчлөгдөхгүй.
// objectTools.js (withDefaults, likePhoto), photoTools.js (topLiked)-ийг ашиглана.

class Album {
  #photos = [];

  constructor(photos = []) {
    // add()-ийг энд дуудахгүй: удамшсан класс add-ийг дахин тодорхойлсон байж
    // болох ба тэр үед түүний private талбарууд хараахан үүсээгүй байдаг.
    structuredClone(photos).forEach((photo) => this.#insert(photo));
  }

  // Хамгийн их id + 1. Хоосон цомогт 1.
  #nextId() {
    return this.#photos.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  }

  #insert(photo) {
    const id = photo.id ?? this.#nextId();
    if (this.#photos.some((p) => p.id === id)) {
      throw new Error(`id=${id} зураг аль хэдийн байна`);
    }
    const stored = { ...withDefaults(photo), id };
    this.#photos = [...this.#photos, stored];
    return stored;
  }

  get size() {
    return this.#photos.length;
  }

  // ГҮН хуулбар: tags массив хүртэл шинээр үүснэ.
  get photos() {
    return structuredClone(this.#photos);
  }

  find(id) {
    const photo = this.#photos.find((p) => p.id === id);
    return photo ? structuredClone(photo) : undefined;
  }

  // id байхгүй бол хамгийн их id + 1, likes = 0, tags = [] тавина. Нэмсэн зургийн хуулбарыг буцаана.
  add(photo) {
    return structuredClone(this.#insert({ likes: 0, tags: [], ...photo }));
  }

  // Устгасан бол true, ийм id байхгүй бол false.
  remove(id) {
    const before = this.#photos.length;
    this.#photos = this.#photos.filter((p) => p.id !== id);
    return this.#photos.length < before;
  }

  // Like нэмээд шинэ like-ийн тоог буцаана. Ийм id байхгүй бол null.
  like(id) {
    if (!this.#photos.some((p) => p.id === id)) {
      return null;
    }
    this.#photos = this.#photos.map((p) => (p.id === id ? likePhoto(p) : p));
    return this.find(id).likes;
  }

  // JSON.stringify(album) үүнийг автоматаар дуудна.
  toJSON() {
    return structuredClone(this.#photos);
  }

  // JSON мөр эсвэл массиваас цомог үүсгэнэ. `new this` тул FeaturedAlbum.from(...)
  // нь FeaturedAlbum буцаана.
  static from(json) {
    const data = typeof json === 'string' ? JSON.parse(json) : json;
    if (!Array.isArray(data)) {
      throw new TypeError('Album.from: массив хэрэгтэй');
    }
    return new this(data);
  }
}

// Нэмэлт даалгавар. Хамгийн их like-тай 3 зургийг автоматаар «онцлох» болгоно.
// Цомог өөрчлөгдөх бүрт (add, remove, like) super-ийн аргыг дуудаад жагсаалтаа шинэчилнэ.
class FeaturedAlbum extends Album {
  #featured = [];
  #count;

  constructor(photos = [], count = 3) {
    super(photos); // эхлээд Album-ийн constructor, үүний дараа this ашиглаж болно
    this.#count = count;
    this.#refresh();
  }

  // Like 0-ээс их, хамгийн олон like-тай #count зургийн id.
  #refresh() {
    const liked = super.photos.filter((p) => p.likes > 0);
    this.#featured = topLiked(liked, this.#count).map((p) => p.id);
  }

  get featured() {
    return [...this.#featured];
  }

  isFeatured(id) {
    return this.#featured.includes(id);
  }

  // Зураг бүрт featured: true/false талбар нэмж өгнө.
  get photos() {
    return super.photos.map((p) => ({ ...p, featured: this.isFeatured(p.id) }));
  }

  add(photo) {
    const added = super.add(photo);
    this.#refresh();
    return added;
  }

  remove(id) {
    const removed = super.remove(id);
    this.#refresh();
    return removed;
  }

  like(id) {
    const likes = super.like(id);
    this.#refresh();
    return likes;
  }
}
