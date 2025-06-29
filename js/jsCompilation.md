# JavaScript Runtime & Rendering in the Browser

This guide explains how JavaScript code runs and how rendering works inside a web browser. It covers the JavaScript engine, event loop, rendering pipeline, and how browser internals affect performance and user experience.

---

## 1. How JavaScript Runs in the Browser

### JavaScript Engine
- Each browser has its own JS engine (e.g., Chrome: V8, Firefox: SpiderMonkey, Safari: JavaScriptCore).
- The engine parses, compiles (JIT), and executes JS code.

#### How JavaScript Code is Compiled and Run

**1. Parsing (Source Code → Tokens → AST):**
- The engine reads JS source code and splits it into tokens (lexical analysis).
- Tokens are parsed into an **Abstract Syntax Tree (AST)**, which represents the syntactic structure of the code.
- The AST is a tree where each node is a construct in the source code (e.g., variable, function, expression).

**AST Example:**
```js
// Code:
function add(a, b) {
  return a + b;
}
```
AST (simplified):
```
FunctionDeclaration
 ├─ Identifier (add)
 ├─ Parameters: a, b
 └─ BlockStatement
      └─ ReturnStatement
           └─ BinaryExpression (+)
                ├─ Identifier (a)
                └─ Identifier (b)
```

**Scope & Closures:**
- During parsing, the engine builds a **scope chain** to track variable/function lifetimes.
- Closures are created when a function "remembers" its lexical environment (variables in scope when defined).
- The engine creates internal structures to maintain access to these variables, even after the outer function exits.

**2. Intermediate Representation (IR):**
- The AST is transformed into one or more intermediate representations (IR), which are lower-level, engine-specific structures.
- Example: V8 creates a "bytecode" from the AST for interpretation.
- Some engines use multiple IRs: e.g., Ignition (V8's interpreter) produces bytecode, TurboFan (V8's optimizing compiler) works on another IR.

**3. Interpreter & Baseline Compilation:**
- The engine first interprets the bytecode for fast startup (not fully optimized).
- Hot code paths (frequently run) are detected using counters and profiling.
- **Interpreter**: Executes bytecode line by line (fast startup, less optimized).

**4. Just-In-Time (JIT) Compilation & Optimization:**
- Hot code is recompiled and optimized by the JIT compiler, using profiling feedback.
- **Optimizations include:**
  - **Inlining:** Replacing a function call with the function body for speed.
  - **Dead Code Elimination:** Removing code that is never executed.
  - **Hidden Classes:** Creating internal representations for objects to speed up property access.
  - **Inline Caching:** Remembering the type of objects at property access sites for faster repeated access.
  - **Constant Folding:** Computing constant expressions at compile time.
- If runtime behavior changes (e.g., object shapes or types), the engine may **de-optimize** and fall back to less optimized code.

**5. Execution:**
- The optimized machine code is executed directly by the CPU.
- If assumptions break, the code is de-optimized and re-interpreted or recompiled.

**Bytecode vs Machine Code:**
- **Bytecode:** Engine-specific, portable, interpreted instructions (not CPU instructions).
- **Machine Code:** Native instructions for the CPU, generated by JIT for performance.

**Interpreter vs JIT:**
- **Interpreter:** Fast startup, interprets bytecode, good for rarely-run code.
- **JIT Compiler:** Slower to start, but produces optimized machine code for hot paths, yielding much faster execution.

**Diagram: Compilation Pipeline**
```
[Source Code]
     ↓
 [Tokenizer]
     ↓
     [AST]
     ↓
      [IR / Bytecode]
     ↓
 [Interpreter]
     ↓
 [JIT Compiler] ← (profiling, optimization, deoptimization)
     ↓
 [Optimized Machine Code]
     ↓
 [Execution]
```

**Performance Tips:**
- Write predictable code (avoid changing object shapes/properties dynamically).
- Use primitives consistently (avoid mixing types for the same variable).
- Avoid deep nesting and excessive closures when possible.
- Minimize creation of new functions/objects in tight loops.
- Use array methods and built-ins (they are highly optimized).

**Glossary:**
- **AST (Abstract Syntax Tree):** Tree representation of source code structure.
- **IR (Intermediate Representation):** Lower-level code between AST and machine code.
- **Bytecode:** Engine-specific, interpreted instructions.
- **JIT (Just-In-Time) Compiler:** Compiles hot code to optimized machine code at runtime.
- **Hidden Classes:** Engine optimization for fast object property access.
- **Inline Caching:** Optimization for repeated property access.
- **Deoptimization:** Reverting optimized code when assumptions break.
- **Closure:** Function with access to its lexical scope, even after the outer function exits.

### Call Stack & Execution Context
- JS is single-threaded (one call stack).
- Each function call creates a new stack frame.

### Event Loop & Task Queues
- Handles async code (setTimeout, Promises, events).
- **Event loop** checks the call stack and task queues (macrotasks, microtasks).
- Executes queued callbacks when the stack is empty.

**Diagram:**
```
[Call Stack] ←→ [Event Loop] ←→ [Task Queues]
```

---

## 2. Rendering Pipeline (How Browsers Paint Pages)

### Steps in Rendering:
1. **HTML Parsing:** Builds the DOM tree
2. **CSS Parsing:** Builds the CSSOM tree
3. **Render Tree Construction:** Combines DOM + CSSOM
4. **Layout (Reflow):** Calculates position/size of elements
5. **Painting:** Fills in pixels (colors, images, text)
6. **Compositing:** Layers are combined for display

**Diagram:**
```
HTML → [DOM]
CSS  → [CSSOM]
        ↓
   [Render Tree]
        ↓
     [Layout]
        ↓
    [Paint]
        ↓
 [Compositing]
```

### What Triggers Reflow & Repaint?
- **Reflow:** Changes to layout (size, position, adding/removing elements)
- **Repaint:** Changes to appearance (color, visibility) but not layout

### Best Practices
- Minimize layout thrashing (avoid frequent DOM reads/writes)
- Batch DOM changes
- Use CSS transforms for animations (avoid triggering layout)

---

## 3. Browser Rendering & JavaScript Interaction
- JS can block rendering if it runs on the main thread
- Use async/defer for scripts to avoid blocking HTML parsing
- Heavy JS can cause jank (laggy UI)

**Tip:** Use web workers for CPU-intensive tasks to keep UI responsive.

---

## 4. Visual Summary

![Browser Rendering Pipeline](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work/rendering.svg)

---

## 5. Further Reading
- [MDN: How browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/How_browsers_work)
- [Jake Archibald: In the Loop](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [Google Developers: Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path)
