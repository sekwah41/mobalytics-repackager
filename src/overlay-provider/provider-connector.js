const os = require("os");
const path = require("path");
const fs = require("fs");

console.log("Provider: Starting overlay")
console.log("Provider: ProcessLocation", process.cwd());

const electron_overlay = "electron_overlay";
const electron_overlay_file = electron_overlay + ".node";
const temp = os.tmpdir();
const temp_provider = path.join(temp, electron_overlay_file);
const overlay_loc = path.join(process.cwd(), electron_overlay_file);
if(fs.existsSync(temp_provider)) {
    if(fs.statSync(temp_provider).size !== fs.statSync(overlay_loc).size) {
        console.log("Provider: Overlay file is different, copying");
        fs.rmSync(temp_provider);
        fs.copyFileSync(overlay_loc, temp_provider);
    }
} else {
    fs.copyFileSync(overlay_loc, temp_provider);
}
const test = require(temp_provider);

test.initMemoryScannerForLoL();
setInterval(() => {
    console.log(test.getMemoryScannerForLoLStatus());
    console.log(test.getLoLPlayerLiveData());
}, 1000);

// TODO write a connector which also returns what functions are available for construction on the other side
// TODO create a connection though IPC or something which allows for direct calls (possibly with promise returns? i dunno)
