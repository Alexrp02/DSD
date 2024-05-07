import java.util.ArrayList;
import java.util.List;

public class Donaciones implements IDonaciones{
    private List<String> entidadesRegistradas;
    double cantidadDonada ;
    private int numReplicas;
    private int serverNum;

    public Donaciones(int numReplicas, int serverNum) {
        entidadesRegistradas = new ArrayList<>();
        cantidadDonada = 0;
        this.numReplicas = numReplicas;
        this.serverNum = serverNum;
    }

    @Override
    public void registrar(String entidad) {
        entidadesRegistradas.add(entidad);
    }

    @Override
    public void depositar(double cantidad, String entidad) {
        if(entidadesRegistradas.contains(entidad))
            cantidadDonada += cantidad;
    }

    @Override
    public int getNumRegistrados() {
        return 0;
    }
}
