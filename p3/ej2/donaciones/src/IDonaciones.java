import java.rmi.Remote;
import java.util.ArrayList;
import java.util.List;

public interface IDonaciones extends Remote {
    public void registrar(String entidad);
    public void depositar(double cantidad);
    public int getNumRegistrados ();

}
