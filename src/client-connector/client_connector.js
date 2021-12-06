const net = require('net');
const CLIENT_PATH = '\\\\.\\pipe\\MOBA-OVERLAY-CLIENT-' + process.env.LOL_PID;

let connections = [];

function removeFromArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}

// Create the client proxy
const client_proxy = net.createServer((socket) => {
    // 'connection' listener.
    console.log("Client connector | client connected to server");
    socket.on('end', () => {
        removeFromArray(connections, socket);
        console.log("Client connector | client disconnected");
    });
    socket.on('data', (payload) => {
        connections.forEach(connection => {
            connection.write(payload);
        });
        //console.log("Overlay server connector", payload, connections.length);
    });
    socket.on('connect', () => {
        console.log('Client connector | socket connected');
    });
    socket.on('close', (hadError) => {
        console.log(`Client connector | socket closed, had_error: ${hadError}`);
    });
    socket.on('error', err => {
        console.log('Client connector | error: ', { err });
    });

});

client_proxy.on('error', (err) => {
    console.log('Client connector | error: ', { err });
});
console.log("Client connector | Setting up server");
client_proxy.listen({
    port: process.env.CLIENT_PORT,
    exclusive: false,
    readableAll: true,
    writableAll: true,
}, () => {
    console.log('Overlay server connector | server bound');
});

// Connect to the local windows socket
const client_connection_windows = net.createConnection({ path: CLIENT_PATH }, () => {
    console.log("Connector windows | Connected to server_unix");
});
client_connection_windows.on('data', (data) => {
    console.log("Connector windows data", data);
    client_connection_windows.write(data);
});
client_connection_windows.on('end', () => {
    client_connection_windows.end();
    console.log('Connector windows | disconnected from server');
});
client_connection_windows.on('error', (err) =>{
    console.log('Connector windows | error', err);
});

console.log(`Client connector PID: ${process.env.LOL_PID}`);

// TODO connect to the windows port and listen for a port
