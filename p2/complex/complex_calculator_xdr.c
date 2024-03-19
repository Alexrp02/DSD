/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#include "complex_calculator.h"

bool_t
xdr_vector_operando2 (XDR *xdrs, vector_operando2 *objp)
{
	register int32_t *buf;

	 if (!xdr_array (xdrs, (char **)&objp->vector_operando2_val, (u_int *) &objp->vector_operando2_len, 10,
		sizeof (float), (xdrproc_t) xdr_float))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_complex_calculator_res2 (XDR *xdrs, complex_calculator_res2 *objp)
{
	register int32_t *buf;

	 if (!xdr_int (xdrs, &objp->errnum))
		 return FALSE;
	switch (objp->errnum) {
	case 0:
		 if (!xdr_array (xdrs, (char **)&objp->complex_calculator_res2_u.res.res_val, (u_int *) &objp->complex_calculator_res2_u.res.res_len, 10,
			sizeof (float), (xdrproc_t) xdr_float))
			 return FALSE;
		break;
	default:
		break;
	}
	return TRUE;
}

bool_t
xdr_calculate_complex_1_argument (XDR *xdrs, calculate_complex_1_argument *objp)
{
	 if (!xdr_vector_operando2 (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_char (xdrs, &objp->arg2))
		 return FALSE;
	 if (!xdr_vector_operando2 (xdrs, &objp->arg3))
		 return FALSE;
	return TRUE;
}
