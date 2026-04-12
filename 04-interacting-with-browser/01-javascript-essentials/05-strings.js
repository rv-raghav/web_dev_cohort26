const codeName = "Shadow Fox";
const backupName = String("Night Owl");
const templateName = `Agent ${codeName}`;

let intercepted = "Hello"
intercepted[0] = "J";
console.log(intercepted); // This will log "Hello" because strings in JavaScript are immutable, meaning that once a string is created, it cannot be changed. When we try to change the first character of the string by assigning a new value to intercepted[0], it does not modify the original string. Instead, it simply ignores the assignment and leaves the original string unchanged. Therefore, when we log intercepted to the console, it still contains the original value "Hello".

const secretCode = "OMEGA-7"

console.log(secretCode.length);
console.log(secretCode.toLowerCase());
console.log(secretCode.toUpperCase());
console.log(secretCode.includes("7"));
console.log(secretCode.charAt(0));
console.log(secretCode.at(-1)); // The at() method is a new addition to JavaScript that allows you to access characters in a string using negative indices. When you use a negative index with the at() method, it counts from the end of the string instead of the beginning. So, secretCode.at(-1) will return the last character of the string, which is "7" in this case. This is a convenient way to access characters from the end of a string without having to calculate the index based on the string's length.

const message = "The mission is a go!";
console.log(message.indexOf("mission"));

const myDataValue = "SOS".split(""); // The split() method is used to split a string into an array of substrings based on a specified separator. In this case, we are splitting the string "SOS" into individual characters by using an empty string ("") as the separator. This means that each character in the string will become an element in the resulting array. So, myDataValue will be an array containing the characters "S", "O", and "S", which will be logged to the console as ["S", "O", "S"].
console.log(myDataValue)