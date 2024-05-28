
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
