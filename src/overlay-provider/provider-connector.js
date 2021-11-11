console.log("Some info");
const electron_overlay = "../../electron_overlay";
console.log(__dirname);
const path = require("path");
const overlay = path.join(__dirname, electron_overlay);
console.log(overlay);
//const fs = require("fs");
//console.log(fs.readFileSync(overlay + ".node", 'utf8'));
const test = require(overlay);
console.log(test);

test.initMemoryScannerForLoL();
console.log(test.getMemoryScannerForLoLStatus());
console.log(test.getLoLPlayerLiveData());

// TODO write a connector which also returns what functions are available for construction on the other side
// TODO create a connection though IPC or something which allows for direct calls (possibly with promise returns? i dunno)
