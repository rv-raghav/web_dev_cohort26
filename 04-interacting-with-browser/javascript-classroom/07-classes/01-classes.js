// ============================================
// Classes in JavaScript
// ============================================
// Classes are syntactic sugar over JavaScript's prototype-based inheritance.
// They provide a cleaner way to create objects and handle inheritance.

// -------------------------------------------
// 1. Basic Class Definition
// -------------------------------------------
// A class is defined using the `class` keyword.
// The `constructor` method initializes instance properties.

class Cricketer {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.matchesPlayed = 0;
    this.stamina = 100;
  }

  // Instance method — shared across all instances via the prototype
  introduce() {
    return `${this.name} the ${this.role} has played ${this.matchesPlayed} matches and has ${this.stamina} stamina.`;
  }
}

const player1 = new Cricketer("Rohit", "Batsman");
const player2 = new Cricketer("Bumrah", "Bowler");

// `hasOwnProperty` checks if a property exists directly on the object (not inherited)
console.log(player1.hasOwnProperty("name")); // true

// Classes are actually "functions" under the hood
console.log(typeof Cricketer); // "function"

// -------------------------------------------
// 2. Arrow Functions in Constructor
// -------------------------------------------
// Arrow functions defined inside the constructor capture `this` lexically.
// Each instance gets its own copy of the function (not shared via prototype).

class Debutant {
  constructor(name) {
    this.name = name;
    // Arrow function — `this` is bound to the instance at creation time
    this.walkOut = () => `${this.name} is walking out for the first time.`;
  }
}

const debutant1 = new Debutant("Abhishek");

// Even when extracted to a variable, `this` still refers to `debutant1`
const somethingFromLastClass = debutant1.walkOut;

const debutant2 = new Debutant("Rahul");

// Each instance has its own copy, so they are NOT the same reference
console.log(debutant1.walkOut === debutant2.walkOut); // false

// Works correctly even without being called on the object, thanks to arrow function
console.log(somethingFromLastClass()); // "Abhishek is walking out for the first time."
