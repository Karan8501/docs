## 5. Functions & Scope

### 101. What is a function declaration?
A function defined using the `function` keyword at the top level or inside another block.
```js
function add(a, b) {
  return a + b;
}
add(2, 3); // 5
```
- Hoisted: can be called before its definition.

### 102. What is a function expression?
A function assigned to a variable or used as a value.
```js
const add = function(a, b) {
  return a + b;
};
add(2, 3); // 5
```
- Not hoisted (cannot be called before definition).

### 103. What is an arrow function? How does it differ from a regular function?
- Shorter syntax: `const sum = (a, b) => a + b;`
- Does **not** have its own `this`, `arguments`, `super`, or `new.target`.
- Cannot be used as constructors.
```js
const double = x => x * 2;
```

### 104. What is a higher-order function?
A function that takes one or more functions as arguments or returns a function.
```js
function map(arr, fn) {
  const result = [];
  for (let item of arr) result.push(fn(item));
  return result;
}
map([1,2,3], x => x * 2); // [2,4,6]
```

### 105. What is a callback function?
A function passed as an argument to another function, to be called later.
```js
setTimeout(() => console.log('Hello!'), 1000);
```

### 106. What is a closure?
A function that "remembers" variables from its lexical scope even after the outer function has finished executing.
```js
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```

### 107. What is lexical scope?
Variables are accessible based on where they are written in the code, not where they are called.
```js
function outer() {
  let x = 10;
  function inner() {
    console.log(x); // 10
  }
  inner();
}
```

### 108. What is the difference between `var`, `let`, and `const` in function scope?
- `var`: function-scoped, hoisted, can be re-declared.
- `let`/`const`: block-scoped, not hoisted, cannot be re-declared in same scope.
- `const`: must be initialized, cannot be reassigned.

### 109. What is function hoisting?
Function declarations are hoisted to the top of their scope, so they can be called before their definition.
```js
foo();
function foo() { console.log('Hoisted!'); }
```

### 110. What is the arguments object?
An array-like object available inside regular functions (not arrow functions) that contains all passed arguments.
```js
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) total += arguments[i];
  return total;
}
sum(1,2,3); // 6
```

### 111. How do you create a function with variable arguments?
Use rest parameters:
```js
function sum(...args) {
  return args.reduce((a, b) => a + b, 0);
}
sum(1,2,3); // 6
```

### 112. What is the `this` keyword?
A special variable referring to the context in which a function is called (the object before the dot, or global/undefined in strict mode).

### 113. How does `this` behave in different contexts?
- **Global function:** `this` is `window` (in browsers) or `undefined` (strict mode).
- **Method:** `this` is the object before the dot.
- **Constructor:** `this` is the new instance.
- **Event handler:** `this` is the element.

### 114. How does `this` work in arrow functions?
Arrow functions capture `this` from their surrounding (lexical) scope. They do not have their own `this`.
```js
const obj = {
  value: 42,
  getValue: function() {
    return () => this.value;
  }
};
const fn = obj.getValue();
fn(); // 42
```

### 115. How do you change the value of `this`? (call, apply, bind)
- `call`: calls a function with a given `this` and arguments.
- `apply`: like `call`, but arguments as array.
- `bind`: returns a new function with bound `this`.
```js
function greet() { return this.name; }
const obj = { name: 'Alice' };
greet.call(obj); // 'Alice'
greet.apply(obj);
const bound = greet.bind(obj);
bound(); // 'Alice'
```

### 116. What is an IIFE and why is it used?
**IIFE**: Immediately Invoked Function Expression. Runs as soon as it is defined. Used to create a new scope and avoid polluting the global namespace.
```js
(function() {
  // private scope
  var x = 10;
})();
```

### 117. What is function currying?
Transforming a function with multiple arguments into a series of functions each taking one argument.
```js
function add(a) {
  return function(b) {
    return a + b;
  };
}
add(2)(3); // 5
```

### 118. What is partial application?
Fixing a number of arguments to a function, producing a new function with fewer arguments.
```js
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
double(5); // 10
```

### 119. What is memoization?
Caching the results of function calls for given arguments to speed up subsequent calls.
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
```

### 120. What is recursion?
A function calling itself to solve a problem by breaking it into smaller subproblems.
```js
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
factorial(5); // 120
```

### 121. What is tail call optimization?
A compiler optimization where recursive calls in tail position (last action) do not add a new stack frame.
```js
function fact(n, acc = 1) {
  if (n <= 1) return acc;
  return fact(n - 1, n * acc);
}
```
- Not widely supported in all JS engines.

### 122. What is the difference between synchronous and asynchronous functions?
- **Synchronous:** Executes line by line, blocking.
- **Asynchronous:** Allows other code to run while waiting (e.g., via callbacks, promises, async/await).

### 123. What is debouncing and throttling?
- **Debouncing:** Ensures a function is only called after a certain period of inactivity.
- **Throttling:** Ensures a function is only called at most once in a specified interval.

### 124. What is the difference between function overloading and overriding?
- **Overloading:** Not natively supported in JS; can simulate by checking argument types/count.
- **Overriding:** Redefining a method in a subclass or derived object.

### 125. How do you implement a debounce function?
```js
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### 126. How do you implement a throttle function?
```js
function throttle(fn, interval) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

### 127. What is the difference between pure and impure functions?
- **Pure:** No side effects, same output for same input.
- **Impure:** May have side effects or depend on external state.
```js
function pure(x) { return x * 2; }
function impure(arr) { arr.push(1); }
```

### 128. What is a generator function?
A function that can pause and resume, producing a sequence of values.
```js
function* gen() {
  yield 1;
  yield 2;
}
const g = gen();
g.next(); // {value:1, done:false}
```

### 129. How do you use `yield` in generators?
- `yield` pauses the generator and returns a value.
- Use `next()` to resume.
```js
function* numbers() {
  yield 1;
  yield 2;
}
const it = numbers();
it.next(); // {value:1, done:false}
it.next(); // {value:2, done:false}
it.next(); // {value:undefined, done:true}
```

### 130. What is an iterator?
An object with a `next()` method that returns `{ value, done }`.
```js
const arr = [1,2,3];
const it = arr[Symbol.iterator]();
it.next(); // {value:1, done:false}
```

### Additional Interview-Relevant Questions

#### What is the difference between named and anonymous functions?
- **Named:** Has a name, useful for recursion and debugging.
- **Anonymous:** No name, often used as callbacks.

#### What are default parameters and rest parameters?
```js
function greet(name = 'Guest') { return 'Hello ' + name; }
function sum(...args) { return args.reduce((a,b)=>a+b,0); }
```

#### How do you use async/await?
```js
async function fetchData() {
  const res = await fetch('https://api.example.com');
  return res.json();
}
```

#### What is function composition?
Combining two or more functions to produce a new function.
```js
const compose = (f, g) => x => f(g(x));
