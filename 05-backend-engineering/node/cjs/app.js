require("./xyz.js"); // one module into another module

// const { x, calculateSum } = require("./calculate/sum.js"); // Importing the sum.js file to use the calculateSum function defined in it
// const { calculateMultiply } = require("./calculate/multiply.js"); // Importing the calculate/multiply.js file to use the calculateMultiply function defined in it

const { calculateSum, calculateMultiply } = require("./calculate/index.js"); // Importing the index.js file which re-exports the functions from sum.js and multiply.js to use them in this app.js file

const data = require("./data.json"); // Importing a JSON file to use its contents in this app.js file

console.log(JSON.stringify(data)); // This will print the contents of the data.json file to the console

var name = "Chai Code";
var a = 10;
var b = 20;

// console.log(x);
calculateSum(a, b); // Calling the function defined in sum.js after importing it using require
calculateMultiply(a, b); // Calling the function defined in multiply.js after importing it using require
console.log("Hello " + name);
console.log("The sum of a and b is: " + (a + b));

console.log(global);
console.log(this); // Empty Object in Node.js different from browser where it refers to the window object
console.log(globalThis); // Refers to the global object in Node.js, which is the same as global in this context
console.log(globalThis === global); // true
