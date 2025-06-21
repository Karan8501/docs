## 3. Objects

---

### 46. How do you create an object in JavaScript?

- **Object literal:**
  ```js
  const obj = { a: 1, b: 2 };
  ```
- **Constructor function:**
  ```js
  function Person(name) {
    this.name = name;
  }
  const p = new Person("Alice");
  ```
- **`Object.create`:**
  ```js
  const proto = {
    greet() {
      return "hi";
    },
  };
  const obj = Object.create(proto);
  ```
- **Class syntax:**
  ```js
  class Car {
    constructor(make) {
      this.make = make;
    }
  }
  const car = new Car("Toyota");
  ```

---

### 47. What is a property descriptor?

A property descriptor is an object that describes a property’s configuration (value, writable, enumerable, configurable, get/set).

**Example:**

```js
const obj = { x: 1 };
console.log(Object.getOwnPropertyDescriptor(obj, "x"));
// { value: 1, writable: true, enumerable: true, configurable: true }
```

---

### 48. What is an accessor property?

A property defined by a getter and/or setter function instead of a value.

**Example:**

```js
const obj = {
  get value() {
    return 42;
  },
  set value(v) {
    console.log("set", v);
  },
};
console.log(obj.value); // 42
obj.value = 100; // set 100
```

---

### 49. How do you define getters and setters?

Use `get` and `set` keywords in object literals or classes.

**Example:**

```js
const user = {
  _name: "Bob",
  get name() {
    return this._name;
  },
  set name(val) {
    this._name = val;
  },
};
console.log(user.name); // Bob
user.name = "Alice";
console.log(user.name); // Alice
```

---

### 50. What is the difference between `Object.create` and object literal?

- `Object.create(proto)` creates a new object with the given prototype.
- Object literal `{}` creates a new object with `Object.prototype` as its prototype.

**Example:**

```js
const proto = {
  greet() {
    return "hi";
  },
};
const a = Object.create(proto);
const b = {};
console.log(a.greet()); // 'hi'
// b.greet(); // Error
```

---

### 51. What is the prototype chain?

The chain of objects used to resolve properties. If a property is not found on the object, JavaScript looks up the prototype chain.

**Example:**

```js
const obj = {};
console.log(obj.toString()); // found on Object.prototype
```

---

### 52. How do you check if a property exists in an object?

- `'prop' in obj` (checks own and inherited)
- `obj.hasOwnProperty('prop')` (checks own only)

**Example:**

```js
const obj = { a: 1 };
console.log("a" in obj); // true
console.log(obj.hasOwnProperty("a")); // true
console.log("toString" in obj); // true
console.log(obj.hasOwnProperty("toString")); // false
```

---

### 53. How do you clone an object?

- **Shallow clone:**
  ```js
  const copy = Object.assign({}, obj);
  const copy2 = { ...obj };
  ```
- **Deep clone:**
  ```js
  const deepCopy = JSON.parse(JSON.stringify(obj));
  // or use a library like lodash.cloneDeep
  ```

---

### 54. What is the difference between shallow and deep cloning?

- **Shallow clone:** Only top-level properties are copied; nested objects or arrays are still referenced, not copied. Changes to nested structures affect both original and clone.
- **Deep clone:** All properties, including nested objects/arrays, are fully copied. Changes to the clone do not affect the original.

**Analogy:** Shallow cloning is like making a photocopy of a folder with papers stapled inside, but the inner papers are still linked to the originals. Deep cloning is like copying every paper, staple, and note, so the copy is truly independent.

**Example:**
```js
const obj = { a: 1, b: { c: 2 } };
const shallow = { ...obj };
shallow.b.c = 42;
console.log(obj.b.c); // 42 (shared, because 'b' is a reference)

// Deep clone using JSON (simple, but only for plain objects)
const deep = JSON.parse(JSON.stringify(obj));
deep.b.c = 100;
console.log(obj.b.c); // 42 (not affected)
```

**Caveats:**
- JSON methods do not handle functions, Dates, undefined, Maps/Sets, or circular references.
- For complex objects, use libraries like Lodash's `cloneDeep` or structuredClone (modern JS).

---

### How do you deep copy object x?

To deep copy an object (including all nested objects and arrays), you have several options:

**1. Using `structuredClone` (best for most modern cases):**
```js
const deepCopy = structuredClone(x);
```
- Handles Dates, RegExps, Maps, Sets, ArrayBuffers, and circular references.
- Not supported in all old browsers.

**2. Using `JSON.parse(JSON.stringify(x))` (simple objects only):**
```js
const deepCopy = JSON.parse(JSON.stringify(x));
```
- Only works for plain objects/arrays with serializable values (no functions, undefined, symbols, Dates, etc.).

**3. Using Lodash's `cloneDeep`:**
```js
import cloneDeep from 'lodash/cloneDeep';
const deepCopy = cloneDeep(x);
```
- Handles most edge cases, including circular references.

**4. Manual recursive copy (for learning):**
```js
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key]);
    }
  }
  return copy;
}
const deepCopy = deepClone(x);
```

**Best Practice:**
- Use `structuredClone` if available for most use cases.
- Use libraries for legacy or complex objects.
- Avoid JSON for objects with functions, Dates, or special types.

**Interview Tip:**
- Always clarify what types of data might be in the object, and mention the limitations of each method.

---

### 55. What is `Object.freeze()`?

Makes an object immutable: properties cannot be added, removed, or changed.

**Example:**

```js
const obj = { a: 1 };
Object.freeze(obj);
obj.a = 2; // ignored in strict mode, error in strict mode
console.log(obj.a); // 1
```

---

### 56. What is `Object.seal()`?

Prevents adding or removing properties, but allows modifying existing ones.

**Example:**

```js
const obj = { a: 1 };
Object.seal(obj);
obj.a = 2; // allowed
obj.b = 3; // ignored
console.log(obj); // { a: 2 }
```

---

### 57. How do you enumerate properties of an object?

- `for...in` loop (enumerates all enumerable properties, including inherited)
- `Object.keys(obj)` (own enumerable property names)
- `Object.getOwnPropertyNames(obj)` (all own property names)
- `Object.entries(obj)` (key-value pairs)

**Example:**

```js
const obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key);
}
Object.keys(obj).forEach((k) => console.log(k));
```

---

### 58. What is the difference between `for...in` and `Object.keys()`?

- `for...in`: Iterates over all enumerable properties, including inherited.
- `Object.keys()`: Returns only own enumerable property names.

---

### 59. What is `__proto__`?

A property that references the prototype of an object (deprecated, but widely supported).

**Example:**

```js
const obj = {};
console.log(obj.__proto__ === Object.prototype); // true
```

---

### 60. What is the difference between `prototype` and `__proto__`?

- `prototype`: Property of constructor functions/classes, used for inheritance.
- `__proto__`: Property of objects, points to their prototype.

**Example:**

```js
function Foo() {}
const f = new Foo();
console.log(Foo.prototype === f.__proto__); // true
```

---

### 61. How do you merge two objects?

- Spread syntax: `{ ...obj1, ...obj2 }`
- `Object.assign({}, obj1, obj2)`

**Example:**

```js
const a = { x: 1 };
const b = { y: 2 };
const merged = { ...a, ...b };
```

---

### 62. What is the difference between a data property and an accessor property?

- **Data property:** Has a value, can be read/written.
- **Accessor property:** Defined by getter/setter functions.

**Example:**

```js
const obj = {
  data: 1,
  get value() {
    return this.data;
  },
  set value(v) {
    this.data = v;
  },
};
```

---

### 63. How do you prevent adding properties to an object?

- Use `Object.preventExtensions(obj)`.
- `Object.seal()` and `Object.freeze()` also prevent adding properties.

**Example:**

```js
const obj = { a: 1 };
Object.preventExtensions(obj);
obj.b = 2; // ignored
```

---

### 64. What is a symbol property?

A property whose key is a Symbol, making it hidden from normal enumeration.

**Example:**

```js
const sym = Symbol("id");
const obj = { [sym]: 123 };
console.log(obj[sym]); // 123
```

---

### 65. What is the difference between `Object.assign` and spread syntax?

- Both copy properties, but spread does not copy inherited properties or non-enumerable ones.
- `Object.assign` copies string and symbol properties (enumerable only).

**Example:**

```js
const a = { x: 1 };
const b = { y: 2 };
const c1 = { ...a, ...b };
const c2 = Object.assign({}, a, b);
```

---

### 66. How do you check if two objects are equal?

- For reference equality: `a === b` (checks if same object)
- For deep equality: compare properties recursively (use libraries like Lodash's `isEqual`)

**Example:**

```js
const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false
// Deep equality:
function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
console.log(isEqual(a, b)); // true
```

---

### 67. What is property enumeration order?

- Own properties in insertion order (string keys), then integer keys in ascending order, then symbol keys.

---

### 68. What is the difference between `Object.getOwnPropertyNames` and `Object.keys`?

- `Object.keys(obj)`: Own enumerable property names (string keys only)
- `Object.getOwnPropertyNames(obj)`: All own property names (enumerable or not, string keys only)

---

### 69. What is the difference between `Object.entries` and `Object.values`?

- `Object.entries(obj)`: Returns array of `[key, value]` pairs.
- `Object.values(obj)`: Returns array of values.

**Example:**

```js
const obj = { a: 1, b: 2 };
console.log(Object.entries(obj)); // [['a', 1], ['b', 2]]
console.log(Object.values(obj)); // [1, 2]
```

---

### 70. What is a computed property name?

A property whose key is determined dynamically (using an expression in square brackets).

**Example:**

```js
const key = "age";
const obj = { [key]: 42 };
console.log(obj.age); // 42
```

---

### Additional Related Questions

#### How do you make an object non-enumerable?

Use `Object.defineProperty` with `enumerable: false`.

```js
const obj = {};
Object.defineProperty(obj, "hidden", { value: 1, enumerable: false });
```

#### How do you get all symbol properties of an object?

Use `Object.getOwnPropertySymbols(obj)`.

#### How do you check if an object is extensible?

Use `Object.isExtensible(obj)`.
