import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;

public class Cliente {
    public static void main(String[] args) {
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        try {
            boolean salir = false ;
            Scanner keyboard = new Scanner(System.in);
            String nombreEntidad ;

            String identificadorServidor = "0";
            System.out.println("Buscando el primer servidor");
            Registry registry = LocateRegistry.getRegistry();
            IDonaciones servidor = (IDonaciones) registry.lookup(identificadorServidor) ;

            System.out.println("Introduzca el nombre de su entidad");
            nombreEntidad = keyboard.nextLine();
            System.out.println("Bienvenido/a " + nombreEntidad);

            while (!salir) {
                int eleccion = menuOpciones(keyboard) ;
                switch (eleccion) {
                    case 0:
                        salir = true;
                        System.out.println("Saliendo del programa...");
                        break;
                    case 1:
                        servidor = servidor.registrar(nombreEntidad) ;
                        System.out.println("Se ha registrado correctamente");
                        break;
                    case 2:
                        System.out.println("Introduzca la cantidad  que desea donar");
                        int cantidadDonada = keyboard.nextInt();
                        keyboard.nextLine();
                        while (cantidadDonada <=0) {
                            System.out.println("La cantidad donada debe de ser mayor de 0, introduzca otro valor:");
                            cantidadDonada = keyboard.nextInt();
                            keyboard.nextLine();
                        }
                        try {
                            servidor = servidor.depositar(cantidadDonada, nombreEntidad) ;
                            System.out.println("Donacion realizada correctamente");
                        } catch (RemoteException e) {
                            System.err.println("ERROR: Para poder realizar esta operación tienes que haberte registrado anteriormente");
                        }
                        break;
                    case 3:
                        try {
                            System.out.println("El total que se ha donado es de " + servidor.getTotalDonado(nombreEntidad));
                        } catch (RemoteException e) {
                            System.err.println("ERROR: Para poder realizar esta operación tienes que haberte registrado y hecho un depósito anteriormente");
                        }
                        break;
                    case 4 :
                        System.out.println("La lista de todos los donantes es la siguiente:");
                        try {
                            for(String donante : servidor.getAllDonantes(nombreEntidad))
                                System.out.println("- " + donante);
                        } catch (RemoteException e) {
                            System.err.println("ERROR: Para poder realizar esta operación tienes que haberte registrado y hecho un depósito anteriormente");
                        }
                        break;
                    default:
                        System.out.println("Introduzca una de las opciones listadas");
                        break;
                }
            }
        } catch (Exception e) {
            System.err.println("Ha habido un problema:");
            System.err.println(e.getLocalizedMessage());
        }
    }

    public static int menuOpciones(Scanner keyboard) {
        System.out.println();
        System.out.println("Dispone de las siguientes opciones:");
        System.out.println("1. Registrarte en el servidor de donaciones");
        System.out.println("2. Realizar un depósito");
        System.out.println("3. Consultar el total donado a el servidor de donaciones");
        System.out.println("4. Consultar la lista de todos los donantes");
        System.out.println("0. Salir");
        System.out.println();
        int eleccion = keyboard.nextInt() ;
        keyboard.nextLine();
        return eleccion;
    }
}

