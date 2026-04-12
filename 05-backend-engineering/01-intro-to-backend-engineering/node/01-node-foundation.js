const fs = require("fs");
const path = require("path");
const os = require("os");

console.log("NodeJS: ", process.versions.node);
console.log("V8: ", process.versions.v8);
console.log("libuv: ", process.versions.uv);
console.log("Platform: ", process.platform);

console.log(typeof global);
console.log(typeof globalThis); // Research: What is globalThis? 