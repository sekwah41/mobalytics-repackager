const CLIENT_PATH = '\\\\.\\pipe\\MOBA-OVERLAY-CLIENT-';
const SERVER_PATH = '\\\\.\\pipe\\MOBA-OVERLAY-SERVER';

const net = require('net');
const server = net.createServer((socket) => {
    // 'connection' listener.
    console.log("Overlay server connector", 'client connected to serer');
    socket.on('end', () => {
        console.log("Overlay server connector", 'client disconnected');
    });
    socket.on('data', (payload) => {
        console.log("Overlay server connector", payload.toString(), this.processEvent);
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

server.on('error', (err) => {
    throw err;
});
console.log("Setting up server");
server.listen({
    path: SERVER_PATH,
    exclusive: false,
    readableAll: true,
    writableAll: true,
}, () => {
    console.log('server bound');
});
