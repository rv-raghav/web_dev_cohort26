// ============================================
// Error Handling in JavaScript
// ============================================
// JavaScript provides try...catch...finally for graceful error handling.
// This prevents your program from crashing when something goes wrong.

// -------------------------------------------
// 1. try...catch...finally
// -------------------------------------------
// - `try`     → Code that might throw an error
// - `catch`   → Handles the error if one is thrown
// - `finally` → Always runs, regardless of success or failure

function bootNavigation(mapLoaded) {
  try {
    console.log(`Is Navigation loaded: ${mapLoaded}`);

    // Manually throw an error if the map isn't loaded
    if (!mapLoaded) {
      throw new Error("Navigation not loaded");
    }

    return "NAV_OK";
  } catch (error) {
    // The caught error is an Error object with a `.message` property
    console.log(error);
    console.log(`Navigation Failed: ${error.message}`);
  } finally {
    // This block ALWAYS executes — useful for cleanup tasks
    console.log("Navigation Boot completed");
  }
}

// -------------------------------------------
// 2. Testing Both Scenarios
// -------------------------------------------

// Success case — returns "NAV_OK"
console.log(bootNavigation(true));

// Failure case — catches the error, returns undefined (no explicit return in catch)
console.log(bootNavigation(false));
