use calculadora_compleja::{CalculadoraComplejaSyncClient, TCalculadoraComplejaSyncClient};

use thrift::protocol::{TCompactInputProtocol, TCompactOutputProtocol};
use thrift::transport::{TFramedReadTransport, TFramedWriteTransport, TIoChannel, TTcpChannel};

fn main() {
    match run() {
        Ok(_) => println!("Success"),
        Err(e) => eprintln!("Error: {:?}", e),
    }
}

fn run() -> thrift::Result<()> {
    let mut transport = TTcpChannel::new();
    transport.open("localhost:9090")?;
    let (i_chan, o_chan) = transport.split()?;

    let i_prot = TCompactInputProtocol::new(TFramedReadTransport::new(i_chan));
    let o_prot = TCompactOutputProtocol::new(TFramedWriteTransport::new(o_chan));

    let mut client = CalculadoraComplejaSyncClient::new(i_prot, o_prot);

    // Llamar a las funciones aquí, después de la declaración del cliente
    print!("Haciendo ping al servidor para comprobar que funcione.\n");
    client.ping()?;

    Ok(())
}
