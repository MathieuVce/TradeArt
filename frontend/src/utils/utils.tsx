import { Switch } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import artist from "../assets/artist.svg";
import user from "../assets/user.svg";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#115571',
    },
    secondary: {
      main: '#31AFB4',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  }
});

export const checkEmail = (input: string) => {
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(input);
};

export const checkPassword = (input: string) => {
  // eslint-disable-next-line no-useless-escape
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(input);
}
export const checkBirthDate = (input: Date) => {
    const today = new Date();
    const dateNaissance = new Date(input);

    let age = today.getFullYear() - dateNaissance.getFullYear();
    const m = today.getMonth() - dateNaissance.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dateNaissance.getDate())) {
        age = age - 1;
    }
    return age >= 18;
};

export const checkBank = (input: string | undefined) => {
  return /^[a-z0-9]+$/i.test(input!);
};

export const checkPostalCode = (input: string) => {
  return !isNaN(Number(input))
};

export const checkCity = (input: string) => {
  return /^[a-zA-Z]+$/.test(input);
};

export const checkTel = (tel: string) => {
	// eslint-disable-next-line no-useless-escape
	return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(tel);
}

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 75,
  height: 40,
  padding: 10,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(10px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(32px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(${artist})`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#115571' : '#31AFB4',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#31AFB4' : '#115571',
    width: 36,
    height: 36,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(${user})`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#115571' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));