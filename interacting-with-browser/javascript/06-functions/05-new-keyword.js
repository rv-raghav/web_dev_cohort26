// ============================================================
// 📋 05 — The `new` Keyword & Constructor Functions
// ============================================================
// The `new` keyword creates instances of user-defined objects.
// Before ES6 classes, constructor functions + prototype were
// THE way to create reusable object blueprints in JavaScript.
// ============================================================


// ----------------------------------------------------------
// 1. Constructor function + prototype method
// ----------------------------------------------------------
function TataCar(chassisNumber, modelName) {
    this.chassisNumber = chassisNumber
    this.modelName = modelName
    this.fuelLevel = 100
}

TataCar.prototype.status = function () {
    return `${this.modelName} with chassis number ${this.chassisNumber} has ${this.fuelLevel}% fuel`
}

const myCar = new TataCar("123456789", "Nexon")
console.log(myCar)
const myCar2 = new TataCar("123456789", "Harrier")
console.log(myCar2)

console.log(myCar.status())
console.log(myCar2.status())


// ==========================================================
//  🆕 What `new` actually does (under the hood)
// ==========================================================
// When you call `new TataCar(...)`, JS does 4 things:
//
// 1. Creates a brand new empty object  →  {}
// 2. Sets its prototype               →  {}.__proto__ = TataCar.prototype
// 3. Calls TataCar() with `this` pointing to the new object
// 4. Returns the new object (unless the function returns another object)


// ----------------------------------------------------------
// 🆕 2. What happens WITHOUT `new`?
// ----------------------------------------------------------
// Without `new`, `this` is the global object (or undefined in strict mode)
// const broken = TataCar("999", "Safari"); // ❌ Don't do this!
// console.log(broken); // undefined — no object returned


// ----------------------------------------------------------
// 🆕 3. instanceof — Check if an object was created by a constructor
// ----------------------------------------------------------
console.log(myCar instanceof TataCar);  // true
console.log(myCar instanceof Object);   // true  (everything is an Object)
console.log("hello" instanceof TataCar); // false


// ----------------------------------------------------------
// 🆕 4. Adding more prototype methods
// ----------------------------------------------------------
TataCar.prototype.drive = function (km) {
    this.fuelLevel = Math.max(0, this.fuelLevel - km * 0.5);
    return `${this.modelName} drove ${km}km. Fuel: ${this.fuelLevel}%`;
};

TataCar.prototype.refuel = function () {
    this.fuelLevel = 100;
    return `${this.modelName} refueled to 100%`;
};

console.log(myCar.drive(50));  // Nexon drove 50km. Fuel: 75%
console.log(myCar.drive(100)); // Nexon drove 100km. Fuel: 25%
console.log(myCar.refuel());   // Nexon refueled to 100%


// ----------------------------------------------------------
// 🆕 5. Why prototype? — Memory efficiency
// ----------------------------------------------------------
// Methods on the prototype are SHARED across all instances.
// If you define methods inside the constructor, each instance
// gets its OWN copy — wasting memory.

// ✅ Shared (1 copy for all instances)
// TataCar.prototype.status = function() { ... }

// ❌ Duplicated (N copies for N instances)
// function BadCar() { this.status = function() { ... } }


// ==========================================================
//  Key Takeaways
// ==========================================================
// 1. Constructor functions are called with `new` to create instances
// 2. `new` creates a fresh object, links its prototype, and binds `this`
// 3. Use .prototype for shared methods (memory efficient)
// 4. Use `instanceof` to check an object's constructor
// 5. Always capitalize constructor function names (convention: PascalCase)
