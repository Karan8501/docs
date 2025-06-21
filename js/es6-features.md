## 10. ES6+ Features – JavaScript Interview Q&A

---

### 241. What are the new features in ES6?
ES6 (ECMAScript 2015) introduced major improvements to JavaScript, including:
- Let/const, block scoping
- Arrow functions
- Classes
- Template literals
- Destructuring
- Default/rest/spread parameters
- Modules (import/export)
- Promises
- Symbols
- Iterators/generators
- Sets, Maps, WeakSets, WeakMaps
- Enhanced object literals

---

### 242. What is destructuring assignment?
Destructuring lets you unpack values from arrays or properties from objects into distinct variables.

**Example:**
```js
const [a, b] = [1, 2]; // Array destructuring
const {x, y} = {x: 10, y: 20}; // Object destructuring
```

---

### 243. What is the difference between default, named, and namespace imports?
- **Default import:** Imports the default export from a module.
- **Named import:** Imports specific exports by name.
- **Namespace import:** Imports all exports as a single object.

**Example:**
```js
import myDefault from './module'; // default
import { foo, bar } from './module'; // named
import * as utils from './module'; // namespace
```

---

### 244. What are template literals?
Template literals are string literals allowing embedded expressions and multi-line strings. Use backticks \`\`.

**Example:**
```js
const name = 'Alice';
console.log(`Hello, ${name}!`);
```

---

### 245. What are arrow functions?
Arrow functions are a shorter syntax for writing functions and do not have their own `this`.

**Example:**
```js
const add = (a, b) => a + b;
```

---

### 246. What are default parameters?
Default parameters allow function parameters to have default values.

**Example:**
```js
function greet(name = 'Guest') {
  console.log('Hello, ' + name);
}
```

---

### 247. What is the rest operator?
The rest operator (`...`) collects multiple elements into an array.

**Example:**
```js
function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}
```

---

### 248. What is the spread operator?
The spread operator (`...`) expands arrays or objects.

**Example:**
```js
const arr = [1, 2, 3];
const arr2 = [...arr, 4]; // [1,2,3,4]
const obj = {a: 1};
const obj2 = {...obj, b: 2}; // {a:1, b:2}
```

---

### 249. What are symbols?
Symbols are unique, immutable values often used as object property keys to avoid property name collisions.

**Example:**
```js
const sym = Symbol('desc');
const obj = { [sym]: 42 };
```

---

### 250. What are iterators and generators?
- **Iterator:** An object with a `next()` method that returns `{value, done}`.
- **Generator:** A function that can pause and resume using `function*` and `yield`.

**Example:**
```js
function* gen() {
  yield 1;
  yield 2;
}
const it = gen();
console.log(it.next()); // {value:1, done:false}
```

---

### 251. What is a Set and how is it different from an Array?
A `Set` is a collection of unique values. Unlike arrays, sets do not allow duplicates and have no index-based access.

**Example:**
```js
const s = new Set([1, 2, 2, 3]); // Set {1,2,3}
```

---

### 252. What is a Map and how is it different from an Object?
A `Map` is a collection of key-value pairs where keys can be any type. Objects only allow string/symbol keys.

**Example:**
```js
const m = new Map();
m.set('a', 1);
m.set({}, 2);
```

---

### 253. What are WeakMap and WeakSet?
- **WeakMap:** Like Map, but keys must be objects and are weakly referenced (not prevented from garbage collection).
- **WeakSet:** Like Set, but only allows objects and is weakly referenced.

---

### 254. What are proxies?
A Proxy wraps an object and intercepts operations like get, set, etc.

**Example:**
```js
const target = {};
const proxy = new Proxy(target, {
  get(obj, prop) {
    return prop in obj ? obj[prop] : 42;
  }
});
console.log(proxy.foo); // 42
```

---

### 255. What is Reflect?
The Reflect API provides static methods for interceptable JavaScript operations (like those handled by Proxy traps).

**Example:**
```js
Reflect.set(obj, 'x', 10);
```

---

### 256. What are modules?
Modules let you split code into reusable files using `import` and `export`.

---

### 257. What is the difference between export and export default?
- `export`: Named export (can have many per file).
- `export default`: Default export (only one per file).

---

### 258. What is the difference between import and require?
- `import`: ES6 modules (static, supports tree-shaking, top-level only).
- `require`: CommonJS (dynamic, Node.js, can be called anywhere).

---

### 259. What is object shorthand property?
Allows you to use variable names as property names in object literals.

**Example:**
```js
const x = 1;
const obj = { x };
```

---

### 260. What is object computed property name?
Allows dynamic property names in object literals using square brackets.

**Example:**
```js
const key = 'foo';
const obj = { [key]: 42 };
```

---

### 261. What are class fields?
Class fields are properties defined directly in the class body.

**Example:**
```js
class MyClass {
  field = 123;
}
```

---

### 262. What are private class fields?
Private class fields use `#` and are only accessible within the class.

**Example:**
```js
class MyClass {
  #secret = 42;
  getSecret() { return this.#secret; }
}
```

---

### 263. What are static class fields?
Static fields belong to the class, not instances.

**Example:**
```js
class MyClass {
  static count = 0;
}
```

---

### 264. What is optional chaining?
Optional chaining (`?.`) lets you safely access deeply nested properties without throwing errors if a reference is null/undefined.

**Example:**
```js
const user = {};
console.log(user.address?.city); // undefined, no error
```

---

### 265. What is nullish coalescing?
Nullish coalescing (`??`) returns the right-hand value only if the left is `null` or `undefined`.

**Example:**
```js
let val = 0;
console.log(val ?? 'default'); // 0
```

---

### 266. What is BigInt?
BigInt is a numeric type for arbitrarily large integers.

**Example:**
```js
const big = 12345678901234567890n;
```

---

### 267. What is dynamic import?
Dynamic import (`import()`) lets you load modules asynchronously.

**Example:**
```js
import('./module.js').then(mod => mod.hello());
```

---

### 268. What is Promise.finally?
`finally()` runs after a promise settles, regardless of outcome.

**Example:**
```js
fetch('/api').then(...).catch(...).finally(() => console.log('Done!'));
```

---

### 269. What is globalThis?
`globalThis` is a standard way to access the global object in any JS environment.

**Example:**
```js
globalThis.foo = 123;
```

---

### 270. What is the difference between flat and flatMap?
- `flat`: Flattens nested arrays.
- `flatMap`: Maps and flattens in one step.

**Example:**
```js
[1, [2, 3]].flat(); // [1,2,3]
[1, 2].flatMap(x => [x, x*2]); // [1,2,2,4]
```

---

### 271. What is ArrayBuffer and TypedArray?
- **ArrayBuffer:** A generic, fixed-length binary data buffer.
- **TypedArray:** Views over ArrayBuffer for specific types (e.g., `Uint8Array`).

**Example:**
```js
const buf = new ArrayBuffer(8);
const view = new Uint8Array(buf);
```

---

### 272. What is Intl API?
The `Intl` API provides language-sensitive string comparison, number formatting, date/time formatting, etc.

**Example:**
```js
const num = 123456.789;
console.log(new Intl.NumberFormat('en-US').format(num)); // 123,456.789
```

---

### 273. What is String.prototype.matchAll?
Returns an iterator of all regex matches in a string.

**Example:**
```js
const str = 'test1 test2';
for (const match of str.matchAll(/test\d/g)) {
  console.log(match[0]);
}
```

---

### 274. What is Object.fromEntries?
Creates an object from an array of key-value pairs.

**Example:**
```js
Object.fromEntries([['a', 1], ['b', 2]]); // {a:1, b:2}
```

---

### 275. What is Object.entries?
Returns an array of a given object's own enumerable string-keyed property [key, value] pairs.

**Example:**
```js
Object.entries({a: 1, b: 2}); // [['a',1], ['b',2]]
```

---

### 276. What is Object.values?
Returns an array of a given object's own enumerable property values.

**Example:**
```js
Object.values({a: 1, b: 2}); // [1,2]
```

---

### 277. What is Object.getOwnPropertyDescriptors?
Returns all own property descriptors of a given object.

**Example:**
```js
Object.getOwnPropertyDescriptors({a: 1});
```

---

### 278. What is import.meta?
`import.meta` is metadata about the current module (e.g., `import.meta.url`).

---

### 279. What is the pipeline operator?
A proposed feature (`|>`) for chaining function calls in a readable way. Not yet standard.

---

### 280. What is the difference between ES6 and ES5?
ES6 introduced major new features (see above), while ES5 is the previous standard (no classes, modules, let/const, etc.).

---
