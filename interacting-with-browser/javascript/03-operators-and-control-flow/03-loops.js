// ============================================================
// 📋 03 — Loops
// ============================================================
// Loops let you repeat code. Your original key points are
// preserved below, followed by practical examples for each type.
// ============================================================


// ----------------------------------------------------------
// Original key points
// ----------------------------------------------------------
// loop key points

// 1. for()
// 2. while()
// 3. do...while()
// 4. for...in
// 5. for...of
// . map, foreach, filter, reduce


// ==========================================================
//  SECTION A — for Loop
// ==========================================================
// Best when you know how many times to iterate

const crew = ["Luffy", "Zoro", "Nami", "Sanji", "Chopper"];

for (let i = 0; i < crew.length; i++) {
    console.log(`Crew member #${i + 1}: ${crew[i]}`);
}


// ==========================================================
//  SECTION B — while Loop
// ==========================================================
// Best when you DON'T know how many iterations you need

let fuel = 5;

while (fuel > 0) {
    console.log(`⛽ Fuel remaining: ${fuel}`);
    fuel--;
}
console.log("🚫 Out of fuel!");


// ==========================================================
//  SECTION C — do...while Loop
// ==========================================================
// Runs at least ONCE, then checks the condition

let attempts = 0;

do {
    attempts++;
    console.log(`🔑 Login attempt #${attempts}`);
} while (attempts < 3);


// ==========================================================
//  SECTION D — for...in Loop
// ==========================================================
// Iterates over the KEYS (property names) of an object
// ⚠️ Avoid using for...in on arrays — use for...of instead

const ship = {
    name: "Going Merry",
    captain: "Luffy",
    crew: 5,
    isSeaworthy: true,
};

for (const key in ship) {
    console.log(`${key}: ${ship[key]}`);
}


// ==========================================================
//  SECTION E — for...of Loop
// ==========================================================
// Iterates over the VALUES of an iterable (array, string, Map, Set)

const treasureItems = ["Gold", "Diamonds", "Map", "Compass"];

for (const item of treasureItems) {
    console.log(`💎 Found: ${item}`);
}

// Works on strings too!
for (const char of "SHIP") {
    console.log(`Letter: ${char}`);
}


// ==========================================================
//  SECTION F — break & continue
// ==========================================================

// break — exit the loop entirely
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        console.log("🛑 Found 5, stopping!");
        break;
    }
    console.log(i);
}

// continue — skip the current iteration
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        console.log("⏭️ Skipping 3");
        continue;
    }
    console.log(i);
}


// ==========================================================
//  SECTION G — Nested loops
// ==========================================================

const rows = 3;
const cols = 4;

for (let r = 1; r <= rows; r++) {
    let line = "";
    for (let c = 1; c <= cols; c++) {
        line += `[${r},${c}] `;
    }
    console.log(line);
}


// ==========================================================
//  SECTION H — Loop + Array methods (recap)
// ==========================================================
// These are covered in detail in 04-arrays/02-array-methods.js
// but here's a quick reminder of the functional loop alternatives

const prices = [100, 200, 350, 50];

// forEach — just iterate (no return value)
prices.forEach((price) => console.log(`💰 $${price}`));

// map — transform each element (returns new array)
const doubled = prices.map((price) => price * 2);
console.log("Doubled:", doubled);

// filter — keep elements that pass the test
const expensive = prices.filter((price) => price > 150);
console.log("Expensive:", expensive);

// reduce — accumulate into a single value
const total = prices.reduce((sum, price) => sum + price, 0);
console.log("Total:", total);


// ==========================================================
//  Key Takeaways
// ==========================================================
// 1. for     → when you know the count
// 2. while   → when count is unknown, condition-based
// 3. do-while → same as while but runs at least once
// 4. for-in  → iterate object KEYS (avoid on arrays)
// 5. for-of  → iterate iterable VALUES (arrays, strings, Maps)
// 6. forEach, map, filter, reduce → functional alternatives for arrays
// 7. break exits a loop; continue skips to the next iteration
