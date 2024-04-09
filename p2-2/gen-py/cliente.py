from logging import error
from socket import J1939_NO_PGN
from calculadora import Calculadora
from simple_term_menu import TerminalMenu

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

transport = TSocket.TSocket("localhost", 9090)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)

client = Calculadora.Client(protocol)
opciones = [
    "Operaciones simples",
    "Operaciones trigonométricas",
    "Operaciones con vectores",
    "Salir",
]
operaciones = ["+", "-", "x", "/"]
trigonometria = [
    "seno",
    "coseno",
    "tangente",
    "convertir a radianes",
    "convertir a grados",
]
operaciones_vectores = ["Suma", "Resta", "Producto escalar", "Producto vectorial"]

transport.open()
print("Haciendo ping al servidor...")
client.ping()

while True:
    print()
    print("Selecciona qué tipo de operación deseas realizar:")

    terminal_menu = TerminalMenu(opciones)
    menu_entry_index = terminal_menu.show()
    operacion = "+"
    n1 = 0
    n2 = 0

    match menu_entry_index:
        case 0:
            print()
            print("Introduce la operación simple a realizar ")
            terminal_menu = TerminalMenu(operaciones)
            menu_entry_index = terminal_menu.show()
            operacion = operaciones[menu_entry_index]
            print(f"Seleccionaste la operación: {operacion}")
            print()
            n1 = float(input("Introduce el primer número: "))
            n2 = float(input("Introduce el segundo número: "))

        case 1:
            print()
            print("Introduce la operación trigonométrica a realizar ")
            terminal_menu = TerminalMenu(trigonometria)
            menu_entry_index = terminal_menu.show()
            operacion = trigonometria[menu_entry_index]
            print(f"Seleccionaste la operación: {operacion}")
            print()
            n1 = float(input("Introduce el número: "))

        case 2:
            print()
            print("Introduce la operación con vectores a realizar ")
            terminal_menu = TerminalMenu(operaciones_vectores)
            menu_entry_index = terminal_menu.show()
            operacion = operaciones_vectores[menu_entry_index]
            print(f"Seleccionaste la operación: {operacion}")
            print()
            print("Introduce los valores del primer vector (separados por comas)")
            vector1 = input()
            n1 = list(map(float, vector1.split(",")))
            print("Introduce los valores del segundo vector (separados por comas)")
            vector2 = input()
            n2 = list(map(float, vector2.split(",")))

        case 3:
            print()
            print("Saliendo del programa...")
            transport.close()
            break

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
                "Solicitando al servidor la conversión de " + str(n1) + " a radianes..."
            )
            resultado = client.convertirGradosARadianes(n1)
            print(str(n1) + " grados en radianes son: " + str(resultado))
        case "convertir a grados":
            print("Solicitando al servidor la conversión de " + str(n1) + " a grados")
            resultado = client.convertirRadianesAGrados(n1)
            print(str(n1) + " radianes en grados son: " + str(resultado))
        case "Suma":
            print("Solicitando al servidor la suma de los vectores...")
            try:
                resultado = client.operacionesVectores(n1, n2, "+")
                print("El resultado de la suma de los vectores es: " + str(resultado))
            except Calculadora.InvalidSize as e:
                error("Los vectores tienen que ser del mismo tamaño: " + e.message)
        case "Resta":
            print("Solicitando al servidor la resta de los vectores...")
            try:
                resultado = client.operacionesVectores(n1, n2, "-")
                print("El resultado de la resta de los vectores es: " + str(resultado))
            except Calculadora.InvalidSize as e:
                error("Los vectores tienen que ser del mismo tamaño: " + e.message)
        case "Producto escalar":
            print("Solicitando al servidor el producto escalar de los vectores...")
            try:
                resultado = client.productoEscalar(n1, n2)
                print(
                    "El resultado del producto escalar de los vectores es: "
                    + str(resultado)
                )
            except Calculadora.InvalidSize as e:
                error("Los vectores tienen que ser del mismo tamaño: " + e.message)
        case "Producto vectorial":
            print("Solicitando al servidor el producto vectorial de los vectores...")
            try:
                resultado = client.operacionesVectores(n1, n2, "x")
                print(
                    "El resultado del producto vectorial de los vectores es: "
                    + str(resultado)
                )
            except Calculadora.InvalidSize as e:
                error("Los vectores tienen que ser de tamaño 3: " + e.message)
