# Polyfills in JavaScript – Concepts & Examples

---

## What is a Polyfill?
A polyfill is a piece of code (usually JavaScript) that implements a feature on web browsers that do not natively support it. Polyfills allow developers to use modern JavaScript features while maintaining compatibility with older browsers.

---

## Why Use Polyfills?
- **Browser Compatibility:** Ensures your code works across all browsers, including legacy ones.
- **Progressive Enhancement:** Use new features without breaking functionality for users on older browsers.

---

## How Does a Polyfill Work?
A polyfill checks if a feature exists, and if not, defines it.

---

## Polyfill vs Ponyfill
- **Polyfill:** Modifies global objects (e.g., adds methods to `Array.prototype`).
- **Ponyfill:** Exports a function without modifying globals. Safer for modular code.

---

# Table of Contents
- [Array Polyfills](#array-polyfills)
- [Object Polyfills](#object-polyfills)
- [String Polyfills](#string-polyfills)
- [Number Polyfills](#number-polyfills)
- [Function Polyfills](#function-polyfills)
- [Promise & Async Polyfills](#promise--async-polyfills)
- [Other Useful Polyfills](#other-useful-polyfills)
- [DOM Polyfills](#dom-polyfills)
- [Best Practices & Resources](#best-practices--resources)

---

## Array Polyfills

### `Array.prototype.forEach`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
```js
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (i in this) callback.call(thisArg, this[i], i, this);
    }
  };
}
```

### `Array.prototype.map`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
```js
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this) arr[i] = callback.call(thisArg, this[i], i, this);
    }
    return arr;
  };
}
```

### `Array.prototype.filter`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
```js
if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback, thisArg) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this && callback.call(thisArg, this[i], i, this)) arr.push(this[i]);
    }
    return arr;
  };
}
```

### `Array.prototype.reduce`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
```js
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, initialValue) {
    let i = 0, acc;
    if (arguments.length > 1) {
      acc = initialValue;
    } else {
      while (i < this.length && !(i in this)) i++;
      acc = this[i++];
    }
    for (; i < this.length; i++) {
      if (i in this) acc = callback(acc, this[i], i, this);
    }
    return acc;
  };
}
```

### `Array.prototype.find`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
```js
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (predicate.call(thisArg, this[i], i, this)) return this[i];
    }
    return undefined;
  };
}
```

### `Array.prototype.includes`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function(search, start) {
    if (this == null) throw new TypeError('Array.prototype.includes called on null or undefined');
    let len = this.length >>> 0;
    let i = Math.max(start | 0, 0);
    while (i < len) {
      if (this[i] === search || (Number.isNaN(this[i]) && Number.isNaN(search))) return true;
      i++;
    }
    return false;
  };
}
```

### `Array.prototype.flat`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
```js
if (!Array.prototype.flat) {
  Array.prototype.flat = function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) && depth > 1
        ? toFlatten.flat(depth - 1)
        : toFlatten);
    }, []);
  };
}
```

---

## Object Polyfills

### `Object.assign`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
```js
if (typeof Object.assign !== 'function') {
  Object.assign = function(target, ...sources) {
    if (target == null) throw new TypeError('Cannot convert undefined or null to object');
    let to = Object(target);
    for (let i = 0; i < sources.length; i++) {
      let next = sources[i];
      if (next != null) {
        for (let key in next) {
          if (Object.prototype.hasOwnProperty.call(next, key)) {
            to[key] = next[key];
          }
        }
      }
    }
    return to;
  };
}
```

### `Object.create`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
```js
if (typeof Object.create !== 'function') {
  Object.create = function(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
  };
}
```

### `Object.entries`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
```js
if (!Object.entries) {
  Object.entries = function(obj) {
    let ownProps = Object.keys(obj), i = ownProps.length, res = new Array(i);
    while (i--)
      res[i] = [ownProps[i], obj[ownProps[i]]];
    return res;
  };
}
```

### `Object.values`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
```js
if (!Object.values) {
  Object.values = function(obj) {
    return Object.keys(obj).map(key => obj[key]);
  };
}
```

---

## String Polyfills

### `String.prototype.includes`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)
```js
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    if (typeof start !== 'number') start = 0;
    if (start + search.length > this.length) return false;
    return this.indexOf(search, start) !== -1;
  };
}
```

### `String.prototype.startsWith`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)
```js
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(search, pos) {
    pos = pos || 0;
    return this.substring(pos, pos + search.length) === search;
  };
}
```

### `String.prototype.endsWith`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)
```js
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(search, this_len) {
    if (this_len === undefined || this_len > this.length) {
      this_len = this.length;
    }
    return this.substring(this_len - search.length, this_len) === search;
  };
}
```

### `String.prototype.padStart`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
```js
if (!String.prototype.padStart) {
  String.prototype.padStart = function(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(padString || ' ');
    if (this.length >= targetLength) return String(this);
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(this);
  };
}
```

### `String.prototype.padEnd`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)
```js
if (!String.prototype.padEnd) {
  String.prototype.padEnd = function(targetLength, padString) {
    targetLength = targetLength >> 0;
    padString = String(padString || ' ');
    if (this.length >= targetLength) return String(this);
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length);
    }
    return String(this) + padString.slice(0, targetLength);
  };
}
```

---

## Number Polyfills

### `Number.isNaN`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
```js
if (!Number.isNaN) {
  Number.isNaN = function(value) {
    return typeof value === 'number' && isNaN(value);
  };
}
```

### `Number.isInteger`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)
```js
if (!Number.isInteger) {
  Number.isInteger = function(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };
}
```

---

## Function Polyfills

### `Function.prototype.bind`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(this instanceof fNOP ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };
    if (this.prototype) {
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();
    return fBound;
  };
}
```

---

## Promise & Async Polyfills

### `Promise`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- Polyfilling the entire Promise API is complex. Use [core-js](https://github.com/zloirock/core-js) or [es6-promise](https://github.com/stefanpenner/es6-promise) for reliable Promise polyfills.

### `Promise.allSettled`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
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

### `Promise.finally`
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)
```js
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const P = this.constructor;
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason; })
    );
  };
}
```

---

## Other Useful Polyfills

### `fetch` API
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Use [whatwg-fetch](https://github.com/github/fetch) or [unfetch](https://github.com/developit/unfetch) for fetch polyfills.

### `requestAnimationFrame`
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
```js
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback) {
    return setTimeout(callback, 1000 / 60);
  };
}
```

### `Element.prototype.closest`
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
```js
if (!Element.prototype.closest) {
  Element.prototype.closest = function(selector) {
    let el = this;
    while (el) {
      if (el.matches(selector)) return el;
      el = el.parentElement;
    }
    return null;
  };
}
```

### `Element.prototype.matches`
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)
```js
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
                             Element.prototype.webkitMatchesSelector ||
                             function(selector) {
    let el = this, matches = (el.document || el.ownerDocument).querySelectorAll(selector), i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {}
    return i > -1;
  };
}
```

---

## DOM Polyfills

### `classList`
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- Use [classList.js](https://github.com/eligrey/classList.js) for a full-featured polyfill.

### `addEventListener` (IE8 and below)
```js
if (!Element.prototype.addEventListener) {
  Element.prototype.addEventListener = function(event, callback) {
    return this.attachEvent('on' + event, callback);
  };
}
```

---

## Best Practices & Resources
- Always check if the feature exists before defining a polyfill.
- Use feature detection, not browser detection.
- Prefer official polyfills from [MDN](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill), [core-js](https://github.com/zloirock/core-js), or [Polyfill.io](https://polyfill.io/v3/).
- For complex features (like `Promise`, `fetch`, `classList`), use well-tested community polyfills.

---
