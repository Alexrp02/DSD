/*
 * This is sample code generated by rpcgen.
 * These are only templates and you can use them
 * as a guideline for developing your own functions.
 */

#include "calculator.h"
#include <stdio.h>
#include <stdlib.h>

void calculator_1(char *host, float num1, char operator, float num2) {
  CLIENT *clnt;
  calculator_res *result_1;

#ifndef DEBUG
  clnt = clnt_create(host, CALCULATOR, CALVER, "udp");
  if (clnt == NULL) {
    clnt_pcreateerror(host);
    exit(1);
  }
#endif /* DEBUG */

  result_1 = calculate_1(num1, operator, num2, clnt);
  if (result_1 == (calculator_res *)NULL) {
    clnt_perror(clnt, "call failed");
  }

  if (result_1->errnum != 0) {
    printf("Error, not a valid operation: %d\n", result_1->errnum);
    exit(1);
  }

  printf("Result: %f\n", result_1->calculator_res_u.result);

#ifndef DEBUG
  clnt_destroy(clnt);
#endif /* DEBUG */
}

int main(int argc, char *argv[]) {
  char *host;
  float num1;
  char operator;
  float num2;

  if (argc != 5) {
    printf("Uso del programa: %s host num1 operator num2\n", argv[0]);
    exit(1);
  }
  host = argv[1];
  num1 = atof(argv[2]);
  operator= * argv[3];
  num2 = atof(argv[4]);

  calculator_1(host, num1, operator, num2);
  exit(0);
}