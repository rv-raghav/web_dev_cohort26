// ============================================================
// 📋 04 — call(), apply(), bind()
// ============================================================
// These methods let you manually control what `this` refers to
// when calling a function. Essential for borrowing methods
// and working with detached functions.
// ============================================================


// ----------------------------------------------------------
// Original notes
// ----------------------------------------------------------
// call and apply => basic chef (kitchen)
// bind => someone who sends his team to cook => returns a new function

function cookDish(ingredient, style) {
    return `${this.name} prepares ${ingredient} in ${style} style !`;
}


// ==========================================================
//  🆕 call(), apply(), bind() in action
// ==========================================================


// ----------------------------------------------------------
// 1. call() — Invoke immediately, pass args ONE BY ONE
// ----------------------------------------------------------
// Syntax: fn.call(thisArg, arg1, arg2, ...)

const chef1 = { name: "Gordon Ramsay" };
const chef2 = { name: "Sanjeev Kapoor" };

console.log(cookDish.call(chef1, "Salmon", "French"));
// "Gordon Ramsay prepares Salmon in French style !"

console.log(cookDish.call(chef2, "Paneer", "Tandoori"));
// "Sanjeev Kapoor prepares Paneer in Tandoori style !"


// ----------------------------------------------------------
// 2. apply() — Invoke immediately, pass args AS AN ARRAY
// ----------------------------------------------------------
// Syntax: fn.apply(thisArg, [arg1, arg2, ...])
// Identical to call(), just different arg format

console.log(cookDish.apply(chef1, ["Lobster", "Italian"]));
// "Gordon Ramsay prepares Lobster in Italian style !"

console.log(cookDish.apply(chef2, ["Biryani", "Hyderabadi"]));
// "Sanjeev Kapoor prepares Biryani in Hyderabadi style !"

// Tip: apply is handy when you already have an array of args
const args = ["Pasta", "Roman"];
console.log(cookDish.apply(chef1, args));


// ----------------------------------------------------------
// 3. bind() — Returns a NEW function with `this` permanently set
// ----------------------------------------------------------
// Syntax: const boundFn = fn.bind(thisArg, arg1, arg2, ...)
// Does NOT call the function — just creates a bound copy

const gordonCooks = cookDish.bind(chef1);
console.log(gordonCooks("Steak", "American"));
// "Gordon Ramsay prepares Steak in American style !"

// You can also pre-fill (partial application) some arguments
const gordonCooksFrench = cookDish.bind(chef1, "Croissant", "French");
console.log(gordonCooksFrench());
// "Gordon Ramsay prepares Croissant in French style !"


// ----------------------------------------------------------
// 4. Real-world use case — Borrowing methods
// ----------------------------------------------------------
const doctor = {
    name: "Dr. Strange",
    greet(greeting) {
        return `${greeting}, I am ${this.name}`;
    },
};

const engineer = { name: "Tony Stark" };

// Borrow the greet method from doctor for engineer
console.log(doctor.greet.call(engineer, "Hey"));
// "Hey, I am Tony Stark"


// ----------------------------------------------------------
// 5. Real-world use case — Fixing detached methods with bind
// ----------------------------------------------------------
const timer = {
    seconds: 10,
    start() {
        console.log(`Timer starts at ${this.seconds}s`);
    },
};

// Detaching the method loses `this`
const detachedStart = timer.start;
// detachedStart(); // ❌ this.seconds is undefined

// Fix with bind
const boundStart = timer.start.bind(timer);
boundStart(); // ✅ "Timer starts at 10s"


// ==========================================================
//  Quick Reference
// ==========================================================
// ┌──────────┬──────────────┬───────────────┬─────────────────┐
// │ Method   │ Calls fn?    │ Args format   │ Returns         │
// ├──────────┼──────────────┼───────────────┼─────────────────┤
// │ call()   │ ✅ YES       │ one by one    │ fn return value │
// │ apply()  │ ✅ YES       │ as an array   │ fn return value │
// │ bind()   │ ❌ NO        │ one by one    │ new bound fn    │
// └──────────┴──────────────┴───────────────┴─────────────────┘
