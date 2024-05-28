import { io } from 'socket.io-client';

const socket = io('http://servidor:3000');
let sensores = [];

socket.on('sensores-list', (data) => {
	sensores = data;

	socket.removeAllListeners();
	for (let sensor of sensores) {
		socket.on(`${sensor.tipo}-alerta`, (data) => {
			console.log(data);
		});
	}

	console.log(sensores);
});

