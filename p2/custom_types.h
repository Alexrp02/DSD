
typedef float vector_operando<10>;

union calculator_res switch (int errnum) {
case 0:
  float result;
default:
  void;
};

union complex_calculator_res switch (int errnum) {
case 0:
  float res<10>;
default:
  void;
};
