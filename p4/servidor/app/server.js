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

function getObjectFromBody(bodyText) {
	const body = bodyText.split('&');
	const obj = {};
	for (let i = 0; i < body.length; i++) {
		const key = body[i].split('=')[0];
		const value = body[i].split('=')[1];
		obj[key] = value;
	}
	return obj;
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
			sensores[0].setValor(35);
			res.end('Temperatura seteada');
			break;
		case '/setters':
			getPage('server/setters.html', res);
			break;
		case '/set':
			// console log the request post body
			let body = '';
			req.on('data', chunk => {
				body += chunk.toString();
			});
			req.on('end', () => {
				console.log(body);
				const bodyObj = getObjectFromBody(body);
				for (let sensor of sensores) {
					if(sensor.tipo == bodyObj.sensor) {
						console.log(`Seteando sensor ${sensor.tipo} a ${bodyObj.valor}`)
						let modificador = 0;
						for (let actuador of actuadores) {
							if(actuador.sensorAfectado.tipo == sensor.tipo && actuador.activado && bodyObj.valor > sensor.umbralBajo) {
								modificador += actuador.cambioActivado;
							}
						}
						sensor.setValor(parseInt(bodyObj.valor) + modificador);
					}
				}
				// Redirect to the previous page
				const referer = req.headers.referer;
				res.writeHead(302, {
					'Location': referer
				});
				res.end();
			});
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
	const cambiosSensoresCollection = dbo.collection("cambios-sensores");
	const io = new Server(httpServer, {
		cors: {
			origin: '*',
		}
	}
	);

	const sensorTemperatura = new Sensor(io, 10, 30, "Temperatura", "ºC", cambiosSensoresCollection);
	sensorTemperatura.setValor(25);

	const aireAcondicionado = new Actuador(io, "Aire-acondicionado", sensorTemperatura, -15);
	actuadores.push(aireAcondicionado);

	const sensorLuminosidad = new Sensor(io, 0, 100, "Luminosidad", "lm", cambiosSensoresCollection);
	sensorLuminosidad.setValor(90);

	const persiana = new Actuador(io, "Persiana", sensorLuminosidad, -20);
	actuadores.push(persiana);

	sensores.push(sensorTemperatura);
	sensores.push(sensorLuminosidad);

	io.sockets.on('connection', (client) => {
		for (let actuador of actuadores) {
			actuador.addClient(client);
		}
		console.log("Cliente conectado, insertandolo en la base de datos");
		connectionsCollection.insertOne({ fecha: new Date(), evento: "conexión", cliente: client.id });
		// console.log(connectionsCollection.find().toArray().then((data) => console.log(data)));
		io.emit("sensores-list", sensores.map(function(sensor) { return sensor.toJSON(); }));
		io.emit("actuadores-list", actuadores.map(function(actuador) { return actuador.toJSON(); }));
	});


	httpServer.listen(3000);
	console.log("Servidor escuchando");
})

