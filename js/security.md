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
