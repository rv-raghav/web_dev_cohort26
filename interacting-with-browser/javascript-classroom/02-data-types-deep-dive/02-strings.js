// ============================================================
// 📋 02 — Strings
// ============================================================
// Strings are immutable sequences of characters. JavaScript
// provides three ways to create them and dozens of built-in
// methods to search, slice, and transform them.
// ============================================================


// ----------------------------------------------------------
// 1. Creating strings — literal, String(), template literal
// ----------------------------------------------------------
const codeName = "Atomic";
const backupName = String("Night Owl");
const templateName = `Agent ${codeName}`;


// ----------------------------------------------------------
// 2. Strings are IMMUTABLE
// ----------------------------------------------------------
let intercepted = "HELLO";
intercepted[0] = "J"; // silently fails, strings are immutable
console.log(intercepted);


// ----------------------------------------------------------
// 3. Accessing characters — length, charAt, bracket, at()
// ----------------------------------------------------------
const secretCode = "OMEGA-7";
console.log(secretCode.length); // 7 characters
console.log(secretCode.charAt(99)); // charAt returns empty string if index is out of bounds
console.log(secretCode[99]); // returns undefined if index is out of bounds
console.log(secretCode.at(-1)); // last character (Supports negative indexing)


// ----------------------------------------------------------
// 4. Case conversion
// ----------------------------------------------------------
const rawTransmission = "Eagle has Landed";
console.log(rawTransmission.toLowerCase()); // "eagle has landed"
console.log(rawTransmission.toUpperCase()); // "EAGLE HAS LANDED"


// ----------------------------------------------------------
// 5. Searching — indexOf
// ----------------------------------------------------------
const message = "The drop point is at Dock 7, Repeat, Dock 7.";
console.log(message.indexOf("Dock"));


// ----------------------------------------------------------
// 6. Extracting — slice
// ----------------------------------------------------------
message.slice(0, 12);


// ----------------------------------------------------------
// 7. Splitting a string into an array
// ----------------------------------------------------------
const orders = "move-north|hold-position|extract-vip";
orderList = orders.split("|");
console.log("Split", orderList);

const myDataValue = "SOS".split("");
console.log(typeof myDataValue);


// ----------------------------------------------------------
// 🆕 8. trim(), trimStart(), trimEnd() — Remove whitespace
// ----------------------------------------------------------
const rawInput = "   secret code   ";
console.log(rawInput.trim());      // "secret code"
console.log(rawInput.trimStart()); // "secret code   "
console.log(rawInput.trimEnd());   // "   secret code"


// ----------------------------------------------------------
// 🆕 9. includes(), startsWith(), endsWith() — Boolean searches
// ----------------------------------------------------------
const intel = "Operation Nighthawk is a go";
console.log(intel.includes("Nighthawk")); // true
console.log(intel.startsWith("Operation")); // true
console.log(intel.endsWith("go"));         // true
console.log(intel.includes("daylight"));   // false


// ----------------------------------------------------------
// 🆕 10. replace() & replaceAll()
// ----------------------------------------------------------
const report = "Target spotted at Dock 7. Dock 7 is secured.";
console.log(report.replace("Dock 7", "Dock 9"));    // replaces FIRST occurrence only
console.log(report.replaceAll("Dock 7", "Dock 9")); // replaces ALL occurrences


// ----------------------------------------------------------
// 🆕 11. repeat() & padStart() / padEnd()
// ----------------------------------------------------------
console.log("SOS ".repeat(3));              // "SOS SOS SOS "
console.log("42".padStart(6, "0"));         // "000042" — pad from the left
console.log("42".padEnd(6, "-"));           // "42----" — pad from the right


// ----------------------------------------------------------
// 🆕 12. String concatenation methods
// ----------------------------------------------------------
const firstName = "James";
const lastName = "Bond";

// Method 1: + operator
console.log(firstName + " " + lastName);

// Method 2: concat()
console.log(firstName.concat(" ", lastName));

// Method 3: Template literals (preferred ✅)
console.log(`${firstName} ${lastName}`);
