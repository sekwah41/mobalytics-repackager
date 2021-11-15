const CLIENT_PATH = '\\\\.\\pipe\\MOBA-OVERLAY-CLIENT-';
const SERVER_PATH = '\\\\.\\pipe\\MOBA-OVERLAY-SERVER';

const net = require('net');
const server = net.createServer((c) => {
    // 'connection' listener.
    console.log('client connected');
    c.on('end', () => {
        console.log('client disconnected');
    });
    c.write('hello\r\n');
    c.pipe(c);
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
