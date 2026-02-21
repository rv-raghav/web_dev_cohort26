// ============================================================
// 📋 02 — Conditionals  (🆕 Added)
// ============================================================
// Conditionals let your code make decisions. JavaScript
// provides if/else, else-if chains, switch, and the ternary
// operator for branching logic.
// ============================================================


// ==========================================================
//  SECTION A — if / else
// ==========================================================

const temperature = 35;

if (temperature > 40) {
    console.log("🔥 Extreme heat!");
} else if (temperature > 30) {
    console.log("☀️ It's hot outside");
} else if (temperature > 20) {
    console.log("🌤️ Nice weather");
} else {
    console.log("❄️ It's cold!");
}


// ==========================================================
//  SECTION B — switch Statement
// ==========================================================
// Use switch when comparing ONE value against many options.
// Don't forget `break` — without it, execution "falls through"!

const day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the work week 💼");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("Midweek grind 📚");
        break;
    case "Friday":
        console.log("TGIF! 🎉");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend vibes 😎");
        break;
    default:
        console.log("Not a valid day");
}


// ==========================================================
//  SECTION C — Ternary Operator
// ==========================================================
// condition ? valueIfTrue : valueIfFalse
// Great for simple, one-line conditional assignments

const age = 17;
const status = age >= 18 ? "Adult" : "Minor";
console.log(`Age ${age} → ${status}`);


// ----------------------------------------------------------
// Nested ternary (use sparingly — can hurt readability)
// ----------------------------------------------------------
const score = 85;
const grade =
    score >= 90 ? "A" :
    score >= 80 ? "B" :
    score >= 70 ? "C" :
    score >= 60 ? "D" : "F";
console.log(`Score ${score} → Grade ${grade}`);


// ==========================================================
//  SECTION D — Truthy & Falsy in Conditions
// ==========================================================
// These values are FALSY: false, 0, "", null, undefined, NaN
// Everything else is TRUTHY (including [], {}, "0")

const username = "";

if (username) {
    console.log(`Welcome, ${username}!`);
} else {
    console.log("No username provided");
}

// Using || for default values
const displayName = username || "Anonymous";
console.log("Display name:", displayName);


// ==========================================================
//  SECTION E — Guard Clauses (common pattern)
// ==========================================================
// Instead of deeply nesting if/else, return early for invalid cases

function processOrder(order) {
    if (!order) {
        console.log("❌ No order provided");
        return;
    }
    if (!order.items || order.items.length === 0) {
        console.log("❌ Order has no items");
        return;
    }
    // Main logic runs only for valid input
    console.log(`✅ Processing order with ${order.items.length} items`);
}

processOrder(null);
processOrder({ items: [] });
processOrder({ items: ["Pizza", "Cola"] });


// ==========================================================
//  Key Takeaways
// ==========================================================
// 1. Use if/else for complex branching logic
// 2. Use switch when comparing a single value against many cases
// 3. Ternary is best for simple conditional assignments
// 4. Know your falsy values to write cleaner conditions
// 5. Guard clauses keep your code flat and readable
