import * as React from 'react';
import { useState } from 'react';
import { EAuth } from '../@types/EAuth';
import { TextField } from '@mui/material';
import { Auth } from '../components/Auth';
import { checkEmail } from '../utils/utils';
import { IPassword } from '../@types/IClient';

const Password: React.FunctionComponent = () => {
  const [passwordValues, setPasswordValues] = useState<IPassword>({
    email: 'tmp.tmp@tmp.tmp',
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
        error={!checkEmail(passwordValues.email)}
        helperText={!checkEmail(passwordValues.email) ? "Veuillez suivre le format d'email: exemple@exemple.com" : ''}
        onChange={(e) => handleChangeAuth('email', e.target.value)}
      />
    </Auth>
  );
}
  
  export default Password
  