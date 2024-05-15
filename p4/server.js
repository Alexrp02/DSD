import http from 'node:http';
import { Server } from 'socket.io';
import { readFile } from 'node:fs';
import { resolve } from 'node:path';

const httpServer = http.createServer((req, res) => {
	let { url } = req;

	switch (url) {
		case '/':
			res.end('Hello World');
			break;
		case '/socket.io/socket.io.js': // Serve Socket.IO client library
			const filePath = resolve(__dirname, '../node_modules/socket.io/client-dist/socket.io.js');
			readFile(filePath, (err, data) => {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading Socket.IO client library');
				}
				res.writeHead(200, { 'Content-Type': 'application/javascript' });
				res.end(data);
			});
			break;
		default:
			res.end('404 Not Found');
			break;
	}
});

const io = new Server(httpServer, {
	cors: {
		origin: '*',
	}
}
);

io.sockets.on('connection', (client) => {
	console.log("Cliente conectado");
	console.log(client.request.socket.remoteAddress);
	console.log(client.request.socket.remotePort)
});

httpServer.listen(3000);
console.log("Servidor escuchando");
