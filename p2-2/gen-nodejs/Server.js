let thrift = require('thrift');

let CalculadoraCompleja = require('./CalculadoraCompleja');
let ttypes = require('./calculadora_compleja_types');

let data = {}

let server = thrift.createServer(CalculadoraCompleja, {
	ping: function() {
		console.log('ping()')
	},
}
)

server.listen(9091);
