import { LoadingButton } from '@mui/lab';
import { useContext, useState, useRef } from "react";
import { IClient, IResponse } from "../../@types/IClient";
import { AlertContext } from "../../contexts/AlertContext";
import { ClientContext } from "../../contexts/ClientContext";
import { EditRounded, SettingsApplicationsRounded, ArrowCircleLeftRounded, ArrowCircleRightRounded } from '@mui/icons-material';
import { Avatar, Grid, Box, Badge, IconButton, Button, TextField, Container, Typography } from "@mui/material";
import { stringAvatar, SmallAvatar, create_blob, checkBirthDate, checkEmail, checkBank, checkCity, checkPostalCode, checkTel } from "../../utils/utils";


const ArtistProfil: React.FunctionComponent = () => {
  const { client, update } = useContext(ClientContext);
  const { Alerts } = useContext(AlertContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [clientValues, setClientValues] = useState<IClient>(client!);
  const fileInput = useRef<HTMLInputElement>(null);
    
  const handleUpdate = async () => {
    setLoading(true);
    const response: IResponse = await update(clientValues);
    Alerts[response.status]({message: response.message});
    setLoading(false);
  };
    
  const handleChangeValues = (prop: keyof typeof clientValues, value: any) => {
    setClientValues({
      ...clientValues,
      [prop]: value
    });
  };

  const handleOnChange = async (e: any) => {
    create_blob(e.target.files[0], (blob) => {
      handleChangeValues('photo', blob);
    });
  };
  
  const handleDisabled = () => {
    return (
      !clientValues.birthdate ||
      !clientValues.firstname ||
      !clientValues.lastname ||
      !clientValues.address ||
      !clientValues.phonenumber ||
      !clientValues.bank_account_number ||
      !clientValues.institution ||
      !clientValues.cursus ||
      !clientValues.description ||
      !clientValues.photo ||
      !clientValues.email
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 1
        }}
      >
        <Grid container  sx={{ alignItems: 'center', mr: 2.5, maxWidth: 50 }}>
          <Grid item>
            <IconButton color='primary' onClick={() => {setStep(step - 1)}} sx={{ '&:disabled': {background: "lightgrey"} }} disabled={step === 1}>
              <ArrowCircleLeftRounded  sx={{ width: 50, height: 50}}/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={2} minWidth={'80%'} mt={2}>
          <Grid container justifyContent='center' mb={2}>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={handleOnChange}
            />
            <Grid item>
              <IconButton aria-label="profil picture" sx={{ boxShadow: 2 }} onClick={() => {fileInput.current!.click() }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <SmallAvatar>
                      <EditRounded/>
                    </SmallAvatar>
                  }
                >
                  <Avatar aria-label="profil picture" {...stringAvatar(`${clientValues?.firstname!} ${clientValues?.lastname!}`, 100)} alt={`${clientValues?.firstname} ${clientValues?.lastname}`} src={clientValues.photo === 'p' ? '' : clientValues.photo}/>
                </Badge>
              </IconButton>
            </Grid>
          </Grid>
          {step === 1 ? (
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
                  inputProps={{ maxLength: 16 }}
                  type="text"
                  id="bank_account_number"
                  label="Numéro compte bancaire"
                  name="bank_account_number"
                  onChange={(e) => handleChangeValues('bank_account_number', e.target.value)}
                  value={clientValues.bank_account_number}
                  error={!checkBank(clientValues.bank_account_number)}
                  helperText={!checkBank(clientValues.bank_account_number) ? "Veuillez entrer un numéro de compte bancaire valide" : ' '}
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
            </>
          ) : (
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
                  id="institution"
                  label="Institution"
                  name="institution"
                  onChange={(e) => handleChangeValues('institution', e.target.value)}
                  value={clientValues.institution}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="cursus"
                  label="Cursus"
                  name="cursus"
                  onChange={(e) => handleChangeValues('cursus', e.target.value)}
                  value={clientValues.cursus}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="description"
                  label="Courte description"
                  name="description"
                  multiline
                  minRows={6}
                  maxRows={6}
                  onChange={(e) => handleChangeValues('description', e.target.value)}
                  value={clientValues.description}
                />
              </Grid>
            </>
          )}
          <Grid container justifyContent='center'>
            <Grid item pl={2}>
              {step} / <Typography variant='caption' color='primary' fontSize={16}>2</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent='flex-end' sx={{ mt: 1 }}>
            <Grid item>
              <Button variant='outlined' onClick={() => (setClientValues(client!))}>
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
        <Grid container sx={{ alignItems: 'center', ml: .5, maxWidth: 50 }}>
          <Grid item>
            <IconButton color='primary' onClick={() => {setStep(step + 1)}}  sx={{ '&:disabled': {background: "lightgrey"}}} disabled={step === 2}>
              <ArrowCircleRightRounded  sx={{ width: 50, height: 50}}/>
            </IconButton>
          </Grid>
        </Grid>
      </Box>    
    </Container>
  );
};

export default ArtistProfil;