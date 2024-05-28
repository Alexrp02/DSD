class Actuador {
    constructor(socket, nombre, sensorAfectado, cambioActivado) {
        this.socket = socket;
        this.nombre = nombre;
        this.activado = false;
        this.sensorAfectado = sensorAfectado;
        this.cambioActivado = cambioActivado;

        this.socket.on(`${this.nombre}-toggle`, () => {
            this.activado = !this.activado;
            this.sensorAfectado.setValor(this.activado ? this.sensorAfectado + this.cambioActivado : this.sensorAfectado - this.cambioActivado);  
        })
    }

    toggle() {
        this.activado = !this.activado;
        this.sensorAfectado.setValor(this.activado ? this.sensorAfectado + this.cambioActivado : this.sensorAfectado - this.cambioActivado);
    }

    toJSON() {
        return {
            nombre: this.nombre,
            activado: this.activado
        };
    }
}

export default Actuador;