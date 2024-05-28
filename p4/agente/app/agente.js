import { io } from 'socket.io-client';

const socket = io('http://servidor:3000');
let sensores = [];


socket.on('sensores-list', (data) => {
	console.log("Emitiendo persiana");
	socket.emit("Persiana-toggle", {});
	for (let sensorAntiguo of sensores) {
		socket.removeAllListeners(`${sensorAntiguo.tipo}-alerta`);

	}
	sensores = data;

	for (let sensor of sensores) {
		socket.on(`${sensor.tipo}-alerta`, (data) => {
			if (sensor.tipo == "Temperatura") {
				console.log("Alerta en el sensor " + sensor.tipo + ": " + data + ", activando actuador");
				socket.emit('Aire-acondicionado-toggle', {});
			}
		});
	}

	console.log(sensores);
});

