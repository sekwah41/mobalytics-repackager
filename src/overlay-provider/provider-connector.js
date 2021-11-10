const electron_overlay = "./electron_overlay";
const test = require(electron_overlay);
console.log(test);

test.initMemoryScannerForLoL()
console.log(test.getMemoryScannerForLoLStatus());
console.log(test.getLoLPlayerLiveData());

// TODO write a connector which also returns what functions are available for construction on the other side
// TODO create a connection though IPC or something which allows for direct calls (possibly with promise returns? i dunno)
