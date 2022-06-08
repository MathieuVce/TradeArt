import * as React from 'react';
import { useState } from 'react';
import { EAuth } from '../@types/EAuth';
import { TextField } from '@mui/material';
import { Auth } from '../components/Auth';
import { IPassword } from '../@types/IClient';
import { checkEmail, checkPassword } from '../utils/utils';
import { IconTextField } from '../components/IconTextField';
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material';

const Password: React.FunctionComponent = () => {
  const [visible, setVisible] = useState(false);
  const [passwordValues, setPasswordValues] = useState<IPassword>({
    email: 'tmp.tmp@tmp.tmp',
    password: '',
    confirmpassword: ''
  });

  const handleChangeAuth = (prop: keyof typeof passwordValues, value: string) => {
    setPasswordValues({
        ...passwordValues,
        [prop]: value
    });
  };

  return (
    <Auth type={EAuth.password} values={passwordValues}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Adresse E-mail"
        name="email"
        autoComplete="email"
        autoFocus
        error={passwordValues.email ? !checkEmail(passwordValues.email) : false}
        helperText={passwordValues.email ? (!checkEmail(passwordValues.email) ? "Veuillez suivre le format d'email: exemple@exemple.com" : '') : ''}
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
        error={passwordValues.password ? !checkPassword(passwordValues.password) : false}
        helperText={passwordValues.password ? (!checkPassword(passwordValues.password) ? "Votre mot de passe doit contenir au moins 6 caractères, une lettre majuscule et un chiffre. Pas d'accent ni de caractère spécial." : '') : ''}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="confirmpassword"
        label="Confirmation mot de passe"
        name="confirmpassword"
        autoComplete="confirmpassword"
        type='password'
        autoFocus
        error={passwordValues.password !== passwordValues.confirmpassword}
        helperText={passwordValues.password !== passwordValues.confirmpassword ? "Les mots de passes ne correspondent pas" : ''}
        onChange={(e) => handleChangeAuth('confirmpassword', e.target.value)}
      />
    </Auth>
  );
}
  
  export default Password
  