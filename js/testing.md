# 16. Testing – JavaScript Interview Q&A

---

### 451. What is unit testing?
Unit testing is the practice of testing individual units (functions, methods, classes) in isolation to ensure they work as expected.

**Example:**
```js
function add(a, b) { return a + b; }
test('adds numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

---

### 452. What is integration testing?
Integration testing checks how multiple units work together (e.g., function + database, component + API).

**Example:**
- Test a user registration flow: form input → API call → database update

---

### 453. What is end-to-end (E2E) testing?
E2E testing simulates real user scenarios by testing the entire application stack (UI, backend, database) from start to finish.

**Example (Cypress):**
```js
cy.visit('/login');
cy.get('input[name=username]').type('user');
cy.get('input[name=password]').type('pass');
cy.get('button[type=submit]').click();
cy.url().should('include', '/dashboard');
```

---

### 454. What is TDD (Test Driven Development)?
TDD is a development process where you write tests before writing production code. The cycle: Red (fail) → Green (pass) → Refactor.

---

### 455. What is BDD (Behavior Driven Development)?
BDD is a development approach that focuses on specifying the behavior of software in plain language, often using tools like Cucumber or Jasmine.

**Example:**
```js
describe('Login', () => {
  it('should show error on wrong password', () => {
    // test code
  });
});
```

---

### 456. What is Jest?
Jest is a popular JavaScript testing framework for unit, integration, and snapshot testing. It includes a test runner, assertion library, mocking, and code coverage.

**Example:**
```js
test('truthy', () => {
  expect(true).toBeTruthy();
});
```

---

### 457. What is Mocha?
Mocha is a flexible JavaScript test framework for Node.js and browsers, often paired with Chai for assertions.

**Example:**
```js
describe('Math', () => {
  it('adds', () => {
    assert.equal(1 + 1, 2);
  });
});
```

---

### 458. What is Chai?
Chai is an assertion library that works with Mocha and other test frameworks. It offers BDD (`expect`, `should`) and TDD (`assert`) styles.

**Example:**
```js
const { expect } = require('chai');
expect(2 + 2).to.equal(4);
```

---

### 459. What is Jasmine?
Jasmine is a BDD-focused testing framework for JavaScript, with built-in assertion and mocking.

**Example:**
```js
describe('Array', () => {
  it('should include value', () => {
    expect([1, 2, 3]).toContain(2);
  });
});
```

---

### 460. What is Sinon?
Sinon is a library for spies, stubs, and mocks in JavaScript tests. It works with Mocha, Jasmine, and others.

**Example:**
```js
const spy = sinon.spy();
spy('foo');
console.log(spy.called); // true
```

---

### 461. What is Puppeteer?
Puppeteer is a Node library for controlling headless Chrome/Chromium. Used for E2E testing, scraping, and automation.

**Example:**
```js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
```

---

### 462. What is Cypress?
Cypress is a modern E2E testing framework for web apps. It runs tests in the browser, offers time-travel debugging, and has a powerful API.

**Example:**
```js
cy.visit('/');
cy.get('button').click();
cy.contains('Welcome');
```

---

### 463. What is a test runner?
A test runner is a tool that discovers and runs tests, reports results, and may provide features like parallel execution and code coverage.

**Examples:** Jest, Mocha, Jasmine

---

### 464. What is a test suite?
A test suite is a collection of related test cases (e.g., all tests for a module or feature).

**Example:**
```js
describe('Math utilities', () => {
  it('adds numbers', () => { /* ... */ });
  it('subtracts numbers', () => { /* ... */ });
});
```

---

### 465. What is a test case?
A test case is a single scenario that checks a specific aspect of code behavior.

**Example:**
```js
it('returns true for even numbers', () => {
  expect(isEven(4)).toBe(true);
});
```

---

### 466. What is mocking?
Mocking replaces real dependencies with fake ones to isolate the code under test.

**Example:**
- Mock a database call with a fake function that returns a fixed value.

---

### 467. What is stubbing?
Stubbing replaces a function with a controlled implementation for the duration of a test.

**Example (Sinon):**
```js
const stub = sinon.stub(obj, 'method').returns(42);
```

---

### 468. What is spying?
A spy records information about function calls (arguments, call count) without changing its behavior.

**Example (Sinon):**
```js
const spy = sinon.spy(obj, 'method');
obj.method('foo');
console.log(spy.calledWith('foo')); // true
```

---

### 469. What is code coverage?
Code coverage measures the percentage of your code executed by tests. High coverage means more of your code is tested.

**Example:**
- Jest and Istanbul generate coverage reports.

---

### 470. How do you mock a module?
- Use Jest's `jest.mock('module')` or similar features in other frameworks.

**Example:**
```js
jest.mock('./api');
```

---

### 471. How do you mock a function?
- Use Jest's `jest.fn()`, Sinon spies, or manual replacement.

**Example:**
```js
const mockFn = jest.fn().mockReturnValue(42);
```

---

### 472. How do you mock a class?
- Use Jest's `jest.mock()` or create a fake class for testing.

**Example:**
```js
jest.mock('./User');
```

---

### 473. How do you mock a fetch request?
- Use libraries like `jest-fetch-mock`, `nock`, or manually replace `window.fetch`.

**Example (Jest):**
```js
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({ data: 123 }) }));
```

---

### 474. How do you mock a timer?
- Use Jest's timer mocks or Sinon fake timers.

**Example:**
```js
jest.useFakeTimers();
setTimeout(callback, 1000);
jest.runAllTimers();
```

---

### 475. How do you mock a date?
- Use libraries like `jest-date-mock` or Sinon fake timers.

**Example:**
```js
const RealDate = Date;
global.Date = class extends RealDate {
  constructor() { return new RealDate('2020-01-01'); }
};
```

---

### 476. How do you mock localStorage?
- Replace `window.localStorage` with a fake implementation.

**Example:**
```js
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};
```

---

### 477. How do you mock sessionStorage?
- Same as localStorage, but for `window.sessionStorage`.

---

### 478. How do you mock cookies?
- Use libraries like `js-cookie` with test helpers, or set `document.cookie` directly.

**Example:**
```js
document.cookie = 'test=1';
```

---

### 479. How do you mock window.location?
- Redefine `window.location` or use test helpers.

**Example:**
```js
delete window.location;
window.location = { href: 'http://test.com' };
```

---

### 480. How do you mock window.history?
- Replace `window.history` methods with spies or mocks.

**Example:**
```js
window.history.pushState = jest.fn();
```

---

### 481. How do you mock window.navigator?
- Replace `window.navigator` properties or methods.

**Example:**
```js
Object.defineProperty(window, 'navigator', { value: { userAgent: 'test' } });
```

---

### 482. How do you mock window.screen?
- Replace `window.screen` with a mock object.

**Example:**
```js
Object.defineProperty(window, 'screen', { value: { width: 1024 } });
```

---

### 483. How do you mock window.alert?
- Replace with a jest.fn() or similar.

**Example:**
```js
window.alert = jest.fn();
```

---

### 484. How do you mock window.confirm?
- Replace with a jest.fn() or similar, optionally returning a value.

**Example:**
```js
window.confirm = jest.fn(() => true);
```

---

### 485. How do you mock window.prompt?
- Replace with a jest.fn() or similar, optionally returning a value.

**Example:**
```js
window.prompt = jest.fn(() => 'mocked');
```

---

### 486. How do you mock window.open?
- Replace with a jest.fn().

**Example:**
```js
window.open = jest.fn();
```

---

### 487. How do you mock window.close?
- Replace with a jest.fn().

**Example:**
```js
window.close = jest.fn();
```

---

### 488. How do you mock window.print?
- Replace with a jest.fn().

**Example:**
```js
window.print = jest.fn();
```

---

### 489. How do you mock window.scrollTo?
- Replace with a jest.fn().

**Example:**
```js
window.scrollTo = jest.fn();
```

---

### 490. How do you mock window.scrollBy?
- Replace with a jest.fn().

**Example:**
```js
window.scrollBy = jest.fn();
```

---

### 491. How do you mock window.setTimeout?
- Use Jest's fake timers or Sinon.

**Example:**
```js
jest.useFakeTimers();
setTimeout(callback, 1000);
jest.runAllTimers();
```

---

### 492. How do you mock window.setInterval?
- Use Jest's fake timers or Sinon.

**Example:**
```js
jest.useFakeTimers();
setInterval(callback, 500);
jest.runOnlyPendingTimers();
```

---

### 493. How do you mock window.clearTimeout?
- Use Jest's fake timers or Sinon.

**Example:**
```js
jest.useFakeTimers();
clearTimeout(timerId);
```

---

### 494. How do you mock window.clearInterval?
- Use Jest's fake timers or Sinon.

**Example:**
```js
jest.useFakeTimers();
clearInterval(intervalId);
```

---

### 495. How do you mock window.requestAnimationFrame?
- Replace with a jest.fn() or custom implementation.

**Example:**
```js
window.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 16));
```

---

### 496. How do you mock window.cancelAnimationFrame?
- Replace with a jest.fn().

**Example:**
```js
window.cancelAnimationFrame = jest.fn();
```

---

### 497. How do you mock window.addEventListener?
- Replace with a jest.fn().

**Example:**
```js
window.addEventListener = jest.fn();
```

---

### 498. How do you mock window.removeEventListener?
- Replace with a jest.fn().

**Example:**
```js
window.removeEventListener = jest.fn();
```

---

### 499. How do you mock window.dispatchEvent?
- Replace with a jest.fn().

**Example:**
```js
window.dispatchEvent = jest.fn();
```

---

### 500. How do you mock window.CustomEvent?
- Replace with a jest.fn() or a mock class.

**Example:**
```js
window.CustomEvent = jest.fn();
```

---
