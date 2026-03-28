// module protect their variables and functions from leaking

console.log("sum module executed"); // This will be printed when the sum.js module is loaded

var x = 'hello world'
function calculateSum(a, b) {
    const sum = a + b;
    console.log("The sum of " + a + " and " + b + " is: " + sum);
}

console.log(module.exports); // Initially, module.exports is an empty object

module.exports = {
    x,
    calculateSum
}; // Exporting the calculateSum function to be used in other modules like app.js