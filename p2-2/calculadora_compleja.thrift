exception InvalidSize {
	1: string message
}

service CalculadoraCompleja {
	void ping();
	list<double> sumarVectores(1: list<double> vec1, 2: list<double> vec2) throws (1: InvalidSize e)
	list<double> restarVectores(1: list<double> vec1, 2: list<double> vec2) throws (1: InvalidSize e)
	double productoEscalar(1: list<double> vec1, 2: list<double> vec2) throws (1: InvalidSize e)
	list<double> productoVectorial(1: list<double> vec1, 2: list<double> vec2) throws (1: InvalidSize e)
}
