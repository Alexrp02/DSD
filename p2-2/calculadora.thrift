exception InvalidOperation {
   1: i32 errnum,
   2: string message,
}

service Calculadora{
   void ping(),
   double suma(1:double num1, 2:double num2),
   double resta(1:double num1, 2:double num2),
   double multiplicacion(1:double num1, 2:double num2),
   double division(1:double num1, 2:double num2) throws (1:InvalidOperation invalidOperation),
   double seno(1:double num),
   double coseno(1:double num),
   double tangente(1:double num),
   double convertirGradosARadianes(1:double num),
   double convertirRadianesAGrados(1: double num),
}
