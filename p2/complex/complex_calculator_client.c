/*
 * This is sample code generated by rpcgen.
 * These are only templates and you can use them
 * as a guideline for developing your own functions.
 */

#include "complex_calculator.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int getArrayLength(char *input) {
  int count = 0;
  for (int i = 0; input[i] != '\0'; i++) {
    if (input[i] == ',' || input[i] == ']') {
      count++;
    }
  }
  return count;
}

vector_operando parseArray(char *input) {
  int count = 0;
  int *array = NULL;
  vector_operando op;

  count = getArrayLength(input);
  op.vector_operando_len = count;
  printf("Vector con tamaño: %d\n", op.vector_operando_len);

  // Allocate memory for the array
  array = (int *)malloc(count * sizeof(int));

  // Parse the array elements
  int index = 0;
  int num = 0;
  sscanf(input, "[%d", &num);
  array[index++] = num;
  for (int i = 1; input[i] != '\0'; i++) {
    if (input[i] == ',' || input[i] == ']') {
      if (input[i] == ',') {
        sscanf(input + i + 1, "%d", &num);
        array[index++] = num;
      }
      i++;
    }
  }

  op.vector_operando_val = array;
  return op;
}

void complex_calculator_1(char *host, vector_operando op1, char operator,
                          vector_operando op2) {
  CLIENT *clnt;
  complex_calculator_res *result_1;

#ifndef DEBUG
  clnt = clnt_create(host, COMPLEX_CALCULATOR, CCALVER, "udp");
  if (clnt == NULL) {
    clnt_pcreateerror(host);
    exit(1);
  }
#endif /* DEBUG */

  result_1 = calculate_1(op1, operator, op2, clnt);
  if (result_1 == (complex_calculator_res *)NULL) {
    clnt_perror(clnt, "call failed");
  } else if (result_1->errnum != 0) {
    printf("Error: %d\n", result_1->errnum);
  }

  printf("Resultado: ");
  for (int i = 0; i < result_1->complex_calculator_res_u.res.res_len; i++) {
    printf("%d ", result_1->complex_calculator_res_u.res.res_val[i]);
  }
  printf("\n");

  free(result_1->complex_calculator_res_u.res.res_val);
#ifndef DEBUG
  clnt_destroy(clnt);
#endif /* DEBUG */
}

int main(int argc, char *argv[]) {
  char *host;

  if (argc < 5) {
    printf("usage: %s server_host vector1 operator vector2\n", argv[0]);

    exit(1);
  } else if (argv[2][0] != '[' || argv[4][0] != '[') {
    printf("The vectors must be in the format [1,2,3,4]\n");
    exit(1);
  } else if (argv[3][0] != '+' && argv[3][0] != '-') {
    printf("The operator must be + or -\n");
    exit(1);
  }

  vector_operando op1 = parseArray(argv[2]);
  printf("Primer vector: ");
  for (int i = 0; i < op1.vector_operando_len; i++) {
    printf("%d ", op1.vector_operando_val[i]);
  }
  vector_operando op2 = parseArray(argv[4]);

  host = argv[1];
  complex_calculator_1(host, op1, argv[3][0], op2);

  // Free the memory allocated for the vectors
  free(op1.vector_operando_val);
  free(op2.vector_operando_val);

  exit(0);
}
