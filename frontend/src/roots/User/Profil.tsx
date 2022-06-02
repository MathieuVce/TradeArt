import { LoadingButton } from '@mui/lab';
import { IUser } from '../../@types/IUser';
import { useContext, useState } from "react";
import { IResponse } from "../../@types/IClient";
import { UserContext } from "../../contexts/UserContext";
import { AlertContext } from "../../contexts/AlertContext";
import { SettingsApplicationsRounded } from '@mui/icons-material';
import { Grid, Box, Button, TextField, Container, Typography } from "@mui/material";
import { checkBirthDate, checkEmail, checkCity, checkPostalCode, checkTel } from "../../utils/utils";


const UserProfil: React.FunctionComponent = () => {
  const { user, updateU } = useContext(UserContext);
  const { Alerts } = useContext(AlertContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [clientValues, setClientValues] = useState<IUser>(user!);
    
  const handleUpdate = async () => {
    setLoading(true);
    const response: IResponse = await updateU(clientValues);
    Alerts[response.status]({message: response.message});
    setLoading(false);
  };
    
  const handleChangeValues = (prop: keyof typeof clientValues, value: any) => {
    setClientValues({
      ...clientValues,
      [prop]: value
    });
  };
  
  const handleDisabled = () => {
    return (
      !clientValues.birthdate ||
      !clientValues.firstname ||
      !clientValues.lastname ||
      !clientValues.address ||
      !clientValues.phonenumber ||
      !clientValues.credit_card_number ||
      !clientValues.email
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8
        }}
      >
        <Grid container spacing={2}>
          <Grid container justifyContent={'center'} marginBottom={4}>
            <Grid item>
              <Typography variant='h3' color='primary'>
                Modifier Profil
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstname"
              required
              fullWidth
              id="firstname"
              label="Prénom"
              autoFocus
              onChange={(e) => handleChangeValues('firstname', e.target.value)}
              value={clientValues.firstname}
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
              onChange={(e) => handleChangeValues('lastname', e.target.value)}
              value={clientValues.lastname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Addresse E-mail"
              name="email"
              autoComplete="email"
              error={!checkEmail(clientValues.email)}
              helperText={!checkEmail(clientValues.email) ? "Veuillez suivre le format d'email: exemple@exemple.com" : ''}
              onChange={(e) => handleChangeValues('email', e.target.value)}
              value={clientValues.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="date"
              label="Date de naissance"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleChangeValues('birthdate', e.target.value)}
              error={!checkBirthDate(clientValues.birthdate)}
              helperText={!checkBirthDate(clientValues.birthdate) ? "Vous devez avoir au moins 18 ans" : ' '}
              value={clientValues.birthdate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              inputProps={{ maxLength: 14 }}
              type="text"
              id="phonenumber"
              label="Numéro de téléphone"
              name="phonenumber"
              onChange={(e) => handleChangeValues('phonenumber', e.target.value)}
              value={clientValues.phonenumber}
              error={!checkTel(clientValues.phonenumber)}
              helperText={!checkTel(clientValues.phonenumber) ? "Veuillez entrer un numéro de téléphone valide" : ' '}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="text"
              id="address"
              label="Addresse postale"
              name="address"
              onChange={(e) => handleChangeValues('address', {...clientValues.address, address: e.target.value})}
              value={clientValues.address.address}
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
              onChange={(e) => handleChangeValues('address', {...clientValues.address, postalcode: e.target.value})}
              value={clientValues.address.postalcode}
              error={!checkPostalCode(clientValues.address.postalcode)}
              helperText={!checkPostalCode(clientValues.address.postalcode) ? "Veuillez entrer un code postal valide" : ' '}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="city"
              label="Commune"
              name="city"
              onChange={(e) => handleChangeValues('address', {...clientValues.address, city: e.target.value})}
              value={clientValues.address.city}
              error={!checkCity(clientValues.address.city)}
              helperText={!checkCity(clientValues.address.city) ? "Veuillez entrer une ville valide" : ' '}
            />
          </Grid>
          <Grid container spacing={2} justifyContent='flex-end' sx={{ mt: 1 }}>
            <Grid item>
              <Button variant='outlined' onClick={() => (setClientValues(user!))}>
                Annuler
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                type="submit"
                variant="contained"
                disabled={handleDisabled()}
                onClick={() => handleUpdate()}
                endIcon={<SettingsApplicationsRounded/>}
                loading={loading}
                loadingPosition="end"
              >
                Enregistrer
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>    
    </Container>
  );
};

export default UserProfil;