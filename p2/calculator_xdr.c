/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#include "calculator.h"

bool_t
xdr_vector_operando (XDR *xdrs, vector_operando *objp)
{
	register int32_t *buf;

	 if (!xdr_array (xdrs, (char **)&objp->vector_operando_val, (u_int *) &objp->vector_operando_len, 10,
		sizeof (float), (xdrproc_t) xdr_float))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_calculator_res (XDR *xdrs, calculator_res *objp)
{
	register int32_t *buf;

	 if (!xdr_int (xdrs, &objp->errnum))
		 return FALSE;
	switch (objp->errnum) {
	case 0:
		 if (!xdr_float (xdrs, &objp->calculator_res_u.result))
			 return FALSE;
		break;
	default:
		break;
	}
	return TRUE;
}

bool_t
xdr_complex_calculator_res (XDR *xdrs, complex_calculator_res *objp)
{
	register int32_t *buf;

	 if (!xdr_int (xdrs, &objp->errnum))
		 return FALSE;
	switch (objp->errnum) {
	case 0:
		 if (!xdr_array (xdrs, (char **)&objp->complex_calculator_res_u.res.res_val, (u_int *) &objp->complex_calculator_res_u.res.res_len, 10,
			sizeof (float), (xdrproc_t) xdr_float))
			 return FALSE;
		break;
	default:
		break;
	}
	return TRUE;
}

bool_t
xdr_calculate_1_argument (XDR *xdrs, calculate_1_argument *objp)
{
	 if (!xdr_float (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_char (xdrs, &objp->arg2))
		 return FALSE;
	 if (!xdr_float (xdrs, &objp->arg3))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_complex_calculate_1_argument (XDR *xdrs, complex_calculate_1_argument *objp)
{
	 if (!xdr_vector_operando (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_char (xdrs, &objp->arg2))
		 return FALSE;
	 if (!xdr_vector_operando (xdrs, &objp->arg3))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_complex_calculate_2_argument (XDR *xdrs, complex_calculate_2_argument *objp)
{
	 if (!xdr_vector_operando (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_char (xdrs, &objp->arg2))
		 return FALSE;
	 if (!xdr_float (xdrs, &objp->arg3))
		 return FALSE;
	return TRUE;
}
