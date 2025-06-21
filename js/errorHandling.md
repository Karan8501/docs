## 8. Error Handling

---

### 191. How do you handle errors in JavaScript?

Errors in JavaScript can be handled using `try...catch` blocks, error callbacks, or Promise-based `.catch()` methods. Handling errors prevents your program from crashing and allows you to respond gracefully.

**Example:**

```js
try {
  let result = riskyOperation();
} catch (error) {
  console.error("An error occurred:", error);
}
```

**Best Practice:** Always handle errors as close to their source as possible.

---

### 192. What is a try-catch-finally block?

A `try-catch-finally` block lets you run code that may throw errors (`try`), handle those errors (`catch`), and execute code regardless of what happened (`finally`).

**Example:**

```js
try {
  mightThrow();
} catch (e) {
  console.error("Caught:", e);
} finally {
  console.log("Cleanup runs regardless.");
}
```

- `finally` runs whether or not an error occurred.

---

### 193. What is the difference between `throw` and `return`?

- `throw`: Stops function execution and propagates an error up the call stack, which can be caught by a `catch` block.
- `return`: Ends function execution and returns a value to the caller; does not signal an error.

**Example:**

```js
function test(x) {
  if (x < 0) throw new Error("Negative!");
  return x;
}
```

---

### 194. How do you throw a custom error?

Use the `throw` keyword with an `Error` object or a custom error class.

**Example:**

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
throw new ValidationError("Invalid input!");
```

---

### 195. What is the Error object?

The `Error` object is the base object for all errors in JavaScript. It contains properties like `name`, `message`, and `stack`.

**Example:**

```js
try {
  throw new Error("Something went wrong!");
} catch (e) {
  console.log(e.name); // 'Error'
  console.log(e.message); // 'Something went wrong!'
  console.log(e.stack); // Stack trace
}
```

---

### 196. How do you handle errors in Promises?

Use the `.catch()` method to handle rejected promises.

**Example:**

```js
fetch("/api/data")
  .then((res) => res.json())
  .catch((err) => console.error("Promise error:", err));
```

**Tip:** Always add a `.catch()` to Promises to avoid unhandled rejections.

---

### 197. How do you handle errors in async/await?

Wrap `await` calls in a `try...catch` block.

**Example:**

```js
async function getData() {
  try {
    let res = await fetch("/api/data");
    let data = await res.json();
    return data;
  } catch (e) {
    console.error("Async error:", e);
  }
}
```

---

### 198. What is a stack trace?

A stack trace is a report of the active stack frames at a certain point in time during program execution. It helps you trace the sequence of function calls that led to an error.

**Example:**

```js
function a() {
  b();
}
function b() {
  c();
}
function c() {
  throw new Error("Oops!");
}
a();
// The error's stack trace will show the path: a -> b -> c
```

---

### 199. What is the difference between SyntaxError, ReferenceError, and TypeError?

- **SyntaxError:** Code cannot be parsed (e.g., missing parenthesis).
- **ReferenceError:** Refers to a variable that does not exist.
- **TypeError:** An operation is performed on a value of the wrong type.

**Examples:**

```js
// SyntaxError: eval('if (true { }')
// ReferenceError: console.log(foo); // foo is not defined
// TypeError: null.f();
```

---

### 200. What is error bubbling?

Error bubbling refers to how errors propagate up the call stack. If not caught in a function, they bubble up to the next caller, and so on, until caught or reaching the global scope.

**Example:**

```js
function foo() {
  bar();
}
function bar() {
  throw new Error("fail");
}
try {
  foo();
} catch (e) {
  console.log("Caught:", e.message);
}
```

---

### 201. What is global error handling?

Global error handling is catching errors that are not handled anywhere else, usually at the top level of your application.

- **Browser:** Use `window.onerror` or `window.addEventListener('error', ...)`
- **Node.js:** Use `process.on('uncaughtException', ...)`

**Example:**

```js
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Global error:", message);
};
```

---

### 202. How do you handle unhandled Promise rejections?

- Always add a `.catch()` to Promises.
- Use global handlers:
  - **Browser:** `window.onunhandledrejection`
  - **Node.js:** `process.on('unhandledRejection', ...)`

**Example:**

```js
window.onunhandledrejection = function (e) {
  console.error("Unhandled rejection:", e.reason);
};
```

---

### 203. What is window.onerror?

A global event handler for uncaught errors in browsers. Lets you log or report errors that escape all other error handling.

**Example:**

```js
window.onerror = function (message, source, lineno, colno, error) {
  // Send error details to a logging server
  return true; // Prevents default browser error alert
};
```

---

### 204. How do you debug JavaScript code?

- Use `console.log`, `console.error`, and other console methods.
- Use browser DevTools (Chrome, Firefox, Edge, etc.).
- Set breakpoints, step through code, inspect variables.
- Use debugging tools like VS Code's debugger.

**Example:**

```js
console.log("Debug info:", myVar);
debugger; // Pauses execution if DevTools are open
```

---

### 205. How do you use breakpoints in the browser?

- Open DevTools (F12 or right-click → Inspect).
- Go to the Sources (Chrome) or Debugger (Firefox) tab.
- Click the line number to set a breakpoint.
- Reload or run code; execution pauses at the breakpoint.
- Step through code, inspect variables, and continue/resume.

---

### 206. What are source maps?

Source maps map minified/compiled code back to the original source code, making debugging easier.

**Example:**

- When debugging a React app, source maps let you see your original JSX/ES6 code instead of minified JS.

**Note:** Always generate source maps in production builds for easier debugging.

---

### 207. What is the difference between console.log and console.error?

- `console.log`: For general output/info messages (black text in DevTools).
- `console.error`: For error messages (red text in DevTools, may trigger stack trace).

**Example:**

```js
console.log("Info");
console.error("Something went wrong!");
```

---

### 208. How do you catch errors in event handlers?

Wrap event handler code in a `try...catch` block.

**Example:**

```js
button.onclick = function (event) {
  try {
    riskyAction();
  } catch (e) {
    console.error("Event error:", e);
  }
};
```

---

### 209. How do you handle errors in event listeners?

- Use `try...catch` inside the event listener callback.
- For React and other frameworks, use error boundaries/components.

**Example:**

```js
document.addEventListener("click", function (e) {
  try {
    doSomething();
  } catch (err) {
    console.error("Listener error:", err);
  }
});
```

---

### 210. What is defensive programming?

Defensive programming is writing code to anticipate and safely handle potential errors or misuse, making programs more robust and less likely to fail.

**Example:**

```js
function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Arguments must be numbers");
  }
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}
```

**Best Practice:** Always validate inputs and handle edge cases.

---

### Additional Interview-Relevant Questions

#### How do you create a custom error class?

```js
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
  }
}
throw new DatabaseError("DB connection failed");
```

#### What is an error boundary in React?

A special component that catches JavaScript errors in its child component tree and displays a fallback UI instead of crashing the whole app.

#### How do you log errors to a remote server?

Send error details via `fetch` or `XMLHttpRequest` to your backend or a logging service.

**Example:**

```js
window.onerror = function (message, source, lineno, colno, error) {
  fetch("/log", {
    method: "POST",
    body: JSON.stringify({
      message,
      source,
      lineno,
      colno,
      stack: error?.stack,
    }),
  });
};
```
