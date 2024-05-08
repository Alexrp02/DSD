import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public interface IDonaciones extends Remote {
    public IDonaciones registrar(String entidad) throws RemoteException;
    public IDonaciones depositar(double cantidad, String entidad) throws  RemoteException;
    public int getNumRegistrados () throws RemoteException ;
    public boolean isRegistrado(String entidad) throws RemoteException;
    public double getTotalDonado(String entidad) throws RemoteException ;
    public double getDonado() throws RemoteException ;
    public List<String> getAllDonantes(String entidad) throws RemoteException ;
    public List<String> getDonantes() throws RemoteException ;
}
