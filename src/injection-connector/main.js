const child_process = require("child_process");

console.log("Overlay Connector: Starting overlay")
console.log("Overlay Connector: ProcessLocation", process.cwd());

/*child_process_1.exec(`dir`, (err, stdout) => {
    console.log("Couldnt run", err);
    console.log("WIORKING DIRECTORY", stdout);
});*/

const overlay_process = child_process.spawn('echo test');
const { stdout, stderr } = overlay_process;
if (stdout) {
    stdout.on('data', (data) => {
        console.log(`overlay connector: stout data, data: ${data}`);
    });
    stdout.on('close', (code, signal) => {
        console.log(`overlay connector: stout was closed, code: ${code}, signal: ${signal}`);
    });
    stdout.on('error', (err) => {
        console.log(`overlay connector: stout error: ${err}`);
    });
    stdout.on('exit', (code, signal) => {
        console.log(`overlay connector: stout exit, code: ${code}, signal: ${signal}`);
    });
    stdout.on('message', (message) => {
        console.log(`overlay connector: stout, message: ${message}`);
    });
}
if (stderr) {
    stderr.on('data', (data) => {
        console.log(`overlay connector: stderr, data: ${data}`);
    });
    stderr.on('close', (code, signal) => {
        console.log(`overlay connector: stderr was closed, code: ${code}, signal: ${signal}`);
    });
    stderr.on('error', (err) => {
        console.log(`overlay connector: stderr error: ${err}`);
    });
    stderr.on('exit', (code, signal) => {
        console.log(`overlay connector: stderr exit, code: ${code}, signal: ${signal}`);
    });
    stderr.on('message', (message) => {
        console.log(`overlay connector: stderr, message: ${message}`);
    });
}
overlay_process.on('close', (code, signal) => {
    console.log(`overlay connector: was closed, code: ${code}, signal: ${signal}`);
});
overlay_process.on('error', (err) => {
    console.log(`overlay connector: error: ${err}`);
});
overlay_process.on('exit', (code, signal) => {
    console.log(`overlay connector: exit, code: ${code}, signal: ${signal}`);
});
overlay_process.on('message', (message) => {
    console.log(`overlay connector: exit, message: ${message}`);
});
overlay_process.on('spawn', (message) => {
    console.log(`overlay connector: overlay injector spawned`, { message });
});
