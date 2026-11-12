// Цомгийн анхны өгөгдөл (лаб 6–9-ийн зургууд). app.js, tests.js хоёулаа ашиглана.
const PHOTOS = [
  {
    id: 1, title: 'Усан булан', place: 'Далай', date: '2026-06-14', likes: 42,
    tags: ['ус', 'хад', 'зун'], src: 'img/photo1.jpg',
    alt: 'Хадан цохионоос харагдах цэнхэр усан булан', credit: 'Alexey Topolyanskiy'
  },
  {
    id: 2, title: 'Уулын зам', place: 'Уул', date: '2026-07-02', likes: 18,
    tags: ['зам', 'ногоон', 'зун'], src: 'img/photo2.jpg',
    alt: 'Ногоон уулсын дундуур мушгирсан зам', credit: 'Andrew Ridley'
  },
  {
    id: 3, title: 'Цастай уул', place: 'Уул', date: '2026-01-20', likes: 57,
    tags: ['цас', 'майхан', 'өвөл'], src: 'img/photo3.jpg',
    alt: 'Цастай уулсын бэлд байгаа майхнууд', credit: 'Wolfgang Lutz'
  },
  {
    id: 4, title: 'Хүрхрээ', place: 'Ой', date: '2026-05-08', likes: 33,
    tags: ['ус', 'ой', 'хавар'], src: 'img/photo4.jpg',
    alt: 'Ой дундах өндөр хүрхрээ', credit: 'Andrew Coelho'
  },
  {
    id: 5, title: 'Манантай гол', place: 'Ой', date: '2026-10-11', likes: 9,
    tags: ['ус', 'манан', 'намар'], src: 'img/photo5.jpg',
    alt: 'Манантай ой дундуур урсах гол, чулуун дээр зогсож буй хүн', credit: 'Steve Carter'
  },
  {
    id: 6, title: 'Далайн эрэг', place: 'Далай', date: '2026-08-25', likes: 25,
    tags: ['долгион', 'хад', 'зун'], src: 'img/photo6.jpg',
    alt: 'Далайн эргийн хадан хясаа, долгион', credit: 'Joseph Barrientos'
  }
];
