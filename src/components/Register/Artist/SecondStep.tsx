import { Grid, TextField } from "@mui/material";
import { IClient } from "../../../@types/IClient";
import { checkTel, checkBank, checkCity, checkPostalCode } from "../../../utils/utils";

interface IArtistSecondStepProps {
  detailsValues: IClient;
  handleChangeDetails: (prop: keyof IClient, value: any) => void;
}
  
export const ArtistSecondStep: React.FC<IArtistSecondStepProps> = ({ detailsValues, handleChangeDetails }) => {

  return (
    <>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          inputProps={{ maxLength: 14 }}
          type="text"
          id="phonenumber"
          label="Numéro de téléphone"
          name="phonenumber"
          onChange={(e) => handleChangeDetails('phonenumber', e.target.value)}
          value={detailsValues.phonenumber}
          error={detailsValues.phonenumber ? !checkTel(detailsValues.phonenumber) : false}
          helperText={detailsValues.phonenumber ? (!checkTel(detailsValues.phonenumber) ? "Veuillez entrer un numéro de téléphone valide" : '') : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          inputProps={{ maxLength: 16 }}
          type="text"
          id="bank_account_number"
          label="Numéro compte bancaire"
          name="bank_account_number"
          onChange={(e) => handleChangeDetails('bank_account_number', e.target.value)}
          value={detailsValues.bank_account_number}
          error={detailsValues.bank_account_number ? !checkBank(detailsValues.bank_account_number) : false}
          helperText={detailsValues.bank_account_number ? (!checkBank(detailsValues.bank_account_number) ? "Veuillez entrer un numéro de compte bancaire valide" : '') : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          type="text"
          id="address"
          label="Addresse postale"
          name="address"
          onChange={(e) => handleChangeDetails('address', {...detailsValues.address, address: e.target.value})}
          value={detailsValues.address.address}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          inputProps={{ maxLength: 5 }}
          id="postalcode"
          label="Code postal"
          name="postalcode"
          onChange={(e) => handleChangeDetails('address', {...detailsValues.address, postalcode: e.target.value})}
          value={detailsValues.address.postalcode}
          error={detailsValues.address.postalcode ? !checkPostalCode(detailsValues.address.postalcode) : false}
          helperText={detailsValues.address.postalcode ? (!checkPostalCode(detailsValues.address.postalcode) ? "Veuillez entrer un code postal valide" : '') : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="city"
          label="Commune"
          name="city"
          onChange={(e) => handleChangeDetails('address', {...detailsValues.address, city: e.target.value})}
          value={detailsValues.address.city}
          error={detailsValues.address.city ? !checkCity(detailsValues.address.city) : false}
          helperText={detailsValues.address.city ? (!checkCity(detailsValues.address.city) ? "Veuillez entrer une ville valide" : '') : ''}
        />
      </Grid>
    </>
  );
};