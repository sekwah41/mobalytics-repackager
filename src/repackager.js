const fs = require('fs');
const path = require('path');
const Seven = require('node-7z');
const asar = require('asar');
const rimraf = require('rimraf');
const download = require('progress-download');
const mobalyticsExeName = "Mobalytics-Desktop-Win-stable.exe";
const mobalyticsExeUrl = `https://cdn.mobalytics.gg/apps/latest/league/win/${mobalyticsExeName}`;
const buildResFolder = path.join(__dirname, "../build-resources");
const mobalyticsExe = path.join(buildResFolder, mobalyticsExeName);
const mobalyticsUnpacked = path.join(buildResFolder, "exe-contents");
const appZip = path.join(mobalyticsUnpacked, "$PLUGINSDIR", "app-64.7z");
const unpackContents = path.join(buildResFolder, "unpacked");

function streamAsync(stream) {
    return new Promise((res,rej) => {
        stream.on('end', () => {
            res();
        })
        .on('error', rej);
    });
}

(async () => {
    if(!fs.existsSync(buildResFolder)) fs.mkdirSync(buildResFolder);

    if(!fs.existsSync(mobalyticsExe)) {
        console.log("Downloading Mobalytics.");
        await download(mobalyticsExeUrl, buildResFolder);
    } else {
        console.log("Found Mobalytics, skipping download.");
    }

    if(fs.existsSync(mobalyticsUnpacked)) {
        rimraf.sync(mobalyticsUnpacked)
    }
    await streamAsync(Seven.extractFull(mobalyticsExe, mobalyticsUnpacked));
    await streamAsync(Seven.extractFull(appZip, unpackContents));

})();

