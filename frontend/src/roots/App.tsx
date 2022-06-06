import UserImage from '../assets/user.jpg';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import ArtistImage from '../assets/artist.jpg';
import { MaterialUISwitch } from '../utils/utils';
import { Outlet, useNavigate } from 'react-router';
import { Copyright } from '../components/Copyright';
import { Container, CssBaseline, FormControlLabel, Typography, Grid } from '@mui/material';

const App: React.FunctionComponent = () => {
  const [user, setUser] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header/>
      <div style={{ height: '100%', width: '100%' }}>
        <img src={user ? UserImage : ArtistImage} alt='background' style={{ position: 'fixed', minWidth: '100%', maxHeight: '100vh'}}/>
        <div style={{ backgroundColor: 'white', minWidth: '100%', minHeight: '100%', position: 'fixed', opacity: '0.5' }}></div>
      </div>
      <Grid>
        <Typography variant="body1" color="textPrimary"   sx={{ paddingLeft: 2, position: {xs: 'absolute', sm: 'absolute', md: 'fixed', lg: 'fixed'}, paddingTop: 3 }}>
            CUSTOMER
        </Typography>
        <FormControlLabel color="primary" sx={{ paddingLeft: 15, position: {xs: 'absolute', sm: 'absolute', md: 'fixed', lg: 'fixed'}, paddingTop: 2 }} control={<MaterialUISwitch checked={!user} onChange={() => setUser(!user)}/>}
          label={
            <Typography variant="body1" color="textPrimary">
              ARTIST
            </Typography>
          } />
      </Grid>
      <Container component="main" maxWidth="sm" sx={{ mt: { xs: 4, sm: 6, md: 8, lg: 10 }}}>
        <CssBaseline/>
        <Outlet context={{ user }}/>
      </Container>
      <Copyright sx={{ pt: 3, pl: 4, position: 'fixed', bottom: 0, backgroundColor: '#115571', width: '100%', height: 62 }}/>
    </>
  );
};

export default App;