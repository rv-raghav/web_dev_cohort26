const weaponName = 'Flame Sword'; // String
console.log(typeof weaponName);

const attackPower = 75n; // BigInt - BigInt is a built-in object that provides a way to represent whole numbers larger than 2^53 - 1, which is the largest number JavaScript can reliably represent with the Number primitive. BigInt can be created by appending 'n' to the end of an integer literal or by calling the BigInt() constructor.
const attackUpgrade = 25.5; // Number

console.log(typeof attackPower);
console.log(typeof attackUpgrade);

const isLoggedIn = true; // Boolean

let bonusEffect; // Undefined - When a variable is declared but not assigned a value, it is automatically assigned the value of undefined. This indicates that the variable exists but has not been initialized with a value.
let curseStatus = null; // Null
let weatherApiResponse = null;
console.log(bonusEffect); // This will log "undefined" because bonusEffect has been declared but not assigned a value, so it is automatically assigned the value of undefined.
console.log(typeof weatherApiResponse); // This will log "object" because in JavaScript, the typeof operator returns "object" for null values. This is a quirk of the language and is something to be aware of when working with null values.

const uniqueRuneId = Symbol('rune_of_fire');
console.log('Rune:', uniqueRuneId.toString()); // This will log "Rune: Symbol(rune_of_fire)" because the toString() method of a Symbol returns a string representation of the symbol, which includes the description provided when the symbol was created.

// Objects and Arrays

const heroStats = {
  name: 'Raghav',
  level: 12,
  class: 'Ranger',
};
console.log('heroStats:', heroStats, typeof heroStats);

const inventory = ['Health Potion', 'Mana Potion', 'Sword'];
console.log('Inventory:', inventory, typeof inventory);

// Function
function castSpell() {
  return 'Fireball!';
}
console.log('Spell Type', typeof castSpell); // Even Though it is a object This will log "Spell Type function" because in JavaScript, functions are a special type of object and the typeof operator returns "function" for function declarations and expressions.

// Copying by value vs copying by reference
// When we assign a primitive value (like a string, number, boolean, etc.) to a variable, we are copying the value itself. This is called "copying by value." When we assign an object or an array to a variable, we are copying the reference to that object or array, not the actual value. This is called "copying by reference."
let originalHP = 100;
let cloneHP = originalHP;

cloneHP = 80;
console.log('Original HP:', originalHP);
console.log('Clone HP:', cloneHP);

const originalSword = {
  name: 'Flame Sword',
  damage: 75,
  typeofW: 'Fire',
};

const cloneSword = originalSword;

cloneSword.damage = 50;

console.log('Original Sword:', originalSword);
console.log('Clone Sword:', cloneSword);
// In the example above, when we assign originalSword to cloneSword, we are copying the reference to the original object, so both variables point to the same object in memory. When we change cloneSword.damage to 50, it also affects originalSword.damage, which now becomes 50 as well.

// So to fix this here it is how we can copy objects
const armorOriginal = {
    name: "Iron Plate",
    defence: 80,
    buff: {
        fire: 10,
    },
};

const armorCopy = {...armorOriginal}; // Spread Operator - The spread operator allows us to create a shallow copy of an object. It copies the properties of the original object into a new object. However, if the original object has nested objects (like the buff property in this example), the nested objects are still copied by reference, so changes to the nested objects will affect both the original and the copy.
armorCopy.buff.fire = 20;

const potionOriginal = {
    name: "Health Potion",
    heal: 50,
    effects: {
        burn: false,
    },
};

const potionCopy = structuredClone(potionOriginal); // structuredClone - The structuredClone function creates a deep copy of an object, meaning that it copies all nested objects as well. This is useful when we want to create a completely independent copy of an object, including all of its nested properties.

typeof null === 'object' // This will log true, which is a quirk of the JavaScript language.

// === vs == difference
// The === operator is the strict equality operator, which checks for both value and type equality. The == operator is the loose equality operator, which checks for value equality but performs type coercion if the types of the operands are different.