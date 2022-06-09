import * as React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material/';
import ArtistImage from '../assets/artist.jpg';
import logo from '../assets/error.svg';
import { Link } from 'react-router-dom';

const NoPage: React.FunctionComponent = () => {
  
    return (
      <Box>
        <div style={{ height: '100%', width: '100%' }}>
          <img src={ArtistImage} alt='background' style={{ position: 'fixed', minWidth: '100%', maxHeight: '100vh'}}/>
        </div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <Paper elevation={3} sx={{position: 'fixed', minWidth: '50%', minHeight: '50%', paddingBottom: 8 }}>
            <img src={logo} alt='logo' style={{ width: '100%', height: '70%'}}/>
            <Typography color='primary' variant='h3' style={{ textAlign: 'center' }}>
              Oups, cette page n'existe pas !
            </Typography>
            <Link to={'/'}>
              <Typography color='primary' variant='h6' style={{ textAlign: 'center', fontStyle: 'italic', paddingTop: 16 }}>
                Retour à l'accueil
              </Typography>
            </Link>
          </Paper>
        </Grid>
    </Box>
    );
  };
  
  export default NoPage
  