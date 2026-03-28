// module protect their variables and functions from leaking

console.log("sum module executed"); // This will be printed when the sum.js module is loaded

export var x = 'hello world'

export function calculateSum(a, b) {
    const sum = a + b;
    console.log("The sum of " + a + " and " + b + " is: " + sum);
}