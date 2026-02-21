// ============================================================
// 📋 01 — Array Basics
// ============================================================
// Arrays are ordered, zero-indexed lists that can hold any
// type of value. They are technically objects under the hood.
// ============================================================


// ----------------------------------------------------------
// 1. Creating arrays
// ----------------------------------------------------------
const carriage1 = ["John", "Jane", "Jack"];
const emptyCarriage = [];

const threeEmptySeats = Array(3);
console.log(threeEmptySeats); // [ <3 empty items> ]
console.log(threeEmptySeats.length); // 3

const passengers = Array("John", "Jane", "Jack");

const singlePassenger = Array.of(3);
console.log(singlePassenger); // [ 3 ] // Creates an array with a single element 3

const trainCode = Array.from("DUST")
console.log(trainCode); // [ 'D', 'U', 'S', 'T' ] // Creates an array from a string, splitting it into individual characters


// ----------------------------------------------------------
// 2. Changing array length (truncating / extending)
// ----------------------------------------------------------
const tempTrain = ["A", "B", "C", "D", "E"];
tempTrain.length = 3;
console.log(tempTrain); // [ 'A', 'B', 'C' ] // Truncates the array to the new length of 3
tempTrain.length = 5;
console.log(tempTrain); // [ 'A', 'B', 'C', <2 empty items> ] // Extends the array back to length 5, but the new slots are empty


// ----------------------------------------------------------
// 3. Mutating vs Non-mutating methods (summary)
// ----------------------------------------------------------
// push, pop, shift, unshift, splice

// concat, slice, flat

const trainCopy = carriage1.slice();
console.log(trainCopy); // [ 'John', 'Jane', 'Jack' ] // Creates a shallow copy of the array

// Searching: indexOf, includes, find, findIndex


// ----------------------------------------------------------
// 4. Checking if something is an array
// ----------------------------------------------------------
console.log(typeof []); // "object"
console.log(Array.isArray([])); // true


// ----------------------------------------------------------
// 5. Key points recap
// ----------------------------------------------------------
// key points
// 1. []
// 2. array are 0 based
// 3. mutating methods: push, pop, shift, unshift, splice
// 4. non-mutating methods: concat, slice, flat, flatmap
// 5. searching: indexOf, includes, find, findIndex
// Array.isArray() to check if a value is an array


// ==========================================================
//  🆕 SECTION B — Mutating Methods in Action
// ==========================================================


// ----------------------------------------------------------
// 🆕 6. push() & pop() — Add/remove from END
// ----------------------------------------------------------
const queue = ["Alice", "Bob"];
queue.push("Charlie");        // returns new length → 3
console.log(queue);           // ["Alice", "Bob", "Charlie"]

const last = queue.pop();     // removes & returns last element
console.log(last);            // "Charlie"
console.log(queue);           // ["Alice", "Bob"]


// ----------------------------------------------------------
// 🆕 7. unshift() & shift() — Add/remove from START
// ----------------------------------------------------------
const line = ["second", "third"];
line.unshift("first");        // adds to the beginning
console.log(line);            // ["first", "second", "third"]

const firstPerson = line.shift(); // removes from the beginning
console.log(firstPerson);    // "first"
console.log(line);            // ["second", "third"]


// ----------------------------------------------------------
// 🆕 8. splice() — Insert, remove, or replace anywhere
// ----------------------------------------------------------
const colors = ["red", "green", "blue", "yellow"];

// Remove 1 element at index 1
const removed = colors.splice(1, 1);
console.log(removed);  // ["green"]
console.log(colors);   // ["red", "blue", "yellow"]

// Insert "orange" at index 1 (remove 0 elements)
colors.splice(1, 0, "orange");
console.log(colors);   // ["red", "orange", "blue", "yellow"]

// Replace 1 element at index 2 with "purple"
colors.splice(2, 1, "purple");
console.log(colors);   // ["red", "orange", "purple", "yellow"]


// ==========================================================
//  🆕 SECTION C — Non-Mutating Methods in Action
// ==========================================================


// ----------------------------------------------------------
// 🆕 9. concat() — Merge arrays
// ----------------------------------------------------------
const fruits = ["apple", "banana"];
const veggies = ["carrot", "spinach"];
const food = fruits.concat(veggies);
console.log(food);     // ["apple", "banana", "carrot", "spinach"]
console.log(fruits);   // ["apple", "banana"] — original unchanged


// ----------------------------------------------------------
// 🆕 10. flat() — Flatten nested arrays
// ----------------------------------------------------------
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]   — flattens 1 level
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]     — flattens 2 levels
console.log(nested.flat(Infinity)); // flattens all levels


// ----------------------------------------------------------
// 🆕 11. Searching methods
// ----------------------------------------------------------
const heroes = ["Batman", "Superman", "Wonder Woman", "Flash"];

console.log(heroes.indexOf("Superman"));    // 1
console.log(heroes.indexOf("Aquaman"));     // -1 (not found)

console.log(heroes.includes("Flash"));      // true
console.log(heroes.includes("Aquaman"));    // false

// find() — returns the FIRST element that passes the test
const found = heroes.find((h) => h.startsWith("W"));
console.log(found); // "Wonder Woman"

// findIndex() — returns the INDEX of the first match
const foundIdx = heroes.findIndex((h) => h.startsWith("W"));
console.log(foundIdx); // 2
