# 12. Advanced JavaScript Concepts – Interview Q&A

---

### 310. What is currying?
Currying is a functional programming technique where a function with multiple arguments is transformed into a sequence of functions, each taking a single argument. Instead of calling `f(a, b, c)`, you call `f(a)(b)(c)`.

**Why use currying?**
- Enables partial application: you can fix some arguments and reuse the function.
- Promotes function composition and reusability.

**Example:**
```js
function multiply(a, b) {
  return a * b;
}

// Curried version:
function curriedMultiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = curriedMultiply(2);
console.log(double(5)); // 10
```

**ES6 Arrow Function:**
```js
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6
```

**Real-World Scenario:**
Currying is used in libraries like Lodash and Ramda, and in React event handlers (e.g., `onClick={handleClick(id)}`).

---

### 311. What is memoization?
Memoization is an optimization technique that caches the results of expensive function calls based on their arguments. If the function is called again with the same arguments, the cached result is returned instead of recalculating.

**Why use memoization?**
- Improves performance for pure functions with repeatable results (e.g., recursion, heavy computations).

**Example:**
```js
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const factorial = memoize(function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
});

console.log(factorial(5)); // 120
console.log(factorial(5)); // 120 (from cache)
```

**Real-World Scenario:**
- Caching API responses.
- Avoiding recomputation in React components (e.g., `useMemo`).

---

### 312. What are generators and iterators?
**Generators** are special functions that can pause and resume execution, producing a sequence of values on demand. **Iterators** are objects that define a sequence and potentially a return value upon completion.

**Generator Syntax:**
```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = gen();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

**Iterators:**
An object is an iterator if it has a `next()` method that returns `{ value, done }`.

**Example:**
```js
const arr = [10, 20, 30];
const it = arr[Symbol.iterator]();
console.log(it.next()); // { value: 10, done: false }
```

**Use Cases:**
- Custom data streams
- Asynchronous flows (with `yield*` and `for...of`)
- Implementing lazy evaluation

---

### 313. What is a Proxy?
A Proxy is a built-in object that allows you to intercept and customize operations performed on another object (the "target"), such as property lookup, assignment, enumeration, function invocation, etc.

**Syntax:**
```js
const target = { name: 'Alice' };
const handler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : 'Not found';
  },
  set(obj, prop, value) {
    if (prop === 'age' && typeof value !== 'number') throw new Error('Age must be a number');
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);

console.log(proxy.name); // 'Alice'
console.log(proxy.age);  // 'Not found'
proxy.age = 30; // OK
// proxy.age = 'thirty'; // Throws error
```

**Use Cases:**
- Validation
- Logging
- Observing changes (reactivity, e.g., Vue.js)
- Creating virtualized or mock objects

---

### 314. What is Reflect?
The `Reflect` object provides methods for interceptable JavaScript operations, mirroring the methods of Proxy handlers. It offers a standard way to perform object operations (get, set, delete, etc.) that are usually done via operators.

**Why use Reflect?**
- More semantic and functional than direct operators.
- Used inside Proxy handlers for default behavior.

**Example:**
```js
const obj = { a: 1 };
Reflect.set(obj, 'b', 2); // obj.b = 2
console.log(Reflect.get(obj, 'a')); // 1
Reflect.deleteProperty(obj, 'a'); // delete obj.a
```

**Proxy Example:**
```js
const handler = {
  set(target, prop, value, receiver) {
    console.log(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver); // default behavior
  }
};
const proxy = new Proxy({}, handler);
proxy.x = 10; // Logs: Setting x to 10
```

---

### 315. What are Symbols used for?
A Symbol is a unique and immutable primitive value, often used as object property keys to avoid name collisions.

**Why use Symbols?**
- Guarantee uniqueness: `Symbol('desc') !== Symbol('desc')`
- Hide implementation details (private/protected properties)
- Define well-known behaviors (e.g., `Symbol.iterator`)

**Example:**
```js
const id = Symbol('id');
const user = { [id]: 123, name: 'Alice' };
console.log(user[id]); // 123
```

**Well-known Symbols:**
- `Symbol.iterator`: Makes objects iterable
- `Symbol.toStringTag`, `Symbol.asyncIterator`, etc.

---

### 316. What is debouncing and throttling?
**Debouncing** and **throttling** are techniques to control how often a function is executed in response to high-frequency events (e.g., scroll, resize, input).

#### Debouncing
- Ensures the function is called **only after a certain period of inactivity**.
- Useful for search boxes, window resizing, validation, etc.

**Example:**
```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const onInput = debounce(() => console.log('Searching...'), 300);
document.querySelector('input').addEventListener('input', onInput);
```

#### Throttling
- Ensures the function is called **at most once every X milliseconds**.
- Useful for scroll, resize, or mousemove events.

**Example:**
```js
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const onScroll = throttle(() => console.log('Scrolling...'), 200);
window.addEventListener('scroll', onScroll);
```

**Difference:**
- Debounce waits for a pause; throttle runs at intervals.
- Debounce for auto-save/search; throttle for animations/scroll.

---


### 317. What is service worker?
A **service worker** is a background script that runs separately from the main browser thread, enabling features like offline support, background sync, and push notifications. It acts as a programmable network proxy, intercepting and handling network requests, caching resources, and enabling Progressive Web App (PWA) capabilities.

**Key Features:**
- Runs independently of web pages (lifecycle separate from page)
- Can intercept/fetch network requests and serve cached responses
- Enables offline access and resource caching
- Supports background sync and push notifications

**Example: Registering a Service Worker**
```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Service Worker registered!', reg))
    .catch(err => console.error('SW registration failed:', err));
}
```

**Example: Basic Service Worker (sw.js)**
```js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => cache.add('/index.html'))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
```

**Use Cases:**
- Offline-first web apps (PWAs)
- Caching assets for performance
- Push notifications
- Background data sync

**Best Practices:**
- Always handle updates and cache versioning
- Use HTTPS (required for service workers)
- Clean up old caches

---

### 318. What is a web worker?
A **web worker** is a JavaScript script that runs in the background on a separate thread from the main UI, allowing you to perform CPU-intensive tasks without blocking the user interface.

**Key Features:**
- Runs in parallel with the main thread
- No direct access to DOM (communicates via messages)
- Useful for heavy computations, parsing, image processing, etc.

**Example: Creating a Web Worker**
**main.js:**
```js
const worker = new Worker('worker.js');
worker.postMessage({ num: 10 });
worker.onmessage = event => {
  console.log('Result from worker:', event.data);
};
```

**worker.js:**
```js
onmessage = function(event) {
  const result = event.data.num * 2;
  postMessage(result);
};
```

**Use Cases:**
- Image/video processing
- Large data computations
- Real-time data parsing (e.g., CSV, JSON)

**Best Practices:**
- Keep workers stateless if possible
- Terminate workers when not needed (`worker.terminate()`)

---

### 319. What is the Shadow DOM?
The **Shadow DOM** is a web standard that allows you to encapsulate a subtree of DOM elements and styles, keeping them isolated from the rest of the document. This enables custom elements and widgets with private markup and CSS, preventing style and script conflicts.

**Key Features:**
- Encapsulation: Styles and scripts inside the shadow tree do not leak out, nor are they affected by the outer page
- Enables reusable, self-contained components
- Used heavily in Web Components

**Example:**
```js
const host = document.querySelector('#shadow-host');
const shadow = host.attachShadow({ mode: 'open' });
shadow.innerHTML = `<style>p { color: red; }</style><p>Shadow DOM!</p>`;
```

**Use Cases:**
- Custom UI widgets (date pickers, modals)
- Third-party embeddable components
- Design systems

**Best Practices:**
- Use `mode: 'open'` for easier debugging, `mode: 'closed'` for strict encapsulation
- Expose APIs via methods/properties/events, not global selectors

---

### 320. What is custom elements?
**Custom elements** are user-defined HTML elements that extend the standard HTML vocabulary, enabling reusable, encapsulated components. They are a core part of the Web Components standard and work with the Shadow DOM for encapsulation.

**Key Features:**
- Define new tags (e.g., `<my-button>`, `<user-card>`)
- Lifecycle callbacks (connected, disconnected, attribute changed)
- Can use Shadow DOM for style/markup encapsulation

**Example:**
```js
class MyGreeting extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<b>Hello, ${this.getAttribute('name') || 'World'}!</b>`;
  }
}
customElements.define('my-greeting', MyGreeting);
// Usage: <my-greeting name="Alice"></my-greeting>
```

**Lifecycle Methods:**
- `connectedCallback`, `disconnectedCallback`, `attributeChangedCallback`, `adoptedCallback`

**Use Cases:**
- Reusable UI components (buttons, cards, widgets)
- Design systems and libraries
- Embeddable widgets for third-party sites

**Best Practices:**
- Prefix with a unique string (e.g., `my-`) to avoid collisions
- Use Shadow DOM for encapsulation
- Document public APIs and attributes

---


### 321. What is the difference between localStorage, sessionStorage, and cookies?

**localStorage, sessionStorage, and cookies** are all mechanisms for storing data on the client side in web browsers, but they have different lifetimes, storage capacities, and use cases.

#### Comparison Table
| Feature         | localStorage          | sessionStorage        | Cookies                   |
|-----------------|----------------------|-----------------------|---------------------------|
| Lifetime        | Until manually cleared| Until tab/window closes| Set by expires/max-age    |
| Capacity        | ~5–10 MB              | ~5–10 MB               | ~4 KB per cookie          |
| Accessible From | Any tab/window (same origin) | Only current tab/window | All requests to server (if not HttpOnly) |
| Sent to Server  | No                   | No                    | Yes (with every HTTP request) |
| API             | JS (Web Storage API) | JS (Web Storage API)  | JS (document.cookie) & HTTP |
| Security        | Vulnerable to XSS    | Vulnerable to XSS     | Vulnerable to XSS/CSRF unless HttpOnly/Secure |

#### 1. localStorage
- Stores key/value pairs in the browser with no expiration date.
- Data persists even after the browser is closed and reopened.
- Shared across all tabs/windows from the same origin.

**Example:**
```js
localStorage.setItem('theme', 'dark');
console.log(localStorage.getItem('theme')); // 'dark'
localStorage.removeItem('theme');
```

#### 2. sessionStorage
- Stores key/value pairs for the duration of the page session.
- Data is cleared when the tab or window is closed.
- Not shared between tabs/windows (even from the same site).

**Example:**
```js
sessionStorage.setItem('token', 'abc123');
console.log(sessionStorage.getItem('token')); // 'abc123'
sessionStorage.clear();
```

#### 3. Cookies
- Small pieces of data sent to and from the server with every HTTP request (unless marked HttpOnly).
- Can have expiration dates or be session-only.
- Used for authentication, tracking, and server-side reading.

**Example (JS):**
```js
document.cookie = 'username=alice; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/';
// Read cookies
console.log(document.cookie);
```

**Example (HTTP header):**
```
Set-Cookie: sessionId=xyz; HttpOnly; Secure; SameSite=Strict
```

#### Use Cases
- **localStorage:** Persistent user preferences, themes, caching non-sensitive data.
- **sessionStorage:** Data for a single session (multi-step forms, temporary auth tokens).
- **Cookies:** Authentication tokens, session IDs, cross-request data, server-side reading.

#### Security & Best Practices
- **Never store sensitive data (passwords, tokens) in localStorage/sessionStorage**—vulnerable to XSS.
- Use `HttpOnly` and `Secure` flags for cookies to prevent JavaScript access and require HTTPS.
- Use SameSite cookies to prevent CSRF.
- Clear storage when users log out.

**References:**
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN: sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- [MDN: document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

---

### 322. What is IndexedDB?
**IndexedDB** is a low-level, client-side NoSQL database API for storing large amounts of structured data (including files/blobs) in the browser. It allows you to create, read, update, and delete data using indexes for efficient queries.

**Key Features:**
- Asynchronous, transactional, and event-driven
- Stores key-value pairs, objects, and files
- Supports indexes for fast searching
- Survives browser restarts and works offline

**Example:**
```js
const request = indexedDB.open('myDB', 1);
request.onupgradeneeded = event => {
  const db = event.target.result;
  db.createObjectStore('users', { keyPath: 'id' });
};
request.onsuccess = event => {
  const db = event.target.result;
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  store.add({ id: 1, name: 'Alice' });
};
```

**Use Cases:**
- Offline web apps (caching, large datasets)
- Storing user-generated content
- Progressive Web Apps (PWAs)

**Best Practices:**
- Use libraries (e.g., Dexie.js, idb) for easier API
- Handle errors and version upgrades

---

### 323. What is WebAssembly?
**WebAssembly (Wasm)** is a low-level, binary instruction format that runs in the browser at near-native speed. It allows code written in languages like C, C++, and Rust to execute alongside JavaScript, enabling high-performance web applications.

**Key Features:**
- Fast execution, close to native speed
- Safe, sandboxed environment
- Interoperable with JavaScript
- Portable across browsers

**Example:**
- Compile C/C++/Rust to `.wasm` and load in JS:
```js
fetch('module.wasm')
  .then(res => res.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes))
  .then(result => {
    // Call exported Wasm functions
    result.instance.exports.myFunc();
  });
```

**Use Cases:**
- Games, video editing, image processing
- Crypto, compression, scientific computing
- Porting legacy/native apps to the web

**Best Practices:**
- Use for CPU-intensive tasks, not DOM manipulation
- Keep Wasm modules small for fast loading

---

### 324. What is a Blob?
A **Blob** (Binary Large OBject) is a data type representing immutable raw data, such as files, images, or binary streams. Blobs are used to handle file uploads/downloads, process images, and work with binary data in JavaScript.

**Key Features:**
- Represents data as a sequence of bytes
- Can be constructed from strings, ArrayBuffers, etc.
- Used with FileReader, fetch, and URL APIs

**Example:**
```js
const blob = new Blob(['Hello, world!'], { type: 'text/plain' });
console.log(blob.size); // 13
```

**Download Blob as File:**
```js
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'hello.txt';
a.click();
URL.revokeObjectURL(url);
```

**Use Cases:**
- File uploads/downloads
- Image or video processing
- Generating files on the fly

---

### 325. What is a FileReader?
**FileReader** is a web API that allows you to asynchronously read the contents of files (or blobs) on the client’s machine, such as when a user selects a file with an `<input type="file">` element.

**Key Features:**
- Reads files as text, data URLs, or ArrayBuffers
- Asynchronous, event-driven API

**Example:**
```js
const input = document.querySelector('input[type=file]');
input.addEventListener('change', event => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = e => {
    console.log('File contents:', e.target.result);
  };
  reader.readAsText(file);
});
```

**Use Cases:**
- Client-side file previews (images, text)
- Importing CSV/JSON data
- Validating file contents before upload

---

### 326. What is the Fetch API?
The **Fetch API** is a modern interface for making HTTP requests in JavaScript. It replaces `XMLHttpRequest` with a simpler, promise-based syntax for network requests.

**Key Features:**
- Returns Promises (async/await friendly)
- Supports streaming, CORS, and custom headers
- Works in browsers and modern runtimes

**Example:**
```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));

// With async/await
async function getData() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  console.log(data);
}
```

**Use Cases:**
- Fetching data from APIs
- Submitting forms
- Uploading files

**Best Practices:**
- Always handle errors (network, parsing)
- Use `AbortController` to cancel requests if needed

---

### 327. What is FormData?
**FormData** is a web API for constructing and sending key/value pairs, mimicking form submissions. It is commonly used to send files and data via `fetch` or `XMLHttpRequest`.

**Key Features:**
- Encodes data as `multipart/form-data`
- Supports files, blobs, and text fields
- Works with fetch and XHR

**Example:**
```js
const form = document.querySelector('form');
const formData = new FormData(form);
formData.append('extra', 'value');

fetch('/submit', {
  method: 'POST',
  body: formData
});
```

**Use Cases:**
- File uploads
- Submitting forms with files and text
- Sending complex data with AJAX

---

### 328. What is CORS?
**CORS (Cross-Origin Resource Sharing)** is a security feature that controls how web pages can make requests to a domain different from the one that served the page. It prevents malicious sites from reading sensitive data from another origin.

**How it works:**
- The server includes CORS headers (e.g., `Access-Control-Allow-Origin`) to specify which origins are allowed to access resources.
- Browsers enforce CORS for security; requests without proper headers are blocked.

**Example (Server Response Header):**
```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type
```

**Example (Fetch):**
```js
fetch('https://api.otherdomain.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('CORS error:', err));
```

**Use Cases:**
- APIs accessed from web apps on different domains
- CDN-hosted assets

**Best Practices:**
- Only allow trusted origins
- Use credentials (`withCredentials`, `Access-Control-Allow-Credentials`) with care
- Never use `*` for sensitive data

---

### 329. What is JSONP?
**JSONP (JSON with Padding)** is a technique for making cross-domain requests in web browsers by exploiting the fact that `<script>` tags are not subject to the same-origin policy. The server returns JavaScript code that calls a callback function with the data as an argument.

**How it works:**
- Client adds a `<script>` tag with a `src` pointing to the API, including a callback parameter.
- Server responds with JavaScript: `callback({ ...data })`.
- The callback is executed in the global scope.

**Example:**
```html
<script>
function handleData(data) {
  console.log('Received:', data);
}
</script>
<script src="https://api.example.com/data?callback=handleData"></script>
```

**Limitations:**
- Only supports GET requests
- Security risks (XSS, no control over returned code)
- Largely replaced by CORS and modern APIs

**Use Cases:**
- Legacy APIs before CORS existed

---

### 330. What is the difference between synchronous and asynchronous code?
- **Synchronous code** executes tasks one after another, blocking the thread until each completes. The browser/UI is unresponsive during long operations.
- **Asynchronous code** allows other operations to run while waiting for a task to complete, enabling non-blocking behavior (e.g., setTimeout, fetch, Promises).

**Example:**
```js
// Synchronous
console.log('A');
alert('Pause!'); // Blocks everything
console.log('B');

// Asynchronous
console.log('A');
setTimeout(() => console.log('B'), 1000);
console.log('C');
// Output: A, C, B
```

**Use Cases:**
- Synchronous: Simple scripts, initialization
- Asynchronous: Network requests, timers, file reading, animations

**Best Practices:**
- Prefer async APIs for I/O and heavy tasks to keep UI responsive

---

### 331. What is a race condition?
A **race condition** occurs when the outcome of a program depends on the timing or order of asynchronous operations, leading to unpredictable or incorrect results.

**Example:**
```js
let result;
fetch('/api/data1').then(res => res.json()).then(data => { result = data; });
fetch('/api/data2').then(res => res.json()).then(data => { result = data; });
// Which fetch finishes last determines final value of result
```

**Use Cases:**
- Concurrent AJAX requests
- Updating shared state from multiple async sources

**Best Practices:**
- Use Promises, async/await, or locking mechanisms to coordinate async flows
- Avoid shared mutable state

---

### 332. What is a memory leak?
A **memory leak** occurs when a program retains references to objects that are no longer needed, preventing the garbage collector from reclaiming that memory. Over time, this can cause increased memory usage and degrade performance.

**Common Causes:**
- Forgotten timers or event listeners
- Global variables
- Closures holding onto unused variables
- Detached DOM nodes

**Example:**
```js
let arr = [];
setInterval(() => {
  arr.push(new Array(1000000).fill('*'));
}, 1000); // arr grows forever, never released
```

---

### 333. How do you detect and fix memory leaks?
**Detection:**
- Use browser DevTools (Memory tab, heap snapshots)
- Monitor memory usage over time
- Look for detached DOM nodes, growing arrays, or unused listeners

**Fixes:**
- Remove event listeners and timers when not needed
- Nullify references to large objects
- Avoid unnecessary global variables
- Use weak references (WeakMap, WeakSet) for cache-like structures

**Example:**
```js
function start() {
  const el = document.getElementById('btn');
  function handler() { /* ... */ }
  el.addEventListener('click', handler);
  // ...
  // To prevent leak:
  el.removeEventListener('click', handler);
}
```

---

### 334. What is garbage collection?
**Garbage collection** is the automatic process by which JavaScript engines reclaim memory occupied by objects that are no longer reachable in the code. This prevents memory leaks and optimizes resource usage.

**How it works:**
- Modern engines use algorithms like mark-and-sweep
- When no references to an object exist, it is eligible for collection

**Example:**
```js
let obj = { a: 1 };
obj = null; // Now eligible for garbage collection
```

**Best Practices:**
- Minimize unnecessary references
- Clean up listeners, intervals, and DOM elements

---

### 335. How does the browser manage memory?
- **Memory is divided into stack and heap**
- Stack: stores function frames, local variables
- Heap: stores objects, closures, arrays
- The garbage collector reclaims heap memory when objects are unreachable
- Browser DevTools can help monitor and profile memory usage

**Example:**
- Local variables and call frames are on the stack
- Objects created with `{}` or `[]` are on the heap

**Best Practices:**
- Avoid memory leaks (see above)
- Profile memory usage in DevTools

---

### 336. What is the difference between stack and heap?
- **Stack:**
  - Fast, fixed-size memory for function calls and local variables
  - Managed automatically (push/pop)
  - Limited in size (stack overflow if exceeded)
- **Heap:**
  - Large, flexible memory for dynamic objects, arrays, closures
  - Managed by the garbage collector
  - Slower access, but can grow as needed

**Example:**
```js
function foo() {
  let x = 10; // stack
  let obj = { y: 20 }; // obj is on the heap, reference is on the stack
}
```

---


### 337. What is the difference between call stack and event loop?
**Call Stack:**
- The call stack is a data structure that tracks function calls and execution context in JavaScript.
- When a function is called, it's pushed onto the stack; when it returns, it's popped off.
- Only one function executes at a time (single-threaded).

**Event Loop:**
- The event loop is a mechanism that manages the execution of asynchronous code (callbacks, promises, events).
- It checks if the call stack is empty; if so, it pushes tasks from the task queues (macrotasks/microtasks) onto the stack.

**Example:**
```js
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
// Output: A, C, B
```
- 'B' runs after the stack is empty, thanks to the event loop.

**Diagram:**
```
[Call Stack] ←→ [Event Loop] ←→ [Task Queues]
```

---

### 338. What is the difference between process.nextTick and setImmediate?
- `process.nextTick()` (Node.js): Schedules a callback to run **after the current operation**, before any I/O or timers. Runs before microtasks.
- `setImmediate()`: Schedules a callback to run **on the next event loop iteration**, after I/O events.

**Example:**
```js
process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'));
console.log('main');
// Output: main, nextTick, setImmediate
```

---

### 339. What is the difference between microtasks and macrotasks?
- **Microtasks:** Promise callbacks, `process.nextTick`, MutationObserver.
- **Macrotasks:** setTimeout, setInterval, setImmediate, I/O events.
- Microtasks are executed **after the current script** and **before the next event loop tick**.

**Order Example:**
```js
console.log('A');
Promise.resolve().then(() => console.log('B'));
setTimeout(() => console.log('C'), 0);
console.log('D');
// Output: A, D, B, C
```

---

### 340. What is the difference between requestAnimationFrame and setTimeout?
- `requestAnimationFrame`: Schedules a callback to run **before the next repaint** (best for animations, synced with display refresh).
- `setTimeout`: Schedules a callback after a minimum delay (not synced with rendering, may cause jank in animations).

**Example:**
```js
requestAnimationFrame(() => {
  // Smooth animation step
});
setTimeout(() => {
  // May run out of sync with frames
}, 16);
```

---

### 341. What is the difference between innerHTML and textContent?
- `innerHTML`: Gets/sets HTML markup (parses HTML tags).
- `textContent`: Gets/sets plain text (ignores HTML tags).

**Example:**
```js
div.innerHTML = '<b>Hello</b>';
div.textContent = '<b>Hello</b>';
// innerHTML renders bold, textContent shows tags as text
```

---

### 342. What is the difference between appendChild and insertBefore?
- `appendChild`: Adds a node as the last child of a parent.
- `insertBefore`: Inserts a node before a specified child node.

**Example:**
```js
parent.appendChild(child); // at end
parent.insertBefore(child, parent.firstChild); // at beginning
```

---

### 343. What is the difference between cloneNode and createElement?
- `cloneNode`: Copies an existing node (optionally deep clone with children).
- `createElement`: Creates a new element from scratch.

**Example:**
```js
const original = document.createElement('div');
const copy = original.cloneNode(); // shallow copy
const newElem = document.createElement('div'); // new
```

---

### 344. What is the difference between getBoundingClientRect and offsetTop?
- `getBoundingClientRect()`: Returns the size and position of an element **relative to the viewport** (fractional values, includes transforms).
- `offsetTop`: Returns the distance from the element's top to its **offset parent** (integer, layout only).

**Example:**
```js
const rect = elem.getBoundingClientRect();
console.log(rect.top); // from viewport top
console.log(elem.offsetTop); // from offset parent
```

---

### 345. What is the difference between addEventListener and attachEvent?
- `addEventListener`: Standard method for adding event listeners (all modern browsers, supports multiple handlers, capturing/bubbling).
- `attachEvent`: Old IE-only method (no capturing, only bubbling, single handler per event).

**Example:**
```js
elem.addEventListener('click', handler);
// elem.attachEvent('onclick', handler); // IE8 and below only
```

---

### 346. What is the difference between event.target and event.currentTarget?
- `event.target`: The actual element that triggered the event.
- `event.currentTarget`: The element whose event listener is currently being executed.

**Example:**
```js
div.addEventListener('click', function(e) {
  console.log(e.target, e.currentTarget);
});
```

---

### 347. What is the difference between stopPropagation and stopImmediatePropagation?
- `stopPropagation()`: Stops the event from bubbling up further.
- `stopImmediatePropagation()`: Stops bubbling **and** prevents any more listeners on the same element from running.

**Example:**
```js
div.addEventListener('click', e => {
  e.stopPropagation();
  // Other click listeners on div still run
});
div.addEventListener('click', e => {
  e.stopImmediatePropagation();
  // No other click listeners on div will run
});
```

---

### 348. What is the difference between passive and non-passive event listeners?
- **Passive:** Listener promises not to call `preventDefault()`. Improves scroll performance.
- **Non-passive:** Listener may call `preventDefault()`.

**Example:**
```js
document.addEventListener('touchmove', handler, { passive: true });
```

---

### 349. What is the difference between capturing and bubbling phase?
- **Capturing:** Event travels from root to target (down the tree).
- **Bubbling:** Event travels from target up to root (up the tree).

**Example:**
```js
document.addEventListener('click', handler, true); // capturing
button.addEventListener('click', handler); // bubbling
```

**Diagram:**
```
Capturing:   document → parent → child
Bubbling:    child → parent → document
```

---

### 350. What is the difference between clientX/clientY and pageX/pageY?
- `clientX/clientY`: Coordinates **relative to the viewport** (visible area of the page).
- `pageX/pageY`: Coordinates **relative to the whole document** (includes scroll offset).

**Example:**
```js
document.addEventListener('click', e => {
  console.log('client:', e.clientX, e.clientY);
  console.log('page:', e.pageX, e.pageY);
});
```

---
