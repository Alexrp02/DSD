
var io = io("http://localhost:3000");

io.on("sensores-list", function(data) {
	console.log("Creando listeners para los sensores:")
	console.log(data);
	for (let tipoSensor of data) {
		io.on(`${tipoSensor}-alerta`, function(data) {
			console.log(data);
		});
	}
});
