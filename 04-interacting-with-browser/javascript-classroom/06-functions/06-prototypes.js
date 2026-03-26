// ============================================================
// 📋 06 — Prototypes & Prototypal Inheritance
// ============================================================
// Every JS object has a hidden [[Prototype]] link to another
// object. When you access a property that doesn't exist on
// the object itself, JS walks UP the prototype chain to find it.
// This is how inheritance works in JavaScript.
// ============================================================


// ==========================================================
//  SECTION A — Prototype Chain with Object.create()
// ==========================================================

// ----------------------------------------------------------
// 1. Grandfather → Father → Son (prototype chain)
// ----------------------------------------------------------
const prithviraj = {
  name: "Prithviraj",
  generation: "grandfather",
  cookTraditionalDish() {
    return `${this.name} cooks an ancient family recipe`;
  },
};

const raj = Object.create(prithviraj);
raj.name = "Raj";
raj.generation = "father";
raj.runBusiness = function () {
  return `${this.name} runs a successful business`;
};
console.log(raj);

const ranbir = Object.create(raj);
ranbir.name = "Ranbir";
ranbir.generation = "son";
ranbir.makeFilm = function () {
  return `${this.name} makes a film`;
};

console.log(ranbir.makeFilm());         // own method
console.log(ranbir.runBusiness());       // inherited from raj (father)
console.log(ranbir.cookTraditionalDish()); // inherited from prithviraj (grandfather)


// ==========================================================
//  SECTION B — Extending Built-in Prototypes
// ==========================================================

// ----------------------------------------------------------
// 2. Adding a custom .last() method to ALL arrays
// ----------------------------------------------------------
Array.prototype.last = function () {
  return this[this.length - 1];
};

console.log([1, 2, 3].last());
console.log(["Anirudh", "Anirban", "Anirban", "Anirban"].last());

// ----------------------------------------------------------
// 3. Placeholder for custom .mapTwo() (work in progress)
// ----------------------------------------------------------
Array.prototype.mapTwo = function () {
    
}


// ==========================================================
//  🆕 SECTION C — Understanding the Chain
// ==========================================================

// ----------------------------------------------------------
// 🆕 4. Visualizing the prototype chain
// ----------------------------------------------------------
// ranbir  →  raj  →  prithviraj  →  Object.prototype  →  null
//
// When you call ranbir.cookTraditionalDish():
//   1. JS looks on ranbir        → not found
//   2. JS looks on raj           → not found
//   3. JS looks on prithviraj    → ✅ found! Call it with this = ranbir

console.log(Object.getPrototypeOf(ranbir) === raj);         // true
console.log(Object.getPrototypeOf(raj) === prithviraj);     // true
console.log(Object.getPrototypeOf(prithviraj) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype));       // null (end of chain)


// ----------------------------------------------------------
// 🆕 5. hasOwnProperty() — Own vs inherited
// ----------------------------------------------------------
console.log(ranbir.hasOwnProperty("name"));              // true  — own property
console.log(ranbir.hasOwnProperty("makeFilm"));          // true  — own method
console.log(ranbir.hasOwnProperty("runBusiness"));        // false — inherited from raj
console.log(ranbir.hasOwnProperty("cookTraditionalDish")); // false — inherited from prithviraj


// ----------------------------------------------------------
// 🆕 6. for...in iterates over ALL enumerable props (own + inherited)
// ----------------------------------------------------------
console.log("\n--- for...in on ranbir (own + inherited) ---");
for (const key in ranbir) {
    const source = ranbir.hasOwnProperty(key) ? "(own)" : "(inherited)";
    console.log(`  ${key} ${source}`);
}


// ----------------------------------------------------------
// 🆕 7. Constructor function prototype (recap from 05-new-keyword.js)
// ----------------------------------------------------------
// When you use `new`, the instance's __proto__ points to
// Constructor.prototype. That's why prototype methods are shared.

function Weapon(name, damage) {
    this.name = name;
    this.damage = damage;
}

Weapon.prototype.swing = function () {
    return `⚔️ ${this.name} swings for ${this.damage} damage!`;
};

const sword = new Weapon("Excalibur", 150);
const axe = new Weapon("Battle Axe", 120);

// Both share the SAME swing function
console.log(sword.swing());
console.log(axe.swing());
console.log(sword.swing === axe.swing); // true — same reference, memory efficient


// ==========================================================
//  Key Takeaways
// ==========================================================
// 1. Every object has a [[Prototype]] — forming a chain up to null
// 2. Object.create(proto) creates an object with proto as its prototype
// 3. Property lookup walks UP the chain until found or null
// 4. hasOwnProperty() distinguishes own vs inherited properties
// 5. You CAN extend built-in prototypes (like Array), but be careful
//    — it affects ALL arrays globally and can conflict with libraries
// 6. Constructor.prototype is where shared methods live for `new` instances



// create your own map function, reduce function, filter function, forEach function