# JavaScript Interview Answers: Data Types & Variables

---

## 1. Data Types & Variables

### 1. What are all the primitive data types in JavaScript?
- **String**: e.g. `'hello'`
- **Number**: e.g. `42`, `3.14`
- **BigInt**: e.g. `123n` (for very large integers)
- **Boolean**: `true` or `false`
- **Symbol**: e.g. `Symbol('id')`
- **Undefined**: a declared variable without a value
- **Null**: explicitly set to "no value"

**Example:**
```js
let name = 'Alice'; // String
let age = 30; // Number
let big = 9007199254740991n; // BigInt
let isAdmin = false; // Boolean
let uniqueId = Symbol('id'); // Symbol
let notAssigned; // Undefined
let nothing = null; // Null
```

---

### 2. What is the difference between `undefined` and `null`?
- `undefined`: A variable declared but not assigned a value.
- `null`: An explicit assignment indicating "no value".

**Example:**
```js
let x;
console.log(x); // undefined
let y = null;
console.log(y); // null
```
**Analogy:**
- `undefined` is like an empty parking spot you haven't reserved.
- `null` is a reserved spot with a "no car" sign.

---

### 3. What is a Symbol and when would you use it?
A Symbol is a unique and immutable primitive value, often used as object property keys to avoid name collisions.

**Example:**
```js
const id = Symbol('id');
const user = {};
user[id] = 123;
```
**Analogy:** Like giving every object a secret key that no one else can guess.

---

### 4. How does JavaScript handle floating point numbers?
JavaScript uses IEEE 754 double-precision floating point. This can lead to rounding errors.

**Example:**
```js
console.log(0.1 + 0.2); // 0.30000000000000004
```
**Analogy:** Like using a ruler that can't measure infinitely small fractions, so some numbers are a little off.

---

### 5. What is the output of `typeof null`?
- `'object'` (this is a long-standing bug in JavaScript).

**Example:**
```js
console.log(typeof null); // 'object'
```

---

### 6. What is type coercion? Give examples.
Automatic or implicit conversion of values from one type to another.

**Example:**
```js
console.log('5' + 3); // '53' (number 3 is coerced to string)
console.log('5' - 3); // 2 (string '5' is coerced to number)
```
**Analogy:** Like a cashier who sometimes guesses if you want change in coins or bills.

---

### 7. How does `==` differ from `===`?
- `==` checks for value equality with type coercion.
- `===` checks for value and type equality (strict equality).

**Example:**
```js
console.log(5 == '5'); // true
console.log(5 === '5'); // false
```

---

### 8. What are truthy and falsy values? List all falsy values.
- **Falsy:** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`
- All other values are truthy.

**Example:**
```js
if (0) console.log('no'); else console.log('0 is falsy');
if ('hello') console.log('hello is truthy');
```

---

### 9. How do you check if a variable is an array?
- `Array.isArray(variable)`

**Example:**
```js
let arr = [1,2,3];
console.log(Array.isArray(arr)); // true
```

---

### 10. What is the difference between `let`, `const`, and `var`?
- `var`: Function-scoped, hoisted, can be redeclared.
- `let`: Block-scoped, not hoisted, cannot be redeclared.
- `const`: Block-scoped, must be initialized, cannot be redeclared or reassigned.

**Example:**
```js
var a = 1;
let b = 2;
const c = 3;
```

---

### 11. What is variable hoisting?
Variables declared with `var` are moved to the top of their scope and initialized as `undefined`.

**Example:**
```js
console.log(x); // undefined
var x = 5;
```
**Analogy:** Like putting all your declarations at the top of a shopping list before you start shopping.

---

### 12. What is the Temporal Dead Zone?
The period between entering scope and variable declaration where `let`/`const` cannot be accessed.

**Example:**
```js
// console.log(a); // ReferenceError
let a = 10;
```

---

### 13. What is an Immediately Invoked Function Expression (IIFE)?
A function that runs as soon as it is defined.

**Example:**
```js
(function() {
  console.log('IIFE runs!');
})();
```
**Analogy:** Like writing a note and immediately reading it aloud.

---

### 14. How do you create a constant object? Can you mutate it?
`const obj = {}` creates a constant reference. The object’s properties can be mutated, but `obj` cannot be reassigned.

**Example:**
```js
const person = { name: 'Alice' };
person.age = 30; // allowed
// person = {}; // TypeError
```

---

### 15. What is destructuring assignment?
Extracting values from arrays/objects into variables.

**Example:**
```js
const [a, b] = [1, 2];
const {x, y} = {x:10, y:20};
```
**Analogy:** Like unpacking a box into separate drawers.

---

### 16. How do default parameters work?
Function parameters can have default values.

**Example:**
```js
function greet(name = 'Guest') {
  console.log('Hello, ' + name);
}
greet(); // Hello, Guest
```

---

### 17. What are rest parameters?
Collects remaining arguments into an array.

**Example:**
```js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1,2,3); // 6
```

---

### 18. What is the spread operator and how is it used?
Expands iterable elements.

**Example:**
```js
let arr = [1,2,3];
let arr2 = [...arr, 4]; // [1,2,3,4]
let obj = {a:1};
let obj2 = {...obj, b:2}; // {a:1, b:2}
```

---

### 19. What is the difference between shallow and deep copy?
- Shallow copy: Only top-level properties are copied.
- Deep copy: All nested properties are copied.

**Example:**
```js
let arr = [1, [2,3]];
let shallow = arr.slice();
shallow[1][0] = 99;
console.log(arr[1][0]); // 99 (shallow copy shares nested objects)
// Deep copy:
let deep = JSON.parse(JSON.stringify(arr));
deep[1][0] = 2;
console.log(arr[1][0]); // 99 (deep copy is independent)
```

---

### 20. What is NaN? How do you check if a value is NaN?
`NaN` stands for Not-a-Number. Use `Number.isNaN(value)` to check.

**Example:**
```js
let x = 0 / 0;
console.log(Number.isNaN(x)); // true
```

---

### 21. What is the difference between `parseInt` and `Number`?
- `parseInt` parses up to the first non-digit character.
- `Number` converts the entire string.

**Example:**
```js
parseInt('123abc'); // 123
Number('123abc'); // NaN
```

---

### 22. What is automatic semicolon insertion?
JavaScript automatically inserts semicolons at the end of statements in certain cases, which can cause bugs.

**Example:**
```js
function foo() {
  return
  {
    bar: 1
  };
}
console.log(foo()); // undefined (semicolon inserted after return)
```

---

### 23. What is a template literal?
String literals using backticks (`` ` ``), supporting interpolation.

**Example:**
```js
let name = 'Bob';
console.log(`Hello, ${name}!`); // Hello, Bob!
```

---

### 24. How do you create multi-line strings?
Use template literals or string concatenation.

**Example:**
```js
let str = `This is
multi-line`;
```

---

### 25. What is the difference between `undefined` and not defined?
- `undefined`: Declared but not assigned.
- Not defined: Never declared.

**Example:**
```js
let x;
console.log(x); // undefined
console.log(y); // ReferenceError: y is not defined
```

---

### 26. How do you check if a variable is defined?
Use `typeof variable !== 'undefined'`

**Example:**
```js
if (typeof foo !== 'undefined') {
  // safe to use foo
}
```

---

### 27. What is a global variable? How do you create one?
A variable declared outside any function or attached to the `window` object.

**Example:**
```js
globalVar = 5; // becomes global (not recommended)
var anotherGlobal = 10; // global if outside any function
window.someGlobal = 20;
```

---

### 28. What is variable shadowing?
When a local variable has the same name as a variable in an outer scope.

**Example:**
```js
let x = 1;
function foo() {
  let x = 2; // shadows outer x
  console.log(x); // 2
}
foo();
console.log(x); // 1
```
**Analogy:** Like wearing sunglasses indoors—your eyes (the outer variable) are hidden by the glasses (the local variable).

---

### 29. What is the scope chain?
The hierarchy of scopes used to resolve variable names.

**Example:**
```js
let a = 1;
function outer() {
  let b = 2;
  function inner() {
    let c = 3;
    console.log(a, b, c); // 1, 2, 3
  }
  inner();
}
outer();
```
**Analogy:** Like looking for your keys—first in your pocket (local), then in your bag (parent), then at home (global).

---

### 30. What is lexical scope?
Scope determined by the physical placement of code in source (where variables/functions are declared).

**Example:**
```js
function outer() {
  let x = 10;
  function inner() {
    console.log(x); // 10
  }
  inner();
}
outer();
```
**Analogy:** Like a Russian nesting doll—each function can see variables in the dolls it’s inside, but not outside itself.

