// ============================================================
// 📋 01 — Operators  (🆕 Added)
// ============================================================
// JavaScript operators let you perform calculations, compare
// values, and combine conditions. This file covers every
// category you'll use day-to-day.
// ============================================================


// ==========================================================
//  SECTION A — Arithmetic Operators
// ==========================================================

const a = 15;
const b = 4;

console.log("Addition:       ", a + b);  // 19
console.log("Subtraction:    ", a - b);  // 11
console.log("Multiplication: ", a * b);  // 60
console.log("Division:       ", a / b);  // 3.75
console.log("Modulus (%%):    ", a % b);  // 3  — remainder
console.log("Exponentiation: ", a ** b); // 50625  — 15⁴


// ----------------------------------------------------------
// Increment / Decrement
// ----------------------------------------------------------
let score = 10;
score++;          // post-increment → score is now 11
console.log("After score++:", score);
++score;          // pre-increment → score is now 12
console.log("After ++score:", score);
score--;          // post-decrement → score is now 11
console.log("After score--:", score);


// ==========================================================
//  SECTION B — Assignment Operators
// ==========================================================

let hp = 100;
hp += 20;  // hp = hp + 20 → 120
hp -= 30;  // hp = hp - 30 → 90
hp *= 2;   // hp = hp * 2  → 180
hp /= 3;   // hp = hp / 3  → 60
hp %= 7;   // hp = hp % 7  → 4
hp **= 3;  // hp = hp ** 3 → 64
console.log("Final HP:", hp);


// ==========================================================
//  SECTION C — Comparison Operators
// ==========================================================

console.log(5 == "5");   // true  — loose equality (type coercion)
console.log(5 === "5");  // false — strict equality (no coercion) ✅ prefer this
console.log(5 != "5");   // false — loose inequality
console.log(5 !== "5");  // true  — strict inequality ✅ prefer this

console.log(10 > 5);    // true
console.log(10 < 5);    // false
console.log(10 >= 10);  // true
console.log(10 <= 9);   // false


// ==========================================================
//  SECTION D — Logical Operators
// ==========================================================

const isAlive = true;
const hasShield = false;

console.log(isAlive && hasShield);  // false — AND: both must be true
console.log(isAlive || hasShield);  // true  — OR:  at least one true
console.log(!isAlive);              // false — NOT: inverts the value


// ----------------------------------------------------------
// Short-circuit evaluation
// ----------------------------------------------------------
// && returns the FIRST falsy value (or the last value if all truthy)
console.log("hello" && 42 && "world"); // "world"
console.log("" && 42);                 // ""

// || returns the FIRST truthy value (or the last value if all falsy)
console.log(null || "" || "fallback"); // "fallback"
console.log(0 || false || undefined);  // undefined


// ----------------------------------------------------------
// Nullish Coalescing ?? (bonus preview)
// ----------------------------------------------------------
// ?? returns the right side ONLY when left is null or undefined
// (unlike || which triggers on ANY falsy value)
const userScore = 0;
console.log(userScore || 100);  // 100  — 0 is falsy, so || picks 100
console.log(userScore ?? 100);  // 0    — 0 is NOT null/undefined, so ?? keeps 0


// ==========================================================
//  SECTION E — Ternary Operator
// ==========================================================
// condition ? valueIfTrue : valueIfFalse

const age = 20;
const canVote = age >= 18 ? "Yes" : "No";
console.log("Can vote:", canVote); // "Yes"


// ==========================================================
//  SECTION F — typeof & instanceof
// ==========================================================

console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object"  — JS quirk!
console.log(typeof []);          // "object"
console.log(typeof {});          // "object"
console.log(typeof function(){}); // "function"

// instanceof checks the prototype chain
console.log([] instanceof Array);  // true
console.log({} instanceof Object); // true


// ==========================================================
//  Key Takeaways
// ==========================================================
// 1. Always use === and !== (strict) over == and !=
// 2. && and || short-circuit — useful for default values & guards
// 3. ?? is safer than || for defaults when 0 or "" are valid values
// 4. Ternary is great for simple conditional assignments
