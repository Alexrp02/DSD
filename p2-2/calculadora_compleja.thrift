service CalculadoraCompleja {
	void ping();
	list<double> sumarVectores(1: list<double> vec1, 2: list<double> vec2)
	list<double> restarVectores(1: list<double> vec1, 2: list<double> vec2)
	list<double> productoEscalar(1: list<double> vec1, 2: list<double> vec2)
	list<double> productoVectorial(1: list<double> vec1, 2: list<double> vec2)
}
