## 4. Arrays

---

### 71. How do you create an array?

- **Array literal:**
  ```js
  const arr = [1, 2, 3];
  ```
- **Array constructor:**
  ```js
  const arr = new Array(3); // [empty × 3]
  const arr2 = new Array(1, 2, 3); // [1,2,3]
  ```
- **`Array.of`:**
  ```js
  const arr = Array.of(1, 2, 3); // [1,2,3]
  ```
- **`Array.from`:**
  ```js
  const arr = Array.from("abc"); // ['a','b','c']
  ```

---

### 72. What is a sparse array?

- An array with empty slots (unassigned indices).
- Example:
  ```js
  const arr = [1, , 3]; // arr[1] is empty
  console.log(arr.length); // 3
  console.log(arr[1]); // undefined
  1 in arr; // false
  ```

---

### 73. What are array-like objects?

- Objects with indexed elements and a `length` property, but not true arrays.
- Example: `arguments`, NodeLists, strings.
  ```js
  function f() {
    console.log(arguments);
  }
  f(1, 2, 3); // arguments is array-like
  ```

---

### 74. How do you convert an array-like object to an array?

- Use `Array.from()` or spread syntax:
  ```js
  const arr = Array.from(arguments);
  // or
  const arr2 = [...arguments];
  ```

---

### 75. What is the difference between `Array.of` and `Array.from`?

- `Array.of(...args)`: creates an array from arguments.
- `Array.from(obj)`: creates an array from array-like or iterable objects.

---

### 76. How do you clone an array?

- Spread: `[...arr]`
- `slice`: `arr.slice()`
- `Array.from(arr)`
  ```js
  const arr = [1, 2, 3];
  const copy = [...arr];
  ```

---

### 77. What is the difference between `map`, `filter`, and `reduce`?

- `map`: transforms each element, returns new array.
- `filter`: keeps elements matching a condition.
- `reduce`: combines elements into a single value.
  ```js
  [1, 2, 3].map((x) => x * 2); // [2,4,6]
  [1, 2, 3].filter((x) => x > 1); // [2,3]
  [1, 2, 3].reduce((a, b) => a + b, 0); // 6
  ```

---

### 78. How does `find` differ from `filter`?

- `find`: returns first matching element (or undefined).
- `filter`: returns all matching elements (array).
  ```js
  [1, 2, 3].find((x) => x > 1); // 2
  [1, 2, 3].filter((x) => x > 1); // [2,3]
  ```

---

### 79. What is the difference between `push`, `pop`, `shift`, and `unshift`?

- `push`: add to end
- `pop`: remove from end
- `unshift`: add to start
- `shift`: remove from start

---

### 80. What does `splice` do?

- Adds/removes/replaces elements in-place.
  ```js
  let arr = [1, 2, 3];
  arr.splice(1, 1, 9); // [1,9,3]
  ```

---

### 81. What is the difference between `slice` and `splice`?

- `slice`: returns shallow copy, does not modify original.
- `splice`: modifies original, can add/remove/replace.

---

### 82. How do you remove duplicates from an array?

- Using `Set`:
  ```js
  const arr = [1, 2, 2, 3];
  const unique = [...new Set(arr)]; // [1,2,3]
  ```

---

### 83. How do you flatten a nested array?

- Use `flat()`:
  ```js
  const arr = [1, [2, [3]]];
  arr.flat(2); // [1,2,3]
  ```
- Or use recursion or `flatMap` for custom flattening.

---

### 84. How do you check if an array includes a value?

- `arr.includes(value)`
  ```js
  [1, 2, 3].includes(2); // true
  ```

---

### 85. How do you find the index of an element?

- `arr.indexOf(value)` (first match)
- `arr.lastIndexOf(value)` (last match)
  ```js
  [1, 2, 3].indexOf(2); // 1
  ```

---

### 86. What is the difference between `forEach` and `map`?

- `forEach`: iterates, does not return new array.
- `map`: returns new array with transformed elements.

---

### 87. How do you sort an array of objects?

- Use `sort()` with a compare function.
  ```js
  const arr = [{ a: 2 }, { a: 1 }];
  arr.sort((x, y) => x.a - y.a); // [{a:1},{a:2}]
  ```

---

### 88. What is the difference between `sort` and `localeCompare`?

- `sort`: sorts elements, can use `localeCompare` for strings.
  ```js
  ["b", "a"].sort(); // ['a','b']
  ["b", "a"].sort((a, b) => a.localeCompare(b)); // ['a','b']
  ```

---

### 89. How do you reverse an array?

- `arr.reverse()` (in-place)
  ```js
  [1, 2, 3].reverse(); // [3,2,1]
  ```

---

### 90. What is the difference between `concat` and spread syntax?

- Both combine arrays, spread is more flexible.
  ```js
  [1, 2].concat([3, 4]); // [1,2,3,4]
  [...[1, 2], ...[3, 4]]; // [1,2,3,4]
  ```

---

### 91. How do you create an array of a given length and fill it?

- `Array(length).fill(value)`
  ```js
  Array(3).fill(0); // [0,0,0]
  ```
- Or use `Array.from`:
  ```js
  Array.from({ length: 3 }, (_, i) => i); // [0,1,2]
  ```

---

### 92. How do you check if every element meets a condition?

- `arr.every(fn)`
  ```js
  [2, 4, 6].every((x) => x % 2 === 0); // true
  ```

---

### 93. How do you check if some elements meet a condition?

- `arr.some(fn)`
  ```js
  [1, 2, 3].some((x) => x > 2); // true
  ```

---

### 94. How do you reduce an array to a single value?

- `arr.reduce((acc, val) => ..., initial)`
  ```js
  [1, 2, 3].reduce((sum, x) => sum + x, 0); // 6
  ```

---

### 95. What is the difference between `Array.isArray` and `instanceof Array`?

- `Array.isArray(arr)`: works across frames/windows.
- `arr instanceof Array`: may fail across frames.
  ```js
  Array.isArray([]); // true
  ```

---

### 96. How do you create a multidimensional array?

- Array of arrays:
  ```js
  const matrix = [
    [1, 2],
    [3, 4],
  ];
  // Or dynamically:
  const rows = 2,
    cols = 3;
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  ```

---

### 97. What happens if you use `delete` on an array element?

- Removes the value but leaves an empty slot (does not reindex).
  ```js
  const arr = [1, 2, 3];
  delete arr[1];
  console.log(arr); // [1, empty, 3]
  arr.length; // 3
  ```
- Use `splice` to remove and reindex.

---

### 98. What is array destructuring?

- Assign array elements to variables:
  ```js
  const [a, b] = [1, 2];
  // a = 1, b = 2
  ```

---

### 99. How do you convert an array to a string?

- Use `toString()` or `join()`:
  ```js
  [1, 2, 3].toString(); // '1,2,3'
  [1, 2, 3].join("-"); // '1-2-3'
  ```

---

### 100. How do you use the `join` method?

- Joins all elements into a string with a separator.
  ```js
  ["a", "b", "c"].join(", "); // 'a, b, c'
  ```

---

### Additional Related Questions

#### How do you check if an array is empty?

```js
[].length === 0; // true
```

#### How do you copy a multidimensional array (deep copy)?

```js
const arr = [
  [1, 2],
  [3, 4],
];
const copy = arr.map((row) => [...row]);
```

#### How do you generate a range of numbers as an array?

```js
const range = Array.from({ length: 5 }, (_, i) => i + 1); // [1,2,3,4,5]
```

---

### 101. How do you create an array of a given length and fill it?
- Use `Array(length).fill(value)`:
  ```js
  const arr = Array(5).fill(1); // [1,1,1,1,1]
  ```
- Or use `Array.from` for custom values:
  ```js
  const arr = Array.from({ length: 5 }, (_, i) => i * 2); // [0,2,4,6,8]
  ```

---

### 102. How do you check if every element meets a condition?
- Use `every`:
  ```js
  const allEven = [2, 4, 6].every(x => x % 2 === 0); // true
  ```

---

### 103. How do you check if some elements meet a condition?
- Use `some`:
  ```js
  const hasNegative = [1, -2, 3].some(x => x < 0); // true
  ```

---

### 104. How do you reduce an array to a single value?
- Use `reduce`:
  ```js
  const sum = [1, 2, 3].reduce((acc, x) => acc + x, 0); // 6
  ```
- Can be used for sums, products, building objects, etc.

---

### 105. What is the difference between `Array.isArray` and `instanceof Array`?
- `Array.isArray(arr)`: Works across iframes/windows, always reliable.
- `arr instanceof Array`: May fail across frames.
  ```js
  Array.isArray([]); // true
  ([]) instanceof Array; // true (usually)
  ```

---

### 106. How do you create a multidimensional array?
- Array of arrays:
  ```js
  const matrix = [ [1, 2], [3, 4] ];
  // Dynamic:
  const rows = 3, cols = 2;
  const grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  ```

---

### 107. What happens if you use `delete` on an array element?
- Removes the value but leaves a hole (empty slot). Does not change array length or reindex.
  ```js
  const arr = [1, 2, 3];
  delete arr[1];
  console.log(arr); // [1, empty, 3]
  console.log(arr.length); // 3
  ```
- Use `splice` to remove and reindex:
  ```js
  arr.splice(1, 1); // [1, 3]
  ```

---

### 108. What is array destructuring?
- Assign variables from array elements:
  ```js
  const [first, second] = [10, 20];
  // first = 10, second = 20
  ```
- Supports skipping, defaults, and nested arrays:
  ```js
  const [a, , b = 5] = [1]; // a=1, b=5
  ```

---

### 109. How do you convert an array to a string?
- Use `toString()` or `join()`:
  ```js
  [1, 2, 3].toString(); // '1,2,3'
  [1, 2, 3].join('-'); // '1-2-3'
  ```

---

### 110. How do you use the `join` method?
- Joins all elements into a string with a separator:
  ```js
  ['apple', 'banana', 'cherry'].join(', '); // 'apple, banana, cherry'
  ```

---

### Related: How do you check if an array is empty?
```js
[].length === 0; // true
```

### Related: How do you deep copy a multidimensional array?
```js
const arr = [[1, 2], [3, 4]];
const copy = arr.map(row => [...row]);
```

### Related: How do you generate a range of numbers as an array?
```js
const range = Array.from({ length: 5 }, (_, i) => i + 1); // [1,2,3,4,5]
```

