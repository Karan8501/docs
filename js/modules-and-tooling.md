# 11. Modules & Tooling – JavaScript Interview Q&A

---

### 281. What is a module in JavaScript?
A module is a reusable, self-contained unit of code that encapsulates functionality. Modules help organize code, manage dependencies, and avoid polluting the global namespace. Modern JavaScript supports modules natively (ES6 modules) and through systems like CommonJS.

**Benefits:**
- Code reuse and separation of concerns
- Encapsulation (private scope)
- Easier maintenance and testing

**Example:**
```js
// math.js (module)
export function add(a, b) { return a + b; }

// app.js
import { add } from './math.js';
console.log(add(2, 3)); // 5
```

**Analogy:** Think of modules as separate toolboxes; each toolbox has its own tools and you can import only what you need.

---

### 282. What is the difference between CommonJS and ES6 modules?
| Feature               | CommonJS                | ES6 Modules           |
|----------------------|-------------------------|-----------------------|
| Syntax               | require/module.exports  | import/export         |
| Loading              | Synchronous             | Asynchronous          |
| Usage                | Node.js                 | Browser & Node.js     |
| Export Types         | Values (copies)         | Live bindings         |
| File Extension       | .js (default)           | .js/.mjs              |
| Top-level `this`     | module.exports          | undefined             |

**Example:**
```js
// CommonJS (Node.js)
// foo.js
const bar = 42;
module.exports = bar;
// main.js
const bar = require('./foo');

// ES6 Modules (Browser/Node.js)
// foo.js
export const bar = 42;
// main.js
import { bar } from './foo.js';
```

**Key Differences:**
- **Live bindings:** ES6 imports reflect changes in exports; CommonJS does not.
- **Top-level await:** Supported in ES6 modules, not in CommonJS.
- **Static analysis:** ES6 enables tree shaking; CommonJS does not.

---

### 283. How do you export and import modules?
- **Export:** Use `export` (named or default) in ES6, or `module.exports` in CommonJS.
- **Import:** Use `import` in ES6, or `require` in CommonJS.

**Named export/import (ES6):**
```js
// math.js
export function add(a, b) { return a + b; }
export function sub(a, b) { return a - b; }

// app.js
import { add, sub } from './math.js';
```

**Default export/import (ES6):**
```js
// logger.js
export default function log(msg) { console.log(msg); }
// app.js
import log from './logger.js';
```

**CommonJS:**
```js
// utils.js
module.exports = { add, sub };
// app.js
const { add, sub } = require('./utils');
```

---

### 284. What is a bundler (Webpack, Rollup, Parcel)?
A bundler is a tool that combines multiple modules/files into a single file (or a few files) for deployment. It resolves dependencies, optimizes code, and may handle assets (CSS, images).

- **Webpack:** Most popular, highly configurable, supports loaders/plugins, handles JS, CSS, images, etc.
- **Rollup:** Focuses on ES modules, excels at tree shaking, produces smaller bundles for libraries.
- **Parcel:** Zero-config, fast, auto-detects dependencies, suitable for quick prototyping.

**Example (Webpack config):**
```js
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js' },
  module: { rules: [ { test: /\.css$/, use: ['style-loader', 'css-loader'] } ] }
};
```

**Why use a bundler?**
- Reduces HTTP requests (fewer files)
- Enables code splitting, tree shaking, asset optimization

---

### 285. What is tree shaking?
Tree shaking is a process that removes unused (dead) code from the final bundle, reducing file size. It relies on static analysis of ES6 module imports/exports.

**Example:**
```js
// math.js
export function used() {}
export function unused() {}
// app.js
import { used } from './math.js';
// 'unused' is removed by tree shaking
```

**Best Practice:** Use ES6 modules for maximum tree shaking effectiveness.

---

### 286. What is code splitting?
Code splitting breaks up your code into multiple bundles that can be loaded on demand, improving initial load time.

**Example (dynamic import):**
```js
// Only loads the module when needed
button.onclick = () => {
  import('./dialog.js').then(dialog => dialog.open());
};
```

**Diagram:**
```
[main.js]   [admin.js]   [user.js]
   ↓           ↓           ↓
[main.bundle.js] [admin.bundle.js] [user.bundle.js]
```

---

### 287. What is hot module replacement?
Hot Module Replacement (HMR) updates modules in a running app without a full reload, preserving app state. Used in development for faster feedback.

**Example (Webpack):**
```js
if (module.hot) {
  module.hot.accept('./math.js', function() {
    // Reloaded math module
  });
}
```

**Use Case:** React apps update UI instantly on code change without losing form state.

---

### 288. What is a polyfill?
A polyfill is code that implements a feature on older environments that do not support it natively.

**Example:**
```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function(x) {
    return this.indexOf(x) !== -1;
  };
}
```

**Real-world:** Babel can inject polyfills for new JS features.

---

### 289. What is transpiling?
Transpiling is converting code from one version of JavaScript (or another language) to another, e.g., ES6 → ES5 for browser compatibility.

**Example:**
```js
// ES6
const add = (a, b) => a + b;
// After transpiling to ES5
var add = function(a, b) { return a + b; };
```

**Tools:** Babel, TypeScript, SWC

---

### 290. What is Babel?
Babel is a popular JavaScript transpiler that converts ES6+ code to ES5, supports plugins/presets, and enables using modern JS features in older browsers.

**Features:**
- Presets for React, TypeScript, etc.
- Plugins for experimental features
- Automatic polyfilling

**Example (CLI):**
```
npx babel src --out-dir lib
```

---

### 291. What is minification?
Minification removes whitespace, comments, and shortens variable names to reduce file size and improve load times.

**Example:**
```js
// Before
function add(a, b) {
  return a + b;
}
// After
function add(a,b){return a+b}
```

**Tools:** Terser, UglifyJS

---

### 292. What is source mapping?
A source map maps minified/transpiled code back to the original source, aiding debugging in development tools.

**Example:**
- `bundle.js` → `bundle.js.map`
- Chrome DevTools can show your original code while debugging

**How it works:**
- Maps each line/column of minified code to the original file/line

---

### 293. What is dead code elimination?
Dead code elimination is the removal of code that is never executed (unreachable or unused) to optimize bundles.

**Example:**
```js
if (false) { console.log('never runs'); }
```

**Tools:** Terser, Rollup, Webpack

---

### 294. What is a package manager?
A package manager automates installing, updating, and managing dependencies (libraries, tools) for your project.

**Popular JS package managers:** npm, yarn, pnpm

**Example:**
```
npm install lodash
```

---

### 295. What is npm?
`npm` (Node Package Manager) is the default package manager for Node.js, hosting the largest JS package registry.

**Features:**
- Install packages (`npm install`)
- Publish packages (`npm publish`)
- Run scripts (`npm run build`)

**Example:**
```
npm install express
```

---

### 296. What is yarn?
`yarn` is an alternative package manager to npm, known for speed, deterministic installs, and workspaces support.

**Features:**
- Faster installs via caching
- `yarn.lock` for reproducible builds
- Workspaces for monorepos

**Example:**
```
yarn add react
```

---

### 297. What is pnpm?
`pnpm` is a fast, disk space-efficient package manager that uses symlinks for node_modules, reducing duplication.

**Example:**
```
pnpm install lodash
```

---

### 298. What is semantic versioning?
Semantic versioning (semver) uses a MAJOR.MINOR.PATCH format (e.g., 1.2.3) to indicate breaking changes, new features, and fixes.

**Example:**
- `^1.2.3`: Accepts compatible minor/patch updates
- `~1.2.3`: Accepts patch updates only
- `2.0.0`: Only version 2.0.0

**Diagram:**
```
MAJOR.MINOR.PATCH
  ^    ^     ^
```

---

### 299. What is the difference between dependencies and devDependencies?
- **dependencies:** Required for the app to run (runtime).
- **devDependencies:** Only needed during development (build tools, linters, test frameworks).

**Example:**
```json
{
  "dependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0"
  }
}
```

---

### 300. What is a lock file?
A lock file (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) records the exact versions of installed packages, ensuring consistent installs.

**Why important?**
- Prevents "works on my machine" issues
- Ensures reproducible builds

---

### 301. What is the difference between package.json and package-lock.json?
- **package.json:** Declares dependencies, scripts, project metadata.
- **package-lock.json:** Records the entire dependency tree and exact versions installed.

**Analogy:**
- `package.json` is the recipe, `package-lock.json` is the shopping list with exact brands and amounts.

---

### 302. How do you publish a package to npm?
1. Create a `package.json` with name, version, etc.
2. Run `npm login` to authenticate.
3. Run `npm publish` to upload the package.

**Example:**
```sh
npm login
npm publish
```

---

### 303. What is a monorepo?
A monorepo is a single repository containing multiple projects/packages, often sharing dependencies and tooling.

**Example:**
```
/monorepo
  /packages
    /core
    /utils
    /app
```

**Benefits:**
- Easier code sharing
- Unified CI/CD
- Consistent tooling

---

### 304. What is a workspace?
A workspace is a feature (npm, yarn, pnpm) for managing multiple packages within a monorepo, allowing shared dependencies and scripts.

**Example (yarn):**
```json
{
  "workspaces": ["packages/*"]
}
```

---

### 305. What is a linter?
A linter is a tool that analyzes code for errors, stylistic issues, and potential bugs according to rules.

**Popular linters:** ESLint (JS/TS), Stylelint (CSS)

**Example (ESLint):**
```js
// .eslintrc.js
module.exports = {
  rules: { 'no-unused-vars': 'error' }
};
```

---

### 306. What is Prettier?
Prettier is an opinionated code formatter for JavaScript and other languages. It enforces consistent code style automatically.

**Features:**
- Formats code on save or commit
- No configuration needed for style rules
- Integrates with editors and CI

**Example:**
```js
// Before
function foo( a ) {return 42;}
// After (Prettier)
function foo(a) {
  return 42;
}
```

---

### 307. What is ESLint?
ESLint is a pluggable linter for JavaScript and TypeScript. It checks code for errors, enforces coding standards, and can auto-fix some issues.

**Features:**
- Highly configurable with plugins and rules
- Supports custom and community rules
- Can be integrated with build tools and editors

**Example:**
```js
// .eslintrc.json
{
  "rules": {
    "eqeqeq": "error"
  }
}
```

---

### 308. What is Husky?
Husky is a tool for managing Git hooks, such as pre-commit and pre-push, allowing you to run scripts (like linting or tests) automatically during development workflows.

**Example:**
- Run `npm test` before every commit
- Add to package.json:
```json
"husky": {
  "hooks": {
    "pre-commit": "npm test"
  }
}
```

---

### 309. What is a commit hook?
A commit hook is a script that runs automatically at certain points in the Git workflow (e.g., before commit, after commit). Useful for enforcing code quality, running tests, or formatting code.

**Example:**
- Pre-commit hook runs `eslint` and `prettier` before allowing a commit.
- Git hooks live in the `.git/hooks` directory and can be managed by tools like Husky.

---
