/* Program for a calculator with more complex operations such as array operations */

typedef int vector_operando<10>;

union complex_calculator_res switch (int errnum) {
		case 0: int res<10>;
		default: void;
	};

program COMPLEX_CALCULATOR {
		version CCALVER {
				complex_calculator_res CALCULATE(vector_operando, char, vector_operando) = 1;
			} = 1;
	} = 0x20000002;
