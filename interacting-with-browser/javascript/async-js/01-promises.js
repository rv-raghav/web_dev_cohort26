// ============================================
// Promises in JavaScript
// ============================================
// Promises provide a cleaner way to handle asynchronous operations
// compared to callbacks, avoiding "callback hell".
// A Promise can be in one of 3 states: pending, fulfilled, or rejected.

// -------------------------------------------
// 1. Callback Pattern (The Problem)
// -------------------------------------------
// Nested callbacks create deeply indented, hard-to-read code ("callback hell").

function prepareOrderCB(dish, cb) {
  setTimeout(() => cb(null, { dish, status: "READY" }), 100);
}

function pickupOrderCB(order, cb) {
  setTimeout(() => cb(null, { ...order, status: "DELIVERED" }), 100);
}

function deliverOrderCB(order, cb) {
  setTimeout(() => cb(null, { ...order, status: "ENJOYED" }), 100);
}

// Callback hell — each step is nested inside the previous one
prepareOrderCB("Biryani", (error, order) => {
  if (error) return console.log(error);
  pickupOrderCB(order, (err, order) => {
    if (err) return console.log(err);
    deliverOrderCB(order, (err, order) => {
      if (err) return console.log(err);
      console.log(order);
    });
  });
});

// -------------------------------------------
// 2. Promise Pattern (The Solution)
// -------------------------------------------
// Promises -> pending, fulfilled, rejected
// - `resolve()` moves the promise to "fulfilled"
// - `reject()` moves the promise to "rejected"

function prepareOrder(dish) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!dish) {
        reject(new Error("No dish selected"));
        return;
      }
      console.log(`${dish} is ready`);
      resolve({ dish, status: "READY" });
    }, 100);
  });
}

function pickupOrder(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!order) {
        reject(new Error("No order selected"));
        return;
      }
      console.log(`${order} is ready`);
      resolve({ ...order, status: "READY" });
    }, 100);
  });
}

function deliverOrder(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!order) {
        reject(new Error("No order selected"));
        return;
      }
      console.log(`${order} is ready`);
      resolve({ ...order, status: "READY" });
    }, 100);
  });
}

// -------------------------------------------
// 3. Promise Chaining with .then() / .catch()
// -------------------------------------------
// `.then()` handles the fulfilled value and can return a new promise for chaining.
// `.catch()` handles any rejection in the entire chain.

prepareOrder("Biryani")
  .then((order) => {
    console.log(order);
    return pickupOrder(order);
  })
  .then((order) => {
    console.log(order);
    return deliverOrder(order);
  })
  .catch((error) => {
    console.log(error);
  });
