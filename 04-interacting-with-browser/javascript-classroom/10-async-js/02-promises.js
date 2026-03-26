const promise = new Promise((res, rej) => {
  setTimeout(() => {
    res("chaicode");
  }, 2000);
});
console.log(promise);

// setTimeout(() => {
//   console.log(promise);
// }, 3000);

promise.then(console.log);