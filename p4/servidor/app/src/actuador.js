class Actuador {
	constructor(socket, nombre, sensorAfectado, cambioActivado) {
		this.socket = socket;
		this.nombre = nombre;
		this.activado = false;
		this.sensorAfectado = sensorAfectado;
		this.cambioActivado = cambioActivado;
	}

	addClient(client) {
		console.log(`Creando actuador ${this.nombre}`);
		client.on(this.nombre + "-toggle", (data) => {
			this.socket.emit(this.nombre + "-toggle", data);
			if(data != this.activado) {
				console.log(data);
				this.activado = data;
				console.log(this.sensorAfectado.valor);
				console.log(this.activado ? this.cambioActivado : -this.cambioActivado);
				console.log(`Actuador ${this.nombre} : ${this.activado ? "activado" : "desactivado"}`)
				console.log(`Cambiando valor del sensor ${this.sensorAfectado.tipo} a ${this.activado ? this.sensorAfectado.valor + this.cambioActivado : this.sensorAfectado.valor - this.cambioActivado}`)
				this.sensorAfectado.setValor(this.activado ? this.sensorAfectado.valor + this.cambioActivado : this.sensorAfectado.valor - this.cambioActivado);
			}
		})
	}

	toggle() {
		this.activado = !this.activado;
		this.sensorAfectado.setValor(this.activado ? this.sensorAfectado.valor + this.cambioActivado : this.sensorAfectado.valor - this.cambioActivado);
	}

	toJSON() {
		return {
			nombre: this.nombre,
			activado: this.activado,
			sensorAfectado: this.sensorAfectado.toJSON(),
		};
	}
}

export default Actuador;
