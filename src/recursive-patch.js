
// TODO apply all of the files
// TODO flag if a file is missing or doesnt need to be patched (do a log at the end of missing or partially failed ones)
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const currentDir = process.cwd();

const patchesFolder = path.join(__dirname, '../patches');

// get target folder from args
const targetFolder = path.join(__dirname, "../", process.argv[2]);
console.log(targetFolder);
/**
 * Recursively apply all the patches
 */
function recursivePatch(root, folder) {
    const files = fs.readdirSync(path.join(root, folder), { withFileTypes: true });
    for (const file of files) {
        if(file.isDirectory()) {
            recursivePatch(root, path.join(folder, file.name));
        } else {
            const patchFile = path.join(root, folder, file.name);
            const args = ["-p2", "-i", path.relative(targetFolder, patchFile)];
            const output = spawnSync("patch", args, {
                cwd: targetFolder
            });
            if(output.status !== 0) {
                console.log("Failed to apply some/all of", patchFile);
                console.log("Output", output.status);
                console.log("Output", output.stdout);
            }
            //const output = spawnSync("patch", ["-p2", originalFile, modifiedFile]);
            // const originalFile = path.relative(currentDir, path.join(root, "../original", folder, file.name));
            // const modifiedFile = path.relative(currentDir, path.join(root, folder, file.name));
            // const patchFolder = path.relative(currentDir, path.join(root, "../../patches", folder));
            // const command = `diff -uaN "${originalFile}" "${modifiedFile}"`;
            // const output = spawnSync("diff", ["-uaN", originalFile, modifiedFile]);
        }
    }
}

console.log("Applying patches");
recursivePatch(patchesFolder, "");