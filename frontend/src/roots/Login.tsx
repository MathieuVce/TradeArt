import * as React from 'react';
import { useState } from 'react';
import { EAuth } from '../@types/EAuth';
import { Link } from 'react-router-dom';
import { IAuth } from '../@types/IClient';
import { Auth } from '../components/Auth';
import { checkEmail } from '../utils/utils';
import { Grid, TextField, Button } from '@mui/material';
import { IconTextField } from '../components/IconTextField';
import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material';

const Login: React.FunctionComponent = () => {
  const [visible, setVisible] = useState(false);
  const [authValues, setAuthValues] = useState<IAuth>({
    email: 'oamakhma@gmail.com',
    password: 'Azer123',
  });

  const handleChangeAuth = (prop: keyof typeof authValues, value: string | boolean) => {
    setAuthValues({
        ...authValues,
        [prop]: value
    });
  };

  return (
    <Auth type={EAuth.login} values={authValues}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Adresse E-mail"
        name="email"
        autoComplete="email"
        autoFocus
        error={!checkEmail(authValues.email)}
        helperText={!checkEmail(authValues.email) ? "Veuillez suivre le format d'email: exemple@exemple.com" : ''}
        onChange={(e) => handleChangeAuth('email', e.target.value)}
      />
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
      />
      <Grid item xs textAlign={'right'}>
        <Button variant='text' color='primary' sx={{ "&:hover": { backgroundColor: 'transparent' } }}>
          <Link to='/password' style={{ color: '#115571' }}>
            Mot de passe oublié ?
          </Link>
        </Button>
      </Grid>
    </Auth>
  );
}

export default Login
