# Лаб 7. Sass/SCSS: CSS preprocessor

Лаб 6-ийн сайтыг харагдацыг нь өөрчлөхгүйгээр SCSS болгон refactor хийсэн.

## Ажиллуулах

```bash
npm install
npm run build     # compressed -> css/style.css
npm run watch     # засварлах үед автоматаар build хийнэ
```

## Бүтэц

```
scss/
├── main.scss              # бүх partial-ыг @use-ээр холбоно
├── abstracts/
│   ├── _tokens.scss       # өнгө, радиус, breakpoint, зай -> map
│   ├── _functions.scss    # rem(), contrast()
│   ├── _mixins.scss       # respond(), flex-center(), transition()
│   └── _index.scss        # @forward
├── base/
│   ├── _root.scss         # map-аас :root custom property үүсгэнэ (@each)
│   ├── _base.scss
│   └── _animations.scss   # @keyframes, prefers-reduced-motion
├── layout/                # site-header, nav, section, site-footer
├── components/            # hero, gallery, flip-card, media, theme-toggle, skip-link
└── utilities/
    └── _utilities.scss    # @each-ээр .u-text-*, .u-m*-*, .u-color-*, .u-bg-* ...
```

## Даалгавар бүрийг хаана хийсэн

| # | Даалгавар | Файл |
|---|-----------|------|
| 1 | npm-ээр Sass, scripts, folder бүтэц | `package.json`, `scss/` |
| 2 | Өнгө, радиус, breakpoint map -> `:root` custom property | `_tokens.scss`, `_root.scss` |
| 3 | `respond`, `flex-center` mixin | `_mixins.scss` (header, nav, flip-card, ...) |
| 4 | `rem()`, `contrast()` функц | `_functions.scss`; `contrast()`-оор `--color-on-accent`, `--color-header-text` тооцоолсон |
| 5 | Partial, BEM нэр, `@each` utility, compressed build | `scss/*`, `index.html`, `_utilities.scss`, `npm run build` |

Нэмэлт: `@for`-оор gallery-ийн `nth-child` delay, `%responsive-grid` placeholder + `@extend`.

## BEM нэрийн өөрчлөлт (Лаб 6 -> Лаб 7)

| Лаб 6 | Лаб 7 |
|-------|-------|
| `.logo`, `.menu-toggle`, `.menu-button`, `.site-nav` | `.site-header__logo`, `__toggle`, `__menu-button`, `__nav` |
| `.nav-list`, `.nav-link` | `.nav__list`, `.nav__link` |
| `.theme-button` | `.theme-toggle` |
| `.hero-title`, `.hero-mountain-back` | `.hero__title`, `.hero__mountain--back` |
| `.gallery-card`, `.gallery-link img` | `.gallery__card`, `.gallery__img` |
| `.flip-front`, `.flip-back .flip-title`, `.is-flipped` | `.flip-card__front`, `.flip-card__title--back`, `.flip-card--flipped` |

## Шалгалт

Лаб 6 болон Лаб 7 хуудсыг headless Chrome-оор 1280 / 900 / 375 px өргөн,
цайвар / харанхуй горим, flip болон гар утасны цэс нээлттэй үед харьцуулсан:
бүх элементийн computed style болон байршил ижил гарсан.
