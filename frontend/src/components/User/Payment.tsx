import React, { useContext, useEffect, useState } from 'react';
import { IWork } from '../../@types/IClient';
import { IPaymentValues } from '../../@types/IUser';
import { UserContext } from '../../contexts/UserContext';
import { TextField, Grid, InputAdornment, OutlinedInput, Checkbox, FormControlLabel } from "@mui/material";
import { checkPostalCode, checkCity } from '../../utils/utils';

interface IPaymentFormProps {
  work: IWork;
  paymentValues: IPaymentValues;
  setPaymentValues:  React.Dispatch<React.SetStateAction<IPaymentValues>>;
}

export const PaymentForm: React.FC<IPaymentFormProps> = ({ work, paymentValues, setPaymentValues }) => {
  const { user } = useContext(UserContext);
  const [isSimilar, setIsSimilar] = useState(JSON.stringify(user?.address!) === JSON.stringify(paymentValues.address));

  
  const handleChangePaymentValues= (prop: keyof typeof paymentValues, value: any) => {
    setPaymentValues({
      ...paymentValues,
      [prop]: value
    });
  };
  
  useEffect(() => {
    handleChangePaymentValues('amount', work.price);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container alignItems={'center'} justifyContent={'center'} spacing={2} paddingTop={2}>
      <Grid item xs={12} sm={9}>
        <TextField
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          inputProps={{ maxLength: 16 }}
          onChange={(e) => handleChangePaymentValues('ccnumber', e.target.value)}
          value={paymentValues.ccnumber}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <OutlinedInput
          label="Amount"
          name="amount"
          fullWidth
          defaultValue={work.price}
          readOnly
          endAdornment={<InputAdornment position="end">€</InputAdornment>}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Expiration Date"
          name="ccexp"
          variant="outlined"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          onChange={(e) => handleChangePaymentValues('ccexp', e.target.value)}
          value={paymentValues.ccexp}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="CVC"
          name="cvc"
          variant="outlined"
          required
          fullWidth
          inputProps={{ maxLength: 3 }}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => handleChangePaymentValues('cccvc', e.target.value)}
          value={paymentValues.cccvc}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="secondary" onChange={() => {
            setIsSimilar(!isSimilar);
            handleChangePaymentValues("address", !isSimilar ? {...user?.address!} :
            {
              address: '',
              city: '',
              postalcode: ''
            });
          }}/>}
          label={"Même adresse ?"}
          value={isSimilar}
          checked={isSimilar}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          InputProps={{
            readOnly: isSimilar,
          }}
          required
          fullWidth
          type="text"
          id="address2"
          label="Adresse postale"
          name="address2"
          onChange={(e) => handleChangePaymentValues('address', {...paymentValues.address, address: e.target.value})}
          value={paymentValues.address.address}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          InputProps={{
            readOnly: isSimilar,
          }}
          required
          fullWidth
          inputProps={{ maxLength: 5 }}
          id="postalcode2"
          label="Code postal"
          name="postalcode2"
          onChange={(e) => handleChangePaymentValues('address', {...paymentValues.address, postalcode: e.target.value})}
          value={paymentValues.address.postalcode}
          error={!checkPostalCode(paymentValues.address.postalcode)}
          helperText={!checkPostalCode(paymentValues.address.postalcode) ? "Veuillez entrer un code postal valide" : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          InputProps={{
            readOnly: isSimilar,
          }}
          required
          fullWidth
          id="city2"
          label="Commune"
          name="city2"
          onChange={(e) => handleChangePaymentValues('address', {...paymentValues.address, city: e.target.value})}
          value={paymentValues.address.city}
          error={paymentValues.address.city ? !checkCity(paymentValues.address.city) : false}
          helperText={paymentValues.address.city ? (!checkCity(paymentValues.address.city) ? "Veuillez entrer une ville valide" : '') : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="secondary" onChange={() => {
            handleChangePaymentValues("save", !paymentValues.save);
          }}/>}
          label={"Enregistrer ma carte de paiement"}
          value={paymentValues.save}
          checked={paymentValues.save}
        />
      </Grid>
    </Grid>
  );
}
