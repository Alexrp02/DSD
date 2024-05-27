import http from 'node:http';
import { Server } from 'socket.io';
import { readFile } from 'node:fs';
import { join, resolve } from 'node:path';
import Sensor from './src/sensor.js';

function getPage(page, res) {

	console.log(`Sirviendo página ${page}`);
	readFile(join(process.cwd(), page), (err, data) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			return res.end(`404 - Not Found`);
		}
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(data);
	});
}


const httpServer = http.createServer((req, res) => {
	let { url } = req;

	switch (url) {
		case '/':
			getPage('server/index.html', res);
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
		case '/setTemperatura':
			sensorTemperatura.setValor(40);
			res.end('Temperatura seteada');
			break;
		case '/prueba.html':
			const filePath2 = resolve(__dirname, 'prueba.html');
			readFile(filePath2, (err, data) => {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading prueba.html');
				}
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(data);
			});
			break;
		default:
			getPage(url, res);
			break;
	}
});

const io = new Server(httpServer, {
	cors: {
		origin: '*',
	}
}
);
const sensores = [];

const sensorTemperatura = new Sensor(io, 30, "Temperatura");
sensores.push(sensorTemperatura);

io.sockets.on('connection', (client) => {
	console.log("Cliente conectado");
	io.emit("sensores-list", sensores.map(sensor => sensor.tipo));
});


httpServer.listen(3000);
console.log("Servidor escuchando");
