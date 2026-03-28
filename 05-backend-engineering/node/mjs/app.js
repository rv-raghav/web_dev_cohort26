import { calculateSum, x } from "./sum.js";

var name = "Chai Code";
var a = 10;
var b = 20;

console.log(x);
calculateSum(a, b); // Calling the function defined in sum.js after importing it using require

console.log("Hello " + name);
console.log("The sum of a and b is: " + (a + b));

console.log(global);
console.log(this); // Empty Object in Node.js different from browser where it refers to the window object
console.log(globalThis); // Refers to the global object in Node.js, which is the same as global in this context
console.log(globalThis === global); // true
