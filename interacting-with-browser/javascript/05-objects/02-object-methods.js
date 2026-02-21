// ============================================================
// 📋 02 — Object Methods
// ============================================================
// Handy static methods on the Object constructor to extract
// keys, values, and entries from objects.
// ============================================================

const artifact = {
    name: 'The One Ring',
    era: 'Second Age',
    value: 5000,
    material: "volcanic glass"
}

// --- Object.keys() / values() / entries() ---
const keys = Object.keys(artifact);
const values = Object.values(artifact);
const entries = Object.entries(artifact);

console.log(keys);
console.log(values);
console.log(entries);

// --- Iterating over entries ---
for (const [key, value] of Object.entries(artifact)) {
    console.log(key, value);
}


// ==========================================================
//  🆕 Additional object methods
// ==========================================================

// --- Object.fromEntries() — Reverse of Object.entries() ---
const pairs = [["name", "Excalibur"], ["damage", 150]];
const sword = Object.fromEntries(pairs);
console.log(sword); // { name: "Excalibur", damage: 150 }

// --- Checking if object is empty ---
const emptyObj = {};
console.log(Object.keys(emptyObj).length === 0); // true

// --- Object.seal() vs Object.freeze() ---
// seal  → can MODIFY existing props, cannot ADD or DELETE
// freeze → cannot MODIFY, ADD, or DELETE
const inventory = { potions: 5, scrolls: 3 };
Object.seal(inventory);
inventory.potions = 10;       // ✅ allowed
// inventory.gold = 100;      // ❌ silently fails
// delete inventory.scrolls;  // ❌ silently fails
console.log(inventory);
