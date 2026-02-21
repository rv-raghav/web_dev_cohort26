// ============================================================
// 📋 02 — The `this` Keyword
// ============================================================
// `this` refers to the object that is executing the current
// function. Its value depends on HOW the function is called.
// ============================================================


// --- 1. Global context ---
console.log(this); // Global

// --- 2. Regular function → `this` is global (or undefined in strict mode) ---
function ranveerOnGlobalStage() {
  return typeof this;
}
console.log(ranveerOnGlobalStage());

function ranveerWithNoScript() {
  "use strict"; // undefined

  return this;
}
console.log(ranveerWithNoScript());

function ranveerWithNoScript() {
  return this; // global object
}
console.log(ranveerWithNoScript());

// --- 3. `this` inside an object method ---
// every object has this
const bollywoodFilm = {
  name: "Bajirao Mastani",
  lead: "Ranveer",

  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};
console.log(bollywoodFilm);
console.log(bollywoodFilm.introduce());

// --- 4. Arrow function inside method → inherits `this` from parent ---
const filmDirector = {
  name: "Sanjay Leela Bhansali",
  cast: ["Ranveer", "Deepika", "Priyanka"],

  announceCast() {
    this.cast.forEach((actor) => {
      console.log(`${this.name} introduces ${actor}`);
    });
  },
};
console.log(filmDirector.announceCast());

// --- 5. Nested regular function loses `this` ---
const filmSet = {
  crew: "Spot boys",
  prepareProps() {
    console.log(`Outer this.crew; ${this.crew}`);

    function arrangeChairs() {
      console.log(`Inner this.crew: ${this.crew}`);
    }
    arrangeChairs(); // a regular nested function does not inherit this

    // detached methods
    const arrangeLights = () => {
      console.log(`Arrow this.crew: ${this.crew}`);
    };
    arrangeLights();
  },
};

filmSet.prepareProps();

// --- 6. Detached methods lose their `this` ---
// detached methods

const actor = {
  name: "Ranveer",
  bow() {
    return `${this.name} takes a bow`;
  },
};
console.log(actor.bow());
const detachedBow = actor.bow;
console.log(detachedBow());


// ==========================================================
//  🆕 Additional `this` concepts
// ==========================================================

// --- 🆕 7. call(), apply(), bind() — Manually set `this` ---

const hero = { name: "Ranveer" };
const villain = { name: "Khilji" };

function announce(role) {
    return `${this.name} plays the ${role}`;
}

// call — invoke immediately, pass args one by one
console.log(announce.call(hero, "hero"));       // "Ranveer plays the hero"
console.log(announce.call(villain, "villain"));  // "Khilji plays the villain"

// apply — same as call, but args as an array
console.log(announce.apply(hero, ["protagonist"]));

// bind — returns a NEW function with `this` permanently set
const heroBow = actor.bow.bind(actor);
console.log(heroBow()); // "Ranveer takes a bow" — works even detached!

// --- 🆕 8. `this` in arrow vs regular (summary) ---
// Regular function → `this` depends on HOW it's called
// Arrow function   → `this` is INHERITED from enclosing scope (lexical)
