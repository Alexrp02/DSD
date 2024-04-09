let thrift = require('thrift')

const CalculadoraCompleja = require('./CalculadoraCompleja')
let ttypes = require('./calculadora_compleja_types')

let data = {}

let server = thrift.createServer(CalculadoraCompleja, {
	ping: function() {
		console.log('ping()')
	},
	sumarVectores: function(v1, v2, result) {
		if (v1.length != v2.length) {
			result(new ttypes.InvalidSize({ message: 'Vectores de distinta longitud' }))
			return
		}

		console.log('sumarVectores llamada para vectores: ', v1, v2)
		result(null, v1.map((v, i) => v + v2[i]))
	},
	restarVectores: function(v1, v2, result) {
		if (v1.length != v2.length) {
			result(new ttypes.InvalidSize({ message: 'Vectores de distinta longitud' }))
			return
		}

		console.log('restarVectores llamada para vectores: ', v1, v2)
		result(null, v1.map((v, i) => v - v2[i]))
	},
	productoEscalar: function(v1, v2, result) {
		if (v1.length != v2.length) {
			result(new ttypes.InvalidSize({ message: 'Vectores de distinta longitud' }))
			return
		}

		console.log('productoEscalar llamada para vectores: ', v1, v2)
		let resultado = 0
		for (let i = 0; i < v1.length; i++) {
			resultado += v1[i] * v2[i]
		}
		result(null, resultado)
	},
	productoVectorial: function(v1, v2, result) {
		if (v1.length != 3 || v2.length != 3) {
			result(new ttypes.InvalidSize({ message: 'Alguno de los vectores no tiene tamaño 3' }))
			return
		}

		console.log('productoVectorial llamada para vectores: ', v1, v2)
		result(null, [
			v1[1] * v2[2] - v1[2] * v2[1],
			v1[2] * v2[0] - v1[0] * v2[2],
			v1[0] * v2[1] - v1[1] * v2[0]
		])
	}
}
)

server.listen(9091);
