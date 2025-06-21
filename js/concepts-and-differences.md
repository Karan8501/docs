# JavaScript Concepts and Differences

---

## 1. Object-Oriented Programming (OOP)

**Concept:**
Object-oriented programming is a paradigm based on the concept of "objects", which can contain data (properties) and code (methods). OOP enables code reuse, modularity, and abstraction. In JavaScript, objects can be created using object literals, constructor functions, ES6 classes, or factory functions.

### Key Principles:
- **Encapsulation:** Bundling data and methods that operate on that data within objects.
- **Inheritance:** Objects can inherit properties and methods from other objects (via prototype chain or `class` syntax).
- **Polymorphism:** Objects can share the same interface but behave differently.
- **Abstraction:** Hiding complex implementation details and exposing only what is necessary.

---

### Q364. What is object-oriented programming?
Object-oriented programming is a style of programming that organizes code into objects, each representing a real-world entity or concept. Objects encapsulate state and behavior, making code more modular, reusable, and easier to maintain. JavaScript supports OOP via prototypes and ES6 classes.

---

## 2. Imperative vs Declarative Programming

**Concept:**
- **Imperative programming** describes *how* to do something (step-by-step instructions).
- **Declarative programming** describes *what* you want to achieve (the desired result), leaving the details of how to the language or runtime.

**Examples:**
- Imperative: Using a `for` loop to sum an array.
- Declarative: Using `reduce()` to sum an array.

---

### Q365. What is the difference between imperative and declarative programming?
- **Imperative:** You specify the exact steps to achieve a result (e.g., traditional loops, manual state changes).
- **Declarative:** You describe the desired outcome, and the system figures out the steps (e.g., SQL, React JSX, array methods like `map`, `filter`).

---

## 3. Pure Functions

**Concept:**
A pure function is a function that, given the same inputs, always returns the same output and produces no side effects (does not modify external state).

---

### Q366. What is a pure function?
A pure function returns the same result for the same arguments and does not cause any observable side effects (like modifying global variables, I/O, etc.).

---

## 4. Immutability

**Concept:**
Immutability means that once a value is created, it cannot be changed. Instead, new values are created when changes are needed. This is important for predictability and avoiding bugs in functional programming.

---

### Q367. What is immutability?
Immutability is the property of an object or value that prevents it from being changed after it is created. In JavaScript, primitive values are immutable (e.g., strings, numbers), while objects and arrays are mutable by default.

---

## 5. Referential Transparency

**Concept:**
Referential transparency means an expression can be replaced with its value without changing the program’s behavior. Pure functions enable referential transparency.

---

### Q368. What is referential transparency?
A function or expression is referentially transparent if it can be replaced with its value/result without affecting the program. Pure functions are always referentially transparent.

---

## 6. Side Effects

**Concept:**
A side effect is any modification of state or interaction with the outside world (e.g., modifying a variable, writing to disk, logging, network requests) that occurs during function execution.

---

### Q369. What is side effect?
A side effect is any observable change outside a function’s scope, such as modifying external variables, DOM manipulation, I/O operations, etc. Pure functions have no side effects.

---

## 7. Common JavaScript Differences

### Q370. What is the difference between map, filter, and reduce?
- `map`: Transforms each element and returns a new array.
- `filter`: Returns a new array with elements that pass a test.
- `reduce`: Reduces the array to a single value by applying a function.

**Example:**
```js
const arr = [1,2,3,4];
arr.map(x => x*2); // [2,4,6,8]
arr.filter(x => x%2 === 0); // [2,4]
arr.reduce((a,b) => a+b, 0); // 10
```

---

### Q371. What is the difference between forEach and map?
- `forEach`: Executes a function for each element, returns undefined.
- `map`: Transforms each element and returns a new array.

---

### Q372. What is the difference between for...of and for...in?
- `for...of`: Iterates over values of iterable objects (arrays, strings, etc.).
- `for...in`: Iterates over enumerable property names (keys) of an object.

---

### Q373. What is the difference between map and object?
- `Map`: Built-in object for key-value pairs, keys can be any type.
- `Object`: Traditional JS object, keys are strings/symbols only.

---

### Q374. What is the difference between set and array?
- `Set`: Collection of unique values, no duplicates allowed.
- `Array`: Ordered collection, can have duplicates.

---

### Q375. What is the difference between WeakMap and Map?
- `Map`: Keys can be any type, strong references, prevents garbage collection.
- `WeakMap`: Keys must be objects, does not prevent garbage collection, not iterable.

---

### Q376. What is the difference between WeakSet and Set?
- `Set`: Stores any values, strong references, iterable.
- `WeakSet`: Only stores objects, weak references, not iterable.

---

### Q377. What is the difference between null and undefined?
- `null`: Explicit absence of value, set by programmer.
- `undefined`: Variable declared but not assigned, or missing property.

---

### Q378. What is the difference between == and ===?
- `==`: Loose equality, does type coercion.
- `===`: Strict equality, no type coercion.

---

### Q379. What is the difference between var, let, and const?
- `var`: Function-scoped, can be redeclared/updated, hoisted.
- `let`: Block-scoped, can be updated but not redeclared.
- `const`: Block-scoped, cannot be updated or redeclared.

---

### Q380. What is the difference between function declaration and function expression?
- **Function Declaration:** Named function, hoisted.
- **Function Expression:** Can be anonymous, not hoisted.

---

### Q381. What is the difference between arrow function and regular function?
- Arrow functions do not have their own `this`, `arguments`, or `super`. They are always anonymous and cannot be used as constructors.
- Regular functions have their own `this` and can be used as constructors.

---

### Q382. What is the difference between bind, call, and apply?
- `bind`: Returns a new function with `this` bound.
- `call`: Invokes function with `this` and arguments passed individually.
- `apply`: Invokes function with `this` and arguments as an array.

---

### Q383. What is the difference between arguments object and rest parameters?
- `arguments`: Array-like object available inside all non-arrow functions, contains all arguments passed.
- `rest parameters`: Actual array, defined as `...args` in function signature, only includes explicitly named rest arguments.

---

