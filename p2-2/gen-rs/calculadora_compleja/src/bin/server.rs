use calculadora_compleja::{CalculadoraComplejaSyncHandler, CalculadoraComplejaSyncProcessor};
use thrift::protocol::{TCompactInputProtocolFactory, TCompactOutputProtocolFactory};
use thrift::server::TServer;
use thrift::transport::{TFramedReadTransportFactory, TFramedWriteTransportFactory};

fn main() {
    match run() {
        Ok(_) => println!("Success"),
        Err(e) => eprintln!("Error: {:?}", e),
    }
}

fn run() -> thrift::Result<()> {
    let listen_address = "localhost:9091";

    let i_transport_factory = TFramedReadTransportFactory::new();
    let i_protocol_factory = TCompactInputProtocolFactory::new();

    let o_transport_factory = TFramedWriteTransportFactory::new();
    let o_protocol_factory = TCompactOutputProtocolFactory::new();

    let processor = CalculadoraComplejaSyncProcessor::new(CalculadoraComplejaHandlerImpl {});

    let mut server = TServer::new(
        i_transport_factory,
        i_protocol_factory,
        o_transport_factory,
        o_protocol_factory,
        processor,
        10,
    );

    print!("Iniciando servidor en {}\n", listen_address);
    server.listen(listen_address);
    Ok(())
}

// Implementación del server
#[derive(Default)]
struct CalculadoraComplejaHandlerImpl;
impl CalculadoraComplejaSyncHandler for CalculadoraComplejaHandlerImpl {
    fn handle_ping(&self) -> thrift::Result<()> {
        print!("Ping recibido!\n");
        Ok(())
    }

    fn handle_sumar_vectores(
        &self,
        vec1: Vec<thrift::OrderedFloat<f64>>,
        vec2: Vec<thrift::OrderedFloat<f64>>,
    ) -> thrift::Result<Vec<thrift::OrderedFloat<f64>>> {
        todo!()
    }

    fn handle_restar_vectores(
        &self,
        vec1: Vec<thrift::OrderedFloat<f64>>,
        vec2: Vec<thrift::OrderedFloat<f64>>,
    ) -> thrift::Result<Vec<thrift::OrderedFloat<f64>>> {
        todo!()
    }

    fn handle_producto_escalar(
        &self,
        vec1: Vec<thrift::OrderedFloat<f64>>,
        vec2: Vec<thrift::OrderedFloat<f64>>,
    ) -> thrift::Result<Vec<thrift::OrderedFloat<f64>>> {
        todo!()
    }

    fn handle_producto_vectorial(
        &self,
        vec1: Vec<thrift::OrderedFloat<f64>>,
        vec2: Vec<thrift::OrderedFloat<f64>>,
    ) -> thrift::Result<Vec<thrift::OrderedFloat<f64>>> {
        todo!()
    }
}
