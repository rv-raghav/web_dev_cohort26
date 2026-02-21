// ============================================================
// 📋 03 — Data Types
// ============================================================
// JavaScript has 7 primitive types and several non-primitive
// (reference) types. Understanding the difference is key to
// avoiding common bugs with copies and mutations.
// ============================================================


// ==========================================================
//  SECTION A — Primitive Data Types
// ==========================================================

// Primitives in JavaScript
// - String
// - Number
// - BigInt    - Boolean
// - Undefined
// - Null
// - Symbol


// ----------------------------------------------------------
// 1. String
// ----------------------------------------------------------
const weaponName = "Flame Sword";
console.log("Weapon Name:", weaponName, "| type:", typeof weaponName); // Output: Flame Sword


// ----------------------------------------------------------
// 2. BigInt
// ----------------------------------------------------------
const attackPower = 75n;
console.log("Attack Power:", attackPower, "| type:", typeof attackPower); // Output: 75 (with a "n" at the end indicating it's a BigInt)


// ----------------------------------------------------------
// 3. Number (integer & float are both "number")
// ----------------------------------------------------------
const attackUpgrade = 1.5;
console.log("Attack Upgrade:", attackUpgrade, "| type:", typeof attackUpgrade); // Output: 1.5


// ----------------------------------------------------------
// 4. Boolean
// ----------------------------------------------------------
const isLoggedIn = true;
console.log("Is Logged In:", isLoggedIn, "| type:", typeof isLoggedIn); // Output: true


// ----------------------------------------------------------
// 5. Undefined — declared but never assigned
// ----------------------------------------------------------
let bonusEffect; // This variable is declared but not assigned a value, so it is undefined
console.log("Bonus Effect:", bonusEffect, "| type:", typeof bonusEffect); // Output: undefined


// ----------------------------------------------------------
// 6. Null — intentional absence of value
// ----------------------------------------------------------
let curseStatus = null; // This variable is explicitly assigned the value null, indicating the absence of any object value
console.log("Curse Status:", curseStatus, "| type:", typeof curseStatus); // Output: null
let weatherApiResponse = null; // This variable is explicitly assigned the value null, indicating the absence of any object value
console.log(
    "Weather API Response:",
    weatherApiResponse,
    "| type:",
    typeof weatherApiResponse,
); // Output: null


// ----------------------------------------------------------
// 7. Symbol — guaranteed unique identifier
// ----------------------------------------------------------
const uniqueRuneId = Symbol("rune_of_fire");
console.log(
    "Unique Rune ID:",
    uniqueRuneId.toString(),
    "| type:",
    typeof uniqueRuneId,
); // Output: Symbol(rune_of_fire)


// ==========================================================
//  SECTION B — Non-Primitive (Reference) Data Types
// ==========================================================

// Non-primitive data types in JavaScript
// - Object
// - Array
// - Function


// ----------------------------------------------------------
// 8. Object
// ----------------------------------------------------------
const heroStats = {
    name: "Archer",
    level: 5,
    health: 100,
    mana: 50,
};
console.log("Hero Stats:", heroStats, "| type:", typeof heroStats); // Output: { name: 'Archer', level: 5, health: 100, mana: 50 }


// ----------------------------------------------------------
// 9. Array (technically an object under the hood)
// ----------------------------------------------------------
const inventory = ["Flame Sword", "Healing Potion", "Magic Scroll"];
console.log("Inventory:", inventory, "| type:", typeof inventory); // Output: [ 'Flame Sword', 'Healing Potion', 'Magic Scroll' ]


// ----------------------------------------------------------
// 10. Function
// ----------------------------------------------------------
function casteSpell() {
    return "Fireball";
}
console.log("Caste Spell:", casteSpell, "| type:", typeof casteSpell); // Output: [Function: casteSpell]


// ==========================================================
//  SECTION C — typeof Quick Reference
// ==========================================================

console.log(typeof "chaicode");
console.log(typeof 42);
console.log(typeof 3.14);
console.log(typeof 9007199254740991n);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null); // This is a known quirk in JavaScript, it returns "object" for null
console.log(typeof Symbol("unique"));
console.log(typeof { name: "Object" });
console.log(typeof [1, 2, 3]);
console.log(typeof function () { });


// ==========================================================
//  SECTION D — Value vs Reference (Copy Behavior)
// ==========================================================


// ----------------------------------------------------------
// Primitives are copied BY VALUE
// ----------------------------------------------------------
let originalHP = 100;
let cloneHP = originalHP;

cloneHP = 80;
console.log("Original HP:", originalHP);
console.log("Clone HP:", cloneHP);


// ----------------------------------------------------------
// Objects are copied BY REFERENCE
// ----------------------------------------------------------
const originalSword = {
    name: "Flame Sword",
    damage: 75,
    typeofWeapon: "Fire",
};

const cloneSword = originalSword;
cloneSword.damage = 100;
console.log("Original Sword:", originalSword);
console.log("Clone Sword:", cloneSword);


// ----------------------------------------------------------
// Shallow copy with spread operator (nested objects still shared)
// ----------------------------------------------------------
const armorOriginal = {
    name: "Dragon Scale Armor",
    defense: 80,
    buff: {
        fire: 10,
    },
};

const armorClone = { ...armorOriginal }; // This creates a shallow copy of the armorOriginal object {...} is the spread operator
armorClone.buff.fire = 20; // This modifies the buff property of the armorClone, which is a reference to the same object as armorOriginal.buff
console.log("Original Armor:", armorOriginal);
console.log("Clone Armor:", armorClone);


// ----------------------------------------------------------
// Deep copy with structuredClone()
// ----------------------------------------------------------
const potionOriginal = {
    name: "Healing Potion",
    effects: {
        heal: 40,
        mana: 30,
    },
};
const potionCopy = structuredClone(potionOriginal); // This creates a deep copy of the potionOriginal object, including nested objects


// ==========================================================
//  SECTION E — Common Gotchas
// ==========================================================

typeof null === "object"; // This is a known quirk in JavaScript, it returns "object" for null

Array.isArray(inventory); // This is the correct way to check if a variable is an array in JavaScript, it returns true for arrays and false for other types of objects
