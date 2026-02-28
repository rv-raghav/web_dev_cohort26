// ============================================
// Symbols in JavaScript
// ============================================
// Symbol is a primitive data type introduced in ES6.
// Every Symbol value is unique and immutable — used as unique identifiers.

// -------------------------------------------
// 1. Creating Symbols
// -------------------------------------------
// Symbol() creates a new unique symbol each time, even with the same description.

const aadhar_of_mayur = Symbol("aadhar");
const aadhar_of_rahul = Symbol("aadhar");

// Even though both have the same description, they are NOT equal
console.log(aadhar_of_mayur === aadhar_of_rahul); // false

// typeof returns "symbol"
console.log(typeof aadhar_of_mayur); // "symbol"

// -------------------------------------------
// 2. Symbol Properties
// -------------------------------------------
// `.description` — returns the optional description string passed to Symbol()
console.log(aadhar_of_mayur.description); // "aadhar"

// `.toString()` — returns "Symbol(description)"
console.log(aadhar_of_mayur.toString()); // "Symbol(aadhar)"

// -------------------------------------------
// 3. Symbols as Object Keys
// -------------------------------------------
// Symbols can be used as property keys using computed property syntax [symbol].
// Symbol-keyed properties are hidden from standard enumeration methods.

const citizenRecord = {
  name: "Mayur",
  [aadhar_of_mayur]: "1234567890",
};

// Object.keys() only returns string keys — symbols are NOT included
console.log(Object.keys(citizenRecord)); // ["name"]

// Object.getOwnPropertySymbols() returns only the symbol keys
console.log(Object.getOwnPropertySymbols(citizenRecord)); // [Symbol(aadhar)]
