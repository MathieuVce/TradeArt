import { useState } from "react";
import { IUser } from "../../../@types/IUser";
import { Grid, TextField } from "@mui/material";
import { IconTextField } from "../../IconTextField";
import { IAuth, IClient } from "../../../@types/IClient";
import { VisibilityOffRounded, VisibilityRounded } from "@material-ui/icons";
import { checkEmail, checkPassword, checkBirthDate } from "../../../utils/utils";

interface IArtistFirstStepProps {
  authValues: IAuth;
  detailsValues: IClient | IUser;
  handleChangeAuth: (prop: keyof IAuth, value: string | boolean) => void;
  handleChangeDetails: (prop: any, value: any) => void;
}
  
export const ArtistFirstStep: React.FC<IArtistFirstStepProps> = ({  authValues, detailsValues, handleChangeAuth, handleChangeDetails }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="given-name"
          name="firstname"
          required
          fullWidth
          id="firstname"
          label="Prénom"
          autoFocus
          onChange={(e) => handleChangeDetails('firstname', e.target.value)}
          value={detailsValues.firstname}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastname"
          label="Nom"
          name="lastname"
          autoComplete="family-name"
          onChange={(e) => handleChangeDetails('lastname', e.target.value)}
          value={detailsValues.lastname}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Addresse E-mail"
          name="email"
          autoComplete="email"
          error={!checkEmail(authValues.email)}
          helperText={!checkEmail(authValues.email) ? "Veuillez suivre le format d'email: exemple@exemple.com" : ''}
          onChange={(e) => handleChangeAuth('email', e.target.value)}
          value={authValues.email}
        />
      </Grid>
      <Grid item xs={12}>
        <IconTextField
        variant='outlined'
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mot de passe"
        type={visible ? "text" : "password"}
        id="password"
        autoComplete="current-password"
        onChange={(e: { target: { value: string; }; }) => handleChangeAuth('password', e.target.value)}
        iconEnd={visible ? <VisibilityOffRounded/> : <VisibilityRounded/>}
        onIconClick={() => setVisible(!visible)}
        error={!checkPassword(authValues.password)}
        helperText={!checkPassword(authValues.password) ? "Votre mot de passe doit contenir au moins 6 caractères, une lettre majuscule et un chiffre. Pas d'accent ni de caractère spécial." : ' '}
        value={authValues.password}
      />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="date"
          label="Date de naissance"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => handleChangeDetails('birthdate', e.target.value)}
          error={!checkBirthDate(detailsValues.birthdate)}
          helperText={!checkBirthDate(detailsValues.birthdate) ? "Vous devez avoir au moins 18 ans" : ' '}
          value={detailsValues.birthdate}
        />
      </Grid>
    </>
  );
};