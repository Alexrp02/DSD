class Sensor {
	constructor(socket, umbralBajo, umbralAlto, tipo, unidad, dbCollection) {
		this.valor = 0;
		this.socket = socket;
		this.umbralAlto = umbralAlto;
		this.umbralBajo = umbralBajo;
		this.tipo = tipo;
		this.unidad = unidad;
		this.dbCollection = dbCollection;
	}

	setValor(valor) {
		this.dbCollection.insertOne({
			sensor: this.tipo,
			valorAnterior: this.valor,
			nuevoValor: valor,
			fecha: new Date()
		}).then(() => {
			console.log(this.dbCollection.find({}).toArray().then((data) => console.log(data)));
		});
		this.valor = valor;
		if (valor > this.umbralAlto) {
			console.log("Enviando alerta a los clientes");
			this.socket.emit(`${this.tipo}-alerta`, {isAlto: true});
		}else if (valor < this.umbralBajo) {
			console.log("Enviando alerta a los clientes");
			this.socket.emit(`${this.tipo}-alerta`, {isAlto: false});
		}
		this.socket.emit(`${this.tipo}-valor`, { valor: this.valor, unidad: this.unidad });
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
