## 7. Asynchronous JavaScript

---

### 156. What is a callback function?
A callback function is a function passed as an argument to another function, to be executed later, often after an asynchronous operation completes. Callbacks enable non-blocking code and are foundational for async programming in JavaScript.

**Analogy:** Think of leaving your phone number with a restaurant for a table. When your table is ready (the async event), they call you back.

**Example:**
```js
function fetchData(callback) {
  setTimeout(() => {
    callback('Data loaded!');
  }, 1000);
}
fetchData(result => console.log(result)); // Logs after 1 second
```
**Best Practice:** Use named functions for callbacks to improve readability and debugging.

---

### 157. What is a Promise?
A Promise is a built-in JavaScript object representing the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises make async code easier to read and maintain by avoiding deeply nested callbacks (callback hell).

**Analogy:** A Promise is like ordering something online: you get a receipt (the promise), and later it will either be delivered (fulfilled) or canceled (rejected).

**Key Features:**
- Chainable with `.then()` and `.catch()`
- Immutable once settled

---

### 158. How do you create and use a Promise?
You create a Promise with the `new Promise` constructor, which takes an executor function with `resolve` and `reject` callbacks.

**Example:**
```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) resolve('Success!');
    else reject('Failure!');
  }, 1000);
});
p.then(result => console.log('Resolved:', result))
 .catch(error => console.error('Rejected:', error));
```
**Note:** Always handle both success and error with `.then()` and `.catch()`.

---

### 159. What are the possible states of a Promise?
- **Pending:** Initial state; neither fulfilled nor rejected.
- **Fulfilled (Resolved):** Operation completed successfully.
- **Rejected:** Operation failed.

Once a promise is fulfilled or rejected, it becomes settled and cannot change state.

---

### 160. What is `Promise.all`?
`Promise.all` takes an iterable of promises and returns a new promise that resolves when all input promises resolve, or rejects if any promise rejects.

**Example:**
```js
Promise.all([
  fetch('/api/one'),
  fetch('/api/two')
]).then(([res1, res2]) => {
  // Both requests completed
}).catch(err => {
  // At least one failed
});
```
**Use Case:** Waiting for multiple independent async operations to finish before proceeding.

---

### 161. What is `Promise.race`?
Returns a promise that settles as soon as any input promise settles (fulfilled or rejected). The result is from the first settled promise.

**Example:**
```js
Promise.race([
  fetch('/slow'),
  fetch('/fast')
]).then(result => {
  // The first response wins
});
```
**Use Case:** Implementing timeouts or picking the fastest response.

---

### 162. What is `Promise.any`?
Resolves as soon as any input promise resolves (ignores rejections unless all reject). If all reject, returns an AggregateError.

**Example:**
```js
Promise.any([
  Promise.reject('fail'),
  Promise.resolve('first success'),
  Promise.resolve('second success')
]).then(console.log); // 'first success'
```
**Use Case:** When you want the first successful result, regardless of order.

---

### 163. What is `Promise.allSettled`?
Returns a promise that resolves after all input promises settle (either fulfilled or rejected). The result is an array of objects describing each outcome.

**Example:**
```js
Promise.allSettled([
  Promise.resolve('ok'),
  Promise.reject('fail')
]).then(results => console.log(results));
// [{status: 'fulfilled', value: 'ok'}, {status: 'rejected', reason: 'fail'}]
```
**Use Case:** When you want to know the result of all promises, regardless of failure.

---

### 164. What is the event loop?
The event loop is a mechanism that allows JavaScript (which is single-threaded) to perform non-blocking operations by offloading tasks to the browser or Node.js and running callbacks from a queue when the stack is clear.

**Analogy:** Like a chef (the JS engine) working on one dish at a time, but with helpers (browser APIs) preparing ingredients in the background and notifying the chef when they're ready.

**Key Point:** The event loop checks the call stack and the task queues (macrotasks and microtasks) to decide what to execute next.

---

### 165. What is the call stack?
The call stack is a stack data structure that records the function calls in your program. Each function call is pushed onto the stack, and popped off when it returns.

**Example:**
```js
function a() { b(); }
function b() { c(); }
function c() { console.log('done'); }
a();
// Stack: a -> b -> c
```
**Note:** Stack overflow occurs if too many nested calls are made.

---

### 166. What are microtasks and macrotasks?
- **Microtasks:** Executed after the current script and before the next macrotask. Includes promise callbacks, `queueMicrotask`, and `MutationObserver`.
- **Macrotasks:** Scheduled by APIs like `setTimeout`, `setInterval`, I/O, UI rendering.

**Order:** Microtasks are run before macrotasks. This can affect the order in which code executes.

**Example:**
```js
setTimeout(() => console.log('macrotask'), 0);
Promise.resolve().then(() => console.log('microtask'));
console.log('script');
// Output: 'script', 'microtask', 'macrotask'
```

---

### 167. How does async/await work?
`async`/`await` is syntactic sugar over Promises, making asynchronous code look synchronous and easier to read.
- `async` marks a function as returning a Promise.
- `await` pauses execution until the awaited Promise settles.

**Example:**
```js
async function getData() {
  try {
    const response = await fetch('https://api.example.com');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
  }
}
```
**Best Practice:** Always use `try/catch` for error handling with `await`.

---

### 168. How do you handle errors in async/await?
Wrap `await` calls in a `try...catch` block. This catches both synchronous errors and rejected promises.

**Example:**
```js
async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP error');
    return await res.json();
  } catch (e) {
    console.error('Failed:', e);
    throw e; // or handle gracefully
  }
}
```
**Tip:** For multiple awaits, you can wrap each in its own try/catch or use one for the whole function.

---

### 169. What is callback hell and how do you avoid it?
**Callback Hell** refers to deeply nested callbacks, making code hard to read, maintain, and debug.

**Example (callback hell):**
```js
getUser(id, function(user) {
  getPosts(user, function(posts) {
    getComments(posts, function(comments) {
      // ...
    });
  });
});
```
**How to avoid:**
- Use Promises to flatten nesting:
```js
getUser(id)
  .then(getPosts)
  .then(getComments)
  .then(...)
  .catch(...);
```
- Use `async/await` for linear code:
```js
async function main() {
  const user = await getUser(id);
  const posts = await getPosts(user);
  const comments = await getComments(posts);
}
```

---

### 170. What is the difference between setTimeout and setInterval?
- `setTimeout(fn, ms)`: Executes `fn` once after `ms` milliseconds.
- `setInterval(fn, ms)`: Executes `fn` repeatedly every `ms` milliseconds until cleared.

**Example:**
```js
setTimeout(() => console.log('Once after 1s'), 1000);
const intervalId = setInterval(() => console.log('Every 1s'), 1000);
setTimeout(() => clearInterval(intervalId), 5000); // Stop after 5s
```

---

### 171. What is the difference between process.nextTick and setImmediate?
- `process.nextTick`: Schedules a callback to run after the current operation, before any I/O events (Node.js only).
- `setImmediate`: Schedules a callback to run on the next iteration of the event loop, after I/O events.

**Example:**
```js
process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'));
console.log('main');
// Output: main, nextTick, setImmediate
```

---

### 172. How do you create a delay/sleep function?
You can create a sleep function using a Promise and `setTimeout`:
```js
function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function demo() {
  console.log('Wait...');
  await sleep(1000);
  console.log('1 second later');
}
demo();
```

---

### 173. What is the difference between synchronous and asynchronous code?
- **Synchronous:** Code executes in sequence, blocking the thread until each operation completes.
- **Asynchronous:** Code executes non-blockingly, allowing other operations to proceed while waiting for tasks to finish.

**Example:**
```js
// Synchronous
console.log('A');
console.log('B');
// Asynchronous
setTimeout(() => console.log('C'), 0);
console.log('D');
// Output: A, B, D, C
```

---

### 174. How do you make an HTTP request in JavaScript?
- **Browser:** Use `fetch` (modern), `XMLHttpRequest` (legacy)
- **Node.js:** Use `http`/`https` modules or third-party libraries like `axios`.

**Example (fetch):**
```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
**Tip:** Always handle errors to avoid unhandled Promise rejections.

---

### 175. What is fetch API?
The Fetch API is a modern, promise-based API for making HTTP requests in browsers. It replaces `XMLHttpRequest` for most use cases.
- Supports promises, streaming, and easier syntax.

**Example:**
```js
async function getUser() {
  const response = await fetch('https://api.example.com/user');
  if (!response.ok) throw new Error('Failed!');
  const user = await response.json();
  return user;
}
```
**Note:** Fetch only rejects on network errors, not HTTP errors (400/500), so check `response.ok`.

---

### 176. How do you cancel a fetch request?
Use `AbortController` to signal cancellation:
```js
const controller = new AbortController();
fetch(url, { signal: controller.signal })
  .then(...)
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Request was cancelled');
    }
  });
controller.abort(); // Cancels the request
```
**Use Case:** Canceling slow or unnecessary requests in UIs.

---

### 177. What is XMLHttpRequest?
An older API for making HTTP requests in browsers. More verbose and callback-based than `fetch`.

**Example:**
```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com');
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log('Success:', xhr.responseText);
  }
};
xhr.onerror = () => console.error('Error');
xhr.send();
```
**Note:** Use `fetch` for modern code unless legacy support is needed.

---

### 178. What is JSONP?
JSONP (JSON with Padding) is a technique for making cross-domain requests by injecting a `<script>` tag. The server returns JavaScript code that calls a callback function. It only supports GET requests and has security risks.

**Example:**
```html
<script src="https://example.com/data?callback=myCallback"></script>
<script>
function myCallback(data) { console.log(data); }
</script>
```
**Note:** Avoid using JSONP in new code; use CORS instead.

---

### 179. What is CORS?
CORS (Cross-Origin Resource Sharing) is a browser security feature that restricts web pages from making requests to a different domain unless the server explicitly allows it via HTTP headers.

**Example:**
```http
Access-Control-Allow-Origin: *
```
**Best Practice:** Configure your server to send the appropriate CORS headers for allowed origins.

---

### 180. How do you handle CORS errors?
- Ensure the server sends the correct CORS headers.
- Use a backend proxy to relay requests if you can't change the server.
- For development, some browsers allow disabling CORS (not recommended for production).

**Example:**
If you see "No 'Access-Control-Allow-Origin' header" errors, check server configuration.

---

### 181. What is long polling?
Long polling is a technique where the client makes a request to the server, which holds the connection open until new data is available. After receiving data, the client immediately sends another request. Used for near real-time updates before WebSockets/SSE.

**Example:**
```js
function poll() {
  fetch('/updates').then(res => res.json()).then(data => {
    // process data
    poll(); // request again
  });
}
poll();
```

---

### 182. What is Server-Sent Events (SSE)?
SSE is a browser API for receiving automatic updates from a server over HTTP. The connection remains open, and the server pushes events as text.

**Example:**
```js
const es = new EventSource('/events');
es.onmessage = e => console.log('Message:', e.data);
```
**Use Case:** Real-time dashboards, notifications, live feeds.

---

### 183. What is WebSocket?
WebSocket is a protocol for full-duplex, persistent communication between client and server. Unlike HTTP, both sides can send messages at any time.

**Example:**
```js
const ws = new WebSocket('ws://localhost:8080');
ws.onopen = () => ws.send('Hello!');
ws.onmessage = e => console.log('Received:', e.data);
```
**Use Case:** Chat apps, games, real-time collaboration.

---

### 184. How do you implement retry logic for async operations?
Use a loop or recursion with `try/catch` and a delay between retries.

**Example:**
```js
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(delay);
    }
  }
}
```
**Tip:** Exponential backoff (increase delay after each failure) is often used in production.

---

### 185. What is the difference between microtasks and macrotasks in the event loop?
- **Microtasks:** Promise callbacks, `queueMicrotask`, MutationObserver. Run after each script and before the next macrotask.
- **Macrotasks:** setTimeout, setInterval, I/O, rendering.

**Order:** Microtasks always run before the next macrotask.

**Example:**
```js
setTimeout(() => console.log('macrotask'), 0);
Promise.resolve().then(() => console.log('microtask'));
console.log('script');
// Output: script, microtask, macrotask
```

---

### 186. How do you chain Promises?
Return a Promise from `.then()` to chain further `.then()` calls, allowing sequential async operations.

**Example:**
```js
fetch('/user')
  .then(res => res.json())
  .then(user => fetch(`/posts?user=${user.id}`))
  .then(res => res.json())
  .then(posts => console.log(posts));
```
**Tip:** Always return from `.then()` to keep the chain.

---

### 187. What is the difference between Promise chaining and async/await?
- **Promise chaining:** Uses `.then()`/`.catch()`, can become nested and harder to read for complex flows.
- **async/await:** Looks synchronous, easier to read, especially for sequential async operations. Error handling is simpler with `try/catch`.

**Example:**
```js
// Promise chaining
fetch('/data').then(res => res.json()).then(...);

// async/await
async function load() {
  const res = await fetch('/data');
  const data = await res.json();
}
```

---

### 188. What is a race condition?
A race condition occurs when the outcome of a program depends on the timing or order of asynchronous operations, leading to unpredictable results.

**Example:**
```js
let data;
fetch('/api1').then(res => data = res);
fetch('/api2').then(res => data = res);
// Which fetch sets data last?
```
**Best Practice:** Use proper sequencing or locks to avoid race conditions.

---

### 189. How do you avoid race conditions in async code?
- Chain Promises or use `await` to ensure order.
- Use flags, mutexes, or atomic operations for shared state.
- Avoid shared mutable state between async tasks when possible.

**Example:**
```js
let running = false;
async function safeTask() {
  if (running) return;
  running = true;
  await doAsyncWork();
  running = false;
}
```

---

### 190. What is the difference between parallel and concurrent execution?
- **Parallel:** Multiple operations run at the exact same time (multi-core/multi-threaded).
- **Concurrent:** Multiple operations are in progress, but not necessarily running simultaneously (may be interleaved on a single thread).

**Analogy:**
- Parallel: Two people typing at the same time on different keyboards.
- Concurrent: One person quickly switching between two keyboards.

---

### Additional Interview-Relevant Questions

#### How do you handle unhandled Promise rejections?
- Always add `.catch()` to Promises.
- Use `window.onunhandledrejection` (browser) or `process.on('unhandledRejection')` (Node.js) for global handling.

**Example:**
```js
window.onunhandledrejection = function(e) {
  console.error('Unhandled rejection:', e.reason);
};
```

#### What is an async iterator?
An object implementing `Symbol.asyncIterator`, returning Promises from `next()`. Used for consuming streams of async data (e.g., paginated APIs, file streams).

**Example:**
```js
const asyncIterable = {
  async *[Symbol.asyncIterator]() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
  }
};
(async () => {
  for await (const num of asyncIterable) {
    console.log(num);
  }
})();
```

#### What is event-driven programming?
A paradigm where the flow is determined by events (user actions, messages, timers). Common in UI, servers, and Node.js.

**Example:**
```js
document.addEventListener('click', () => console.log('Clicked!'));
const emitter = require('events');
const myEmitter = new emitter();
myEmitter.on('event', () => console.log('An event occurred!'));
myEmitter.emit('event');
```

