import glob
import sys

import math

from calculadora import Calculadora
from calculadora_compleja import CalculadoraCompleja

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

import logging

logging.basicConfig(level=logging.DEBUG)


class CalculadoraHandler:
    def __init__(self):
        self.log = {}

    def ping(self):
        print("me han hecho ping()")
        print("haciendo ping al servidor en nodejs...")
        transport = TSocket.TSocket("localhost", 9091)
        transport = TTransport.TBufferedTransport(transport)
        protocol = TBinaryProtocol.TBinaryProtocol(transport)

        client = CalculadoraCompleja.Client(protocol)
        transport.open()

        client.ping()

        transport.close()

    def suma(self, n1, n2):
        print("sumando " + str(n1) + " con " + str(n2))
        return n1 + n2

    def resta(self, n1, n2):
        print("restando " + str(n1) + " con " + str(n2))
        return n1 - n2

    def multiplicacion(self, n1, n2):
        print("multiplicando " + str(n1) + " con " + str(n2))
        return n1 * n2

    def division(self, n1, n2):
        print("dividiendo " + str(n1) + " con " + str(n2))
        if n2 == 0:
            print("Error, intentando dividir entre 0")
            raise Calculadora.InvalidOperation(1, "Division por cero")
        return n1 / n2

    def seno(self, n1):
        print("calculando seno de " + str(n1))
        return math.sin(math.radians(n1))

    def coseno(self, n1):
        print("calculando coseno de " + str(n1))
        return math.cos(math.radians(n1))

    def tangente(self, n1):
        print("calculando tangente de " + str(n1))
        return math.tan(math.radians(n1))

    def convertirGradosARadianes(self, n1):
        print("convirtiendo " + str(n1) + " a radianes")
        return math.radians(n1)

    def convertirRadianesAGrados(self, n1):
        print("convirtiendo " + str(n1) + " a grados")
        return math.degrees(n1)

    def operacionesVectores(self, v1, v2, operacion):
        transport = TSocket.TSocket("localhost", 9091)
        transport = TTransport.TBufferedTransport(transport)
        protocol = TBinaryProtocol.TBinaryProtocol(transport)

        client = CalculadoraCompleja.Client(protocol)
        try:
            transport.open()

            match (operacion):
                case "+":
                    print("sumando vectores " + str(v1) + " con " + str(v2))
                    return client.sumarVectores(v1, v2)

                case "-":
                    print("restando vectores " + str(v1) + " con " + str(v2))
                    return client.restarVectores(v1, v2)
                case "x":
                    print("multiplicando vectores " + str(v1) + " con " + str(v2))
                    return client.productoVectorial(v1, v2)
        except CalculadoraCompleja.InvalidSize as e:
            print("Los vectores tienen tamaños distintos: " + e.message)
            raise Calculadora.InvalidSize(e.message)
        finally:
            transport.close()

    def productoEscalar(self, v1, v2):
        transport = TSocket.TSocket("localhost", 9091)
        transport = TTransport.TBufferedTransport(transport)
        protocol = TBinaryProtocol.TBinaryProtocol(transport)

        client = CalculadoraCompleja.Client(protocol)
        try:
            transport.open()

            print(
                "calculando producto punto de vectores " + str(v1) + " con " + str(v2)
            )
            return client.productoEscalar(v1, v2)
        except CalculadoraCompleja.InvalidSize as e:
            print("Los vectores tienen tamaños distintos: " + e.message)
            raise Calculadora.InvalidSize(e.message)
        finally:
            transport.close()


if __name__ == "__main__":
    handler = CalculadoraHandler()
    processor = Calculadora.Processor(handler)
    transport = TSocket.TServerSocket(host="127.0.0.1", port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print("iniciando servidor...")
    server.serve()
    print("fin")
