# Лаб 9. JavaScript validation

Зургийн цомог порталын санал хүсэлтийн form-д JavaScript validation бичсэн.

```
lab9/
├── index.html          # зургийн цомог + санал хүсэлтийн form (даалгавар 4)
├── test.html           # даалгавар 1–3-ын үр дүнгийн хүснэгт
├── css/style.css       # лаб 6-ийн загвар + form, хүснэгтийн загвар
├── img/
└── js/
    ├── theme.js        # харанхуй горим
    ├── experiments.js  # даалгавар 1: typeof, хөрвүүлэлт, 0.1 + 0.2, console.table
    ├── algorithms.js   # даалгавар 2: 8 функц, бэлэн функцгүй
    ├── validators.js   # даалгавар 3: 4 validation функц
    ├── main.js         # даалгавар 4: validator-ыг form-той холбох
    └── tests.js        # test.html-ийн шалгалтууд
```

## Даалгавар 2. algorithms.js

`sumTo`, `factorial`, `isPrime`, `fizzBuzz`, `countVowels`, `isPalindrome`, `maxOf`, `digitSum`.
`Math.max`, `reverse`, `includes`, `toLowerCase`, `reduce` зэрэг бэлэн функц хэрэглээгүй,
зөвхөн давталт, нөхцөл, оператор ашигласан.

## Даалгавар 3. validators.js

Функц бүр алдааны мессеж буцаана, утга зөв бол `""`.

| Функц | Дүрэм |
|---|---|
| `validateName` | `trim`, хоосон биш, 2–50 тэмдэгт, тоогүй |
| `validateEmail` | хоосон биш, зайгүй, `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` |
| `validatePassword` | ≥ 8 тэмдэгт, зайгүй, үсэг (кирилл/латин) ба тоо |
| `validateMessage` | `trim`, 10–500 тэмдэгт |

## Даалгавар 4. Form

- `novalidate`: browser-ын validation-ыг унтрааж, зөвхөн JS шалгана.
- Талбараас гарахад (`blur`) шалгана, нэг удаа шалгагдсан талбарыг бичих бүрт (`input`) дахин шалгана.
- «Илгээх» дарахад 4 талбарыг бүгдийг шалгаж, алдаатай эхний талбар руу focus шилжүүлнэ.
- Алдаатай талбарт `aria-invalid="true"`, алдааны мессеж `aria-describedby`-аар холбогдсон.
- Санал хүсэлтийн тэмдэгт тоологч, нууц үг харуулах/нуух товч.

## Шалгалт

`test.html`: algorithms 25/25, validators 25/25 тест амжилттай. Console (F12) дээр `console.table` гарна.
