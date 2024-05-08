import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

public class Cliente {
    public static void main(String[] args) {
        if(args.length < 1)
            throw new IllegalArgumentException("Debe especificar el nombre de la entidad en los argumentos del programa");
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        try {
            String nombreEntidad = args[0] ;
            String identificadorServidor = "0";
            System.out.println("Buscando el objeto remoto");
            Registry registry = LocateRegistry.getRegistry();
            IDonaciones servidor = (IDonaciones) registry.lookup(identificadorServidor) ;
            servidor = servidor.registrar(nombreEntidad) ;

        } catch (Exception e) {
            System.err.println("Ha habido un problema:");
            e.printStackTrace();
        }
    }
}
