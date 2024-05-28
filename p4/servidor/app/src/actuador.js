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
			console.log(`Actuador ${this.nombre} : ${this.activado ? "desactivado" : "activado"}`)
			this.activado = !this.activado;
			this.sensorAfectado.setValor(this.activado ? this.sensorAfectado.valor + this.cambioActivado : this.sensorAfectado.valor - this.cambioActivado);
		})
	}

	toggle() {
		this.activado = !this.activado;
		this.sensorAfectado.setValor(this.activado ? this.sensorAfectado.valor + this.cambioActivado : this.sensorAfectado.valor - this.cambioActivado);
	}

	toJSON() {
		return {
			nombre: this.nombre,
			activado: this.activado
		};
	}
}

export default Actuador;
