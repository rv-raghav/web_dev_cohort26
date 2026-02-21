// ============================================================
// 📋 01 — Object Basics
// ============================================================
// Objects are key-value pairs — the core building block for
// structuring data in JavaScript.
// ============================================================

// --- Creating an object literal ---
const hero = {
    name: 'Batman',
    class: 'Vigilante',
    level: 99,
    health: 85,
    mana: 120,
    isAlive: true
}

// --- Adding & deleting properties ---
hero.weapon = "Fire"
delete hero.level

// --- Checking if a property exists ---
const ranger = {
    name: "Lakshya the swift",
    agility: 100,
    strength: undefined
}

console.log("name" in ranger);
console.log("strength" in ranger);
console.log(ranger.hasOwnProperty("toString"));


// ==========================================================
//  🆕 Additional examples
// ==========================================================

// --- Dot notation vs Bracket notation ---
const key = "agility";
console.log(ranger.agility);   // dot notation
console.log(ranger[key]);      // bracket notation — works with variables!

// --- Computed property names ---
const propName = "power";
const wizard = {
    name: "Gandalf",
    [propName]: 9001,           // key is the VALUE of propName → "power"
};
console.log(wizard); // { name: "Gandalf", power: 9001 }

// --- Shorthand properties ---
const playerName = "Archer";
const playerLevel = 10;
const player = { playerName, playerLevel }; // same as { playerName: playerName, ... }
console.log(player);

// --- Object.freeze() — No modifications allowed ---
const rules = { maxPlayers: 4, mode: "survival" };
Object.freeze(rules);
rules.maxPlayers = 10;  // silently fails (or throws in strict mode)
console.log(rules.maxPlayers); // still 4

// --- Object.assign() — Merge objects ---
const defaults = { theme: "dark", lang: "en" };
const userPrefs = { lang: "hi" };
const config = Object.assign({}, defaults, userPrefs);
console.log(config); // { theme: "dark", lang: "hi" }
