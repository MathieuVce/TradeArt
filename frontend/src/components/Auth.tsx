import { EAuth } from "../@types/EAuth";
import { LoadingButton } from '@mui/lab';
import { checkEmail } from '../utils/utils';
import { useContext, useState } from "react";
import { IRegisterU } from "../@types/IUser";
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";
import { ClientContext } from "../contexts/ClientContext";
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import { IAuth, IPassword, IRegister, IResponse, TUser } from "../@types/IClient";
import { LockOutlined, PersonRounded, LockOpenRounded, RotateLeftRounded } from '@mui/icons-material';
import logo from '../assets/logorounded.png';
import { Box, Grid, Avatar, IconProps, Checkbox, Typography, FormControlLabel, Button } from '@mui/material';

interface IAuthProps {
    type: EAuth;
    values: IAuth | IRegister | IPassword | IRegisterU;
}

export const Auth: React.FC<IAuthProps> = ({ type, values, children }) => {
  const { login, register, resetPassword } = useContext(ClientContext);
  const { loginU, registerU, resetPasswordU } = useContext(UserContext);
  const { Alerts } = useContext(AlertContext);
  const navigate = useNavigate();
  const { user } = useOutletContext<TUser>()

  
  const [loading, setLoading] = useState<boolean>(false);
  const [consent, setConsent] = useState<boolean>(false);
  const itemObj: {[key: string]: {info: any[], icon: IconProps, link?: string}} = {
    'login': {info: ["Se connecter", "Rester connecté", "Pas encore de compte ? S'inscrire", "/register"], icon: <LockOpenRounded/>},
    'register': {info: ["S'inscrire", "J'accepte les/de Tradeart*",  "Déjà un compte ? Connectez-vous", "/login"], icon:  <PersonRounded/>, link: "https://www.tradeart.fr&conditions d'utilisation"},
    'password': {info: ["Réinitialiser mot de passe", "",  "Revenir à la page de connexion", "/login"], icon: <RotateLeftRounded/>}
  };
  const itemRedirect: {[key: string]: string} = {
    'login': "/home",
    'register': "/login",
    'password': "/login"
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const callbackList: {[key: string]: Function} = {
      'login': async function loginUser() {
        if (user)
          return await loginU(values as IAuth);
        else
          return await login(values as IAuth);
      },
      'register': async function registerUser() {
        if (user)
          return await registerU(values as IRegisterU);
        else
          return await register(values as IRegister);
      },
      'password': async function resetUserPassword() {
        if (user)
          return await resetPasswordU(values as IPassword);
        else
          return await resetPassword(values as IPassword);
      }
    };
    setLoading(true);
    const res: IResponse = await callbackList[type]();
    Alerts[res.status]({message: res.message})
    setLoading(false);
    if (res.status === 'success') {
      navigate(itemRedirect[type]);
    }
  };

  const handleDisable = () => {
    const callbackList: {[key: string]: Function} = {
      'login': function disableLogin() {
        const authValues = values as IAuth;
        return (!authValues.email || !authValues.password);
      },
      'register': function disableRegister() {
        if (user) {
          const registerValues = values as IRegisterU;
          return (!consent ||
            !registerValues.login.password ||
            !registerValues.details.birthdate ||
            !registerValues.details.firstname ||
            !registerValues.details.lastname ||
            !registerValues.details.address ||
            !registerValues.details.phonenumber ||
            !registerValues.login.email
          );
        } else {
          const registerValues = values as IRegister;
          return (!consent ||
            !registerValues.login.password ||
            !registerValues.details.birthdate ||
            !registerValues.details.firstname ||
            !registerValues.details.lastname ||
            !registerValues.details.address ||
            !registerValues.details.phonenumber ||
            !registerValues.details.bank_account_number ||
            !registerValues.details.institution ||
            !registerValues.details.cursus ||
            !registerValues.details.description ||
            !registerValues.details.photo ||
            !registerValues.login.email
          );
        }
      },
      'password': function disablePassword() {
        const passwordValues = values as IPassword;
        return (!checkEmail(passwordValues.email) ||
          !passwordValues.password ||
          !passwordValues.confirmpassword ||
          passwordValues.password !== passwordValues.confirmpassword
        );
      }
    };
    return callbackList[type]();
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 12
      }}
    >
      {/* <Avatar sx={{ mt: 4, bgcolor: 'secondary.main' }}>
        <LockOutlined/>
      </Avatar> */}
      <Avatar sx={{ mt: 4, ml: .5, bgcolor: 'secondary.main',  width: 95, height: 95, backgroundColor: 'inherit' }} src={logo}>
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 4, position: 'absolute', mt: 16 }}>
        {itemObj[type].info[0]}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 12 }}>
        {children}
        {type !== EAuth.password && (
          <Grid item xs={12} marginTop={2}>
            <FormControlLabel
              sx={{ position: 'absolute' }}
              control={<Checkbox color="secondary" onChange={() => setConsent(!consent)}/>}
              label={
                itemObj[type].link ? (
                  <Grid container>
                    <Typography variant="body1" color="textSecondary">
                      {itemObj[type].info[1].split('/')[0]}
                    </Typography>
                    <Link to={itemObj[type].link?.split('&')[0]!} target="_blank" style={{ color: '#002E82', paddingLeft: 5, paddingRight: 5 }}>
                      {itemObj[type].link?.split('&')[1]}
                    </Link>
                    <Typography variant="body1" color="textSecondary">
                      {itemObj[type].info[1].split('/')[1]}
                    </Typography> 
                  </Grid>
                ) : (
                  <Typography variant="body1" color="textSecondary">
                    {itemObj[type].info[1]}
                  </Typography>
                )
              }
            />
          </Grid>
        )}
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 8, mb: 2 }}
          disabled={handleDisable()}
          endIcon={itemObj[type].icon}
          loading={loading}
          loadingPosition="end"
        >
          {itemObj[type].info[0]}
        </LoadingButton>
        <Grid container>
          <Grid item xs textAlign={'center'}>
            <Button variant='text' color='primary'sx={{ "&:hover": { backgroundColor: 'transparent' }, textAlign: 'right' }}>
              <Link to={itemObj[type].info[3]} style={{ color: '#002E82' }}>
                {itemObj[type].info[2]}
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};