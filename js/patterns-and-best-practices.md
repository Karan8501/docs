# 13. Patterns & Best Practices – JavaScript Interview Q&A

---

### 351. What are design patterns in JavaScript?
Design patterns are reusable solutions to common problems in software design. In JavaScript, patterns like module, singleton, observer, factory, and decorator help structure code for maintainability, scalability, and clarity.

**Example:**
- The observer pattern is used in event systems (e.g., DOM events, RxJS).

---

### 352. What is the module pattern?
The module pattern encapsulates related code into a single unit with private and public members, using closures to hide implementation details.

**Example:**
```js
const Counter = (function() {
  let count = 0;
  return {
    increment() { count++; },
    getCount() { return count; }
  };
})();
Counter.increment();
console.log(Counter.getCount()); // 1
```

---

### 353. What is the revealing module pattern?
A refinement of the module pattern where you define all functions/variables privately and return an object that maps public names to private functions.

**Example:**
```js
const Calculator = (function() {
  function add(a, b) { return a + b; }
  function sub(a, b) { return a - b; }
  return { add, sub };
})();
```

---

### 354. What is the observer pattern?
The observer pattern allows objects (observers) to subscribe to and receive updates from another object (subject) when its state changes.

**Example:**
```js
class Subject {
  constructor() { this.observers = []; }
  subscribe(observer) { this.observers.push(observer); }
  notify(data) { this.observers.forEach(fn => fn(data)); }
}
const subject = new Subject();
subject.subscribe(val => console.log('Notified:', val));
subject.notify(42);
```

---

### 355. What is the singleton pattern?
Ensures a class has only one instance and provides a global point of access to it.

**Example:**
```js
class Singleton {
  constructor() {
    if (Singleton.instance) return Singleton.instance;
    Singleton.instance = this;
  }
}
const a = new Singleton();
const b = new Singleton();
console.log(a === b); // true
```

---

### 356. What is the factory pattern?
A factory pattern creates objects without specifying the exact class/type of object to create.

**Example:**
```js
function ShapeFactory(type) {
  if (type === 'circle') return { draw: () => 'Circle' };
  if (type === 'square') return { draw: () => 'Square' };
}
const shape = ShapeFactory('circle');
console.log(shape.draw()); // Circle
```

---

### 357. What is the prototype pattern?
The prototype pattern uses a prototype object to share properties/methods among instances, saving memory and supporting inheritance.

**Example:**
```js
function Person(name) { this.name = name; }
Person.prototype.greet = function() { return 'Hello, ' + this.name; };
const alice = new Person('Alice');
console.log(alice.greet());
```

---

### 358. What is the command pattern?
Encapsulates a request as an object, allowing you to parameterize clients with queues, requests, and operations.

**Example:**
```js
function Command(fn) { this.execute = fn; }
const logCommand = new Command(() => console.log('Run!'));
logCommand.execute();
```

---

### 359. What is the mediator pattern?
Defines an object that encapsulates how a set of objects interact, promoting loose coupling.

**Example:**
```js
class Mediator {
  constructor() { this.channels = {}; }
  subscribe(channel, fn) {
    (this.channels[channel] = this.channels[channel] || []).push(fn);
  }
  publish(channel, data) {
    (this.channels[channel] || []).forEach(fn => fn(data));
  }
}
```

---

### 360. What is the strategy pattern?
Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

**Example:**
```js
function Context(strategy) { this.strategy = strategy; }
Context.prototype.execute = function(a, b) { return this.strategy(a, b); };
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const context = new Context(add);
console.log(context.execute(2, 3)); // 5
```

---

### 361. What is the decorator pattern?
Adds new functionality to objects dynamically without modifying their structure.

**Example:**
```js
function addTimestamp(obj) {
  obj.timestamp = Date.now();
  return obj;
}
const user = { name: 'Alice' };
console.log(addTimestamp(user));
```

---

### 362. What is the adapter pattern?
Allows incompatible interfaces to work together by translating one interface into another.

**Example:**
```js
class OldAPI { request() { return 'old'; } }
class NewAPI { fetch() { return 'new'; } }
class Adapter {
  constructor() { this.api = new NewAPI(); }
  request() { return this.api.fetch(); }
}
const adapter = new Adapter();
console.log(adapter.request()); // 'new'
```

---

### 363. What is the facade pattern?
Provides a simplified interface to a complex subsystem.

**Example:**
```js
function fetchUserData() {
  // Internally calls multiple APIs, handles errors, etc.
  return fetch('/user').then(r => r.json());
}
```

---

### 364. What is dependency injection?
A design pattern where dependencies are provided to a component, rather than hardcoded inside it, increasing flexibility and testability.

**Example:**
```js
function Service(api) { this.api = api; }
const api = { get: () => 'data' };
const service = new Service(api);
```

---

### 365. What is a polyfill?
A polyfill is code that implements a feature on older browsers/environments that do not support it natively.

**Example:**
```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function(x) {
    return this.indexOf(x) !== -1;
  };
}
```

---

### 366. How do you write a polyfill for Array.prototype.flat()?
**Polyfill:**
```js
if (!Array.prototype.flat) {
  Array.prototype.flat = function(depth = 1) {
    return this.reduce((acc, val) =>
      Array.isArray(val) && depth > 0
        ? acc.concat(val.flat(depth - 1))
        : acc.concat(val), []);
  };
}
```

**Example:**
```js
console.log([1, [2, [3]]].flat(2)); // [1, 2, 3]
```

---

### 367. What is a ponyfill and how is it different from a polyfill?
A ponyfill provides the same functionality as a polyfill but does not modify global objects. You import and use it directly.

**Example:**
```js
// ponyfill.js
function flat(arr, depth = 1) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) && depth > 0
      ? acc.concat(flat(val, depth - 1))
      : acc.concat(val), []);
}
// Usage:
flat([1, [2, [3]]], 2);
```

---

### 368. How would you polyfill Promise.allSettled()?
**Polyfill:**
```js
if (!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p =>
      Promise.resolve(p)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    ));
  };
}
```

---

### 369. How do you polyfill Object.create()?
**Polyfill:**
```js
if (!Object.create) {
  Object.create = function(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };
}
```

---

### 370. What are advanced polyfill techniques (feature detection, shims, etc.)?
- **Feature detection:** Check if a feature exists before polyfilling.
- **Shim:** A shim may provide a fallback or patch for missing features (can modify or patch existing APIs).
- **Ponyfill:** Like a polyfill, but does not modify global objects.

**Example:**
```js
if (!window.fetch) {
  // Load a fetch polyfill
}
```

---

### 371. What is a Proxy and what are common use cases?
A Proxy allows you to intercept and customize operations on objects (get, set, etc.).

**Example:**
```js
const obj = {};
const proxy = new Proxy(obj, {
  get(target, prop) {
    return prop in target ? target[prop] : 42;
  }
});
console.log(proxy.foo); // 42
```

**Use cases:**
- Validation, logging, property access control, reactive frameworks (Vue.js)

---

### 372. What is the Reflect API and how is it used?
The Reflect API provides static methods for interceptable JavaScript operations (like those handled by Proxy traps).

**Example:**
```js
const obj = {};
Reflect.set(obj, 'x', 10);
console.log(obj.x); // 10
```

---

### 373. What are async iterators and async generators?
- **Async iterator:** An object with a `next()` method that returns a promise.
- **Async generator:** A function that yields promises and can `await` inside.

**Example:**
```js
async function* asyncGen() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
}
for await (let val of asyncGen()) {
  console.log(val);
}
```

---

### 374. What is a WeakRef and when would you use it?
A WeakRef is a reference to an object that does not prevent it from being garbage collected. Used for caches, memory-sensitive structures.

**Example:**
```js
let obj = { data: 123 };
let ref = new WeakRef(obj);
obj = null; // Now eligible for GC
```

---

### 375. What is FinalizationRegistry?
A FinalizationRegistry lets you register a callback to run after an object is garbage collected (non-deterministic, advanced use).

**Example:**
```js
const registry = new FinalizationRegistry((heldValue) => {
  console.log('Object GCed:', heldValue);
});
let obj = {};
registry.register(obj, 'myObj');
obj = null;
```

---

### 376. What are web components?
Web components are reusable, encapsulated custom elements built using HTML, CSS, and JS. Main standards: Custom Elements, Shadow DOM, HTML Templates.

**Example:**
```js
class MyElement extends HTMLElement {
  connectedCallback() { this.innerHTML = '<b>Hello</b>'; }
}
customElements.define('my-element', MyElement);
```

---

### 377. What are custom elements?
Custom elements are user-defined HTML elements with custom behavior.

**Example:**
```js
class MyButton extends HTMLElement {
  connectedCallback() { this.textContent = 'Click me!'; }
}
customElements.define('my-button', MyButton);
```

---

### 378. What are decorators in JavaScript?
Decorators are functions that modify classes, methods, or properties. Used for meta-programming (not yet standard in JS, but used in TypeScript, Angular).

**Example (TypeScript):**
```ts
function readonly(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
class Example {
  @readonly
  method() {}
}
```

---

### 379. What are observables and how do they differ from Promises?
Observables represent streams of data over time (multiple values), while Promises represent a single future value.

**Example (RxJS):**
```js
import { Observable } from 'rxjs';
const obs = new Observable(sub => {
  sub.next(1);
  sub.next(2);
  sub.complete();
});
obs.subscribe(val => console.log(val));
```

---

### 380. What are advanced event handling patterns (once, passive, capture, delegation)?
- **once:** Listener runs once, then removed.
- **passive:** Listener promises not to call preventDefault (improves scroll perf).
- **capture:** Listener runs in capture phase.
- **delegation:** Attach listener to parent, handle events from children.

**Example:**
```js
div.addEventListener('click', handler, { once: true });
div.addEventListener('touchmove', handler, { passive: true });
div.addEventListener('click', handler, true); // capture phase
document.body.addEventListener('click', e => {
  if (e.target.matches('button')) { /* delegation */ }
});
```

---

### 381. How do you profile JavaScript performance in the browser?
- Use Chrome DevTools/Firefox Profiler: Record CPU usage, memory, call stacks.
- Analyze flame charts, bottlenecks, and optimize slow code.
- Use `console.time()` and `console.timeEnd()` for custom timing.

**Example:**
```js
console.time('loop');
for (let i = 0; i < 1e6; i++) {}
console.timeEnd('loop');
```

---

### 382. What are common memory and performance pitfalls in JavaScript?
- Memory leaks from forgotten timers, event listeners, closures
- Unnecessary DOM manipulation/layout thrashing
- Large synchronous tasks blocking the main thread
- Not using async APIs or web workers for heavy tasks

**Tip:** Always clean up listeners, use async patterns, and profile regularly.

---

### 383. What is XSS and how do you defend against it?
Cross-Site Scripting (XSS) is an attack where malicious scripts are injected into web pages.

**Prevention:**
- Escape user input before rendering
- Use Content Security Policy (CSP)
- Avoid `innerHTML` with untrusted data

**Example:**
```js
div.textContent = userInput; // Safe
div.innerHTML = userInput; // Unsafe
```

---

### 384. What is CSRF and how do you defend against it?
Cross-Site Request Forgery (CSRF) tricks users into submitting unwanted actions.

**Prevention:**
- Use CSRF tokens
- Check `Origin`/`Referer` headers
- Use SameSite cookies

---

### 385. What is the Intl API and how is it used for internationalization?
The Intl API provides language-sensitive string comparison, number/date formatting, and more.

**Example:**
```js
const num = 123456.789;
console.log(new Intl.NumberFormat('de-DE').format(num)); // '123.456,789'
```

---

### 386. What are modern browser APIs you should know (Clipboard, Web Share, Web Bluetooth, Web Speech, etc.)?
- **Clipboard API:** Read/write to clipboard
- **Web Share API:** Share content via native dialogs
- **Web Bluetooth:** Connect to Bluetooth devices
- **Web Speech:** Speech recognition/synthesis

**Example (Clipboard):**
```js
navigator.clipboard.writeText('Hello!');
```

---

### 387. What is the difference between a transpiler and a polyfill?
- **Transpiler:** Converts code from one version/language to another (e.g., ES6→ES5)
- **Polyfill:** Adds missing features to environments (e.g., Array.prototype.flat)

---

### 388. What is the difference between a shim and a polyfill?
- **Shim:** Provides fallback or patches for APIs (may patch existing features)
- **Polyfill:** Implements missing features only if not present

---

### 389. How do you test for feature support in JavaScript?
- Use feature detection:
```js
if ('fetch' in window) { /* supported */ }
```
- Use Modernizr or similar libraries

---

### 390. What are the best practices for writing maintainable and scalable JavaScript code?
- Use modules and clear file structure
- Follow naming conventions
- Write pure functions and avoid side effects
- Use linters and formatters
- Write tests and documentation
- Prefer immutability and clear separation of concerns

---
