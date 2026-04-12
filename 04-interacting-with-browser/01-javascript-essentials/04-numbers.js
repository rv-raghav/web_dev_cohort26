const crewMembers = 40;
const fuelTons = 142.42;
const light_speed = 299_792_458; // just for redadbility, not a number separator

const infiniteRange = Infinity;
const negativeInfinity = -Infinity;
const notANumber = NaN;

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.EPSILON);
console.log(Number.isInteger(notANumber));
console.log(Number.isNaN(notANumber));

const fuelReading = "142.75 tons";
const sectorCode = "0xA3F";
const countDown = "007";

console.log(parseInt(fuelReading)); // 142
console.log(parseInt("111", 2));

const thrustForce = 4.567;
console.log(Math.round(thrustForce));
console.log(Math.floor(thrustForce));
console.log(Math.ceil(thrustForce));
console.log(Math.trunc(thrustForce));

const temps = [-120, 43, 56, -23]
console.log(Math.min(temps));
console.log(Math.max(temps));

console.log(0.1 + 0.3 === -0.3);