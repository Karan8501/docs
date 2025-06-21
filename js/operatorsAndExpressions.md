## 2. Operators & Expressions

---

### 31. What is the difference between `==` and `===`?

- `==` (loose equality): compares values after type coercion.
- `===` (strict equality): compares both value and type, no coercion.

**Example:**

```js
console.log(5 == "5"); // true
console.log(5 === "5"); // false
```

**Analogy:** `==` is like comparing the shape of two keys, even if they're made of different materials; `===` is like requiring both shape and material to match.

---

### 32. What does the `typeof` operator return for different types?

- Returns a string indicating the type of the operand.

**Examples:**

```js
console.log(typeof 42); // 'number'
console.log(typeof "hi"); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof null); // 'object' (quirk)
console.log(typeof Symbol("id")); // 'symbol'
console.log(typeof 123n); // 'bigint'
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object'
console.log(typeof function () {}); // 'function'
```

---

### 33. What is the result of `[] + []`?

- Both arrays are converted to empty strings, so `[] + []` results in `''` (empty string).

**Example:**

```js
console.log([] + []); // ''
```

---

### 34. What is the result of `[] + {}` and `{}` + []?

- `[] + {}`: `"[object Object]"` (array becomes '', object becomes '[object Object]')
- `{}` + []: If at the start of a line, `{}` is treated as an empty block, then `+[]` is `0`.

**Examples:**

```js
console.log([] + {}); // '[object Object]'
console.log({} + []); // 0
```

---

### 35. What is the comma operator?

- Evaluates each operand (from left to right) and returns the value of the last operand.

**Example:**

```js
let x = (1, 2, 3);
console.log(x); // 3
```

**Use case:** Often used in for-loops for multiple expressions.

---

### 36. What are bitwise operators in JavaScript?

- Operators that work on 32-bit binary representations of numbers.
  - `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (left shift), `>>` (right shift), `>>>` (unsigned right shift)

**Example:**

```js
console.log(5 & 3); // 1 (101 & 011 = 001)
console.log(5 | 3); // 7 (101 | 011 = 111)
console.log(5 ^ 3); // 6 (101 ^ 011 = 110)
console.log(~5); // -6
console.log(5 << 1); // 10
console.log(5 >> 1); // 2
```

---

### 37. What is the `instanceof` operator?

- Tests whether an object is an instance of a constructor or class.

**Example:**

```js
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(function () {} instanceof Function); // true
```

---

### 38. What does the `delete` operator do?

- Removes a property from an object.
- For arrays, it removes the element but does not reindex (leaves a hole).

**Example:**

```js
let obj = { a: 1, b: 2 };
delete obj.a;
console.log(obj); // { b: 2 }

let arr = [1, 2, 3];
delete arr[1];
console.log(arr); // [1, empty, 3]
```

---

### 39. What is the purpose of the `void` operator?

- Evaluates an expression and returns `undefined`.
- Used to get `undefined` in places where an expression is required (e.g., `<a href="javascript:void(0)">`).

**Example:**

```js
console.log(void 123); // undefined
```

---

### 40. What is operator precedence?

- The order in which operations are evaluated in an expression.
- Multiplication/division have higher precedence than addition/subtraction, etc.

**Example:**

```js
console.log(2 + 3 * 4); // 14 (3*4 first, then +2)
console.log((2 + 3) * 4); // 20
```

---

### 41. What is short-circuit evaluation?

- Logical operators (`&&`, `||`) evaluate left to right and stop as soon as the result is determined.

**Example:**

```js
let a = 0;
let b = a || 5; // b = 5 (a is falsy)
let c = a && 5; // c = 0 (a is falsy, returns a)
```

---

### 42. What is optional chaining?

- Allows safe access to deeply nested object properties.
- Returns `undefined` if any part is `null` or `undefined` instead of throwing an error.

**Example:**

```js
let user = {};
console.log(user.address?.city); // undefined
```

---

### 43. What is nullish coalescing (`??`)?

- Returns the right-hand operand only if the left is `null` or `undefined` (not other falsy values like 0 or '').

**Example:**

```js
let foo = 0;
console.log(foo ?? 42); // 0
let bar = null;
console.log(bar ?? 42); // 42
```

---

### 44. How does the ternary operator work?

- A concise way to write `if...else` expressions: `condition ? exprIfTrue : exprIfFalse`

**Example:**

```js
let age = 18;
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // 'Yes'
```

---

### 45. What is the difference between `in` and `hasOwnProperty`?

- `in`: Checks if a property exists anywhere in the object’s prototype chain.
- `hasOwnProperty`: Checks only the object’s own properties.

**Example:**

```js
let obj = { a: 1 };
console.log("a" in obj); // true
console.log(obj.hasOwnProperty("a")); // true
console.log("toString" in obj); // true (inherited)
console.log(obj.hasOwnProperty("toString")); // false
```

---

### Additional Related Questions

#### What is the difference between prefix and postfix increment/decrement operators?

- Prefix (`++x`): increments, then returns the new value.
- Postfix (`x++`): returns the current value, then increments.

**Example:**

```js
let x = 1;
console.log(++x); // 2
console.log(x++); // 2
console.log(x); // 3
```

#### What is the difference between logical AND (`&&`) and logical OR (`||`)?

- `&&`: Returns the first falsy value or the last value if all are truthy.
- `||`: Returns the first truthy value or the last value if all are falsy.

**Example:**

```js
console.log(0 && 5); // 0
console.log(1 && 5); // 5
console.log(0 || 5); // 5
console.log("" || "default"); // 'default'
```
