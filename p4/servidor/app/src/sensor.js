class Sensor {
	constructor(socket, umbralAlto, tipo) {
		this.valor = 0;
		this.socket = socket;
		this.umbralAlto = umbralAlto;
		this.tipo = tipo;
	}

	setValor(valor) {
		this.valor = valor;
		if (valor > this.umbralAlto) {
			console.log("Enviando alerta a los clientes");
			this.socket.emit('alerta', 'Valor alto detectado en el sensor: ' + this.tipo);
		}
	}
}

export default Sensor;
