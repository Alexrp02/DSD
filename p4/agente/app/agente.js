import { io } from 'socket.io-client';

const socket = io('http://servidor:3000');
let sensores = [];
let actuadores = [];

socket.on('actuadores-list', (data) => {
	for (let actuadorAntiguo of actuadores) {
		socket.removeAllListeners(`${actuadorAntiguo.sensorAfectado.tipo}-alerta`);
	}

	for (let actuador of data) {
		socket.on(`${actuador.sensorAfectado.tipo}-alerta`, (data) => {
			console.log("Alerta en el sensor " + actuador.sensorAfectado.tipo + ": " + data["isAlto"] + ", activando actuador");
			socket.emit(`${actuador.nombre}-toggle`, data["isAlto"]);
		});
	}
});
