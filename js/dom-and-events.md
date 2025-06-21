## 9. DOM & Events – JavaScript Interview Q&A

---

### 211. What is the DOM?
The **DOM (Document Object Model)** is a programming interface for HTML and XML documents. It represents the page as a hierarchical tree of nodes (elements, attributes, text). JavaScript can use the DOM to dynamically read, modify, add, or remove elements and content on the page.

**Analogy:** Think of the DOM as a family tree for your webpage—each element is a node connected to others, and you can traverse or change any part of it.

**Illustration:**
```
Document
  └── <html>
      ├── <head>
      └── <body>
          ├── <div id="main">
          │     ├── <h1>
          │     └── <p>
          └── <footer>
```
Or as a diagram:

![Simple DOM Tree](https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/api/document_object_model/dom-tree-light.svg)

---

---

### 212. How do you select elements in the DOM?
You can select elements using various DOM methods:
- `getElementById('id')` — Selects a single element by its ID.
- `getElementsByClassName('class')` — Returns a live HTMLCollection of elements with the given class.
- `getElementsByTagName('tag')` — Returns a live HTMLCollection of elements with the given tag name.
- `querySelector('selector')` — Returns the first element that matches a CSS selector.
- `querySelectorAll('selector')` — Returns a static NodeList of all elements matching a CSS selector.

**Example:**
```js
const el1 = document.getElementById('main');
const el2 = document.querySelector('.item');
const el3 = document.querySelectorAll('div > span');
```

---

### 213. What is the difference between `getElementById`, `getElementsByClassName`, `querySelector`, and `querySelectorAll`?
- `getElementById`: Returns a single element (or null) by ID.
- `getElementsByClassName`: Returns a live collection of elements with a given class.
- `querySelector`: Returns the first element that matches a CSS selector.
- `querySelectorAll`: Returns a static NodeList of all elements matching a CSS selector.

**Example:**
```js
// HTML: <div id="foo" class="bar"></div>
document.getElementById('foo'); // <div id="foo" ...>
document.getElementsByClassName('bar'); // [div.bar]
document.querySelector('#foo'); // <div id="foo" ...>
document.querySelectorAll('.bar'); // NodeList([div.bar])
```

---

### 214. How do you create and append elements?
Use `document.createElement()` to create an element, then use `appendChild` or `append` to add it to the DOM.

**Example:**
```js
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello!';
document.body.appendChild(newDiv);
```

---

### 215. How do you remove elements from the DOM?
Use `.remove()` on the element (modern browsers) or `parentNode.removeChild(element)` for compatibility.

**Example:**
```js
const el = document.getElementById('foo');
el.remove(); // Modern
// or
document.body.removeChild(el); // Older browsers
```

---

### 216. How do you change the content of an element?
Use `textContent`, `innerHTML`, or `innerText`.
- `textContent`: Sets or gets only the text (no HTML parsing).
- `innerHTML`: Sets or gets HTML content.

**Example:**
```js
div.textContent = 'Just text';
div.innerHTML = '<b>Bold text</b>';
```

---

### 217. How do you change the style of an element?
Directly set style properties via the `style` object or add/remove CSS classes.

**Example:**
```js
div.style.color = 'red';
div.classList.add('highlight');
div.classList.remove('old-style');
```

---

### 218. How do you handle events in JavaScript?
Use `addEventListener` to listen for events and execute a callback function when the event occurs.

**Example:**
```js
button.addEventListener('click', function(event) {
  alert('Button clicked!');
});
```

---

### 219. What is event delegation?
Event delegation is a technique where you attach a single event listener to a parent element instead of multiple listeners to child elements. The event bubbles up from the child to the parent, where it can be handled based on the event target.

**Example:**
```js
document.getElementById('list').addEventListener('click', function(e) {
  if (e.target.matches('li')) {
    alert('List item clicked: ' + e.target.textContent);
  }
});
```
**Use Case:** Useful for handling events on dynamic lists or elements added after page load.

---

### 220. What is event bubbling?
Event bubbling is the process where an event starts from the target element and propagates up through its ancestors (parent, grandparent, etc.), eventually reaching the root (document).

**Structure Example:**
```
Document
  └── <div id="parent">
        └── <button id="child">Click Me</button>
```

**Bubbling Flow:**
1. `button` receives the event (target)
2. Event bubbles up to `div`
3. Event bubbles up to `document`

**Diagram:**
```
User clicks <button>
  ↓
<button> → <div> → <document>
```

**Example:**
Clicking a button inside a div triggers the button's click handler first, then the div's, then the document's, etc.

---

### 221. What is event capturing?
Event capturing (also called the capture phase) is when the event starts from the root (document) and travels down through ancestors to the target element before the bubbling phase begins.

**Structure Example:**
```
Document
  └── <div id="parent">
        └── <button id="child">Click Me</button>
```

**Capturing Flow:**
1. Event starts at `document`
2. Travels down to `div`
3. Arrives at `button` (target)

**Diagram:**
```
Event dispatched
  ↓
<document> → <div> → <button>
```

**Example:**
```js
document.addEventListener('click', handler, true); // Capturing phase
```

---

### 222. How do you stop event propagation?
Use `event.stopPropagation()` to stop the event from bubbling or capturing further.

**Example:**
```js
button.addEventListener('click', function(e) {
  e.stopPropagation();
  // Only this handler runs
});
```

---

### 223. How do you prevent default behavior?
Use `event.preventDefault()` to stop the browser's default action for an event.

**Example:**
```js
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevents form from submitting
});
```

---

### 224. How do you add and remove event listeners?
Use `addEventListener` to add, and `removeEventListener` to remove event handlers.

**Example:**
```js
function handler() { alert('Clicked!'); }
button.addEventListener('click', handler);
button.removeEventListener('click', handler);
```

---

### 225. What is the difference between `addEventListener` and `onclick`?
- `addEventListener` allows multiple handlers for the same event and can specify options (capture, passive, etc.).
- `onclick` can only have one handler at a time—assigning a new one overwrites the previous.

**Example:**
```js
button.onclick = () => alert('One!');
button.onclick = () => alert('Two!'); // Only 'Two!' runs
button.addEventListener('click', () => alert('A'));
button.addEventListener('click', () => alert('B')); // Both run
```

---

### 226. What is the difference between input and change events?
- `input`: Fires every time the value of an input changes (as you type).
- `change`: Fires when the input loses focus and its value has changed.

**Example:**
```js
input.addEventListener('input', () => console.log('Typing...'));
input.addEventListener('change', () => console.log('Changed!'));
```

---

### 227. How do you trigger a custom event?
Use the `CustomEvent` constructor and `dispatchEvent` method.

**Example:**
```js
const event = new CustomEvent('myEvent', { detail: { foo: 123 } });
element.dispatchEvent(event);
```

---

### 228. What is the difference between focus and blur events?
- `focus`: Fires when an element gains focus.
- `blur`: Fires when an element loses focus.

**Example:**
```js
input.addEventListener('focus', () => console.log('Focused!'));
input.addEventListener('blur', () => console.log('Blurred!'));
```

---

### 229. How do you debounce input events?
Debouncing limits how often a function runs. Use a timer to delay execution until the user stops typing.

**Example:**
```js
let timer;
input.addEventListener('input', function() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log('Debounced value:', input.value);
  }, 300);
});
```

---

### 230. How do you throttle scroll events?
Throttling limits how often a function runs during rapid events like scrolling.

**Example:**
```js
let lastCall = 0;
window.addEventListener('scroll', function() {
  const now = Date.now();
  if (now - lastCall > 100) {
    console.log('Throttled scroll');
    lastCall = now;
  }
});
```

---

### 231. What is the difference between passive and non-passive event listeners?
- **Passive:** The handler never calls `preventDefault()`, so the browser can optimize for performance (especially for scroll/touch events).
- **Non-passive:** The handler might call `preventDefault()`.

**Example:**
```js
document.addEventListener('touchstart', handler, { passive: true });
```

---

### 232. What is the difference between capturing and bubbling phase?
- **Capturing:** Event moves from the root down to the target.
- **Bubbling:** Event moves from the target up to the root.

**Example:**
```js
div.addEventListener('click', handler, true); // Capturing
otherDiv.addEventListener('click', handler); // Bubbling (default)
```

---

### 233. How do you handle drag and drop events?
Use the Drag and Drop API (`dragstart`, `dragover`, `drop`, etc.).

**Example:**
```js
// HTML: <div id="drag" draggable="true"></div>
const drag = document.getElementById('drag');
drag.addEventListener('dragstart', e => {
  e.dataTransfer.setData('text/plain', 'Hello!');
});
dropZone.addEventListener('dragover', e => e.preventDefault());
dropZone.addEventListener('drop', e => {
  const data = e.dataTransfer.getData('text/plain');
  alert('Dropped: ' + data);
});
```

---

### 234. How do you handle keyboard events?
Listen for `keydown`, `keyup`, or `keypress` events on elements or the document.

**Example:**
```js
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    console.log('Enter pressed');
  }
});
```

---

### 235. How do you handle mouse events?
Listen for events like `click`, `dblclick`, `mousedown`, `mouseup`, `mousemove`, `mouseenter`, `mouseleave`, etc.

**Example:**
```js
div.addEventListener('click', () => console.log('Clicked!'));
div.addEventListener('mousemove', e => console.log(e.clientX, e.clientY));
```

---

### 236. What is the difference between clientX/clientY and pageX/pageY?
- `clientX`/`clientY`: Coordinates relative to the visible part of the browser window.
- `pageX`/`pageY`: Coordinates relative to the whole page (including scrolled area).

**Example:**
```js
document.addEventListener('click', e => {
  console.log('client:', e.clientX, e.clientY);
  console.log('page:', e.pageX, e.pageY);
});
```

---

### 237. What is event.target vs event.currentTarget?
- `event.target`: The actual element that triggered the event.
- `event.currentTarget`: The element the event listener is attached to.

**Example:**
```js
div.addEventListener('click', function(e) {
  console.log('target:', e.target);
  console.log('currentTarget:', e.currentTarget);
});
```

---

### 238. How do you delegate events for dynamic elements?
Attach the event listener to a parent element and use `event.target` to check if the event originated from a dynamic child.

**Example:**
```js
document.body.addEventListener('click', function(e) {
  if (e.target.matches('.dynamic')) {
    alert('Dynamic element clicked!');
  }
});
```

---

### 239. What is MutationObserver?
`MutationObserver` is a built-in API that watches for changes to the DOM tree (additions, removals, attribute changes, etc.) and notifies you via a callback.

**Example:**
```js
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log(mutation);
  });
});
observer.observe(document.body, { childList: true, subtree: true });
```

---

### 240. How do you observe changes in the DOM?
Use `MutationObserver` to watch for changes in the DOM.

**Example:**
```js
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log('DOM changed:', mutation);
  });
});
observer.observe(document.body, { childList: true, subtree: true });
```

---

### Additional Interview-Relevant Questions

#### How do you simulate a click event programmatically?
```js
element.click();
```

#### How do you check if an element exists in the DOM?
```js
if (document.getElementById('myId')) {
  // Element exists
}
```

#### How do you listen for multiple events with one handler?
```js
['mousedown', 'touchstart'].forEach(evt =>
  element.addEventListener(evt, handler)
);
```

#### How do you find the parent or ancestor of an element?
```js
const parent = element.parentElement;
const ancestor = element.closest('.some-class');
```
