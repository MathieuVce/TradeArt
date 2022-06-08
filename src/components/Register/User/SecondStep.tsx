import { IUser } from "../../../@types/IUser";
import { Grid, TextField } from "@mui/material";
import { checkTel, checkCity, checkPostalCode } from "../../../utils/utils";

interface IUserSecondStepProps {
  detailsValues: IUser;
  handleChangeDetails: (prop: keyof IUser, value: any) => void;
}
  
export const UserSecondStep: React.FC<IUserSecondStepProps> = ({ detailsValues, handleChangeDetails }) => {

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
          error={detailsValues.address.postalcode ? ! checkPostalCode(detailsValues.address.postalcode) : false}
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