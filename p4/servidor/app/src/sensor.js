class Sensor {
	constructor(socket, umbralAlto, tipo, unidad) {
		this.valor = 0;
		this.socket = socket;
		this.umbralAlto = umbralAlto;
		this.tipo = tipo;
		this.unidad = unidad;
	}

	setValor(valor) {
		this.valor = valor;
		if (valor > this.umbralAlto) {
			console.log("Enviando alerta a los clientes");
			this.socket.emit(`${this.tipo}-alerta`, 'Valor alto detectado en el sensor: ' + this.tipo);
		}
	}

	toJSON() {
		return {
			valor: this.valor,
			tipo: this.tipo,
			unidad: this.unidad
		};
	}
}

export default Sensor;
