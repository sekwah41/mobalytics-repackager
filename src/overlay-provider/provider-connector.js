const os = require("os");
const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require('body-parser');

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
const provider = require(temp_provider);

let app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
let server = app.listen((process.env.PORT || 54823), () => {

    let host = server.address().address;
    let port = server.address().port;

    console.log('Provider Connector hosted on http://%s:%s', host, port);

});

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
// Just to match the same structure as the other calls
app.post("/functions", (req, res) => {
    res.type('json').send({functions: Object.keys(provider)});
});

let started = false;

console.log("Provider", provider);
for(let value in provider) {
    console.log("Setting up path", value);
    app.post(`/${value}`, (req, res) => {
        let result = provider[value](...(req?.body?.args || [])) || {};
        res.type('json').send(result || {result: "empty"});
    });
}

/*test.initMemoryScannerForLoL();
setInterval(() => {
    console.log(test.getMemoryScannerForLoLStatus());
    console.log(test.getLoLPlayerLiveData());
}, 1000);*/

// TODO write a connector which also returns what functions are available for construction on the other side
// TODO create a connection though IPC or something which allows for direct calls (possibly with promise returns? i dunno)
