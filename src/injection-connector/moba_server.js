const controller_server = require('./controller_server');

const CLIENT_PATH = '\\\\.\\pipe\\MOBA-OVERLAY-CLIENT-';
const SERVER_PATH = '\\\\.\\pipe\\MOBA-OVERLAY-SERVER';

const net = require('net');

let connections = [];

function removeFromArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}

const moba_server_proxy = net.createServer((socket) => {
    // 'connection' listener.
    connections.push(socket);
    console.log("Overlay server connector", 'client connected to server');
    socket.on('end', () => {
        console.log("Overlay server connector proxy", 'client disconnected');
    });
    socket.on('data', (payload) => {
        console.log("Overlay server connector proxy", payload);
    });
    socket.on('connect', () => {
        console.log('Overlay server connector proxy | socket connected');
    });
    socket.on('close', (hadError) => {
        console.log(`Overlay server connector proxy | socket closed, had_error: ${hadError}`);
    });
    socket.on('error', err => {
        console.log('Overlay server connector proxy | error: ', { err });
    });

});

const moba_server = net.createServer((socket) => {
    // 'connection' listener.
    console.log("Overlay server connector | client connected to server");
    socket.on('end', () => {
        removeFromArray(connections, socket);
        console.log("Overlay server connector | client disconnected");
    });
    socket.on('data', (payload) => {
        connections.forEach(connection => {
            connection.write(payload);
        });
        console.log("Overlay server connector", payload, connections.length);
    });
    socket.on('connect', () => {
        console.log('Overlay server connector | socket connected');
    });
    socket.on('close', (hadError) => {
        console.log(`Overlay server connector | socket closed, had_error: ${hadError}`);
    });
    socket.on('error', err => {
        console.log('Overlay server connector | error: ', { err });
    });

});

moba_server_proxy.on('error', (err) => {
    console.log('Overlay server connector proxy | error: ', { err });
});
moba_server.on('error', (err) => {
    console.log('Overlay server connector | error: ', { err });
});
console.log("Overlay server connector | Setting up server");
moba_server.listen({
    path: SERVER_PATH,
    exclusive: false,
    readableAll: true,
    writableAll: true,
}, () => {
    console.log('Overlay server connector | server bound');
});

moba_server_proxy.listen({
    port: process.env.OVERLAY_SERVER,
    exclusive: false,
    readableAll: true,
    writableAll: true,
}, () => {
    console.log('Overlay server connector | server bound');
});
