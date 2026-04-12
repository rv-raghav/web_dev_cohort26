var shipName = 'The Amber';
console.log(shipName);
shipName = 'The Black Pearl'; // We can reassign a new value to a variable declared with var

let crewCount = 20;
console.log(crewCount);
crewCount = 25; // We can reassign a new value to a variable declared with let

const captainName = 'Jack Sparrow';
console.log(captainName);
// captainName = "Will Turner"; // This will throw an error because we cannot reassign a new value to a variable declared with const

if (true) {
  var leakyTreasure = 'Gold Coins'; // This variable is declared with var, so it is function-scoped and can be accessed outside the block
}

console.log(leakyTreasure); // This will log "Gold Coins" because var is function-scoped, not block-scoped

for (var i = 0; i < 3; i++) {
  //
}

for (let j = 0; j < 3; j++) {
  //
}

const treasureChest = {
  gold: 100,
  silver: 50,
  jewels: 25,
}; // This is an object declared with const. We cannot reassign treasureChest to a new object, but we can modify the properties of the existing object.

treasureChest.gold = 150; // This is allowed because we are modifying the properties of the existing object, not reassigning the variable itself.

treasureChest = {
  gold: 200,
}; // This will throw an error because we cannot reassign a new object to a variable declared with const.

const crewRoster = ['Jack Sparrow', 'Will Turner', 'Elizabeth Swann'];
crewRoster.push('Gibbs'); // This is allowed because we are modifying the existing array, not reassigning the variable itself.

crewRoster[0] = ['Captain Jack Sparrow']; // This is also allowed because we are modifying the existing array, not reassigning the variable itself.

crewRoster = ['Jack']; // This will throw an error because we cannot reassign a new array to a variable declared with const.