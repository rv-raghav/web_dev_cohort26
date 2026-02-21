// ============================================================
// 📋 03 — Spread & Rest Operators  (🆕 Added)
// ============================================================
// Both use the ... syntax but serve opposite purposes:
// Spread → EXPANDS an iterable into individual elements
// Rest   → COLLECTS remaining elements into an array/object
// ============================================================


// ==========================================================
//  SECTION A — Spread Operator (...)
// ==========================================================


// ----------------------------------------------------------
// 1. Spread in arrays — copy, merge, insert
// ----------------------------------------------------------
const team1 = ["Luffy", "Zoro"];
const team2 = ["Nami", "Sanji"];

// Copy an array (shallow)
const teamCopy = [...team1];
console.log(teamCopy); // ["Luffy", "Zoro"]

// Merge arrays
const fullCrew = [...team1, ...team2, "Chopper"];
console.log(fullCrew); // ["Luffy", "Zoro", "Nami", "Sanji", "Chopper"]

// Insert in the middle
const withRobin = [...team1, "Robin", ...team2];
console.log(withRobin); // ["Luffy", "Zoro", "Robin", "Nami", "Sanji"]


// ----------------------------------------------------------
// 2. Spread in objects — copy, merge, override
// ----------------------------------------------------------
const baseConfig = { theme: "dark", lang: "en", debug: false };
const userConfig = { lang: "hi", debug: true };

// Merge objects (later keys override earlier ones)
const finalConfig = { ...baseConfig, ...userConfig };
console.log(finalConfig); // { theme: "dark", lang: "hi", debug: true }

// Copy an object (shallow)
const configBackup = { ...finalConfig };
console.log(configBackup);


// ----------------------------------------------------------
// 3. Spread with function arguments
// ----------------------------------------------------------
const scores = [85, 92, 78, 96, 88];
console.log(Math.max(...scores)); // 96 — spread unpacks array into args
console.log(Math.min(...scores)); // 78


// ----------------------------------------------------------
// 4. Spread with strings
// ----------------------------------------------------------
const letters = [..."hello"];
console.log(letters); // ["h", "e", "l", "l", "o"]


// ==========================================================
//  SECTION B — Rest Operator (...)
// ==========================================================


// ----------------------------------------------------------
// 5. Rest in function parameters — collect all remaining args
// ----------------------------------------------------------
function sum(first, second, ...remaining) {
    console.log("First:", first);       // 1
    console.log("Second:", second);     // 2
    console.log("Rest:", remaining);    // [3, 4, 5]

    const total = [first, second, ...remaining].reduce((a, b) => a + b, 0);
    return total;
}
console.log("Sum:", sum(1, 2, 3, 4, 5)); // 15


// ----------------------------------------------------------
// 6. Rest in array destructuring
// ----------------------------------------------------------
const colors = ["red", "green", "blue", "yellow", "purple"];
const [primary, secondary, ...otherColors] = colors;

console.log(primary);     // "red"
console.log(secondary);   // "green"
console.log(otherColors); // ["blue", "yellow", "purple"]


// ----------------------------------------------------------
// 7. Rest in object destructuring
// ----------------------------------------------------------
const player = {
    name: "Archer",
    level: 10,
    health: 100,
    mana: 50,
    agility: 80,
};

const { name, level, ...stats } = player;
console.log(name);  // "Archer"
console.log(level); // 10
console.log(stats); // { health: 100, mana: 50, agility: 80 }


// ==========================================================
//  Key Takeaways
// ==========================================================
// 1. Spread (...) EXPANDS — use to copy, merge, or unpack
// 2. Rest (...)   COLLECTS — use to gather remaining items
// 3. Both use the same ... syntax; context determines meaning
// 4. Spread/rest only creates SHALLOW copies (nested refs shared)
// 5. Rest must always be the LAST parameter / element
