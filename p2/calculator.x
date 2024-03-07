/* Program for a simple calculator */

union calculator_res switch (int errnum) {
		case 0 : float result;
		default : void;
	};

program CALCULATOR {
		version CALVER {
				calculator_res CALCULATE(float, char, float) = 1;
			} = 1;
	} = 0x20000001;
