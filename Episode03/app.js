// console.log("Start");
// for (let i = 0; i < 1e9; i++) {} // Long synchronous loop (blocks execution)
// console.log("End"); // This will only run after the loop is complete
function task() {
    console.log("Task running");
}
console.log("Start");
setTimeout(() => {
    console.log("inside setTimeot of 2sec")
    
}, 2000);
task();

console.log("End");

