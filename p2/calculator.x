/* Program for a simple calculator */

#include "custom_types.h"

program CALCULATOR {
		version CALVER {
				calculator_res CALCULATE(float, char, float) = 1;
				complex_calculator_res COMPLEX_CALCULATE(vector_operando, char, vector_operando) = 2;
			} = 1;
		version CALVER2 {
				complex_calculator_res COMPLEX_CALCULATE(vector_operando, char, float) = 1;
			} = 2;
	} = 0x20000001;
