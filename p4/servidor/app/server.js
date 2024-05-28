import http from 'node:http';
import { Server } from 'socket.io';
import { readFile } from 'node:fs';
import { join, resolve } from 'node:path';
import Sensor from './src/sensor.js';
import Actuador from './src/actuador.js';
import { MongoClient } from "mongodb";

function getPage(page, res) {

	console.log(`Sirviendo página ${page}`);
	readFile(join(process.cwd(), page), (err, data) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			return res.end(`404 - Not Found`);
		}
		if (page.endsWith('.html'))
			res.writeHead(200, { 'Content-Type': 'text/html' });
		else if (page.endsWith('.js'))
			res.writeHead(200, { 'Content-Type': 'application/javascript' });
		else if (page.endsWith('.css'))
			res.writeHead(200, { 'Content-Type': 'text/css' });
		else
			res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(data);
	});
}


const sensores = [];
const actuadores = [];
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
			sensores[0].setValor(40);
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

MongoClient.connect("mongodb://database:27017/").then((db) => {
	const dbo = db.db("eventos-sensores");
	const connectionsCollection = dbo.collection("connections");
	const io = new Server(httpServer, {
		cors: {
			origin: '*',
		}
	}
	);

	const sensorTemperatura = new Sensor(io, 30, "Temperatura", "ºC");
	sensorTemperatura.setValor(25);

	const aireAcondicionado = new Actuador(io, "Aire-acondicionado", sensorTemperatura, 15);

	const sensorLuminosidad = new Sensor(io, 100, "Luminosidad", "lm");
	sensorLuminosidad.setValor(90);

	const persiana = new Actuador(io, "Persiana", sensorLuminosidad, 20);

	sensores.push(sensorTemperatura);
	sensores.push(sensorLuminosidad);

	io.sockets.on('connection', (client) => {
		console.log("Cliente conectado");
		connectionsCollection.insertOne({ fecha: new Date(), evento: "conexión", cliente: client.id });
		console.log(connectionsCollection.find().toArray().then((data) => console.log(data)));
		io.emit("sensores-list", sensores.map(function(sensor) { return sensor.toJSON(); }));
	});


	httpServer.listen(3000);
	console.log("Servidor escuchando");
})

