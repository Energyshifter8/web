// Даалгавар 1. Зургаан функц, бүгд arrow функц хэлбэртэй.

// n-ийг [min, max] завсарт барина. clamp(15, 0, 10) = 10
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

// Дурын тооны аргументын дундаж (rest параметр). Аргументгүй бол 0.
const average = (...nums) =>
  nums.length === 0 ? 0 : nums.reduce((sum, n) => sum + n, 0) / nums.length;

// Анхдагч утгатай параметр: нэр өгөөгүй (undefined) бол 'Зочин'.
const greet = (name = 'Зочин') => `Сайн уу, ${name}!`;

// Closure: count хувьсагч зөвхөн буцаасан функцуудаас харагдана.
const makeCounter = (start = 0) => {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
    reset: () => (count = start)
  };
};

// fn-ийг x дээр n удаа давтан хэрэглэнэ: fn(fn(...fn(x))). Давталтын оронд рекурс.
const applyN = (fn, n, x) => (n <= 0 ? x : applyN(fn, n - 1, fn(x)));

// Хоёр функцийг нийлүүлнэ: compose(f, g)(x) = f(g(x))
const compose = (f, g) => (x) => f(g(x));

if (typeof module !== 'undefined') {
  module.exports = { clamp, average, greet, makeCounter, applyN, compose };
}
