const net = require('net');
const CLIENT_PATH = '\\\\.\\pipe\\MOBA-OVERLAY-CLIENT-' + process.env.LOL_PID;

let connections = [];

function removeFromArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}

console.log(`Client connector PID: ${process.env.LOL_PID}`);

// TODO connect to the windows port and listen for a port
