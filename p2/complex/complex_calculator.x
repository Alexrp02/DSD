/* Program for a calculator with more complex operations such as array operations */

typedef float vector_operando2<10>;

union complex_calculator_res2 switch (int errnum) {
		case 0: float res<10>;
		default: void;
	};

program COMPLEX_CALCULATOR {
		version CCALVER {
				complex_calculator_res2 CALCULATE_COMPLEX(vector_operando2, char, vector_operando2) = 1;
			} = 1;
	} = 0x20000002;
