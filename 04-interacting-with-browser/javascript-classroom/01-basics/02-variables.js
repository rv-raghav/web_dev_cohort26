// ============================================================
// 📋 02 — Variables (var, let, const)
// ============================================================
// JavaScript has three keywords for declaring variables.
// Understanding their differences is fundamental.
// ============================================================


// ----------------------------------------------------------
// 1. var — Function-scoped, hoisted, can be redeclared
// ----------------------------------------------------------
var shipName = "The Amber";
console.log("Ship Name:", shipName);


// ----------------------------------------------------------
// 2. let — Block-scoped, can be reassigned, NOT redeclared
// ----------------------------------------------------------
let crewCount = 12;
console.log("Crew Count:", crewCount);
crewCount = 15;


// ----------------------------------------------------------
// 3. const — Block-scoped, CANNOT be reassigned
// ----------------------------------------------------------
const captainName = "Jack Sparrow";
console.log("Captain Name:", captainName);
// captainName = "Will Turner" // This will cause an error because captainName is a constant


// ----------------------------------------------------------
// 4. Scope differences: var leaks out of blocks!
// ----------------------------------------------------------
if (true) {
    var leakyTreasure = "Gold Coins";
}

for (var i = 0; i < 10; i++) {
    //
}

for (let j = 0; j < 10; j++) {
    //
}

console.log("Leaky Treasure:", leakyTreasure); // This will work because var is function-scoped, not block-scoped


// ----------------------------------------------------------
// 5. Naming conventions & best practices
// ----------------------------------------------------------
let shipSpeed = 22;          // camelCase for regular variables
let _privatelog = "secret";  // underscore prefix for "private" vars
let _ = "a";                 // single underscore (used in lodash, etc.)
let MONGODB_URL = "";        // UPPER_SNAKE_CASE for constants / env vars


// ----------------------------------------------------------
// 6. const with objects & arrays — the REFERENCE is constant
// ----------------------------------------------------------
const treasureChest = {
    gold: 100,
    rubies: 50,
    maps: 2,
};

treasureChest.gold = 150; // This is allowed because we are not reassigning the variable, just modifying the object it references
// treasureChest = { gold: 200 } // This will cause an error because we are trying to reassign the constant variable

const crewRoster = ["Jack Sparrow", "Will Turner", "Elizabeth Swann"];
crewRoster.push("Gibbs"); // This is allowed because we are not reassigning the variable, just modifying the array it references
crewRoster[0] = "Captain Jack Sparrow"; // This is also allowed for the same reason2
// crewRoster = ["Jack Sparrow", "Will Turner"] // This will cause an error because we are trying to reassign the constant variable


// ----------------------------------------------------------
// 🆕 7. Hoisting behavior
// ----------------------------------------------------------
// var is hoisted (declaration moves to top, value stays)
console.log(hoistedVar); // undefined (not an error!)
var hoistedVar = "I was hoisted";

// let & const are hoisted too, but in a "Temporal Dead Zone" (TDZ)
// Accessing them before declaration throws a ReferenceError
// console.log(hoistedLet); // ❌ ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = "I am in the TDZ until this line";
