# Лаб 8. Bootstrap ба Tailwind CSS: нэг хуудас, хоёр арга

Лаб 6-ийн фото цомгийг Bootstrap ба Tailwind-ээр хоёр удаа бүтээж харьцуулсан.
Хэмжилтийн хүснэгт, дүгнэлт: `index.html`.

```
lab8/
├── index.html            # харьцуулалт, хүснэгт, дүгнэлт
├── img/, video/          # хоёр хувилбарт ижил
├── bootstrap/
│   ├── index.html        # Bootstrap 5.3.3 CDN
│   ├── style.css         # --brand, .btn-brand
│   └── script.js         # data-bs-theme, .was-validated
└── tailwind/
    ├── index.html
    ├── src/input.css     # @theme --color-brand, @custom-variant dark
    ├── dist/output.css   # build
    ├── script.js         # data-theme, aria-invalid
    └── package.json
```

## Tailwind build

```bash
cd tailwind
npm install
npm run build     # tailwindcss -i src/input.css -o dist/output.css --minify
npm run watch
```

## Үр дүн

| Хэмжүүр | Bootstrap | Tailwind |
|---|---|---|
| HTML | 12.5 KB (gzip 3.8) | 16.3 KB (gzip 4.2) |
| CSS | 228.9 KB (gzip 30.7) | 20.2 KB (gzip 4.7) |
| JS | 80.0 KB (gzip 23.7) | 2.1 KB (gzip 0.8) |
| Нийт | 321.4 KB (gzip 58.2) | 38.7 KB (gzip 9.6) |
| Нэг card-ын class | 13 | 20 |
| Lighthouse mobile (P/A/BP/SEO) | 71 / 100 / 100 / 100 | 76 / 100 / 100 / 100 |
| Lighthouse desktop | 100 / 100 / 100 / 100 | 99 / 100 / 100 / 100 |

Lighthouse 13.6, localhost, 5 удаагийн медиан.
