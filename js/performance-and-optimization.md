# 15. Performance & Optimization – JavaScript Interview Q&A

---

### 419. How do you optimize JavaScript performance?
Optimizing JavaScript performance is crucial for delivering fast, responsive, and scalable web applications. Here are comprehensive strategies, with explanations and examples:

#### 1. Minimize DOM Manipulation
- **Why:** Direct DOM changes are slow because they trigger reflows and repaints.
- **How:**
  - Batch DOM updates together.
  - Use `DocumentFragment` to build off-DOM and append once.
  - Minimize layout thrashing (reading and writing layout properties in the same frame).

**Example:**
```js
// Inefficient
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div); // Triggers reflow each time
}

// Efficient
const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  frag.appendChild(div);
}
document.body.appendChild(frag); // Single reflow
```

#### 2. Use Event Delegation
- Attach a single event listener to a parent instead of many children.
- Reduces memory and improves performance for dynamic lists.

**Example:**
```js
document.getElementById('list').addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    // Handle click
  }
});
```

#### 3. Debounce and Throttle Expensive Operations
- **Debounce:** Wait for user to stop typing before firing search/API calls.
- **Throttle:** Limit how often a function runs (e.g., scroll/resize handlers).

**Example:**
```js
input.addEventListener('input', debounce(update, 200));
window.addEventListener('scroll', throttle(handleScroll, 100));
```

#### 4. Lazy Loading & Code Splitting
- Load only what’s needed, when it’s needed. Improves initial load time.

#### 5. Profile and Optimize Hot Code Paths
- Use Chrome DevTools Performance tab, Lighthouse, or WebPageTest.
- Identify bottlenecks, memory leaks, and optimize them.

#### 6. Reduce JavaScript Bundle Size
- Remove unused libraries, use tree shaking, minification, and compression.

#### 7. Use Efficient Data Structures and Algorithms
- Choose the right data structures (e.g., Map vs Array for lookups).

#### 8. Leverage Browser Caching and CDN
- Cache static assets and serve them from a CDN for global performance.

#### Real-World Analogy
Think of your web app as a restaurant: prepping ingredients (data) in advance, batching orders (DOM updates), and only serving what’s needed (lazy loading) keeps things running smoothly and customers happy.

#### Best Practices
- Avoid blocking the main thread with heavy computations (offload to Web Workers if needed).
- Use async/await for non-blocking code.
- Monitor with real user monitoring (RUM) tools.

---

---

### 420. What is lazy loading?
Lazy loading is a performance optimization technique where resources (images, scripts, components, or data) are loaded only when they are needed, rather than upfront. This reduces initial page load time and bandwidth usage, making the application faster and more responsive.

#### How it works
- **Images:** Only load images as they enter the viewport (visible area).
- **Modules/Scripts:** Load JavaScript chunks when a feature is accessed.
- **Data:** Fetch data only when the user navigates to a section.

#### Real-World Scenario
On a long article page with many images, only the images near the top are loaded initially. As the user scrolls, more images are loaded on demand.

#### Example: Native Image Lazy Loading
```html
<img loading="lazy" src="large-photo.jpg" alt="...">
```

#### Example: Lazy Loading JavaScript Modules (Dynamic Import)
```js
button.addEventListener('click', async () => {
  const module = await import('./expensiveFeature.js');
  module.run();
});
```

#### Analogy
Lazy loading is like ordering food at a restaurant only when you’re hungry, instead of ordering the entire menu at once.

#### Best Practices
- Use native browser features when available (`loading="lazy"` for images/iframes).
- For older browsers, use Intersection Observer API for custom lazy loading.
- Combine with code splitting for maximum effect.

---

---

### 421. What is code splitting?
Code splitting is a technique (supported by modern build tools like Webpack, Rollup, Parcel) that splits your codebase into multiple bundles or "chunks". Only the necessary code is loaded initially, and additional code is loaded as needed, improving initial load performance and reducing time-to-interactive.

#### Why use code splitting?
- Large JavaScript bundles slow down the initial load.
- Users may never visit certain parts of your app, so there’s no need to load all code upfront.

#### Types of Code Splitting
1. **Entry Point Splitting:** Separate bundles for different pages/routes.
2. **Dynamic Import Splitting:** Load code on demand when a feature is accessed.
3. **Vendor Splitting:** Separate third-party libraries from app code.

#### Example: Dynamic Import
```js
// Only loads analytics code if user opens analytics panel
button.addEventListener('click', async () => {
  const mod = await import('./analytics.js');
  mod.track();
});
```

#### Real-World Scenario
In a dashboard app, the admin panel code is only loaded when an admin logs in, not for every user.

#### Analogy
Code splitting is like packing your suitcase in sections—only opening the section you need, when you need it, instead of dumping everything out at once.

#### Best Practices
- Use dynamic imports for rarely-used features.
- Split vendor and app code for better caching.
- Monitor bundle sizes with tools like Webpack Bundle Analyzer.

---

---

### 422. What is tree shaking?
Tree shaking is a build optimization technique that eliminates unused (dead) code from your final JavaScript bundle. The term comes from the idea of shaking a tree and having the dead leaves (unused code) fall off, leaving only what’s needed.

#### How it works
- Modern bundlers (Webpack, Rollup) analyze ES6 module import/export statements.
- If a function, class, or variable is never imported or used, it’s excluded from the final bundle.

#### Example
Suppose you have a utility library:
```js
// utils.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
```
If you only import `add`:
```js
import { add } from './utils';
console.log(add(2, 3));
```
With tree shaking, `subtract` is not included in the bundle.

#### Best Practices
- Use ES6 modules (`import`/`export`), not CommonJS (`require`).
- Avoid side effects in modules (e.g., code that runs on import).
- Mark side-effect-free modules in `package.json` (`sideEffects: false`).

#### Real-World Scenario
Tree shaking is essential for modern frameworks (React, Angular, Vue) to keep production bundles small.

#### Analogy
It’s like packing only the clothes you’ll wear on a trip, instead of your whole closet.

---

### 423. What is minification?
Minification is the process of removing all unnecessary characters from source code (like whitespace, comments, and long variable names) without changing its functionality. This reduces file size and improves download and execution speed.

#### How it works
- Removes comments and whitespace.
- Shortens variable and function names.
- May optimize expressions and remove unreachable code.

#### Example
```js
// Original code
function add(a, b) {
  // Adds two numbers
  return a + b;
}

// Minified code
function add(a,b){return a+b}
```

#### Tools
- UglifyJS, Terser, Google Closure Compiler, SWC.

#### Real-World Scenario
Minification is used in production builds to reduce bandwidth and improve page load time.

#### Analogy
It’s like removing all the spaces and vowels from a text message to save on SMS charges.

#### Best Practices
- Always minify code before deploying to production.
- Use source maps to debug minified code.

---

---

### 424. What is dead code elimination?
Dead code elimination removes code that is never executed (e.g., after a `return` or in `if (false)` blocks).

**Example:**
```js
if (false) { console.log('never runs'); }
```

---

### 425. What is memoization?
Memoization caches the results of expensive function calls based on their arguments, so repeated calls with the same input return the cached result.

**Example:**
```js
function memoize(fn) {
  const cache = {};
  return function(x) {
    if (x in cache) return cache[x];
    return cache[x] = fn(x);
  };
}
```

---

### 426. How do you reduce memory leaks?
- Remove unused event listeners and intervals.
- Avoid global variables.
- Use weak references (`WeakMap`, `WeakSet`) for objects that may be garbage collected.
- Profile memory usage with browser DevTools.

**Scenario:** Single-page apps that never clean up listeners can leak memory and slow down over time.

---

### 427. What is debouncing?
Debouncing ensures a function is called only after a certain period of inactivity. Useful for search boxes or resize events.

**Example:**
```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

---

### 428. What is throttling?
Throttling ensures a function is called at most once every specified interval, regardless of how many times the event fires.

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
```

---

### 429. What is the difference between debounce and throttle?
- **Debounce:** Waits for a pause in activity before running the function (e.g., search input).
- **Throttle:** Runs the function at regular intervals, regardless of activity (e.g., scroll events).

---

### 430. What is the difference between synchronous and asynchronous code?
- **Synchronous:** Code executes line by line, blocking further execution until complete.
- **Asynchronous:** Code executes independently, allowing other operations to continue (e.g., setTimeout, Promises, async/await).

**Example:**
```js
console.log('A');
setTimeout(() => console.log('B'), 0);
console.log('C');
// Output: A, C, B
```

---

### 431. How do you profile JavaScript code?
- Use browser DevTools (Performance/Profiler tab) to record and analyze CPU/memory usage.
- Use `console.time()` and `console.timeEnd()` for custom timing.
- Look for bottlenecks, memory leaks, and optimize hot paths.

---

### 432. What is the difference between repaint and reflow?
- **Repaint:** Changes to styles (color, visibility) that don’t affect layout.
- **Reflow:** Changes that affect layout (adding/removing elements, resizing).

**Optimization:** Minimize reflows by batching DOM changes and using CSS classes.

---

### 433. What is critical rendering path?
The critical rendering path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels on the screen. Optimizing it reduces time to first paint.

**Steps:**
1. Parse HTML → DOM
2. Parse CSS → CSSOM
3. Combine DOM + CSSOM → Render Tree
4. Layout → Paint

**Scenario:** Minimize render-blocking resources for faster load.

---

### 434. What is the difference between DOMContentLoaded and load event?
- **DOMContentLoaded:** Fired when HTML is parsed and DOM is ready (no waiting for images/styles).
- **load:** Fired when all resources (images, CSS, scripts) are loaded.

**Example:**
```js
document.addEventListener('DOMContentLoaded', () => {...});
window.addEventListener('load', () => {...});
```

---

### 435. What is prefetching?
Prefetching loads resources (scripts, images, data) in advance so they're ready when needed, improving perceived performance.

**Example:**
```html
<link rel="prefetch" href="/next-page.html">
```

---

### 436. What is prerendering?
Prerendering loads and renders a page in the background before the user navigates to it, making navigation instant.

**Example:**
```html
<link rel="prerender" href="/next-page.html">
```

---

### 437. What is service worker caching?
Service workers intercept network requests and can cache responses, enabling offline support and faster loads.

**Example:**
```js
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
```

---

### 438. What is the difference between cache and localStorage?
- **Cache (Cache API):** Stores HTTP responses, used by service workers for offline resources.
- **localStorage:** Stores key-value pairs as strings, accessible via JS.

**Scenario:** Use Cache API for static assets, localStorage for user settings.

---

### 439. What is the difference between memory cache and disk cache?
- **Memory cache:** Fast, volatile, cleared when browser closes.
- **Disk cache:** Persistent, slower, survives browser restarts.

**Scenario:** Browsers use both to optimize loading speed.

---

### 440. What is the difference between CDN and local server?
- **CDN:** Globally distributed servers, reduce latency, improve reliability and speed.
- **Local server:** Single location, slower for distant users.

**Scenario:** Use CDNs for libraries, images, and static assets.

---

### 441. What is the difference between HTTP/1.1 and HTTP/2?
- **HTTP/1.1:** Sequential requests, head-of-line blocking, no multiplexing.
- **HTTP/2:** Multiplexed streams, header compression, faster parallel loading.

**Scenario:** HTTP/2 significantly improves performance for modern web apps.

---

### 442. What is the difference between GET and POST?
- **GET:** Requests data from a server; parameters are in the URL; safe and idempotent; used for fetching resources.
- **POST:** Sends data to a server to create/update resources; parameters are in the request body; not idempotent; used for form submissions.

---

### 443. What is the difference between PUT and PATCH?
- **PUT:** Replaces the entire resource with the provided data; idempotent.
- **PATCH:** Updates part of a resource; not required to be idempotent.

---

### 444. What is the difference between REST and GraphQL?
- **REST:** Uses multiple endpoints for different resources; fixed data structure per endpoint; over/under-fetching possible.
- **GraphQL:** Single endpoint; clients specify exactly what data they need; reduces over/under-fetching.

---

### 445. What is the difference between SPA and MPA?
- **SPA (Single Page Application):** Loads a single HTML page and dynamically updates content; faster navigation, better UX; e.g., React, Angular apps.
- **MPA (Multi Page Application):** Each page is a separate HTML document; full page reloads; better for SEO and large sites.

---

### 446. What is the difference between SSR and CSR?
- **SSR (Server-Side Rendering):** HTML is rendered on the server and sent to the client; faster first paint, better SEO.
- **CSR (Client-Side Rendering):** HTML is rendered in the browser using JS; slower first paint, but faster navigation after initial load.

---

### 447. What is the difference between hydration and rendering?
- **Rendering:** Creating HTML from JS or templates (can happen server-side or client-side).
- **Hydration:** Attaching event listeners and making static HTML interactive after SSR.

---

### 448. What is the difference between hydration and rehydration?
- **Hydration:** Initial process of making SSR HTML interactive.
- **Rehydration:** Process of re-attaching or updating interactivity after navigation or updates (e.g., in client-side routing).

---

### 449. What is the difference between hydration and hydration?
This is likely a duplicate question; see above for hydration and rehydration distinctions.

---

### 450. What is the difference between hydration and hydration?
This is likely a duplicate question; see above for hydration and rehydration distinctions.

---
