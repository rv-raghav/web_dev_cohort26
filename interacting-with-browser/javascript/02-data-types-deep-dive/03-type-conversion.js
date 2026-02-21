// ============================================================
// 📋 03 — Type Conversion & Coercion  (🆕 Added)
// ============================================================
// JavaScript is dynamically typed — values can change type.
// "Conversion" = you do it explicitly.
// "Coercion"   = JS does it implicitly behind the scenes.
// ============================================================


// ==========================================================
//  SECTION A — Explicit Conversion (you decide)
// ==========================================================


// ----------------------------------------------------------
// 1. To String
// ----------------------------------------------------------
console.log(String(42));        // "42"
console.log(String(true));      // "true"
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"
console.log((100).toString());  // "100"


// ----------------------------------------------------------
// 2. To Number
// ----------------------------------------------------------
console.log(Number("42"));        // 42
console.log(Number(""));          // 0
console.log(Number("hello"));     // NaN
console.log(Number(true));        // 1
console.log(Number(false));       // 0
console.log(Number(null));        // 0
console.log(Number(undefined));   // NaN

// Unary + operator (shorthand for Number())
console.log(+"42");   // 42
console.log(+"");     // 0
console.log(+true);   // 1
console.log(+false);  // 0


// ----------------------------------------------------------
// 3. To Boolean
// ----------------------------------------------------------
// Falsy values → false:  0, "", null, undefined, NaN, false
// Everything else        → true  (including "0", [], {})
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

console.log(Boolean(1));         // true
console.log(Boolean("hello"));   // true
console.log(Boolean([]));        // true  ← empty array is truthy!
console.log(Boolean({}));        // true  ← empty object is truthy!
console.log(Boolean("0"));       // true  ← non-empty string is truthy!

// Double NOT shorthand: !! converts any value to boolean
console.log(!!"hello"); // true
console.log(!!0);        // false


// ==========================================================
//  SECTION B — Implicit Coercion (JS decides for you)
// ==========================================================


// ----------------------------------------------------------
// 4. String coercion with + operator
// ----------------------------------------------------------
// When one operand is a string, + concatenates instead of adding
console.log("5" + 3);       // "53"  (number 3 coerced to string)
console.log("Score: " + 100); // "Score: 100"
console.log(5 + "");        // "5"


// ----------------------------------------------------------
// 5. Numeric coercion with other operators
// ----------------------------------------------------------
// -, *, /, % always try to convert to numbers
console.log("10" - 5);   // 5
console.log("6" * "3");  // 18
console.log("20" / 4);   // 5
console.log("10" % 3);   // 1
console.log("abc" - 1);  // NaN


// ----------------------------------------------------------
// 6. Comparison coercion
// ----------------------------------------------------------
console.log("5" == 5);   // true  — loose equality coerces types
console.log("5" === 5);  // false — strict equality, no coercion
console.log(null == undefined);  // true  — special rule
console.log(null === undefined); // false — different types


// ----------------------------------------------------------
// 7. Boolean coercion in conditions
// ----------------------------------------------------------
// Any value used in an if/while is coerced to boolean
if ("non-empty string") {
    console.log("Truthy!"); // This runs
}

if (0) {
    console.log("This will NOT run"); // 0 is falsy
}


// ==========================================================
//  Key Takeaways
// ==========================================================
// 1. Always use === (strict equality) to avoid coercion surprises
// 2. Know your falsy values: 0, "", null, undefined, NaN, false
// 3. + with a string always concatenates; -, *, / always convert to number
// 4. Use Number(), String(), Boolean() for explicit, readable conversions
