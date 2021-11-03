const fs = require('fs');
const path = require('path');
const Seven = require('node-7z');
const exec = require("child_process").execSync;
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
const extractedAsar = path.join(buildResFolder, "extracted-asar");
const asarFile = path.join(unpackContents, "resources", "app.asar");
const rebuildFolder = path.join(__dirname, "../rebuild");
const ProgressBar = require('progress');

function extractAsync(name, stream) {
    console.log(`Extracting ${name}`)
    const bar = new ProgressBar('   extracting [:bar] :percent', {total: 25});
    return new Promise((res,rej) => {
        stream.on('data', function (data) {
            //console.log(data) //? { status: 'extracted', file: 'extracted/file.txt" }
        })
        stream.on('progress', function (progress) {
            // console.log(progress);
            bar.update(progress.percent / 100);
        })
        stream.on('end', () => {
            bar.update(1);
            res();
        })
            .on('error', rej);
    });
}

function execCurrent(command) {
    console.log(`Running '${command}'`);
    exec(command, {
        cwd: rebuildFolder,
        stdio: 'inherit'
    });
}
function removeIfExists(path) {
    if(fs.existsSync(path)) {
        rimraf.sync(path)
    }
}

(async () => {
    if(!fs.existsSync(buildResFolder)) fs.mkdirSync(buildResFolder);

    if(!fs.existsSync(mobalyticsExe)) {
        console.log("Downloading Mobalytics...");
        await download(mobalyticsExeUrl, buildResFolder);
    } else {
        console.log("Found Mobalytics, skipping download.");
    }

    removeIfExists(mobalyticsUnpacked);
    await extractAsync("exe", Seven.extractFull(mobalyticsExe, mobalyticsUnpacked, {
        $progress: true
    }));
    await extractAsync("app-64", Seven.extractFull(appZip, unpackContents, {
        $progress: true
    }));

    console.log("Extracting asar");
    removeIfExists(extractedAsar);
    asar.extractAll(asarFile, extractedAsar);

    removeIfExists(rebuildFolder);
    console.log("Moving files for re-building");
    fs.renameSync(extractedAsar, rebuildFolder);

    const node_modules = path.join(rebuildFolder, "node_modules");

    console.log("Deleting node_modules (these ones are meant for windows)");
    removeIfExists(node_modules);
    execCurrent('npm install');

})();

