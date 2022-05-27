import * as React from 'react';
import { useState } from 'react';
import logo from '../assets/logo.svg';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useNavigate } from 'react-router-dom';
import  {Box, Menu, AppBar, Button, Toolbar, MenuItem, Container, IconButton, Typography } from '@mui/material';

export const Header: React.FC = () => {
  const [navBar, setNavBar] = useState<null | HTMLElement>(null);
  const pages: {[key: string]: string} = {"Se connecter": 'login', "S'inscrire": 'register'};
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavBar(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setNavBar(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', lg: 'none' }}}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={navBar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(navBar)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' }}}>
              {Object.keys(pages).map((page, index) => (
                <MenuItem key={index} color='inherit' onClick={() => {handleCloseNavMenu(); navigate(`/${pages[page]}`)}}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
              <Button color="inherit" component={Link} to="/login">Se connecter</Button>
              <Button color="inherit" component={Link} to="/register">S'inscrire</Button>
          </Box>
          <Box
            component='img'
            sx={{ maxHeight: 80, height: 70, py: 0.5, mr: 2 }}
            alt="logo"
            src={logo}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};