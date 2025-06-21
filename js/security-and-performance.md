# 14. Security – JavaScript Interview Q&A

---

### 401. What is XSS and how do you prevent it?
**Cross-Site Scripting (XSS)** is a vulnerability where attackers inject malicious scripts into web pages viewed by other users. These scripts can steal cookies, hijack sessions, deface pages, or perform actions on behalf of the user.

**Types of XSS:**
- **Stored XSS:** Malicious script is stored on the server (e.g., in a database) and served to users.
- **Reflected XSS:** Script is reflected off the server (e.g., in a URL parameter).
- **DOM-based XSS:** Vulnerability exists in client-side JS code.

**Prevention:**
- Always escape and sanitize user input (use libraries like DOMPurify).
- Use `textContent` instead of `innerHTML` for user data.
- Set a strong Content Security Policy (CSP) to block inline scripts.
- Validate and encode data on both client and server.

**Example:**
```js
// Safe
div.textContent = userInput;

// Unsafe (vulnerable to XSS)
div.innerHTML = userInput;
```
**Scenario:** A comment form that renders user input with `innerHTML` allows an attacker to post `<script>alert(document.cookie)</script>`, stealing cookies from all who view it.

---

### 402. What is CSRF and how do you prevent it?
**Cross-Site Request Forgery (CSRF)** tricks authenticated users into submitting unwanted actions (like fund transfers) without their consent.

**How it works:** An attacker lures a user (who is logged into a bank) to click a link or submit a form that triggers a sensitive action on the bank site using the user's cookies.

**Prevention:**
- Use CSRF tokens: unique, unpredictable values in forms/requests, validated server-side.
- Check `Origin` and `Referer` headers.
- Use `SameSite` cookies to restrict cross-origin requests.

**Scenario:** A malicious site submits a POST request to your bank's transfer endpoint. Without CSRF protection, the bank processes it using your session.

---

### 403. How do you securely handle user input?
- **Validate:** Check that input matches expected format (e.g., email regex).
- **Sanitize:** Remove or escape dangerous characters (e.g., `<`, `>`, quotes).
- **Allow-list:** Only permit known-good values (e.g., country codes).
- **Never trust client-side validation alone:** Always validate on the server.

**Example:**
```js
// Remove HTML tags
const safe = input.replace(/<[^>]*>?/gm, '');
```
**Scenario:** Prevent SQL injection, XSS, and logic errors by not trusting anything from the user.

---

### 404. What is Content Security Policy (CSP)?
CSP is a browser security feature that restricts which sources of scripts, styles, images, etc., can be loaded. It helps prevent XSS by blocking inline scripts and unauthorized resources.

**How to use:** Set the `Content-Security-Policy` HTTP header.

**Example:**
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.example.com
```
**Scenario:** Even if an attacker injects `<script>`, CSP blocks its execution unless it comes from an allowed source.

---

### 405. What is CORS?
**Cross-Origin Resource Sharing (CORS)** controls how browsers allow web pages to make requests to domains other than their own.

**Why needed:** By default, browsers block AJAX requests to other origins for security.

**How to enable:** The server must send headers like:
```
Access-Control-Allow-Origin: https://trusted-site.com
Access-Control-Allow-Methods: GET, POST
```
**Scenario:** A React app on `localhost:3000` fetches data from an API on `api.example.com`. The API must allow CORS for the React app.

---

### 406. What is clickjacking?
Clickjacking tricks users into clicking on something different from what they see, often by overlaying transparent iframes.

**Prevention:**
- Use `X-Frame-Options: DENY` or `SAMEORIGIN` headers.
- Use CSP's `frame-ancestors` directive.

**Scenario:** An attacker embeds your bank's transfer page in a hidden iframe and tricks you into clicking “Transfer” while thinking you’re clicking a game button.

---

### 407. What is the Same-Origin Policy?
A browser security policy that restricts scripts on one origin (domain, protocol, port) from accessing data on another.

**Example:**
- JS on `https://example.com` cannot access cookies, localStorage, or DOM of `https://evil.com`.

**Scenario:** Prevents a malicious site from reading your email from another tab.

---

### 408. What is the difference between HTTP and HTTPS?
- **HTTP:** Data sent in plain text; vulnerable to eavesdropping and MITM attacks.
- **HTTPS:** Data encrypted with TLS/SSL; protects confidentiality and integrity.

**Scenario:** Always use HTTPS for any sensitive data (logins, payments, personal info).

---

### 409. How do you store sensitive data in the browser?
- **Avoid if possible:** Sensitive data should not be stored in the browser.
- **If necessary:** Use `sessionStorage` (cleared on tab close), encrypt values, and use Secure/HttpOnly cookies for server-side session IDs.
- **Never:** Store passwords, tokens, or secrets in `localStorage` or `sessionStorage`—these are accessible via JS and vulnerable to XSS.

**Scenario:** Store only short-lived, non-critical data in the browser.

---

### 410. What is cookie security?
- **Secure:** Only sent over HTTPS.
- **HttpOnly:** Not accessible via JS (protects from XSS).
- **SameSite:** Restricts cross-site sending (helps prevent CSRF).

**Example:**
```
Set-Cookie: sessionId=abc; Secure; HttpOnly; SameSite=Strict
```

---

### 411. What is HttpOnly cookie?
A cookie with the `HttpOnly` attribute cannot be accessed via JavaScript (`document.cookie`). It is only sent in HTTP requests, protecting it from being stolen via XSS.

**Scenario:** Use for session tokens.

---

### 412. What is Secure cookie?
A cookie with the `Secure` flag is only sent over HTTPS, preventing it from being intercepted on insecure networks.

---

### 413. What is the difference between localStorage and sessionStorage?
- **localStorage:** Data persists even after closing the browser; shared across all tabs of the same origin.
- **sessionStorage:** Data persists only for the duration of the page session (tab/window); not shared across tabs.

**Scenario:** Use `localStorage` for user preferences, `sessionStorage` for temporary data.

---

### 414. What is the difference between storage event and change event?
- **storage event:** Fired on other tabs/windows when localStorage/sessionStorage changes.
- **change event:** Used for form fields, not storage APIs.

**Example:**
```js
window.addEventListener('storage', e => {
  console.log('Storage changed:', e.key, e.newValue);
});
```
**Scenario:** Useful for syncing state across tabs.

---

### 415. How do you prevent session fixation?
- Regenerate session IDs after login.
- Invalidate old session IDs.
- Use Secure and HttpOnly cookies.

**Scenario:** Prevents an attacker from setting a known session ID for a victim and hijacking their session.

---

### 416. What is open redirect?
An open redirect occurs when a web app redirects users to a URL specified by user input, allowing attackers to redirect to malicious sites.

**Prevention:**
- Validate redirect URLs against a whitelist.
- Never redirect based on untrusted input.

**Scenario:** Phishing attacks that redirect users to fake login pages.

---

### 417. What is a security audit?
A security audit is a systematic review of code, configurations, and infrastructure to identify vulnerabilities.

**How it's done:**
- Manual code review
- Automated tools (ESLint security plugins, Snyk, npm audit)
- Penetration testing

**Scenario:** Regular audits catch vulnerabilities before attackers do.

---

### 418. What is a penetration test?
A penetration test (pen test) is a simulated cyberattack performed by ethical hackers to identify exploitable vulnerabilities in a system.

**Scenario:** A company hires a security firm to try to break into their app and report weaknesses before real attackers do.

---

# 15. Performance & Optimization – JavaScript Interview Q&A

---

### 419. How do you optimize JavaScript performance?
- Minimize DOM manipulation: Batch changes, use DocumentFragments.
- Use event delegation: Attach one listener to a parent instead of many to children.
- Debounce/throttle expensive operations: Prevent unnecessary function calls.
- Use lazy loading and code splitting: Load code/resources only when needed.
- Profile and optimize hot code paths: Use DevTools, avoid blocking the main thread.

**Example:**
```js
// Debounce an input handler to reduce API calls
input.addEventListener('input', debounce(update, 200));
```
**Scenario:** Infinite scroll, live search, and heavy animations benefit from these optimizations.

---

### 420. What is lazy loading?
Lazy loading is the practice of loading resources (images, scripts, data) only when they are needed, not on initial page load.

**Example:**
```js
<img loading="lazy" src="image.jpg">
```
**Scenario:** Improves initial load time for image-heavy sites by loading images as they enter the viewport.

---

### 421. What is code splitting?
Code splitting breaks up your codebase into smaller chunks that can be loaded on demand, reducing initial bundle size.

**Example:**
```js
import('./analytics.js').then(mod => mod.track());
```
**Scenario:** A dashboard app loads analytics code only when the analytics panel is opened.

---

### 422. What is tree shaking?
Tree shaking is the removal of unused code during the build process. Modern bundlers (Webpack, Rollup) analyze ES6 module imports/exports to exclude dead code.

**Best practices:**
- Use ES6 modules (`import`/`export`)
- Avoid side effects in modules

---

### 423. What is minification?
Minification compresses code by removing whitespace, comments, and shortening variable names, reducing file size and improving load times.

**Example:**
```js
// Before
function add(a, b) { return a + b; }
// After
function add(a,b){return a+b}
```

---

### 424. What is dead code elimination?
Dead code elimination removes code that is never executed (e.g., after a `return` or in `if (false)` blocks).

**Example:**
```js
if (false) { console.log('never runs'); }
```
**Scenario:** Reduces bundle size and improves performance.

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
**Scenario:** Caching results of API calls or heavy computations.

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
**Scenario:** Only send an API request after the user stops typing.

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
**Scenario:** Limit scroll or resize event handlers to run at most every 100ms.

---

### 429. What is the difference between debounce and throttle?
- **Debounce:** Waits for a pause in activity before running the function.
  - **Use case:** Search input (wait for user to stop typing).
- **Throttle:** Runs the function at regular intervals, regardless of activity.
  - **Use case:** Scroll or resize events (limit rate).

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
**Scenario:** Asynchronous code is essential for non-blocking UI and network requests.

---

### 431. How do you profile JavaScript code?
- Use browser DevTools (Performance/Profiler tab) to record and analyze CPU/memory usage.
- Use `console.time()` and `console.timeEnd()` for custom timing.
- Look for bottlenecks, memory leaks, and optimize hot paths.

**Scenario:** Identify slow rendering or memory leaks in a React app.

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
**Scenario:** Use `DOMContentLoaded` for early JS initialization.

---

### 435. What is prefetching?
Prefetching loads resources (scripts, images, data) in advance so they're ready when needed, improving perceived performance.

**Example:**
```html
<link rel="prefetch" href="/next-page.html">
```
**Scenario:** Prefetch next page resources while user reads the current page.

---

### 436. What is prerendering?
Prerendering loads and renders a page in the background before the user navigates to it, making navigation instant.

**Example:**
```html
<link rel="prerender" href="/next-page.html">
```
**Scenario:** Used for anticipated navigation, e.g., search results.

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
**Scenario:** PWAs use service workers for offline functionality.

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
