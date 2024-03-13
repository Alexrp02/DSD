/*
 * This is sample code generated by rpcgen.
 * These are only templates and you can use them
 * as a guideline for developing your own functions.
 */

#include "./calculator.h"
#include <stdio.h>

calculator_res *calculate_1_svc(float num1, char operator, float num2,
                                struct svc_req *rqstp) {
  static calculator_res result;

  /*
   * insert server code here
   */
  printf("Llamada para operación %f %c %f\n", num1, operator, num2);
  result.errnum = 0;
  switch (operator) {
  case '+':
    result.calculator_res_u.result = num1 + num2;
    break;
  case '-':
    result.calculator_res_u.result = num1 - num2;
    break;
  case 'x':
    result.calculator_res_u.result = num1 * num2;
    break;
  case '/':
    if (num2 == 0) {
      result.errnum = 1;
      return &result;
    }
    result.calculator_res_u.result = num1 / num2;
    break;
  default:
    result.errnum = 1;
    return &result;
  }

  return &result;
}

complex_calculator_res *complex_calculate_1_svc(vector_operando arg1,
                                                char operator,
                                                vector_operando arg2,
                                                struct svc_req *rqstp) {
  printf("Función demasiado compleja para este servidor, llamando a servidor "
         "más capacitado.\n");
  static complex_calculator_res result;
  result.errnum = 0;
  return &result;
}
