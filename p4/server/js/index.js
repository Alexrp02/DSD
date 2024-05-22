
var io = io("http://localhost:3000");

io.on("alerta", function(data) {
	console.log(data);
});
