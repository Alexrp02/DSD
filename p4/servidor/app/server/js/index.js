
var io = io("http://localhost:3000");

io.on("sensores-list", function(data) {
	console.log("Creando listeners para los sensores:")
	console.log(data);
	let contentSensores = document.getElementById("sensores-content");
	contentSensores.innerHTML = "";
	for (let sensor of data) {
		let sensorDiv = document.createElement("div");
		sensorDiv.className = "sensor";
		sensorDiv.innerHTML = `<h2>Sensor ${sensor.tipo}</h2>`;
		sensorDiv.innerHTML += `<p id="${sensor.tipo}-value">Valor: ${sensor.valor} ${sensor.unidad}</p>`;
		contentSensores.appendChild(sensorDiv);
		io.on(`${sensor.tipo}-valor`, function(data) {
			console.log(data.valor);
			console.log("Camgio en el sensor " + sensor.tipo + ": " + data.valor + " " + data.unidad);
			let valorSensor = document.getElementById(`${sensor.tipo}-value`);
			valorSensor.innerHTML = `Valor: ${data.valor} ${data.unidad}`;
		});
	}
});

io.on("actuadores-list", function(data) {
	console.log("Creando listeners para los actuadores:")
	console.log(data);
	let contentActuadores = document.getElementById("actuadores-content");
	contentActuadores.innerHTML = "";
	for (let actuador of data) {
		let actuadorDiv = document.createElement("div");
		actuadorDiv.className = "actuador";
		actuadorDiv.innerHTML = `<h2>Actuador ${actuador.nombre}</h2>`;
		let valorActuador = document.createElement("p");
		valorActuador.id = `${actuador.nombre}-value`;
		valorActuador.innerHTML = `Activado: ${actuador.activado ? "Sí" : "No"}`;
		valorActuador.dataset.estado = actuador.activado;
		actuadorDiv.appendChild(valorActuador);
		let toggleButton = document.createElement("button");
		toggleButton.innerHTML = "Cambiar";
		toggleButton.onclick = function() {
			let newValue = valorActuador.dataset.estado == "true" ? false : true;
			io.emit(`${actuador.nombre}-toggle`, newValue);
			valorActuador.dataset.estado = newValue;
			console.log(newValue)
			valorActuador.innerHTML = `Activado: ${newValue ? "Sí" : "No"}`;
		}
		actuadorDiv.appendChild(toggleButton);
		contentActuadores.appendChild(actuadorDiv);
		io.on(`${actuador.nombre}-toggle`, function(data) {
			console.log("Cambio en el actuador " + actuador.nombre + ": " + data);
			let valorActuador = document.getElementById(`${actuador.nombre}-value`);
			valorActuador.innerHTML = `Activado: ${data ? "Sí" : "No"}`;
		});
	}
});