from logging import error
from calculadora import Calculadora

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

transport = TSocket.TSocket("localhost", 9090)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)

client = Calculadora.Client(protocol)
operaciones = ["+", "-", "x", "/"]
trigonometria = [
    "seno",
    "coseno",
    "tangente",
    "convertir a radianes",
    "convertir a grados",
]

transport.open()
print("Haciendo ping al servidor...")
client.ping()

while True:
    print("Introduce el primer número a operar:")
    n1 = int(input())

    print(
        "Introduce la operación a realizar "
        + str(operaciones).replace("[", "(").replace("]", ")").replace("'", "")
        + " "
        + str(trigonometria).replace("[", "(").replace("]", ")").replace("'", "")
        + ":"
    )
    operacion = input()

    if operacion in operaciones:
        print("Introduce el segundo número a operar:")
        n2 = int(input())
        print(
            "La operación a solicitar al servidor es "
            + str(n1)
            + " "
            + operacion
            + " "
            + str(n2)
        )

        match operacion:
            case "+":
                print("Solicitando al servidor una suma...")
                resultado = client.suma(n1, n2)
                print("El resultado de la suma es: " + str(resultado))
                resultado = client.operacionesVectores([n1, n2], [n2, n1], "+")
                print("El resultado de la suma de vectores es: " + str(resultado))
            case "-":
                print("Solicitando al servidor una resta...")
                resultado = client.resta(n1, n2)
                print("El resultado de la resta es: " + str(resultado))
            case "x":
                print("Solicitando al servidor una multiplicación...")
                resultado = client.multiplicacion(n1, n2)
                print("El resultado de la multiplicación es: " + str(resultado))
            case "/":
                print("Solicitando al servidor una división...")
                try:
                    resultado = client.division(n1, n2)
                    print("El resultado de la división es: " + str(resultado))
                except Calculadora.InvalidOperation as e:
                    error("InvalidOperation: " + e.message)
    elif operacion in trigonometria:
        match operacion:
            case "seno":
                print("Solicitando al servidor el seno de " + str(n1) + "...")
                resultado = client.seno(n1)
                print("El seno de " + str(n1) + " es: " + str(resultado))
            case "coseno":
                print("Solicitando al servidor el coseno de " + str(n1) + "...")
                resultado = client.coseno(n1)
                print("El coseno de " + str(n1) + " es: " + str(resultado))
            case "tangente":
                print("Solicitando al servidor la tangente de " + str(n1) + "...")
                resultado = client.tangente(n1)
                print("La tangente de " + str(n1) + " es: " + str(resultado))
            case "convertir a radianes":
                print(
                    "Solicitando al servidor la conversión de "
                    + str(n1)
                    + " a radianes..."
                )
                resultado = client.convertirGradosARadianes(n1)
                print(str(n1) + " grados en radianes son: " + str(resultado))
            case "convertir a grados":
                print(
                    "Solicitando al servidor la conversión de " + str(n1) + " a grados"
                )
                resultado = client.convertirRadianesAGrados(n1)
                print(str(n1) + " radianes en grados son: " + str(resultado))
    else:
        print("La operación " + operacion + " no está implementada en el programa.")

    print("¿Desea realizar otra operación? (s/n)")
    respuesta = input()
    if respuesta == "n":
        transport.close()
        break
