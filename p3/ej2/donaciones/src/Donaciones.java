import java.rmi.AlreadyBoundException;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Donaciones implements IDonaciones{
    private Map<String, Double> entidadesRegistradas;
    private int numReplicas;
    private int serverNum;
    private double totalDonado;

    public Donaciones(int numReplicas, int serverNum) {
        entidadesRegistradas = new HashMap<>();
        this.numReplicas = numReplicas;
        this.serverNum = serverNum;
    }

    @Override
    public IDonaciones registrar(String entidad) throws RemoteException {
        if(this.isRegistrado(entidad))
            return this;
        Registry registry = LocateRegistry.getRegistry();
        IDonaciones servidorConMenosRegistrados = this ;
        // Comprobamos de todos los servidores que hay registrados cual es el que menos entidades tiene registradas
        for (int i=0 ; i<numReplicas ; i++) {
            if(i!=serverNum){
                try {
                    IDonaciones servidorTemp = (IDonaciones) registry.lookup(String.valueOf(i)) ;
                    // Si la entidad ya está registrada, devolvemos el servidor al que está registrado
                    if(servidorTemp.isRegistrado(entidad))
                        return servidorTemp;

                    if(servidorTemp.getNumRegistrados() < servidorConMenosRegistrados.getNumRegistrados())
                        servidorConMenosRegistrados = servidorTemp;

                } catch (NotBoundException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        // Si el servidor con menos entidades es este, entonces lo registramos y devolvemos la referencia
        if(servidorConMenosRegistrados == this) {
            entidadesRegistradas.put(entidad, 0.0);
            return this;
        }
        // Devolvemos la referencia a el servidor en el que vamos a registrar la entidad después de registrarla
        servidorConMenosRegistrados.registrar(entidad) ;
        return servidorConMenosRegistrados;
    }

    @Override
    public IDonaciones depositar(double cantidad, String entidad) throws RemoteException {
        if(cantidad < 0 )
            throw new RemoteException("No se puede donar una cantidad negativa");
        if(this.isRegistrado(entidad)) {
            entidadesRegistradas.put(entidad, entidadesRegistradas.get(entidad) + cantidad) ;
            totalDonado += cantidad;
            return this ;
        }
        Registry registry = LocateRegistry.getRegistry();
        IDonaciones servidorConEntidadRegistrada = this;
        for (int i=0 ; i<numReplicas ; i++) {
            if(i!=serverNum){
                try {
                    IDonaciones servidorTemp = (IDonaciones) registry.lookup(String.valueOf(i)) ;
                    // Si la entidad ya está registrada, devolvemos el servidor al que está registrado
                    if(servidorTemp.isRegistrado(entidad))
                        return servidorTemp;
                } catch (NotBoundException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        if(!servidorConEntidadRegistrada.isRegistrado(entidad)) {
            throw new RemoteException("No se puede hacer un depósito sin haberte registrado previamente");
        }
        servidorConEntidadRegistrada.depositar(cantidad, entidad) ;
        return servidorConEntidadRegistrada;
    }

    @Override
    public int getNumRegistrados() {
        return entidadesRegistradas.keySet().size();
    }

    @Override
    public boolean isRegistrado (String entidad) {
        return entidadesRegistradas.containsKey(entidad);
    }

    public static void main(String[] args) throws IllegalArgumentException, RemoteException, NotBoundException {
        if(args.length < 1)
            throw new IllegalArgumentException("Por favor introduce el número de réplicas que desea (mínimo 1)");

        int numReplicas = Integer.parseInt(args[0]);
        if(numReplicas <= 0)
            throw new IllegalArgumentException("El número de réplicas de servidores tiene que ser mayor que cero");

        Registry registry = LocateRegistry.getRegistry();
        // Eliminamos todos los servidores que hubiera antes
        for (String servidorRegistrado : registry.list())
            registry.unbind(servidorRegistrado);

        // Inicializamos los servidores y los registramos en el registro
        IDonaciones[] servidores = new IDonaciones[Integer.parseInt(args[0])];
        for(int i=0 ; i<numReplicas ; i++ ) {
            servidores[i] = new Donaciones(numReplicas, i) ;
            IDonaciones stub = null;
            stub = (IDonaciones) UnicastRemoteObject.exportObject(servidores[i], 0);
            try {
                registry.bind(String.valueOf(i), stub);
            } catch (AlreadyBoundException e) {
                throw new RuntimeException(e.getMessage() + "\n Ha habido un fallo al registrar el servidor " + i + ", éste ya está registrado en el registro");
            }

        }
        System.out.println(numReplicas + " réplicas de servidores de donaciones funcionando.");

    }
}
