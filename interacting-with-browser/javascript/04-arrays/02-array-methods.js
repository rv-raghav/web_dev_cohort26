// ============================================================
// 📋 02 — Array Methods (Higher-Order Functions)
// ============================================================
// These methods accept a callback function and are the bread
// and butter of functional-style JavaScript.
// ============================================================

const orders = [
    { dish: "Pasta", price: 12, spicy: false, qty: 2 },
    { dish: "Curry", price: 15, spicy: true, qty: 1 },
    { dish: "Pizza", price: 10, spicy: false, qty: 3 },
    { dish: "Tacos", price: 8, spicy: true, qty: 4 },
    { dish: "Salad", price: 7, spicy: false, qty: 1 },
];

// --- forEach (iterate, returns undefined) ---
const myData = orders.forEach((order, index) => {
    console.log(`#${index + 1} : ${order.qty}x ${order.dish}`);
});
console.log(myData);

// --- map (transform → new array) ---
const receiptLines = orders.map((o) => `${o.dish} : $${o.price * o.qty}`);
console.log(receiptLines);

// --- filter (keep elements that pass) ---
const spicyDishes = orders.filter((o) => o.spicy);
console.log(spicyDishes);

// --- reduce (accumulate → single value) ---
const totalRevenue = orders.reduce((sum, order) => {
    return sum + order.qty * order.price;
}, 0);
console.log(totalRevenue);

// --- reduce for grouping ---
const grouped = orders.reduce(
    (acc, order) => {
        const category = order.spicy ? "spicy" : "mild";
        acc[category].push(order.dish);
        return acc;
    },
    { spicy: [], mild: [] },
);
console.log(grouped);

// --- sort (mutates! spread first) ---
const ticketNumbers = [101, 102, 103, 104, 105];
const sortedW = [...ticketNumbers].sort((a, b) => a - b);
console.log(sortedW);
const sortedZ = [...ticketNumbers].sort((a, b) => b - a);
console.log(sortedZ);

// --- Method chaining (filter → map) ---
const kitchenOrders = [
    { dish: "Pasta", price: 12, spicy: false, qty: 2 },
    { dish: "Curry", price: 15, spicy: true, qty: 1 },
    { dish: "Pizza", price: 10, spicy: false, qty: 3 },
    { dish: "Tacos", price: 8, spicy: true, qty: 4 },
    { dish: "Salad", price: 7, spicy: false, qty: 1 },
];

const mildReport = kitchenOrders
    .filter(order => !order.spicy)
    .map(order => ({
        dish: order.dish,
        total: order.price * order.qty,
    }));

// ==========================================================
//  🆕 Additional methods
// ==========================================================

// every() — Do ALL elements pass the test?
const allAffordable = orders.every((o) => o.price < 20);
console.log("All affordable?", allAffordable); // true

// some() — Does AT LEAST ONE pass?
const hasSpicy = orders.some((o) => o.spicy);
console.log("Has any spicy?", hasSpicy); // true

// flatMap() — map + flat(1) in one step
const sentences = ["Hello world", "Goodbye earth"];
const words = sentences.flatMap((s) => s.split(" "));
console.log(words); // ["Hello", "world", "Goodbye", "earth"]

// fill() — Fill slots with a value
const emptySlots = new Array(5).fill(0);
console.log(emptySlots); // [0, 0, 0, 0, 0]
