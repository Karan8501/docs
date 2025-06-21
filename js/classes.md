## 6. Classes & Prototypes

---

### 131. What is a class in JavaScript?
A syntactic sugar over JavaScript's prototype-based inheritance, introduced in ES6, to define objects and deal with inheritance in a clearer way.

---

### 132. How do you create a class?
```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}
const dog = new Animal('Rex');
dog.speak(); // 'Rex makes a noise.'
```

---

### 133. What is the difference between a class and a constructor function?
- **Class:** Introduced in ES6, clearer syntax, strict mode by default, methods are non-enumerable, cannot be called without `new`.
- **Constructor Function:** Pre-ES6, regular function, methods added to prototype manually, can be called without `new` (but not recommended).

---

### 134. What is the `constructor` method?
A special method for creating and initializing objects created with a class.
```js
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

---

### 135. What is inheritance in classes?
A mechanism to create a new class (child/subclass) from an existing class (parent/superclass), inheriting its properties and methods.

---

### 136. How do you use `extends`?
The `extends` keyword is used to create a subclass.
```js
class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}
```

---

### 137. What is the `super` keyword?
Used to call the constructor or methods of the parent class.
```js
class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
  speak() {
    super.speak(); // Calls Animal's speak
    console.log(`${this.name} meows.`);
  }
}
```

---

### 138. How do you override methods in subclasses?
Define a method with the same name in the subclass; it replaces the parent method.
```js
class Bird extends Animal {
  speak() {
    console.log(`${this.name} tweets.`);
  }
}
```

---

### 139. What are static methods and properties?
Static methods/properties belong to the class itself, not instances.
```js
class MathUtils {
  static add(a, b) { return a + b; }
}
MathUtils.add(2, 3); // 5
```

---

### 140. How do you implement private fields?
Use `#` prefix (ES2022+):
```js
class Counter {
  #count = 0;
  increment() { this.#count++; }
  get value() { return this.#count; }
}
```

---

### 141. What are getters and setters?
Special methods to get/set property values.
```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  get area() { return this.width * this.height; }
  set area(a) { this.width = a / this.height; }
}
```

---

### 142. What is a mixin?
A pattern to add reusable functionality to classes without inheritance.
```js
const Jumpable = Base => class extends Base {
  jump() { console.log('Jump!'); }
};
class Animal {}
class Rabbit extends Jumpable(Animal) {}
```

---

### 143. How do you simulate abstract classes?
Create a base class with methods that throw errors if not implemented:
```js
class Shape {
  area() { throw new Error('Not implemented'); }
}
```

---

### 144. What is the prototype chain?
A mechanism by which objects inherit properties/methods from other objects. Each object has a `[[Prototype]]` (accessed via `__proto__` or `Object.getPrototypeOf`).

---

### 145. How does `Object.create` work?
Creates a new object with the specified prototype object.
```js
const proto = { greet() { return 'hi'; } };
const obj = Object.create(proto);
obj.greet(); // 'hi'
```

---

### 146. What is the difference between `prototype` and `__proto__`?
- `prototype`: Property of constructor functions, used for inheritance.
- `__proto__`: Property of objects, points to their prototype.

---

### 147. How does method binding work in classes?
Class methods are not bound by default; use `.bind(this)` or arrow functions for callbacks.
```js
class Button {
  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() { console.log(this); }
}
```

---

### 148. What is class hoisting?
Classes are **not** hoisted. You must declare before use.

---

### 149. Are class methods enumerable?
No, methods defined in class bodies are non-enumerable by default.

---

### 150. What is the difference between instance and static methods?
- **Instance methods:** Called on instances.
- **Static methods:** Called on the class itself.

---

### 151. What is a class expression?
A class defined inside an expression, not a statement.
```js
const MyClass = class {
  sayHi() { return 'hi'; }
};
```

---

### 152. How do you use public and private class fields?
- Public: declared directly.
- Private: use `#`.
```js
class Demo {
  name = 'public';
  #secret = 42;
}
```

---

### 153. How do you use decorators in classes?
Decorators are a stage-3 proposal. They allow annotating and modifying classes/methods.
```js
// Example (not standard yet)
@sealed
class MyClass {}
```

---

### 154. What are the limitations of JavaScript classes?
- No multiple inheritance (only single inheritance).
- Private fields not accessible outside.
- Not hoisted.
- Some features (like decorators, abstract classes) are not standard.

---

### 155. How do you implement multiple inheritance?
Use mixins (see Q142), as JS does not support multiple inheritance directly.

---

## 7. Asynchronous JavaScript

---

### 156. What is a callback function?
A function passed to another function to be called later (often after async work).

---

### 157. What is a Promise?
An object representing the eventual completion or failure of an asynchronous operation.

---

### 158. How do you create and use a Promise?
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});
p.then(result => console.log(result));
```

---

### 159. What are the possible states of a Promise?
- Pending
- Fulfilled (resolved)
- Rejected

---

### 160. What is `Promise.all`?
Waits for all promises to resolve or any to reject.
```js
Promise.all([p1, p2]).then(([r1, r2]) => ...);
```

---

### 161. What is `Promise.race`?
Returns a promise that resolves/rejects as soon as any of the input promises does.

---

### 162. What is `Promise.any`?
Resolves as soon as any promise resolves (ignores rejections unless all reject).

---

### 163. What is `Promise.allSettled`?
Waits for all promises to settle (resolve or reject), returns array of results.

---

### 164. What is the event loop?
A mechanism that allows JS to perform non-blocking operations by offloading operations to the system and putting callbacks in a queue to be executed later.

---

### 165. What is the call stack?
A stack data structure that keeps track of function calls in JS.

---

### 166. What are microtasks and macrotasks?
- **Microtasks:** Promises, MutationObservers, queueMicrotask.
- **Macrotasks:** setTimeout, setInterval, I/O, UI rendering.

---

### 167. How does async/await work?
Syntactic sugar over Promises. `await` pauses execution until the Promise resolves.
```js
async function foo() {
  const result = await fetch('url');
  return result;
}
```

---

### 168. How do you handle errors in async/await?
Use `try...catch`:
```js
async function foo() {
  try {
    await someAsync();
  } catch (e) {
    console.error(e);
  }
}
```

---

### 169. What is callback hell and how do you avoid it?
Deeply nested callbacks, making code hard to read. Avoid with Promises or async/await.

---

### 170. What is the difference between setTimeout and setInterval?
- `setTimeout`: runs once after delay.
- `setInterval`: runs repeatedly every interval.

---

### 171. What is the difference between process.nextTick and setImmediate?
- `process.nextTick`: runs before next event loop iteration (Node.js).
- `setImmediate`: runs on next event loop iteration.

---

### 172. How do you create a delay/sleep function?
```js
function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}
```

---

### 173. What is the difference between synchronous and asynchronous code?
- **Synchronous:** blocks until finished.
- **Asynchronous:** allows other code to run while waiting.

---

### 174. How do you make an HTTP request in JavaScript?
- Browser: `fetch`, `XMLHttpRequest`.
- Node.js: `http`, `https`, `axios`.
```js
fetch('https://api.example.com').then(res => res.json());
```

---

### 175. What is fetch API?
A modern browser API for making HTTP requests, returns Promises.
```js
fetch('https://api.example.com').then(res => res.json());
```

---

### 176. How do you cancel a fetch request?
Use `AbortController`:
```js
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();
```

---

### 177. What is XMLHttpRequest?
An older browser API for HTTP requests (before `fetch`).
```js
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = () => console.log(xhr.responseText);
xhr.send();
```

---

### 178. What is JSONP?
A technique for cross-domain requests by embedding a `<script>` tag. Not secure, rarely used now.

---

### 179. What is CORS?
**Cross-Origin Resource Sharing**: A security feature that restricts web pages from making requests to a different domain.

---

### 180. How do you handle CORS errors?
- Ensure the server sends correct CORS headers (e.g., `Access-Control-Allow-Origin`).
- Use a proxy if you can't change the server.

---

### 181. What is long polling?
A technique where the client repeatedly requests data from the server, holding the request open until data is available.

---

### 182. What is Server-Sent Events (SSE)?
A browser API for receiving automatic updates from a server via HTTP.
```js
const es = new EventSource('/events');
es.onmessage = e => console.log(e.data);
```

---

### 183. What is WebSocket?
A protocol for full-duplex communication between client and server over a single, long-lived connection.
```js
const ws = new WebSocket('ws://example.com');
ws.onmessage = e => console.log(e.data);
```

---

### 184. How do you implement retry logic for async operations?
Use a loop or recursion with `try/catch` and delays.
```js
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1000);
    }
  }
}
```

---

### 185. What is the difference between microtasks and macrotasks in the event loop?
- **Microtasks:** Promises, queueMicrotask, MutationObserver.
- **Macrotasks:** setTimeout, setInterval, I/O.
- Microtasks run before next macrotask.

---

### 186. How do you chain Promises?
Return a Promise from `.then()` to chain further `.then()` calls.
```js
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### 187. What is the difference between Promise chaining and async/await?
- **Promise chaining:** Uses `.then()`/`.catch()`, can be deeply nested.
- **async/await:** Syntactic sugar, looks synchronous, easier to read.

---

### 188. What is a race condition?
A situation where the outcome depends on the timing/order of asynchronous operations.

---

### 189. How do you avoid race conditions in async code?
- Use locks, mutexes, or only allow one operation at a time.
- Chain Promises or use `await` to ensure order.

---

### 190. What is the difference between parallel and concurrent execution?
- **Parallel:** Multiple operations run at the same time (multi-core).
- **Concurrent:** Multiple operations are in progress, but not necessarily simultaneously (single-core, interleaved).

---

### Additional Interview-Relevant Questions

#### How do you initialize class fields outside the constructor?
```js
class Demo {
  value = 42;
}
```

#### What is an async iterator?
An object implementing `Symbol.asyncIterator` and returning Promises from `next()`.
```js
const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield 1; yield 2;
  }
};
```

#### What is event-driven programming?
A paradigm where the flow is determined by events (user actions, messages, etc.). Common in UI and server code.

#### What are common error handling patterns in async JS?
- Use `try/catch` with async/await.
- Always handle `.catch()` on Promises.
- Use global error handlers for unhandled rejections.

