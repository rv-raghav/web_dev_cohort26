// ============================================================
// 📋 01 — Numbers & Math
// ============================================================
// JavaScript has a single `number` type for integers AND floats
// (IEEE 754 double-precision). This file covers number
// constants, validation, parsing, and the Math object.
// ============================================================


// ----------------------------------------------------------
// 1. Declaring numbers
// ----------------------------------------------------------
const crewMembers = 40;
const fuelTons = 142.42;
const light_speed = 299_888_999; // Using underscores for better readability in large numbers


// ----------------------------------------------------------
// 2. Special numeric values
// ----------------------------------------------------------
const infiniteRange = Infinity;
const negativeInfiniteRange = -Infinity;
const notANumber = NaN;

console.log(1 / 0); // Output: Infinity
console.log(-1 / 0); // Output: -Infinity
console.log(0 / 0); // Output: NaN


// ----------------------------------------------------------
// 3. Number constants
// ----------------------------------------------------------
console.log(Number.MAX_SAFE_INTEGER); // Output: 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // Output: -9007199254740991
console.log(Number.EPSILON); // Output: 2.220446049250313e-16


// ----------------------------------------------------------
// 4. Number validation methods
// ----------------------------------------------------------
console.log(Number.isFinite(100)); // Output: true
console.log(Number.isFinite(Infinity)); // Output: false
console.log(Number.isNaN(NaN)); // Output: true
console.log(Number.isNaN(123)); // Output: false


// ----------------------------------------------------------
// 5. Parsing strings to numbers
// ----------------------------------------------------------
console.log(Number.parseInt("42")); // Output: 42
const fuelString = "142.42 tons";
console.log(Number.parseFloat(fuelString)); // Output: 142.42


// ----------------------------------------------------------
// 6. Math object — Rounding & random
// ----------------------------------------------------------
const thrustForce = 4.57;
console.log(Math.round(thrustForce)); // Output: 5
console.log(Math.floor(thrustForce)); // Output: 4
console.log(Math.ceil(thrustForce)); // Output: 5
console.log(Math.random()); // Output: A random number between 0 and 1
console.log(Math.trunc(thrustForce)); // Output: 4


// ----------------------------------------------------------
// 7. Math.min / Math.max
// ----------------------------------------------------------
const temp = [-273.15, 0, 100];
console.log(Math.min(temp));
console.log(Math.max(temp));


// ----------------------------------------------------------
// 8. Math.abs() — Absolute value
// ----------------------------------------------------------
function calculateThrust(mass, acceleration) {
    return Math.abs(mass * acceleration) < Math.EPSILON; // Using Math.abs to ensure thrust is always positive
}


// ----------------------------------------------------------
// 🆕 9. Generating random integers in a range
// ----------------------------------------------------------
// Random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log("Random crew member seat:", getRandomInt(1, 40));


// ----------------------------------------------------------
// 🆕 10. toFixed() & toPrecision() — Formatting numbers
// ----------------------------------------------------------
const pi = 3.14159265;
console.log(pi.toFixed(2));      // "3.14"  — rounds to 2 decimal places (returns string)
console.log(pi.toPrecision(4));  // "3.142" — 4 significant digits (returns string)


// ----------------------------------------------------------
// 🆕 11. Number() vs parseInt() vs parseFloat()
// ----------------------------------------------------------
console.log(Number("42"));        // 42
console.log(Number("42abc"));     // NaN   — strict, fails on mixed content
console.log(parseInt("42abc"));   // 42    — lenient, parses until non-digit
console.log(parseFloat("3.14m")); // 3.14  — same lenient behavior for floats
console.log(Number(""));          // 0     — empty string becomes 0
console.log(Number(true));        // 1     — boolean true → 1
console.log(Number(false));       // 0     — boolean false → 0
