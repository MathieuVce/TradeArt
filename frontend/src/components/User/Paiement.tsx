import React from 'react';
import { IPaymentValues } from '../../@types/IUser';
import { TextField, Grid, Typography } from "@mui/material";

interface IPaymentFormProps {
  // paimentValues: IPaymentValues;
}

export const PaymentForm: React.FC<IPaymentFormProps> = () => {

  return <>
    <Grid item xs={6} sm={3}>
      <TextField
          label="Amount"
          name="amount"
          variant="outlined"
          required
          fullWidth
          // value={formValues.amount}
          // onChange={e =>
              // dispatch({
              //     type: "editFormValue",
              //     key: "amount",
              //     value: e.target.value.replace(/[^0-9,.]/g, '')
              // })
          // }
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
          // InputProps={{
          //     inputComponent: StripeInput,
          //     inputProps: {
          //         component: CardNumberElement
          //     },
          // }}
          InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={6} sm={6}>
      <TextField
          label="Expiration Date"
          name="ccexp"
          variant="outlined"
          required
          fullWidth
          // InputProps={{
          //     inputProps: {
          //         component: CardExpiryElement
          //     },
          //     inputComponent: StripeInput
          // }}
          InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={6} sm={6}>
      <TextField
          label="CVC"
          name="cvc"
          variant="outlined"
          required
          fullWidth
          // InputProps={{
          //     inputProps: {
          //         component: CardCvcElement
          //     },
          //     inputComponent: StripeInput
          // }}
          InputLabelProps={{ shrink: true }}
      />
    </Grid>
  </>
}
