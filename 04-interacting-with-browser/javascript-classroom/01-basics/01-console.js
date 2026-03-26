// ============================================================
// 📋 01 — Console Methods
// ============================================================
// The `console` object provides access to the browser/Node
// debugging console. Here are the most useful methods.
// ============================================================


// ----------------------------------------------------------
// 1. console.log() — General-purpose logging
// ----------------------------------------------------------
const clue1 = "Mudy footprint near the window";
const clue2 = "Broken glass on the table";

console.log("Clue 1:", clue1);
console.log("Clue 2:", clue2);

const suspectName = "John Doe";
const suspectAge = 35;
console.log("Suspect Name:", suspectName, "| Suspect Age:", suspectAge);


// ----------------------------------------------------------
// 2. console.warn() & console.error()
// ----------------------------------------------------------
// warn  → yellow warning icon in browser console
// error → red error icon in browser console
console.warn("Warning: Fingerprint evidence detected");
console.error("Error: No alibi found for the suspect");


// ----------------------------------------------------------
// 3. console.table() — Tabular display for arrays / objects
// ----------------------------------------------------------
const evidenceLog = [
    { id: 1, item: "Mudy footprint", location: "near the window" },
    { id: 2, item: "Broken glass", location: "on the table" },
    { id: 3, item: "Fingerprint", location: "on the door handle" },
];
console.table(evidenceLog);


// ----------------------------------------------------------
// 4. console.group() / console.groupEnd() — Collapsible groups
// ----------------------------------------------------------
console.group("Group Starts");
console.log("Analyzing Clue 1");
console.log("Analyzing Clue 2");
console.groupEnd("Group Ends");


// ----------------------------------------------------------
// 5. console.time() / console.timeEnd() — Measure execution time
// ----------------------------------------------------------
console.time("time starts now");

let dnaMatches = 0;
for (let i = 0; i < 1_000_000; i++) {
    dnaMatches++;
}
console.timeEnd("");


// ----------------------------------------------------------
// 6. console.count() — Count how many times a label is logged
// ----------------------------------------------------------
console.log("ChaiCode");
console.log("ChaiCode");
console.log("ChaiCode");
console.log("ChaiCode");

console.count("ChaiCode");


// ----------------------------------------------------------
// 🆕 7. console.clear() — Clears the console
// ----------------------------------------------------------
// console.clear(); // Uncomment to test — clears everything above


// ----------------------------------------------------------
// 🆕 8. console.assert() — Logs only when condition is FALSE
// ----------------------------------------------------------
const suspectAlibi = false;
console.assert(suspectAlibi, "Suspect has no alibi!"); // prints because condition is false
console.assert(true, "This will NOT print");           // silent because condition is true


// ----------------------------------------------------------
// 🆕 9. console.dir() — Displays object properties (useful in browsers)
// ----------------------------------------------------------
const caseFile = { id: 42, status: "open", detective: "Holmes" };
console.dir(caseFile);
