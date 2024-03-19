/* Program for a simple calculator */

typedef float vector_operando<10>;

union calculator_res switch (int errnum) {
		case 0 : float result;
		default : void;
	};

union complex_calculator_res switch (int errnum) {
		case 0: float res<10>;
		default: void;
	};


program CALCULATOR {
		version CALVER {
				calculator_res CALCULATE(float, char, float) = 1;
				complex_calculator_res COMPLEX_CALCULATE(vector_operando, char, vector_operando) = 2;
			} = 1;
		version CALVER2 {
				complex_calculator_res COMPLEX_CALCULATE(vector_operando, char, float) = 1;
			} = 2;
	} = 0x20000001;
