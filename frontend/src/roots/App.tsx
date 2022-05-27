import { useState } from 'react';
import { Outlet } from 'react-router';
import UserImage from '../assets/user.jpg';
import { Header } from '../components/Header';
import ArtistImage from '../assets/artist.jpg';
import { Copyright } from '../components/Copyright';
import { Container, CssBaseline, FormControlLabel, Typography } from '@mui/material';
import { MaterialUISwitch } from '../utils/utils';

const App: React.FunctionComponent = () => {
  const [user, setUser] = useState<boolean>(false);

  return (
    <>
      <Header/>
      <div style={{ height: '100%', width: '100%' }}>
        <img src={user ? UserImage : ArtistImage} alt='background' style={{ position: 'fixed', minWidth: '100%', maxHeight: '100vh'}}/>
        <div style={{ backgroundColor: 'white', minWidth: '100%', minHeight: '100%', position: 'fixed', opacity: '0.5' }}></div>
      </div>
      <FormControlLabel color="primary" sx={{ paddingX: 4, position: {xs: 'absolute', sm: 'absolute', md: 'fixed', lg: 'fixed'}, paddingTop: 2 }} control={<MaterialUISwitch checked={!user} onChange={() => setUser(!user)}/>}
        label={
          <Typography variant="body1" color="textPrimary">
            ARTISTE
          </Typography>
        } />
      <Container component="main" maxWidth="xs" sx={{ mt: { xs: 4, sm: 6, md: 8, lg: 10 }}}>
        <CssBaseline/>
        <Outlet context={{ user }}/>
      </Container>
      <Copyright sx={{ pt: 3, pl: 4, position: 'fixed', bottom: 0, backgroundColor: '#115571', width: '100%', height: 62 }}/>
    </>
  );
};

export default App;