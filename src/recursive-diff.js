const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');
const rimraf = require('rimraf');

const currentDir = process.cwd();

const patchesFolder = path.join(__dirname, '../patches');

/**
 * Recursively generate diff files for every file in a directory
 */
function recursiveDiff(root, folder) {
    const files = fs.readdirSync(path.join(root, folder), { withFileTypes: true });
    for (const file of files) {
        if(file.isDirectory()) {
            recursiveDiff(root, path.join(folder, file.name));
        } else {
            //console.log("Checking file", path.join(folder, file.name));
            const originalFile = path.relative(currentDir, path.join(root, "../original", folder, file.name));
            const modifiedFile = path.relative(currentDir, path.join(root, folder, file.name));
            const patchFolder = path.relative(currentDir, path.join(root, "../../patches", folder));
            // check if files contents are identical
            if(fs.readFileSync(originalFile).toString() !== fs.readFileSync(modifiedFile).toString()) {
                //console.log("Command to run", command);
                const output = spawnSync("diff", ["-uaN", originalFile, modifiedFile, "--label", originalFile, "--label", modifiedFile]);
                if(output.status === 1) {
                    // Make folder recursively if it doesn't exist
                    if(!fs.existsSync(patchFolder)) {
                        fs.mkdirSync(patchFolder, { recursive: true });
                    }
                    const patchFile = path.relative(currentDir, path.join(patchFolder, file.name + ".diff"));
                    fs.writeFileSync(patchFile, output.stdout.toString());
                }
            }
        }
    }
}

console.log("Generating patches");
rimraf.sync(patchesFolder);
fs.mkdirSync(patchesFolder);
recursiveDiff(path.join(__dirname, './modified/'), "");