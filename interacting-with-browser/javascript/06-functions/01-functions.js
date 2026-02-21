// ============================================================
// 📋 01 — Functions
// ============================================================
// Functions are first-class citizens in JavaScript — they can
// be assigned to variables, passed as arguments, and returned
// from other functions.
// ============================================================


// --- 1. Function Declaration (hoisted) ---
console.log(brewPotion("unicorn horn", "2 drops"));
function brewPotion(ingredient, dose) {
    return `Brewing a potion with ${dose} of ${ingredient}`;
}

// --- 2. Function Expression (NOT hoisted) ---
const mixElixir = function (ingredient) {
    return `Mixing an elixir with ${ingredient}`;
};

// --- 3. Arrow function (no own 'this' , no `arguments` object) ---
const distilEssence = (ingredient) => {
    return `Distilling an essence with ${ingredient}`;
};

// --- 4. arguments object (only in regular functions) ---
function oldBrewingLogs() {
    console.log("Type: ", typeof arguments);
    console.log("Is Array: ", Array.isArray(arguments));
    const argsArray = Array.from(arguments);
    console.log("Arguments as Array: ", argsArray);
}
oldBrewingLogs("eye of newt", "toe of frog", "wool of bat", "tongue of dog");

// Arrow functions do NOT have `arguments`
const arrowBrew = () => {
    try {
        console.log(arguments);
    } catch (error) {
        console.log(error)
        console.log("Error in arrowBrew: ", error.message);
    }
};

arrowBrew();
console.log("Program continues...");

// --- 5. Pure vs Impure functions ---
let globalCount = 0

function brewAndCount(name) {
    globalCount++;
} // impure function that modifies global state

// --- 6. HOF (Higher-Order Function) ---
function anotherFunctionForClass(brewAndCount) {

    return function newBrew() {
        // do something
    }
}

// --- 7. IIFE (Immediately Invoked Function Expression) ---
const potionShop = (function () {
    let inventory = 0;

    return {
        brew() {
            inventory++;
            return `Brewed a potion. Inventory: ${inventory}`;
        },
        checkInventory() {
            return inventory;
        }
    }
})();
console.log(potionShop);
console.log(potionShop.brew());
console.log(potionShop.checkInventory());
console.log(potionShop.inventory);


// ==========================================================
//  🆕 Additional function concepts
// ==========================================================

// --- 🆕 8. Default parameters ---
function greetHero(name = "Stranger", title = "Adventurer") {
    return `Hail, ${name} the ${title}!`;
}
console.log(greetHero());                     // uses both defaults
console.log(greetHero("Aragorn"));            // uses default title
console.log(greetHero("Aragorn", "King"));    // no defaults used

// --- 🆕 9. Callback functions ---
function doAfterDelay(callback, delayMsg) {
    console.log(delayMsg);
    callback();
}
doAfterDelay(() => console.log("⚡ Action!"), "Preparing...");

// --- 🆕 10. Closures ---
// A closure is a function that remembers variables from its
// outer scope even after the outer function has returned.
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        getCount: () => count,
    };
}
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
