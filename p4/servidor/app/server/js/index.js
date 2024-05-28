
var io = io("http://localhost:3000");

io.on("sensores-list", function(data) {
	console.log("Creando listeners para los sensores:")
	console.log(data);
	let contentSensores = document.getElementById("sensores-content");
	contentSensores.innerHTML = "";
	for (let sensor of data) {
		io.on(`${sensor.tipo}-alerta`, function(data) {
			console.log(data);
		});
		let sensorDiv = document.createElement("div");
		sensorDiv.className = "sensor";
		sensorDiv.innerHTML = `<h2>Sensor ${sensor.tipo}</h2>`;
		sensorDiv.innerHTML += `<p>Valor: ${sensor.valor} ${sensor.unidad}</p>`;
		contentSensores.appendChild(sensorDiv);
	}
});
