const clue1 = 'Muddy footprint near the window';
const clue2 = 'Broken vase on the floor';

console.log('Clue 1:', clue1);
console.log('Clue 2:', clue2);

const suspectName = 'John Doe';
const suspectAge = 35;

console.log('Suspect Name:', suspectName, '| Suspect Age:', suspectAge);

console.warn('Warning: The suspect has a history of theft!');
console.error('Error: The suspect was seen fleeing the scene!');

const evidenceLog = [
  { id: 1, item: 'Muddy footprint', location: 'Near the window' },
  { id: 2, item: 'Broken vase', location: 'On the floor' },
]; // Array of Objects

console.table(evidenceLog); // When we have array of objects, we can use console.table to display it in a tabular format

console.group('Group Starts') // We can use console.group to group related logs together, and console.groupEnd to end the group. This helps in organizing the logs and making them more readable.
console.log('This is inside the group');
console.log('This is also inside the group');
console.groupEnd('Group Ends')

console.time("Time starts now") 

let dnaMatches = 0;
for (let i = 0; i<1000000; i++) {
    dnaMatches++
}
console.timeEnd("Time ends now") // We can use console.time and console.timeEnd to measure the time taken by a block of code to execute. This is useful for performance testing and optimization.

console.count("Chaicode") // We can use console.count to count the number of times a particular string is logged. This is useful for tracking the frequency of certain events or actions in our code.