import { io } from 'socket.io-client';

const socket = io('http://servidor:3000');

socket.on('alerta', (data) => {
	console.log(data);
});
