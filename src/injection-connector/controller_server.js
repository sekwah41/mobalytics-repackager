
const net = require('net');
const server = net.createServer((socket) => {
    // 'connection' listener.
    console.log("Overlay server connector", 'client connected to serer');
    socket.on('end', () => {
        console.log("Overlay server controller", 'client disconnected');
    });
    socket.on('data', (payload) => {
        console.log("Overlay server controller", payload.toString(), this.processEvent);
    });
    socket.on('connect', () => {
        console.log('Overlay server controller | socket connected');
    });
    socket.on('close', (hadError) => {
        console.log(`Overlay server controller | socket closed, had_error: ${hadError}`);
    });
    socket.on('error', err => {
        console.log('Overlay server controller | error: ', { err });
    });

});

server.on('error', (err) => {
    throw err;
});
console.log("Overlay server controller | Setting up Controller");
server.listen({
    port: process.env.OVERLAY_CONTROLLER,
    exclusive: false,
    readableAll: true,
    writableAll: true,
}, () => {
    console.log('Overlay server controller | server bound');
});
